import React from 'react';
import { MapPin, Bus, Train, Clock, Pocket, CheckCircle2 } from 'lucide-react';
import yulinMapPhoto from '../assets/images/yulin_busan_map_1779429993064.png';

export default function Directions() {
  return (
    <section id="directions" className="bg-white py-20 text-slate-900 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center">
          <span className="text-sm font-bold tracking-widest text-slate-500 uppercase">OFFICE DIRECTIONS & INFORMATION</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl mt-3">
            법무법인 율인 부산분사무소 오시는 길 안내
          </h2>

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
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center bg-slate-50 border border-slate-200 px-4 py-3 rounded-sm shadow-xs gap-2">
                <span className="text-sm text-slate-700 font-extrabold">📍 부산광역시 동래구 금강공원로 2, 209호 (2층)</span>
              </div>
            </div>

            <div className="mt-4 rounded border border-amber-100 bg-amber-50/50 p-4 text-sm text-slate-700">
              <span className="font-bold text-amber-800 text-sm">🚗 주차 안내</span>
              <p className="mt-1 leading-relaxed text-sm">상가 전용 지하주차장을 이용하시면 무료 주차 지원도 함께 제공됩니다.</p>
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
                    <span className="text-xs font-bold leading-none px-1">1</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm sm:text-base font-bold text-slate-800">도시철도 1호선 온천장역 1번 출구</p>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">온천장역 1번 출구에서 나와 신정 사거리/온천교 방향으로 약 250m 도보 직진 (온천교사거리 풍림아파트 인근 상가동 209호)</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="mt-0.5 rounded-full bg-slate-200 p-1 text-slate-700 shrink-0">
                    <Bus className="h-3.5 w-3.5" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm sm:text-base font-bold text-slate-800">온천교사거리 / 온천장역 버스정류장</p>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">시내 버스: 80번, 110-1번, 121번, 131번, 144번 노선 다수 하차 후 온천교 사거리 방면 도보 2-3분</p>
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
              
              <table className="w-full text-sm sm:text-base text-left">
                <tbody>
                  <tr>
                    <th className="py-2.5 font-bold text-slate-600">평일 상담 운영</th>
                    <td className="py-2.5 font-black text-brand-navy text-right">09:00 - 18:00</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-4 rounded bg-brand-navy/5 p-3.5 border border-slate-150">
                <p className="text-sm leading-relaxed text-slate-600">
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
