import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Components/Palette';
import seedPalettes from './seedPalettes';
import {generateFullPalette} from './colorHelpers';

class App extends Component {
  findPalette(id) {
    return seedPalettes.find(function(palette) {
      return palette.id === id
    })
  }
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <h1>Palette List Goes Here</h1>}/>
        <Route exact path="/palette/:id" render={routeProps => <Palette palette={generateFullPalette(this.findPalette(routeProps.match.params.id))}/>}/>
      </Switch>
    )
  }
    // <div>
    //   <Palette palette={generateFullPalette(seedPalettes[8])} />
    // </div>
}

export default App;
