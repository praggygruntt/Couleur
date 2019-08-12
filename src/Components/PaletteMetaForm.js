import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {withStyles} from '@material-ui/styles';
import {Picker} from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import '../Styles/PaletteMetaForm.css'; 

const styles = {
    dialog: {
        "@media (max-width: 767px)": {
            margin: "5px !important"
        },
    }
};

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: "form",
            newPaletteName: ""
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.savePalette = this.savePalette.bind(this);
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
    };
    showEmojiPicker() {
        this.setState({stage: "emoji"})
    }
    handleClickOpen() {
        this.setState({open: true});
    };
    handleClose() {
        this.setState({open: false});
        this.props.hideForm();
    };
    savePalette(emoji) {
        console.log(emoji);
        this.props.handleSubmit({
            paletteName: this.state.newPaletteName,
            emoji: emoji.native
        }); 
    }
    render() {
        const {classes} = this.props;
        return (
            <div>
            <Dialog className={classes.dialog} open={this.state.stage === "emoji"} onClose={this.handleClose} >
                <Picker onSelect={this.savePalette} title={"Pick an Emoji!"}/>
            </Dialog>
              <Dialog className={classes.dialog} open={this.state.stage === "form"} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Name Your Palette</DialogTitle>
                <ValidatorForm onSubmit={this.showEmojiPicker} className={classes.form}>
                <DialogContent style={{margin: 0}}>
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
              </div>
          );
        }
    }

export default withStyles(styles)(PaletteMetaForm);