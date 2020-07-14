import { h } from 'preact';
import { RecoilRoot, useRecoilState } from 'recoil';
import Editor from './components/Editor';
import { cryptoKeyState } from './store';
import { deriveKey, getRandomBytes } from './crypto';

const App = () => {
  const [key, setCryptoKey] = useRecoilState(cryptoKeyState);
  if (!key) {
    const salt = getRandomBytes();
    deriveKey("1234", salt)
      .then((res) => {
        setCryptoKey(res);
      });
  }
  return (key) ? <Editor /> : "Loading...";
};

export default App;