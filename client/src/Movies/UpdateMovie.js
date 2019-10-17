import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import Slider from '@material-ui/core/Slider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import axios from 'axios'

const UpdateMovie = props => {
    const [movie, setMovie] = useState(props.location.state.movie || {})
    const [metascore, setMetascore] = useState(0)
    const [stars, setStars] = useState(props.location.state.movie.stars)

    const handleTitleChange = e => {
        setMovie({ ...movie, title: e.target.value })
    }

    const handleDirectorChange = e => {
        setMovie({ ...movie, director: e.target.value })
    }

    const handleMetascoreChange = e => {
        setMovie({ ...movie, metascore: Number(e.target.textContent) })
    }

    const handleStarsChange = e => {
        setStars(e.target.value.split(' ').join())
    }

    const handleUpdateMovie = e => {
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, { ...movie })
            .then(response => {
                props.history.push('')
            })
            .catch(err => {
                console.log(err)
            })
    }

    const useStyles = makeStyles(theme => ({
        root: {
            width: 300,
            padding: '1rem',
            margin: '1rem auto'
        },
        margin: {
            height: theme.spacing(3),
        },
    }));

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TextField
                id="movie-title"
                label="Title"
                value={movie.title}
                onChange={handleTitleChange}
                margin="normal"
                variant="outlined"
            />
            <TextField
                id="director-name"
                label="Director"
                value={movie.director}
                onChange={handleDirectorChange}
                margin="normal"
                variant="outlined"
            />
            <Typography id="metascore-slider">Metascore</Typography>
            <Slider
                defaultValue={50}
                step={1}
                marks
                min={0}
                max={100}
                onChange={handleMetascoreChange}
                valueLabelDisplay="auto"
            />
            <Typography id="stars-list">Movie Stars</Typography>
            <List>
                {stars.map(star => <ListItem><ListItemText>{star}</ListItemText></ListItem>)}
            </List>
            <Button variant='contained' color='primary'>Add Star</Button>
            <Button variant='contained' color='secondary'>Remove Star</Button>
            <Button variant='contained' color='primary' onClick={(e) => handleUpdateMovie(e)}>Update</Button>
            <Button variant='contained' color='secondary'>Cancel</Button>
        </div>
    );
};

export default UpdateMovie;