import React from 'react';
import { motion } from 'motion/react';
import { Phone, Calendar, ShieldCheck, Clock, MapPin, CheckSquare, Landmark } from 'lucide-react';

interface HeroProps {
  setCurrentTab: (tab: string) => void;
  scrollToSection: (id: string) => void;
}

export default function Hero({ setCurrentTab, scrollToSection }: HeroProps) {
  // Animated container variants for stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-navy via-slate-950 to-slate-900 py-20 lg:py-28 text-white">
      {/* Decorative luxury architectural background lines */}
      <div className="absolute inset-0 z-0 opacity-15">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C8A96B" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Hero Column */}
          <div className="flex flex-col justify-center lg:col-span-7">
            {/* SEO Small Badge */}
            <motion.div variants={itemVariants} className="mb-4 inline-flex items-center space-x-2">
              <span className="rounded bg-brand-gold/15 border border-brand-gold/30 px-3 py-1.5 sm:px-3.5 sm:py-1.5 text-sm font-bold tracking-wide text-brand-gold">
                대표변호사의 1:1 면밀한 상담
              </span>
            </motion.div>

            {/* Slogan & Title */}
            <motion.h1 variants={itemVariants} className="font-serif text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-white lg:text-5xl">
              법률 문제,<br />
              <span className="text-brand-gold underline decoration-brand-gold/40 decoration-wavy underline-offset-8">늦기 전에</span> 대응해야 합니다
            </motion.h1>

            {/* Description matching exact text */}
            <motion.p variants={itemVariants} className="mt-4 sm:mt-6 text-base leading-relaxed text-slate-250 md:text-lg">
              법무법인 율인 부산분사무소는 민사·형사·가사·회생파산 사건에서<br className="hidden md:block" />
              의뢰인과 끝까지 함께합니다.
            </motion.p>

            {/* Fast Trigger CTAs */}
            <motion.div variants={itemVariants} className="mt-8 flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <button
                onClick={() => { setCurrentTab('booking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="flex items-center justify-center space-x-2 rounded-sm bg-brand-gold px-6 py-3.5 sm:px-8 sm:py-4.5 text-center text-base font-bold text-brand-navy shadow-lg transition duration-200 hover:bg-brand-gold-light cursor-pointer active:scale-95"
              >
                <Calendar className="mr-1 shadow-xs h-4.5 w-4.5 sm:h-5 sm:w-5" />
                <span>방문/전화 상담 예약하기</span>
              </button>
              
              <a
                href="tel:051-711-4509" // Interactive direct dial for users
                className="flex items-center justify-center space-x-2 rounded-sm border border-slate-700 bg-slate-900/60 px-6 py-3.5 sm:px-6 sm:py-4 text-center text-base font-bold text-slate-200 transition duration-200 hover:bg-slate-900 hover:text-white hover:border-brand-gold"
              >
                <Phone className="mr-1 h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-gold animate-bounce" />
                <span>051-711-4509 (직통 전화)</span>
              </a>
            </motion.div>

            {/* Trust Badges Bar */}
            <motion.div 
              variants={itemVariants} 
              className="mt-12 grid grid-cols-1 gap-6 border-t border-slate-800/80 pt-8 sm:grid-cols-3 sm:gap-6 md:gap-8"
            >
              {[
                { 
                  label: (
                    <>
                      대표변호사 직접 상담
                      <br />
                      맞춤형 솔루션
                    </>
                  ), 
                  desc: '신속한 상담 진행', 
                  color: 'text-brand-gold' 
                },
                { label: '실시간 예약제', desc: '불필요한 대기 원천 차단', color: 'text-brand-gold' },
                { label: '비밀보장 원칙', desc: '의뢰 사항 철저 보안 엄수', color: 'text-brand-gold' }
              ].map((badge, idx) => (
                <div key={idx} className="border-l-2 border-brand-gold/40 pl-4 py-0.5">
                  <p className="text-base md:text-lg font-bold text-slate-50 leading-snug">{badge.label}</p>
                  <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">{badge.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Slogan Quote Panel Column */}
          <div className="flex items-center justify-center lg:col-span-5">
            <motion.div 
              variants={itemVariants}
              className="relative w-full max-w-sm rounded-sm border border-slate-800 bg-slate-950/80 p-6 md:p-8 shadow-2xl backdrop-blur-md"
            >
              {/* Highlight gold framing bar */}
              <div className="absolute top-0 left-0 h-1 w-full bg-brand-gold scale-x-50 origin-left" />
              
              <Landmark className="mb-4 md:mb-6 h-7 w-7 md:h-8 md:w-8 text-brand-gold" />
              
              <h3 className="font-serif text-lg font-bold text-brand-gold">
                “결과를 넘어, 의뢰인의 일상 회복까지.”
              </h3>
              
              <p className="mt-3 md:mt-4 text-sm leading-relaxed text-slate-350">
                첫 상담부터 사건 종결까지 1:1 전담 변호인 체계로, 의뢰인이 끝까지 믿고 기댈 수 있도록 함께합니다.
              </p>

              <div className="mt-6 md:mt-8 rounded bg-slate-900/80 p-4 border border-slate-800">
                <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">NEXT CONSULTATION AVAILABLE</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-semibold text-slate-300">오늘 상담 예약 가능 여부</span>
                  <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-sm font-semibold text-green-400">
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    즉시 가능
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
