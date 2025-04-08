// not production ready
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function DonorPage() {
  const { id } = useParams(); // Get donor ID from URL
  const [donor, setDonor] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) fetchDonor();
  }, [id]);

  async function fetchDonor() {
    try {
      const res = await axios.get(`/api/donator/${id}`);
      setDonor(res.data);
    } catch (error) {
      setMessage("Error fetching donor details.");
    }
  }

  if (!donor) return <p>Loading donor details...</p>;

  return (
    <div>
      <h1>Donor Dashboard</h1>
      {message && <p>{message}</p>}
      <p><strong>Name:</strong> {donor.name}</p>
      <p><strong>Blood Type:</strong> {donor.bloodType}</p>
      <p><strong>Contact:</strong> {donor.contact}</p>
      <p><strong>Location:</strong> {donor.location}</p>
      <p><strong>Donation Date:</strong> {new Date(donor.donatedAt).toLocaleDateString()}</p>
      <p><strong>Is Provided:</strong> {donor.isProvided ? "Yes" : "No"}</p>
    </div>
  );
}
