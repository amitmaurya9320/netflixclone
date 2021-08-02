import { useState,useRef } from 'react';
import './Register.scss'
import axios from 'axios'
import { useHistory,Link } from 'react-router-dom';
const Register = () => {
    const history = useHistory()
    const emailRef = useRef();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [username,setUsername] = useState('');

    const handleStart = () =>{
        setEmail(emailRef.current.value);
    }
    const handleFinish = async (e) =>{
        e.preventDefault();
        try{
            await axios.post('/auth/register',{email,username,password});
            history.push('/login');
        }catch(err){
        }
    }
    return (
        <div className ='register'>
            <div className="top">
                <div className ='wrapper'>
                <img className = 'logo' src="https://cdn0.vox-cdn.com/thumbor/LoR2z1xdNlLCw9vWrpZCcgCNoXc=/0x133:3151x1905/1600x900/cdn0.vox-cdn.com/uploads/chorus_image/image/49901753/netflixlogo.0.0.png" alt="" />
               <Link className ='link' to ='/login'>
                <button className ='loginButton' onClick = {() => console.log("hello")}>Sign-In</button>
               </Link>
                </div>
            </div>
            <div className="container">
                <h1>Unlimited movies ,TV shows and more</h1>
                <h2>Watch anywhere, Cancel anytime</h2>
                <p>Ready to watch Enter your email to create or restart your membership</p>
                
                {
                   !email ?(
                    <div className ='input'>
                        <input type="email"  placeholder = 'email address' ref = {emailRef}/>
                        <button className ='registerButton' onClick = {handleStart}>Get started</button>
                    </div>
                    ):(
                    <form className ='input'>
                        <input type="username"  placeholder = 'username' onChange = {(e) => setUsername(e.target.value)}/>
                        <input type="password"  placeholder = 'password' onChange = {(e) => setPassword(e.target.value)}/>
                        <button className ='registerButton' onClick = {handleFinish}>Start</button>
                    </form>
                    )
                }

            </div>
        </div>
    )
}

export default Register
