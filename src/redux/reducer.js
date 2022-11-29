const initState = {
  user: {
    infoUser: {},
  },
  quantityCart: [],
  isAddToCart: false,
  totalProducts: 0,
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "user/checkUser":
      return {
        ...state,
        user: {
          infoUser: action.payload,
        },
      };
    case "quantityCart/checkQuantity":
      let currentCart = state.quantityCart;
      let productCart = currentCart;
      const newCart = action.payload;
      if (Array.isArray(newCart)) {
        productCart = newCart;
      } else {
        if (productCart.length > 0) {
          const indexCart = productCart.findIndex((currentProduct) => {
            return currentProduct._id === newCart._id;
          });
          if (indexCart === -1) {
            productCart = [...productCart, newCart];
          } else {
            productCart[indexCart].quantity += newCart.quantity;
          }
        } else {
          productCart = [newCart];
        }
      }
      return {
        ...state,
        quantityCart: productCart,
      };
    case "isAddToCart/checkIsAddToCart":
      return {
        ...state,
        isAddToCart: action.payload,
      };
    case "increaseProduct/checkIncreaseProduct":
      return {
        ...state,
        quantityCart: state.quantityCart.map((item) => {
          if (item._id === action.payload) {
            item.quantity += 1;
          }
          return item;
        }),
      };
    case "decreaseProduct/checkDecreaseProduct":
      return {
        ...state,
        quantityCart: state.quantityCart.map((item) => {
          if (item._id === action.payload) {
            item.quantity -= 1;
          }
          return item;
        }),
      };
    case "totalProducts/checkTotalProducts":
      let total = 0;
      action.payload.map((product) => {
        return (total += product.price * product.quantity);
      });
      return {
        ...state,
        totalProducts: total,
      };
    default:
      return state;
  }
};
export default rootReducer;
