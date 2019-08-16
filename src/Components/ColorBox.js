import React, {Component} from 'react';
import chroma from 'chroma-js';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';

import '../Styles/ColorBox.css';

export default class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false
        }
        this.changeCopyState = this.changeCopyState.bind(this);
    }
    changeCopyState() {
        this.setState({copied: true}, () => {
            setTimeout(() => this.setState({copied: false}), 1500);
        })
    }
    render() {
        const {name, background, paletteId, id, showLink} = this.props;
        const luminance = chroma(background).luminance();
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{background}} className="ColorBox">
                    <div style={{background}} className={`copy-overlay ${this.state.copied && "show"}`}></div>
                    <div className={`copy-message ${this.state.copied && "show"} ${luminance > .4 ? "dark-copy-message" : undefined}`}>
                        <h1>copied!</h1>
                        <p>{background}</p>
                    </div>
                    <div className="copy-button-container">
                        <div className="colorbox-content">
                            <span className={luminance < .4 ? "light-copy" : undefined}>{name}</span>
                            </div>
                        <button className={`copy-button ${luminance > .4 ? "dark-copy" : undefined}`}>Copy</button>
                    </div>
                        {showLink && (
                            <Link to={`/palette/${paletteId}/${id}`} onClick={(event) => event.stopPropagation()}>
                            <span className={`see-more ${luminance > .4 ? "dark-copy" : undefined}`}>More</span>
                            </Link>
                        )}
                        
                </div>
                </CopyToClipboard>
        )
    }
}