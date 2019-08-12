import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
    root: {
        backgroundColor: "white",
        borderRadius: "5px",
        padding: "0.5rem",
        position: "relative",
        overflow: "hidden",
        border: "1px solid black",
        "&:hover": {
            cursor: "pointer"
        },
        "&:hover svg": {
            opacity: "1"
        },
        "@media (max-width: 490px)": {
            margin: "1rem"
        },
    },
    colors: {
        backgroundColor: "#dae1e4",
        height: "150px",
        width: "100%",
        borderRadius: "5px",
        overflow: "hidden"
    },
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: 'center',
        margin: "0",
        color: "black",
        paddingTop: "0.5rem",
        fontSize: "1rem",
        position: "relative"
    },
    emoji: {
        marginLeft: "0.5rem",
        fontSize: "1.5rem"
    },
    miniColor: {
        height: "25%",
        width: "20%",
        display: "inline-block",
        margin: "0 auto",
        position: "relative",
        marginBottom: "-3px"
    },
    deleteIcon: {
        color: "white",
        backgroundColor: "#eb3d30",
        width: "20px",
        height: "20px",
        position: "absolute",
        right: "0",
        top: "0",
        padding: "10px",
        zIndex: "10",
        borderRadius: "2px",
        opacity: "0",
        transition: "all .5s ease-in-out",
        "@media (max-width: 767px)": {
            opacity: "1"
        },
    }
};

class MiniPalette extends Component {
    constructor(props) {
        super(props);
        this.deletePalette = this.deletePalette.bind(this);
    }
    deletePalette(event) {
        event.stopPropagation();
        this.props.deletePalette(this.props.id)
    }
    render() {
        const {paletteName, emoji, classes, colors} = this.props;
        const miniColorBoxes = colors.map(color => (
            <div className={classes.miniColor} style={{backgroundColor: color.color}} key={color.name}></div>
        ));
        return (
            <div className={classes.root} onClick={this.props.handleClick}>
                <DeleteIcon className={classes.deleteIcon} onClick={this.deletePalette}/>
                <div className={classes.colors}>
                    {miniColorBoxes}
                </div>
                <h5 className={classes.title}>{paletteName}<span className={classes.emoji}>{emoji}</span></h5>
            </div>
        )
    }
}

export default withStyles(styles)(MiniPalette);