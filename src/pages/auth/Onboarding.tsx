import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Upload, Briefcase, User, GraduationCap, Image, ArrowRight } from 'lucide-react';

type Purpose = 'Business' | 'Creator' | 'Student';

interface Step {
  id: string;
  title: string;
  description: string;
}

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [brandName, setBrandName] = useState('');
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [selectedPurpose, setSelectedPurpose] = useState<Purpose | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { updateBrandInfo, isAuthenticated } = useUser();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const steps: Step[] = [
    {
      id: 'brand',
      title: 'Brand Information',
      description: 'Let\'s set up your brand identity',
    },
    {
      id: 'purpose',
      title: 'Select Your Purpose',
      description: 'Tell us how you plan to use Genify',
    },
    {
      id: 'complete',
      title: 'You\'re All Set!',
      description: 'Now you can start using Genify',
    },
  ];

  // Handle logo upload
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Preview the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    setSelectedLogo(file);
  };

  // Move to next step
  const handleNext = () => {
    // Validate current step
    if (currentStep === 0 && !brandName.trim()) {
      showToast('Please enter your brand name', 'error');
      return;
    }
    
    if (currentStep === 1 && !selectedPurpose) {
      showToast('Please select your purpose', 'error');
      return;
    }
    
    // If on the last step, complete onboarding
    if (currentStep === steps.length - 1) {
      handleComplete();
      return;
    }
    
    // Move to next step
    setCurrentStep(prev => prev + 1);
  };

  // Move to previous step
  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  // Complete onboarding
  const handleComplete = () => {
    setIsLoading(true);
    
    // Update user brand info
    updateBrandInfo({
      name: brandName,
      logo: logoPreview,
      purpose: selectedPurpose || 'Business',
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      showToast('Onboarding completed successfully!', 'success');
      navigate('/');
    }, 1000);
  };

  // Purpose options
  const purposeOptions: { value: Purpose; label: string; icon: React.ReactNode; description: string }[] = [
    {
      value: 'Business',
      label: 'Business',
      icon: <Briefcase className="mb-2 h-6 w-6" />,
      description: 'Create content for your business, marketing, or company blog',
    },
    {
      value: 'Creator',
      label: 'Creator',
      icon: <User className="mb-2 h-6 w-6" />,
      description: 'Produce content for social media, newsletters, or creative projects',
    },
    {
      value: 'Student',
      label: 'Student',
      icon: <GraduationCap className="mb-2 h-6 w-6" />,
      description: 'Generate study materials, essays, or research assistance',
    },
  ];

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <Input
              label="Brand Name"
              placeholder="Enter your brand name"
              value={brandName}
              onChange={e => setBrandName(e.target.value)}
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Brand Logo (optional)
              </label>
              <div className="mt-1 flex items-center">
                <div className="w-16 h-16 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center overflow-hidden mr-4">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                  ) : (
                    <Image className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <label className="cursor-pointer">
                  <span className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-purple-400">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleLogoChange}
                  />
                </label>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, or GIF up to 2MB. Recommended size: 256x256px
              </p>
            </div>
          </div>
        );
      
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {purposeOptions.map(option => (
              <div
                key={option.value}
                onClick={() => setSelectedPurpose(option.value)}
                className={`
                  cursor-pointer rounded-lg border p-4 flex flex-col items-center text-center
                  transition-all duration-200
                  ${selectedPurpose === option.value
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-950 dark:border-purple-400'
                    : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }
                `}
              >
                {option.icon}
                <h3 className="font-medium">{option.label}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        );
      
      case 2:
        return (
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            
            <h3 className="text-xl font-medium mb-2">Congratulations, {brandName || 'User'}!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your account has been set up successfully. You're ready to start creating amazing content with Genify.
            </p>
            
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-100 dark:border-purple-900 text-center">
                <h4 className="font-medium text-purple-600 dark:text-purple-400">Welcome Gift</h4>
                <p className="text-sm">50 free credits</p>
              </div>
              <div className="bg-teal-50 dark:bg-teal-950 p-4 rounded-lg border border-teal-100 dark:border-teal-900 text-center">
                <h4 className="font-medium text-teal-600 dark:text-teal-400">Priority</h4>
                <p className="text-sm">Support access</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
        {/* Progress bar */}
        <div className="bg-gray-50 dark:bg-gray-850 border-b dark:border-gray-700">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">Set up your account</h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Step content */}
        <div className="px-6 py-6">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h3 className="text-lg font-semibold">{steps[currentStep].title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{steps[currentStep].description}</p>
            </div>
            
            {renderStepContent()}
          </motion.div>
        </div>
        
        {/* Navigation buttons */}
        <div className="bg-gray-50 dark:bg-gray-850 px-6 py-4 border-t dark:border-gray-700 flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          
          <Button
            variant="primary"
            onClick={handleNext}
            rightIcon={currentStep < steps.length - 1 ? <ArrowRight size={16} /> : undefined}
            isLoading={isLoading}
          >
            {currentStep < steps.length - 1 ? 'Continue' : 'Get Started'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;