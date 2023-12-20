
import './App.css';

import { Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import { Pagenotfound } from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/routes/PrivateRoute';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Products from './pages/Admin/Products';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import UpdateProduct from './pages/Admin/UpdateProduct';
import ProductDetail from './pages/ProductDetail';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';
import Home from './pages/Home';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';




function App() {
  const navMenu=document.getElementById('nav-menu');
 const navToggle=document.getElementById('nav-toggle')
 const navClose=document.getElementById('nav-close')

if(navToggle){
    navToggle.addEventListener('click',()=>{
        navMenu.classList.add('show-menu')
    })
}
if(navClose){
    navClose.addEventListener('click',()=>{
        navMenu.classList.remove('show-menu')

    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink=document.querySelectorAll('.nav_link')
const linkAction=()=>{
    const navMenu=document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')

    
}
navLink.forEach(n=>n.addEventListener('click',linkAction))



/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader=()=>{
    const header=document.getElementById('header');

    this.scrollY>=50 ? header.classList.add('bg-header'):header.classList.remove('bg-header')
}

  return (
    <>
    <Header/>
    <Routes>
     
      <Route path='/' element={<Home/>}/>
    <Route path='/Product' element={<HomePage/>}/>
      <Route path='/Product' element={<HomePage/>}/>
      <Route path='/about' element={<About/>}/>
     <Route path='/dashboard' element={<PrivateRoute/>}>
     <Route path='user' element={<Dashboard/>}/>
     <Route path='/dashboard/user/profile' element={<Profile/>}/>
     <Route path='/dashboard/user/orders' element={<Orders/>}/>
     

     </Route>
     <Route path='/dashboard' element={<AdminRoute/>}>
     <Route path='admin' element={<AdminDashboard/>}/>
     <Route path='admin/orders' element={<AdminOrders/>} />
   
     <Route path='/dashboard/admin/create-category' element={<CreateCategory/>}/>
     <Route path='/dashboard/admin/create-product' element={<CreateProduct/>}/>
     <Route path='/dashboard/admin/products' element={<Products/>}/>
     <Route path='/dashboard/admin/products/:slug' element={<UpdateProduct/>}/>
     

     <Route path='/dashboard/admin/users' element={<Users/>}/>
    
     </Route>
     
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/search' element={<SearchPage/>}/>
      <Route path='/cart' element={<CartPage/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='/product-detail/:slug' element={<ProductDetail/>}/>
      
      <Route path='/register' element={<Register/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='*' element={<Pagenotfound/>}/>
    </Routes>
    <Footer/>

  

  
    

   
    
 
    </>
  
  );
}

export default App;
