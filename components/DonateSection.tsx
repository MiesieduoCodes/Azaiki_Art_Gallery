"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

interface FlutterwaveConfig {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency: string;
  payment_options: string;
  customer: {
    email: string;
    phone_number: string;
    name: string;
  };
  customizations: {
    title: string;
    description: string;
    logo: string;
  };
}

export const DonationSection = () => {
  const [amount, setAmount] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const validatePhoneNumber = (phone: string) => {
    const regex = /^(0|234)(7|8|9)(0|1)\d{8}$/;
    return regex.test(phone);
  };

  const formatPhoneNumber = (phone: string) => {
    if (phone.startsWith("0")) {
      return "234" + phone.slice(1);
    }
    return phone;
  };

  const config: FlutterwaveConfig = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "",
    tx_ref: Date.now().toString(),
    amount: Number(amount),
    currency: "NGN",
    payment_options: "card, banktransfer, ussd",
    customer: {
      email: email,
      phone_number: formatPhoneNumber(phone),
      name: name,
    },
    customizations: {
      title: "Art Museum Donation",
      description: "Support for art preservation and exhibitions",
      logo: "https://your-museum-logo-url.com/logo.png",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!amount || !name || !email || !phone) {
      setMessage("Please fill all required fields");
      setIsLoading(false);
      return;
    }

    if (!validatePhoneNumber(phone)) {
      setMessage("Please enter a valid Nigerian phone number (e.g., 08012345678)");
      setIsLoading(false);
      return;
    }

    handleFlutterPayment({
      callback: (response) => {
        console.log(response);
        if (response.status === "successful") {
          setIsSuccess(true);
          setAmount("");
          setName("");
          setEmail("");
          setPhone("");
          setMessage("");
        } else {
          setMessage("Payment was not successful. Please try again.");
        }
        closePaymentModal();
        setIsLoading(false);
      },
      onClose: () => {
        setIsLoading(false);
        setMessage("Payment window was closed");
      },
    });
  };

  const presetAmounts = [1000, 5000, 10000, 20000, 50000];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16 bg-white"
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Support Our Museum</h2>
          <p className="text-center text-gray-600 mb-12">
            Your donation helps us preserve cultural heritage, fund exhibitions, and support educational programs.
          </p>

          {isSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
              <p className="text-green-700">
                Your donation has been received. We appreciate your support for the arts!
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-4 px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
              >
                Make Another Donation
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-sm">
              {message && !isLoading && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                  {message}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Select an amount (₦)</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {presetAmounts.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setAmount(preset.toString())}
                        className={`py-2 px-4 rounded-md border ${
                          amount === preset.toString()
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                        } transition-colors`}
                      >
                        {preset.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3">
                    <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-1">
                      Or enter a custom amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                      <input
                        type="number"
                        id="customAmount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Amount"
                        min="100"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 08012345678"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any special instructions or dedication..."
                  ></textarea>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    * Required fields. All donations are tax-deductible to the extent allowed by law.
                  </p>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? "Processing..." : "Donate Now"}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg text-blue-800 mb-2">Preservation</h3>
              <p className="text-blue-700">
                Help us maintain and restore valuable artworks for future generations.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg text-blue-800 mb-2">Education</h3>
              <p className="text-blue-700">
                Support our art education programs for schools and communities.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg text-blue-800 mb-2">Exhibitions</h3>
              <p className="text-blue-700">
                Fund new exhibitions that showcase diverse artists and cultures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};