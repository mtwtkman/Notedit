import m from 'mithril';
import Published from '../models/published';
import noteView from '../views/notes';


let controller = urlname => {
  m.redraw.strategy('diff');
  let model = new Published();
  return {
    props: model.fetchNotes(urlname),
    mode: 'published'
  };
};

let view = ctrl => {
  let props = ctrl.props();
  return noteView(props, ctrl.mode);
};

export default { controller, view }
