import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'


class NavBar extends React.Component {

    render() {

        return(
            <div>
                <AppBar position="sticky" >
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            <h3>{this.props.named}</h3>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }


}
export default NavBar;