import m from 'mithril';
import { NOTES } from '../api';
import noteView from '../views/notes';


let fetchNotes = (urlname, page=1) => {
  return m.request({method: 'GET', url: NOTES, data: {urlname, page}}).then(response => {
    return response.data;
  });
};

let controller = urlname => {
  m.redraw.strategy('diff');
  return {
    props: fetchNotes(urlname),
    mode: 'published',
    urlname
  };
};

let view = ctrl => {
  let props = ctrl.props();
  return noteView(props, ctrl.mode, ctrl.urlname);
};

export default { controller, view }
