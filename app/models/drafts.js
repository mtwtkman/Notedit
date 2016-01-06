import m from 'mithril';
import { DRAFTS } from '../api';


export default class Drafts {
  fetchDrafts(urlname, page=1) {
    return m.request({method: 'GET', url: DRAFTS, data: {urlname, page}}).then(response => {
      return response.data;
    });
  }
}
