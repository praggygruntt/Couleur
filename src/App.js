import React from 'react';
import Palette from './Components/Palette';
import seedPalettes from './seedPalettes';
import {generateFullPalette} from './colorHelpers';

function App() {
  return (
    <div>
      {/* generates a Palette using only the first element of the seedPalettes array */}
      <Palette palette={generateFullPalette(seedPalettes[4])} />
    </div>
  );
}

export default App;
