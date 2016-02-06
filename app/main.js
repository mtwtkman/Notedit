import m from 'mithril';
import { CURRENT_USER, PATH_ROOT } from './api';
import { mainRegion } from './regions';
import SignIn from './components/sign-in/component';
import Index from './components/index/component';
import { cookie, removeCookie } from './utils';
let remote = require('remote');

let deserialize = value => {
  return {data: value};
};

let extract = (xhr, xhrOptions) => {
  return xhr;
};

if (!cookie('X-XSRF-TOKEN')) {
  m.request({
    method: 'GET',
    url: PATH_ROOT,
    deserialize,
    extract,
  }).then(response => {
    remote.getCurrentWebContents().session.cookies.get({name: 'XSRF-TOKEN'}, function(error, cookies){
      cookie('X-XSRF-TOKEN', cookies[0].value);
    });
    return response;
  });
};

let component;
m.request({method: 'GET', url: CURRENT_USER}).then(response => {
  if (response.error) {
    component = SignIn;
  } else {
    localStorage.urlname = response.data.urlname;
    component = m(Index, response.data);
  }
  m.mount(mainRegion, component);
});
