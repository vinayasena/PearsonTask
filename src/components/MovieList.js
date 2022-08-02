import React from "react";
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
const MovieList = (props) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [movieInfo, setMovieInfo] = React.useState([]);
  const open = () => setShowDialog(true);
  const close = () => {
    setShowDialog(false);
    setMovieInfo([]);
  };

  const FavouriteComponent = props.favouriteComponent;

  const getMovieInfo = async (id) => {
    const url = `http://www.omdbapi.com/?i=${id}&apikey=263d22d8`;

    const response = await fetch(url);
    const responseJson = await response.json();

    setMovieInfo(responseJson);
  };
  const openMovieInfo = (id) => {
    getMovieInfo(id);
    setShowDialog(true);
  };
  return (
    <>
      {props.movies.map((movie, index) => (
        <div
          className="image-container d-flex justify-content-start m-3"
          key={movie.imdbID}
        >
          <div onClick={() => openMovieInfo(movie.imdbID)}>
            <img src={movie.Poster} alt="movie"></img>
          </div>
          <div
            onClick={() => props.handleFavouritesClick(movie)}
            className="overlay d-flex align-items-center justify-content-center"
          >
            <FavouriteComponent />
          </div>
        </div>
      ))}
      {
        <DialogOverlay
          style={{ background: "hsla(0, 100%, 100%, 0.9)" }}
          isOpen={showDialog}
          onDismiss={close}
        >
          <DialogContent
            style={{ boxShadow: "0px 10px 50px hsla(0, 0%, 0%, 0.33)" }}
          >
            <div>
              {movieInfo && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "space-between",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <img src={movieInfo.Poster} alt="movie"></img>
                  </div>

                  <div>
                    <p className="movieInfo">
                      <b>Title:</b> {movieInfo.Title}
                    </p>
                    <p className="movieInfo">
                      <b>Plot:</b> {movieInfo.Plot}
                    </p>
                    <p className="movieInfo">
                      <b>Year:</b> {movieInfo.Year}
                    </p>
                    <p className="movieInfo">
                      <b>imdbRating:</b> {movieInfo.imdbRating}
                    </p>
                    <p className="movieInfo">
                      <b>Runtime:</b> {movieInfo.Runtime}
                    </p>
                    <p className="movieInfo">
                      <b>Language:</b> {movieInfo.Language}
                    </p>
                    <p className="movieInfo">
                      <b>Genre:</b> {movieInfo.Genre}
                    </p>
                    <p className="movieInfo">
                      <b>Released:</b> {movieInfo.Released}
                    </p>
                  </div>
                </div>
              )}
              <div style={{display:'flex', marginTop:'10px'}}>
                <button onClick={close}>close</button>
              </div>
            </div>
          </DialogContent>
        </DialogOverlay>
      }
    </>
  );
};

export default MovieList;
