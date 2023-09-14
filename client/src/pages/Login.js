import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { Navigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import {useNavigate} from "react-router-dom"

const CLIENT_ID= '61992319078-23ghu3p9na3vjc5qi4fg3mcr2mpgbncp.apps.googleusercontent.com';

function Login({setUser})
{
    const navigate = useNavigate();
    
    return (
        <Paper elevation={3} className="login-paper">
            <h1>Sign In</h1>
            <GoogleOAuthProvider clientId={CLIENT_ID}>
                <GoogleLogin theme="filled_blue"  shape="circle" 
                    onSuccess={credentialResponse => {
                        console.log("full google response: ", credentialResponse);
                        const decodeed = jwt_decode(credentialResponse.credential);

                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </GoogleOAuthProvider>
        </Paper>

    )
}

export default Login;