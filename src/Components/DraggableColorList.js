import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox';

const DraggableColorList = SortableContainer(({colors, removeColor}) => {
    return (<div style={{height: "100%"}}>
        {colors.map((color, index) => (
              <DraggableColorBox index={index} value={color} key={color.name} color={color.color} name={color.name} handleClick={removeColor}/>
          ))}
    </div>);
});

export default DraggableColorList;