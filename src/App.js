import { useState } from 'react';
import './App.css';
import { MovieList } from './MovieList';
import {Route,Switch,Redirect} from 'react-router-dom';
import { NotFound } from './NotFound';
import  Login  from './Login';
import  SignUp  from './SignUp';
import  ForgetPassword  from './ForgotPassword';
import  ResetPassword  from './ResetPassword';
import { MovieDetails } from './MovieDetails';
import { AddMovie } from './AddMovie';
import { EditMovie } from './EditMovie';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useHistory} from "react-router-dom";





export default function App() {
 
  
   const [shownavbar,setshowNavbar]=useState(false);
  const history=useHistory();
 

return (
    

     <div className="App">
       {shownavbar?<AppBar position="static" style={{marginBottom:"24px"}}>
     <Toolbar variant="dence">
      <Button
       variant="text"
       color="inherit"
       onClick={()=>history.push("/")}
       >Home</Button>
       <Button
       variant="text"
       color="inherit"
       onClick={()=>history.push("/movies")}
       >Movies</Button>
       <Button
       variant="text"
       color="inherit"
       onClick={()=>history.push("/add-movies")}
       >AddMovie</Button>
       
       
     </Toolbar>
       </AppBar>:""}
       <Switch>
       
       <Route path="/login">
           <Login  setshowNavbar={setshowNavbar}/>
           </Route>
           <Route path="/sign-up">
           <SignUp  />
           </Route>
           <Route path="/forgot-password">
           <ForgetPassword  />
           </Route>
           <Route path="/reset-password/:id">
           <ResetPassword  />
           </Route>
           <Route path="/films">
           <Redirect to="/movies" />
           </Route>
           <Route path="/movies/edit/:id">
           <EditMovie  />
           </Route>
           <Route path="/movies/:id">
           <MovieDetails />
           </Route>
           <Route path="/movies">
           <MovieList />
           </Route>
           <Route path="/add-movies">
           <AddMovie  />
           </Route>
           <Route path="**">
           <NotFound />
           </Route>
           
        </Switch>
   </div>
    
    
  );
}
