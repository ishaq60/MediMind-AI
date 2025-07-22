"use client";

import React, { useEffect, useState } from "react";

const Page = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const data = await getDoctor();
      if (data) {
        console.log("✅ Doctors fetched:", data);
        setDoctors(data); // no `.res`
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div>
      <h1>Doctors List</h1>
      <ul>
        {doctors.map((doc, index) => (
          <li key={index}>{doc.name}</li>
        ))}
      </ul>
    </div>
  );
};
const port = process.env.NEXT_PUBLIC_API_PORT || 3000;
const getDoctor = async () => {
  try {
  const res = await fetch(`http://localhost:${port}/services/api/get-all`);
    if (!res.ok) throw new Error("Failed to fetch");
    const doc = await res.json(); // Could be array
    return doc;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
};

export default Page;
