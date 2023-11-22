import { useEffect } from "react";
import { FRONTENDURL } from "../Constants";

function AdminLogout() {
    useEffect(() => {
        localStorage.removeItem("adminTokenPortal");
        window.location.replace(FRONTENDURL + 'admin');
    })
}
  
export default AdminLogout  