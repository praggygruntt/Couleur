import React, {Component} from 'react';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddBox from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/styles';

import PaletteMetaForm from './PaletteMetaForm';

const styles = theme => ({
    root: {
        minHeight: "64px"
    },
    appBar: {},
    appBarShift: {},
    menuButton: {},
    hide: {},
    drawer: {},
    drawerPaper: {},
    drawerHeader: {},
    content: {},
    contentShift: {},
    container: {},
    buttons: {},
    colorPicker: {},
    addColorBtn: {},
    colorInput: {},
    colorInputForm: {},
    navBtns: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: "10px",
        "@media (max-width: 760px)": {
            display: "flex",
            justifyContent: 'space-around'
        },
    },
    button: {
        margin: "10px",
        "& a":
         {textDecoration: "none"}
    },
    link: {
        textDecoration: "none"
    },
    navTitle: {
        textAlign: "center",
        "@media (max-width: 400px)": {
            display: "none"
        }
    }
});

class NewPaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPaletteName: "",
            formShowing: false
        };
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);   
    }
    showForm() {
        this.setState({formShowing: true});
    };
    hideForm() {
        this.setState({formShowing: false})
    }
    render() {
        const {classes, open} = this.props;
        return (<div className={classes.root}>
            <CssBaseline />
            <AppBar
                color="default"
                position="fixed"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open,}, classes.navContainer)}>
                <Toolbar disableGutters={!open} className={classes.toolbar}>
                    <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.props.handleDrawerOpen}
                    className={classNames(classes.menuButton, open && classes.hide)}>
                        <AddBox />
                        </IconButton>
                    <Typography variant="h6" color="inherit" noWrap className={classes.navTitle}>
                        Create A Palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <Link to="/" className={classes.link}>
                            <Button className={classes.button} variant="contained" color="secondary">
                                Back
                            </Button>
                        </Link>
                        <Button className={classes.button} variant="contained" color="primary" onClick={this.showForm}>
                            Save
                        </Button>
                        </div>
                </AppBar>
                {this.state.formShowing && <PaletteMetaForm palettes={this.props.palettes} handleSubmit={this.props.handleSubmit} hideForm={this.hideForm}/>}
        </div>)
    }
};

export default withStyles(styles, { withTheme: true })(NewPaletteFormNav);