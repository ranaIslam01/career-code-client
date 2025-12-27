import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';

const UpdatePostJob = () => {
  const job = useLoaderData(); // রাউট থেকে নির্দিষ্ট জবের ডেটা লোড করা হয়েছে
  console.log(job);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: job.title,
    company: job.company,
    category: job.category,
    jobType: job.jobType,
    salary: job.salary,
    location: job.location,
    description: job.description
  });

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`https://job-portal-server-y6ck.onrender.com/job-post/${job._id}`, formData);
      
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'আপডেট সফল!',
          text: 'চাকরির তথ্য সফলভাবে পরিবর্তন করা হয়েছে।',
          timer: 1500
        });
        navigate('/my-posted-jobs'); // আপনার লিস্ট পেজে ফেরত যাবে
      }
    } catch (error) {
      Swal.fire('ভুল হয়েছে', 'সার্ভারে সমস্যা হয়েছে', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 ">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">চাকরির তথ্য পরিবর্তন করুন</h1>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 text-gray-900">
          <form onSubmit={handleUpdate} className="space-y-6 ">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">চাকরির পদবী *</label>
              <input 
                type="text" name="title" required
                defaultValue={job.title}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">কোম্পানি *</label>
                <input 
                  type="text" name="company" required
                  defaultValue={job.company}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">ক্যাটাগরি</label>
                <select 
                  name="category" defaultValue={job.category}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-white"
                  onChange={handleChange}
                >
                  <option value="software">Software Development</option>
                  <option value="marketing">Marketing</option>
                  <option value="design">Graphic Design</option>
                </select>
              </div>
            </div>

            {/* Salary & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">বেতন সীমা</label>
                <input 
                  type="text" name="salary" defaultValue={job.salary}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">লোকেশন</label>
                <input 
                  type="text" name="location" defaultValue={job.location}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">বিস্তারিত বিবরণ *</label>
              <textarea 
                name="description" rows="5" required
                defaultValue={job.description}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none resize-none"
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all">
              পরিবর্তনগুলো সেভ করুন
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePostJob;