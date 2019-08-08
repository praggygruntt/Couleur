import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {withStyles} from '@material-ui/styles';

const styles = {
    form: {
        display: "flex",
        alignItems: "center",
    }
};

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            newPaletteName: ""
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };
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
    handleClickOpen() {
        this.setState({open: true});
    };
    handleClose() {
        this.setState({open: false})
    };
    render() {
        const {classes} = this.props;
        return (
            <div>
              <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                Open form dialog
              </Button>
              <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
                  </DialogContentText>
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
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleClose} color="primary">
                    Subscribe
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          );
        }
    }

export default withStyles(styles)(PaletteMetaForm);