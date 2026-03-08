"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the return policy for Tanjore paintings?",
      answer:
        "You can return paintings within 15 days of delivery if there is any damage or discrepancy.",
    },
    {
      question: "Do you provide custom Tanjore paintings?",
      answer:
        "Yes, we create bespoke Tanjore paintings as per your specifications and temple or home requirements.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery typically takes 2-3 weeks depending on your location in India.",
    },
    {
      question: "Are the gold foils used in paintings authentic?",
      answer:
        "We use 22K real gold foils in our traditional Tanjore paintings to maintain authenticity.",
    },
    {
      question: "Can I visit the studio in person?",
      answer:
        "Yes, we welcome visitors by appointment to see the craftsmanship and select artworks.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Currently, we ship only within India. International shipping will be available soon.",
    },
    {
      question: "How can I place a bulk order?",
      answer:
        "For bulk orders, please contact us via email or phone for customized pricing and delivery schedules.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept credit/debit cards, UPI, and net banking for all online purchases.",
    },
    {
      question: "Is framing included in the price?",
      answer:
        "Basic framing is included. For premium frames, additional costs may apply based on customization.",
    },
   
  ];

  return (
    <section className="w-full max-w-5xl mx-auto py-20 px-4 md:px-8 lg:px-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900">
        Frequently Asked Questions
      </h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <button
              type="button"
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-5 md:py-6 text-left focus:outline-none"
              aria-expanded={openIndex === index}
            >
              <h3 className="text-lg md:text-xl font-medium text-gray-800">
                {faq.question}
              </h3>
              <span className="ml-4 text-2xl text-yellow-600">
                {openIndex === index ? <FiMinus /> : <FiPlus />}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6 md:pb-8 text-gray-700 text-base md:text-lg">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
