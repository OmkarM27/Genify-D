import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useToast } from '../../context/ToastContext';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useUser();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const isEmailValid = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const passwordStrength = password.length >= 8 ? 'strong' : password.length >= 4 ? 'medium' : 'weak';

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
    <>
      {/* Gradient border animation */}
      <style>
        {`
          .glass-border {
            background: linear-gradient(270deg, #a855f7, #ec4899, #a855f7);
            background-size: 600% 600%;
            animation: gradient-rotate 12s ease infinite;
            padding: 2px;
            border-radius: 24px;
          }
          @keyframes gradient-rotate {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
          }
        `}
      </style>

      <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center font-[Sora] px-6">
        <div className="w-full max-w-7xl flex flex-col md:flex-row gap-10">

          {/* LEFT PANEL */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <div className="glass-border">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-xl p-10">
                <div className="mb-6 flex items-center gap-3 animate-pulse">
                  <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-2 rounded-full">
                    <Sparkles size={22} />
                  </div>
                  <h1 className="text-2xl font-bold">Genify</h1>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                  Built for creators.<br /> Powered by AI.<br /> Designed to save time.
                </h2>
                <p className="text-sm text-white/70 mb-4">Join 2k+ marketers and founders automating content workflows.</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT PANEL */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <div className="glass-border">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-xl p-10">
                <h2 className="text-xl font-semibold mb-6">Create your Genify account</h2>

                <form onSubmit={handleSubmit} className="space-y-7">

                  {/* NAME */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="relative group">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder=" "
                        className="w-full bg-white/10 text-white px-4 pt-5 pb-2 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-purple-500 backdrop-blur-md placeholder-transparent"
                      />
                      <label className="absolute left-4 top-2 text-sm text-white/50 transition-all group-focus-within:top-1 group-focus-within:text-xs">
                        Full Name
                      </label>
                      <User className="absolute right-4 top-3 text-white/40 group-focus-within:text-white transition" size={18} />
                    </div>
                  </motion.div>

                  {/* EMAIL */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="relative group">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder=" "
                        className="w-full bg-white/10 text-white px-4 pt-5 pb-2 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-purple-500 backdrop-blur-md placeholder-transparent"
                      />
                      <label className="absolute left-4 top-2 text-sm text-white/50 transition-all group-focus-within:top-1 group-focus-within:text-xs">
                        Email Address
                      </label>
                      <Mail className="absolute right-4 top-3 text-white/40 group-focus-within:text-white transition" size={18} />
                    </div>
                    {email && (
                      <p className={`text-xs mt-1 ${isEmailValid ? 'text-green-400' : 'text-red-400'}`}>
                        {isEmailValid ? 'Valid email ✅' : 'Invalid email'}
                      </p>
                    )}
                  </motion.div>

                  {/* PASSWORD */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="relative group">
                      <input
                        type={showPwd ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder=" "
                        className="w-full bg-white/10 text-white px-4 pt-5 pb-2 rounded-lg border border-white/10 focus:outline-none focus:ring-1 focus:ring-purple-500 backdrop-blur-md placeholder-transparent"
                      />
                      <label className="absolute left-4 top-2 text-sm text-white/50 transition-all group-focus-within:top-1 group-focus-within:text-xs">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowPwd(!showPwd)}
                        className="absolute right-10 top-3 text-white/40 hover:text-white"
                      >
                        {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <Lock className="absolute right-4 top-3 text-white/40 group-focus-within:text-white" size={18} />
                    </div>
                    {password && (
                      <p className={`text-xs mt-1 ${passwordStrength === 'strong' ? 'text-green-400' : passwordStrength === 'medium' ? 'text-yellow-400' : 'text-red-400'}`}>
                        Password strength: {passwordStrength}
                      </p>
                    )}
                  </motion.div>

                  {/* SUBMIT */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 rounded-lg transition-all hover:scale-105 hover:brightness-110 shadow-lg"
                    >
                      {isLoading ? 'Creating account...' : 'Create Account'}
                    </button>
                  </motion.div>

                </form>

                <div className="text-sm text-center mt-6 text-white/60">
                  Already have an account?{' '}
                  <Link to="/login" className="text-purple-400 hover:underline hover:text-purple-300">
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
};

export default SignUp;
