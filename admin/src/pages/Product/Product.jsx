import './Product.css'
import {useState,useContext,useEffect} from 'react'
import{Link, useParams} from 'react-router-dom'
import { Publish } from '@material-ui/icons';
import {MoviesContext} from '../../context/movieContext/movieContext';
import storage from '../../firebase';
import axios from 'axios';
import { updatedMovie } from '../../context/movieContext/apiCalls';
const Product = () => {
    const {id} = useParams();
    const [movie,setMovie] = useState(null);
    useEffect(() => {
        const getMovie = async () =>{
            try{
                const res = await axios.get(`/movies/find/${id}`,{
                    headers:{
                        token:"Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                    }
                })
                setMovie(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getMovie()
    }, [id])

    const {dispatch}  = useContext(MoviesContext);
    const[updateMovie,setUpdateMovie] = useState(null);
  const[img,setImg] = useState(null);
  const[imgTitle,setImgTitle] = useState(null);
  const [thumbnail,setThumbnail] = useState(null);
  const[trailer,setTrailer] = useState(null);
  const[video,setVideo] = useState(null);
  const [uploaded,setUploaded] = useState(0);
    const [uploadCount,setUploadCount] = useState(5);
  const handleChange = (e)=>{
    const value = e.target.value;
    setUpdateMovie({...updateMovie,[e.target.name]:value})
  }
  const upload = (items)=>{
    
    items.forEach(item =>{
      const filename = new Date().getTime()+ item?.label +item?.file.name;
      //create folder on firebase
      const uploadTask = storage.ref(`/items/${filename}`).put(item?.file);
     
      uploadTask.on('state_changed',(snapshot) =>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;

        console.log("upload is "+progress+" % done");

      },(err) =>{console.log(err)},()=>{
        uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
          setUpdateMovie(prev => ({
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
    const toBeUploaded =[
     img && {file:img,label:"img"},
      imgTitle && {file:imgTitle,label:"imgTitle"},
     thumbnail && {file:thumbnail,label:"thumbnail"},
     trailer&& {file:trailer,label:"trailer"},
      video &&{file:video,label:"video"},
    ].filter((item) => item !== null)
    setUploadCount(toBeUploaded.length);
    upload(toBeUploaded);
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(updateMovie)
    updatedMovie(dispatch,updateMovie,id);
  }
    return (
        <div className ='product'>
            <div className="productTitleContainer">
                <h1 className ='productTitle'>Movie</h1>
                <Link to = '/newmovie'>
                    <button className="productAddBtn">Create</button>
                </Link>
            </div>

            <div className="productTop">
                
                <div className="productTopRigth">
                    <div className="productInfoTop">
                        <img src={movie?.img} alt=""  className ='productInfoImg'/>
                        <span className="productName">{movie?.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfokey">
                                id:
                            </span>
                            <span className="productInfoValue">
                                {movie?._id}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfokey">
                                genre:
                            </span>
                            <span className="productInfoValue">
                                {movie?.genre}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfokey">
                                year
                            </span>
                            <span className="productInfoValue">
                                {movie?.year}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfokey">
                                limit
                            </span>
                            <span className="productInfoValue">
                                +{movie?.limit}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className ='productForm'>
                    <div className="productFormLeft">
                        <label>Movie title</label>
                        <input type ='text' placeholder = {movie?.title} name = "title" onChange = {handleChange}/>
                        <label>Description</label>
                        <input type ='text' placeholder = {movie?.desc} name = "desc" onChange = {handleChange}/>
                        <label>Year</label>
                        <input type="text" placeholder ={movie?.year} name = "year" onChange ={handleChange}/>
                        <label>Genre</label>
                        <input type="text" placeholder ={movie?.genre} name = "genre" onChange = {handleChange}/>
                        <label>Limit</label>
                        <input type="text" placeholder ={movie?.limit} name = "limit" onChange ={handleChange}/>
                        <label>Duration</label>
                        <input type="text" placeholder ={movie?.duration} name = "duration" onChange = {handleChange}/>
                        <label>Trailer</label>
                        <input type="file" placeholder ={movie?.trailer} onChange = {e => setTrailer(e.target.files[0])}/>
                        <label>Video</label>
                        <input type="file" placeholder ={movie?.video} onChange = {e => setVideo(e.target.files[0])}/>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <div className ='imgContainer'>

                            <label>Image</label>
                            <img src={movie?.img} alt="" 
                            className ='productUploadImg'
                            />
                            </div>
                            <label htmlFor = 'img'><Publish/></label>
                            <input type="file" id = 'img' style ={{display:"none"}} onChange = {e => setImg(e.target.files[0])}/>
                        </div>
                        <div className="productUpload">
                            <div className ='imgContainer'>

                            <label>Image Title</label>
                            <img src={movie?.imgTitle} alt="" 
                            className ='productUploadImg'
                            />
                            </div>
                            <label htmlFor = 'imgTitle'><Publish/></label>
                            <input type="file" id = 'imgTitle' style ={{display:"none"}} onChange = {e => setImgTitle(e.target.files[0])}/>
                        </div>
                        <div className="productUpload">
                            <div className ='imgContainer'>

                            <label>Thumbnail</label>
                            <img src={movie?.thumbnail} alt="" 
                            className ='productUploadImg'
                            />
                            </div>
                            <label htmlFor = 'thumbnail'><Publish/></label>
                            <input type="file" id = 'thumbnail' style ={{display:"none"}} onChange = {e => setThumbnail(e.target.files[0])}/>
                        </div>
                        {
                            uploaded === uploadCount?<button className="productBtn" onClick = {handleSubmit}>Update</button>:<button className="productBtn" onClick = {handleUpload}>Upload</button>
                        }
                        
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Product
