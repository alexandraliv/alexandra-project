import {
  useState,
  createContext,
  useEffect,
  useProvider,
  useContext,
} from "react";
import { client } from "../client";
import { toast } from "react-hot-toast";

export const Context = createContext("");

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user")) ?? null
  );
  const [isLoading, setIsLoading] = useState(
    JSON.parse(window.localStorage.getItem("user")) ?? false
  );
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  let foundProduct;
  let index;

  useEffect(() => {
    if (products.length === 0) {
      setLoading(true);
      client
        .fetch(
          `*[_type == "product"] {
            name,
            image,
            id,
            description,
            price,
            quantity
        }`
        )
        .then((data) => {
          console.log(data);
          setProducts(data);
          setLoading(false);
        });
    }
  }, []);

  const onAdd = (product) => {
    setShowAlert(true);
    const checkProductInCart = cartItems.find(
      (item) => item?.id === product.id
    );
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct.id === product.id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
            cartQuantity: cartProduct.cartQuantity + 1,
          };
        } else {
          return { ...cartProduct };
        }
      });
      setCartItems(updatedCartItems);
    } else {
      const productCart = { ...product };
      productCart.quantity = productCart.quantity - 1;
      productCart.cartQuantity = 1;
      setCartItems([...cartItems, { ...productCart }]);
    }

    //
    const updatedProducts = products.map((initialProduct) => {
      if (initialProduct.id === product.id) {
        return {
          ...initialProduct,
          quantity: initialProduct.quantity - 1,
        };
      } else {
        return {
          ...initialProduct,
        };
      }
    });
    setProducts(updatedProducts);
    toast.success(`${product.name} added to the cart.`);
  };

  const decreaseQuantity = (id) => {
    foundProduct = cartItems.find((item) => item.id === id);

    if (foundProduct.cartQuantity === 1) {
      onRemove(foundProduct);
    } else {
      foundProduct.cartQuantity = foundProduct.cartQuantity - 1;
      foundProduct.quantity = foundProduct.quantity + 1;

      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct.id === id) {
          return {
            ...foundProduct,
          };
        } else {
          return { ...cartProduct };
        }
      });
      setCartItems(updatedCartItems);

      const updatedProducts = products.map((initialProduct) => {
        if (initialProduct.id === id) {
          return {
            ...foundProduct,
          };
        } else {
          return {
            ...initialProduct,
          };
        }
      });
      setProducts(updatedProducts);

      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
    }

    // toast.success("1 quantity removed");
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item.id === product.id);
    const newCartItems = cartItems.filter((item) => item.id !== product.id);
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.cartQuantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.cartQuantity
    );
    setCartItems(newCartItems);

    const updatedProducts = products.map((initialProduct) => {
      if (initialProduct.id === product.id) {
        return {
          ...foundProduct,
          quantity: initialProduct.quantity + foundProduct.cartQuantity,
          cartQuantity: 0,
        };
      } else {
        return {
          ...initialProduct,
        };
      }
    });
    setProducts(updatedProducts);
  };

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);
    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        isLoading,
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        products,
        isLoading,
        showAlert,
        decreaseQuantity,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        setProducts,
        setIsLoading,
        setShowAlert,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useUserProvider = () => useContext(Context);
