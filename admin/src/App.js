import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import AddProduct from './adminPages/AddProduct';
import AllOrders from './adminPages/AllOrders';
import DeleteProduct from './adminPages/DeleteProduct';
import EditProduct from './adminPages/EditProduct';
import Home from './Components/Home';
import Login from './Components/Login';
import Logout from './Components/Logout';
// import Navbar from './Components/Navbar';
import Register from './Components/Register';
import { useEffect } from 'react';  // Import useEffect from React

function App() {

  // Define the googleTranslateElementInit function
  const googleTranslateElementInit = () => {
    const google = window.google;
    if (google) {
      new google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
      );
    }
  };

  // Use useEffect to initialize Google Translate
  useEffect(() => {
    googleTranslateElementInit();
  }, []);

  return (
    <div style={{ marginLeft: '2%', marginRight: '2%' }}>
      {/* <Navbar /> */}
      <div id="google_translate_element">
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/addProduct' element={<AddProduct />} />
          <Route path='/editProduct' element={<EditProduct />} />
          <Route path='/allOrders' element={<AllOrders />} />
          <Route path='/deleteproduct' element={<DeleteProduct />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
