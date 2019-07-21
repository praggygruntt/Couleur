import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Components/Palette';
import seedPalettes from './seedPalettes';
import {generateFullPalette} from './colorHelpers';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={() => <h1>Palette List Goes Here</h1>}/>
      <Route exact path="/palette/:id" render={() => <h1>Individual Palette</h1>}/>
    </Switch>
    // <div>
    //   <Palette palette={generateFullPalette(seedPalettes[8])} />
    // </div>
  );
}

export default App;
