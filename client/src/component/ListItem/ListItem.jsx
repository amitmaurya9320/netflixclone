import {useState,useEffect} from 'react';
import './ListItem.scss'
import {PlayArrow,Add,ThumbDownOutlined,ThumbUpAltOutlined} from '@material-ui/icons';
import axios from 'axios'
import {Link} from 'react-router-dom'
const ListItem = ({index,item}) => {
    const [isHovered,setIsHovered] = useState(false);
    const [movie,setMovie] = useState({});
    
    useEffect(() => {
    const getMovie = async()=>{
        try{
            const res = await  axios.get('/movies/find/'+item,{
                 headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                 },
             })
             setMovie(res.data);
        }catch(err){
            console.log(err);
        }
        
    }
    getMovie();
    }, [item])
    return (
        <Link to = {{pathname:"/watch" ,movie:movie}}>
                    <div className ="listitem" onMouseEnter = {() => setIsHovered(true)} onMouseLeave = {() => setIsHovered(false)} style = {{left:isHovered && index * 225 -50 + index * 2.5}}>
             <img   src={movie.thumbnail} alt="" />
            {
                isHovered && <>
                        <video src={movie.trailer} autoPlay = {true} loop ></video>
             <div className="iteminfo">
                 <div className="icons">
                    <PlayArrow className = "icon"/>
                    <Add className = "icon"/>
                    <ThumbUpAltOutlined className = "icon"/>
                    <ThumbDownOutlined className = "icon"/>
                 </div>
                 <div className="itemInfoTop">
                     <span>{movie.duration}</span>
                     <span className = 'limit'>+{movie.limit}</span>
                     <span>{movie.year}</span>
                 </div>
                 <div className="desc">
                    {movie.desc}
                 </div>
                 <div className="genre">{movie.genre}</div>
             </div>
                </>
            }
        </div>
        </Link>

    )
}

export default ListItem
