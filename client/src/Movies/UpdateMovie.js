import React, { useState, useEffect } from 'react';
import axios from 'axios'

const UpdateMovie = props => {
    const [movie, setMovie] = useState(props.location.state.movie || {})
    const [metascore, setMetascore] = useState(0)
    const [stars, setStars] = useState([])

    const handleTitleChange = e => {
        setMovie({ ...movie, title: e.target.value })
    }

    const handleDirectorChange = e => {
        setMovie({ ...movie, director: e.target.value })
    }

    const handleMetascoreChange = e => {
        setMetascore(e.target.value)
    }

    const handleStarsChange = e => {
        setStars(e.target.value.split(' ').join())
    }

    const handleUpdateMovie = e => {
        e.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, { ...movie })
            .then(response => {
                props.history.push('')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="update-form">
            <form onSubmit={(e) => handleUpdateMovie(e)}>
                Title
                <input
                    type="text"
                    name="title"
                    value={movie.title}
                    placeholder={movie.title}
                    onChange={handleTitleChange}
                />
                Director
                <input
                    type="text"
                    name="director"
                    value={movie.director}
                    placeholder={movie.director}
                    onChange={handleDirectorChange}
                />
                <button>Update</button>
            </form>
        </div>
    );
};

export default UpdateMovie;