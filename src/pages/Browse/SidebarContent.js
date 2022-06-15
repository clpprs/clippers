import React, { Suspense, useEffect } from "react";
import styled from "styled-components";
import classNames from "classnames";

// Components
import { Search, Tag } from "../../components";
import { addTag, removeTag } from "../../helpers/tagging";

// State
import {
  useRecoilState,
  useRecoilValue,
  useRecoilRefresher_UNSTABLE,
} from "recoil";
import {
  clipTagsState,
  selectedClipsState,
  selectedTagsState,
  allTagsState,
  sharedTagsState,
  clipsQuery,
  clipsState,
} from "../../state";

const Subtitle = styled.span`
  width: 100%;
  font-size: 0.75rem;
  margin-bottom: 0;
  margin-top: 0.5rem;
`;

const SidebarContentContainer = styled.div`
  padding: 0 0.5rem;
  padding-top: 0.5rem;
  display: flex;
  flex-flow: column nowrap;
  gap: 0.5rem;
`;

export function SidebarContent({ clipsContainerID }) {
  const [selectedClips, setSelectedClipIds] =
    useRecoilState(selectedClipsState);

  return (
    <SidebarContentContainer>
      {!selectedClips.length ? (
        <>
          <Subtitle>Search tags</Subtitle>
          <Search />
          <SelectedTags />
          <AvailableTags clipsContainerID={clipsContainerID} />
        </>
      ) : (
        <TaggingMenu selectedClips={selectedClips} />
      )}
    </SidebarContentContainer>
  );
}

export default SidebarContent;

const SelectedClipsList = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 0.5rem;
`;

function TaggingMenu({ selectedClips }) {
  // Recoil state
  const allTags = useRecoilValue(allTagsState);
  const sharedTags = useRecoilValue(sharedTagsState);

  const availableTags = selectedClips.length
    ? allTags.filter((tag) => !sharedTags.includes(tag))
    : [];

  // UNSTABLE lol
  const refreshSelectedClips = useRecoilRefresher_UNSTABLE(selectedClipsState);
  const refreshClipsQuery = useRecoilRefresher_UNSTABLE(clipsQuery);

  const handleAddTag = (tag) => {
    addTag(tag, selectedClips).then((data) => {
      refreshSelectedClips();
      refreshClipsQuery();
    });
  };

  const handleRemoveTag = (tag) => {
    removeTag(tag, selectedClips).then((data) => {
      refreshSelectedClips();
      refreshClipsQuery();
    });
  };

  return (
    <>
      <Subtitle>Add tags</Subtitle>
      <Search
        availableTags={availableTags}
        onChange={(e, value) => {
          handleAddTag(value);
        }}
      />
      <Subtitle>Current tags</Subtitle>
      <SelectedTagList className="highlight-tags">
        {sharedTags.map((tag) => (
          <Tag
            tag={tag}
            key={tag.name || tag}
            className="included selected"
            onClick={(e) => handleRemoveTag(tag)}
          />
        ))}
      </SelectedTagList>
      <Subtitle>Selected clips</Subtitle>
      <SelectedClipsList>
        {selectedClips.map((clip) => (
          <span key={clip._id}>{`${clip._id.substring(0, 4)}-${clip.episode}-${
            clip.index
          }`}</span>
        ))}
      </SelectedClipsList>
    </>
  );
}

const SelectedTagList = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 0.25rem;

  & .tag {
    padding: 0 0.5rem 0.2rem 0.5rem;
    white-space: pre-wrap;
  }

  & .tag .tag-button {
    top: 0.125rem;
    position: relative;
    padding-left: 0.25rem;
  }
`;

function SelectedTags(props) {
  const selectedTags = useRecoilValue(selectedTagsState);

  const [excluded, included] = selectedTags.reduce(
    (output, tag) => {
      output[Number(tag.include)].push(tag);
      return output;
    },
    [[], []]
  );

  return (
    !!selectedTags.length && (
      <SelectedTagList id="selected-tags" className="highlight-tags">
        {!!included.length && (
          <>
            <Subtitle>Included tags</Subtitle>
            {included.map((tag) => (
              <Tag tag={tag} key={tag.name} button remove />
            ))}
          </>
        )}

        {!!excluded.length && (
          <>
            <Subtitle>Excluded tags</Subtitle>
            {excluded.map((tag) => (
              <Tag tag={tag} key={tag.name} button remove />
            ))}
          </>
        )}
      </SelectedTagList>
    )
  );
}

const TagListContainer = styled.div``;

const AvailableTagListContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;

  & .tag .tag-button {
    opacity: 0;
  }

  & .tag {
    color: var(--tag-color);
    padding: 0.125rem 0;
  }

  & .tag:hover {
    color: var(--highlight);
  }

  & .tag:hover .tag-button {
    opacity: 1;
  }
`;

function AvailableTags(props) {
  const clipTags = useRecoilValue(clipTagsState);
  const selectedTags = useRecoilValue(selectedTagsState);
  const clips = useRecoilValue(clipsState);

  const { clipsContainerID } = props;

  // Remove selected tags from the taglist
  const selectedTagNames = selectedTags.map((tag) => tag.name);
  const availableTags = clipTags.filter(
    (tag) => !selectedTagNames.includes(tag.name)
  );

  const highlightClipsWithTagName = (tag) => {
    document
      .getElementById(clipsContainerID)
      .classList.add("highlight-present");
    for (const clip of clips) {
      if (clip.tags.includes(tag))
        document.getElementById(clip._id).classList.add("highlight");
    }
  };
  const removeHighlight = (tag) => {
    document
      .getElementById(clipsContainerID)
      .classList.remove("highlight-present");
    for (const clip of clips) {
      if (clip.tags.includes(tag))
        document.getElementById(clip._id).classList.remove("highlight");
    }
  };

  return (
    <TagListContainer>
      {availableTags.length ? (
        <>
          <Subtitle>Most common tags</Subtitle>
          <AvailableTagListContainer
            id="available-tags"
            className={classNames("sidebar-taglist")}
          >
            {availableTags.map(({ name, count }) => (
              <Tag
                name={name}
                key={name}
                count={count}
                onMouseEnter={(e) => highlightClipsWithTagName(name)}
                onMouseLeave={(e) => removeHighlight(name)}
                button
                add
                exclude
              />
            ))}
          </AvailableTagListContainer>
        </>
      ) : (
        !clipTags.length && (
          <div>These results contain no tags. Please tag them!</div>
        )
      )}
    </TagListContainer>
  );
}
