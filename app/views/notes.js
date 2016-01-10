import m from 'mithril';
import { xhrConfig, NOTES, DRAFT_DELETE } from '../api';
import { dateFormat } from '../utils';
import { Modal } from '../components/commons';
import Create from '../components/create';
import { indexContentRegion } from '../regions';


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
  m.mount(indexContentRegion(), m(Create, note.name, m.trust(note.body), note.id));

  // toggle tab
  ['published', 'drafts'].map(e => {
    document.getElementById(`nav-${e}`).className = '';
  });
  document.getElementById('nav-create').className = 'active';
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

let noteView = (props, mode) => {
  return m('div', [
    m('div#content-wrapper[aria-multiselectable=true]',
      props.notes.map(note => {
        return m(`div#${note.id}.note`, [
          m('h3.note-name',
            m('a', {
                href: `#body-${note.id}`,
                role: 'button',
                'data-toggle': 'collapse',
                'data-parent': '#content-wrapper',
                'aria-controls': `body-${note.id}`,
                'aria-expanded': false
              },
              note.name)
          ),
          m(`div#body-${note.id}.note-body.collapse`, [
            m('span.created-at', [
              m('span.glyphicon.glyphicon-time[aria-hidden=true]'),
              m('span.created-date', dateFormat(note.created_at))
            ]),
            m('span.note-button-group', [
              m('a', {
                type: 'button',
                className: 'note-edit btn btn-success',
                onclick: onEdit.bind(this, note)
              }, [
                m('span.glyphicon.glyphicon-edit[aria-hidden=true]'),
                'edit'
              ]),
              m('span.clearance'),
              m('a', {
                type: 'button',
                className: 'note-delete btn btn-danger',
                onclick: onDelete.bind(this, note.id, note.name, mode)
              }, [
                m('span.glyphicon.glyphicon-trash[aria-hidden=true]'),
                'delete'
              ]),
            ]),
            m('div.clearfix'),
            m.trust(note.body)
          ])
        ]);
      })
    )
  ]);
};

export default noteView;
