"use client";
import { useEffect, useState } from "react";

interface FormSubmission {
  _id: string;
  foodName: string;
  location: string;
  message: string;
  status: string;
}

const AcceptRecquestTable = () => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);

  // Fetch form submissions from the API when the component mounts
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch("/api/submissions");
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        console.error("Failed to fetch submissions", error);
      }
    };

    fetchSubmissions();
  }, []);

  // Handle accept request button click
  const handleAcceptRequest = async (id: string) => {
    try {
      const response = await fetch("/api/submissions", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update local state to reflect the status change
        setSubmissions((prevSubmissions) =>
          prevSubmissions.map((submission) =>
            submission._id === id
              ? { ...submission, status: "accepted" }
              : submission
          )
        );
      } else {
        alert(data.error || "Failed to accept request");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Food Name
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission._id} className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {submission.foodName}
                </th>
                <td className="px-6 py-4">{submission.location}</td>
                <td className="px-6 py-4">{submission.message}</td>
                <td className="px-6 py-4">
                  {submission.status === "pending" ? (
                    <button
                      className="bg-slate-100 px-2 py-1 rounded"
                      onClick={() => handleAcceptRequest(submission._id)}
                    >
                      Accept Request
                    </button>
                  ) : (
                    <span className="text-green-500">Accepted</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcceptRecquestTable;
