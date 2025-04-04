"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import emailjs from "emailjs-com";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    artistName: "",
    portfolioLink: "",
    donationType: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Render extra fields based on selected subject
  const renderSubjectFields = () => {
    switch (formData.subject) {
      case "Exhibition Proposal":
        return (
          <>
            <div>
              <label htmlFor="artistName" className="block text-sm font-medium text-gray-700 mb-1">
                Artist Name
              </label>
              <input
                type="text"
                id="artistName"
                name="artistName"
                value={formData.artistName}
                onChange={handleChange}
                required
                placeholder="Artist Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="portfolioLink" className="block text-sm font-medium text-gray-700 mb-1">
                Portfolio Link
              </label>
              <input
                type="url"
                id="portfolioLink"
                name="portfolioLink"
                value={formData.portfolioLink}
                onChange={handleChange}
                required
                placeholder="https://yourportfolio.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        );
      case "Donation/Support":
        return (
          <div>
            <label htmlFor="donationType" className="block text-sm font-medium text-gray-700 mb-1">
              Type of Support
            </label>
            <input
              type="text"
              id="donationType"
              name="donationType"
              value={formData.donationType}
              onChange={handleChange}
              required
              placeholder="e.g. Financial, In-kind, Volunteer"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
      default:
        return null;
    }
  };

  // Handle form submission and send email via Email.js
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      artistName: formData.artistName,
      portfolioLink: formData.portfolioLink,
      donationType: formData.donationType
    };

    try {
      await emailjs.send(
        "your_service_id", // Replace with your EmailJS service ID
        "your_template_id", // Replace with your EmailJS template ID
        templateParams,
        "your_user_id" // Replace with your EmailJS public key
      );

      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        artistName: "",
        portfolioLink: "",
        donationType: ""
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Email send error:", error);
      setSubmitError(true);
      setTimeout(() => {
        setSubmitError(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-blue-700 text-white pt-36 pb-10">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            We'd love to hear from you. Reach out with questions, feedback, or to plan your visit.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Phone className="h-10 w-10 text-blue-700 mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">Call Us</h3>
              <p className="text-gray-700 mb-2">Have a quick question? Give us a call.</p>
              <a href="tel:+2348141515074" className="text-blue-700 font-medium hover:text-blue-800">
                +2348141515074
              </a>
              <a href="tel:+2348034632325" className="text-blue-700 font-medium hover:text-blue-800">
                +2348034632325
              </a>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <Mail className="h-10 w-10 text-blue-700 mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">Email Us</h3>
              <p className="text-gray-700 mb-2">Send us an email and we'll respond as soon as possible.</p>
              <a href="mailto:info@azaikipubliclibrary.org.ng" className="text-blue-700 font-medium hover:text-blue-800">
                info@azaikipubliclibrary.org.ng
              </a>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <MapPin className="h-10 w-10 text-blue-700 mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">Visit Us</h3>
              <p className="text-gray-700 mb-2">Beside Azaiki Public Library, Imgbi Road</p>
              <p className="text-gray-700">Yenagoa, Bayelsa State</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="section-title">Send Us a Message</h2>
              <p className="text-gray-700 mb-8">
                Whether you have a question about our collections, want to provide feedback, or are interested in
                supporting our mission, we're here to help.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Visiting Information">Visiting Information</option>
                    <option value="Exhibition Proposal">Exhibition Proposal</option>
                    <option value="Donation/Support">Donation/Support</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Render extra fields based on the selected subject */}
                {renderSubjectFields()}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Type your message here..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                {submitSuccess && (
                  <div className="p-4 bg-green-100 text-green-800 rounded-md">
                    Your message has been sent successfully. We'll get back to you soon!
                  </div>
                )}

                {submitError && (
                  <div className="p-4 bg-red-100 text-red-800 rounded-md">
                    There was an error sending your message. Please try again later.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex items-center justify-center w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-md"
                >
                  {isSubmitting ? "Sending..." : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
                </button>
              </form>
            </div>

            <div>
              <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Opening Hours</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-700">Monday - Friday</span>
                    <span className="font-medium">09:00 AM - 04:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Saturday</span>
                    <span className="font-medium">8:00 AM - 02:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </li>
                </ul>
              </div>

              <div className="relative h-80 rounded-lg overflow-hidden shadow-md">
                <div className="mt-12 h-[400px] rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.5325287543586!2d6.283113890720148!3d4.933722124802786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x106a05622743bcc3%3A0xaa026f4b0cafb83a!2sBayelsa+Tech+Hub!5e0!3m2!1sen!2sng!4v1635789072963!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16" id="Faq">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Do I need to book tickets in advance?",
                answer:
                  "While walk-ins are welcome, we recommend booking tickets online in advance, especially for popular exhibitions and weekend visits. This helps us manage capacity and ensures you won't have to wait in line.",
              },
              {
                question: "Is photography allowed in the museum?",
                answer:
                  "Photography for personal use is permitted in most areas of the museum, without flash or tripods. Some special exhibitions may have restrictions. Please check signage or ask our staff for guidance.",
              },
              {
                question: "Are guided tours available?",
                answer:
                  "Yes, we offer guided tours daily at 11:00 AM and 2:00 PM. Private tours can also be arranged with advance booking. Please contact our visitor services team for more information.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
