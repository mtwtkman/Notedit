import m from 'mithril';
import { modalRegion } from '../regions';


class Modal{
  constructor(id=null, title=null, body=null, onOK=null) {
    this.onOK = onOK;
    this.id = id;
    this.component = {
      controller: () => {
        m.redraw.strategy('diff');
        return {
          title,
          body
        };
      },
      view: ctrl => {
        return [
          m('div#modal-wrapper', [
            m('div#modal-title', ctrl.title),
            m('div#modal-body', body),
            m('div#modal-buttons', [
              m('div#modal-cancel.inline-block',
                m('a', {
                  type: 'button',
                  className: 'btn btn-default',
                  onclick: this.destroy
                }, 'cancel')
              ),
              m('div.clearance-wide'),
              m('div#modal-ok.inline-block',
                m('a', {
                  type: 'button',
                  className: 'btn btn-primary',
                  onclick: this.onOK.bind(this, this.id)
                }, 'ok')
              ),
            ])
          ]),
          m('div#modal-overlay')
        ]
      }
    };
  }
  show() {
    m.mount(modalRegion(), this.component);
  }
  destroy() {
    m.mount(modalRegion(), {
      controller: () => {
        m.redraw.strategy('diff');
      },
      view: ctrl => {
        return null;
      }
    });
  }
};

export {
  Modal
}
