import HeaderAdmin from "../../components/admin/HeaderAdmin"
import UploadImages from "./UploadImgPage"
import DeleteImgPage from "./DeleteImgPage"
const AdminImagePage = () =>{
 return (
    <>
    <HeaderAdmin/>
    <main>
        <UploadImages/>
        <DeleteImgPage/>
    </main>
    
    </>
 )
}
export default AdminImagePage