# CLIPPERS

https://clippers.amv.tools/ front end

# DEVELOPMENT

1. install `npm i`
2. run dev server `npm start`

# STATE

Global state with Recoil. No idea how it works but it works

# To Do:

- [ ] Reorganization
- [ ] Documentation

- [x] Disable links until all clips are unselected
- [x] Add death.png and reisir.png to navbar
- [x] Make \<Sidebar\> reusable, remove the content and make it render children
- [x] Update the page when tagging
- [x] Fix page scrolling to top when updating
- [ ] Fix page scrolling to the actual spot where the scroll was, save scroll value on click or in cleanup
- [x] Rename Atoms and Selectors to use the state naming convention
- [x] Move Selectors to parent components and flow data through component tree
  - This appearst to be unnecessary
- [ ] Add tags to url parameters
- [x] Use sidebar for tag adding etc. get rid of context menu
- [ ] Implement pagination client side
- [ ] Sort tags on clip page alphabetically
- [ ] Make right click on an unselected clip select it when no clips are selected
- [ ] Do not trigger contextmenu outside of grid
- [x] Make browse grid size and wrap better with min-width and probably a max-width too
- [x] Sidebar subtitle positioning when changing from exclude to include
- [ ] Include tags, episode and index in download="" filename
- [x] Re-process the clips without auto-cropping
- [ ] Style headings better
- [ ] Thumbnails
  - https://usefulangle.com/post/287/html-video-lazy-load
- [ ] Consider different fonts
- [x] Fix margins in context menu
- [ ] ZIP downloads with https://github.com/Touffy/client-zip
- [x] Hover over tags in sidebar to highlight videos that match
- [ ] Page titles, maybe useEffect() ?
- [ ] Use onMouseDown to remove the dragging thing on videos ?

bakemonogatari-1-393 isn't 16:9, causes issues on browse
