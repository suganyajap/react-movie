import TextField from '@mui/material/TextField';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import { useParams,useHistory } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import {API_URL} from "./global-constants";

export function EditMovie() {
  const { id } = useParams();
  //const movie = movies[id];

  

  const [movie,setMovie]=useState(null);
  useEffect(()=>{
    fetch(`${API_URL}/movies/${id}`,
    {method:"GET",
  })
    .then((data)=>data.json())
    .then((mv)=>setMovie(mv));
  },[id]);
  //only show update movie when data is available
  return movie ? < UpdateMovie movie={movie} />:"";

}
  
   function UpdateMovie({movie}){
    const history=useHistory();
    const formValidationSchema = yup.object({
      name: yup
      .string()
      .required("why not fill this name?😯"),
  
      poster: yup
      .string()
      .min(4,"need bigger poster 😕")
      .required("why not fill this poster?😯"),
  
      rating: yup
      .number()  
      .min(0)
      .max(10)
      .required("why not fill this rating?😯"),
  
      summary: yup
      .string()
      .min(20,"need bigger summary 😕")
      .required("why not fill this summary?😯"),
  
      trailer: yup
      .string()
      .min(4,"need bigger trailer 😕")
      .required("why not fill this trailer?😯")
      });
  
    const { handleSubmit,values,handleChange,handleBlur,errors,touched } =
      useFormik({
          initialValues:
          {
            name:movie.name,
            poster:movie.poster,
            rating:movie.rating,
            summary:movie.summary,
            trailer:movie.trailer
          },
         validationSchema:formValidationSchema,
          onSubmit:(updatedMovie)=>{
              console.log("onSubmit",updatedMovie);
              editMovie(updatedMovie);
          },
      });
  
  const editMovie = (updatedMovie) => {
    
   
    fetch(`${API_URL}/movies/${movie.id}`,
  {
    method:"PUT",
    body:JSON.stringify(updatedMovie),
    headers:{'Content-Type':'application/json',},
}).then(()=>history.push("/movies"));
};
  

  return (
    <form onSubmit={handleSubmit} className="add-movie-form">
    <TextField
      value={values.name}
      id="name"
      name="name"
      // type="text"
      onChange={handleChange}
      onBlur={handleBlur}
      label="Name"
      variant="standard"
      error={errors.name && touched.name}
      helperText={errors.name && touched.name ? errors.name : ""} />
      

    <TextField
      value={values.poster}
      id="poster"
      name="poster"
      // type="text"
      onChange={handleChange}
      onBlur={handleBlur}
      label="poster"
      variant="standard"
      error={errors.poster && touched.poster}
      helperText={errors.poster && touched.poster ? errors.poster : ""} />
      

    <TextField
      value={values.rating}
      id="rating"
      name="rating"
      // type="text"
      onChange={handleChange}
      onBlur={handleBlur}
      label="rating"
      variant="standard"
      error={errors.rating && touched.rating}
      helperText={errors.rating && touched.rating ? errors.rating : ""} />
      

    <TextField
      value={values.summary}
      id="summary"
      name="summary"
      // type="text"
      onChange={handleChange}
      onBlur={handleBlur}
      label="summary"
      variant="standard"
      error={errors.summary && touched.summary }
      helperText={errors.summary && touched.summary ? errors.summary : ""} />
      

    <TextField
      value={values.trailer}
      id="trailer"
      name="trailer"
      // type="text"
      onChange={handleChange}
      onBlur={handleBlur}
      label="trailer"
      variant="standard"
      error={errors.trailer && touched.trailer}
      helperText={errors.trailer && touched.trailer ? errors.trailer : ""} />

      

    <Button type="submit" variant="outlined">Save Movie</Button>
    </form>
  
  
);

  }