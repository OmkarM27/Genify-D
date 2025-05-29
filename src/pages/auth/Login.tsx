import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Mail, Lock, Zap } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUser();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password', 'error');
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
      navigate('/otp-verification');
    } catch {
      showToast('Invalid credentials. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center px-4 py-12 font-sans relative overflow-hidden">
      {/* Optional background particles / animation here */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row w-full max-w-6xl shadow-xl rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl"
      >
        {/* Left: Welcome / Visual */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-10 bg-[radial-gradient(circle_at_20%_20%,#2a2a2a,#0b0b0d)]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-4"
          >
            <div className="animate-pulse mb-4">
              <div className="bg-gradient-to-tr from-purple-600 to-pink-500 p-4 rounded-full inline-block shadow-lg">
                <Zap className="h-10 w-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-semibold">Welcome Back!</h2>
            <p className="text-gray-300 text-sm">Your AI-powered creative workspace awaits.</p>
            <img
              src="https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Visual"
              className="rounded-xl shadow-2xl max-w-sm mx-auto border border-white/10"
            />
          </motion.div>
        </div>

        {/* Right: Login Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 lg:p-14 bg-black/10 backdrop-blur-xl">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
              G
            </div>
            <h1 className="text-2xl font-semibold">Genify</h1>
          </div>

          <h2 className="text-3xl font-bold mb-1 text-white/90">Sign in to Genify</h2>
          <p className="text-gray-400 mb-6 text-sm">Access your creative control panel</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={18} />}
              className="bg-white/10 backdrop-blur border border-white/10 text-white focus:ring-purple-500"
              required
            />

            <div>
              <div className="flex justify-between mb-1 text-sm text-white/70">
                <label>Password</label>
                <Link to="#" className="text-purple-400 hover:underline hover:text-purple-300 transition">Forgot password?</Link>
              </div>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock size={18} />}
                className="bg-white/10 backdrop-blur border border-white/10 text-white focus:ring-purple-500"
                required
              />
            </div>

            <motion.div whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.02 }}>
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                fullWidth
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 shadow-md transition"
              >
                Log in
              </Button>
            </motion.div>

            <div className="flex items-center gap-4 text-white/40 text-sm">
              <div className="flex-grow h-px bg-white/20"></div>
              <span>or continue with</span>
              <div className="flex-grow h-px bg-white/20"></div>
            </div>

            <Button
              type="button"
              variant="outline"
              fullWidth
              className="bg-white/10 text-white border border-white/10 hover:bg-white/20 transition flex items-center justify-center gap-2 rounded-lg"
              leftIcon={
                <div className="bg-white rounded-full p-1">
                  <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#EA4335" d="M12 10.8V14.4h6.6c-.3 1.8-2 5.4-6.6 5.4a6.6 6.6 0 1 1 0-13.2c1.8 0 3.3.6 4.5 1.8l3-3a10.9 10.9 0 0 0-7.5-3 11 11 0 1 0 0 22c6.3 0 10.5-4.5 10.5-10.5 0-.9-.1-1.5-.3-2.1H12Z" />
                  </svg>
                </div>
              }
            >
              Log in with Google
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-purple-400 hover:text-purple-300 hover:underline transition">Sign up</Link>
          </p>

          <p className="mt-4 text-center text-xs text-white/30 italic">Powered by Genify AI</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
