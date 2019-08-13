import React, {Component} from 'react';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import "../Styles/PaletteList.css";
import { CSSTransition, TransitionGroup, Transition} from 'react-transition-group';

const styles = {
    root: {
        height: "100vh",
        alignItems: 'flex-start',
        justifyContent: 'center',
        display: "flex",
        overflow: "scroll",
        padding: "1rem"
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
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "5%",
        padding: "20px",
        "@media (max-width: 900px)": {
            gridTemplateColumns: "repeat(2, 47%)",
            gridGap: "6%"
        },
        "@media (max-width: 490px)": {
            gridTemplateColumns: "repeat(1, 100%)",
            gridGap: "0%",
            margin: "0 auto",
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
    }
};

class PaletteList extends Component {
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    };
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
                                        deletePalette={this.props.deletePalette}
                                        id={palette.id}
                                        />
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </div>
                </div>
            </div>
        )
    }
};

export default withStyles(styles)(PaletteList);