import m from 'mithril';
import { NOTES, DRAFTS } from '../../api';


export default class NotesModel {
  constructor(mode='published') {
    this.notes = m.prop(JSON.parse(localStorage[mode] || '[]'));
    this.mode = mode;
  }
  fetchNotes() {
    let url = this.mode === 'published' ? NOTES : DRAFTS;
    let data = {
      urlname: localStorage.urlname,
      page: parseInt(localStorage[this.mode + '_next_page'])
    };
    let self = this;
    return m.request({method: 'GET', url, data}).then(response => {
      // update fetched note data at localStorage
      let published = JSON.parse(localStorage[self.mode] || '[]');
      published = published.concat(response.data.notes);
      localStorage[self.mode] = JSON.stringify(published);
      localStorage[self.mode + '_next_page'] = response.data.next_page;
      localStorage[self.mode + '_last_page'] = response.data.last_page;

      self.notes(published);
    });
  }
};
