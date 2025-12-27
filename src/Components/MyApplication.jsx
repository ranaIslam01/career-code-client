import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext/AuthContext";

const MyApplications = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/job-applications?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setApplications(data));
    }
  }, [user?.email]);

  return (
    <div className="max-w-5xl mx-auto my-12 p-4 ">
      <h2 className="text-3xl font-bold mb-6 text-center">আমার আবেদনসমূহ ({applications.length})</h2>
      
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4">কোম্পানি</th>
              <th>জব টাইটেল</th>
              <th>আবেদনের তারিখ</th>
              <th>লিঙ্কসমূহ</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold text-gray-900">{app.company}</td>
                <td className="text-blue-600">{app.job_title}</td>
                <td className="text-gray-900">{app.applied_date}</td>
                <td>
                  <div className="flex gap-3 text-gray-900">
                    <a href={app.github_url} target="_blank" className="btn btn-xs btn-outline">GitHub</a>
                    <a href={app.resume_url} target="_blank" className="btn btn-xs btn-primary">Resume</a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {applications.length === 0 && (
          <p className="text-center py-10 text-gray-500">আপনি এখনো কোনো জবে আবেদন করেননি।</p>
        )}
      </div>
    </div>
  );
};

export default MyApplications;