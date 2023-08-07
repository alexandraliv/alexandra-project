import { useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
// import { useStateContext } from "../context/StateContext";

const runFirework = () => {};

function Success() {
  // const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    // setCartItems([]);
    // setTotalPrice(0);
    // setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order</h2>
        <p className="email-msg">Check your email for the receipt</p>
        <Link to="/">
          <button width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

export const runFireworks = () => {
  var duration = 5 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
};

export default Success;
