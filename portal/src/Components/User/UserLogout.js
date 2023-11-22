import { FRONTENDURL, AUTHAPIURL } from "../Constants";
import axios from "axios"
const UserLogout = () => {
        console.log("user log out page");
        axios.get(AUTHAPIURL + "logoutPortalUser", {
                headers: { "Authorization": `${localStorage.getItem("userTokenPortal")}` }
        }).then((res)=>{
                        console.log(res);
                        localStorage.removeItem("userTokenPortal");
                        window.location.replace(FRONTENDURL);
                }
                ).catch((err)=>{
                        console.log(err);
                })
        
};

export default UserLogout;
