import React, {Component} from 'react';
import ColorBox from './ColorBox';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../Styles/Palette.css';

export default class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 500
        };
        this.changeLevel = this.changeLevel.bind(this);
    }
    changeLevel(newLevel){
        this.setState({level: newLevel});
    }    
    render() {
        const {colors} = this.props.palette;
        const {level} = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox background={color.hex} name={color.name} />
        ));
        return (
            <div className="Palette">
                {/* Navbar goes here */}
                <Slider 
                    defaultValue={level} 
                    min={100} 
                    max={900}
                    step={100}
                    onChange={this.changeLevel}
                    />
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                {/* Footer eventually */}
            </div>
        )
    }
};