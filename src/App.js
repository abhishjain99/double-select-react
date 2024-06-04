// import Selector from "./components/Selector/Selector";
import Countdown from "./components/CountdownTimer/Countdown";
import TicTacToe from "./components/TicTacToe/TicTacToe";
import Todolist from './components/FunctionalComponent_RTK/Todolist';
// import Todolist from './components/Todolist/Todolist';
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      {/* <Selector /> */}
      {/* <Countdown /> */}
      <TicTacToe />
      <Todolist />
    </div>
  );
}
