import './ListList.css';
import { DataGrid } from '@material-ui/data-grid';
import {useContext, useEffect} from 'react';
import {DeleteOutline} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import {ListContext} from '../../context/listContext/listContext'
import {getLists,deleteList} from '../../context/listContext/apiCalls'
const ListList = () => {
   
    const {lists,dispatch} = useContext(ListContext);

    useEffect(() => {
        getLists(dispatch);
    }, [dispatch])

    const handleDelete = (id) =>{
      deleteList(id,dispatch);
    }
    const columns = [
        {field:"_id",headerName:"ID",width:200},
        {
            field:"title",
            headerName:"title",
            width:250,
        },
        {
            field:"genre",
            headerName:"Genre",
            width:150,
        },{
            field:"type",
            headerName:"type",
            width:150,
        },{
            field:"action",
            headerName:"Action",
            width:"150",
            renderCell:(params) =>{
                return (
                     <>
              <Link to = {{pathname:'/list/' + params.row._id,list:params.row}}>
              
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

            <Link to ='/newList' className ='link'>
            <span className ='createNewBtn'>Create</span>
            </Link>
            </div>
        <DataGrid
        rows={lists}
        columns={columns}
        pageSize={8}
        checkboxSelection
        disableSelectionOnClick
        getRowId = {(r) => r._id}
      />
        </div>
    )
}

export default ListList;
