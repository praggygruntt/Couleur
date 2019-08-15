import React, {Component} from 'react';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import "../Styles/PaletteList.css";
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const styles = {
    root: {
        height: "100vh",
        alignItems: 'flex-start',
        justifyContent: 'center',
        display: "flex",
        overflow: "scroll",
        padding: "1rem",
        boxSizing: "border-box"
    },
    container: {
        width: "50%",
        margin: "1rem",
        display: "flex",
        alignItems: 'flex-start',
        flexDirection: "column",
        flexWrap: "wrap",
        "@media (max-width: 1200px)": {
            width: "70%"
        },
        "@media (max-width: 900px)": {
            width: "100%",
            margin: "0"
        },
    },
    nav: {
        boxSizing: "border-box",
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white",
        alignItems: "center",
        "& a": {
            color: "white",
            lineHeight: "2"
        },
        "@media (max-width: 696px)": {
            flexDirection: "column",
            textAlign: "center",
            background: "black",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "1px 1px 10px 1px rgba(0,0,0,.5)"
        },
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        "@media (max-width: 425px)": {
            
        },
        "@media (max-width: 696px)": {
            marginTop: "20px",
            padding: "0"
        },
    },
    title: {
        fontFamily: 'Permanent Marker, cursive',
        textShadow: "1px 1px black",
        fontSize: "2rem",
        "@media (max-width: 490px)": {
            margin: "5px"
        },
    },
    newPaletteButton: {
        textDecoration: "none",
        color: "white",
        margin: "10px",
        "& button": {
            textDecoration: "none",
            backgroundColor: "green",
            color: "white",
            fontWeight: "bold",
            "&:hover": {
                backgroundColor: "darkGreen"
            }
        }
    },
    dialogButtonContainer: {
        justifyContent: "center"
    },
    dialogTitle: {
        padding: "10px 40px"
    },
    dialog: {
        padding: "2rem"
    },
    dialogButton: {
        width: "50%"
    }
};

class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            deletingID: ""
        };
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    openDialog(id) {
        this.setState({open: true, deletingID: id});
    }
    closeDialog() {
        this.setState({open: false, deletingID: ""});
    }
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }
    handleDelete() {
        this.props.deletePalette(this.state.deletingID);
        this.closeDialog();
    }
    render() {
        const {classes, palettes} = this.props;
        return(
            <div className={`${classes.root} PaletteList`}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.title}>COULEUR · Palette Designer</h1>
                        <Link to="/new-palette" className={classes.newPaletteButton}><Button variant=
                        "contained">Create Palette</Button></Link>
                    </nav>
                    <div className={classes.palettes}>
                        <TransitionGroup component={null}>
                            {palettes.map(palette => (
                                <CSSTransition key={palette.id} timeout={500} classNames="item">
                                    <MiniPalette {...palette} 
                                        handleClick={()=>this.goToPalette(palette.id)}
                                        key={palette.id} 
                                        // deletePalette={this.props.deletePalette}
                                        openDialog={this.openDialog}
                                        id={palette.id}
                                        />
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </div>
                </div>
                <Dialog open={this.state.open} className={classes.dialog} onClose={this.closeDialog}>
                    <DialogTitle id="simple-dialog-title" className={classes.dialogTitle}>Delete Palette?</DialogTitle>
                    <DialogActions className={classes.dialogButtonContainer}>
                        <Button variant="contained" color="primary" className={classes.dialogButton} onClick={this.closeDialog}><ArrowBackIcon /></Button>
                        <Button variant="contained" color="secondary" className={classes.dialogButton} onClick={this.handleDelete}><DeleteIcon /></Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
};

export default withStyles(styles)(PaletteList);