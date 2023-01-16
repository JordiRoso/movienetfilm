import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthService from "../../_services/AuthService";
import TokenStorageService from "../../_services/TokenStorageService";
import { validateLoginFormValues } from "../../_helpers/form-utilities";
import { login } from "../../features/login/authSlice";
import "./Login.scss";

export default function Login() {
  const initialValues = {
    email: "",
    password: "",
  };
  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const logged = useSelector((state) => state.auth.isLoggedIn);

  // console.log(`Loggeado es ${logged}`);

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const credentials = {
      // email: "super@super.com",
      // password: "123456",
      //          email": "flay@flay.com",
      // "password": "123@Flay"

      email: formValues.email,
      password: formValues.password,
      // password: formValues.password,
    };
    // verificar que no hay error
    if (Object.keys(formErrors).length == 0 && isSubmit) {
      console.log("LOGIN...");
      login(credentials);
    }
    console.log("useEffect", formErrors);
  }, [formErrors]);

  const login = async (credentials) => {
    try {
      const res = await AuthService.login(credentials);
      console.log(res.data);
      TokenStorageService.saveToken(res.data.token);

      dispatch(login(res.user));

      console.log(res.data.role);
      if (res.data.message === "User Logged as SUPER_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //res.data.role == "super_admin"

  // const login = async (credentials) => {
  //   try {
  //     const res = await AuthService.login(credentials);
  //     console.log(res.data);
  //     TokenStorageService.saveToken(res.data.token);
  //     console.log(res.data.role);
  //     switch (res.data.role) {
  //       case "user":
  //         navigate("/admin");
  //         break;
  //       // case "super_admin":
  //       //   navigate("/admin");
  //       //   break;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,

      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    setFormErrors(validateLoginFormValues(formValues));
    console.log("handle", formErrors);
    setIsSubmit(true);
  };

  return (
    <div>
      <div className="container pt-5 col-lg-3">
        <h2>Login</h2>

        <pre className="text-start">
          {JSON.stringify(formValues, undefined, 2)}
        </pre>

        <form className="text-start" noValidate onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formValues.email}
              onChange={handleChange}
            />
            <div className="form-text form-text-error">{formErrors.email}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formValues.password}
              onChange={handleChange}
            />
            <div className="form-text form-text-error">
              {formErrors.password}
            </div>
          </div>
          {/* <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                     type="password"
                     name="password"
                     className="form-control"
                     value={formValues.password}
                     onChange={handleChange}
                  />
                  <div className="form-text form-text-error">
                     {formErrors.password}
                  </div>
               </div> */}
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-primary text-white fw-bold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* <button onClick={() => login(credentials)}>Enviar login</button> */}
    </div>
  );
}

// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import AuthService from "../../_services/AuthService";
// import { login } from "../../features/login/authSlice";
// import TokenStorageService from '../../_services/TokenStorageService.js';
// import "./Login.scss";

// export default function Login() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const logged = useSelector((state) => state.auth.isLoggedIn);

//   console.log(`Loggeado es ${logged}`);

//   const [message, setMessage] = useState("");

//   const [formValues, setFormValues] = useState({
//     email: "",
//     password: "",
//   });

//   const handleLogin = async (credentials) => {
//     try {
//       const res = await AuthService.login(credentials);
//       TokenStorageService.saveToken(res.token);

//       dispatch(login(res.user));
      
//       if (res.user.role == "admin") {
//         navigate("/administratorPanel");
//       } else if (res.user.role == "user") {
//         navigate("/movies");
//       }
//     } catch (e) {
//       setMessage(
//         "Ha habido un error inesperado, inténtelo de nuevo más tarde."
//       );
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({
//       ...formValues,
//       [name]: value,
//     });
//   };

//   return (
//     <div className="login">
//       <h2 className="formTitle">Login</h2>
//       <label htmlFor="email">Email</label>
//       <input
//         type="email"
//         name="email"
//         value={formValues.email}
//         onChange={handleChange}
//       />

//       <label htmlFor="password">Password</label>
//       <input
//         type="password"
//         name="password"
//         value={formValues.password}
//         onChange={handleChange}
//       />

//       <button className="btn-login" onClick={() => handleLogin(formValues)}>
//         Submit
//       </button>
//       <span className="message">{message}</span>
//     </div>
//   );
// }
