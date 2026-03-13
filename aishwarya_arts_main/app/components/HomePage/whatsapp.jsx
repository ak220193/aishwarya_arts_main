import React from 'react'
import { FaWhatsapp } from "react-icons/fa";

const whatsapp = () => {
  return (
    <a
      href="https://wa.me/+919655007661" 
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-10 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50"
    >
      <FaWhatsapp size={30} />
    </a>
  )
}

export default whatsapp