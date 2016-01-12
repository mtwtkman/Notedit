import m from 'mithril';
import { xhrConfig, DRAFT_DELETE } from '../../api';
import { toggleTab } from '../../utils';
import NotesModel from './model';
import Modal from '../../commons/modal';
import Create from '../create/component';
import { indexContentRegion } from '../../regions';


let controller = mode => {
  m.redraw.strategy('diff');

  let deleteDraft = id => {
    m.request({method: 'DELETE', url: DRAFT_DELETE, data: {id}, config: xhrConfig}).then(response => {
      console.log(response);
    });
  };

  let deletePublished = id => {
    m.request({method: 'DELETE', url: `${NOTES}/${id}`, config: xhrConfig}).then(response => {
      console.log(response);
    });
  };

  let onEdit = note => {
    m.mount(indexContentRegion(), m(Create, note.name, note.body, note.id));
    toggleTab(['published', 'drafts'], 'create');
  };

  let onDelete = (id, name, mode) => {
    let onOK = mode === 'published' ? deletePublished : deleteDraft;
    let modal = new Modal(
      id,
      'Delete',
      m('div', [
        'Are you sure you want to delete?',
        m('p'),
        m('span#ensure-name', name)
       ]),
      onOK
    );
    modal.show();
  };

  let props = new NotesModel();
  props.fetchNotes(props, mode);

  return {
    props,
    mode,
    onEdit,
    onDelete
  }
};

export default controller;
