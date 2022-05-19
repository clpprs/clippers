import React, { Suspense } from "react";
import styled from "styled-components";
import classNames from "classnames";

// Components
import { Search, Tag } from "../../components";

// State
import { useRecoilValue } from "recoil";
import { clipTagsAtom, selectedTagsAtom } from "../../state";

const Subtitle = styled.span`
  width: 100%;
  font-size: 0.75rem;
  margin-bottom: -0.25rem;
  margin-top: 0.5rem;

  &:first-of-type {
    margin-top: 0;
  }
`;

const SelectedTagList = styled.div`
  padding: 0 0.5rem;
  display: flex;
  flex-flow: row wrap;
  gap: 0.25rem;

  & .tag {
    padding: 0 0.25rem;
    white-space: pre-wrap;
  }

  & .tag .tag-button {
    padding-left: 0.25rem;
  }
`;

function SelectedTags(props) {
  const selectedTags = useRecoilValue(selectedTagsAtom);

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

const TagListContainer = styled.div`
  padding: 0 0.5rem;
`;

const AvailableTagListContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 0.25rem;

  & .tag .tag-button {
    opacity: 0;
  }
  & .tag:hover .tag-button {
    opacity: 1;
  }
`;

function AvailableTags(props) {
  const clipTags = useRecoilValue(clipTagsAtom);
  const selectedTags = useRecoilValue(selectedTagsAtom);

  // Remove selected tags from the taglist
  const selectedTagNames = selectedTags.map((tag) => tag.name);
  const availableTags = clipTags.filter(
    (tag) => !selectedTagNames.includes(tag.name)
  );

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
              <Tag name={name} key={name} count={count} button add />
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

export function SidebarContent(props) {
  return (
    <>
      <Search />
      <SelectedTags />
      <Suspense fallback={null}>
        <AvailableTags />
      </Suspense>
    </>
  );
}

export default SidebarContent;
