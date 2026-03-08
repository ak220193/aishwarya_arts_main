"use client";
import React, { useState, useEffect } from "react";
import {
  Upload,
  Sparkles,
  Diamond,
  Maximize2,
  Save,
  Info,
  DollarSign,
  PenTool,
  Plus,
  Layers,
  ChevronDown,
  Hash,
  Clock,
  X,
  Trash2,
  ShieldAlert,
  IndianRupee,
  BadgeIndianRupee,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { UploadButton } from "@uploadthing/react";

// --- DYNAMIC DATA ARRAYS ---
const GODS = [
  "Amman",
  "Annapoorni",
  "Annamalai",
  "Baba",
  "Balaji Lakshmi",
  "Balaji Thayaar",
  "Datchnamoorthy",
  "Durga Devi",
  "Ganesha",
  "Gayathri Devi",
  "Guruvayurappan",
  "Hanuman",
  "Kamadenu",
  "Krishna",
  "Lakshmi",
  "Lalitha Devi",
  "Lakshmi Narayana",
  "Meenakshi",
  "Murugan",
  "Pooja Set Painting",
  "Raja Raja Rajeshwari",
  "Ramar",
  "Renuga Devi",
  "Sathya Narayana",
  "Shiva Family",
  "Shanvanthri",
  "Vishwa Brahma",
  "GajaLakshmi",
  "Saraswathi",
  "Narashimar",
  "Kamatchi amman",
  "Ratha krishnan",
];

const ART_STYLES = [
  { label: "Flat Type", value: "flat" },
  { label: "2D Work", value: "2d" },
  { label: "3D Embossed", value: "embossed" },
];

const FRAMES = ["Classic Frame", "Mani Frame", "Chettinad Frame"];

const DIMENSIONS = [
  '15" X 12"',
  '18" X 14"',
  '20" X 16"',
  '24" X 18"',
  '30" X 24"',
  '36" X 24"',
  '48" X 36"',
  '60" X 36"',
  '72" X 48"',
];

const PRICE_SHEET = {
  '15" X 12"': {
    flat: 11999,
    flatMrp: 13332,
    "2d": 15999,
    "2dMrp": 17777,
    embossed: 23999,
    embossedMrp: 26666,
  },
  '18" X 14"': {
    flat: 15999,
    flatMrp: 17777,
    "2d": 20999,
    "2dMrp": 23332,
    embossed: 32499,
    embossedMrp: 36110,
  },
  '20" X 16"': {
    flat: 21499,
    flatMrp: 23888,
    "2d": 23999,
    "2dMrp": 26666,
    embossed: 39999,
    embossedMrp: 44443,
  },
  '24" X 18"': {
    flat: 27499,
    flatMrp: 30554,
    "2d": 32999,
    "2dMrp": 36666,
    embossed: 49999,
    embossedMrp: 55554,
  },
  '30" X 24"': {
    flat: 41999,
    flatMrp: 46666,
    "2d": 47999,
    "2dMrp": 53332,
    embossed: 79999,
    embossedMrp: 88888,
  },
  '36" X 24"': {
    flat: 49999,
    flatMrp: 55554,
    "2d": 59999,
    "2dMrp": 66666,
    embossed: 94999,
    embossedMrp: 105554,
  },
  '48" X 36"': {
    flat: 89999,
    flatMrp: 99999,
    "2d": 129999,
    "2dMrp": 144443,
    embossed: 179999,
    embossedMrp: 199999,
  },
  '60" X 36"': {
    flat: 114999,
    flatMrp: 127777,
    "2d": 164999,
    "2dMrp": 183332,
    embossed: 219999,
    embossedMrp: 244443,
  },
  '72" X 48"': {
    flat: 179999,
    flatMrp: 199999,
    "2d": 219999,
    "2dMrp": 244443,
    embossed: 349999,
    embossedMrp: 388888,
  },
};

const AddProductFinal = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    sku: "",
    title: "",
    description: "Handcrafted 22ct Gold Leaf Tanjore Painting",
    price: "",
    offerPrice: "",
    category: "others",
    godName: "",
    workStyle: "flat",
    dimensions: '15" X 12"',
    frameType: "Synthetic Frame",
    weight: "2.5 kg",
    leadTime: "Ready to Ship",
    images: [],
    inStock: true,
    isBestSeller: false,
    isNewArrival: false,
    aboutArtisan:
      "Crafted by master artisans from Thanjavur with generations of expertise.",
    goldPurity: "Certified 22ct Gold Foil",
    materialBase: "Water-resistant Plywood & Premium Cotton Cloth",
    storyTitle: "Heritage in Every Stroke",
    detailedDescription: "",
    priceMatrix: [], // Array to store { size, style, frame, price, mrp }
  });

  // --- MATRIX LOGIC: SCALABLE CONTROL ---
  // This logic ensures that when you type a price for a specific Size + Style + Frame,
  // it updates that exact object in the array.

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    toast.success("Image removed from selection");
  };

  // --- NEW: AUTO-FILL LOGIC ---
  // Fills the entire matrix with the Base Price to save manual entry time
  const syncPriceSheet = () => {
    if (!formData.dimensions)
      return toast.error("Select a Default Size first!");

    const fullMatrix = [];
    // FIND START INDEX: Only process sizes from the selected one onwards
    const startIndex = DIMENSIONS.indexOf(formData.dimensions);

    DIMENSIONS.slice(startIndex).forEach((size) => {
      const rates = PRICE_SHEET[size];
      if (!rates) return;

      ART_STYLES.forEach((style) => {
        FRAMES.forEach((frame) => {
          fullMatrix.push({
            size,
            style: style.value,
            frame: frame,
            price: Number(rates[style.value]),
            mrp: Number(rates[`${style.value}Mrp`]),
          });
        });
      });
    });

    setFormData((prev) => ({
      ...prev,
      priceMatrix: fullMatrix,
      price: PRICE_SHEET[prev.dimensions][prev.workStyle],
      offerPrice: PRICE_SHEET[prev.dimensions][`${prev.workStyle}Mrp`],
    }));

    toast.success(`Synced prices for ${formData.dimensions} and above!`);
  };
  // --- REWRITTEN: MATRIX UPDATE ---
  // Handles individual cell changes without breaking data types
  const handleMatrixUpdate = (size, style, frame, field, value) => {
    setFormData((prev) => {
      const newMatrix = [...(prev.priceMatrix || [])];
      const index = newMatrix.findIndex(
        (item) =>
          item.size === size && item.style === style && item.frame === frame,
      );

      const numericValue = value === "" ? 0 : Number(value);

      if (index > -1) {
        newMatrix[index] = { ...newMatrix[index], [field]: numericValue };
      } else {
        newMatrix.push({ size, style, frame, [field]: numericValue });
      }
      return { ...prev, priceMatrix: newMatrix };
    });
  };

  // --- REWRITTEN: PUBLISH LOGIC ---
  // Ensures data is clean and unblocks the Shop frontend
  const handlePublish = async () => {
    if (!formData.sku || !formData.price || formData.images.length === 0) {
      return toast.error("SKU, Price, and Main Image are mandatory!");
    }

    setLoading(true);
    try {
      // 1. Clean the matrix: Remove empty entries
      let finalizedMatrix = formData.priceMatrix.filter(
        (item) => item.price > 0,
      );

      // 2. Fallback: If matrix is empty, ensure at least the base selection is buyable
      if (finalizedMatrix.length === 0) {
        finalizedMatrix = [
          {
            size: formData.dimensions,
            frame: formData.frameType,
            style: formData.workStyle,
            price: Number(formData.price),
            mrp: Number(formData.offerPrice || formData.price),
          },
        ];
      }

      const payload = {
        ...formData,
        sku: formData.sku.toUpperCase(),
        priceMatrix: finalizedMatrix,
      };

      const res = await axios.post("/api/admin/products", payload);
      if (res.status === 201 || res.status === 200) {
        toast.success("Masterpiece Published Successfully!");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Database sync failed");
    } finally {
      setLoading(false);
    }
  };

  // --- LOGIC: REACTIVE DEFAULT UPDATER ---
  // Automatically updates main Price/MRP fields when Default Size or Style changes
  useEffect(() => {
    const rates = PRICE_SHEET[formData.dimensions];
    if (rates) {
      setFormData((prev) => ({
        ...prev,
        price: rates[prev.workStyle],
        offerPrice: rates[`${prev.workStyle}Mrp`],
      }));
    }
  }, [formData.dimensions, formData.workStyle]); // Triggers on every dropdown change

  // --- LOGIC: MANUAL OVERRIDE (For Festival Pricing) ---
  // Allows you to manually type a new price in the sidebar that updates the DB
  const handlePriceChange = (field, value) => {
    const numericValue = value === "" ? 0 : Number(value);
    setFormData((prev) => ({
      ...prev,
      [field]: numericValue,
    }));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-700">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white/90 sticky top-0 z-30 py-6 px-3 rounded-4xl border-b border-zinc-100 mb-10 shadow-sm">
        <div className="ml-5">
          <h2 className="text-4xl font-semibold text-zinc-800 tracking-wide uppercase">
            Products
          </h2>
          <p className="text-[12px] text-zinc-800 font-bold uppercase tracking-[0.3em]">
            Gallery Management
          </p>
        </div>
        <div className="flex items-center gap-4 mr-5">
          <button className="px-6 py-2.5 bg-zinc-50 text-zinc-80 rounded-xl font-semibold text-sm uppercase border border-zinc-200 text-black">
            Save Draft
          </button>

          <button
            onClick={handlePublish}
            disabled={loading}
            className="px-8 py-2.5 bg-zinc-800 text-white rounded-xl font-semibold text-sm uppercase shadow-lg flex items-center gap-2 hover:bg-amber-600 transition-all disabled:opacity-50"
          >
            {loading ? (
              <Clock className="animate-spin" size={16} />
            ) : (
              <Save size={16} />
            )}
            {loading ? "Syncing..." : "Publish Artwork"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-10">
          {/* MEDIA GALLERY */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm">
            <div className="flex items-center gap-3 space-y-7">
              <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl">
                <Layers size={14} />
              </div>
              <h3 className="text-md font-semibold text-zinc-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                Artwork Media Gallery
              </h3>
            </div>
            <div className="grid grid-cols-4 grid-rows-2 gap-4 h-112.5">
              <div className="col-span-2 row-span-2 bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-[2.5rem] flex flex-col items-center justify-center hover:border-amber-400 cursor-pointer overflow-hidden transition-all relative">
                {formData.images[0] ? (
                  <>
                    <img
                      src={formData.images[0]}
                      className="w-full h-full object-contain"
                      alt="Main"
                    />
                    <button
                      onClick={() => removeImage(0)}
                      className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                ) : (
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setFormData((prev) => ({
                        ...prev,
                        images: [...prev.images, res[0].url],
                      }));
                      toast.success("Main view uploaded");
                    }}
                    onUploadError={(err) => toast.error(err.message)}
                    appearance={{
                      button:
                        "bg-transparent text-zinc-300 w-full h-full border-none after:hidden focus-within:ring-0",
                      allowedContent: "hidden",
                    }}
                    content={{ button: <Upload size={32} /> }}
                  />
                )}
              </div>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-4xl flex items-center justify-center hover:border-amber-400 cursor-pointer overflow-hidden transition-all relative"
                >
                  {formData.images[i] ? (
                    <>
                      <img
                        src={formData.images[i]}
                        className="w-full h-full object-contain"
                        alt={`View ${i}`}
                      />
                      <button
                        onClick={() => removeImage(i)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full shadow-md"
                      >
                        <Trash2 size={12} />
                      </button>
                    </>
                  ) : (
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        setFormData((prev) => ({
                          ...prev,
                          images: [...prev.images, res[0].url],
                        }));
                        toast.success("Angle uploaded");
                      }}
                      onUploadError={(err) => toast.error(err.message)}
                      appearance={{
                        button:
                          "bg-transparent text-zinc-300 w-full h-full border-none after:hidden focus-within:ring-0",
                        allowedContent: "hidden",
                      }}
                      content={{ button: <Plus size={24} /> }}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ART IDENTITY */}
          <section className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 shadow-sm space-y-8 text-black">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl">
                <PenTool size={18} />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 uppercase">
                Art Identity
              </h3>
            </div>
            <input
              type="text"
              placeholder="Enter Title..."
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full text-4xl font-semibold outline-none border-b-2 border-zinc-50 focus:border-amber-500 pb-4 transition-all"
            />

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase ml-2 text-zinc-800">
                  Divine Subject
                </label>
                <div className="relative mt-2">
                  <select
                    value={formData.godName}
                    onChange={(e) =>
                      setFormData({ ...formData, godName: e.target.value })
                    }
                    className="w-full bg-zinc-50 rounded-2xl py-4 px-6 font-semibold outline-gray-400 appearance-none"
                  >
                    <option value="">Select God Name</option>
                    {GODS.map((god) => (
                      <option key={god} value={god}>
                        {god}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>
              <div className="space-y-3 font-outfit">
                <label className="text-sm font-semibold uppercase ml-2 text-zinc-800">
                  Default Work Style
                </label>
                <div className="relative font-outfit mt-2">
                  <select
                    value={formData.workStyle}
                    onChange={(e) =>
                      setFormData({ ...formData, workStyle: e.target.value })
                    }
                    className="w-full bg-zinc-50  rounded-2xl py-4 px-6 font-semibold outline-gray-400 appearance-none"
                  >
                    {ART_STYLES.map((style) => (
                      <option key={style.value} value={style.value}>
                        {style.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase ml-2 text-black">
                  Story Headline
                </label>
                <input
                  type="text"
                  value={formData.storyTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, storyTitle: e.target.value })
                  }
                  className="w-full bg-zinc-50  rounded-2xl py-4 px-6 font-semibold outline-none italic mt-2"
                  placeholder=" Heritage in Every Stroke"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase ml-2 text-black">
                  Detailed Product Story
                </label>
                <textarea
                  rows={4}
                  value={formData.detailedDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      detailedDescription: e.target.value,
                    })
                  }
                  className="w-full mt-2 bg-zinc-50  rounded-2xl py-4 px-6 font-medium outline-none leading-relaxed text-zinc-800"
                  placeholder="Describe the gold work process and spiritual significance..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 pt-6">
              {[
                {
                  label: "SKU / ID",
                  key: "sku",
                  icon: Hash,
                  type: "input",
                  placeholder: "AA-GAN-101",
                },
                {
                  label: "Default Size",
                  key: "dimensions",
                  icon: Maximize2,
                  type: "select",
                  options: DIMENSIONS,
                },
                {
                  label: "Default Frame",
                  key: "frameType",
                  icon: Diamond,
                  type: "select",
                  options: FRAMES,
                },
                {
                  label: "Weight",
                  key: "weight",
                  icon: Info,
                  type: "select",
                  options: ["2.5 kg", "3.5 kg", "5.0 kg"],
                },
                {
                  label: "Lead Time",
                  key: "leadTime",
                  icon: Clock,
                  type: "select",
                  options: ["Ready to Ship", "2-3 Weeks", "Custom Order"],
                },
              ].map((spec, i) => (
                <div key={i} className="flex items-center gap-5">
                  <div className="p-4 bg-amber-100 rounded-2xl text-amber-700">
                    <spec.icon size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold uppercase text-zinc-800 mb-1">
                      {spec.label}
                    </p>
                    {spec.type === "input" ? (
                      <input
                        value={formData[spec.key]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [spec.key]: e.target.value.toUpperCase(),
                          })
                        }
                        placeholder={spec.placeholder}
                        className="w-full bg-transparent border-b border-zinc-100 outline-none font-bold text-sm focus:border-amber-500 transition-all text-black"
                      />
                    ) : (
                      <div className="relative">
                        <select
                          value={formData[spec.key]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [spec.key]: e.target.value,
                            })
                          }
                          className="w-full bg-transparent border-b border-zinc-100 outline-none font-bold text-sm appearance-none pr-6 text-black"
                        >
                          {spec.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-300 pointer-events-none"
                          size={12}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* DYNAMIC SCALABLE MATRIX (PRICE BY SIZE, STYLE & FRAME) */}
          <section className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-md font-semibold text-zinc-800 uppercase tracking-widest flex items-center gap-2">
                <BadgeIndianRupee size={18} /> Master Price Sheet
              </h3>
              <button
                type="button"
                onClick={syncPriceSheet}
                className="px-6 py-2 bg-amber-600 text-white rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-zinc-900 transition-all flex items-center gap-2 shadow-lg"
              >
                <Sparkles size={14} /> Auto-Fill Excel Prices
              </button>
            </div>
            <div className="overflow-x-auto border rounded-4xl border-zinc-100">
              <table className="w-full text-left border-collapse min-w-200">
                <thead className="bg-amber-100">
                  <tr className="text-md font-semibold uppercase text-zinc-800">
                    <th className="p-4">Dimensions</th>
                    <th className="p-4">Art Style</th>
                    {FRAMES.map((frame) => (
                      <th key={frame} className="p-4 text-center">
                        {frame} (₹)
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DIMENSIONS.map((size) => (
                    <React.Fragment key={size}>
                      {ART_STYLES.map((style, sIdx) => {
                        // VALIDATION: Check if this row should be disabled based on default selection
                        const isBelowDefault =
                          DIMENSIONS.indexOf(size) <
                          DIMENSIONS.indexOf(formData.dimensions);

                        return (
                          <tr
                            key={`${size}-${style.value}`}
                            className={`border-t border-zinc-50 transition-all ${
                              isBelowDefault
                                ? "opacity-40 bg-zinc-50 pointer-events-none"
                                : "hover:bg-zinc-50/50"
                            }`}
                          >
                            {sIdx === 0 && (
                              <td
                                rowSpan={ART_STYLES.length}
                                className="p-4 text-md font-bold text-zinc-900 align-top border-r border-zinc-50"
                              >
                                {size}
                              </td>
                            )}
                            <td className="p-4 text-md font-semibold text-amber-700 bg-amber-50/20">
                              {style.label}
                            </td>
                            {FRAMES.map((frame) => {
                              // LOGIC: Find existing price for this specific combination in the state
                              const cellData = formData.priceMatrix.find(
                                (item) =>
                                  item.size === size &&
                                  item.style === style.value &&
                                  item.frame === frame,
                              );

                              return (
                                <td key={frame} className="p-2">
                                  <div className="flex flex-col gap-2">
                                    <input
                                      type="number"
                                      placeholder="Price"
                                      disabled={isBelowDefault}
                                      // BINDING: This shows the sync value in the box
                                      value={cellData?.price || ""}
                                      className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-sm outline-none focus:border-amber-500 text-black font-bold disabled:bg-zinc-100"
                                      onChange={(e) =>
                                        handleMatrixUpdate(
                                          size,
                                          style.value,
                                          frame,
                                          "price",
                                          e.target.value,
                                        )
                                      }
                                    />
                                    <input
                                      type="number"
                                      placeholder="MRP"
                                      disabled={isBelowDefault}
                                      // BINDING: This shows the sync MRP in the box
                                      value={cellData?.mrp || ""}
                                      className="w-full p-2 bg-zinc-50 border border-zinc-100 rounded-lg text-sm outline-none text-zinc-600 disabled:opacity-50"
                                      onChange={(e) =>
                                        handleMatrixUpdate(
                                          size,
                                          style.value,
                                          frame,
                                          "mrp",
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="xl:col-span-4 space-y-8 text-black font-outfit">
          <section className="bg-white rounded-[3rem] p-10 shadow-xl border border-zinc-100 text-black">
            <h3 className="text-md font-semibold uppercase mb-10 flex items-center gap-3">
              <IndianRupee size={18} className="text-amber-500" /> Default
              Display Price
            </h3>
            <div className="space-y-10">
              <div className="relative">
                <span className="absolute left-0 top-1 font-black text-2xl text-zinc-400">
                  ₹
                </span>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handlePriceChange("price", e.target.value)} // Manual festival edit
                  placeholder="18000"
                  className="w-full bg-transparent border-b border-zinc-200 pb-6 pl-8 text-4xl font-semibold outline-none focus:border-amber-500 transition-all text-black"
                />
                <label className="text-[15px] font-semibold text-zinc-700 mt-3 block uppercase tracking-widest">
                  Base Starting Price
                </label>
              </div>
              <div className="relative">
                <span className="absolute left-0 top-1 font-black text-2xl text-zinc-400">
                  ₹
                </span>
                <input
                  type="number"
                  value={formData.offerPrice}
                  onChange={(e) =>
                    handlePriceChange("offerPrice", e.target.value)
                  }
                  placeholder="15500"
                  className="w-full bg-transparent border-b border-zinc-100 pb-6 pl-8 text-4xl font-semibold outline-none focus:border-amber-500 transition-all text-black"
                />
                <label className="text-[15px] font-semibold text-zinc-700 mt-3 block uppercase tracking-widest">
                  Base Starting MRP
                </label>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-[2.5rem] p-10 border border-zinc-100 shadow-sm space-y-6 text-semibold">
            <div className="flex items-center gap-3 text-black">
              <ShieldAlert className="text-amber-600" size={18} />
              <h3 className="text-md font-semibold uppercase tracking-widest">
                Hallmarks
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-md font-semibold uppercase text-amber-700">
                  Gold Purity
                </label>
                <input
                  value={formData.goldPurity}
                  onChange={(e) =>
                    setFormData({ ...formData, goldPurity: e.target.value })
                  }
                  className="w-full border-b border-zinc-100 py-2 text-sm font-bold text-zinc-900 outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-md font-semibold uppercase text-amber-700">
                  Base Materials
                </label>
                <input
                  value={formData.materialBase}
                  onChange={(e) =>
                    setFormData({ ...formData, materialBase: e.target.value })
                  }
                  className="w-full border-b border-zinc-100 py-2 text-sm font-bold text-zinc-900 outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </section>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() =>
                setFormData({ ...formData, inStock: !formData.inStock })
              }
              className={`py-5 rounded-2xl text-xs font-bold uppercase border transition-all shadow-sm ${formData.inStock ? "bg-green-50 text-green-700 border-green-200" : "bg-zinc-50 text-zinc-400"}`}
            >
              {formData.inStock ? "● In Stock" : "Out of Stock"}
            </button>
            <button
              onClick={() =>
                setFormData({
                  ...formData,
                  isBestSeller: !formData.isBestSeller,
                })
              }
              className={`py-5 rounded-2xl text-xs font-bold uppercase border transition-all shadow-sm ${formData.isBestSeller ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-zinc-50 text-zinc-400"}`}
            >
              Best Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductFinal;
