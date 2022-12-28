import { BsHeart } from "react-icons/bs";
import { useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { checkIsAddToCart, checkQuantity } from "../../redux/actions";
import AddToCard from "../../ultis/AddCardToLocal";
import LoadingSkeleton from "./Loading/LoadingSkeleton";
import "./product.scss";
const Product = (props) => {
  const { img, name, price, productId, width } = props;
  const dispatch = useDispatch();
  const handleAddToCart = (e, productId) => {
    e.preventDefault();
    const newCart = {
      _id: productId,
      quantity: 1,
    };
    dispatch(checkQuantity(newCart));
    AddToCard(newCart, 1); // Save Product on LocalStorage
    dispatch(checkIsAddToCart(true));
  };
  return (
    <Link
      to={`/products/${productId}`}
      data-value={productId}
      className="product__item"
      style={{ width: width }}
    >
      <img src={img} alt="" className="product__img" />

      <div className="product__item-sale">Sale</div>
      <div className="product__item-heart">
        <BsHeart size={25} color="red" />
      </div>

      <div className="product__name">{name}</div>

      <div className="product__btns">
        <div
          className="btn__add product__btns-item"
          onClick={(e) => handleAddToCart(e, productId)}
        >
          Add to cart
        </div>
        <div className="product__price product__btns-item">{price} VND</div>
      </div>
    </Link>
  );
};
const Loading = ({ width }) => {
  return (
    <div className="product" style={{ width }}>
      <LoadingSkeleton height="250px" />
      <LoadingSkeleton width="80%" height="20px" />
      <LoadingSkeleton height="60px" />
    </div>
  );
};
Product.Loading = Loading;
export default Product;
