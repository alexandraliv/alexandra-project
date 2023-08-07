import React from "react";
import { useUserProvider } from "../store/Context";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { urlFor } from "../client";

/**
 * @author
 * @function Cart
 **/

export const Cart = (props) => {
  const {
    cartItems,
    totalPrice,
    totalQuantities,
    onAdd,
    decreaseQuantity,
    setShowCart,
    onRemove,
    setTotalQuantities,
  } = useUserProvider();

  const handleCheckout = async (props) => {};

  const navigate = useNavigate();

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link to="/products">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item.id}>
                <img src={urlFor(item?.image)} className="cart-product-image" />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>€{item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() => {
                            // toggleCartItemQuanitity(item._id, "dec")
                            decreaseQuantity(item.id);
                          }}
                        >
                          <AiOutlineMinus />
                        </span>
                      </p>
                      <span className="num">{item.cartQuantity}</span>
                      <p className="quantity-desc">
                        <span
                          className="plus"
                          onClick={() =>
                            //toggleCartItemQuanitity(item._id, "inc")
                            onAdd(item)
                          }
                          disabled={item.quantity === 0}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => {
                        onRemove(item);
                        if (cartItems.length === 1) {
                          setTotalQuantities(0);
                        }
                      }}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>€{totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button
                type="button"
                className="btn"
                onClick={() => navigate("/form")}
              >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
