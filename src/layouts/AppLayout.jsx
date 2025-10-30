// components/AppLayout.jsx
import { Outlet } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import AppNavBar from '../components/AppNavBar';
import AppFooter from '../components/AppFooter';

const AppLayout = () => {
    return ( 
    <>
    <AppHeader/>
    <AppNavBar/>
    <Outlet/>
    <AppFooter/>
    </> 
    );
}
 
export default AppLayout;