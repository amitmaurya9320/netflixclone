import './Topbar.css';
import {NotificationsNone,Language,Settings} from '@material-ui/icons';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext/AuthContext';
import { logOut } from '../../context/authContext/AuthAction';

const Topbar = () => {
    const {dispatch,user} = useContext(AuthContext);
    const handleLogout = ()=>{
        console.log("called");  
        dispatch(logOut());
        window.location.replace('/login');
    }
    return (
        <div className ='topbar'>
            <div className="topbarwrapper">
                <div className="topleft">
                    <span className = 'logo'>Admin</span>
                </div>
                <div className="topright">
                    <div className="topbarIconContainer">
                        <NotificationsNone/>
                        <span className ='topIconBadge'>2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language/>
                        <span className ='topIconBadge'>2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Settings/>
                        <div className ='options' >
                            <span onClick = {handleLogout}>Logout</span>
                        </div>
                    </div>
                    <img src={user?.profilePic} alt="" className="topAvatar" />
                </div>
            </div>
        </div>
    )
}

export default Topbar;
