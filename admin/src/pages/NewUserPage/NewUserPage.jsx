import './NewUserPage.css'
import { useState,useContext } from 'react';
import storage from '../../firebase';
import {UserContext} from '../../context/userContext/userContext';
import {createUser} from '../../context/userContext/apiCalls'
const NewUserPage = () => {

    const [user,setUser] = useState(null)
    const [file,setFile] = useState(null);
    const [upload,setUpload] = useState(0);
    const [uploadCount,setUploadCount] = useState(1);
    const {dispatch} = useContext(UserContext);
    const handleChange = (e) =>{
        const value = e.target.value;
        setUser({...user,[e.target.name]:value});
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        createUser(dispatch,user);
        window.location.reload();
    }
    const handleUpload = (e) =>{
        e.preventDefault();
        if(file === null) setUploadCount(0);
        else{
            const filename = new Date().getTime() + "profilePic"+file.name;

            const uploadTask = storage.ref(`/users/${filename}`).put(file);

            uploadTask.on('state_changed',(snapshot)=>{
                const progress = (snapshot.bytesTransferred/snapshot.totalBytes) *100;

                console.log("upload is "+ progress+" % done");
            },(err) => console.log(err),()=>{
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    setUser({...user,profilePic:url});
                    setUpload(1);
                })
            }
            )
        }
    }
    return (
        <div className ='newUserPage'>
            <h1 className ='newUserTitle'>New User</h1>
            <form className ='newUserFrom'>
                <div className="newUserItem">
                    <label>Username</label>
                    <input type="text" name = "username" placeholder ='john12' onChange ={handleChange}/>
                </div>
                <div className="newUserItem">
                    <label>Full Name</label>
                    <input type="text" name = "fullname"placeholder ='John Doe'onChange ={handleChange}/>
                </div>
                <div className="newUserItem">
                    <label>Email</label>
                    <input type="email" name ='email' placeholder ='test@example.com' onChange ={handleChange}/>
                </div>
                <div className="newUserItem">
                    <label>Password</label>
                    <input type="password" name ='password' placeholder ='password' onChange ={handleChange}/>     
                </div>
                <div className="newUserItem">
                    <label>Phone</label>
                    <input type="text" name ='phone'placeholder ='+91 123-132-123' onChange ={handleChange}/>
                </div>
                <div className="newUserItem">
                    <label>profilePic</label>
                    <input name ='profilePic' type="file" onChange ={e => setFile(e.target.files[0])}/>
                </div>
                <div className="newUserItem">
                    <label>Gender</label>

                    <div className="newUserGender">

                    <input type="radio" name = 'gender' id = 'male' value ='male' onChange ={handleChange}/>
                    <label htmlFor="male">Male</label>

                    <input type="radio" name = 'gender' id = 'female' value ='female' onChange ={handleChange}/>
                    <label htmlFor="female">Female</label>

                    <input type="radio" name = 'gender' id = 'other' value ='other' onChange ={handleChange}/>
                    <label htmlFor="other">Other</label>
                    </div>
                </div>
                <div className = 'newUserItem'>
                    <label>Admin</label>
                    <select className ='newUserSelect' name="isAdmin" id="active" onChange ={handleChange}>
                        <option value="false">no</option>
                        <option value="true">yes</option>
                    </select>
                </div>
                {
                    upload === uploadCount ?<button className="newUserBtn" onClick ={handleSubmit}>
                    Create
                </button>:<button className="newUserBtn" onClick ={handleUpload}>
                    Upload
                </button>
                }
            </form>
        </div>
    )
}

export default NewUserPage;
