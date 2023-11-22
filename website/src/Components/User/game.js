import React from 'react'
import './game.css';
import Footer from './Footer'
import Navbar from './Navbar'
import texrace from '../images/game/texRace.png'
import route from '../images/game/route51.png'
import hits from '../images/game/hits24.png'
import ufo from '../images/game/ufo.png'
import rocket from '../images/game/rocket.png'
import ellipse from '../images/game/ellipse.png'
import playnow from '../images/game/playnow.png'

function Game() {

  return (
    <>
        <Navbar />
        <section className='section-game bg-img'>
            <div className='container p-y-5'>
            <h2 className='game-heading'>WELCOME TO THE SIMULATION</h2>
                <div className='row pt-6'>
                    <div className='col-lg-4 text-center game-margin-bottom-sm'>
                        <div className='position-relative'>
                            <img src={texrace} className='img-fluid img-width texrace' />
                        </div>    
                        <a href="/TexraceHome" className='playnow' target='_blank'>
                            <img src={playnow} className='img-fluid playnow-img' />
                        </a>
                    </div>
                    <div className='col-lg-4 text-center position-relative game-margin-bottom-sm'>
                        <div className='position-relative'>
                            <img src={ufo} className='img-fluid ufo' />
                            <img src={route} className='img-fluid img-width route51' />
                        </div>    
                        <a href="/RouteHome" className='playnow' target='_blank'>
                            <img src={playnow} className='img-fluid playnow-img' />
                        </a>
                    </div>
                    <div className='col-lg-4 text-center game-margin-bottom-sm'>
                        <div className='position-relative'>
                            <img src={rocket} className='img-fluid rocket' />
                            <img src={ellipse} className='img-fluid ellipse' />
                            <img src={hits} className='img-fluid img-width hits24' />
                        </div>
                        <a href="/HitHome" className='playnow' target='_blank'>
                            <img src={playnow} className='img-fluid playnow-img' />
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </>
  )
}

export default Game
