import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useSelector } from "react-redux";
import { selectBasket } from "./features/amazon/basketSlice";
import { getBasketTotal } from "./utilityFunctions";
import { useHistory } from 'react-router-dom';

function Subtotal() {
  const { basket } = useSelector(selectBasket);

  const history = useHistory()

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
      <button onClick={(e) => history.push("/payment")}>
        Procedd to checkout
      </button>
    </div>
  );
}

export default Subtotal;
