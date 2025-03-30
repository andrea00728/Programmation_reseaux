import {createBrowserRouter, Navigate, RouteObject} from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import Dashboard from '../pages/Dashboard';
import GuestLayout from '../layouts/GuestLayout';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';
const routes:RouteObject[]=[
{
    path:'/',
    element:<DefaultLayout/>,
    children:[
        {
            path:'/',
            element:<Navigate to='/dasboard'/>
        },
        {
            path:'/dashboard',
            element:<Dashboard/>
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
            path:'/register',
            element:<RegisterPage/>
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