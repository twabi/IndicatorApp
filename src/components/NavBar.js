import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {MDBBtn} from "mdbreact";


class NavBar extends React.Component {


    myCallback = (dataFromChild) => {
        this.props.callerBack(dataFromChild);
    }
    reloadPage() {
        window.location.reload(false);
    }

     handleClose = () => {
        window.location.href = "/";

    };

    render() {


        return(
            <div>
                <AppBar position="sticky" className="mb-5 text-white">
                    <Toolbar>
                        <div >
                            <Typography variant="title" color="inherit">
                                <h3 className="text-white">Indicator App for NAMIS</h3>
                            </Typography>
                        </div>
                        <MDBBtn style={{float: "right", marginLeft: "auto", marginRight: 30 }}
                                onClick={this.handleClose} color="info">HOME</MDBBtn>
                    </Toolbar>
                </AppBar>

            </div>
        )
    }


}
export default NavBar;