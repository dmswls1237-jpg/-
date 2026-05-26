import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Clock, MessagesSquare, CheckCircle2 } from 'lucide-react';

export default function TrustSection() {
  const anxieties = [
    {
      icon: <Clock className="h-6 w-6 text-brand-gold" />,
      title: '법률 골든타임 확보',
      desc: '초기 진술과 초동 증거 확보는 사건의 결과를 좌우하지만, 많은 이들이 당황 속에 실수를 겪습니다.'
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-brand-gold" />,
      title: '인터넷 정보의 한계',
      desc: '같아 보이는 사건도 처분·재판 성향·세부 판례에 따라 대응 전략은 달라집니다.'
    },
    {
      icon: <MessagesSquare className="h-6 w-6 text-brand-gold" />,
      title: '가장 든든한 조력자',
      desc: '전담 법률대리인의 존재만으로도 수사기관이나 상대방의 강압적 대응을 효과적으로 견제할 수 있습니다.'
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
          
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-slate-650 font-medium">
            처음 겪는 법률 분쟁, 초기 대응의 작은 차이가 결과를 바꿉니다.
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
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Action Call Banner */}
        <div className="mt-16 rounded-sm bg-brand-navy p-8 text-center text-white md:px-12 md:py-10 shadow-lg">
          <p className="font-serif text-base sm:text-lg md:text-xl font-semibold tracking-tight leading-relaxed">
            “현재 본인이 서있는 처지를 정확히 정리하고, 가장 현실적인 승소 가이드라인을 수립해 드립니다.”
          </p>
          <div className="mt-8 flex flex-col items-center sm:flex-row sm:justify-center gap-3.5 sm:gap-6 text-sm font-semibold text-slate-250 max-w-md sm:max-w-none mx-auto">
            <span className="flex items-center text-left"><CheckCircle2 className="mr-1.5 h-4.5 w-4.5 text-brand-gold shrink-0" /> 1:1 비밀 밀착 보장</span>
            <span className="flex items-center text-left"><CheckCircle2 className="mr-1.5 h-4.5 w-4.5 text-brand-gold shrink-0" /> 대한변호사협회 등록 소속 직접 책임제</span>
            <span className="flex items-center text-left"><CheckCircle2 className="mr-1.5 h-4.5 w-4.5 text-brand-gold shrink-0" /> 선임 강요 없는 프리미엄 분석 상담</span>
          </div>
        </div>

      </div>
    </section>
  );
}
