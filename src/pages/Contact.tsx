import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Send } from "lucide-react";

const Contact = () => {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formStatus !== "idle") return;
    
    setFormStatus("submitting");
    
    // Flight time and success reveal
    setTimeout(() => {
      setFormStatus("success");
      
      // Reset back to idle for subsequent clicks
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }, 1800);
  };
  return (
    <div className="min-h-screen bg-[#f5f5f0] text-stone-900 flex flex-col pt-24 pb-0 relative overflow-x-hidden">
      <Navbar view="grid" onViewChange={() => { }} hideViewSwitcher={true} />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 md:px-10 lg:px-20 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative pl-0 lg:pl-10">

          {/* Left Column - Details */}
          <div className="w-full lg:w-5/12 space-y-10">
            <div>
              <p className="text-stone-500 font-medium mb-4 text-sm tracking-wide">Visit our gallery at:</p>
              <h1 className="text-3xl md:text-5xl font-serif text-[#a38a59] mb-8 tracking-wide leading-tight">
                COSMO GRANITES PVT LTD
              </h1>
            </div>

            <div className="space-y-8 text-stone-700 font-light">
              {/* Address */}
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#a38a59] shrink-0 mt-1 opacity-80" strokeWidth={1.5} />
                <div className="text-[15px] leading-relaxed">
                  <p className="font-semibold text-stone-900">Address: <span className="font-normal text-stone-600">118, Old Mahabalipuram Road, Karapakkam, Chennai-600 119</span></p>
                  <p className="font-semibold text-stone-900 mt-4 mb-1">Gallery Timings:</p>
                  <p className="text-stone-600">Mon – Sat 9:30AM to 6:30 PM, Sun: 10 AM to 5 PM</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#a38a59] shrink-0 mt-1 opacity-80" strokeWidth={1.5} />
                <div className="text-[15px] leading-relaxed">
                  <p><span className="font-semibold text-stone-900">Reception:</span> <span className="text-stone-600">+91 44 48680111 +91 44 48680 222 / 333 / 44</span></p>
                  <p className="mt-5 text-[14px] sm:text-[15px]"><span className="font-semibold text-stone-900">Mobile & WhatsApp</span> <span className="text-stone-600">+91 9384845224 <span className="text-stone-400 text-[13px] tracking-tight">(For Sales and Support Only)</span></span></p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#a38a59] shrink-0 mt-1 opacity-80" strokeWidth={1.5} />
                <div className="space-y-4 text-[15px] leading-relaxed text-stone-600">
                  <p><span className="font-semibold text-stone-900">E-mail :</span> cosmosales@cosmofloor.com, info@cosmofloor.com</p>
                  <p><span className="font-semibold text-stone-900">For Careers, Email :</span> administration@cosmofloor.com</p>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="w-full h-[220px] md:h-[320px] bg-stone-200 mt-8 md:mt-12 rounded overflow-hidden shadow-sm border border-stone-200">
              <iframe
                src="https://maps.google.com/maps?q=12.9118489,80.2289743&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cosmo Granites Pvt Ltd Location"
              ></iframe>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full lg:w-7/12 mt-12 lg:mt-0">
            <form onSubmit={handleSubmit} className="bg-transparent flex flex-col gap-6 w-full max-w-xl">

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col gap-2 w-full group">
                  <label htmlFor="firstName" className="text-[13px] font-medium text-stone-500">Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="px-4 py-3 border border-primary/20 rounded-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-stone-800 bg-white"
                  />
                  <span className="text-xs text-stone-400 mt-0.5">First Name</span>
                </div>
                <div className="flex flex-col gap-2 w-full mt-5 md:mt-0 group">
                  <label htmlFor="lastName" className="text-[13px] font-medium text-stone-500 hidden md:block opacity-0">Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className="px-4 py-3 border border-primary/20 rounded-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-stone-800 bg-white"
                  />
                  <span className="text-xs text-stone-400 mt-0.5">Last Name</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 group">
                <label htmlFor="email" className="text-[13px] font-medium text-stone-500">Email</label>
                <input
                  type="email"
                  id="email"
                  className="px-4 py-3 border border-primary/20 rounded-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-stone-800 bg-white"
                />
              </div>

              <div className="flex flex-col gap-2 group">
                <label htmlFor="mobile" className="text-[13px] font-medium text-stone-500">Mobile</label>
                <input
                  type="tel"
                  id="mobile"
                  className="px-4 py-3 border border-primary/20 rounded-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-stone-800 bg-white"
                />
              </div>

              <div className="flex flex-col gap-2 group">
                <label htmlFor="enquiry" className="text-[13px] font-medium text-stone-500">Enquiring For</label>
                <div className="relative">
                  <select
                    id="enquiry"
                    className="w-full px-4 py-3 border border-primary/20 rounded-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-stone-800 appearance-none bg-white cursor-pointer"
                  >
                    <option value="">-- Please Select --</option>
                    <option value="granite">Granite</option>
                    <option value="marble">Marble</option>
                    <option value="wood">Wood</option>
                    <option value="fletcher">Fletcher</option>
                    <option value="aluk-doors">Aluk Doors and Windows</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 group">
                <label htmlFor="message" className="text-[13px] font-medium text-stone-500">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="px-4 py-3 border border-primary/20 rounded-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-stone-800 resize-none bg-white"
                ></textarea>
              </div>

              <div className="mt-6 flex justify-start relative h-[48px] w-full">
                <motion.button 
                  type="submit" 
                  disabled={formStatus !== "idle"}
                  className="absolute left-0 top-0 overflow-hidden text-white tracking-widest text-[13px] font-medium flex justify-center items-center disabled:opacity-90 disabled:cursor-not-allowed z-50 origin-center"
                  initial={false}
                  animate={
                    formStatus === "idle" ? { 
                      width: 160, 
                      height: 48, 
                      borderRadius: 4, 
                      x: 0, 
                      y: 0, 
                      scale: 1, 
                      opacity: 1,
                      backgroundColor: "#2a2a2a",
                      rotate: 0,
                    } :
                    formStatus === "submitting" ? { 
                      width: [160, 48, 48, 48, 48], 
                      height: [48, 48, 48, 48, 48], 
                      borderRadius: [4, 24, 24, 24, 24],
                      x: [0, 0, -30, 800, 800], 
                      y: [0, 0, 30, -800, -800],
                      scale: [1, 1, 1.2, 0, 0],
                      opacity: [1, 1, 1, 0, 0],
                      backgroundColor: ["#2a2a2a", "#c8a47a", "#c8a47a", "#c8a47a", "#c8a47a"],
                      rotate: [0, 0, -20, 60, 60]
                    } :
                    { // success
                      width: 160, 
                      height: 48, 
                      borderRadius: 4, 
                      x: 0, 
                      y: 0, 
                      scale: 1, 
                      opacity: 1,
                      backgroundColor: "#2a2a2a",
                      rotate: 0
                    }
                  }
                  transition={
                    formStatus === "submitting" 
                      ? { duration: 1.8, times: [0, 0.25, 0.45, 0.85, 1], ease: "easeInOut" }
                      : { duration: 0.3 }
                  }
                >
                  <AnimatePresence mode="wait">
                    {formStatus === "idle" && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.15 }}
                      >
                        SUBMIT
                      </motion.span>
                    )}
                    {formStatus === "submitting" && (
                      <motion.div
                        key="submitting"
                        initial={{ opacity: 0, scale: 0, rotate: -45 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        <Send size={18} strokeWidth={2} className="text-white relative right-[1px] bottom-[1px]" />
                      </motion.div>
                    )}
                    {formStatus === "success" && (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        SENT!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
