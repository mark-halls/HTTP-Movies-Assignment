import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";

const UpdateMovieForm = ({
  id,
  director,
  metascore,
  stars,
  title,
  ...rest
}) => {
  const [movie, setMovie] = useState({
    director: "",
    metascore: "",
    stars: [],
    title: ""
  });

  const handleChange = event => {
    setMovie({ ...movie, [event.target.name]: event.target.value });
  };

  const handleStarsChange = event => {
    setMovie({ ...movie, [event.target.name]: event.target.value.split(", ") });
  };

  const handleSubmit = useCallback(() => {
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(() => rest.history.push("/"))
      .catch(err => console.error(err));
  }, [movie, rest.history]);

  useEffect(() => {
    if (!id) {
      async function getMovie() {
        await axios
          .get(`http://localhost:5000/api/movies/${rest.match.params.id}`)
          .then(res => setMovie(res.data))
          .catch(err => console.error(err));
      }
      getMovie();
    } else {
      setMovie({ id, director, metascore, title, stars: [...stars] });
    }
  }, [id, director, metascore, title, stars, rest.match.params.id]);

  return (
    <div>
      <input
        type="text"
        name="director"
        value={movie.director}
        onChange={handleChange}
        placeholder="Director"
      />
      <input
        type="text"
        name="metascore"
        value={movie.metascore}
        onChange={handleChange}
        placeholder="Metascore"
      />
      <input
        type="text"
        name="stars"
        value={movie.stars.join(", ")}
        onChange={handleStarsChange}
        placeholder="Stars (comma separated)"
      />
      <input
        type="text"
        name="title"
        value={movie.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default UpdateMovieForm;
