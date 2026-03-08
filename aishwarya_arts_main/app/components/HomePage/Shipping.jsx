"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Shipping = () => {
  const details = [
    {
      icon: "/assets/shipping/delivery.svg",
      title: "Shipping Across India",
      desc: "Enjoy safe and fast delivery to every destination in India with Aishwarya Arts.",
      alt: "Delivery truck representing free shipping",
    },
    {
      icon: "/assets/shipping/offer.svg",
      title: "Exclusive Offers & Deals",
      desc: "Get up to 20% off on traditional Tanjore paintings and exclusive art collections.",
      alt: "Discount tag showing exclusive offers and deals",
    },
    {
      icon: "/assets/shipping/bestprice.svg",
      title: "Guaranteed Best Prices",
      desc: "From traditional classics to custom masterpieces, we ensure fair pricing and top quality.",
      alt: "Price tag symbol representing best prices in the market",
    },
  ];

  return (
    <section
      className="max-w-7xl mx-auto py-20 px-6 md:px-16"
      aria-labelledby="shipping-info"
    >
      <div className="flex justify-center mb-5">
      <h1
        id="shipping-info"
        className="font-semibold text-4xl tracking-wide"
      >
        Delivery | Offers| Best Price
      </h1>
      </div>

      <div className="grid md:grid-cols-3 gap-12 text-center hover:group hover:transition hover:scale-105">
        {details.map((item, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="mb-5 flex items-center justify-center mt-5">
              <Image
                src={item.icon}
                alt={item.alt}
                width={80}
                height={80}
                loading="lazy"
                decoding="async"
                className="object-contain invert-25"
              />
            </div>
            <h3 className="font-semibold text-black text-xl">
              {item.title}
            </h3>
            <p className="text-black mt-2 leading-relaxed text-base">
              {item.desc}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Shipping;
