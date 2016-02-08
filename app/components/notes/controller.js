import m from 'mithril';
import Bullet from 'bullet';
import { xhrConfig, NOTES, DRAFT_DELETE } from '../../api';
import { toggleTab } from '../../utils';
import NotesModel from './model';
import Modal from '../../commons/modal';
import Create from '../create/component';
import { indexContentRegion } from '../../regions';


let controller = mode => {
  m.redraw.strategy('diff');

  let onEdit = note => {
    m.mount(indexContentRegion(), m(Create, note.name, note.body, note.id));
    toggleTab(['published', 'drafts'], 'create');
  };

  let onDelete = (props, index, note, mode) => {
    let onOK = (id) => {
      let req = {
        method: 'DELETE',
        config: xhrConfig,
      };
      if (mode === 'published') {
        req.url = `${NOTES}/${id}`;
      } else {
        req.url = DRAFT_DELETE;
        req.data = {id};
      }
      m.request(req).then(response => {
        props.notes().splice(index, 1);
        Bullet.trigger('modal:destroy');
        localStorage[mode + '_modernized'] = false;
      });
    };
    let modal = new Modal(
      note.id,
      'Delete',
      m('div', [
        'Are you sure you want to delete?',
        m('p'),
        m('span#ensure-name', note.name)
      ]),
      onOK
    );
    modal.show();
    Bullet.on('modal:destroy', modal.destroy);
  };

  let props = new NotesModel(mode);
  if (!eval(localStorage[mode + '_modernized'])) {
    // Clear localStorate to initialize.
    // FIXME:
    //  I guess that stored notes should be updated partially.
    //  I rearize caching has no mean for now.
    localStorage[mode] = [];
    props.fetchNotes();
  }

  return {
    props,
    mode,
    onEdit,
    onDelete
  }
};

export default controller;
