import  { Link } from "react-router-dom";
import "./subscribe.css";
import texLogo from "../images/texLogo.png"
import vector8 from "../images/vector-8.svg"
import abstractImageBlur from "../images/3dabstractdesign6removebgpreview-2@2x.png"
import abstractImage from "../images/3dabstractdesign6removebgpreview-1@2x.png"
/* test */
const Subscribe = () =>  {
  return (
    <div className= "subscribePage">
      <div className= "footer ">
        <div className= "footerChild " />
        <div className= "copyright2023AllContainer ">
          <span>Copyright @2023 All right reversed by</span>
          <span className= "texephyr23 "> Texephyr ‘23</span>
        </div>
        <div className= "footerItem " />
        <div className= "termConditionParent ">
          <div className= "termCondition "> "`Term & condition` "</div>
          <div className= "privacyPolicy ">Privacy policy</div>
          <Link className= "refundcancellationPolicy ">
            Refund/cancellation policy
          </Link>
        </div>
        <div className= "register">
          <button className= "registerChild" autoFocus />
          <img className= "registerItem" alt="" src= {vector8} />
          <div className= "register1 ">Register</div>
        </div>
        <div className= " getYourSeat">
          Get your seat before the price goes up
        </div>
        <img
          className= "texephyrLogoFullSizeWh"
          alt=""
          src= {texLogo}
        />
      </div>
      <div className= " viewallParent ">
        <div className= " viewall ">
          <button className= " viewallChild " autoFocus />
          <button className= " viewallItem " />
          <div className= " viewAll ">View All</div>
        </div>
        <div className= " frameChild " />
        <div className= " subscribeToOur ">
          Subscribe to our newsletter to receive exclusive offers, latest news
          and update
        </div>
        <b className= " subscribeToNewsletter ">SUBSCRIBE TO NEWSLETTER</b>
        <div className= " imgball ">
          <img
            className= " dAbstractDesign6RemovebgPIcon "
            alt=""
            src= {abstractImage}
          />
          <img
            className= " dAbstractDesign6RemovebgPIcon1 "
            alt=""
            src= {abstractImage}
          />
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
