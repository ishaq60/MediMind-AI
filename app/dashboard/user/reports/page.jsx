"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loading from '../../user/../loading';


const Myreport = () => {
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      toast.error("Please login to view your report.");
      router.push("/login");
    }
  }, [session.status, router]);

  const email = session?.data?.user?.email;

  useEffect(() => {
    if (!email) return;

    const fetchReport = async () => {
      try {
        const res = await fetch(`/api/myreport/${email}`);
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to fetch");
        }
        const data = await res.json();
        setReport(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReport();
  }, [email]);

  if (session.status === "loading") {
    return <Loading />;
  }

  if (error) return <div className="text-red-600 text-center mt-10">Error: {error}</div>;
  if (!report) return <div className="text-gray-600 text-center mt-10"><Loading></Loading></div>;

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="px-4 md:px-6 lg:px-8 py-8 max-w-4xl mx-auto bg-white min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center md:text-left">
        My Health Report
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow text-center"
        >
          Print Report
        </button>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-md p-4 md:p-6 shadow-sm">
        <p className="text-xs md:text-sm text-gray-500 mb-4">
          <strong>Created At:</strong>{" "}
          {new Date(report.createdAt).toLocaleString()}
        </p>
        <p className="whitespace-pre-line text-gray-800 leading-relaxed text-sm md:text-base">
          {report.report}
        </p>
      </div>
    </main>
  );
};

export default Myreport;
