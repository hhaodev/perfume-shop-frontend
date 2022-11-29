import BannerPage from "../../components/BannerPage";
import banner from "../../assets/images/bg-slider.jpg";
import { RiCoupon2Line } from "react-icons/ri";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import "./checkout.scss";
import { slideHideForm, slideShowForm } from "../../components/TransformStyle";
import axios from "axios";
const Checkout = () => {
  const [country, setCountry] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [infoUser, setInfoUser] = useState({
    fName: "",
    lName: "",
    country: "",
    state: "",
    street: "",
    phone: "",
    email: "",
  });
  useEffect(() => {
    const getCountry = async () => {
      const response = await axios({
        method: "get",
        url: "https://provinces.open-api.vn/api/?depth=3",
      });
      setCountry(response.data);
    };
    getCountry();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const getCountryId = value;
    const getStateData = country.find(
      (country) => country.code === getCountryId
    );
    setStateData(getStateData.districts);
    setInfoUser((pre) => ({
      ...pre,
      [name]: getStateData.name,
    }));
  };
  const [toggleCoupon, setToggleCoupon] = useState(false);

  const handleToggleCoupon = () => {
    setToggleCoupon(!toggleCoupon);
  };
  const handleSubmit = (e) => {
    console.log(infoUser);
  };
  const handleChangeInfo = (e) => {
    const { name, value } = e.target;
    setInfoUser((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  return (
    <>
      <BannerPage
        heading="Organic Cosmetic"
        title="Shop Checkout"
        img={banner}
      />
      <div className="container">
        <div className="checkout__container">
          <div className="checkout__coupon-toggle">
            <RiCoupon2Line size={25} color="#EAAA85" />
            <span>Have a coupon?</span>
            <span className="show-coupon" onClick={handleToggleCoupon}>
              Click here to enter your code
            </span>
          </div>
          {toggleCoupon && (
            <form className="form__coupon">
              <p>If you have a coupon code, please apply it below.</p>
              <div className="coupon__container">
                <input
                  type="text"
                  className="coupon__input"
                  placeholder="Coupon code..."
                />
                <div className="coupon__btn">Apply Coupon</div>
              </div>
            </form>
          )}
          <div className="detail__container">
            <div className="detail__container-left">
              <h3 className="detail__form-title">Billing details</h3>
              <form className="detail__form">
                <div className="input__fullname">
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    className="input__firstname input__item"
                    inputProps={{ style: { fontSize: 16 } }}
                    InputLabelProps={{ style: { fontSize: 16 } }}
                    name="fName"
                    value={infoUser.firstName}
                    onChange={handleChangeInfo}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Last name"
                    variant="outlined"
                    className="input__lastname input__item"
                    inputProps={{ style: { fontSize: 16 } }}
                    InputLabelProps={{ style: { fontSize: 16 } }}
                    name="lName"
                    value={infoUser.lastName}
                    onChange={handleChangeInfo}
                  />
                </div>
                <TextField
                  id="outlined-select-country"
                  select
                  name="country"
                  // value={infoUser.country}
                  label="Select Country"
                  onChange={handleChange}
                  className="input__country input__item"
                  inputProps={{ style: { fontSize: 16 } }}
                  InputLabelProps={{ style: { fontSize: 16 } }}
                >
                  {Object.entries(country).map((state, index) => {
                    return (
                      <MenuItem key={index} value={state[1].code}>
                        {state[1].name}
                      </MenuItem>
                    );
                  })}
                </TextField>
                <TextField
                  id="outlined-select-states"
                  select
                  label="Select States"
                  className="input__states input__item"
                  inputProps={{ style: { fontSize: 16 } }}
                  InputLabelProps={{ style: { fontSize: 16 } }}
                  name="state"
                  // value={infoUser.state}
                  onChange={handleChange}
                >
                  {stateData.map((state, index) => {
                    return (
                      <MenuItem key={index} value={state.code}>
                        {state.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
                <TextField
                  id="outlined-basic"
                  label="Street name"
                  variant="outlined"
                  className="input__street input__item"
                  inputProps={{ style: { fontSize: 16 } }}
                  InputLabelProps={{ style: { fontSize: 16 } }}
                  name="street"
                  value={infoUser.street}
                  onChange={handleChangeInfo}
                />
                <TextField
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  className="input__phone input__item"
                  inputProps={{ style: { fontSize: 16 } }}
                  InputLabelProps={{ style: { fontSize: 16 } }}
                  name="phone"
                  value={infoUser.phone}
                  onChange={handleChangeInfo}
                />
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  className="input__email input__item"
                  type="email"
                  inputProps={{ style: { fontSize: 16 } }}
                  InputLabelProps={{ style: { fontSize: 16 } }}
                  name="email"
                  value={infoUser.email}
                  onChange={handleChangeInfo}
                />
              </form>
              <h3 className="detail__form-title heading__margin">
                Additional information
              </h3>
              <textarea
                cols="30"
                rows="5"
                className="input__notes"
                placeholder="Order notes..."
                name="notes"
              ></textarea>
            </div>
            <div className="detail__container-right">
              <h3 className="detail__form-title">Your order</h3>
              <div className="list__order">
                <div className="product__cart">
                  <img
                    src="https://g2h4v2c9.stackpathcdn.com/themes/cosmecos-new/wp-content/uploads/2021/01/img_1-3-150x150.jpg"
                    className="product__cart-img"
                    alt=""
                  />
                  <div className="product__cart-title">
                    <h3 className="cart__title-name">Basic Foundation</h3>
                    <span className="cart__title-price">$15.00 × 1</span>
                  </div>
                  <div className="btn__cart-delete">
                    <GrClose size={20} />
                  </div>
                </div>
                <div className="product__cart">
                  <img
                    src="https://g2h4v2c9.stackpathcdn.com/themes/cosmecos-new/wp-content/uploads/2021/01/img_1-3-150x150.jpg"
                    className="product__cart-img"
                    alt=""
                  />
                  <div className="product__cart-title">
                    <h3 className="cart__title-name">Basic Foundation</h3>
                    <span className="cart__title-price">$15.00 × 1</span>
                  </div>
                  <div className="btn__cart-delete">
                    <GrClose size={20} />
                  </div>
                </div>
                <div className="product__cart">
                  <img
                    src="https://g2h4v2c9.stackpathcdn.com/themes/cosmecos-new/wp-content/uploads/2021/01/img_1-3-150x150.jpg"
                    className="product__cart-img"
                    alt=""
                  />
                  <div className="product__cart-title">
                    <h3 className="cart__title-name">Basic Foundation</h3>
                    <span className="cart__title-price">$15.00 × 1</span>
                  </div>
                  <div className="btn__cart-delete">
                    <GrClose size={20} />
                  </div>
                </div>
              </div>
              <h3 className="detail__form-title heading__margin">
                Cart Totals
              </h3>
              <div className="detail__total">
                <div className="total__title">
                  <span>Subtotal</span>
                  <span>Total</span>
                </div>
                <div className="total__price">
                  <span>$30.00</span>
                  <span>$30.00</span>
                </div>
              </div>
              <h3 className="detail__form-title heading__margin">
                Payment Method
              </h3>
              <div className="detail__payment-noti">
                <span>
                  Sorry, it seems that there are no available payment methods
                  for your state. Please contact us if you require assistance or
                  wish to make alternate arrangements.
                </span>
              </div>
              <span>
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our privacy policy.
              </span>
              <label htmlFor="terms" className="terms">
                <input type="checkbox" id="terms" />
                <span id="terms">
                  I have read and agree to the website terms and conditions *
                </span>
              </label>
              <div className="detail__order-btn" onClick={handleSubmit}>
                Place Order
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
