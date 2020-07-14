import { h } from 'preact';

const test = (num: number) => num;
const App = () => <h1>This is a typescript test {test(1)}</h1>;

export default App;