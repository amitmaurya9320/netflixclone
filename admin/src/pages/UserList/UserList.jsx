import {useContext,useEffect} from 'react';
import './UserList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import {Link} from 'react-router-dom';
import { UserContext } from '../../context/userContext/userContext';
import { deleteUser, getUsers } from '../../context/userContext/apiCalls';
const UserList = () => {
  const {users,dispatch} = useContext(UserContext);
  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch])
    const handleDelete = (id) =>{
        deleteUser(dispatch,id);
    }
    const columns = [
  { field: '_id', headerName: 'ID', width: 200 },
  {field:"user", headerName :"User" , width:250,renderCell:(params)=>{
      return (
          <div className ='userListUser'>
              <img src={params.row.profilePic} alt="" />
              {params.row.username}
          </div>
      )
  }},
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'isAdmin',
    headerName: 'Admin',
    width: 120,  },
  {
      field:"action",
      headerName:"Action",
      width:150,
      renderCell:(params)=>{
          return (
              <>
              <Link to = {'/user/' + params.row._id}>
              
                    <button className="UserListEdit">Edit</button>
              </Link>
              <DeleteOutline className="UserListDelete" onClick = {() => handleDelete(params.row._id)}/>
            </>
          )
      }
  }
];
    return (
        <div className ='userList'>
            <div className ='btnContainer'>

            <Link to ='/newUser' className ='link'>
            <span className ='createNewBtn'>Create</span>
            </Link>
            </div>
        <DataGrid
        rows={users}
        columns={columns}
        pageSize={8}
        checkboxSelection
        disableSelectionOnClick
        getRowId = {(r) => r._id}
      />
        </div>
    )
}

export default UserList
