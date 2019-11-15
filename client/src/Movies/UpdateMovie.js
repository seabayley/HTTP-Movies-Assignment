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
    const [star, setStar] = useState("")

    const handleTitleChange = e => {
        setMovie({ ...movie, title: e.target.value })
    }

    const handleDirectorChange = e => {
        setMovie({ ...movie, director: e.target.value })
    }

    const handleMetascoreChange = e => {
        setMovie({ ...movie, metascore: Number(e.target.textContent) })
    }

    const handleStarChange = e => {
        setStar(e.target.value)
    }

    const handleAddStar = () => {
        setMovie({ ...movie, stars: [...movie.stars, star]})
        setStar('')
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

    const deleteStar = name => {
        setMovie({...movie, stars: [...movie.stars.filter(x => !(x === name))]})
    }

    const handleCancel = () => {
        props.history.push(`/movies/${movie.id}`)
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
                {movie.stars.map(star => 
                <ListItem>
                    <ListItemText>
                        {star}
                        <button onClick={() => deleteStar(star)}> X </button>
                    </ListItemText>
                </ListItem>)}
            </List>
            <TextField
                id="star-name"
                label="stars"
                onChange={handleStarChange}
                margin="normal"
                variant="outlined"
            />
            <Button variant='contained' color='primary' onClick={handleAddStar}>Add Star</Button>
            <Button variant='contained' color='primary' onClick={(e) => handleUpdateMovie(e)}>Update</Button>
            <Button variant='contained' color='secondary' onClick={handleCancel}>Cancel</Button>
        </div>
    );
};

export default UpdateMovie;