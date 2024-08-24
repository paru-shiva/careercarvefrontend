import { useState, useEffect } from "react";
import "./index.css";

const ShoppingBag = ({ sessionType, user }) => {
  const [amount, changeAmount] = useState(0);
  const [userMsg, changUserMsg] = useState("");

  useEffect(() => {
    if (sessionType === "00:30:00") {
      changeAmount(2000);
    } else if (sessionType === "00:45:00") {
      changeAmount(3000);
    } else if (sessionType === "00:60:00") {
      changeAmount(4000);
    }
  }, [sessionType]);

  const onProceedClick = async () => {
    console.log("clicked");

    const sessionToSend = sessionType === "00:60:00" ? "01:00:00" : sessionType;

    const data = { mentor: user, session: sessionToSend };
    console.log(sessionType);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Convert data to JSON string
    };
    const response = await fetch("http://localhost:3000/set-mentor", options);
    const result = await response.json();
    changUserMsg(result.msg);
    console.log(result);
  };

  return (
    <div className="shoppingBagComponent">
      <h3 className="bookingTitle">Your Shopping Bag</h3>
      <div className="bookingDetails">
        <div className="billing">
          <p className="item">Campus To Corporate 1x1 (1 Item) : </p>
          <p className="item item-amount">{amount}</p>
        </div>
        <div className="billing">
          <p className="item">Premium Charges : </p>
          <p className="item item-amount">{0}</p>
        </div>
        <div className="billing">
          <p className="item">GST 18% : </p>
          <p className="item item-amount">{(18 / 100) * amount}</p>
        </div>
        <hr />
        <div className="billing">
          <p className="item grandTotal">Grand Total : </p>
          <p className="item item-amount grandTotal">
            {amount + (18 / 100) * amount}
          </p>
        </div>
        <button className="checkoutBtn" onClick={onProceedClick}>
          Proceed To Checkout
        </button>
        <p className="mentorAlert">{userMsg}</p>
      </div>
    </div>
  );
};

export default ShoppingBag;
