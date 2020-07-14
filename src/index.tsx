import { h, render } from 'preact';
import { RecoilRoot } from 'recoil';
import App from './App';

render(<RecoilRoot><App/></RecoilRoot>, document.querySelector("#root"));