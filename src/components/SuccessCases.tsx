import React, { useState } from 'react';
import { SUCCESS_CASES } from '../data';
import { HelpCircle, CheckCircle2, ChevronRight, Milestone, AlertCircle } from 'lucide-react';

export default function SuccessCases() {
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>('case_01');

  return (
    <section id="success-cases" className="bg-slate-900 py-20 text-white scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center">
          <span className="text-sm font-bold tracking-widest text-brand-gold uppercase">REAL ADVOCATE TRACK RECORD</span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl mt-3">
            결과로 입증하는 율인의 해결 사례
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            과장된 광고나 수사가 아닌, 사건 개시 후 종결까지 율인이 발로 뛰며 실질적인 입증을 끌어낸 과정 중심의 실전 성공사례입니다.
          </p>
          <div className="mx-auto mt-5 h-[2px] w-12 bg-brand-gold" />
        </div>

        {/* Case Toggle Segmented layout */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Left panel - Case checklist */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
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

            <div className="rounded-sm bg-slate-950 p-6 border border-slate-800 text-center text-xs sm:text-sm text-slate-500 mt-4">
              <p className="leading-relaxed">※ 의뢰인 신원과 사건 안전을 지키기 위하여 일부 사칭이 유발되지 않도록 구체 명칭은 익명 및 약어화 되었으나, 모든 선례 판례 번호는 부산지방법원 정남 승소 원본 사건에 기초합니다.</p>
            </div>
          </div>

          {/* Right panel - Expanded case roadmap details */}
          <div className="lg:col-span-7">
            {(() => {
              const currentCase = SUCCESS_CASES.find(c => c.id === expandedCaseId) || SUCCESS_CASES[0];
              return (
                <div className="rounded-sm border border-slate-800 bg-slate-950 p-6 md:p-8 shadow-2xl">
                  
                  {/* Category Title */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-850 pb-5">
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">CASE HISTORY SPECIFICATION</span>
                      <h4 className="font-serif text-xl font-bold text-white mt-1">
                        {currentCase.area}분야 | {currentCase.title}
                      </h4>
                    </div>
                    <span className="inline-flex items-center rounded-sm bg-brand-gold/10 px-3 py-1 text-xs sm:text-sm font-bold text-brand-gold uppercase tracking-wider border border-brand-gold/30">
                      {currentCase.resultBadge.split(' (')[0]}
                    </span>
                  </div>

                  {/* Client Situation - Anxiety Point */}
                  <div className="mt-6">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4.5 w-4.5 text-red-400 shrink-0" />
                      <span className="text-sm font-bold text-red-400 tracking-wider">상담 전 의뢰인의 불안한 정황</span>
                    </div>
                    <p className="mt-2 pl-6 text-sm text-slate-300 leading-relaxed">
                      {currentCase.clientSituation}
                    </p>
                  </div>

                  {/* Chronological Process Roadmap */}
                  <div className="mt-8">
                    <div className="flex items-center space-x-2 mb-4">
                      <Milestone className="h-4.5 w-4.5 text-brand-gold" />
                      <span className="text-sm font-bold text-brand-gold tracking-wider">율인의 시간대별 법리 조치 과정</span>
                    </div>

                    <div className="relative border-l border-slate-800 pl-6 ml-2 space-y-5">
                      {currentCase.processSteps.map((step, idx) => (
                        <div key={idx} className="relative">
                          {/* Timeline dot */}
                          <div className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-slate-950 border-2 border-brand-gold">
                            <span className="text-[9px] text-brand-gold font-black">{idx + 1}</span>
                          </div>
                          
                          <p className="text-sm text-slate-300 font-medium leading-relaxed">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className="mt-8 border-t border-slate-850 pt-6">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-green-400" />
                      <span className="text-sm font-bold text-green-400 tracking-wider">법원의 선고 결과 및 일상 회복</span>
                    </div>
                    <p className="mt-2 text-sm sm:text-base font-serif font-black text-slate-100 leading-relaxed bg-brand-navy/60 p-4 rounded border border-slate-800">
                      {currentCase.finalResult}
                    </p>
                  </div>

                  {/* Ultimate Point */}
                  <div className="mt-4 bg-slate-900 border border-slate-800/80 rounded p-4">
                    <span className="text-xs font-bold text-brand-gold uppercase tracking-widest font-mono">CORE SOLUTION SUCCESS KEY</span>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      {currentCase.keyFocusPoint}
                    </p>
                  </div>

                </div>
              );
            })()}
          </div>

        </div>

      </div>
    </section>
  );
}
