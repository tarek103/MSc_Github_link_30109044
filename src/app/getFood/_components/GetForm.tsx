"use client";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useEffect, useState } from "react";
import Iframe from "react-iframe";

interface GetFormProps {
  id: string;
}

interface FoodData {
  foodName: string;
  location: string;
  message: string;
}

interface User {
  id: string;
  role: "admin" | "volunteer" | "donator";
  email: string;
  name: string;
}

const GetForm: React.FC<GetFormProps> = ({ id }) => {
  const [foodData, setFoodData] = useState<FoodData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userone, setUserone] = useState<User | null>(null);
  const [location, setLocation] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>(""); // State for success message
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false); // State to disable button

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

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await fetch(`/api/food/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch food data");
        }
        const data = await response.json();
        setFoodData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      foodName: foodData?.foodName,
      email: userone?.email,
      name: userone?.name,
      location,
      message,
    };

    try {
      const response = await fetch("/api/formSubmit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form");
      }

      // Set success message and disable the button
      setSuccessMessage("Form submitted successfully.");
      setIsButtonDisabled(true);
      setLocation(""); // Clear form inputs
      setMessage("");
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setSuccessMessage(error.message);
    }
  };

  return (
    <div>
      <h4 className="text-2xl font-semibold text-center mb-5">Get Food Form</h4>
      <p className="mb-1">
        <strong>Food Name:</strong> {foodData?.foodName}
      </p>
      <p className="mb-1">
        <strong>Email:</strong> {userone?.email}
      </p>
      <p className="mb-5">
        <strong>Name:</strong> {userone?.name}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="location">Your Location</Label>
            <Input
              id="location"
              name="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Your Location"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Input
              id="message"
              name="message"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Small Message"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isButtonDisabled}>
            Get Your Food
          </Button>
        </div>
      </form>
      {successMessage && (
        <p className="mt-4 text-green-500 text-center">{successMessage}</p>
      )}
      <div className="mt-8">
        <Iframe
          url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9582217.99417279!2d-15.01790064155069!3d54.101958602090086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x25a3b1142c791a9%3A0xc4f8a0433288257a!2sUnited%20Kingdom!5e0!3m2!1sen!2sbd!4v1725807601893!5m2!1sen!2sbd"
          width="100%"
          height="320px"
          id=""
          className=""
          display="block"
          position="relative"
        />
      </div>
    </div>
  );
};

export default GetForm;
