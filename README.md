# Notedit
Dadecated browser for [note.mu](https://note.mu/) implemented by electron.

This is very limited because developed just for editing Text.

# Why
1. I don't need all of services of official(All I need is text edit).
2. I just want to edit and list my article and use GFM.
3. This is good chance to try electron.

# Note
You know, this is very limited. Specifically...

- Can't browse other's note.
- Not care for number of view.(Notedit fetches all of your articles.)
- Can't configure your account settings.
- Autosave only runs against `focusout` event.

# Features
- [x] sign in
- [x] sign out
- [x] delete draft article
- [x] delete published article
- [x] autosave article editing
- [x] publish article
- [x] store fetched articles at local storage
- [ ] lazy fetch articles
- [ ] selectable delete
- [ ] WYSIWYG editor
- [ ] vim fravored keybind

# License
WTFPL
