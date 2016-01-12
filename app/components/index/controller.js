import m from 'mithril';
import { xhrConfig, SIGN_OUT } from '../../api';
import { mainRegion, indexContentRegion } from '../../regions';
import IndexModel from './model';
import SignIn from '../sign-in/component';
import Notes from '../notes/component';
import Create from '../create/component';


let controller = data => {
  let userIconSource = data.user_profile_image_path;
  let props = new IndexModel(userIconSource=userIconSource);
  let mountComponent = component => {
    m.mount(indexContentRegion(), component === 'create' ? Create : m(Notes, component));
  };

  let onSignOut = () => {
    m.request({method: 'POST', url: SIGN_OUT, config: xhrConfig}).then(response => {
      m.mount(mainRegion, SignIn);
    });
  };

  return {
    props,
    mountComponent,
    onSignOut
  };
};

export default controller;
