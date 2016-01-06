import m from 'mithril';
import { NOTES } from '../api';


export default class Published {
  fetchNotes(urlname, page=1) {
    return m.request({method: 'GET', url: NOTES, data: {urlname, page}}).then(response => {
      return response.data;
    });
  }
}
