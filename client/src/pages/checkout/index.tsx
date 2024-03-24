import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

import "./styles.css";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IProduct } from "../../models/interfaces";

export const CheckoutPage = () => {
  const { getCartItemCount, getTotalCartAmount } =
    useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const { products } = useGetProducts();

  const navigate = useNavigate();

  // Your Stripe public key (use your test key for development)
  const stripePromise = loadStripe(
    "pk_test_51OxvTnBzlU4s2baHZqYo4LSXh0SDzMZbDNVJFOOGxe9HMy3LH1CdUbbDOzIj4BgSfwGvI4Cksh0lhyRFA7pB7Iy000iumvfjuA"
  );
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch('http://localhost:3001/payment/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: products.filter(product => getCartItemCount(product._id) !== 0).map(product => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.productName, 
            },
            unit_amount: Math.round(product.price * 100), // Ensures price is in cents
          },
          quantity: getCartItemCount(product._id),
        })),
        userID: localStorage.getItem("userID"),
      }),
    });
  
    const session = await response.json();
  
    if (session.id) {
      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
  
      if (result.error) {
        // Handle any errors that occur during the redirect
        alert(result.error.message);
      }
    } else {
      console.error('Session ID not received', session);
      alert('There was an error processing your payment. Please try again.');
    }
  };
  
  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {products.map((product: IProduct) => {
          if (getCartItemCount(product._id) !== 0) {
            return <CartItem data={product} />;
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: ${totalAmount} </p>
          <button onClick={() => navigate("/")}> Continue Shopping </button>
          <button onClick={handleCheckout}> Checkout </button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};
