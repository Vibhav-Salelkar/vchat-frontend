import { Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Chats from "./Components/Chats/Chats";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Home}/>
      <Route path="/chats" component={Chats}/>
    </div>
  );
}

export default App;
