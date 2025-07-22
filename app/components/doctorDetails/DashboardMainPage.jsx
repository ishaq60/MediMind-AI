"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import Loading from "../Loading";



const DashboardMainPage = () => {
  const [users, setUsers] = useState(null); // fetched user from DB
  const { data: session, status } = useSession();
  const router = useRouter();

  // Fetch user by email from API
  useEffect(() => {
    if (status !== "authenticated") return; // Wait for login

    const email = session?.user?.email;
    if (!email) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/${email}`);
        const data = await res.json();
        setUsers(data);
      
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUser();
  }, [session, status]);
console.log(session)
  // Redirect based on user type
  useEffect(() => {
    if (status === "loading" || !users);  

    if (!session) {
      router.push("/dashboard/user");
    } else if (users?.type === "admin") {
      router.push("/dashboard/admin");
    } else if (users?.type === "user") {
      router.push("/dashboard/user");
    } else if (users?.type === "doctor") {
      router.push("/dashboard/doctor");
    }
  }, [session, status, router, users]);

  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center justify-center p-4">
      {users ? (
      <Loading></Loading>
      ) : (
        <>
      
          <Loading />
        </>
      )}
    </div>
  );
};

export default DashboardMainPage;
