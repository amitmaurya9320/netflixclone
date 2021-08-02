import './List.scss';
import {useRef,useState} from 'react'
import {ArrowBackIosOutlined,ArrowForwardIosOutlined} from '@material-ui/icons'

import ListItem from '../ListItem/ListItem'
const List = ({list}) => {
    const [isMoved,setIsMoved] = useState(false);
    const [slideNumber,setSlideNumber] = useState(0);
    const [clickLimit] = useState(window.innerWidth/230);
    const listRef = useRef();

    const handleClick = (direction) =>{
        setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x -50;
        if(direction === "left" && slideNumber > 0){
            setSlideNumber(slideNumber -1);
            listRef.current.style.transform = `translateX(${230 + distance}px)`
        }
        if(direction === "right" && slideNumber < 10 - clickLimit){
            setSlideNumber(slideNumber +1);
            listRef.current.style.transform = `translateX(${-230 + distance}px)`
        }
    }
    return (
        <div className ="list">
            <span className = "listTitle">{list.title}</span>
            <div className="wrapper">
            <ArrowBackIosOutlined className = "sliderArrow left" 
            style = {{display:!isMoved && "none"}}
            onClick = {() => handleClick("left")}/>
            <div className="container" ref = {listRef}>
               {
                   list.content.map((item,index) => <ListItem key = {item} index = {index} item = {item}/>)
               }
                
            </div>
            <ArrowForwardIosOutlined className = "sliderArrow right" onClick = {() => handleClick("right")}/>
            </div>
        </div>
    )
}

export default List
