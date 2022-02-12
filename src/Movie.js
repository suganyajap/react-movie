import { useState } from 'react';
import { Counter } from './Counter';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useHistory } from 'react-router-dom';


export function Movie({ name, poster, rating, summary,id ,deleteButton,editButton}) {
  const history=useHistory();
  const [show, setShow] = useState(true);
  const styles = { color: rating < 7 ? "crimson" : "green", fontWeight: "bold", };
  const summaryStyles = {
    display: show ? "block" : "none",
  };
  return (
    <Card className="movie-container">
      <img className="movie-pic" src={poster} alt={name} />
      <CardContent>
      <div className="movie-specs">
        <h3 className="movie-name">{name}
        <IconButton 
        className="movie-show-button" 
        onClick={() => {
          console.log(id);
          history.push("/movies/"+id);
        }}
        color="primary" 
        aria-label="more info" >
          <InfoIcon />
        </IconButton>
       
        

        <IconButton 
        className="movie-show-button" 
        onClick={() => setShow(!show)} 
        aria-label="hide" 
        color="primary">{show ? <ExpandLessIcon />:<ExpandMoreIcon /> }
        </IconButton>
        </h3>
        <p className="rating" style={styles}>⭐{rating}</p>
      </div>
      
      <p style={summaryStyles} className="summary">{summary}</p>
      <CardActions>
      <Counter /> {editButton} {deleteButton} 
      </CardActions>
      </CardContent>
    </Card>
  );

}