import m from 'mithril';
import editView from '../views/edit';


let controller = (name=null, body=null) => {
  m.redraw.strategy('diff');
  return {
    props: m.prop({name, body})
  }
};

let view = ctrl => {
  let props = ctrl.props();
  return editView(props);
}

export default { controller, view };
