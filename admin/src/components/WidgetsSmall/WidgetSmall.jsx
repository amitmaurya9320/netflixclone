import { Visibility } from '@material-ui/icons'
import './WidgetSmall.css'
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
const WidgetSmall = () => {
    const [newUsers,setNewUsers] = useState([]);
    useEffect(()=>{
        const getNewUsers = async()=>{
            try{
                const res = await axios.get('/users?new=true',{
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                     },
                })
                setNewUsers(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getNewUsers();
    },[])
    return (
        <div className ='widgetSmall'>
            <span className ='widgetSmallTitle'>New Join Member</span>

            <ul className ='widgetSmallList'>
                {
                    newUsers.map(user => <li key = {user._id} className ='widgetSmallListItem'>
                    <img src={user.profilePic || "https://tse3.mm.bing.net/th?id=OIP.XQ-com-ULw7aaf_U3BcQ3AHaHa&pid=Api&P=0&w=300&h=300"} alt="" className ='widgetSmallImage'/>
                    <div className="widgetSmallUser">
                        <span className="widgetSmallUserName">{user.username}</span>

                    </div>
                        <Link to ={`/user/${user._id}`} className ='link'>
                        <button className="widgetBtn">
                            
                            <Visibility  className = "widgetSmallIcon"/>
                            Display
                        </button>
                        </Link>
                </li>)
                }
                
            </ul>
        </div>
    )
}

export default WidgetSmall
