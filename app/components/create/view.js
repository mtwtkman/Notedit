import m from 'mithril';


let view = ctrl => {
  let props = ctrl.props;
  return m('div#edit-wrapper', [
    m('div#edit-status', [
      m('div#save-message',{
        config: ctrl.toggleSaveMessage.bind(this, props)
      }, [
        m('span#save-message-text', { className: 'hidden-tx' }, [
          m('span.glyphicon glyphicon-ok', { 'aria-hidden': true }),
          'Saved as draft!'
        ])
      ]),
      m('span#no-title-alert', {
        config: ctrl.alertNoTitle.bind(this, props)
      }, [
        m('span#no-title-alert-text', { className: 'hidden-tx' }, [
          m('span.glyphicon glyphicon-remove', { 'aria-hidden': true }),
          'Oops...Please set any title.'
        ])
      ]),
      m('div#edit-button', [
        m('a', {
          type: 'button',
          id: 'publish-button',
          className: 'btn btn-primary',
          onclick: ctrl.onPublish.bind(this, props)
        }, 'publish'),
      ]),
    ]),
    m(`div#${props.id ? props.id() : 'new-note'}`, [
      m('h3#edit-name',
        m('input', {
          placeholder: 'Title',
          onchange: m.withAttr('value', props.name),
          value: props.name(),
          onfocusout: ctrl.autoSave.bind(this, props)
        })
      ),
      m('div#edit-body',
        m('textarea', {
          rows: 10,
          config: ctrl.autoResize,
          placeholder: 'Body',
          onchange: m.withAttr('value', props.body),
          value: props.body(),
          onfocusout: ctrl.autoSave.bind(this, props)
        })
      )
    ])
  ]);
};

export default view;
