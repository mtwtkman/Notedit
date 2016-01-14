import m from 'mithril';
import { NOTES, DRAFTS } from '../../api';


export default class NotesModel {
  constructor(notes=null) {
    this.notes = m.prop(notes || new Array());
  }
  fetchNotes(mode, page=1) {
    let url = mode === 'published' ? NOTES : DRAFTS;
    let data = {
      urlname: window.applicationState.urlname,
      page
    };
    return m.request({method: 'GET', url, data}).then(response => {
      this.notes(response.data.notes);
    });
  }
};
