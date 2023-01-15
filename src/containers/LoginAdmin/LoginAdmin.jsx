import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../_services/AuthService";
import TokenStorageService from "../../_services/TokenStorageService";
import { validate1LoginFormValues } from "../../_helpers1/form-utilities1";
// import "./Login.scss";

export default function LoginAdmin() {
  const initialValues = {
    email: "",
    password: "",
    // name: "",
    password2:"",
  };
  // hooks
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const credentials1 = {
      // email: "super@super.com",
      // password: "123456",
      //          email": "flay@flay.com",
      // "password": "123@Flay"

      email: formValues.email,
      password: formValues.password,
      password2: formValues.password2,
    //   name: formValues.nameadmin,
      // password: formValues.password,
    };
    // verificar que no hay error
    if (Object.keys(formErrors).length == 0 && isSubmit) {
      console.log("LOGIN...");
      login(credentials1);
    }
    console.log("useEffect", formErrors);
  }, [formErrors]);

  const login = async (credentials1) => {
    try {
      const res = await AuthService.login(credentials1);
      console.log(res.data);
      TokenStorageService.saveToken(res.data.token);
      console.log(res.data.role);
      navigate("/user");
    } catch (error) {
      console.log(error);
    }
  };

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
    setFormErrors(validate1LoginFormValues(formValues));
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
          <div className="mb-3">
            <label className="form-label">Password2</label>
            <input
              type="password2"
              name="password2"
              className="form-control"
              value={formValues.password2}
              onChange={handleChange}
            />
            <div className="form-text form-text-error">{formErrors.password2}</div>
          </div>
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
