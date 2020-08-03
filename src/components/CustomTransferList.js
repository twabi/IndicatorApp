import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ListGroup from 'react-bootstrap/ListGroup'
import Form from "react-bootstrap/Form";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    paper: {
        width: 480,
        height: 430,
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

function CustomTransferList(props) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);

    var indicatorArray = props.headerProp;

    const loadIndi = () => {
        setLeft( [...indicatorArray.filter(x => !right.includes(x))]);
        //console.log(date + "T"+ time);

    }

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

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

    const customList = (items) => (
        <Paper className={classes.paper}>
            <ListGroup dense component="div" role="list">
                {items.map((value) => {
                    //const labelId = `transfer-list-item-${value.displayName}-label`;

                    return (
                        <ListGroup.Item action className="my-5 border" key={value.id}  onClick={handleToggle(value)}>
                            {['checkbox'].map((type) => (
                                <div key={type} className="mb-3">

                                        <input type="checkbox" className="mx-5"
                                               checked={checked.indexOf(value) !== -1}/>
                                    {value.displayName}

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
        <div className={classes.root}>
            <div style={{textAlign: "center", margin: 10}}>
                <h4>Choose preferred Indicators</h4>
                <div className={classes.wrapper}>
                    <Button style={{margin: 10}}
                            variant="contained"
                            id="loadBtn"
                            color="primary"
                            onClick={loadIndi}>
                        load indicators
                    </Button>

                </div>

            </div>
            <Grid container spacing={2} justify="center" alignItems="center" >
                <Grid item>{customList(left)}</Grid>
                <Grid item>
                    <Grid container direction="column">
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleAllRight}
                            disabled={left.length === 0}
                            aria-label="move all right">
                            ≫
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleCheckedRight}
                            disabled={leftChecked.length === 0}
                            aria-label="move selected right">
                            &gt;
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleCheckedLeft}
                            disabled={rightChecked.length === 0}
                            aria-label="move selected left">
                            &lt;
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleAllLeft}
                            disabled={right.length === 0}
                            aria-label="move all left">
                            ≪
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>{customList(right)}</Grid>

            </Grid>
            <Grid container justify="center" alignItems="center" className={classes.another}>
                <Button variant="contained" color="primary">
                    Next
                </Button>
            </Grid>

            <Grid container justify="center" border={1} className={classes.selContainer}>

            </Grid>

        </div>


    );
}

export default React.memo(CustomTransferList)