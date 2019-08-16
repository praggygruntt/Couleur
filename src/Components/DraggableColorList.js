import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import {withStyles} from "@material-ui/styles";

import DraggableColorBox from './DraggableColorBox';

const styles = {
    root: {
        height: `calc(100% - 64px)`,
        "@media (max-width: 740px)": {
            height: `calc(100% - 64px)`,
        }
       
    }
}
const DraggableColorList = SortableContainer((props) => {
    const {classes, colors, removeColor} = props; 
    return (<div className={classes.root}>
        {colors.map((color, index) => (
              <DraggableColorBox index={index} value={color} key={color.name} color={color.color} name={color.name} handleClick={removeColor}/>
          ))}
    </div>);
});

export default withStyles(styles)(DraggableColorList);