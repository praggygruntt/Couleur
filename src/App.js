import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Components/Palette';
import PaletteList from './Components/PaletteList';
import SinglePalette from './Components/SinglePalette';
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
        <Route 
          exact path="/" 
          render={(routeProps) => 
            <PaletteList 
              palettes={seedPalettes} {...routeProps}/>}
          />
        <Route 
          exact path="/palette/:id" 
          render={routeProps => 
            <Palette 
              palette={generateFullPalette(this.findPalette(routeProps.match.params.id))}/>}
              />
        <Route
          exact path="/palette/:paletteId/:colorId" 
          render={routeProps => 
            <SinglePalette
              colorId={routeProps.match.params.colorId} 
              palette={generateFullPalette(this.findPalette(routeProps.match.params.paletteId))}/>}
              />
          />
      </Switch>
    )
  }
    // <div>
    //   <Palette palette={generateFullPalette(seedPalettes[8])} />
    // </div>
}

export default App;
