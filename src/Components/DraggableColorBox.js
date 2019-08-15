import React from 'react';
import {withStyles} from '@material-ui/styles';
import Delete from '@material-ui/icons/Delete';
import chroma from 'chroma-js';
import {SortableElement} from 'react-sortable-hoc';

const styles = {
    root: {
        boxSizing: "border-box",
        height: "25%",
        width: "20%",
        margin: "0 auto",
        display: "inline-block",
        cursor: "pointer",
        "&:hover": {
            cursor: "all-scroll"
        },
        "&:hover svg": {
            color: "white",
            opacity: "1"
        },
        "@media (max-width: 1100px)": {
            width: "25%",
            height: "20%"
        },
        "@media (max-width: 900px)": {
            width: "50%",
            height: "10%"
        },
        "@media (max-width: 740px)": {
            width: "100%",
            height: "5%"
        },
    },
    boxContent: {
        display: "flex",
        alignItems: "flex-end",
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        padding: "10px",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        "@media (max-width: 740px)": {
            alignItems: "center"
        }
    },
    deleteIcon: {
        color: "rgba(0,0,0,.5)",
        transition: ".4s ease",
        "&:hover": {
            transform: "scale(1.3)",
            cursor: "pointer"
        }
    },
    lightCopy: {
        color: "white"
    }
};

const DraggableColorBox = SortableElement((props) => {
    const {classes} = props;
    const luminance = chroma(props.color).luminance();
    return(
        <div className={classes.root} style={{backgroundColor: props.color}}>
            <div className={classes.boxContent}>
                <span style={{maxWidth: "75%"}}className={luminance < .1 ? classes.lightCopy : undefined}>{props.name}</span>
                <Delete className={classes.deleteIcon} onClick={() => props.handleClick(props.name)}></Delete>
            </div>
        </div>
    )
});

export default withStyles(styles)(DraggableColorBox);