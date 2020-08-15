import React, {useEffect} from 'react';
import {MDBBtn, MDBCard} from "mdbreact";
import 'mdbreact/dist/css/mdb.css'
import Paper from "@material-ui/core/Paper";
import ListGroup from "react-bootstrap/ListGroup";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    paper: {
        width: 400,
        height: 300,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

export default function ListTransfer(props) {

    var array = props.array;
    console.log(props.array);

    const initState = [];

    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState(initState);
    const [right, setRight] = React.useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    useEffect(()=>{
        try{
            setLeft( [...array.filter(x => !right.includes(x))]);
        }catch (error){
            console.log(error)
        }

    }, [array, right]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {

        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const handleChange = () => {

    }

    const customList = (items) => (
        <Paper className={classes.paper}>
            <ListGroup dense component="div" className="m-2" role="list">
                {items.map((value, i) => {

                    return (
                        <ListGroup.Item  className="my-1 border" key={i}  onClick={handleToggle(value)}>
                            {['checkbox'].map((type) => (
                                <div key={type} className="">

                                    <input type="checkbox" className="mx-2"
                                           checked={checked.indexOf(value) !== -1} onChange={handleChange}/>
                                    {value}

                                </div>
                            ))}

                        </ListGroup.Item>
                    );
                })}
                <ListItem />
            </ListGroup>
        </Paper>
    );

    return (
        <div>

            <Grid container spacing={2} justify="center" alignItems="center" >

                <MDBCard>
                    <Grid item>
                        {customList(left)}
                    </Grid>
                </MDBCard>

                <Grid item>
                    <Grid container direction="column">

                        <MDBBtn outline
                                size="sm"
                                onClick={handleAllRight}
                                disabled={left.length === 0}
                                color="elegant">
                            ≫
                        </MDBBtn>

                        <MDBBtn outline
                                size="sm"
                                onClick={handleCheckedRight}
                                disabled={leftChecked.length === 0}
                                color="elegant">
                            &gt;
                        </MDBBtn>

                        <MDBBtn outline
                                onClick={handleCheckedLeft}
                                size="sm"
                                disabled={rightChecked.length === 0}
                                color="elegant">
                            &lt;
                        </MDBBtn>

                        <MDBBtn outline
                                size="sm"
                                onClick={handleAllLeft}
                                disabled={right.length === 0}
                                color="elegant">
                            ≪
                        </MDBBtn>

                    </Grid>
                </Grid>
                <MDBCard>
                    <Grid item>{customList(right)}</Grid>
                </MDBCard>


            </Grid>

        </div>
    );
}