import {  Face, MailOutline, PermIdentity, PhoneAndroid, Publish, Wc } from '@material-ui/icons'
import './User.css'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios';
import { useState,useEffect ,useContext} from 'react';
import storage from '../../firebase';
import {UserContext} from '../../context/userContext/userContext';
import {updateUser} from '../../context/userContext/apiCalls';
const User = () => {
    const {id} = useParams();
    const [user,setUser] = useState(null);
    const [updateduser,setUpdatedUser] = useState(null);
    const [file,setFile] = useState(null);
    const [upload,setUpload] = useState(0);
    const [uploadCount,setUploadCount] = useState(1);
    const {dispatch} = useContext(UserContext);
    useEffect(() => {
        const getUser =async () =>{
            try{
                const res = await axios.get(`/users/find/${id}`,{
                    headers:{
                        token:"Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                    }
                })
                setUser(res.data);
            }catch(err){}
        }
        getUser()
    }, [id])
    const handleChange = (e) =>{
        const value = e.target.value;
        setUpdatedUser({...updateduser,[e.target.name]:value})
    }
    const handleUplaod = (e) =>{
        e.preventDefault();
        if(file === null) setUploadCount(0);
        else{
            const filename = new Date().getTime() + 'profilePic'+file.name;
            const uploadTask = storage.ref(`/users/${filename}`).put(file);
            uploadTask.on('state_changed',(snapshot)=>{
                const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                console.log("upload is "+progress +" % done")
            },(err) => console.log(err),()=>{
                uploadTask.snapshot.ref.getDownloadURL().then(url => {
                    setUpdatedUser({...updateduser,profilePic:url});
                    setUpload(1);
                }) 
            })
        }
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        updateUser(dispatch,updateduser,id);
        window.location.reload();
    }
    return (
        <div className ='user'>
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to = '/newUser' className ='link'>
                 <button className="userAddBtn">Create</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img src={user?.profilePic} alt="" className ="userShowImg"/>
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">
                                {user?.username}
                            </span>
                            <span className="userShowUserTitle">
                                {user?.isAdmin?"Admin":""}
                            </span>
                        </div>

                    </div>
                    <div className="userShowBottom">
                        
                        <span className="userShowTitle">Account Detail</span>

                        <div className="userShowInfo">

                        <PermIdentity className= 'userShowIcon'/>
                        <span className="userShowInfoTitle">{user?.fullname}</span>
                        </div>
                        
                        <div className="userShowInfo">

                        <Face className= 'userShowIcon'/>
                        <span className="userShowInfoTitle">{user?.username}</span>
                        </div>
                        <div className="userShowInfo">

                        <Wc className= 'userShowIcon'/>
                        <span className="userShowInfoTitle">{user?.gender}</span>
                        </div>
                    </div>
                     <div className="userShowBottom">
                        
                        <span className="userShowTitle">Contact Detail</span>

                        <div className="userShowInfo">

                        <MailOutline className= 'userShowIcon'/>
                        <span className="userShowInfoTitle">{user?.email}</span>
                        </div>
                        <div className="userShowInfo">

                        <PhoneAndroid className= 'userShowIcon'/>
                        <span className="userShowInfoTitle">{user?.phone}</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className = 'userUpdateTitle'> Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>UserName</label>
                                <input type="text" 
                                className ='userUpdateInput'
                                name = "username"
                                placeholder ={user?.username} onChange ={handleChange}/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Full Name</label>
                                <input type="text" 
                                name = 'fullname'
                                onChange ={handleChange}
                                className ='userUpdateInput'
                                placeholder ={user?.fullname}/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input type="email" 
                                name ='email'
                                onChange ={handleChange}
                                className ='userUpdateInput'
                                placeholder ={user?.email}/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Phone</label>
                                <input type="text" 
                                name ='phone'
                                onChange ={handleChange}
                                className ='userUpdateInput'
                                placeholder ={user?.phone}/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Gender</label>
                                <select name="gender" name = 'gender' onChange ={handleChange}>
                                    <option>gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img className ='userUpdateImage' src={user?.profilePic} alt="" />
                                <label htmlFor="file"><Publish className = 'userUpdateIcon'/></label>
                                <input type="file" id ='file' name = 'profilePic' onChange ={e => setFile(e.target.files[0])} style= {{display:"none"}}/>
                            </div>
                            {
                                upload === uploadCount ?<button className ='userUpdateBtn' onClick= {handleSubmit}>Update</button>:<button className ='userUpdateBtn' onClick = {handleUplaod}>upload</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default User;
