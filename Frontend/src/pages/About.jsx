import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 w-full min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-700 mb-6">
          About <span className="text-gray-900">Ankur Book Store</span>
        </h1>

        {/* Hero Image / Banner */}
        <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg mb-10">
          <img 
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
            alt="Bookstore"
            className="w-full h-full object-cover"
          />
        </div>

        {/* About Content */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 leading-relaxed">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to Ankur Book Store & Cyber Café – Churk
          </h2>

          <p className="text-gray-700 text-lg mb-4">
            Established in the heart of Churk, <strong>Ankur Book Store</strong> is your trusted destination for all educational needs — from school & college textbooks to competitive exam materials and stationery items.
          </p>

          <p className="text-gray-700 text-lg mb-4">
            We are not just a book store! We also provide a fully equipped 
            <strong> Cyber Café</strong> offering printing, online form filling, internet access, document scanning, lamination, and digital services.
          </p>

          <p className="text-gray-700 text-lg mb-4">
            For years, we have been serving students, professionals, and local residents, ensuring 
            convenience, reliable service, and affordable products.
          </p>

          <p className="text-gray-700 text-lg mb-4">
            Our mission is to make education and digital access easier for everyone in Churk.  
            With our new online platform, you can now browse and order books directly from home.
          </p>

          {/* Mission Section */}
          <h3 className="text-xl font-semibold text-blue-800 mt-6 mb-3">Our Mission</h3>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>Provide all types of books at affordable prices.</li>
            <li>Offer reliable cyber services to help students and locals.</li>
            <li>Deliver a smooth online shopping experience.</li>
            <li>Become the most trusted educational store in Churk.</li>
          </ul>

          {/* Contact Box */}
          <div className="mt-10 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="text-xl font-semibold text-blue-900 mb-2">Contact Us</h4>
            <p className="text-gray-800">
              📍 Location: Churk Bazar, Sonbhadra  
            </p>
            <p className="text-gray-800">
              📞 Phone: +91 9876543210  
            </p>
            <p className="text-gray-800">
              ✉️ Email: ankurbookstore@gmail.com
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
