import m from 'mithril';
import { DRAFTS } from '../api';
import Drafts from '../models/drafts';
import noteView from '../views/notes';


let fetchDrafts = (urlname, page=1) => {
  return m.request({method: 'GET', url: DRAFTS, data: {urlname, page}}).then(response => {
    return response.data;
  });
};

let controller = urlname => {
  m.redraw.strategy('diff');
  return {
    props: fetchDrafts(urlname),
    mode: 'drafts'
  };
};

let view = ctrl => {
  let props = ctrl.props();
  return noteView(props, ctrl.mode);
};

export default { controller, view }
