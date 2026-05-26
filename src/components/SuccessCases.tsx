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
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white lg:text-4xl mt-3">
            결과로 입증하는 율인의 해결 사례
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-slate-400">
            과장된 홍보가 아닌, 사건 해결을 위해 직접 뛰며 입증해낸 율인의 실전 성공사례입니다.
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

            <div className="rounded-sm bg-slate-950 p-6 border border-slate-800 text-center text-sm text-slate-500 mt-4">
              <p className="leading-relaxed">※ 의뢰인 신원과 사건 안전을 지키기 위하여 일부 사칭이 유발되지 않도록 구체 명칭은 익명 및 약어화 되었으나, 모든 선례 판례 번호는 부산지방법원 정남 승소 원본 사건에 기초합니다.</p>
            </div>
          </div>

          {/* Right panel - Expanded case roadmap details */}
          <div className="lg:col-span-7">
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

      </div>
    </section>
  );
}
