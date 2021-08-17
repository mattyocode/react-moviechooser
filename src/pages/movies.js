import { useSelector } from "react-redux";

export default function Movies() {
  const movies = useSelector((state) => state.movies.movies);
  return (
    <>
      <h1>This is the movies results page.</h1>
      {movies
        ? movies.map((movie, idx) => {
            return (
              <div key={idx}>
                <h3>{movie.title}</h3>
                <p>{movie.released}</p>
                <p>{movie.plot}</p>
              </div>
            );
          })
        : null}
    </>
  );
}
