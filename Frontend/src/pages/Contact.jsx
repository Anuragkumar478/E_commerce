import React from "react";

const Contact = () => {
  return (
    <div className="w-full min-h-screen bg-[#F8F6F1] py-12 px-4 sm:px-6 lg:px-10">
      <div className="w-full max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.25em] text-[#B8863B] font-semibold mb-3">
            We'd Love to Hear From You
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-[#1E2A38]">
            Contact <span className="text-[#B8863B]">Us</span>
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Have a question about a book, your order, or anything else?
            Feel free to get in touch with us.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

          {/* Left - Contact Information */}
          <div className="flex flex-col gap-6">

            <div className="bg-white rounded-2xl shadow-sm border border-[#E7DFD1] p-6 sm:p-8">

              <h2 className="text-2xl font-bold text-[#1E2A38] mb-6">
                Our Contact Details
              </h2>

              {/* Address */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-11 h-11 flex-shrink-0 rounded-full bg-[#F4EBDA] flex items-center justify-center text-xl">
                  📍
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Address
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    Churk Bazar, Sonbhadra,
                    <br />
                    Uttar Pradesh, India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-11 h-11 flex-shrink-0 rounded-full bg-[#F4EBDA] flex items-center justify-center text-xl">
                  📞
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Phone
                  </h3>

                  <a
                    href="tel:+919876543210"
                    className="text-gray-600 hover:text-[#B8863B] transition-colors"
                  >
                    +91 9876543210
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-11 h-11 flex-shrink-0 rounded-full bg-[#F4EBDA] flex items-center justify-center text-xl">
                  ✉️
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Email
                  </h3>

                  <a
                    href="mailto:ankurbookstore@gmail.com"
                    className="text-gray-600 hover:text-[#B8863B] transition-colors break-all"
                  >
                    ankurbookstore@gmail.com
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 flex-shrink-0 rounded-full bg-[#F4EBDA] flex items-center justify-center text-xl">
                  🕒
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Working Hours
                  </h3>

                  <p className="text-gray-600">
                    Monday – Sunday
                    <br />
                    9:00 AM – 8:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Quote Card */}
            <div className="bg-[#1E2A38] rounded-2xl p-8 text-white">
              <p className="text-xl sm:text-2xl font-serif leading-relaxed">
                “A book may end, but its story stays with you.”
              </p>

              <div className="w-12 h-1 bg-[#B8863B] mt-5 rounded-full" />
            </div>
          </div>

          {/* Right - Map */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E7DFD1] overflow-hidden flex flex-col">

            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-[#1E2A38] mb-2">
                Find Us
              </h2>

              <p className="text-gray-600">
                Visit us at Churk Bazar, Sonbhadra.
              </p>
            </div>

            <div className="flex-1 min-h-[350px] lg:min-h-[500px]">
              <iframe
                title="Ankur Book Store Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28513.87437504426!2d83.040!3d24.205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398ed91a58b8a6bb%3A0x8f96d3d26f7f2b56!2sChurk%20Bazar%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 bg-white border border-[#E7DFD1] rounded-2xl p-6 sm:p-8 text-center">
          <h2 className="text-xl font-bold text-[#1E2A38]">
            Looking for your next great read?
          </h2>

          <p className="text-gray-600 mt-2">
            Explore our collection and discover a story worth getting lost in.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Contact;