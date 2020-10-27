import React, { useEffect, useState } from "react";
import "./Orders.css";
import db from "./firebase";
import { useSelector } from "react-redux";
import { selectUser } from "./features/amazon/userSlice";
import Order from "./Order";

function Orders() {
  const [orders, setOrders] = useState([]);

  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>your Orders</h1>
      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
