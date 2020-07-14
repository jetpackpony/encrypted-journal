import { h } from 'preact';
import { useState } from 'preact/hooks';

const Editor = () => {
  const [text, setText] = useState("");
  const updateText = (e) => {
    setText(e.target.value);
  };
  const run = (e) => {
    e.preventDefault();
    console.log("Text: ", text);
  };
  return (
    <div>
      <textarea style={{ width:"600px", height:"700px"}} onInput={updateText}>
        {text}
      </textarea>
      <button onClick={run}>Run</button>
    </div>
  )
};

export default Editor;