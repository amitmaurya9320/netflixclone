import './Watch.scss'
import {ArrowBack} from '@material-ui/icons';
import { useLocation} from 'react-router';
import {Link} from 'react-router-dom'
const Watch = () => {
    const location = useLocation()
    const movie = location.movie;
    console.log(location);
    return (
        <div className ='watch'>
            <Link to = '/' className ='link'>
            <div className="back">
                <ArrowBack/>Home
            </div>
            </Link>
            <video className = 'video' src={movie.video} autoPlay progress = "true" controls></video>
        </div>
    )
}

export default Watch;
