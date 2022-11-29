import { Link, NavLink } from "react-router-dom";
import "./navbar.scss";
import { BsHeart, BsHandbag, BsSearch } from "react-icons/bs";
import { FaBuromobelexperte } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { useEffect, useState } from "react";
import { activeStyle, slideUpStyle, slideDownStyle } from "../TransformStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  checkQuantitySelector,
  checkTotalProductsSelector,
  checkUserSelector,
} from "../../redux/selector";
import axios from "axios";
import { deleteCart } from "../../ultis/DeleteCart";
import { checkQuantity, checkTotalProducts } from "../../redux/actions";
import { emptyCart } from "../../assets/images";
const Navbar = () => {
  const [modalSearch, setModalSearch] = useState(false);
  const dispatch = useDispatch();
  const showModalSearch = () => {
    setModalSearch(true);
  };

  const hideModalSearch = () => {
    setModalSearch(false);
  };
  //Get currentUser in Store Redux
  const user = useSelector(checkUserSelector);
  const [currentUser, setCurrentUser] = useState(user);
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  //Get quantityCart from Store in Redux
  const productsCart = useSelector(checkQuantitySelector);
  // const productLocal = JSON.parse(localStorage.getItem("carts"));
  const [quantityCart, setQuantityCart] = useState(1);
  useEffect(() => {
    setQuantityCart(productsCart.length);
  }, [productsCart]);
  //Get info products cart
  const [infoProducts, setInfoProducts] = useState([]);

  useEffect(() => {
    const getInfoProducts = async () => {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/api/v1/products",
        data: productsCart,
        headers: { "Content-Type": "application/json" },
      });
      setInfoProducts(response.data.data);
    };
    getInfoProducts();
  }, [productsCart]);
  //Delete cart in LocalStorage
  const handleDeleteCart = (e) => {
    const productId = e.currentTarget.dataset.id;
    dispatch(checkQuantity(deleteCart(productId)));
  };

  const totalProduct = useSelector(checkTotalProductsSelector);
  useEffect(() => {
    dispatch(checkTotalProducts(infoProducts));
  }, [infoProducts]);
  return (
    <div className="navbar">
      <div className="burger">
        <FaBuromobelexperte size={25} />
      </div>
      <div className="navbar__list">
        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/"
          className="navbar__list-item"
        >
          Home
        </NavLink>

        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/style"
          className="navbar__list-item"
        >
          <div className="sub__menu">
            <Link to="/style/men" className="sub__menu-item">
              <span></span>Men
            </Link>
            <Link to="/style/women" className="sub__menu-item">
              <span></span>Women
            </Link>
          </div>
          Style
        </NavLink>
        <NavLink to="/" className="navbar__list-item logo">
          VA Perfume.
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to="/contact"
          className="navbar__list-item"
        >
          Contact
        </NavLink>
      </div>
      <div className="list__btn">
        <BsHeart size={25} className="btn__item" />
        <div className="btn__bag">
          <BsHandbag size={25} className="btn__item" />
          <span className="number__bag">{quantityCart}</span>
          <div className="modal__bag">
            <div className="list__product-cart">
              {infoProducts.length > 0 ? (
                infoProducts.map((product, index) => (
                  <div className="product__cart" key={index}>
                    <img
                      src={product.url}
                      className="product__cart-img"
                      alt=""
                    />
                    <div className="product__cart-title">
                      <h3 className="cart__title-name">{product.name}</h3>
                      <p className="cart__title-price">
                        {product.quantity} x {product.price} VND
                      </p>
                    </div>
                    <div
                      className="btn__cart-delete"
                      onClick={handleDeleteCart}
                      data-id={product._id}
                    >
                      <GrClose size={20} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="cart__message">
                  <img src={emptyCart} alt="" />
                </div>
              )}
            </div>
            {infoProducts.length > 0 && (
              <div className="product__cart-total">
                <h3 className="product__cart-ammount">
                  Subtotal :{totalProduct}
                </h3>
                <div className="product__cart-btns">
                  <Link to="/carts" className="cart__btn-view">
                    View Cart
                  </Link>
                  <Link to="/checkout" className="cart__btn-checkout">
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        {Object.keys(currentUser.infoUser).length === 0 ? (
          <div className="btn__login">
            <NavLink to="/login" className="btn__login-link">
              Đăng Nhập
            </NavLink>
          </div>
        ) : (
          <div className="info__user">
            <span className="info__user-name">
              Hello, {currentUser.infoUser.name}!
            </span>
          </div>
        )}
        <div className="btn__search">
          <BsSearch size={25} className="btn__item" onClick={showModalSearch} />
        </div>
      </div>
      {
        <div
          className="modal__search"
          style={modalSearch ? slideUpStyle : slideDownStyle}
        >
          <BsSearch size={25} className="modal__search-btn" />
          <input type="text" placeholder="Type Your Search..." />
          <GrClose
            size={25}
            className="modal__search-btn"
            onClick={hideModalSearch}
          />
        </div>
      }
      {modalSearch && <div className="overlay" onClick={hideModalSearch}></div>}
    </div>
  );
};

export default Navbar;
