import m from 'mithril';
import { dateFormat } from '../../utils';


let noteView = ctrl => {
  let props = ctrl.props;
  return m('div', [
    m('div#content-wrapper[aria-multiselectable=true]',
      props.notes().map((note, index) => {
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
                className: 'edit-note btn btn-success',
                onclick: ctrl.onEdit.bind(this, note)
              }, [
                m('span.glyphicon.glyphicon-edit[aria-hidden=true]'),
                'edit'
              ]),
              m('span.clearance'),
              m('a', {
                type: 'button',
                className: 'note-delete btn btn-danger',
                onclick: ctrl.onDelete.bind(this, props, index, note, ctrl.mode)
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
