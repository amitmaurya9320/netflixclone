import './Login.css'
import { useState ,useContext} from 'react';
import { AuthContext } from '../../context/authContext/AuthContext';
import { login } from '../../context/authContext/apiCalls';
const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {isFetching,dispatch} = useContext(AuthContext);
    const handleClick = (e) =>{
        e.preventDefault();
        login({email,password},dispatch)
    }
    return (
        <div className ='login'>
            <form className ='loginForm'>
                <span>Login</span>
                <input type="email" placeholder='email' className ='loginInput'onChange = {(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder='password' className ='loginInput'onChange = {(e)=>setPassword(e.target.value)}/>
                <button className ='loginBtn' onClick = {handleClick} disabled = {isFetching}>Login</button>
            </form>
            <button className = 'registerBtn'>Register</button>
        </div>
    )
}

export default Login
