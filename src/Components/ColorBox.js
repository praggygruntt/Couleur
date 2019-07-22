import React, {Component} from 'react';
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
        const {name, background} = this.props;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{background}} className="ColorBox">
                    <div style={{background}} className={`copy-overlay ${this.state.copied && "show"}`}></div>
                    <div className={`copy-message ${this.state.copied && "show"}`}>
                        <h1>copied!</h1>
                        <p>{background}</p>
                    </div>
                    <div className="copy-button-container">
                        <div className="colorbox-content">
                            <span>{name}</span>
                            </div>
                        <button className="copy-button">Copy</button>
                        <Link to="/" onClick={(event) => event.stopPropagation()}>
                            <span className="see-more">More</span>
                            </Link>
                        </div>
                    </div>
                </CopyToClipboard>
        )
    }
}