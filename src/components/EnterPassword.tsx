import { h } from 'preact';
import { useRef } from 'preact/hooks';

export interface Props {
  onSubmit: (password: string) => void;
}
const EnterPassword = ({ onSubmit }: Props) => {
  const passInput = useRef();
  const submit = () => {
    onSubmit(passInput.current.value);
  };

  return (
    <div>
      <input ref={passInput} type="password"/>
      <button onClick={submit}>Submit</button>
    </div>
  )
};

export default EnterPassword;