"use client";

import {
  Play,
  Setting4,
  Location,
  Home2,
  DollarCircle,
  SearchNormal1,
  ArrowDown,
} from "@/components/ui/icons";
import Link from "next/link";
import { useState } from "react";
import { PROPERTY_TYPES } from "@/lib/propertyTypes";
import { bandsFor } from "@/lib/priceBands";

export default function Hero() {
  const [tab, setTab] = useState("Buy");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  return (
    <section id="home" className="relative px-3 lg:px-6 pt-[84px] lg:pt-6 pb-6">
      <div className="relative rounded-[24px] lg:rounded-[32px] overflow-hidden min-h-[680px] lg:min-h-[820px] flex flex-col">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
          alt="Luxury house with pool at sunset"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
        <div className="relative z-10 px-6 lg:px-14 pt-10 lg:pt-16 pb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10px] tracking-[0.18em] text-white uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8A082]" />
            {" Premium Real Estate Solutions"}
          </div>
          <h1 className="serif mt-6 text-white text-[38px] lg:text-[72px] leading-[0.95] tracking-[-0.02em] max-w-[620px] font-[500]">
            {"Find a Place That "}
            <br />
            <span className="font-[400] italic">Fits Your Life</span>
          </h1>
          <p className="mt-5 text-white/80 text-[14px] lg:text-[15px] leading-[1.6] max-w-[460px] font-light">
            From dream homes to smart investments. SLIIQQUE helps you find the
            right property, in the right place, at the right time.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <Link
              href="/properties"
              className="px-6 py-3 rounded-full bg-white text-[#102E26] text-[13px] font-medium hover:bg-[#FFFBF6] transition"
            >
              Explore Properties
            </Link>
            <button className="w-11 h-11 rounded-full bg-white/15 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-white/25 transition">
              <Play size={16} variant="Bold" />
            </button>
            <span className="text-white/70 text-[12px]">Watch Story</span>
          </div>
        </div>
        <div className="relative z-20 mt-auto px-3 lg:px-6 pb-3 lg:pb-6">
          <div className="mx-auto max-w-[1120px] bg-white rounded-[20px] lg:rounded-[24px] shadow-[0_20px_80px_-20px_rgba(0,0,0,0.3)] overflow-hidden">
            <div className="flex items-center gap-1 p-1.5">
              {["Buy", "Rent", "Sell"].map((d) => (
                <button
                  onClick={() => setTab(d)}
                  className={`px-5 py-2.5 rounded-full text-[13px] font-medium transition-all ${tab === d ? "bg-[#C26A4A] text-white shadow" : "text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F1EB]"}`}
                  key={d}
                >
                  {d}
                </button>
              ))}
              <div className="ml-auto hidden lg:flex items-center gap-2 pr-3 text-[11px] text-[#9A9A9A]">
                <span className="inline-flex items-center gap-1.5">
                  <Setting4 size={14} /> Advanced Filters
                </span>
              </div>
            </div>
            <div className="h-[1px] bg-[#F0E9DE]" />
            <form
              action="/properties"
              className="grid lg:grid-cols-[1.2fr_1fr_1fr_auto] gap-0"
            >
              <input type="hidden" name="mode" value={tab.toLowerCase()} />
              <div className="px-6 py-4 lg:border-r border-[#F0E9DE] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FDF6EF] flex items-center justify-center text-[#C26A4A]">
                  <Location size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] tracking-wide text-[#9A9A9A] uppercase">
                    Location
                  </div>
                  <input
                    value={location}
                    onChange={(d) => setLocation(d.target.value)}
                    name="location"
                    placeholder="Los Angeles, CA"
                    className="w-full bg-transparent outline-none text-[14px] font-medium placeholder:text-[#1A1A1A]"
                  />
                </div>
              </div>
              <div className="px-6 py-4 lg:border-r border-[#F0E9DE] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FDF6EF] flex items-center justify-center text-[#C26A4A]">
                  <Home2 size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] tracking-wide text-[#9A9A9A] uppercase">
                    Property Type
                  </div>
                  <select
                    name="type"
                    value={propertyType}
                    onChange={(d) => setPropertyType(d.target.value)}
                    className="w-full bg-transparent outline-none text-[14px] font-medium"
                  >
                    <option value="">Select Type</option>
                    {PROPERTY_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="px-6 py-4 lg:border-r border-[#F0E9DE] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FDF6EF] flex items-center justify-center text-[#C26A4A]">
                  <DollarCircle size={18} />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] tracking-wide text-[#9A9A9A] uppercase">
                    Price Range
                  </div>
                  <select
                    name="price"
                    value={priceRange}
                    onChange={(d) => setPriceRange(d.target.value)}
                    className="w-full bg-transparent outline-none text-[14px] font-medium"
                  >
                    <option value="">$500k - $2M</option>
                    {bandsFor(tab.toLowerCase() as "buy" | "rent" | "sell").map(
                      (b) => (
                        <option key={b.key} value={b.key}>
                          {b.label}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              </div>
              <div className="px-3 py-3 lg:px-4 flex items-center">
                <button
                  type="submit"
                  className="w-full lg:w-auto whitespace-nowrap px-8 py-3.5 rounded-full bg-[#102E26] text-white text-[13px] font-medium hover:bg-[#14352E] transition flex items-center justify-center gap-2"
                >
                  <SearchNormal1 size={16} />
                  {" Search Properties"}
                </button>
              </div>
            </form>
          </div>
          <div className="mx-auto max-w-[1120px] mt-3 flex items-center justify-between text-[11px] text-white/60 px-2">
            <span>Trusted by 10k+ clients • 15+ cities</span>
            <span className="hidden lg:block">
              Scroll <ArrowDown size={12} className="inline" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
