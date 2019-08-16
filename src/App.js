import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import Page from './Components/Page';
import PaletteList from './Components/PaletteList';
import Palette from './Components/Palette';
import SinglePalette from './Components/SinglePalette';
import NewPaletteForm from './Components/NewPaletteForm';

import seedPalettes from './seedPalettes';
import {generateFullPalette} from './colorHelpers';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    let savedPalettes;
    let palettes;
    try {
      savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
      palettes =  savedPalettes.length === 0 ? seedPalettes : savedPalettes;
    } catch(e) {
      window.localStorage.setItem("palettes", "[]");
      palettes = seedPalettes;
    }
    this.state = {
      palettes: palettes
    }
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
    this.syncLocalStorage = this.syncLocalStorage.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id
    })
  }
  savePalette(newPalette) { 
    this.setState({
      palettes: [...this.state.palettes, newPalette]},
      this.syncLocalStorage
    );
  }
  syncLocalStorage() {
    // save palettes to localstorage
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes))
  }
  deletePalette(id) {
    this.setState(st => ({palettes: st.palettes.filter(palette => palette.id !== id)}), this.syncLocalStorage);
  };
  render() {
    return (
      <Route 
        render={({location}) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="page" timeout={1000}>
              <Switch location={location}>
                  <Route 
                    exact path="/" 
                    render={(routeProps) => 
                      <Page location={location.key}>
                      <PaletteList 
                        palettes={this.state.palettes} deletePalette={this.deletePalette} {...routeProps}/></Page>}
                    />
                  <Route 
                    exact path="/palette/:id" 
                    render={routeProps => 
                      <Page location={location.key}>
                      <Palette 
                        palette={generateFullPalette(this.findPalette(routeProps.match.params.id))}/></Page>}
                        />
                  <Route
                    exact path="/palette/:paletteId/:colorId" 
                    render={routeProps =>
                      <Page location={location.key}>
                      <SinglePalette
                        colorId={routeProps.match.params.colorId} 
                        palette={generateFullPalette(this.findPalette(routeProps.match.params.paletteId))}/></Page>}
                        />
                    />
                  <Route 
                    exact path="/new-palette"
                    render={(routeProps) => <Page location={location.key}><NewPaletteForm {...routeProps} savePalette={this.savePalette} palettes={this.state.palettes} backupPalette={seedPalettes[0]}/></Page>}
                  />
                  <Route 
                    render={(routeProps) => 
                      <Page location={location.key}>
                      <PaletteList 
                        palettes={this.state.palettes} deletePalette={this.deletePalette} {...routeProps}/></Page>}
                    />
                </Switch>
                </CSSTransition>
              </TransitionGroup>
        )}
      />
    )
  }
    // <div>
    //   <Palette palette={generateFullPalette(seedPalettes[8])} />
    // </div>
}

export default App;
