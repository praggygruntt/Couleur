import React, {Component} from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import {Link} from 'react-router-dom';

export default class SinglePalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state = {
            format: 'hex'
        };
        this.changeFormat = this.changeFormat.bind(this);
    }
    changeFormat(newFormat) {
        this.setState({format: newFormat});
    }
    gatherShades(palette, colorToFilterBy) {
       let shades = [];
       let allColors = palette.colors;
       for(let key in allColors) {
           shades = shades.concat(
               allColors[key].filter(color => color.id === colorToFilterBy)
           )
       }
       return shades.slice(1);
    }
    render() {
        const colorBoxes = this._shades.map(color => 
            <ColorBox key={color.name} name={color.name} background={color[this.state.format]} showLink={false}/>) 
        return(
            <div className="SingleColorPalette palette">
                <Navbar showSlider={false} handleChange={this.changeFormat}/>
                <div className="Palette-colors">
                    {colorBoxes}
                    <div className="go-back ColorBox">
                        <Link to={`/palette/${this.props.palette.id}`} className="go-back-button">GO BACK</Link>
                    </div>
                </div>
                <footer className="palette-footer">
                    {this.props.palette.paletteName}
                    <span className="palette-footer-emoji">{this.props.palette.emoji}</span>
                </footer>
            </div>
        )
    }
}