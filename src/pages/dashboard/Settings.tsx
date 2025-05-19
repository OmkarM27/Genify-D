import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';

const transition = { duration: 0.25, ease: 'easeOut' };

const Section = ({ title, children, index, activeIndex, setActiveIndex }: any) => {
  const isOpen = activeIndex === index;

  return (
    <div className="border border-white/10 rounded-xl bg-white/5 mb-4 shadow-md">
      <button
        onClick={() => setActiveIndex(isOpen ? null : index)}
        className="flex items-center justify-between w-full px-6 py-4 text-left hover:bg-white/10 transition"
      >
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={transition}>
          <ChevronRight className="w-5 h-5 text-purple-400" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0, scaleY: 0.95 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.95 }}
            transition={transition}
            className="px-6 pb-6 origin-top"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Settings = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="w-full h-full overflow-y-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Settings</h1>
        <p className="text-sm text-white/60">Customize your experience, preferences, and integrations.</p>
      </div>

      <div className="space-y-6">
        <Section title="👤 Profile Settings" index={0} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-white/70">Full Name</label>
              <input type="text" defaultValue="Genify User" className="mt-1 w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20" />
            </div>
            <div>
              <label className="text-sm text-white/70">Email</label>
              <input type="email" defaultValue="user@genify.ai" className="mt-1 w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20" />
            </div>
            <div className="col-span-full">
              <label className="text-sm text-white/70">Phone Number</label>
              <input type="tel" placeholder="+91 9000000000" className="mt-1 w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20" />
            </div>
          </div>
        </Section>

        <Section title="💳 Subscription & Billing" index={1} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
          <div className="space-y-4 text-sm text-white/80">
            <div className="flex justify-between items-center">
              <span>Plan</span>
              <span className="font-semibold text-purple-400">Pro (Yearly)</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Usage</span>
              <span>78,000 / 100,000 words</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Payment Method</span>
              <span>**** **** **** 4242</span>
            </div>
            <button className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition">
              Manage Billing
            </button>
          </div>
        </Section>

        <Section title="👥 Team & Collaboration" index={2} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
          <div className="space-y-4">
            <p className="text-sm text-white/70">Invite team member</p>
            <input type="email" placeholder="teammate@genify.ai" className="w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20" />
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition">
              Send Invite
            </button>
          </div>
        </Section>

        <Section title="🤖 AI Preferences" index={3} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-white/70">Language</label>
              <select className="mt-1 w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20">
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-white/70">Tone</label>
              <select className="mt-1 w-full bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20">
                <option>Professional</option>
                <option>Friendly</option>
                <option>Witty</option>
              </select>
            </div>
          </div>
        </Section>

        <Section title="🔐 Data & Privacy" index={4} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
          <div className="space-y-3 text-sm text-white/80">
            <p>Manage your data and privacy settings.</p>
            <button className="bg-transparent border border-purple-400 hover:bg-purple-600 hover:text-white text-purple-400 px-4 py-2 rounded-lg transition">
              Download My Data
            </button>
            <button className="bg-transparent border border-red-500 hover:bg-red-700 hover:text-white text-red-500 px-4 py-2 rounded-lg transition">
              Delete Account
            </button>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Settings;
