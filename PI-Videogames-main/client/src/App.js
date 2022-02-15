import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom' 
import landingPage from './components/landingPage'
import Home from './components/Home';
import Detail from './components/Detail';
import GameCreate from './components/GameCreate';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component={landingPage}/>
        <Route exact path = '/home' component={Home}/>
        <Route exact path = {'/videogame/:id'} component={Detail}/>
        <Route exact path = '/videogame' component={GameCreate}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
