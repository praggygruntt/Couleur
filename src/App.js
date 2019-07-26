import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Components/Palette';
import PaletteList from './Components/PaletteList';
import SinglePalette from './Components/SinglePalette';
import NewPaletteForm from './Components/NewPaletteForm';
import seedPalettes from './seedPalettes';
import {generateFullPalette} from './colorHelpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palettes: seedPalettes
    }
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id
    })
  }
  savePalette(newPalette) { 
    this.setState({palettes: [...this.state.palettes, newPalette]})
  }
  render() {
    return (
      <Switch>
        <Route 
          exact path="/" 
          render={(routeProps) => 
            <PaletteList 
              palettes={this.state.palettes} {...routeProps}/>}
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
        <Route 
          exact path="/new-palette"
          render={(routeProps) => <NewPaletteForm {...routeProps} savePalette={this.savePalette}/>}
        />
      </Switch>
    )
  }
    // <div>
    //   <Palette palette={generateFullPalette(seedPalettes[8])} />
    // </div>
}

export default App;
