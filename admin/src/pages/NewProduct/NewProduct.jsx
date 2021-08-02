import './NewProduct.css'
import {useState,useContext} from 'react';
import storage from '../../firebase';
import {createMovie} from '../../context/movieContext/apiCalls'
import {MoviesContext} from '../../context/movieContext/movieContext'
const NewProduct = () => {
  const {dispatch}  = useContext(MoviesContext);
  const[movie,setMovie] = useState(null);
  const[img,setImg] = useState(null);
  const[imgTitle,setImgTitle] = useState(null);
  const [thumbnail,setThumbnail] = useState(null);
  const[trailer,setTrailer] = useState(null);
  const[video,setVideo] = useState(null);
  const [uploaded,setUploaded] = useState(0);
  const handleChange = (e)=>{
    const value = e.target.value;
    setMovie({...movie,[e.target.name]:value})
  }
  const upload = (items)=>{
    items.forEach(item =>{
      const filename = new Date().getTime()+ item.label +item.file.name;
      //create folder on firebase
      const uploadTask = storage.ref(`/items/${filename}`).put(item.file);
     
      uploadTask.on('state_changed',(snapshot) =>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;

        console.log("upload is "+progress+" % done");

      },(err) =>{console.log(err)},()=>{
        uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
          setMovie(prev => ({
              ...prev,[item.label]:url
            })
          )
          setUploaded((prev) => prev + 1)
        })
      }
    )
    })
  }
  const handleUpload = (e)=>{
    e.preventDefault();
    upload([
      {file:img,label:"img"},
      {file:imgTitle,label:"imgTitle"},
      {file:thumbnail,label:"thumbnail"},
      {file:trailer,label:"trailer"},
      {file:video,label:"video"},
    ])
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    createMovie(dispatch,movie);
    window.location.reload();
  }
    return (
        <div className ='newProduct'>
    <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="img" name = 'img' onChange = {e => setImg(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input type="file" id="imgTitle" name ='imgTitle' onChange = {e => setImgTitle(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Thumbnail Image</label>
          <input type="file" id="thumbnail" name = 'thumbnail' onChange = {e => setThumbnail(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="movie/series title" name ='title' onChange ={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder={"description"} name ='desc' onChange ={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder={"genre"} name ='genre' onChange ={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="text" placeholder={"year"} name ='year' onChange ={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>limit</label>
          <input type="text" placeholder={"limit"} name ='limit' onChange ={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input type="text" placeholder={"duration"} name = 'duration' onChange ={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>isSeries</label>
          <select name="isSeries" id="isSeries" onChange ={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" name ='trailer' onChange = {e => setTrailer(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input type="file" name = "video" onChange = {e => setVideo(e.target.files[0])}/>
        </div>{
          uploaded === 5?<button className="addProductButton" onClick = {handleSubmit}>Create</button>:<button className="addProductButton"  onClick = {handleUpload}>Upload</button>
        }
      </form>

        </div>
    )
}

export default NewProduct;
