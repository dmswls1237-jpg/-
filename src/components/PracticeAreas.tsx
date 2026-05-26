import React, { useState } from 'react';
import { PRACTICE_AREAS } from '../data';
import { Scale, ShieldAlert, HeartHandshake, TrendingDown, ArrowRight, CheckCircle, ChevronRight } from 'lucide-react';

interface PracticeAreasProps {
  setCurrentTab: (tab: string) => void;
  setBookingSelectedArea: (area: string) => void;
}

export default function PracticeAreas({ setCurrentTab, setBookingSelectedArea }: PracticeAreasProps) {
  const [activeTab, setActiveTab] = useState<string>('civil');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scale':
        return <Scale className="h-5 w-5" />;
      case 'ShieldAlert':
        return <ShieldAlert className="h-5 w-5" />;
      case 'HeartHandshake':
        return <HeartHandshake className="h-5 w-5" />;
      case 'TrendingDown':
        return <TrendingDown className="h-5 w-5" />;
      default:
        return <Scale className="h-5 w-5" />;
    }
  };

  const activeData = PRACTICE_AREAS.find(area => area.id === activeTab) || PRACTICE_AREAS[0];

  const handleConsultTrigger = (areaTitle: string) => {
    setBookingSelectedArea(areaTitle);
    setCurrentTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="practice-areas" className="bg-white py-20 text-slate-950 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center">
          <span className="text-sm font-bold tracking-widest text-brand-gold bg-brand-navy/95 border border-brand-navy/10 px-4 py-2 rounded-sm inline-block uppercase shadow-sm">
            법무법인 율인 부산분사무소
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl mt-4">
            전문분야 및 솔루션
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base font-semibold">
            합리적인 수임료로 의뢰인을 위한 맞춤형 솔루션을 제공합니다.
          </p>
          <div className="mx-auto mt-5 h-[2px] w-12 bg-brand-gold" />
        </div>

        {/* Practice Selection Tabs (PC Desktop version) */}
        <div className="mt-12 hidden md:block">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:gap-4">
            {PRACTICE_AREAS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center rounded-sm p-4 text-center border transition-all duration-200 cursor-pointer ${
                  activeTab === item.id
                    ? 'border-brand-gold bg-brand-navy text-white shadow-md'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-full ${
                  activeTab === item.id ? 'bg-brand-gold text-brand-navy' : 'bg-slate-200/60 text-slate-600'
                }`}>
                  {getIcon(item.iconName)}
                </div>
                <span className="font-serif text-base font-bold sm:text-lg">{item.title}</span>
                <span className={`hidden text-xs mt-1 sm:block ${activeTab === item.id ? 'text-slate-300' : 'text-slate-500'}`}>
                  {item.description.split('대응')[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Detailed practice view */}
          <div className="mt-12 rounded-sm border border-slate-200 bg-slate-50/50 p-6 md:p-10 shadow-sm">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              
              {/* Left explanation column */}
              <div className="lg:col-span-12 xl:col-span-7">
                <span className="text-sm font-bold tracking-wider text-brand-gold uppercase">SPECIALTY STATEMENT</span>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-brand-navy mt-1">
                  {activeData.title} 법률 상담 가이드
                </h3>
                
                <p className="mt-4 text-base leading-relaxed text-slate-700">
                  {activeData.detailedIntro}
                </p>

                <div className="mt-6 border-t border-slate-200 pt-6">
                  <h4 className="font-serif text-base font-bold text-slate-800 tracking-wide uppercase">중점 대응 세부 분야</h4>
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {activeData.subfields.map((sub, sidx) => (
                      <div key={sidx} className="flex items-start space-x-2.5">
                        <CheckCircle className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base text-slate-800 font-bold">{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right strategy column */}
              <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-between border-slate-200 xl:border-l xl:pl-8">
                <div className="rounded-sm bg-white p-6 border border-slate-100 shadow-inner">
                  <span className="inline-block rounded bg-red-50 px-2 py-0.5 text-xs font-bold text-red-700 mb-3">율인의 대응 전략</span>
                  <h4 className="font-serif text-lg font-bold text-brand-navy">객관적 승소 방향 수립</h4>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                    {activeData.strategy}
                  </p>
                  
                  <div className="mt-4 rounded bg-brand-navy/[0.02] border border-brand-navy/[0.06] p-4 text-sm text-slate-600">
                    <p className="font-bold text-slate-800">💡 의뢰인 지참 사항 안내</p>
                    <p className="mt-1 leading-relaxed">상담 시 관련 계약서, 통장 거래역사서, 통화 녹취, 문자 내역을 지참해 주시면 즉각적인 소론 구성이 가능합니다.</p>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => handleConsultTrigger(activeData.title)}
                    className="flex w-full items-center justify-center space-x-2 rounded-sm bg-brand-navy py-4.5 text-center text-base font-bold text-white transition duration-200 hover:bg-slate-800 cursor-pointer active:scale-95"
                  >
                    <span>{activeData.title} 법률 상담 바로 예약하기</span>
                    <ArrowRight className="h-4 w-4 text-brand-gold" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Brand New Dedicated Mobile Version (Highly-Legible Expandable Card System) */}
        <div className="mt-8 block md:hidden space-y-4">
          {PRACTICE_AREAS.map((item) => {
            const isCurrent = activeTab === item.id;
            return (
              <div 
                key={`mobile-area-${item.id}`}
                className={`rounded-sm border transition-all duration-300 overflow-hidden bg-white ${
                  isCurrent 
                    ? 'border-brand-gold shadow-md shadow-brand-gold/[0.04]' 
                    : 'border-slate-200'
                }`}
              >
                {/* Mobile tab header trigger button */}
                <button
                  type="button"
                  onClick={() => setActiveTab(isCurrent ? '' : item.id)}
                  className="w-full text-left p-4.5 flex items-center justify-between cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full shrink-0 ${
                      isCurrent ? 'bg-brand-gold text-brand-navy' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {getIcon(item.iconName)}
                    </div>
                    <div>
                      <span className="font-serif text-base font-extrabold text-brand-navy block leading-tight">{item.title}</span>
                      <span className="text-[11px] text-slate-500 mt-0.5 block leading-none">{item.description}</span>
                    </div>
                  </div>
                  <ChevronRight className={`h-4 w-4 text-brand-gold transition-transform duration-300 ${
                    isCurrent ? 'rotate-90' : 'rotate-0'
                  }`} />
                </button>

                {/* Expanded Details Section directly inline under each topic card on mobile */}
                {isCurrent && (
                  <div className="border-t border-slate-150 bg-slate-50/70 p-5 space-y-5 animate-fade-in text-slate-900">
                    {/* Section Intro */}
                    <div>
                      <span className="text-[10px] font-bold text-brand-gold tracking-widest block font-mono">SPECIALTY GUIDE</span>
                      <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed mt-1">
                        {item.detailedIntro}
                      </p>
                    </div>

                    {/* Sub fields */}
                    <div className="border-t border-slate-200/80 pt-4.5">
                      <h4 className="text-xs font-bold text-slate-800 tracking-wider">🔒 중점 대응 세부 분야</h4>
                      <div className="mt-2.5 grid grid-cols-1 gap-2">
                        {item.subfields.map((sub, sidx) => (
                          <div key={sidx} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-800 font-extrabold">{sub}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Strategy Block */}
                    <div className="bg-white rounded border border-slate-150 p-4 space-y-2">
                      <span className="inline-block rounded bg-red-50 px-2 py-0.5 text-[10px] font-black text-red-700">대응 핵심 전략</span>
                      <h4 className="font-serif text-xs font-bold text-brand-navy">객관적 승소 방향 수립</h4>
                      <p className="text-xs text-slate-650 leading-relaxed font-semibold">
                        {item.strategy}
                      </p>
                      <div className="mt-2.5 bg-slate-50 border border-slate-100 p-2.5 rounded text-[11px] text-slate-550 leading-relaxed font-medium">
                        <strong className="text-slate-705 block mb-0.5">💡 상담 방문 시 지참 서류</strong>
                        계약서, 통화 녹음, 통장 내역서 등을 지참하시면 보다 명증한 소론 작성이 즉시 가능합니다.
                      </div>
                    </div>

                    {/* CTA Trigger consult reservation */}
                    <div className="pt-2">
                      <button
                        onClick={() => handleConsultTrigger(item.title)}
                        className="flex w-full items-center justify-center space-x-2 rounded-sm bg-brand-navy py-3.5 text-center text-xs font-extrabold text-white cursor-pointer active:scale-95"
                      >
                        <span>{item.title} 무료 상담 접수하기</span>
                        <ArrowRight className="h-4 w-4 text-brand-gold" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
