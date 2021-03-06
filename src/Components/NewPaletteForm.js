import React, {Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {ChromePicker} from 'react-color';   
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import arrayMove from 'array-move';

import DraggableColorList from './DraggableColorList';
import NewPaletteFormNav from './NewPaletteFormNav';

const drawerWidth = 350;

const styles = theme => ({
  root: {
    display: 'flex',
    height: "100%"
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    minHeight: "64px !important",
    flexDirection: "row",
    justifyContent: "space-between",
    "@media (max-width: 760px)": {
      alignContent: 'center',
      // height: "auto"
    },
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    "@media (max-width: 740px)": {
      width: `calc(100% - 250px)`
  },
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    "@media (max-width: 740px)": {
      width: "100%",
      
    }
  },
  drawerPaper: {
    width: drawerWidth,
    justifyContent: "center",
    display: "flex",
    "@media (max-width: 740px)": {
      width: "100%"
    }
  },
  drawerHeader: {
    height: "64px",
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    // height: "calc(100vh - 64px)",
    "@media (max-width: 740px)": {
      marginLeft: "-100vw"
    }
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    height: "100%",
    "@media (max-width: 740px)": {
      padding: "1rem"
    }
  },
  buttons: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginTop: ".5rem"
  },
  colorPicker: {
    width: "100% !important",
    marginTop: "1rem"
  },
  addColorBtn: {
    fontSize: "2rem",
    color: "white",
    textShadow: "2px 1px black",
    width: "100%",
    marginTop: "1rem",
    "&:hover": {
    }
  },
  colorInput: {
    width: "100%",
    margin: "1rem"
  },
  colorInputForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%"
  },
  button: {
    margin: "2px"
  }
});

class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            currentColor: "teal",
            colors: this.props.backupPalette.colors,
            newColorName: ""
        };
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeColor = this.removeColor.bind(this);
        this.clearPalette = this.clearPalette.bind(this);
        this.randomColor = this.randomColor.bind(this);
    };
    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', value => 
            this.state.colors.every(
                ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', value => 
            this.state.colors.every(
                ({color}) => color !== this.state.currentColor
            )
        );
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
            this.props.palettes.every(
                ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  addNewColor() {
      const newColor = {color: this.state.currentColor, name: this.state.newColorName};
      this.setState({colors: [...this.state.colors, newColor], newColorName: ""});
  };
  handleChange(event) {
      this.setState({
          [event.target.name]: event.target.value
      })
  }
  handleSubmit(newPalette) {
      newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
      newPalette.colors = this.state.colors;
    this.props.savePalette(newPalette);
    this.props.history.push('/');
  }
  removeColor(colorName) {
      this.setState({
          colors: this.state.colors.filter(color => color.name !== colorName)
      })
  };
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };
  clearPalette(){
      this.setState({colors: []})
  };
  randomColor() {
        const {palettes} = this.props;
        const randomPalette = palettes[Math.floor(Math.random()*palettes.length)];
        let randomColor = randomPalette.colors[Math.floor(Math.random()*randomPalette.colors.length)];
        let isDuplicateColor = true;
        while(isDuplicateColor) {
          randomColor = randomPalette.colors[Math.floor(Math.random()*randomPalette.colors.length)];
          isDuplicateColor = this.state.colors.some(color => color.name ===randomColor.name);

        }
      this.setState(st => 
        ({colors: [...st.colors, randomColor]})
      );
  }
// ==========================================================================================================================
  render() {
    const { classes, palettes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <NewPaletteFormNav palettes={palettes} open={open} classes={classes} handleSubmit={this.handleSubmit} handleDrawerOpen={this.handleDrawerOpen}/>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant="h4" style={{textAlign: "center"}}>Design Your Palette</Typography>
            <div className={classes.buttons}>
              <Button variant="contained" color="secondary" onClick={this.clearPalette} className={classes.button}>Clear Palette</Button>
              <Button className={classes.button} disabled={this.state.colors.length >= this.props.maxColors} variant="contained" color="primary" onClick={this.randomColor}>
                  {this.state.colors.length >= this.props.maxColors ? "Palette Full" : "Random Color"}
              </Button>
              </div>
            <ChromePicker className={classes.colorPicker} color={this.state.currentColor} onChangeComplete={(newColor) => this.setState({currentColor: newColor.hex})}/>
            <ValidatorForm
              instantValidate={false}
              ref="form"
              onSubmit={this.addNewColor}
              onError={errors => console.log(errors)}
              className={classes.colorInputForm}
              >
                <TextValidator 
                  variant="filled"
                  className={classes.colorInput}
                  label="Color Name"
                  onChange={this.handleChange}
                  name="newColorName"
                  value={this.state.newColorName}
                  validators={['required', 'isColorNameUnique', 'isColorUnique']}
                  errorMessages={['Must give your color a name!', "Color name must be unique!", "Color already used!"]}
                />
              <Button
                  className={classes.addColorBtn}
                  type="submit" 
                  variant="contained"
                  style={this.state.colors.length < this.props.maxColors ? {backgroundColor: this.state.currentColor} : {backgroundColor: "gray"}}
                  disabled={this.state.colors.length >= this.props.maxColors}
              >
                  {this.state.colors.length >= this.props.maxColors ? "Palette Full" : "Add Color"}
              </Button>
              </ValidatorForm>
            </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList distance={5} axis="xy" items={this.state.colors} colors={this.state.colors} removeColor={this.removeColor} onSortEnd={this.onSortEnd}/>
        </main>
      </div>
    );
  }
}


export default withStyles(styles, { withTheme: true })(NewPaletteForm);