import { h, render } from 'preact';
import { RecoilRoot } from 'recoil';
import App from './App';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start();
}

render(<RecoilRoot><App/></RecoilRoot>, document.querySelector("#root"));