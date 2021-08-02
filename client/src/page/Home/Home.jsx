import './Home.scss';
import { useState,useEffect } from 'react';
import Navbar from '../../component/Navbar/Navbar'
import Feature from '../../component/Feature/Feature'
import List from '../../component/List/List'
import axios from 'axios';
const Home = ({type}) => {
    const [lists,setList] = useState([]);
    const [genre,setGenre] = useState('');
    useEffect(() => {
        const getRandomList = async ()=>{
            try{
               const res = await  axios.get(`/lists${type ? '?type='+type:""}${genre && type? '&genre='+genre:""}`,{
                   headers: {
                     token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                 },
               });
               setList(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getRandomList();
    }, [type,genre])
    return (
        <div className = "home">
            <Navbar/>
            <Feature type = {type} setGenre = {setGenre}/>
            {
                lists.map((list,index) => <List key = {index}
                list = {list}
                />)
            }
        </div>
    )
}

export default Home;
