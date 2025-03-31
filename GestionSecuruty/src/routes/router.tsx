import {createBrowserRouter, Navigate, RouteObject} from 'react-router-dom';
import GuestLayout from '../layouts/GuestLayout';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import CyberLayout from '../layouts/CyberLayout';
import EntrepriseLayout from '../layouts/EntrepriseLayout';
import CyberDashboard from '../pages/cyberPage/CyberDashboard';
import EntrepriseDashboard from '../pages/entreprisePage/EntrepriseDashboard';
import EntrepriseRegister from '../pages/entreprisePage/EntrepriseRegister';
import CyberRegister from '../pages/cyberPage/CyberRegister';
const routes:RouteObject[]=[
{
    path:'/',
    element:<CyberLayout/>,
    children:[
        {
            path:'/',
            element:<Navigate to='/CyberDashboard'/>
        },
        {
            path:'/CyberDashboard',
            element:<CyberDashboard/>
        },
    ],

},
{
    path:'/',
    element:<EntrepriseLayout/>,
    children:[
        {
            path:'/',
            element:<Navigate to='/EntrepriseDashboard'/>
        },
        {
            path:'/EntrepriseDashboard',
            element:<EntrepriseDashboard/>
        },
    ],

},
{
    path:'/',
    element:<GuestLayout/>,
    children:[
        {
            path:'/',
            element:<Navigate to='/login'/>,
        },
        {
            path:'/login',
            element:<LoginPage/>
        },
        {
            path:'/EntrepriseRegister',
            element:<EntrepriseRegister/>
        },
        {
            path:'/CyberRegister',
            element:<CyberRegister/>
        }
    ],
},
{
    path:'*',
    element:<NotFoundPage/>
}
];

const router=createBrowserRouter(routes);
export default router;