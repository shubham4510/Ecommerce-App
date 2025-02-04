import Navbar from "../../components/admin/Navbar"
import SideBar from "../../components/admin/SideBar"

const AdminLayout = ({children}) => {
  return (
    <div className=" w-full h-full overflow-x-hiddem">
        <Navbar/>
        <div className="flex">
        <SideBar/>
        <div className=" w-full px-5 py-6">
       {children} 
        </div>
        </div>
    </div>
  )
}

export default AdminLayout