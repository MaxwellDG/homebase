import React from 'react';
import './css/App.css';
import NavBar from "./containers/navBar"
import MainBlock from "./containers/mainBlock"
import WeatherContainer from './containers/weatherContainer'
import { BrowserRouter } from 'react-router-dom'
import AddOptionContainer from './containers/addOptionContainer';


class App extends React.Component {

  /* It'd be a cute virtue signal if you added all of the icons' creators on the bottom of the settings page in small text */
  /* Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */

  render(){
    return (
      <div className="App">
            <BrowserRouter>
                <WeatherContainer />
                <AddOptionContainer />
                <div id="mainBlockContainer">
                  <NavBar />
                  <MainBlock />
                </div>
            </BrowserRouter>
      </div>
    );
  }
}

export default App;
