// import React, { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate(); // Use useNavigate instead of useHistory

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const SetData = async (e) => {
//     e.preventDefault();

//     const res = await fetch('/adminLogin', {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         email, password
//       })
//     });

//     const data = await res.json();

//     if (res.status === 201) {
//       window.alert("Login Successful");
//       localStorage.setItem('token', data.token);
//       navigate('/'); // Use navigate instead of history.push
//     } else {
//       window.alert("Invalid Credentials");
//     }
//   };

//   return (
//     <section>
//       <div className="container mt-5">
//         <div className='row'>
//           <div className="col-sm-6 offset-md-3 offset-sm-1">
//             <form onSubmit={SetData}> {/* Use onSubmit for form submission */}
//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="email"
//                   name="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your Email"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   id="password"
//                   name="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your Password"
//                   required
//                 />
//               </div>

//               <NavLink to='/register'>Not registered? Register here!</NavLink><br /><br />
//               <button type="submit" className="btn btn-primary" id='login' name='login'>Login</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Adjust the path if needed

const LoginWithNavbar = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('/adminLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, 
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 201) {
      window.alert('Login Successful');
      localStorage.setItem('token', data.token);
      navigate('/'); // Use navigate instead of history.push
    } else {
      window.alert('Invalid Credentials');
    }
  };

  return (
    <div>
      {/* Include Navbar */}
      <Navbar handleSearch={() => {}} searchText="" setsearchText={() => {}} />

      <section>
        <div className="container mt-5">
          <div className='row'>
            <div className="col-sm-6 offset-md-3 offset-sm-1">
              <form onSubmit={handleLogin}> {/* Use onSubmit for form submission */}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your Password"
                    required
                  />
                </div>

                <NavLink to='/register'>Not registered? Register here!</NavLink><br /><br />
                <button type="submit" className="btn btn-primary" id='login' name='login'>Login</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginWithNavbar;
