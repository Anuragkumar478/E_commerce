import React from "react";

const Contact = () => {
  return (
    <div className="bg-gray-50 w-full min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-700 mb-10">
          Contact <span className="text-gray-900">Us</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Contact Form
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send us a message</h2>

            <form className="space-y-4">

              <div>
                <label className="text-gray-700 font-medium">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-3 mt-1 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium">Your Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 mt-1 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium">Message</label>
                <textarea
                  rows="5"
                  placeholder="Type your message..."
                  className="w-full p-3 mt-1 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition">
                Send Message
              </button>

            </form>
          </div> */}

          {/* Contact Info + Map */}
          <div>
            <div className="bg-white shadow-lg rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Contact Details</h2>

              <p className="text-gray-700 mb-2">
                📍 <strong>Address:</strong> Churk Bazar, Sonbhadra, Uttar Pradesh
              </p>
              <p className="text-gray-700 mb-2">
                📞 <strong>Phone:</strong> +91 9876543210
              </p>
              <p className="text-gray-700 mb-2">
                ✉️ <strong>Email:</strong> ankurbookstore@gmail.com
              </p>
              <p className="text-gray-700">
                🕒 <strong>Working Hours:</strong> 9:00 AM – 8:00 PM
              </p>
            </div>

            {/* Map Section */}
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <iframe
                title="map"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28513.87437504426!2d83.040!3d24.205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398ed91a58b8a6bb%3A0x8f96d3d26f7f2b56!2sChurk%20Bazar%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000">
              </iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
