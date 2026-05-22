import React, { useState } from 'react';
import { Menu, X, Lock, HelpCircle } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  scrollToSection: (id: string) => void;
}

export default function Navbar({ currentTab, setCurrentTab, scrollToSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: '전문분야', sectionId: 'practice-areas' },
    { label: '해결사례', sectionId: 'success-cases' },
    { label: '변호사 소개', sectionId: 'lawyers' },
    { label: '오시는 길', sectionId: 'directions' }
  ];

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    setCurrentTab('home');
    // Allow a tick for tab change if we were in other view
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 50);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-brand-navy/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo / Brand Name */}
        <button 
          onClick={() => { setCurrentTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="group flex items-center space-x-1 text-left focus:outline-none"
        >
          <Logo 
            className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-102" 
            iconColor="text-white"
            textColor="text-slate-100"
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item.sectionId}
              onClick={() => handleNavClick(item.sectionId)}
              className="text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-brand-gold focus:outline-none cursor-pointer"
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => { setCurrentTab('booking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`rounded-sm px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
              currentTab === 'booking'
                ? 'bg-brand-gold text-brand-navy'
                : 'border border-brand-gold/60 text-brand-gold hover:bg-brand-gold hover:text-brand-navy'
            }`}
          >
            실시간 상담예약
          </button>

          <div className="h-4 w-[1px] bg-slate-800" />

          {/* Hidden Admin Access styled elegantly as private lock */}
          <button
            onClick={() => { setCurrentTab('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`flex items-center space-x-1 rounded px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              currentTab === 'admin'
                ? 'bg-slate-700 text-brand-gold border border-brand-gold'
                : 'text-slate-500 hover:text-brand-gold hover:bg-slate-900/60'
            }`}
          >
            <Lock className="h-3 w-3" />
            <span>관리자</span>
          </button>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex items-center space-x-3 md:hidden">
          <button
            onClick={() => { setCurrentTab('booking'); }}
            className="rounded-sm bg-brand-gold px-3.5 py-1.5 text-xs font-semibold text-brand-navy active:scale-95"
          >
            예약신청
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-slate-400 hover:text-brand-gold focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="border-t border-slate-800 bg-brand-navy px-4 py-6 md:hidden">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => handleNavClick(item.sectionId)}
                className="w-full text-left font-serif text-lg py-2 pl-2 text-slate-300 border-l border-slate-800 hover:border-brand-gold hover:text-brand-gold focus:outline-none"
              >
                {item.label}
              </button>
            ))}

            <div className="h-[1px] bg-slate-800 my-2" />

            <button
              onClick={() => {
                setIsOpen(false);
                setCurrentTab('booking');
                window.scrollTo({ top: 0 });
              }}
              className="flex w-full items-center justify-center rounded-sm bg-brand-gold py-3 text-center text-sm font-semibold text-brand-navy transition duration-200"
            >
              실시간 온라인 예약
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                setCurrentTab('admin');
                window.scrollTo({ top: 0 });
              }}
              className="flex w-full items-center justify-center space-x-2 rounded-sm bg-slate-900 py-2.5 text-center text-xs font-semibold text-slate-500 border border-slate-800 hover:text-brand-gold"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>상담 승인/취소 (관리자 전용)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
