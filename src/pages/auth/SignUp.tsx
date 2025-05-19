import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { User, Mail, Lock, Sparkles } from 'lucide-react';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useUser();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    try {
      setIsLoading(true);
      await signUp(name, email, password);
      showToast('Account created successfully!', 'success');
      navigate('/onboarding');
    } catch {
      showToast('Failed to create account. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex md:flex-row flex-col bg-gradient-to-br from-[#1e1e2f] via-[#1f2235] to-[#202439] text-white overflow-hidden">
      
      {/* Left Panel - Hero */}
      <div className="hidden md:flex w-1/2 items-center justify-center px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md"
        >
          <div className="mb-6">
            <div className="bg-gradient-to-tr from-purple-600 to-pink-500 p-4 rounded-full inline-block shadow-lg">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Supercharge Your Creative Workflow
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Genify helps thousands of creators and businesses unlock new levels of productivity with powerful AI content tools.
          </p>

          <div className="grid grid-cols-3 gap-4 text-left mb-8">
            {[
              { label: 'Blog automation', value: '3x faster' },
              { label: 'Social reach', value: '5x more' },
              { label: 'Time saved', value: '12+ hrs/wk' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="bg-white/5 p-4 rounded-xl shadow-inner border border-white/10"
              >
                <p className="text-xs text-white/60">{stat.label}</p>
                <p className="text-base font-bold">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center space-x-3"
          >
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full bg-white/10 border border-white/20 shadow-sm overflow-hidden transition hover:scale-105"
              >
                <img
                  src={`https://randomuser.me/api/portraits/thumb/${i % 2 === 0 ? 'women' : 'men'}/${i + 10}.jpg`}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            <div className="w-9 h-9 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center text-xs font-semibold shadow-sm">
              +2k
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Panel - Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-10"
        >
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
              G
            </div>
            <h1 className="text-2xl font-semibold">Genify</h1>
          </div>

          <h2 className="text-3xl font-bold mb-2">Sign up</h2>
          <p className="text-white/70 mb-6">Create your account to get started with Genify</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="text"
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User size={18} />}
              required
            />

            <Input
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={18} />}
              required
            />

            <Input
              type="password"
              label="Password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock size={18} />}
              helpText="Password must be at least 8 characters"
              required
            />

            <motion.div whileHover={{ scale: 1.02 }}>
              <Button
                type="submit"
                isLoading={isLoading}
                fullWidth
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white font-semibold rounded-lg transition"
              >
                Create Account
              </Button>
            </motion.div>

            {/* Divider */}
            <div className="flex items-center gap-4 text-white/40 text-sm">
              <div className="flex-grow h-px bg-white/20"></div>
              <span>Or continue with</span>
              <div className="flex-grow h-px bg-white/20"></div>
            </div>

            <Button
              type="button"
              variant="outline"
              fullWidth
              className="bg-white/10 text-white border border-white/30 hover:bg-white/20"
              leftIcon={
                <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                  {/* Google logo paths */}
                </svg>
              }
            >
              Sign up with Google
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-white/60">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-400 hover:underline">Log in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
