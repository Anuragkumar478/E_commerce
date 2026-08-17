import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="w-full min-h-screen bg-[#F8F5EE] text-[#1E2A38]">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 md:py-20">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Text */}
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#B8863B] font-semibold mb-4">
                About Ankur Book Store
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
                More than a bookstore.
                <span className="block text-[#B8863B] italic">
                  A place for learning.
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
                Ankur Book Store & Cyber Cafe is a trusted destination in
                Churk for books, stationery, educational resources, and
                essential digital services.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/"
                  className="bg-[#1E2A38] text-white px-7 py-3.5 rounded-full font-semibold hover:bg-[#2D3B4D] transition"
                >
                  Explore Books →
                </Link>

                <Link
                  to="/contact"
                  className="border border-[#B8863B] text-[#8B672F] px-7 py-3.5 rounded-full font-semibold hover:bg-[#F4EBDA] transition"
                >
                  Visit Us
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#E2B15B] rounded-full opacity-20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop"
                  alt="Books in a bookstore"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-4 sm:left-8 bg-white rounded-2xl shadow-xl border border-[#E7DFD1] p-5">
                <p className="text-2xl font-serif font-bold">
                  Books
                </p>
                <p className="text-sm text-gray-500">
                  Knowledge • Stories • Dreams
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="bg-white py-16 md:py-20">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">

          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm uppercase tracking-[0.25em] text-[#B8863B] font-semibold">
              Our Story
            </p>

            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-3">
              Built around books and community
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 text-gray-600 text-lg leading-8">

            <p>
              Established in the heart of Churk,{" "}
              <strong className="text-[#1E2A38]">
                Ankur Book Store
              </strong>{" "}
              was created with a simple purpose — to make books,
              educational resources, and essential services easily
              accessible to students and the local community.
            </p>

            <p>
              From school textbooks and college materials to competitive
              examination books, stationery, and general reading, we aim
              to provide useful resources for learners of every age.
            </p>

            <p>
              Alongside our bookstore, our{" "}
              <strong className="text-[#1E2A38]">
                Cyber Café
              </strong>{" "}
              provides practical digital services such as printing,
              scanning, online form filling, internet access, document
              services, and lamination.
            </p>

            <p>
              Today, we are bringing the same convenience online so that
              customers can discover and order books without having to
              visit the store every time.
            </p>

          </div>
        </div>
      </section>

      {/* ================= WHAT WE OFFER ================= */}
      <section className="py-16 md:py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.25em] text-[#B8863B] font-semibold">
              What We Offer
            </p>

            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-3">
              Everything you need in one place
            </h2>

            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              From books and stationery to everyday digital services,
              we're here to make learning and getting things done easier.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* Books */}
            <div className="bg-white border border-[#E7DFD1] rounded-2xl p-7 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-[#F4EBDA] flex items-center justify-center text-2xl mb-5">
                📚
              </div>

              <h3 className="text-xl font-bold mb-2">
                Books
              </h3>

              <p className="text-gray-600 leading-relaxed">
                School, college, competitive exams, reference books,
                fiction, and general reading.
              </p>
            </div>

            {/* Stationery */}
            <div className="bg-white border border-[#E7DFD1] rounded-2xl p-7 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-[#F4EBDA] flex items-center justify-center text-2xl mb-5">
                ✏️
              </div>

              <h3 className="text-xl font-bold mb-2">
                Stationery
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Everyday stationery and study essentials for students,
                professionals, and learners.
              </p>
            </div>

            {/* Cyber Café */}
            <div className="bg-white border border-[#E7DFD1] rounded-2xl p-7 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-[#F4EBDA] flex items-center justify-center text-2xl mb-5">
                💻
              </div>

              <h3 className="text-xl font-bold mb-2">
                Cyber Café
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Online forms, internet access, digital services, and
                assistance with everyday online tasks.
              </p>
            </div>

            {/* Printing */}
            <div className="bg-white border border-[#E7DFD1] rounded-2xl p-7 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-[#F4EBDA] flex items-center justify-center text-2xl mb-5">
                🖨️
              </div>

              <h3 className="text-xl font-bold mb-2">
                Print & Scan
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Printing, photocopying, scanning, document services,
                and lamination.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="bg-[#1E2A38] text-white py-16 md:py-20">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#E2B15B] font-semibold">
                Why Choose Us
              </p>

              <h2 className="text-3xl md:text-4xl font-serif font-bold mt-3">
                A local store with a bigger purpose.
              </h2>

              <p className="text-gray-300 mt-5 leading-relaxed">
                We believe access to books and digital services should
                be simple, affordable, and convenient for everyone.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">

              <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
                <p className="text-3xl font-bold text-[#E2B15B]">
                  01
                </p>
                <h3 className="font-bold mt-3">
                  Affordable
                </h3>
                <p className="text-sm text-gray-400 mt-2">
                  Useful books and services at reasonable prices.
                </p>
              </div>

              <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
                <p className="text-3xl font-bold text-[#E2B15B]">
                  02
                </p>
                <h3 className="font-bold mt-3">
                  Convenient
                </h3>
                <p className="text-sm text-gray-400 mt-2">
                  Browse and order books online from anywhere.
                </p>
              </div>

              <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
                <p className="text-3xl font-bold text-[#E2B15B]">
                  03
                </p>
                <h3 className="font-bold mt-3">
                  Local
                </h3>
                <p className="text-sm text-gray-400 mt-2">
                  Proudly serving students and residents of Churk.
                </p>
              </div>

              <div className="border border-white/10 rounded-2xl p-6 bg-white/5">
                <p className="text-3xl font-bold text-[#E2B15B]">
                  04
                </p>
                <h3 className="font-bold mt-3">
                  Trusted
                </h3>
                <p className="text-sm text-gray-400 mt-2">
                  Focused on reliable products and helpful service.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="bg-white py-16 md:py-20">

        <div className="max-w-4xl mx-auto px-4 text-center">

          <p className="text-sm uppercase tracking-[0.25em] text-[#B8863B] font-semibold">
            Our Mission
          </p>

          <h2 className="text-3xl md:text-4xl font-serif font-bold mt-3">
            Making knowledge more accessible
          </h2>

          <p className="text-gray-600 text-lg leading-8 mt-6">
            Our mission is to make quality books, educational resources,
            stationery, and digital services accessible to the people of
            Churk and nearby communities while creating a convenient
            online experience for every customer.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">

            <span className="px-5 py-2 rounded-full bg-[#F4EBDA] text-[#8B672F] text-sm font-medium">
              📚 Education
            </span>

            <span className="px-5 py-2 rounded-full bg-[#F4EBDA] text-[#8B672F] text-sm font-medium">
              💡 Knowledge
            </span>

            <span className="px-5 py-2 rounded-full bg-[#F4EBDA] text-[#8B672F] text-sm font-medium">
              🤝 Community
            </span>

            <span className="px-5 py-2 rounded-full bg-[#F4EBDA] text-[#8B672F] text-sm font-medium">
              🌱 Growth
            </span>

          </div>

        </div>
      </section>

      {/* ================= QUOTE ================= */}
      <section className="bg-[#F8F5EE] py-20">

        <div className="max-w-3xl mx-auto px-6 text-center">

          <div className="text-[#B8863B] text-5xl font-serif">
            ❝
          </div>

          <blockquote className="text-3xl md:text-4xl font-serif italic leading-relaxed text-[#1E2A38] mt-4">
            A book may end, but its story stays with you.
          </blockquote>

          <div className="w-12 h-1 bg-[#B8863B] mx-auto mt-7 rounded-full" />

          <p className="text-gray-500 mt-5">
            Keep reading. Keep learning. Keep discovering.
          </p>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-[#1E2A38] py-14">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
            Ready to find your next book?
          </h2>

          <p className="text-gray-300 mt-3">
            Explore our collection and discover something worth reading.
          </p>

          <Link
            to="/"
            className="inline-block mt-7 bg-[#B8863B] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#9A6E2F] transition"
          >
            Explore Our Books →
          </Link>

        </div>
      </section>

    </div>
  );
};

export default About;