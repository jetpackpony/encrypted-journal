import { h } from 'preact';
import { RecoilRoot, useRecoilState } from 'recoil';
import Editor from './components/Editor';
import { cryptoKeyState } from './store';
import { deriveKey, getRandomBytes } from './crypto';
import EnterPassword from './components/EnterPassword';

const salt = getRandomBytes();

const App = () => {
  const [key, setCryptoKey] = useRecoilState(cryptoKeyState);
  const onPasswordSubmit = (password: string): void => {
    deriveKey(password, salt)
      .then((res) => {
        setCryptoKey(res);
      });
  };
  return (
    (key)
      ? <Editor />
      : <EnterPassword onSubmit={onPasswordSubmit} />
  );
};

export default App;