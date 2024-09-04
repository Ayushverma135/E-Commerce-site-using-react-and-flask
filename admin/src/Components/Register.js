import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const [user, setUser] = useState({
    companyName: "", email: "", phone: "", password: "", cpassword: ""
  });

  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { companyName, email, phone, password, cpassword } = user;

    const res = await fetch('/adminRegister', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        companyName, email, phone, password, cpassword
      })
    });

    const data = await res.json();

    if (res.status === 201) {
      localStorage.setItem('token', data.token);
      window.alert("Registration Successful");

      navigate('/'); // Use navigate instead of history.push
      window.location.reload();

    } else {
      window.alert("Registration Failed");
    }
  };

  return (
    <section>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-md-7 col-sm-6">
            <h1 className='mt-5'>
              Welcome!
            </h1>
          </div>

          <div className="col-12 col-md-5 col-sm-6">
            <form onSubmit={PostData}> {/* Use onSubmit for form submission */}
              <div className="form-group">
                <label htmlFor="companyName">Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="companyName"
                  name="companyName"
                  value={user.companyName}
                  onChange={handleInputs}
                  placeholder="Enter your company name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputs}
                  placeholder="Enter your Email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone No.</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={user.phone}
                  onChange={handleInputs}
                  placeholder="Enter your Phone No."
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
                  value={user.password}
                  onChange={handleInputs}
                  placeholder="Enter your Password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cpassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="cpassword"
                  name="cpassword"
                  value={user.cpassword}
                  onChange={handleInputs}
                  placeholder="Confirm Password"
                  required
                />
              </div>

              <NavLink to='/login'>Already Registered? Login here!</NavLink><br /><br />
              <button type="submit" className="btn btn-primary" id='register'>Register</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
