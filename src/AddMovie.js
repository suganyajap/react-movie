import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory} from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import {API_URL} from "./global-constants";

export function AddMovie() {
  const history =useHistory();

  const formValidationSchema = yup.object({
    name: yup
    .string()
    .required("why not fill this name?😯"),

    poster: yup
    .string()
    .min(4)
    .required("why not fill this poster?😯"),

    rating: yup
    .number()  
    .min(0)
    .max(10)
    .required("why not fill this rating?😯"),

    summary: yup
    .string()
    .min(20)
    .required("why not fill this summary?😯"),

    trailer: yup
    .string()
    .min(4)
    .required("why not fill this trailer?😯")
    });

  const { handleSubmit,values,handleChange,handleBlur,errors,touched } =
    useFormik({
        initialValues:
        {
          name:"",
          poster:"",
          rating:"",
          summary:"",
          trailer:""
        },
       validationSchema:formValidationSchema,
        onSubmit:(newMovie)=>{
            console.log("onSubmit",newMovie);
            addMovie(newMovie);
        },
    });
 

  const addMovie = (newMovie) => {
    // const newMovie = {
    //   name,
    //   poster,
    //   rating,
    //   summary,
    //   trailer,
    // }; //shorthand
   // setMovies([...movies, newMovie]);
    

    fetch(`${API_URL}/movies/`,
          {
            method:"POST",
            body:JSON.stringify(newMovie),
            headers:{'Content-Type':'application/json'}
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

        

      <Button type="submit" variant="outlined">Add Movie</Button>
      </form>
    
    
  );
}