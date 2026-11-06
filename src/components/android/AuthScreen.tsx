import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, ArrowRight, Brain } from 'lucide-react';
import { User } from '../../types';

interface AuthProps {
  onLoginSuccess: (user: User) => void;
}

export const AuthScreen: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [name, setName] = useState<string>('Ayaan Ansari');
  const [email, setEmail] = useState<string>('ansarish3hnaz@gmail.com');
  const [password, setPassword] = useState<string>('••••••••');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid academic or personal email.');
      return;
    }
    setError('');
    onLoginSuccess({
      id: 'usr_btech_ds_01',
      name: isRegister ? name : (name || 'Ayaan Ansari'),
      email,
      createdAt: new Date().toISOString(),
    });
  };

  const handleGuestLogin = () => {
    onLoginSuccess({
      id: 'usr_guest_demo',
      name: 'Guest Scholar',
      email: 'guest@focuszone.ai',
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#F8F9FC]">
      {/* Top Brand Logo */}
      <div className="pt-4 text-center space-y-2">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-[#8B72E8] flex items-center justify-center text-white shadow-xs">
          <Brain className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-extrabold text-[#20243A] tracking-tight">
          {isRegister ? 'Create Your Account' : 'Welcome Back'}
        </h2>
        <p className="text-xs text-[#777D90]">
          {isRegister
            ? 'Start tracking deep work & predicting session success'
            : 'Sign in to access your study planner and ML models'}
        </p>
      </div>

      {/* Auth Card */}
      <form onSubmit={handleSubmit} className="my-auto p-5 rounded-2xl bg-white border border-[#E8EAF0] shadow-xs space-y-3.5">
        {error && (
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
            {error}
          </div>
        )}

        {isRegister && (
          <div>
            <label className="text-[11px] text-[#777D90] font-medium block mb-1">Full Name</label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F8F9FC] border border-[#E8EAF0] focus-within:border-[#8B72E8] focus-within:bg-white">
              <UserIcon className="w-4 h-4 text-[#777D90]" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ayaan Ansari"
                required
                className="w-full text-xs text-[#20243A] bg-transparent focus:outline-none"
              />
            </div>
          </div>
        )}

        <div>
          <label className="text-[11px] text-[#777D90] font-medium block mb-1">Email Address</label>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F8F9FC] border border-[#E8EAF0] focus-within:border-[#8B72E8] focus-within:bg-white">
            <Mail className="w-4 h-4 text-[#777D90]" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ansarish3hnaz@gmail.com"
              required
              className="w-full text-xs text-[#20243A] bg-transparent focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] text-[#777D90] font-medium block mb-1">Password</label>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F8F9FC] border border-[#E8EAF0] focus-within:border-[#8B72E8] focus-within:bg-white">
            <Lock className="w-4 h-4 text-[#777D90]" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full text-xs text-[#20243A] bg-transparent focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-11 rounded-xl bg-[#8B72E8] hover:bg-[#7b61df] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-[0.98] cursor-pointer mt-2"
        >
          <span>{isRegister ? 'CREATE ACCOUNT' : 'SIGN IN'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-[#777D90] hover:text-[#20243A]"
          >
            {isRegister
              ? 'Already registered? Sign In'
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </form>

      {/* Guest Mode & Footer */}
      <div className="space-y-2 text-center pb-2">
        <button
          type="button"
          onClick={handleGuestLogin}
          className="w-full h-10 rounded-xl bg-white border border-[#E8EAF0] text-[#20243A] font-semibold text-xs hover:border-[#8B72E8]/40 transition-colors cursor-pointer shadow-xs"
        >
          Explore as Guest (Instant Access)
        </button>
        <span className="text-[10px] text-[#777D90] block">
          Firebase Authentication & Room DB Local Sync
        </span>
      </div>
    </div>
  );
};
