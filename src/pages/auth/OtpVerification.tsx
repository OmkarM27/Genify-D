import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = () => {
    const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const s = (timeLeft % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (value.length > 1) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('');
    const newOtp = [...otp];
    digits.forEach((d, i) => { if (i < 6) newOtp[i] = d; });
    setOtp(newOtp);
    const nextIndex = newOtp.findIndex(val => !val);
    inputRefs.current[nextIndex !== -1 ? nextIndex : 5]?.focus();
  };

  const handleResend = () => {
    setTimeLeft(60);
    showToast('Verification code resent', 'success');
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length !== 6) {
      showToast('Please enter all 6 digits', 'error');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast('Verification successful!', 'success');
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1c2b] via-[#1f2235] to-[#181b28] flex items-center justify-center px-4 py-12 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8"
      >
        <button
          onClick={() => navigate('/login')}
          className="mb-6 flex items-center text-sm text-purple-300 hover:text-purple-100 transition"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to login
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto bg-purple-600 rounded-full flex items-center justify-center mb-4">
            <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15.59 14.3L19 11l-9-9-9 9 3.41 3.3m5.59-7.1v14.6" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-1">Verification Code</h2>
          <p className="text-sm text-white/60">
            We’ve sent a verification code to your email
          </p>
        </div>

        <div className="flex justify-center space-x-2 mb-6">
          {otp.map((digit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <input
                ref={el => inputRefs.current[i] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(e, i)}
                onKeyDown={e => handleKeyDown(e, i)}
                onPaste={i === 0 ? handlePaste : undefined}
                className="w-12 h-14 text-center text-lg font-semibold bg-white/10 border border-white/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                autoFocus={i === 0}
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center text-sm text-white/50 mb-6">
          {timeLeft > 0 ? (
            <>Resend code in {formatTime()}</>
          ) : (
            <>Didn't receive it?{' '}
              <button onClick={handleResend} className="text-purple-400 hover:underline font-medium">
                Resend
              </button>
            </>
          )}
        </div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Button
            onClick={handleVerify}
            isLoading={isLoading}
            fullWidth
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:opacity-90 transition"
          >
            Verify
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OtpVerification;
