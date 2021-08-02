import './ProductList.css';
import { DataGrid } from '@material-ui/data-grid';
import {useContext, useEffect} from 'react';
import {DeleteOutline} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import  { MoviesContext } from '../../context/movieContext/movieContext';
import {getMovies,deleteMovie} from '../../context/movieContext/apiCalls'
const Product = () => {
   
    const {movies,dispatch} = useContext(MoviesContext);

    useEffect(() => {
        getMovies(dispatch);
    }, [dispatch])

    const handleDelete = (id) =>{
      deleteMovie(id,dispatch);
    }
    const columns = [
        {field:"_id",headerName:"ID",width:100},
        
        {
            field:"movie",
            headerName:"Movie",
            width:200,
            renderCell:(params) =>{
                return (
                    <div className ='productListName'>
                        <img src={params.row.img} alt="" className ='productListImg'/>
                        {params.row.title}
                    </div>
                );
            }
        },{
            field:"genre",
            headerName:"Genre",
            width:120,
        },{
            field:"year",
            headerName:"Year",
            width:120,
        },{
            field:"limit",
            headerName:"limit",
            width:120,
        },{
            field:"isSeries",
            headerName:"isSeries",
            width:120,
        },{
            field:"action",
            headerName:"Action",
            width:"160",
            renderCell:(params) =>{
                return (
                     <>
              <Link to = {{pathname:'/product/' + params.row._id,movie:params.row}}>
              
                    <button className="productListEdit">Edit</button>
              </Link>
              <DeleteOutline className="productListDelete" onClick = {() => handleDelete(params.row._id)}/>
            </>
                )
            }
        }
    ];
    return (
        <div className ='productList'>
            <div className ='btnContainer'>

            <Link to ='/newmovie' className ='link'>
            <span className ='createNewBtn'>Create</span>
            </Link>
            </div>
        <DataGrid
        rows={movies}
        columns={columns}
        pageSize={6}
        checkboxSelection
        disableSelectionOnClick
        getRowId = {(r) => r._id}
      />
        </div>
    )
}

export default Product;
