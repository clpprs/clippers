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
- [ ] Add tags to url parameters
- [ ] Implement pagination client side
- [ ] ZIP downloads with https://github.com/Touffy/client-zip
- [ ] Re-encode episode 2
- [x] Page titles, maybe useEffect() ?
- [x] Use onMouseDown to remove the dragging thing on videos ?
- [x] Include tags, episode and index in download="" filename
  - Doesn't work :/
- [x] Fix page scrolling to top when updating
- [ ] Make page scroll to the actual spot where it was, save scroll value on click or in cleanup
- [x] Thumbnails
  - https://usefulangle.com/post/287/html-video-lazy-load
- [x] Consider different fonts
- [x] Disable links until all clips are unselected
- [x] Add death.png and reisir.png to navbar
- [x] Make \<Sidebar\> reusable, remove the content and make it render children
- [x] Update the page when tagging
- [x] Rename Atoms and Selectors to use the state naming convention
- [x] Move Selectors to parent components and flow data through component tree
  - This appearst to be unnecessary
- [x] Use sidebar for tag adding etc. get rid of context menu
- [x] Make browse grid size and wrap better with min-width and probably a max-width too
- [x] Sidebar subtitle positioning when changing from exclude to include
- [x] Re-process the clips without auto-cropping
- [x] Hover over tags in sidebar to highlight videos that match
- [x] Fix margins in context menu

bakemonogatari-1-393 isn't 16:9, causes issues on browse
