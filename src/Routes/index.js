import Home from "../pages/Home";
import Style from "../pages/Style";
import Contact from "../pages/Contact";
import Men from "../pages/Men";
import Women from "../pages/Women";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProductPage from "../pages/ProductPage";
import ViewCart from "../pages/ViewCart";
import Checkout from "../pages/Checkout";
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/style", component: Style },
  { path: "/contact", component: Contact },
  { path: "/style/men", component: Men },
  { path: "/style/women", component: Women },
  { path: "/register", component: Register, layout: null },
  { path: "/login", component: Login, layout: null },
  { path: "/products/:id", component: ProductPage },
  { path: "/carts", component: ViewCart },
  { path: "/checkout", component: Checkout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
