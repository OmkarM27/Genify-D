import { useState } from 'react';
import { Check, Zap, BadgeCheck, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    features: ['10,000 words', 'Basic tools', 'Limited support'],
    icon: <Zap className="text-purple-400 w-6 h-6" />,
  },
  {
    name: 'Pro',
    price: { monthly: 19, yearly: 180 },
    features: ['100,000 words', 'All tools unlocked', 'Priority support'],
    icon: <BadgeCheck className="text-purple-400 w-6 h-6" />,
  },
  {
    name: 'Enterprise',
    price: { monthly: 49, yearly: 480 },
    features: ['Unlimited usage', 'Custom AI workflows', 'Dedicated manager'],
    icon: <Shield className="text-purple-400 w-6 h-6" />,
  },
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="w-full h-full overflow-y-auto px-6 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-white">Choose your plan</h1>
        <p className="text-white/60 mt-2">Flexible pricing to suit your content needs</p>

        {/* Billing Toggle */}
        <div className="mt-6 inline-flex items-center bg-white/10 border border-white/20 rounded-full px-1 py-1">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              billingCycle === 'monthly' ? 'bg-purple-600 text-white' : 'text-white/70'
            }`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              billingCycle === 'yearly' ? 'bg-purple-600 text-white' : 'text-white/70'
            }`}
            onClick={() => setBillingCycle('yearly')}
          >
            Yearly <span className="text-green-400 ml-1 text-xs">(Save 20%)</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            layout
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-md p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">{plan.icon}<h2 className="text-xl font-semibold text-white">{plan.name}</h2></div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={billingCycle}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-4xl font-bold text-white">
                    {plan.price[billingCycle] === 0 ? 'Free' : `$${plan.price[billingCycle]}`}
                    <span className="text-sm font-normal text-white/50"> / {billingCycle}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
              <ul className="mt-6 space-y-2 text-white/80 text-sm">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            <button className="mt-6 w-full bg-purple-600 hover:bg-purple-700 transition text-white text-sm px-4 py-2 rounded-lg">
              {plan.name === 'Free' ? 'Start for Free' : 'Choose Plan'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
