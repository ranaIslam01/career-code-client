import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

const MyPostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://job-portal-server-y6ck.onrender.com/job-post")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এটি ডিলিট করলে আর ফিরে পাবেন না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "হ্যাঁ, ডিলিট করুন!",
      cancelButtonText: "বাতিল",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://job-portal-server-y6ck.onrender.com/job-post/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("ডিলিট হয়েছে!", "সফলভাবে মুছে ফেলা হয়েছে।", "success");
              setJobs(jobs.filter((job) => job._id !== id));
            }
          });
      }else{
        Swal.fire("বাতিল করা হয়েছে", "আপনার ডাটা নিরাপদ আছে।", "info");
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">আমার পোস্ট করা চাকরিগুলো</h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            মোট <span className="text-blue-600 font-bold">{jobs.length}</span>টি চাকরি পাওয়া গেছে
          </p>
        </div>

        {/* Responsive Container */}
        <div className="bg-white shadow-md rounded-2xl border border-gray-100 overflow-hidden">
          
          {/* Horizontal scroll for small devices */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-150 md:min-w-full">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs md:text-sm">
                <tr>
                  <th className="px-4 md:px-6 py-4 font-semibold">চাকরির পদবী</th>
                  <th className="px-4 md:px-6 py-4 font-semibold hidden sm:table-cell">কোম্পানি</th>
                  <th className="px-4 md:px-6 py-4 font-semibold">ধরন</th>
                  <th className="px-4 md:px-6 py-4 font-semibold hidden md:table-cell">লোকেশন</th>
                  <th className="px-4 md:px-6 py-4 font-semibold text-center">অ্যাকশন</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="py-20 text-center">
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-500 text-sm">ডাটা লোড হচ্ছে...</p>
                      </div>
                    </td>
                  </tr>
                ) : jobs.length > 0 ? (
                  jobs.map((job) => (
                    <tr key={job._id} className="hover:bg-blue-50 transition-colors">
                      {/* Job Title & Category */}
                      <td className="px-4 md:px-6 py-4">
                        <div className="font-bold text-gray-800 text-sm md:text-base line-clamp-1">{job.title}</div>
                        <div className="text-[10px] md:text-xs text-gray-500 sm:hidden">{job.company}</div>
                        <div className="text-[10px] md:text-xs text-blue-500 uppercase">{job.category}</div>
                      </td>

                      {/* Company (Hidden on very small screens) */}
                      <td className="px-4 md:px-6 py-4 text-gray-600 text-sm hidden sm:table-cell">
                        {job.company}
                      </td>

                      {/* Job Type Badge */}
                      <td className="px-4 md:px-6 py-4">
                        <span className={`px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-medium whitespace-nowrap ${
                          job.jobType === "Full-time" ? "bg-green-100 text-green-700" :
                          job.jobType === "Remote" ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-700"
                        }`}>
                          {job.jobType}
                        </span>
                      </td>

                      {/* Location (Hidden on tablet/mobile) */}
                      <td className="px-4 md:px-6 py-4 text-gray-600 text-sm hidden md:table-cell">
                        {job.location}
                      </td>

                      {/* Action Buttons */}
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex justify-center items-center gap-2 md:gap-4">
                          <Link
                            to={`/update-job/${job._id}`}
                            className="p-2 md:px-4 md:py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-xs md:text-sm font-semibold"
                          >
                            এডিট
                          </Link>
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="p-2 md:px-4 md:py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all text-xs md:text-sm font-semibold"
                          >
                            ডিলিট
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-16 text-center text-gray-400 text-sm">
                      আপনি এখনও কোনো চাকরি পোস্ট করেননি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPostedJobs;