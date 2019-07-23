import React, {Component} from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import {withStyles} from '@material-ui/styles';
import '../Styles/Palette.css';

const styles = {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    colors: {
        height: "89vh"
    },
    footer: {
        background: "white",
        height: "5vh",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        fontWeight: "bold"
    },
    emoji: {
        fontSize: "1.5rem",
        margin: "0 8px"
    }
};

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 500,
            format: "hex"
        };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }
    changeLevel(newLevel){
        this.setState({level: newLevel});
    }    
    changeFormat(value) {
       this.setState({format: value})
    }
    render() {
        const {colors, paletteName, emoji, id,} = this.props.palette;
        const {classes} = this.props;
        const {level, format} = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox 
                background={color[format]} 
                name={color.name} 
                key={color.id} 
                id={color.id}
                paletteId={id}
                showLink={true}/>
        ));
        return (
            <div className={classes.Palette}>
                <Navbar showSlider level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat}/>
                <div className={classes.colors}>
                    {colorBoxes}
                    </div>
                <footer className={classes.footer}>
                    {paletteName}
                    <span className={classes.emoji}>{emoji}</span>
                </footer>
            </div>
        )
    }
};

export default withStyles(styles)(Palette);