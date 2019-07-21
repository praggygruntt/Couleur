import React, {Component} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../Styles/Navbar.css'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from "@material-ui/icons/Close";
import Slide from '@material-ui/core/Slide';
import {Link} from 'react-router-dom';


function SlideTransition(props) {
    return <Slide {...props} direction="right" />;
  }

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorFormat: 'hex',
            snackbarIsOpened: false
        };
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }
    handleFormatChange(event) {
        this.setState({colorFormat: event.target.value, snackbarIsOpened: true});
        this.props.handleChange(event.target.value);
    }
    closeSnackbar() {
        this.setState({snackbarIsOpened: false});
    }
    render() {
        const {level, changeLevel} = this.props;
        const {colorFormat, snackbarIsOpened} = this.state;
        return(
            <header className="Navbar">
                <div className="logo">
                    <Link to="/">COULEUR</Link>
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
                    <Select onChange={this.handleFormatChange} value={colorFormat}>
                        <MenuItem value="hex">HEX - #FFFFFF</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar
                    TransitionComponent={SlideTransition} 
                    anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                    open={snackbarIsOpened}
                    onClose={this.closeSnackbar}
                    autoHideDuration={3000}
                    message={<span id="message-id">{`Format Changed - [${colorFormat.toUpperCase()}]`}</span>}
                    ContentProps={{
                        'aria-describedby': 'message-id'
                    }}
                    action={[
                        <IconButton onClick={this.closeSnackbar} color="inherit" key="close" aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    ]}>
                </Snackbar>
            </header>
        )
    }
}