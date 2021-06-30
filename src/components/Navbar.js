import React, { Component } from 'react'
import DrawerToggleButton from './DrawerToggleButton'
import './Navbar.css'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

function SimpleDialog(props) {
    const { onClose, open } = props;

    const [value, setValue] = React.useState('1');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Select a reason to end class</DialogTitle>
            <div style={{ marginLeft: "10%" }}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup name="gender1" value={value} onChange={handleChange}>
                        <FormControlLabel value="1" control={<Radio />} label="Class Completed" />
                        <FormControlLabel value="2" control={<Radio />} label="Class Interrupted/aborted" />
                        <div style={{ marginLeft: "3%", flexDirection: "column" }}>
                            <FormControlLabel value="3" control={<Radio />} label="Student didn't show up in the class" />
                            <FormControlLabel value="4" control={<Radio />} label="Student didn't show any interest" />
                            <br /><FormControlLabel value="5" control={<Radio />} label="Student got disconnected" />
                            <br /><FormControlLabel value="6" control={<Radio />} label="I got disconnected" />
                            <br /><FormControlLabel value="7" control={<Radio />} label="Other reason" />
                            <br />
                            <textarea style={{marginTop:"5%"}}>
                                Type here
                            </textarea>
                        </div>
                    </RadioGroup>

                </FormControl>
                <div style={{ flexDirection: "row",marginTop:"5%" }}>
                    <div>
                        <Button variant="contained" color="primary">
                            End
                        </Button>
                    </div>
                    <div style={{ marginLeft: "20%",marginTop:"-7%",marginBottom:"5%" }}>
                        <Button variant="contained" color="primary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minutes: 10,
            seconds: 0,
            open: false
        }
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    handleClickOpen() {
        this.setState({
            open: true
        })
    };
    handleClose() {
        this.setState({
            open: false,
        })
    };

    render() {
        const { minutes, seconds } = this.state
        return (
            <header className="toolbar">
                <nav className="toolbar__navigation">

                    <div className="toolbar__logo">
                        <a href="/">Codingal</a>
                    </div>
                    <div className="spacer" />
                    <div className="toolbar_navigation-items">
                        <ul>
                            <li style={{marginTop:"9%",marginRight:"10%"}}>
                                <Link to="/posts" style={{fontSize:22}}>Posts</Link>
                            </li>
                            <li style={{fontSize:20,color:"white"}}>
                                {minutes === 0 && seconds === 0
                                    ? <p>Busted!</p>
                                    : <p>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
                                }
                            </li>
                            <li style={{marginTop:"5%"}}>
                                <Button variant="contained" color="secondary" onClick={() => { this.handleClickOpen() }}>
                                    End
                                </Button>
                                <SimpleDialog open={this.state.open} onClose={() => { this.handleClose() }} />
                            </li>
                        </ul>
                    </div>
                    <div className="toolbar__toggle-button">
                        <DrawerToggleButton click={this.props.drawerClickHandler} />
                    </div>
                </nav>
            </header>
        )
    }
}

export default Navbar
