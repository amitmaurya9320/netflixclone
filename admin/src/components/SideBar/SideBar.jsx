import './SideBar.css';
import {LineStyle,Timeline,TrendingUp,PermIdentity,BarChart,MailOutline,DynamicFeed,ChatBubbleOutline,WorkOutline,Report, PlayCircleOutline,List} from '@material-ui/icons';
import {Link} from 'react-router-dom';

const SideBar = () => {
    const handleClick = (e) =>{
        const currentActive = document.querySelector('.active');
        const tobeActive = e.target;
        currentActive.classList.remove('active')
        tobeActive.classList.add('active')
    }
    return (
        <div className ='sidebar'>
            <div className="sideWrapper">
                <div className="sideBarMenu">
                    <h3 className="sideBarTitle">DashBoard</h3>
                    <ul className ='sideBarList '>
                        <Link className ='link' to = '/home'>
                        
                        <li className="sideBarListIem active" onClick = {handleClick}>
                            <LineStyle className = 'sideBarIcon'/>Home
                        </li>
                        </Link>
                        <li className="sideBarListIem">
                            <Timeline className = 'sideBarIcon'/>Analytics
                        </li>
                        <li className="sideBarListIem">
                            <TrendingUp className = 'sideBarIcon'/>Sales
                        </li>
                    </ul>
                </div>
                <div className="sideBarMenu">
                    <h3 className="sideBarTitle">Quick Menu</h3>
                    <ul className ='sideBarList'>
                        <Link className ='link' to ='/users'>
                        <li className="sideBarListIem" onClick = {handleClick}>
                            <PermIdentity className = 'sideBarIcon'/>Users
                        </li>
                        </Link>
                        <Link to = '/movies' className ='link'>
                        <li className="sideBarListIem" onClick = {handleClick}>
                            <PlayCircleOutline className = 'sideBarIcon'/>Movies
                        </li>
                        </Link>
                        <Link to ='/lists' className ='link'>
                        
                        <li className="sideBarListIem" onClick = {handleClick}>
                            <List className = 'sideBarIcon'/>Lists
                        </li>
                        </Link>
                        <li className="sideBarListIem">
                            <BarChart className = 'sideBarIcon'/>Reports
                        </li>
                    </ul>
                </div>
                <div className="sideBarMenu">
                    <h3 className="sideBarTitle">Notifications</h3>
                    <ul className ='sideBarList'>
                        <li className="sideBarListIem">
                            <MailOutline className = 'sideBarIcon'/>Mail
                        </li>
                        <li className="sideBarListIem">
                            <DynamicFeed className = 'sideBarIcon'/>FeedBack
                        </li>
                        <li className="sideBarListIem">
                            <ChatBubbleOutline className = 'sideBarIcon'/>Messages
                        </li>
                    </ul>
                </div>
                <div className="sideBarMenu">
                    <h3 className="sideBarTitle">Staff</h3>
                    <ul className ='sideBarList'>
                        <li className="sideBarListIem">
                            <WorkOutline className = 'sideBarIcon'/>Manage
                        </li>
                        <li className="sideBarListIem">
                            <Timeline className = 'sideBarIcon'/>Analytics
                        </li>
                        <li className="sideBarListIem">
                            <Report className = 'sideBarIcon'/>Reports
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBar
