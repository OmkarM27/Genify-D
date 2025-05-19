import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  brandInfo?: {
    name: string;
    logo?: string;
    purpose: 'Business' | 'Creator' | 'Student';
    colors?: string[];
  };
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  updateBrandInfo: (data: Partial<User['brandInfo']>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Simulate authentication functions
  const login = async (email: string, password: string) => {
    console.log('Logging in with:', email, password);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock successful login
    setUser({
      id: '1',
      name: 'Demo User',
      email,
      role: 'user',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    });
  };

  const signUp = async (name: string, email: string, password: string) => {
    console.log('Signing up:', name, email, password);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful registration
    setUser({
      id: '2',
      name,
      email,
      role: 'user'
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (data: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...data } : null);
  };

  const updateBrandInfo = (data: Partial<User['brandInfo']>) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        brandInfo: {
          ...prev.brandInfo,
          ...data
        }
      };
    });
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      signUp, 
      logout, 
      updateUser,
      updateBrandInfo
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};