import './Login.scss'
import {Link} from 'react-router-dom';
import {login} from '../../context/authContext/apiCalls'
import {AuthContext}  from '../../context/authContext/AuthContext';
import {useState,useContext} from 'react';
const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {dispatch} = useContext(AuthContext);
    const handleSubmit = (e)=>{
        e.preventDefault();
        login({email,password},dispatch)
    }
    return (
        <div className ='login'>
            <div className="top">
                <div className ='wrapper'>
                <img className = 'logo' src="https://cdn0.vox-cdn.com/thumbor/LoR2z1xdNlLCw9vWrpZCcgCNoXc=/0x133:3151x1905/1600x900/cdn0.vox-cdn.com/uploads/chorus_image/image/49901753/netflixlogo.0.0.png" alt="" />
                
                </div>
            </div>
            <div className="container">
                <form>
                    <h1>Sign In</h1>
                    <input type="email" placeholder ="your email" onChange ={e => setEmail(e.target.value)}/>
                    <input type="password" placeholder ='password' onChange ={e => setPassword(e.target.value)}/>
                    <button className="loginButton" onClick = {handleSubmit}>Sign In</button>
                    <span>New to Netfix? <Link className = 'link' to = '/register'><b>Sign up now</b></Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login;
