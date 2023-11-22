import contentStack from '../images/cs-2.png'
import studysmart from '../images/study-smart.png'
import foodpartner from '../images/food-partner.png'

const Sponsor = () => {
    return (
        <div className='joining-section'>
            <div className='container'>
                <div className='row'>

                <div className='col-lg-12 mb-5'>
                        <h1 className="joining-heading text-center" >
                           SPONSORS
                        </h1>
                    </div>

                <div className='col-lg-6'>
                        <div className='row mb-5'>
                            <div className='col-lg-12 order-2 mb-3'>
                                <h1 className="text-center sponsorsize" >
                                    TITLE SPONSOR
                                </h1>
                            </div>
                            <div className='col-lg-12 order-1 mt-2  mb-3 position-relative text-center'>
                                <img src={contentStack} alt="ContentStack" className='img-fluid contentStack' />
                            </div>
                        </div>

                    </div>
                    
                    <div className='col-lg-6'>
                        <div className='row mb-5'>
                            <div className='col-lg-12 order-2 mb-3'>
                                <h1 className="text-center sponsorsize" >
                                    SNACKS PARTNER
                                </h1>
                            </div>
                            <div className='col-lg-12 order-1 mt-3   mb-4 position-relative text-center'>
                                <img src={foodpartner} alt="foodpartner" className='img-fluid' style={{ width: "200px", height: "100px" }} />
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>

    )
}
export default Sponsor;