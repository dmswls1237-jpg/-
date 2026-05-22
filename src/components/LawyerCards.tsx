import React from 'react';
import { LAWYERS } from '../data';
import { HelpCircle, Quote, GraduationCap, Briefcase, Award } from 'lucide-react';

export default function LawyerCards() {
  return (
    <section id="lawyers" className="bg-slate-50 py-20 text-slate-900 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Intro with human listening copy */}
        <div className="text-center">
          <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">OUR ADVOCACY PHILOSOPHY</span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl mt-3">
            의뢰인의 이야기를 끝까지 듣겠습니다
          </h2>
          <div className="mx-auto mt-4 h-[2px] w-12 bg-brand-gold" />
          
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            사건은 건별로 제각각 얽힌 삶의 사연이 달라 단순 서류 쪼가리로만 해결되지 않습니다.<br />
            법무법인 율인은 의뢰인의 현재 막힌 처지뿐만 아니라, 소송 이후의 일상 복귀와<br className="hidden md:block" />
            평온한 여생까지 복리적으로 조망하여 가장 안정적인 해결책을 전담 주재합니다.
          </p>
        </div>

        {/* Lawyer Profile Cards Layout */}
        <div className="mt-16 max-w-4xl mx-auto">
          {LAWYERS.map((lawyer) => (
            <div 
              key={lawyer.id}
              className="flex flex-col overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-12">
                
                {/* Photo Column */}
                <div className="relative h-96 md:h-auto md:col-span-5 bg-slate-100 overflow-hidden">
                  <img
                    src={lawyer.avatarUrl}
                    alt={`${lawyer.name} 대표변호사`}
                    className="h-full w-full object-cover object-center hover:scale-102 transition-transform duration-350"
                    referrerPolicy="no-referrer"
                  />
                  {/* Gold Overlay Corner Badge */}
                  <div className="absolute top-0 left-0 bg-brand-navy px-3.5 py-1.5 border-b border-r border-brand-gold/40 text-center">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-brand-gold">
                      REPRESENTATIVE ATTORNEY
                    </span>
                  </div>
                </div>

                {/* Profile Details Column */}
                <div className="p-6 md:p-8 md:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Name & Position */}
                    <div>
                      <span className="text-sm font-bold tracking-wider text-slate-400 uppercase">법무법인 율인 부산분사무소</span>
                      <h3 className="font-serif text-2xl font-bold text-brand-navy flex items-baseline mt-1">
                        {lawyer.name} <span className="text-brand-gold">대표변호사</span>
                      </h3>
                    </div>

                    {/* Empathetic Quote */}
                    <div className="relative mt-4 border-l-2 border-brand-gold pl-4 py-1">
                      <Quote className="absolute right-2 bottom-1 h-8 w-8 text-slate-100 opacity-60 z-0" />
                      <p className="relative z-10 font-serif text-base sm:text-lg italic font-semibold leading-relaxed text-slate-800">
                        "{lawyer.quote}"
                      </p>
                    </div>

                    {/* Specialized badges tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {lawyer.specialFields.map((field, fidx) => (
                        <span
                          key={fidx}
                          className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 border border-slate-200"
                        >
                          {field}
                        </span>
                      ))}
                    </div>

                    {/* Detailed Career Milestones */}
                    <div className="mt-6">
                      <h4 className="flex items-center text-sm font-bold tracking-wider text-slate-400 uppercase mb-2">
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
                  <div className="mt-6 border-t border-slate-100 pt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                    🙋‍♂️ <span className="font-bold text-brand-navy">변호사 직접 상담:</span> 율인 부산분사무소는 사무장이 임의로 사건을 검토하지 않고, 대한변호사협회 등록 전문 변호사인 손혁준 대표변호사가 모든 심층 법리 분석 및 소송 과정을 의뢰인과 일대일로 진행합니다.
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
