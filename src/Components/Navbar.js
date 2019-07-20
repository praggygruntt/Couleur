import React, {Component} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../Styles/Navbar.css'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorFormat: 'hex'
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({colorFormat: event.target.value});
        this.props.handleChange(event.target.value);
    }
    render() {
        const {level, changeLevel} = this.props;
        const {colorFormat} = this.state;
        return(
            <header className="Navbar">
                <div className="logo">
                    <a href="#">Couleur</a>
                </div>
                <div className="slider-container">
                    <span>Level: {level}</span>
                    <div className="slider">
                        <Slider 
                            defaultValue={level} 
                            min={100} 
                            max={900}
                            step={100}
                            onChange={changeLevel}
                            />
                    </div>
                </div>
                <div className="color-type-selector-container">
                    <Select onChange={this.handleChange} value={colorFormat}>
                        <MenuItem value="hex">HEX - #FFFFFF</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
                    </Select>
                </div>
                
            </header>
        )
    }
}