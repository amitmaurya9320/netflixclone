import './NewList.css'
import {useState,useContext,useEffect} from 'react';
import { getMovies} from '../../context/movieContext/apiCalls'
import {ListContext} from '../../context/listContext/listContext'
import {MoviesContext} from '../../context/movieContext/movieContext'
import { createList } from '../../context/listContext/apiCalls';
import { useHistory } from 'react-router-dom';
const NewList = () => {
  const history = useHistory();
  const {dispatch}  = useContext(ListContext);
  const {movies , dispatch:dispatchMovie} = useContext(MoviesContext);
  const [list,setList] = useState(null);
  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie])
  const handleChange = (e)=>{
    const value = e.target.value;
    setList({...list,[e.target.name]:value})
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    createList(dispatch,list);
    history.push('/lists')
  }
const handleSelect = (e) =>{
  let value = Array.from(e.target.selectedOptions,(option)=> option.value);
  setList({...list,[e.target.name]:value})
}
    return (
        <div className ='newProduct'>
    <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
       
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="list title" name ='title' onChange ={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder={"genre"} name ='genre' onChange ={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Type</label>
          <select name="type" onChange = {handleChange}>
            <option>Type</option>
            <option value="movie">movies</option>
            <option value="series">series</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Content</label>
          <select multiple name="content" onChange = {handleSelect} style = {{height:"150px"}}>
          {
            movies.map((movie) =>(
            <option key = {movie._id} value={movie._id}>{movie.title}</option>
            ) )
          }
          </select>
        </div>
    <button className="addProductButton" onClick = {handleSubmit}>Create</button>
      </form>

        </div>
    )
}

export default NewList;
