# CLIPPERS

less goo

## To Do:

- [ ] Give clips their own React.Suspend to make them load in one-by-one
  - Only if possible without making every Clip access the clipsAtom value
  - Could probably try to detect when the <video> source has loaded and suspend until that
- [ ] Make TagButton accept tag prop
- [ ] Make Tag accept "exclude" and "include" as (or in) the button prop
  - The current Tag exclude / include props should make the tag itself include / exclude onClick, instead of changing what the button does. The Tag should only accept props that affect itself and the button prop should affect the button
- [ ] Make a Query atom that gets reset with setRecoilValue instead of using the unstable recoil refresher
  - This should fix the ContextMenu and Clips not updating when a tag is added / removed
