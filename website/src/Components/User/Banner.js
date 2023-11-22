import { Link } from 'react-router-dom';
import './banner.css';
import gameBtn from '../images/play_game.png';
function Banner() {
    return (
        <section className="banner-section text-center">
            <Link to="/game" className='banner-btn effect-btn'>Enter the simulation</Link>
        </section>
    );
}

export default Banner