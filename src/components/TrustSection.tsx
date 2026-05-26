import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Clock, MessagesSquare, CheckCircle2 } from 'lucide-react';

export default function TrustSection() {
  const anxieties = [
    {
      icon: <Clock className="h-6 w-6 text-brand-gold" />,
      title: '법률 골든타임을 확보해야 합니다',
      desc: '경찰조사의 최초 첫 진술, 사건 유발 24시간 안의 객관적 무죄 증거 확보 등은 재판 전체의 결과를 가름할 만큼 무거우나 대다수 사건 당사자가 당황하여 실수를 범합니다.'
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-brand-gold" />,
      title: '인터넷 정보로는 한계가 있습니다',
      desc: '유사해 보이지만 처분 수준, 관할 법원 수용 성향, 판례의 세부 단서 조항에 따라 변호 방향이 아예 달라집니다. 보편적 정보에만 의존하지 말고 정형화되지 않은 본인의 구체적 사안을 짚어야 합니다.'
    },
    {
      icon: <MessagesSquare className="h-6 w-6 text-brand-gold" />,
      title: '가장 든든한 조력자를 확보하는 평안',
      desc: '문제가 생긴 즉시 의뢰인을 대변해 법리 검토를 내어줄 전담 법리 사무소가 있다는 고지 자체만으로도 경찰 수사관, 상대방 채권단의 강압적 접촉 행위를 전면 억제하는 효력을 누리게 됩니다.'
    }
  ];

  return (
    <section className="bg-slate-50 py-20 text-slate-900 border-b border-slate-200">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Core Empathy Headline */}
        <div className="text-center">
          <span className="text-sm font-bold tracking-widest text-slate-500 uppercase">YULIN ANXIETY CARE</span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl mt-3">
            지금 가장 필요한 건,<br className="sm:hidden" /> <span className="text-brand-navy">혼자 고민하지 않는 것</span>입니다
          </h2>
          <div className="mx-auto mt-4 h-1 w-12 bg-brand-gold" />
          
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-650 sm:text-lg">
            처음 겪는 법률 사건이라 눈앞이 막막하고 막연히 불리하게 몰릴까 두렵습니까?<br />
            법률 분쟁은 시간이 흐를수록 자기도 모르게 행했던 주장 번복이나<br className="hidden md:block" />
            초기 조율의 부재 탓에 불리한 소송 영역으로 함몰되는 불합리가 빈번히 발생합니다.
          </p>
        </div>

        {/* Anxiety Resolution Timeline/Grid Details */}
        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {anxieties.map((item, idx) => (
            <motion.div 
              key={idx}
              className="rounded-sm border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-brand-navy/5 text-brand-gold mb-5">
                {item.icon}
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-navy">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Action Call Banner */}
        <div className="mt-16 rounded-sm bg-brand-navy p-8 text-center text-white md:px-12 md:py-10 shadow-lg">
          <p className="font-serif text-lg md:text-xl font-medium tracking-tight leading-relaxed">
            “현재 본인이 서있는 처지를 정확히 정리하고, 가장 현실적인 승소 가이드라인을 수립해 드립니다.”
          </p>
          <div className="mt-8 flex flex-col items-center sm:flex-row sm:justify-center gap-3.5 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-250 max-w-md sm:max-w-none mx-auto">
            <span className="flex items-center text-left"><CheckCircle2 className="mr-1.5 h-4.5 w-4.5 text-brand-gold shrink-0" /> 1:1 비밀 밀착 보장</span>
            <span className="flex items-center text-left"><CheckCircle2 className="mr-1.5 h-4.5 w-4.5 text-brand-gold shrink-0" /> 대한변호사협회 등록 소속 직접 책임제</span>
            <span className="flex items-center text-left"><CheckCircle2 className="mr-1.5 h-4.5 w-4.5 text-brand-gold shrink-0" /> 선임 강요 없는 프리미엄 분석 상담</span>
          </div>
        </div>

      </div>
    </section>
  );
}
