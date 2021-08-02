import './List.css'
import {useState,useContext,useEffect} from 'react'
import{Link, useParams} from 'react-router-dom'
import {MoviesContext} from '../../context/movieContext/movieContext';
import axios from 'axios';
import { ListContext } from '../../context/listContext/listContext';
import { getMovies} from '../../context/movieContext/apiCalls';
import {updateList} from '../../context/listContext/apiCalls';
const List = () => {
    const {id} = useParams();
    const [list,setList] = useState(null);
    useEffect(() => {
        const getList = async () =>{
            try{
                const res = await axios.get(`/lists/find/${id}`,{
                    headers:{
                        token:"Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                    }
                })
                setList(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getList()
    }, [id])


    const {dispatch:dispatchMovie,movies}  = useContext(MoviesContext);
    const {dispatch} = useContext(ListContext);
    const [updatedList,setUpdatedList] = useState(null);
        useEffect(() => {
        getMovies(dispatchMovie);
    }, [dispatchMovie])
  const handleChange = (e)=>{
    const value = e.target.value;
    setUpdatedList({...updatedList,[e.target.name]:value})
  }
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    updateList(dispatch,updatedList,id)
    window.location.replace('/lists');
  }
  const handleSelect = (e) =>{
    let value = Array.from(e.target.selectedOptions,(option)=> option.value);
  setUpdatedList({...updatedList,[e.target.name]:value})
  }
    return (
        <div className ='product'>
            <div className="productTitleContainer">
                <h1 className ='productTitle'>List</h1>
                <Link to = '/newList'>
                    <button className="productAddBtn">Create</button>
                </Link>
            </div>

            <div className="productTop">
                
                <div className="productTopRigth">
                    <div className="productInfoTop">
                       
                        <span className="productName">{list?.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfokey">
                                id:
                            </span>
                            <span className="productInfoValue">
                                {list?._id}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfokey">
                                genre:
                            </span>
                            <span className="productInfoValue">
                                {list?.genre}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfokey">
                                type
                            </span>
                            <span className="productInfoValue">
                                +{list?.type}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className ='productForm'>
                    <div className="productFormLeft">
                        <label>List title</label>
                        <input type ='text' placeholder = {list?.title} name = "title" onChange = {handleChange}/>
                        <label>type</label>
                        <select name="type" onChange ={handleChange}>
                            <option>Type</option>
                            <option value="movie">Movie</option>
                            <option value="series">Series</option>
                        </select>
                        <label>Genre</label>
                        <input type="text" placeholder ={list?.genre} name = "genre" onChange = {handleChange}/>
                        <label>Content</label>
                        <select multiple name="content" onChange = {handleSelect}>
                            {
                                movies.map((movie) => <option value = {movie._id} key = {movie._id}>{movie.title}</option> )
                            }
                        </select>
                    </div>
                    <div className="productFormRight">
                        <button className="productBtn" onClick = {handleSubmit}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default List;
