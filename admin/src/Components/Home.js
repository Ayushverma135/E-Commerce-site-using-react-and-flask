import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'; // Adjust the path if needed
import { NavLink } from 'react-router-dom';
import AllProducts from '../adminPages/AllProducts';
import plus from '../images/image8.webp';
import '../App.css';
import Slider from "react-slick"; // Import the Slider component from react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from '../images/banner1.jpg'; // Example banner images
import banner2 from '../images/banner2.webp';
import banner3 from '../images/banner3.webp';
import banner4 from '../images/banner4.webp'; // Example banner images
import banner5 from '../images/banner5.webp';
import banner6 from '../images/banner6.webp';
import banner7 from '../images/banner7.webp';


const Home = () => {
  const [data, setData] = useState('');
  const [show, setShow] = useState(false);
  const [searchProducts, setSearchProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [adminProducts, setAdminProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem('token');
  const bannerImages = [banner1, banner2, banner3, banner4, banner5, banner6, banner7];


  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop through slides infinitely
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true, // Autoplay slides
    autoplaySpeed: 2000, // Autoplay speed in milliseconds
    pauseOnHover: true, // Pause autoplay on hover
  };

  const category = [
    { id: 1, name: 'Electronics', imageUrl: require('../images/image2.webp') },
    { id: 2, name: 'Fashion', imageUrl: require('../images/image3.webp') },
    { id: 3, name: 'Furniture', imageUrl: require('../images/image5.webp') },
    { id: 4, name: 'Mobile and Accessories', imageUrl: require('../images/image4.webp') },
    { id: 5, name: 'Home Appliances', imageUrl: require('../images/image6.webp') },
    { id: 6, name: 'Kids', imageUrl: require('../images/image9.webp') },
    { id: 7, name: 'Tickets', imageUrl: require('../images/image7.webp') },
    { id: 8, name: 'Gifts', imageUrl: require('../images/image8.webp') },
    { id: 9, name: 'Kitchen', imageUrl: require('../images/image1.webp') },
    { id: 10, name: 'Vehicle Accessories', imageUrl: require('../images/image10.webp') }
    // Add more categories as needed
  ];

  const products1 = [
    {
      id: 1,
      name: 'Product 1',
      imageUrl: require('../images/2banner1.webp'),
    },
    {
      id: 2,
      name: 'Product 2',
      imageUrl: require('../images/2banner2.webp'),
    },
    {
      id: 3,
      name: 'Product 3',
      imageUrl: require('../images/2banner3.webp'),
    },
    {
      id: 4,
      name: 'Product 4',
      imageUrl: require('../images/2banner4.webp'),
    },
    {
      id: 5,
      name: 'Product 5',
      imageUrl: require('../images/2banner5.webp'),
    },
    {
      id: 6,
      name: 'Product 6',
      imageUrl: require('../images/2banner6.webp'),
    },
    {
      id: 7,
      name: 'Product 7',
      imageUrl: require('../images/2banner7.webp'),
    },
    {
      id: 8,
      name: 'Product 8',
      imageUrl: require('../images/2banner8.webp'),
    }
  ];
  
  const products2 = [
    {
      id: 1,
      name: 'Product 1',
      imageUrl: require('../images/3banner1.webp'),
    },
    {
      id: 2,
      name: 'Product 2',
      imageUrl: require('../images/3banner2.webp'),
    },
    {
      id: 3,
      name: 'Product 3',
      imageUrl: require('../images/3banner3.webp'),
    },
    {
      id: 4,
      name: 'Product 4',
      imageUrl: require('../images/3banner4.webp'),
    },
    {
      id: 5,
      name: 'Product 5',
      imageUrl: require('../images/3banner5.webp'),
    },
    {
      id: 6,
      name: 'Product 6',
      imageUrl: require('../images/3banner6.webp'),
    },
    {
      id: 7,
      name: 'Product 7',
      imageUrl: require('../images/3banner7.webp'),
    },
    {
      id: 8,
      name: 'Product 8',
      imageUrl: require('../images/3banner8.webp'),
    }
  ];
  

  const getAdminData = async () => {
    const token = await localStorage.getItem('token');
    try {
      const res = await fetch('/getAdminData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auth: token }),
      });

      const data = await res.json();
      if (res.status === 201) {
        setData(data[0]);
        getAllProducts(data[0]._id['$oid']);
        // Assuming categories endpoint to get product categories
        getCategories();
      } 
      // else {
      //   window.alert('Something went wrong');
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async (id) => {
    try {
      const res = await fetch('/getAllProducts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const allprods = await res.json();
      const adpr = allprods.filter((c) => c.adminId === id);
      setAdminProducts(adpr);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await fetch('/getCategories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const categoriesData = await res.json();
      setCategories(categoriesData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (txt) => {
    setSearchText(txt);
    if (txt) {
      const newList = adminProducts.filter((item) => {
        const itemData = item.productName ? item.productName.toUpperCase() : '';
        const textData = txt.toString().toUpperCase();
        return itemData.includes(textData);
      });
      setShow(true);
      setSearchProducts(newList);
    } else {
      setShow(false);
      setSearchText('');
      getAdminData();
    }
  };

  useEffect(() => {
    getAdminData();
  }, []);

  return (
    <>
      <Navbar handleSearch={handleSearch} searchText={searchText} setSearchText={setSearchText} />

      {/* Banner Section */}
      <div className="banner-slider">
        <Slider {...settings}>
          {bannerImages.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`banner ${index + 1}`} className="banner-image" />
            </div>
          ))}
        </Slider>
      </div>

      {/* Categories Section */}
      <div className="categories">
      <h2>Categories</h2>
      <div className="category-list">
        {category.map((cat) => (
          <div key={cat.id} className="category-item">
            <img src={cat.imageUrl} alt={cat.name} className="category-image" />
            <h3>{cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
    {/*product display section*/}
    <div className="categories">
    <h2>Top Products</h2>
    <div className="category-list">
    {products1.map((product1) => (
        <div key={product1.id} className="product-item">
        <img src={product1.imageUrl} alt={product1.name} className="product-image" />
        <h3>{product1.name}</h3>
      </div>
      ))}
    </div>
    </div>

    <div className="categories">
    <h2>Top Products</h2>
    <div className="category-list">
    {products2.map((product2) => (
        <div key={product2.id} className="product-item">
        <img src={product2.imageUrl} alt={product2.name} className="product-image" />
        <h3>{product2.name}</h3>
      </div>
      ))}
    </div>
    </div>
      {/* Product Section */}
      {!show && (
        <div>
          <br />
          <h3>Top Deals</h3>
          <hr />
          <div className="scroll-products">
            {token && <AllProducts productUrl={plus} addButton={true} />}
            {token &&
              adminProducts
                .slice(0)
                .reverse()
                .map((p) => (
                  <AllProducts
                    key={p._id['$oid']}
                    productUrl={p.productUrl}
                    productName={p.productName}
                    productType={p.productPrice.split('<=>')[1]}
                    productPrice={p.productPrice.split('<=>')[0]}
                    uid={p._id['$oid']}
                  />
                ))}
          </div>
        </div>
      )}

      {/* Search Results Section */}
      {show && (
        <div>
          <h3>Search Results</h3>
          <hr />
          <div className="scroll-products">
            {token &&
              searchProducts
                .slice(0)
                .reverse()
                .map((p) => (
                  <AllProducts
                    key={p._id['$oid']}
                    productUrl={p.productUrl}
                    productName={p.productName}
                    productType={p.productPrice.split('<=>')[1]}
                    productPrice={p.productPrice.split('<=>')[0]}
                    uid={p._id['$oid']}
                  />
                ))}
          </div>
        </div>
      )}

      {/* No Results Found */}
      {token && searchText && searchProducts.length === 0 && (
        <div>
          <div className="row text-center align-self-center">
            <div className="col-lg-7 mx-auto">
              <NavLink to="/" className="lead mb-0" style={{ color: '#0066ff' }}>
                No results Found :(
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {/* Login Prompt */}
      <div>
        {!token && (
          <div>
            <div className="row text-center align-self-center">
              <div className="col-lg-7 mx-auto">
                <h1 className="display-4">Please Login to Add the Product</h1>
                <NavLink to="/login" className="lead mb-0" style={{ color: '#0066ff' }}>
                  Login here
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
