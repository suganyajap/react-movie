import { useState } from 'react';
import './App.css';
import { MovieList } from './MovieList';
import Paper from '@mui/material/Paper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';




export default function App() {
 
  
   
  const history=useHistory();
  const [mode,setMode]=useState("dark");

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

 

  
  return (
    
    <ThemeProvider theme={theme}>
      <Paper elevation={4} style={{bordeRadius:"0px",minHeight:"100vh"}} >
     <div className="App">
       <AppBar position="static" style={{marginBottom:"24px"}}>
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
       
        <Button 
        startIcon={mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        style={{ marginLeft:"auto" }}
       variant="text"
       color="inherit"
       onClick={()=>setMode(mode==="light" ? "dark" : "light")}
       >{ mode==="light" ? "dark" : "light" } Mode</Button>
     </Toolbar>
       </AppBar>
       <Switch>
       
       <Route path="/login">
           <Login  />
           </Route>
           <Route path="/sign-up">
           <SignUp  />
           </Route>
           <Route path="/forgot-password">
           <ForgetPassword  />
           </Route>
           <Route path="/reset-password">
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
    </Paper>
   </ThemeProvider>
    
  );
}
