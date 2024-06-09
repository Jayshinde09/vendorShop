import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Error from "./components/Error/Error";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Login from "./components/Login/Login";
import Admin from "./components/Login/Admin";
import Register from "./components/Login/Register";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import AppContext from "./utils/Context";
import Cart from "./components/SingleProduct/Cart/Cart";
import AllProducts from "./components/Product/AllProducts";
import Manageuser from "./components/AdminPanel/ManageUser";
import AddProducts from "./components/AdminPanel/AddProducts";
import ManageOrder from "./components/AdminPanel/ManageOrder";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import ViewOrders from "./components/UserDashboard/ViewOrders";
import ProfileDetails from "./components/UserDashboard/ProfileDetails";
import About from "./components/Home/About";
import Notification from "./components/UserDashboard/Notification";
import LabourRegister from "./components/LabourPanel/LabourRegister";
import LabourLogin from "./components/LabourPanel/LabourLogin";
import ManageLabour from "./components/AdminPanel/ManageLabour";
import LabourPanel from "./components/LabourPanel/LabourPanel";
import LabourOrders from "./components/LabourPanel/LabourOrders";
import Footer from "./components/Footer/Footer";
import EditProfile from "./components/UserDashboard/EditProfile";
import EditLabourProfile from "./components/LabourPanel/EditLabourProfile";

function App() {
    return (
        <div>
            <BrowserRouter>
                <AppContext>
                    <Header/>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/product/:slug' element={<SingleProduct/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route path='/admin' element={<Admin/>}/>
                        <Route path='/labour/register' element={<LabourRegister/>}/>
                        <Route path='/labour/login' element={<LabourLogin/>}/>
                        <Route path='/labour/panel' element={<LabourPanel/>}/>
                        <Route path='/labour/orders' element={<LabourOrders/>}/>
                        <Route path='/labour/edit' element={<EditLabourProfile/>}/>
                        <Route path='/userdashboard' element={<UserDashboard/>}/>
                        <Route path='/userdashboard/manageorders' element={<ViewOrders/>}/>
                        <Route path='/userdashboard/profile' element={<ProfileDetails/>}/>
                        <Route path='/userdashboard/edit' element={<EditProfile/>}/>
                        <Route path='/userdashboard/notifications' element={<Notification/>}/>
                        <Route path='/adminpanel' element={<AdminPanel/>}/>
                        <Route path='/adminpanel/users' element={<Manageuser/>}/>
                        <Route path='/adminpanel/addproducts' element={<AddProducts/>}/>
                        <Route path='/adminpanel/manageorders' element={<ManageOrder/>}/>
                        <Route path='/adminpanel/managelabours' element={<ManageLabour/>}/>
                        <Route path='/cart' element={<Cart/>}/>
                        <Route path='/products' element={<AllProducts/>}/>
                        <Route path='/about' element={<About/>}/>
                        <Route path='*' element={<Error/>}/>
                    </Routes>
                    <Footer/>
                </AppContext>
            </BrowserRouter>
        </div>
    );
}

export default App;
