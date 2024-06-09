import { createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Menu from '../pages/Menu'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Login from '../pages/Login'
import RegisterPage from '../pages/RegisterPage'
import UploadProduct from '../pages/UploadProduct'

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : ":productId",
                element : <Menu/>
            },
            {
                path : "about",
                element : <About/>
            },
            {
                path : "contact",
                element : <Contact/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : 'register',
                element : <RegisterPage/>
            },
            {
                path : 'upload-product',
                element : <UploadProduct/>
            }
        ]
    }
])

export default router