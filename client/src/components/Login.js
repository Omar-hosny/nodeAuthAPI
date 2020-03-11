import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/auth/authContext";

const Login = props => {
  const authContext = useContext(AuthContext);

  const { loginUser, error, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error !== null) {
      setErrors(error);
      setTimeout(() => {
        setErrors("");
      }, 10000);
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history.push]);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState(error);

  const { email, password } = user;

  // onChange input function
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  // onSubmit function
  const onSubmit = e => {
    e.preventDefault();
    if (!email || !password) {
      setErrors("Please enter all fields..");
      setTimeout(() => {
        setErrors("");
      }, 3000);
    } else {
      loginUser({
        email,
        password
      });
      // clear Inputs
      setUser({
        email: "",
        password: ""
      });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="container mt-5">
        {errors ? (
          <div className="alert alert-danger mb-1"> {errors} </div>
        ) : null}
        <div className="row">
          <div className="col-md-6  mx-auto">
            <h2 className="text-center">Login</h2>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={email}
                placeholder="Enter your email address."
                className="form-control"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password."
                className="form-control"
                onChange={onChange}
              />
            </div>

            <input
              type="submit"
              value="Login"
              className="btn btn-primary btn-block"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
