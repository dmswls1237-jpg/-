import React from 'react';
import { MapPin, Bus, Train, Clock, Pocket, CheckCircle2 } from 'lucide-react';
import yulinMapPhoto from '../assets/images/yulin_busan_map_1779429993064.png';

export default function Directions() {
  return (
    <section id="directions" className="bg-white py-20 text-slate-900 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center">
          <span className="text-xs md:text-sm font-bold tracking-widest text-slate-500 uppercase">OFFICE DIRECTIONS & INFORMATION</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl mt-3">
            율인 오시는 길 및 운영 안내
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed text-slate-500 bg-slate-50/50 p-3 rounded">
            온천장 온천교 사거리에 인접해 있어 부산 전역에서 내방하시기 대단히 용이합니다. 편안히 상담에만 전념하실 수 있도록 무료 주차를 지원합니다.
          </p>
          <div className="mx-auto mt-5 h-[2px] w-12 bg-brand-gold" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          
          {/* Left Column: Visual Map Blueprint */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="border border-slate-200 bg-white rounded-sm overflow-hidden shadow-sm p-1">
                {/* Actual Map Image from User Asset - scaled natively without crop */}
                <img 
                  src={yulinMapPhoto} 
                  alt="법무법인 율인 부산분사무소 오시는길 지도" 
                  className="w-full h-auto block"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Info prompt situated cleanly beneath the map instead of absolute overlay */}
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-slate-50 border border-slate-200 px-4 py-3 rounded-sm shadow-xs gap-2">
                <span className="text-xs md:text-sm text-slate-700 font-semibold">📍 부산광역시 동래구 금강공원로 2, 209호 (2층)</span>
                <span className="text-[10px] md:text-xs font-extrabold text-brand-navy shrink-0">온천교 사거리 앞</span>
              </div>
            </div>

            <div className="mt-4 rounded border border-amber-100 bg-amber-50/50 p-4 text-xs md:text-sm text-slate-700">
              <span className="font-bold text-amber-800">🚗 주차 안내</span>
              <p className="mt-1 leading-relaxed text-xs md:text-sm">주차는 지하주차장을 이용하실 수 있으며, 온천교 사거리 금강공원로 2 상가 전용 지하주차장 이용 시 무료 주차 지원을 편리하게 제공해 드립니다. 법률 상담 내담을 마치실 때 실시간 무료 주차 확인을 등록해 드립니다.</p>
            </div>
          </div>

          {/* Right Column: Transit & Hours details */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Transit Block */}
            <div className="rounded-sm border border-slate-250 bg-slate-50 p-6 shadow-sm">
              <h3 className="font-serif text-base sm:text-lg font-bold text-brand-navy mb-4 flex items-center">
                <Train className="mr-2 h-5 w-5 text-brand-gold" />
                <span>대중교통 이용 안내</span>
              </h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mt-0.5 rounded-full bg-orange-100 p-1 text-orange-700 shrink-0">
                    <span className="text-[10px] md:text-xs font-bold leading-none px-0.5">1</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-xs sm:text-sm md:text-base font-bold text-slate-800">도시철도 1호선 온천장역 1번 출구</p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">온천장역 1번 출구에서 나와 신정 사거리/온천교 방향으로 약 250m 도보 직진 (온천교사거리 풍림아파트 인근 상가동 209호)</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="mt-0.5 rounded-full bg-slate-200 p-1 text-slate-700 shrink-0">
                    <Bus className="h-3 w-3" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs sm:text-sm md:text-base font-bold text-slate-800">온천교사거리 / 온천장역 버스정류장</p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">시내 버스: 80번, 110-1번, 121번, 131번, 144번 노선 다수 하차 후 온천교 사거리 방면 도보 2-3분</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Operating Hours Block */}
            <div className="rounded-sm border border-slate-250 bg-slate-50 p-6 shadow-sm">
              <h3 className="font-serif text-base sm:text-lg font-bold text-brand-navy mb-4 flex items-center">
                <Clock className="mr-2 h-5 w-5 text-brand-gold" />
                <span>율인 상담 가능 시간</span>
              </h3>
              
              <table className="w-full text-xs sm:text-sm text-left">
                <tbody>
                  <tr>
                    <th className="py-2.5 font-medium text-slate-600">평일 상담 운영</th>
                    <td className="py-2.5 font-bold text-brand-navy text-right">09:00 - 18:00</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-4 rounded bg-brand-navy/5 p-3.5 border border-slate-150">
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                  ⚠️ 형사 긴급 영장 발부, 긴급 수색 대응이 필요한 긴박한 정황 시에는 실시간 온라인 예약을 통해 비상 접수 대기 조치가 가동됩니다.
                </p>
              </div>
            </div>

          </div>
          
        </div>

      </div>
    </section>
  );
}
