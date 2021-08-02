import {useState,useContext} from 'react'
import './Navbar.scss';
import {Search,Notifications,ArrowDropDown}  from '@material-ui/icons'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext/AuthContext';
import { logOut } from '../../context/authContext/AuthAction';

const Navbar = () => {
    const [isScrolled , setIsScrolled] = useState(false);
    const {dispatch,user} = useContext(AuthContext);
    window.onscroll = () =>{
        setIsScrolled(window.pageYOffset === 0 ? false:true);
        //cleanup function
        return () => (window.onscroll == null);
    }
    return (
        <div className = {isScrolled ? 'navbar scrolled':'navbar'}>
            <div className = 'container'>
                <div className ='left'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" />
                    <Link to = '/' className ='link'>
                        <span>HomePage</span>
                    </Link>
                    <Link to ='/series' className ='link'>
                    <span className = "navbarmainLinks">Series</span>
                    </Link>
                    <Link to ='/movies' className ='link'>
                    <span className = "navbarmainLinks">Movies</span>
                    </Link>
                    <span>New and Popular</span>
                    <span>My List</span>
                </div>
                <div className ='right'>
                    <Search  className = "icon"/>
                    <span>Kid</span>
                    <Notifications className = "icon"/>
                    <img src={user?.profilePic} alt="" />
                    <div className = 'profile'>
                        <ArrowDropDown className = "icon"/>
                        <div className ='options'>
                            <span>Setting</span>
                            <span onClick = {() => dispatch(logOut())}>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
