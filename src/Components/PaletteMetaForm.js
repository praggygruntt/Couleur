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
};

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
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
              <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Name Your Palette</DialogTitle>
                <ValidatorForm onSubmit={() => this.props.handleSubmit(this.state.newPaletteName)} className={classes.form}>
                <DialogContent>
                  <DialogContentText>
                   Give your snazzy new palette a <b>unique</b> name! Be creative with it!
                  </DialogContentText>
                            <TextValidator
                                margin="normal"
                                name="newPaletteName"
                                fullWidth
                                value={this.state.newPaletteName}
                                label="Palette Name"
                                onChange={this.handleChange}
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={['Must give your palette a name!', "Name already taken!"]}/>
                            
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button
                        type="submit"
                        variant="contained"
                        color="primary">
                        Save Palette
                    </Button>
                </DialogActions>
                </ValidatorForm>
              </Dialog>
          );
        }
    }

export default withStyles(styles)(PaletteMetaForm);