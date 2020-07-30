import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from "@material-ui/core/Typography";



function Sidebar() {
    return (
            <div className="sidebar">
                <List disablePadding dense>
                    <ListItem button>
                        <ListItemText disableTypography primary={<Typography type="body2" style={{ fontSize: 18 }}>Display Name</Typography>}>Display Name</ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemText disableTypography primary={<Typography type="body2" style={{ fontSize: 18 }}>Custom Reports</Typography>}>Custom Reports</ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemText disableTypography primary={<Typography type="body2" style={{ fontSize: 18 }}>Analysis</Typography>}>Analysis</ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemText disableTypography primary={<Typography type="body2" style={{ fontSize: 18 }}>Time Periods</Typography>}>Time Periods</ListItemText>
                    </ListItem>
                </List>
            </div>


    )
}

export default Sidebar