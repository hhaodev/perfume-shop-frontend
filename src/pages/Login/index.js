import axios from "axios";
import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import InputField from "../../components/InputField/inputField";
import "./login.scss";
import { useDispatch } from "react-redux";
import { checkUser } from "../../redux/actions";
import { BiErrorCircle } from "react-icons/bi";
const Login = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [currentUser, setCurrentUser] = useState([]);
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/api/v1/auth/login",
        data: formData,
        headers: { "Content-Type": "application/json" },
      });
      dispatch(checkUser(response.data.data.result));
      setCurrentUser(response.data.status);
      localStorage.setItem("token", JSON.stringify(response.data.data.token));
    } catch (error) {
      console.log(error.response.data.message);
      setErrors(error.response.data.message);
    }
  };
  const handelInput = (e) => {
    setFormData((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="login__form">
      <div className="container__form">
        <div className="errors__box">
          {errors &&
            errors.map((error, index) => (
              <div className="errors__box-item">
                <BiErrorCircle color="red" />
                <p key={index} className="errors__item-title">
                  {error.message}
                </p>
              </div>
            ))}
        </div>
        <h3 className="title__login">Wellcome back, friend!</h3>
        <form className="form__input" onSubmit={handelSubmit}>
          {currentUser === "success" && <Navigate to="/" replace={true} />}
          <div className="input__item">
            <InputField
              type="email"
              placeholder="Email..."
              name="email"
              value={formData.name}
              onChange={handelInput}
            ></InputField>
          </div>

          <div className="input__item">
            <InputField
              type="password"
              placeholder="Password..."
              name="password"
              value={formData.name}
              onChange={handelInput}
            ></InputField>
          </div>

          <div className="input__check">
            <input type="checkbox" name="checkbox" />
            <span>
              I've read and agree to <strong>Terms and Conditions</strong>
            </span>
          </div>
          <input type="submit" className="input__submit" value="Let's go" />
          <p className="input___register-title">
            Do not have an account ?{" "}
            <NavLink to="/register" className="input__register">
              Sign Up
            </NavLink>
          </p>
        </form>
      </div>
      <div className="login__intro">
        <h2>Glad to see You!</h2>
        <p>VA Perfume is happy to serve you</p>
        <p>Our motto "prestige, quality, thoughtful"</p>
        <p>-Founder Nguyen Van Anh-</p>
      </div>
    </div>
  );
};

export default Login;
