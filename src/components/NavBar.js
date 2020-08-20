import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuBar from "./MenuBar";
import {MDBBtn} from "mdbreact";


class NavBar extends React.Component {


    myCallback = (dataFromChild) => {
        //console.log(dataFromChild);
        this.props.callerBack(dataFromChild);
    }
    reloadPage() {
        window.location.reload(false);
    }

     handleClose = () => {
        this.reloadPage();

    };

    render() {


        return(
            <div>
                <AppBar position="sticky" className="mb-5">
                    <Toolbar>
                        <div >
                            <Typography variant="title" color="inherit">
                                <h3>Indicator App for NAMIS</h3>
                            </Typography>
                        </div>
                        <MDBBtn style={{float: "right", marginLeft: "auto", marginRight: 30 }}
                                onClick={this.handleClose} gradient="blue">HOME</MDBBtn>
                    </Toolbar>
                </AppBar>

            </div>
        )
    }


}
export default NavBar;