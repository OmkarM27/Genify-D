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
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1c1f2b] via-[#1e2232] to-[#191d28] text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row w-full max-w-6xl shadow-2xl rounded-3xl overflow-hidden bg-opacity-10 backdrop-blur-xl border border-white/10"
      >
        {/* Left: Visual */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-purple-800/30 to-pink-600/20 p-8 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="mb-4">
              <div className="bg-gradient-to-tr from-purple-600 to-pink-500 p-4 rounded-full inline-block">
                <Zap className="h-10 w-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-semibold mb-2">Welcome back!</h2>
            <p className="text-gray-300 mb-6 px-4">
              Log in to continue creating amazing content with Genify’s powerful AI tools
            </p>
            <img
              src="https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="AI Visual"
              className="rounded-xl shadow-lg max-w-sm mx-auto"
            />
          </motion.div>
        </div>

        {/* Right: Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 lg:p-14 bg-white/5 backdrop-blur-2xl">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-full flex items-center justify-center font-bold mr-3">
              G
            </div>
            <h1 className="text-2xl font-semibold">Genify</h1>
          </div>

          <h2 className="text-3xl font-bold mb-2">Log in</h2>
          <p className="text-gray-300 mb-6">Welcome back! Please enter your details</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={18} />}
              required
            />

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm text-white/70">Password</label>
                <Link to="#" className="text-sm text-purple-400 hover:underline">Forgot password?</Link>
              </div>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock size={18} />}
                required
              />
            </div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                fullWidth
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
              >
                Log in
              </Button>
            </motion.div>

            {/* Divider */}
            <div className="flex items-center gap-4 text-white/40 text-sm">
              <div className="flex-grow h-px bg-white/20"></div>
              <span>Or continue with</span>
              <div className="flex-grow h-px bg-white/20"></div>
            </div>

            {/* Google Button */}
            <Button
              type="button"
              variant="outline"
              fullWidth
              className="bg-white/10 text-white border border-white/30 hover:bg-white/20"
              leftIcon={
                <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                  {/* Google logo paths here */}
                </svg>
              }
            >
              Log in with Google
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-purple-400 hover:underline">Sign up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
