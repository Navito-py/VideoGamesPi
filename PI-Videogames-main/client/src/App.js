import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom' 
import landingPage from './components/landingPage'
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component={landingPage}/>
        <Route exact path = '/home' component={Home}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
