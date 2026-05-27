import React, { useState } from 'react';
import { LAWYERS } from '../data';
import { HelpCircle, Quote, GraduationCap, Briefcase, Award, ChevronDown, CheckCircle2, HeartHandshake } from 'lucide-react';

export default function LawyerCards() {
  return (
    <section id="lawyers" className="bg-slate-50 py-20 text-slate-900 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Intro with human listening copy */}
        <div className="text-center">
          <span className="text-sm font-bold tracking-widest text-slate-500 uppercase">OUR ADVOCACY PHILOSOPHY</span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl mt-3">
            의뢰인의 이야기를 끝까지 듣겠습니다
          </h2>
          <div className="mx-auto mt-4 h-[2px] w-12 bg-brand-gold" />
          
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 font-semibold">
            법무법인 율인은 사건 해결을 넘어, 의뢰인의 일상 회복과 이후의 삶까지 함께 고려합니다.
          </p>
        </div>

        {/* Lawyer Profile Cards Layout (PC Desktop Version - unaltered) */}
        <div className="mt-16 max-w-4xl mx-auto hidden md:block">
          {LAWYERS.map((lawyer) => (
            <div 
              key={lawyer.id}
              className="flex flex-col overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-12">
                
                {/* Photo Column - Tall, elegant vertical frame with top-aligned positioning to ensure head and face are never cropped */}
                <div className="relative w-full h-[400px] sm:h-[480px] md:h-auto md:col-span-5 bg-slate-100 overflow-hidden">
                  <img
                    src={lawyer.avatarUrl}
                    alt={`${lawyer.name} 대표변호사`}
                    className="h-full w-full object-cover object-top hover:scale-102 transition-transform duration-350"
                    referrerPolicy="no-referrer"
                  />
                  {/* Gold Overlay Corner Badge */}
                  <div className="absolute top-0 left-0 bg-brand-navy px-3.5 py-1.5 border-b border-r border-brand-gold/40 text-center">
                    <span className="text-sm uppercase font-extrabold tracking-widest text-brand-gold">
                      REPRESENTATIVE ATTORNEY
                    </span>
                  </div>
                </div>

                {/* Profile Details Column */}
                <div className="p-5 md:p-8 md:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Name & Position */}
                    <div>
                      <span className="text-sm md:text-base font-bold tracking-wider text-slate-400 uppercase">법무법인 율인 부산분사무소</span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-navy flex items-baseline mt-1">
                        {lawyer.name} <span className="text-brand-gold text-lg md:text-xl ml-1">대표변호사</span>
                      </h3>
                    </div>

                    {/* Empathetic Quote */}
                    <div className="relative mt-4 border-l-2 border-brand-gold pl-4 py-1">
                      <Quote className="absolute right-2 bottom-1 h-8 w-8 text-slate-100 opacity-60 z-0" />
                      <p className="relative z-10 font-serif text-sm sm:text-base md:text-lg italic font-semibold leading-relaxed text-slate-800 whitespace-pre-line">
                        "{lawyer.quote}"
                      </p>
                    </div>

                    {/* Specialized badges tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {lawyer.specialFields.map((field, fidx) => (
                        <span
                           key={fidx}
                          className="rounded-full bg-slate-100 px-2.5 py-1 text-xs md:text-sm font-bold text-slate-700 border border-slate-200"
                        >
                          {field}
                        </span>
                      ))}
                    </div>

                    {/* Detailed Career Milestones */}
                    <div className="mt-5 md:mt-6">
                      <h4 className="flex items-center text-sm md:text-base font-bold tracking-wider text-slate-400 uppercase mb-2">
                        <GraduationCap className="mr-1.5 h-3.5 w-3.5 text-brand-gold" />
                        <span>대표변호사 주요 약력</span>
                      </h4>
                      
                      <ul className="space-y-1.5">
                        {lawyer.careers.map((career, cidx) => (
                          <li key={cidx} className="flex items-start text-sm text-slate-700 font-medium leading-normal pl-0.5">
                            <span className="mr-2 text-brand-gold select-none">•</span>
                            <span>{career}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Philosophy Footer note */}
                  <div className="mt-6 border-t border-slate-100 pt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-semibold">
                    🙋‍♂️ <span className="font-bold text-brand-navy">변호사 직접 상담:</span> 율인 부산분사무소는 사무장이 임의로 사건을 검토하지 않고, 대한변호사협회 등록 전문 변호사인 손혁준 대표변호사가 모든 심층 법리 분석 및 소송 과정을 의뢰인과 일대일로 진행합니다.
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Brand New Dedicated Mobile Version (Highly interactive segment accordion - 섹션별로 dynamic하게 개방되는 구조) */}
        <div className="mt-12 block md:hidden max-w-md mx-auto">
          {LAWYERS.map((lawyer) => {
            const [mobileActiveTab, setMobileActiveTab] = useState<string>('philosophy');

            return (
              <div 
                key={`mobile-lawyer-${lawyer.id}`}
                className="overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm"
              >
                {/* Beautiful Portait Container */}
                <div className="relative w-full h-[280px] bg-slate-100 overflow-hidden">
                  <img
                    src={lawyer.avatarUrl}
                    alt={`${lawyer.name} 대표변호사`}
                    className="h-full w-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  {/* Floating Gold Overlay Label */}
                  <div className="absolute top-0 left-0 bg-brand-navy px-3.5 py-1.5 border-b border-r border-brand-gold/40">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-brand-gold font-mono block">
                      REPRESENTATIVE LAWYER
                    </span>
                  </div>
                </div>

                {/* Name, Office and Accent Quote */}
                <div className="p-5 bg-slate-50/75 border-b border-slate-150">
                  <span className="text-[11px] font-bold tracking-wider text-slate-400 block uppercase">법무법인 율인 부산분사무소</span>
                  <h3 className="font-serif text-lg font-bold text-brand-navy mt-0.5 flex items-baseline">
                    {lawyer.name} <span className="text-brand-gold text-xs font-sans font-bold ml-1.5">대표변호사</span>
                  </h3>

                  {/* Quote block */}
                  <div className="relative mt-3.5 border-l-2 border-brand-gold pl-3.5 py-0.5">
                    <Quote className="absolute right-1 bottom-0.5 h-6 w-6 text-slate-150 opacity-40 z-0" />
                    <p className="relative z-10 font-serif text-[12.5px] italic font-black leading-relaxed text-slate-700 whitespace-pre-line">
                      "{lawyer.quote}"
                    </p>
                  </div>
                </div>

                {/* Sub-sections Trigger Accordion (섹션별 터치 시 켜지는 부위) */}
                <div className="divide-y divide-slate-150">
                  
                  {/* Subsection 1: 직접상담 철학 */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setMobileActiveTab(mobileActiveTab === 'philosophy' ? '' : 'philosophy')}
                      className={`w-full text-left px-5 py-4 flex items-center justify-between cursor-pointer focus:outline-none transition-all duration-200 ${
                        mobileActiveTab === 'philosophy' ? 'bg-brand-navy text-white' : 'bg-white text-slate-800'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <HeartHandshake className={`h-4.5 w-4.5 shrink-0 ${
                          mobileActiveTab === 'philosophy' ? 'text-brand-gold animate-pulse' : 'text-slate-500'
                        }`} />
                        <span className="text-sm font-extrabold tracking-tight">1. 대표 변호사 상담 철학</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                        mobileActiveTab === 'philosophy' ? 'rotate-180 text-brand-gold' : 'rotate-0 text-slate-400'
                      }`} />
                    </button>

                    {mobileActiveTab === 'philosophy' && (
                      <div className="p-5 bg-slate-50/50 border-t border-slate-150 space-y-3.5 animate-fade-in text-xs sm:text-sm">
                        <p className="font-semibold text-slate-700 leading-relaxed text-[12.5px]">
                          {lawyer.philosophy}
                        </p>
                        <div className="bg-white p-3.5 rounded border border-slate-200 text-[11px] text-slate-600 leading-relaxed font-semibold">
                          <p className="font-bold text-brand-navy block mb-0.5">🛡️ 변호사 직접 책임원칙</p>
                          사무장이 임의 서류 검토 및 자문을 주도하지 않으며, 손혁준 대표변호사가 소송 전체를 일대일 동행 및 면밀하게 관리합니다.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Subsection 2: 주요 이력 및 약력 */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setMobileActiveTab(mobileActiveTab === 'careers' ? '' : 'careers')}
                      className={`w-full text-left px-5 py-4 flex items-center justify-between cursor-pointer focus:outline-none transition-all duration-200 ${
                        mobileActiveTab === 'careers' ? 'bg-brand-navy text-white' : 'bg-white text-slate-800'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <GraduationCap className={`h-4.5 w-4.5 shrink-0 ${
                          mobileActiveTab === 'careers' ? 'text-brand-gold' : 'text-slate-500'
                        }`} />
                        <span className="text-sm font-extrabold tracking-tight">2. 대표 변호사 주요 약력</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                        mobileActiveTab === 'careers' ? 'rotate-180 text-brand-gold' : 'rotate-0 text-slate-400'
                      }`} />
                    </button>

                    {mobileActiveTab === 'careers' && (
                      <div className="p-5 bg-slate-50/50 border-t border-slate-150 animate-fade-in">
                        <ul className="space-y-2.5">
                          {lawyer.careers.map((career, cidx) => (
                            <li key={cidx} className="flex items-start text-[11px] sm:text-xs text-slate-700 font-extrabold leading-normal pl-0.5">
                              <span className="mr-2 text-brand-gold select-none font-bold">•</span>
                              <span>{career}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Subsection 3: 공식 인증 전문분야 */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setMobileActiveTab(mobileActiveTab === 'special' ? '' : 'special')}
                      className={`w-full text-left px-5 py-4 flex items-center justify-between cursor-pointer focus:outline-none transition-all duration-200 ${
                        mobileActiveTab === 'special' ? 'bg-brand-navy text-white' : 'bg-white text-slate-800'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Award className={`h-4.5 w-4.5 shrink-0 ${
                          mobileActiveTab === 'special' ? 'text-brand-gold' : 'text-slate-500'
                        }`} />
                        <span className="text-sm font-extrabold tracking-tight">3. 공식 검증 전문 분야</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                        mobileActiveTab === 'special' ? 'rotate-180 text-brand-gold' : 'rotate-0 text-slate-400'
                      }`} />
                    </button>

                    {mobileActiveTab === 'special' && (
                      <div className="p-5 bg-slate-50/50 border-t border-slate-150 space-y-3.5 animate-fade-in">
                        <div className="flex flex-col gap-2">
                          {lawyer.specialFields.map((field, fidx) => (
                            <div 
                              key={fidx} 
                              className="flex items-center space-x-2.5 bg-white px-3 py-2.5 rounded border border-slate-200"
                            >
                              <CheckCircle2 className="h-4 w-4 text-brand-gold shrink-0" />
                              <span className="text-[12px] font-black text-slate-800 leading-none">
                                {field}
                              </span>
                            </div>
                          ))}
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                          ※ 대한변호사협회(KBA)의 공식 심사를 통해 등록된 공식 등재 인증 분야입니다.
                        </p>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
