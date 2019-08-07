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

const drawerWidth = 350;

const styles = theme => ({
    form: {
        display: "flex",
        alignItems: "center",
    },
    navBtns: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }
});

class NewPaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPaletteName: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
            this.props.palettes.every(
                ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
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
                    <Typography variant="h6" color="inherit" noWrap>
                        Create A Palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <ValidatorForm onSubmit={() => this.props.handleSubmit(this.state.newPaletteName)} className={classes.form}>
                            <TextValidator
                                name="newPaletteName"
                                value={this.state.newPaletteName}
                                label="Palette Name"
                                onChange={this.handleChange}
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={['Must give your palette a name!', "Name already taken!"]}/>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary">
                                    Save Palette
                                </Button>
                            </ValidatorForm>
                            <Link to="/">
                                <Button variant="contained" color="secondary">Go Back</Button>
                                </Link>
                        </div>
                </AppBar>
        </div>)
    }
};

export default withStyles(styles, { withTheme: true })(NewPaletteFormNav);