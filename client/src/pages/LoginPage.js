import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { http } from "../http_index";
import axios from 'axios';
import { BASEURL } from "../constants";

const CLIENT_ID= '61992319078-23ghu3p9na3vjc5qi4fg3mcr2mpgbncp.apps.googleusercontent.com';

function Login({setUser})
{
    const [googleResponse, setGoogleResponse]= useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        let ignore = false;
        const url = BASEURL + '/login';
        const headers =  { 
            "Content-Type": 'application/json',
        };

        async function AutoLogIn()
        {
          await axios.post(url, {appToken}, {headers: headers})
          .then( userData => {
            if (!ignore){
                console.log( "username: ", userData.data.name);
                localStorage.setItem("appJWT", userData.data.appToken);
                localStorage.setItem("googleToken", userData.data.googleToken);
                setUser(userData.data.name);
                navigate('/home');
            }
          })
        }

        async function newLogin() {
            const googleToken = googleResponse.credential;
            localStorage.setItem('googleToken', JSON.stringify(googleToken));
            await axios.post(url, {googleToken}, {headers: headers})
            .then( user => {
                if (!ignore) {
                    console.log(user);
                    localStorage.setItem("appJWT", user.data.appToken);
                    setUser(user.data.name);
                    navigate('/home');
                }
            })
            .catch(err => console.log(err)); 
        }
    
        const appToken = localStorage.getItem("appJWT");
        if (appToken){
            console.log("using existing token: ", appToken);
            AutoLogIn();
        }
        else if (googleResponse) {
            console.log("doing new login");
            newLogin();
        }

        return () => {ignore=true};

    }, [googleResponse, setUser]);
    

    return (
        <div className="login-page" >
            <Paper className="login-paper" >
                <h1>In The Office</h1>
                <GoogleOAuthProvider clientId={CLIENT_ID}>
                    <GoogleLogin theme="filled_blue"  shape="circle"
                    onSuccess={credentialResponse => setGoogleResponse(credentialResponse)}
                    onError={() => console.log('Login Failed')}
                    />
                </GoogleOAuthProvider>
            </Paper>
        </div>
    );
}

export default Login;