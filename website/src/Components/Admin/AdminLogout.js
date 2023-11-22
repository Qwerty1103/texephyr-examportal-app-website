import { useEffect } from "react";
import { FRONTENDURL } from "../Constants";

function AdminLogout() {
    useEffect(() => {
        localStorage.removeItem("adminToken");
        window.location.replace(FRONTENDURL + 'admin');
    })
}
  
export default AdminLogout  