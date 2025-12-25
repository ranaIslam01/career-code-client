import React from 'react';
import { useNavigate } from 'react-router';
import { Lightbulb, Target, Briefcase, TrendingUp, ArrowLeft, CheckCircle } from 'lucide-react';

const SalaryTips = () => {
  const navigate = useNavigate();

  const tips = [
    {
      id: 1,
      title: "মার্কেট রিসার্চ করুন",
      desc: "ইন্টারভিউতে যাওয়ার আগে বাজার দর সম্পর্কে জানুন। গ্লাসডোর বা লিংকডইন আপনার ভালো বন্ধু হতে পারে।",
      icon: <Target className="text-blue-600" size={28} />,
      color: "bg-blue-50"
    },
    {
      id: 2,
      title: "রেঞ্জ বা সীমা উল্লেখ করুন",
      desc: "নির্দিষ্ট একটি সংখ্যার পরিবর্তে একটি স্যালারি রেঞ্জ বলুন। এতে কোম্পানির সাথে আলোচনার সুযোগ থাকে।",
      icon: <TrendingUp className="text-green-600" size={28} />,
      color: "bg-green-50"
    },
    {
      id: 3,
      title: "নিজের ভ্যালু তুলে ধরুন",
      desc: "আপনার দক্ষতা এবং পূর্বের কাজের সাফল্য কীভাবে কোম্পানির জন্য লাভজনক হবে তা স্পষ্টভাবে বোঝান।",
      icon: <Briefcase className="text-purple-600" size={28} />,
      color: "bg-purple-50"
    },
    {
      id: 4,
      title: "অন্যান্য সুযোগ-সুবিধা",
      desc: "বেতন ছাড়াও বোনাস, হেলথ ইনস্যুরেন্স এবং ফ্লেক্সিবল ওয়ার্কিং আওয়ার নিয়ে গুরুত্ব সহকারে কথা বলুন।",
      icon: <Lightbulb className="text-yellow-600" size={28} />,
      color: "bg-yellow-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8"
        >
          <div className="p-2 bg-white rounded-full shadow-sm group-hover:bg-blue-50">
            <ArrowLeft size={20} />
          </div>
          <span className="font-semibold">পিছনে ফিরে যান</span>
        </button>

        {/* Header Section */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100 mb-10 text-center md:text-left overflow-hidden relative">
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              ইন্টারভিউতে <span className="text-blue-600">স্মার্টলি</span> <br /> বেতন আলোচনা করুন
            </h1>
            <p className="text-gray-500 text-lg max-w-xl">
              সঠিক কৌশলে কথা বলে আপনার যোগ্য সম্মান এবং কাঙ্ক্ষিত বেতন নিশ্চিত করার ৫টি কার্যকরী টিপস।
            </p>
          </div>
          <div className="absolute top-0 right-0 -mr-16 -mt-16 bg-blue-50 w-64 h-64 rounded-full opacity-50 shadow-inner"></div>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {tips.map((tip) => (
            <div 
              key={tip.id} 
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group"
            >
              <div className={`${tip.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {tip.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{tip.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{tip.desc}</p>
            </div>
          ))}
        </div>

        {/* Final CTA Card */}
        <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="text-green-400" /> মনে রাখবেন
            </h4>
            <p className="text-gray-400">আত্মবিশ্বাসের সাথে কথা বলুন কিন্তু বিনয় বজায় রাখুন। আপনার ভ্যালু আগে প্রমাণ করুন।</p>
          </div>
          <button 
             onClick={() => navigate("/find-jobs")}
             className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all whitespace-nowrap"
          >
            জব খুঁজে দেখুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalaryTips;