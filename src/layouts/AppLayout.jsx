import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import AppNavbar from "../components/AppNavbar";
import AppFooter from "../components/AppFooter";

const AppLayout = ({ products, carts, setToken }) => {
    return ( 
    <>
    <AppHeader/>
    <AppNavbar products={products} carts={carts} setToken={setToken}/>
    <Outlet/>
    <AppFooter/>
    </> 
    );
}
 
export default AppLayout;