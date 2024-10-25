"use client"; // Use client-side rendering
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

const DonateForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    foodName: "", // Renamed to match API expectations
    foodDescription: "", // Renamed to match API expectations
    image: "",
    quantity: "",
    location: "",
    time: "",
    message: "",
    expiryDate: "", // Already matches the API
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setSuccess("Donation submitted successfully!");
        setFormData({
          foodName: "", // Reset the foodName field
          foodDescription: "", // Reset the foodDescription field
          image: "",
          quantity: "",
          location: "",
          time: "",
          message: "",
          expiryDate: "", // Reset the expiryDate field too
        });
      } else {
        const data = await res.json();
        setError(data.error || "Failed to submit donation.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h4 className="text-2xl font-semibold text-center mb-5">
        Food Submit Form
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="foodName">Food Name</Label> {/* Updated label */}
            <Input
              id="foodName"
              name="foodName" // Updated to match API
              type="text"
              placeholder="Food Name"
              value={formData.foodName} // Updated to match state
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="foodDescription">Food Description</Label>{" "}
            {/* Updated label */}
            <Input
              id="foodDescription"
              name="foodDescription" // Updated to match API
              type="text"
              placeholder="Food Description"
              value={formData.foodDescription} // Updated to match state
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Food Image Link</Label>
            <Input
              id="image"
              name="image"
              type="text"
              placeholder="Image Link"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quantity">Food Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              placeholder="Food Quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Your Location</Label>
            <Input
              id="location"
              name="location"
              type="text"
              placeholder="Your Location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="time">Pickup Time</Label>
            <Input
              id="time"
              name="time"
              type="text"
              placeholder="Explain Pickup Time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              name="expiryDate"
              type="date" // Assuming it's a date field
              placeholder="Expiry Date"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Input
              id="message"
              name="message"
              type="text"
              placeholder="Small Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Your Food"}
          </Button>
        </div>
      </form>
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {success && <p className="text-green-600 mt-4">{success}</p>}
    </div>
  );
};

export default DonateForm;
