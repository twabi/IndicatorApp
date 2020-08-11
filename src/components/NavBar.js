import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuBar from "./MenuBar";


class NavBar extends React.Component {


    myCallback = (dataFromChild) => {
        //console.log(dataFromChild);
        this.props.callerBack(dataFromChild);
    }

    render() {


        return(
            <div>
                <AppBar position="sticky" >
                    <Toolbar>
                        <div >
                            <Typography variant="title" color="inherit">
                                <h3>Indicator App for NAMIS</h3>
                            </Typography>
                        </div>
                        <MenuBar callerBack={this.myCallback} className="float-right">Hello</MenuBar>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }


}
export default NavBar;