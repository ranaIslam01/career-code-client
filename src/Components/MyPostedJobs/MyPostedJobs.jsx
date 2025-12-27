import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const MyPostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // সার্ভার থেকে ডাটা নিয়ে আসার জন্য useEffect
  useEffect(() => {
    fetch("http://localhost:3000/job-post") // আপনার ব্যাকএন্ডের সঠিক URL দিন
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

  if (loading) {
    return <div className="text-center py-20 text-xl font-semibold">লোড হচ্ছে...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">আমার পোস্ট করা চাকরিগুলো</h1>
          <p className="text-gray-600 mt-2">মোট {jobs.length}টি চাকরি খুঁজে পাওয়া গেছে</p>
        </div>

        {/* Jobs Table */}
        <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-6 py-4 font-semibold">চাকরির পদবী</th>
                <th className="px-6 py-4 font-semibold">কোম্পানি</th>
                <th className="px-6 py-4 font-semibold">ধরন</th>
                <th className="px-6 py-4 font-semibold">লোকেশন</th>
                <th className="px-6 py-4 font-semibold">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job._id || job.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{job.title}</div>
                      <div className="text-xs text-gray-500">{job.category}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{job.company}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        job.jobType === 'Full-time' ? 'bg-green-100 text-green-700' : 
                        job.jobType === 'Remote' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {job.jobType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{job.location}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <Link to={`/edit-job/${job._id}`} className="text-blue-600 hover:underline">এডিট</Link>
                        <button className="text-red-500 hover:underline text-sm font-medium">ডিলিট</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                    আপনি এখনও কোনো চাকরি পোস্ট করেননি।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyPostedJobs;