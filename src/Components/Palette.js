import React, {Component} from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import '../Styles/Palette.css';

export default class Palette extends Component {
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
        const {colors, paletteName, emoji, id} = this.props.palette;
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
            <div className="Palette">
                <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat}/>
                <div className="Palette-colors">
                    {colorBoxes}
                    </div>
                <footer className="palette-footer">
                    {paletteName}
                    <span className="palette-footer-emoji">{emoji}</span>
                </footer>
            </div>
        )
    }
};