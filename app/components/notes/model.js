import m from 'mithril';
import { NOTES, DRAFTS } from '../../api';


export default class NotesModel {
  constructor(mode='published') {
    this.notes = m.prop(JSON.parse(localStorage[mode] || '[]'));
    this.mode = mode;
    this.url = mode === 'published' ? NOTES : DRAFTS;
  }
  fetchNotes() {
    this.data = {
      urlname: localStorage['urlname'],
      page: 1
    };
    let generator = this.iterFetchNotes();
    this._fetchNotes(generator);
  }
  _fetchNotes(generator) {
    let self = this;
    let promise = generator.next().value;
    promise.then(response => {
      let stored_notes = self.notes();
      stored_notes = stored_notes.concat(response.data.notes);
      localStorage[self.mode] = JSON.stringify(stored_notes);
      self.data.page = response.data.next_page;
      self.notes(stored_notes);
      if (response.data.last_page) {
        localStorage[self.mode + '_modernized'] = true;
        return;
      }
      this._fetchNotes(generator);
    });
  }
  *iterFetchNotes() {
    while (true) {
      yield m.request({method: 'GET', url: this.url, data: this.data});
    }
  }
};
