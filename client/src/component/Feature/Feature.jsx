import './Feature.scss';
import { useState,useEffect } from 'react';
import {PlayArrow,InfoOutlined} from '@material-ui/icons';
import axios from 'axios'
import {Link} from 'react-router-dom';

const Feature = ({type,setGenre}) => {
    const [content,setContent] = useState({});
     useEffect(() => {
        const getContent = async()=>{
            try{
               const res = await axios.get(`/movies/random?type=${type}`,{
                   headers:{
                       token:"Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
                   }
               })
               setContent(res.data[0])
            }catch(err){
                console.log(err);
            }
        }
        getContent();
    }, [type])

    return (
        <div className ='feature' style ={{backgroundImage:`linear-gradient(to left,rgba(0, 0, 0, 0) 0%,rgba(0, 0, 0, 1) 100%),url("${content?.img}")` ,backgroundSize:"cover"}}>

            {
                type && (
                    <div className = "category">
                        <span>{type === "movie" ? "Movies":"Series"}</span>

                        <select name="genre" id="genre" onChange ={e => setGenre(e.target.value)}>
                            <option>Genre</option>
                            <option value="adventure">Adventure</option>
                            <option value="comedy">Comedy</option>
                            <option value="crime">Crime</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="horror">Horror</option>
                            <option value="romance">Romance</option>
                            <option value="sci-fi">Sci-fi</option>
                            <option value="thriller">Thriller
                            </option>
                            <option value="western">Western
                            </option>
                            <option value="animation">Animation</option>
                            <option value="drama">Drama</option>
                            <option value="documentary">Documentary</option>                      

                            
                        </select>
                    </div>
                )
            }
            
            <div className="info">
                <img src= {content?.imgTitle}alt="" />
                <span className = "desc">{content?.desc}</span>
                <div className="buttons">
                    <button className ="play"><PlayArrow/>
                    <Link className = 'link' to = {{pathname:"/watch",movie:content}}>
                    <span>Play</span>
                    </Link>
                    </button>
                    <button className ="more"><InfoOutlined/>
                    <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Feature
