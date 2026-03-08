"use client";

export default function ContactMap() {
  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        <iframe
          src="https://www.google.com/maps?q=11.218361159525347,78.1802223493099&z=16&output=embed"
          className="w-full h-112.5 rounded-2xl border shadow-md"
          loading="lazy"
          allowFullScreen=""
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
