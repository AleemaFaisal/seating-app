import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { http } from "../http_index";

const CLIENT_ID= '61992319078-23ghu3p9na3vjc5qi4fg3mcr2mpgbncp.apps.googleusercontent.com';

function Login({setUser})
{
    const [googleResponse, setGoogleResponse]= useState(null);
    const navigate = useNavigate();


    useEffect(() => {

        let ignore = false;
        async function AutoLogIn()
        {
          await http.post('/login', {appToken})
          .then( userData => {
            if (!ignore){
                console.log(userData);
                localStorage.setItem("appJWT", userData.data.appToken);
                localStorage.setItem("googleToken", userData.data.googleToken);
                setUser(userData.data.userName);
                navigate('/home');          
            }
          })
        }

        async function newLogin() {
            const googleToken = googleResponse.credential;
            localStorage.setItem('googleToken', JSON.stringify(googleToken));
            await http.post('/login', {googleToken})
            .then( user => {
                if (!ignore) {
                    console.log(user);
                    localStorage.setItem("appJWT", user.data.appToken);
                    setUser(user.data.userName);
                }
            })
            .catch(err => console.log(err)); 
        }
    
        const appToken = localStorage.getItem("appJWT");
        if (appToken){
            AutoLogIn();
        }
        else if (googleResponse) {
            newLogin();
        }

        return () => {ignore=true};

    }, [googleResponse, setUser, navigate]);
    

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