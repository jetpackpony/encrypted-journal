import { h } from 'preact';
import { RecoilRoot, useRecoilState } from 'recoil';
import Editor from './components/Editor';
import { cryptoKeyState } from './store';
import { deriveKey, getRandomBytes } from './crypto';
import EnterPassword from './components/EnterPassword';

const App = () => {
  const [{ key, salt }, setCryptoKey] = useRecoilState(cryptoKeyState);
  if (!salt) {
    fetch('/salt')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCryptoKey({ key, salt: data.salt });
      });
    return "Loading...";
  }
  const onPasswordSubmit = (password: string): void => {
    deriveKey(password, new Uint8Array(salt))
      .then((res) => {
        setCryptoKey({ key: res, salt });
      });
  };
  return (
    (key)
      ? <Editor />
      : <EnterPassword onSubmit={onPasswordSubmit} />
  );
};

export default App;