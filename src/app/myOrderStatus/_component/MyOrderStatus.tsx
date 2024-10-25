"use client";
import { useEffect, useState } from "react";

interface User {
  id: string;
  role: "admin" | "volunteer" | "donator";
  email: string;
  name: string;
}

interface FormSubmission {
  foodName: string;
  location: string;
  message: string;
  status: string;
  email: string;
}

const MyOrderStatus = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userone, setUserone] = useState<User | null>(null);
  const [orders, setOrders] = useState<FormSubmission[]>([]);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/checkUser");
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
      }
    };

    fetchUser();
  }, []);

  // Fetch user details based on user ID
  useEffect(() => {
    const fetchUserone = async () => {
      try {
        if (user && user.id) {
          const res = await fetch(`/api/users/${user.id}`);
          const data = await res.json();
          if (data) {
            setUserone(data);
          }
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUserone();
  }, [user]);

  // Fetch orders based on user's email
  useEffect(() => {
    const fetchOrders = async () => {
      if (userone?.email) {
        try {
          const res = await fetch("/api/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: userone.email }),
          });

          const data = await res.json();
          if (Array.isArray(data)) {
            setOrders(data);
          } else {
            console.error("Error fetching orders:", data.error);
          }
        } catch (err) {
          console.error("Failed to fetch orders:", err);
        }
      }
    };

    fetchOrders();
  }, [userone?.email]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 md:mt-12">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order.foodName}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {order.foodName}
              </h3>
              <p className="font-bold">
                Location: <span className="font-normal">{order.location}</span>
              </p>
              <p className="font-bold">
                Status:{" "}
                <span
                  className={`font-normal ${
                    order.status === "accepted"
                      ? "text-green-500"
                      : order.status === "pending"
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {order.status}
                </span>
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default MyOrderStatus;
