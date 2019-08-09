import React, {Component} from 'react';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddBox from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/styles';
import PaletteMetaForm from './PaletteMetaForm';

const drawerWidth = 350;

const styles = theme => ({
    navBtns: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: "1rem"
    },
    button: {
        margin: "10px",
        "& a":
         {textDecoration: "none"}
    },
    link: {
        textDecoration: "none"
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
    }
    showForm() {
        this.setState({formShowing: true});
    };
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
                    <Typography variant="h6" color="inherit" noWrap>
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
                {this.state.formShowing && <PaletteMetaForm palettes={this.props.palettes} handleSubmit={this.props.handleSubmit}/>}
        </div>)
    }
};

export default withStyles(styles, { withTheme: true })(NewPaletteFormNav);