import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useRecoilValue } from 'recoil';
import { cryptoKeyState } from '../store';
import { encrypt, decrypt } from '../crypto';

const Editor = () => {
  const cryptoKey = useRecoilValue(cryptoKeyState);
  const [text, setText] = useState("");
  const updateText = (e) => {
    setText(e.target.value);
  };
  const run = async (e) => {
    e.preventDefault();
    console.log("Initial Text: ", text);
    const [counter, ciphertext] = await encrypt(cryptoKey, text);
    const decrypted = await decrypt(cryptoKey, counter, ciphertext);
    console.log("Enc/dec text: ", decrypted);
  };
  return (
    <div>
      <textarea style={{ width:"600px", height:"700px"}} onChange={updateText}>
        {text}
      </textarea>
      <button onClick={run}>Run</button>
    </div>
  )
};

export default Editor;