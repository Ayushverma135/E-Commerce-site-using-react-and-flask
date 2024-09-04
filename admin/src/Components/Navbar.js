// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { FaShoppingCart, FaUser } from 'react-icons/fa';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import flipkartlogo from '../images/flipkartlogo.png';

// const Navbar = () => {
//   const token = localStorage.getItem('token');

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container-fluid">
//         <NavLink className="navbar-brand" to="/">
//           {/* Replace with the Flipkart logo */}
//           <img src="https://w7.pngwing.com/pngs/160/304/png-transparent-flipkart-logo-thumbnail.png" alt="logo" width="100" />
//         </NavLink>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           {/* Search bar */}
//           <form className="d-flex mx-auto">
//             <input
//               className="form-control me-2"
//               type="search"
//               placeholder="Search for products, brands and more"
//               aria-label="Search"
//             />
//             <button className="btn btn-outline-success" type="submit">
//               Search
//             </button>
//           </form>

//           <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
//             {token ? (
//               <>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to="/">
//                     Home
//                   </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to="/profile">
//                     <FaUser /> Profile
//                   </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to="/allOrders">
//                     Orders
//                   </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to="/logout">
//                     Logout
//                   </NavLink>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to="/">
//                     Home
//                   </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to="/login">
//                     Login
//                   </NavLink>
//                 </li>
//                 <li className="nav-item">
//                   <NavLink className="nav-link" to="/register">
//                     Register
//                   </NavLink>
//                 </li>
//               </>
//             )}

//             {/* Cart Icon */}
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/cart">
//                 <FaShoppingCart /> Cart
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import flipkartlogo from '../images/flipkartlogo.png';
const Navbar = ({ handleSearch, searchText, setsearchText }) => {
  const token = localStorage.getItem('token');

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src={flipkartlogo} alt="logo" width="100" />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Search bar */}
          <form className="d-flex mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search for products, brands and more"
              aria-label="Search"
              value={searchText}
              onChange={(e) => {
                setsearchText(e.target.value);
                handleSearch(e.target.value);
              }}
            />
            <button className="btn btn-outline-success" type="button" onClick={() => handleSearch(searchText)}>
              Search
            </button>
          </form>

          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            {token ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    <FaUser /> Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/allOrders">
                    Orders
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            )}

            {/* Cart Icon */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                <FaShoppingCart /> Cart
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
