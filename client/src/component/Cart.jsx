import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const getCartitems = JSON.parse(localStorage.getItem("cart"));

    if (getCartitems) {
      setCartItems(getCartitems);
    }
    return () => {
      setCartItems(null);
    };
  }, []);

  console.log(cartItems);

  return (
    <div className="cart">
      <h1>My Cart</h1>
      {cartItems.length > 0
        ? cartItems.map((item, index) => {
            return (
              <div className="cart-body mx-3" key={index}>
                <div className="product-image mx-2 rounded d-flex align-items-center">
                  <img
                    src={item.productImage}
                    alt=""
                    className="img-fluid"
                    style={{ width: "80px" }}
                  />
                  <div className="product-name mx-3">{item.productName}</div>
                </div>
                <div className="product-price">
                  {" "}
                  Price to pay : {item.productPrice}
                  {/* <div className="d-flex justify-content-evenly">
                    Quantity :
                    <span>
                      <span className="mx-1" style={{ cursor: "pointer" }}>
                        &#10133;
                      </span>{" "}
                      <span style={{ cursor: "pointer" }}>&#10134;</span>
                    </span>
                  </div> */}
                </div>
              </div>
            );
          })
        : "Nothing in cart"}

      <div
        className="buy-now btn btn-primary"
        onClick={() => alert(`You buy a item.`)}
      >
        Buy
      </div>
    </div>
  );
};

export default Cart;
