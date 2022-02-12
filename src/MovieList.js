import { Movie } from "./Movie";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory } from "react-router-dom";
import { useEffect,useState } from "react";
import {API_URL} from "./global-constants";

//export function MovieList({ movies,setMovies }) {
 
  export function MovieList() {
  const [movies,setMovies]=useState([]);
  //app mounted only once->useEffect->fetch-setMovies
  const getMovies=()=> {
    fetch(`${API_URL}/movies`)
    .then((data)=>data.json())
    .then((mvs)=>setMovies(mvs));
  };

  useEffect(getMovies,[]);
  //after delete refresh
  const deleteMovie=(id)=>{
    fetch(`${API_URL}/movies/${id}`,
          {method:"DELETE",
        }).then(()=>getMovies());
  }

  const history=useHistory();
  return (
    <section className="movie-list">
      {movies.map(({ name, rating, summary, poster ,id,_id}) => (
        <Movie 
        key={_id}
        name={name}
         poster={poster} 
         rating={rating} 
         summary={summary} 
         id={_id}
        deleteButton={<IconButton 
           
          onClick={() =>  deleteMovie(_id)}
          className="movie-show-button"
          color="error"
          aria-label="delete movie"
          >
            <DeleteIcon />
          </IconButton>}

        editButton={<IconButton 
          style={{marginLeft:"auto"}}
          className="movie-show-button" 
          onClick={() => history.push("/movies/edit/" + _id)}
          color="primary" 
          aria-label="movie edit" >
            <EditIcon />
          </IconButton>}
        />))}
    </section>
  );
}