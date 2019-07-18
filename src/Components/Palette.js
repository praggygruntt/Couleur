import React, {Component} from 'react';
import ColorBox from './ColorBox';
import '../Styles/Palette.css';

export default class Palette extends Component {
    render() {
        // CREATE AND STORE ALL COLORBOXES IN A VARIABLE
        const colorBoxes = this.props.colors.map(color => (
            <ColorBox background={color.color} name={color.name} />
        ));
        return (
            <div className="Palette">
                {/* Navbar goes here */}
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                {/* Footer eventually */}
            </div>
        )
    }
};