import m from 'mithril';
import Drafts from '../models/drafts';
import noteView from '../views/notes';


let controller = urlname => {
  m.redraw.strategy('diff');
  let model = new Drafts();
  return {
    props: model.fetchDrafts(urlname),
    mode: 'drafts'
  };
};

let view = ctrl => {
  let props = ctrl.props();
  return noteView(props, ctrl.mode);
};

export default { controller, view }

