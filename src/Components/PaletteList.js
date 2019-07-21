import React, {Component} from 'react';
import MiniPalette from './MiniPalette';
import {Link} from 'react-router-dom';

export default class PaletteList extends Component {
    render() {
        const {palettes} = this.props;
        return(
            <div className="PaletteList">
                <h1>COULEUR PALETTES</h1>
                {palettes.map(palette => (
                    <MiniPalette {...palette} />
                ))}
            </div>
        )
    }
}