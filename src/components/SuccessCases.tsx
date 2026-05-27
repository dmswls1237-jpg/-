import React, { useState, useEffect } from 'react';
import { SUCCESS_CASES } from '../data';
import { HelpCircle, CheckCircle2, ChevronRight, Milestone, AlertCircle, X } from 'lucide-react';

export default function SuccessCases() {
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>('case_01');
  const [mobileSelectedCategory, setMobileSelectedCategory] = useState<string>('전체');
  const [activeModalCaseId, setActiveModalCaseId] = useState<string | null>(null);

  useEffect(() => {
    if (activeModalCaseId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModalCaseId]);

  return (
    <section id="success-cases" className="bg-slate-900 py-20 text-white scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center">
          <span className="text-sm font-bold tracking-widest text-brand-gold uppercase">REAL ADVOCATE TRACK RECORD</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white lg:text-4xl mt-3">
            결과로 입증하는 율인의 해결 사례
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-slate-400">
            과장된 홍보가 아닌, 사건 해결을 위해 직접 뛰며 입증해낸 율인의 실전 성공사례입니다.
          </p>
          <div className="mx-auto mt-5 h-[2px] w-12 bg-brand-gold" />
        </div>

        {/* Case Toggle Segmented layout (PC Desktop Version) */}
        <div className="mt-12 hidden lg:grid lg:grid-cols-12 gap-8">
          
          {/* Left panel - Case checklist */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            {SUCCESS_CASES.map((item) => (
              <button
                key={item.id}
                onClick={() => setExpandedCaseId(item.id)}
                className={`w-full text-left rounded-sm border p-5 transition-all duration-300 cursor-pointer ${
                  expandedCaseId === item.id
                    ? 'bg-slate-950 border-brand-gold shadow-lg shadow-brand-gold/5'
                    : 'bg-slate-900 border-slate-850 hover:bg-slate-850 hover:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="inline-block rounded bg-brand-navy px-2.5 py-1 text-xs font-bold text-brand-gold border border-brand-gold/20">
                      {item.area} 전문
                    </span>
                    <span className="text-xs text-slate-450 font-medium">사건 번호 보호대책 필</span>
                  </div>
                  <ChevronRight className={`h-4 w-4 text-brand-gold transition-transform duration-200 ${
                    expandedCaseId === item.id ? 'rotate-90' : 'rotate-0'
                  }`} />
                </div>
                
                <h3 className="font-serif text-lg font-bold text-white mt-3 leading-snug">
                  {item.title}
                </h3>
                
                <p className="mt-2 text-sm text-brand-gold font-semibold line-clamp-1">
                  {item.resultBadge}
                </p>
              </button>
            ))}

            <div className="rounded-sm bg-slate-950 p-6 border border-slate-800 text-center text-sm text-slate-500 mt-4">
              <p className="leading-relaxed">※ 의뢰인 신원과 사건 안전을 지키기 위하여 일부 사칭이 유발되지 않도록 구체 명칭은 익명 및 약어화 되었으나, 모든 선례 판례 번호는 부산지방법원 정남 승소 원본 사건에 기초합니다.</p>
            </div>
          </div>

          {/* Right panel - Expanded case roadmap details */}
          <div className="lg:col-span-8">
            {(() => {
              const currentCase = SUCCESS_CASES.find(c => c.id === expandedCaseId) || SUCCESS_CASES[0];
              return (
                <div className="rounded-sm border border-slate-800 bg-slate-950 p-6 md:p-8 shadow-2xl space-y-6">
                  
                  {/* Category Title */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-850 pb-5">
                    <div>
                      <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest font-mono">CASE HISTORY SPECIFICATION</span>
                      <h4 className="font-serif text-lg sm:text-xl font-bold text-white mt-1">
                        [{currentCase.area}] {currentCase.title}
                      </h4>
                    </div>
                    <span className="inline-flex items-center rounded-sm bg-brand-gold/10 px-2.5 py-0.5 text-sm font-bold text-brand-gold uppercase tracking-wider border border-brand-gold/30">
                      {currentCase.resultBadge}
                    </span>
                  </div>

                  {/* 1. 사건 내용 */}
                  <div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                      <span className="text-sm font-bold text-red-400 tracking-wider">1. 사건 내용</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed pl-6 whitespace-pre-wrap">
                      {currentCase.caseContent}
                    </p>
                  </div>

                  {/* 2. 변론 내용 */}
                  <div className="border-t border-slate-850 pt-5">
                    <div className="flex items-center space-x-2">
                      <Milestone className="h-4 w-4 text-brand-gold shrink-0" />
                      <span className="text-sm font-bold text-brand-gold tracking-wider">2. 변론 내용</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed pl-6 whitespace-pre-wrap">
                      {currentCase.defenseContent}
                    </p>
                  </div>

                  {/* 3. 판결 결과 / 처분 결과 */}
                  <div className="border-t border-slate-850 pt-5">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
                      <span className="text-sm font-bold text-green-400 tracking-wider">3. {currentCase.resultLabel}</span>
                    </div>
                    <p className="mt-2 text-sm md:text-base font-serif font-black text-slate-100 leading-relaxed bg-brand-navy/60 p-4 rounded border border-slate-800 whitespace-pre-wrap">
                      {currentCase.resultContent}
                    </p>
                  </div>

                </div>
              );
            })()}
          </div>

        </div>

        {/* Brand New Dedicated Mobile Version (Legible, Touch-Optimized List with Popup Detail Window/Modal) */}
        <div className="mt-8 block lg:hidden">
          {/* Category Filter Pills on Mobile */}
          <div className="flex space-x-2 overflow-x-auto pb-4 mb-4 scrollbar-none no-scrollbar -mx-4 px-4 border-b border-slate-800">
            {['전체', '민사', '형사'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setMobileSelectedCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-extrabold border transition-all duration-300 cursor-pointer ${
                  mobileSelectedCategory === cat
                    ? 'bg-brand-gold text-brand-navy border-brand-gold shadow-md shadow-brand-gold/10 scale-102'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Touch-Optimized List of Available Cases */}
          <div className="space-y-4">
            {(() => {
              const filteredCases = mobileSelectedCategory === '전체' 
                ? SUCCESS_CASES 
                : SUCCESS_CASES.filter(item => item.area === mobileSelectedCategory);

              if (filteredCases.length === 0) {
                return (
                  <div className="text-center py-10 rounded border border-dashed border-slate-800 bg-slate-950/40">
                    <p className="text-sm text-slate-500 font-medium">해당 카테고리의 완료 사건이 준비 중입니다.</p>
                  </div>
                );
              }

              return filteredCases.map((item) => (
                <div 
                  key={`mobile-${item.id}`}
                  className="rounded-sm border border-slate-850 bg-slate-900 overflow-hidden hover:border-brand-gold/60 transition-all duration-300 shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setActiveModalCaseId(item.id)}
                    className="w-full text-left p-5 flex flex-col justify-start text-white cursor-pointer active:bg-slate-850 focus:outline-none"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="inline-block rounded bg-brand-navy px-2.5 py-0.5 text-xs font-bold text-brand-gold border border-brand-gold/20">
                        {item.area} 전문
                      </span>
                      <span className="text-[10px] text-brand-gold font-semibold flex items-center gap-1">
                        자세히 보기 &rarr;
                      </span>
                    </div>
                    
                    <h3 className="font-serif text-base font-bold text-white mt-2 leading-relaxed">
                      {item.title}
                    </h3>
                    
                    <p className="mt-1.5 text-xs text-brand-gold font-bold">
                      🛡️ {item.resultBadge}
                    </p>
                  </button>
                </div>
              ));
            })()}
          </div>

          {/* Disclaimer */}
          <div className="rounded-sm bg-slate-950 p-5 border border-slate-800 text-left text-[11px] text-slate-550 leading-relaxed mt-4">
            <p>※ 의뢰인 신원과 사건 안전을 지키기 위하여 일부 사칭이 유발되지 않도록 구체 명칭은 익명 및 약어화 되었으나, 모든 선례 판례 번호는 부산지방법원 정남 승소 원본 사건에 기초합니다.</p>
          </div>
        </div>

        {/* Dynamic Modal / Mobile Detail Popup Window */}
        {activeModalCaseId && (() => {
          const detailCase = SUCCESS_CASES.find(c => c.id === activeModalCaseId);
          if (!detailCase) return null;
          return (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/85 backdrop-blur-md p-0 sm:p-4 transition-all duration-300">
              {/* Tap backdrop to close */}
              <div 
                className="absolute inset-0 cursor-pointer" 
                onClick={() => setActiveModalCaseId(null)}
              />
              
              {/* Modal Body Card content */}
              <div className="relative w-full max-w-lg bg-slate-900 rounded-t-xl sm:rounded-sm border-t sm:border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[85vh] z-10 animate-slide-up">
                
                {/* Header with Title and Close X button */}
                <div className="px-6 py-5 border-b border-slate-850 flex items-start justify-between">
                  <div className="pr-4">
                    <span className="inline-block rounded bg-brand-navy px-2.5 py-0.5 text-xs font-bold text-brand-gold border border-brand-gold/20">
                      {detailCase.area} 전문 해결사례
                    </span>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-white mt-1.5 leading-snug">
                      {detailCase.title}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveModalCaseId(null)}
                    className="p-1 rounded-full text-slate-450 hover:text-white transition-colors duration-200 outline-none focus:outline-none"
                    aria-label="닫기"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Main scrollable body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-5 text-sm">
                  {/* Badge Highlight Card */}
                  <div className="bg-brand-navy/60 p-4 rounded border border-brand-gold/30 text-center">
                    <span className="text-[10px] font-bold text-slate-400 block tracking-wider uppercase">대표 자문 결과</span>
                    <p className="text-sm font-black text-brand-gold mt-0.5">🏆 {detailCase.resultBadge}</p>
                  </div>

                  {/* Section 1: 사건 개요 */}
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                      <span className="text-xs font-bold text-red-400 tracking-wider">1. 사건 개요</span>
                    </div>
                    <div className="bg-slate-950/40 p-4 rounded border border-slate-850">
                      <p className="text-slate-200 leading-relaxed text-xs sm:text-sm whitespace-pre-wrap">
                        {detailCase.caseContent}
                      </p>
                    </div>
                  </div>

                  {/* Section 2: 변론 진행전략 */}
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <Milestone className="h-4 w-4 text-brand-gold shrink-0" />
                      <span className="text-xs font-bold text-brand-gold tracking-wider">2. 율인의 변론 전략</span>
                    </div>
                    <div className="bg-slate-950/40 p-4 rounded border border-slate-850">
                      <p className="text-slate-200 leading-relaxed text-xs sm:text-sm whitespace-pre-wrap">
                        {detailCase.defenseContent}
                      </p>
                    </div>
                  </div>

                  {/* Section 3: 최종 처분/판단 결과 */}
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
                      <span className="text-xs font-bold text-green-400 tracking-wider">3. {detailCase.resultLabel}</span>
                    </div>
                    <div className="bg-slate-950/90 p-4 rounded border border-slate-800">
                      <p className="text-xs sm:text-sm font-extrabold text-white leading-relaxed whitespace-pre-wrap">
                        {detailCase.resultContent}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Bottom sticky action button */}
                <div className="p-4 border-t border-slate-850 bg-slate-900">
                  <button
                    type="button"
                    onClick={() => setActiveModalCaseId(null)}
                    className="w-full rounded-sm bg-brand-gold hover:bg-yellow-600 py-3.5 text-center text-xs sm:text-sm font-extrabold text-brand-navy transition duration-200 cursor-pointer active:scale-98"
                  >
                    내용 확인 완료 (창 닫기)
                  </button>
                </div>

              </div>
            </div>
          );
        })()}

      </div>
    </section>
  );
}
