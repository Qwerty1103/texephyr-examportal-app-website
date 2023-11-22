import { FRONTENDURL } from "../Constants";

const UserLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("cart");
        localStorage.removeItem("total");
        window.location.replace(FRONTENDURL);
};

export default UserLogout;
