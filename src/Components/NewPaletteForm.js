import React, {Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddBox from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {ChromePicker} from 'react-color';   
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList';
import {arrayMove} from 'react-sortable-hoc';
import {Link} from 'react-router-dom';
import NewPaletteFormNav from './NewPaletteFormNav';

const drawerWidth = 350;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    height: "64px"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    height: "calc(100vh - 64px)"
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class NewPaletteForm extends React.Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            currentColor: "teal",
            colors: [...this.props.palettes[0].colors],
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
  handleSubmit(newPaletteName) {
      const newPalette = {
          paletteName: newPaletteName,
          colors: this.state.colors,
          id: newPaletteName.toLowerCase().replace(/ /g, "-"),
          emoji: "test",
      }
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
        const randomColor = randomPalette.colors[Math.floor(Math.random()*randomPalette.colors.length)];
      this.setState(st => 
        ({colors: [...st.colors, randomColor]})
      );
  }
// ==========================================================================================================================
  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <NewPaletteFormNav open={open} classes={classes} handleSubmit={this.handleSubmit} handleDrawerOpen={this.handleDrawerOpen}/>
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
          <Typography variant="h4">Design Your Palette</Typography>
          <div>
            <Button variant="contained" color="secondary" onClick={this.clearPalette}>Clear Palette</Button>
            <Button disabled={this.state.colors.length >= this.props.maxColors} variant="contained" color="primary" onClick={this.randomColor}>
                {this.state.colors.length >= this.props.maxColors ? "Palette Full" : "Random Color"}
            </Button>
            </div>
          <ChromePicker color={this.state.currentColor} onChangeComplete={(newColor) => this.setState({currentColor: newColor.hex})}/>
          <ValidatorForm
            ref="form"
            onSubmit={this.addNewColor}
            onError={errors => console.log(errors)}
            >
              <TextValidator 
                label="Name your color"
                onChange={this.handleChange}
                name="newColorName"
                value={this.state.newColorName}
                validators={['required', 'isColorNameUnique', 'isColorUnique']}
                errorMessages={['Must give your color a name!', "Color name must be unique!", "Color already used!"]}
              />
            <Button
                type="submit" 
                variant="contained"
                style={{backgroundColor: this.state.currentColor}}
                disabled={this.state.colors.length >= this.props.maxColors}
            >
                {this.state.colors.length >= this.props.maxColors ? "Palette Full" : "Add Color"}
            </Button>
            </ValidatorForm>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList axis="xy" items={this.state.colors} colors={this.state.colors} removeColor={this.removeColor} onSortEnd={this.onSortEnd}/>
        </main>
      </div>
    );
  }
}


export default withStyles(styles, { withTheme: true })(NewPaletteForm);