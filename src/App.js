import { Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Chats from "./Components/Chats/Chats";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Home} exact/>
      <Route path="/chats" component={Chats}/>
    </div>
  );
}

export default App;
