"use client";

import React, { useEffect, useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const getDoctor = async () => {
  try {
    const res = await fetch(`${baseUrl}/services/api/get-all`);
    if (!res.ok) throw new Error("Failed to fetch");
    const json = await res.json();
    return json.res || []; // ✅ safe
  } catch (err) {
    console.error("Fetch error:", err);
    return []; // fallback
  }
};

const Page = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const doctorsList = await getDoctor();
      setDoctors(doctorsList);
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

export default Page;
