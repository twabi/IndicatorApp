import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from "@material-ui/core/Button";
import { MDBBtn } from "mdbreact";
import 'mdbreact/dist/css/mdb.css'

const options = [
    'Home',
    'DisplayName',
    'Custom Reports',
    'Analysis',
    'Time periods',
];

const ITEM_HEIGHT = 48;

export default function LongMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    function reloadPage() {
        window.location.reload(false);
    }

    const handleClose = () => {
        reloadPage();

    };

    return (
        <div style={{float: "right", marginLeft: "auto", marginRight: 30 }}>
            <MDBBtn onClick={handleClose} gradient="blue">HOME</MDBBtn>
        </div>
    );
}