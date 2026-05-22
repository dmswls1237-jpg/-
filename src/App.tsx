import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import PracticeAreas from './components/PracticeAreas';
import SuccessCases from './components/SuccessCases';
import Directions from './components/Directions';
import LawyerCards from './components/LawyerCards';
import BookingForm from './components/BookingForm';
import AdminPanel from './components/AdminPanel';
import Logo from './components/Logo';
import { Reservation } from './types';
import { INITIAL_RESERVATIONS } from './data';
import { Landmark, Phone, Mail, MapPin, Calendar, Lock, Printer } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [bookingSelectedArea, setBookingSelectedArea] = useState<string>('');

  // Persists reservations index in local storage
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const cached = localStorage.getItem('yulin_reservations_data');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (err) {
        console.error('Failed to parse cached reservations', err);
      }
    }
    return INITIAL_RESERVATIONS;
  });

  useEffect(() => {
    localStorage.setItem('yulin_reservations_data', JSON.stringify(reservations));
  }, [reservations]);

  // Global operations
  const addReservation = (newRes: Omit<Reservation, 'id' | 'createdAt'>) => {
    const completeRes: Reservation = {
      ...newRes,
      id: `res_${Math.floor(Math.random() * 900000 + 100000)}`,
      createdAt: new Date().toISOString()
    };
    setReservations(prev => [completeRes, ...prev]);
  };

  const updateReservation = (updated: Reservation) => {
    setReservations(prev => prev.map(r => r.id === updated.id ? updated : r));
  };

  const deleteReservation = (id: string) => {
    setReservations(prev => prev.filter(r => r.id !== id));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-200 antialiased selection:bg-brand-gold selection:text-brand-navy">
      
      {/* Sticky Top Header */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        scrollToSection={scrollToSection} 
      />

      {/* Dynamic Tab Switcher */}
      <main>
        {currentTab === 'home' && (
          <div className="animate-fade-in">
            {/* [섹션1] Hero Container */}
            <Hero setCurrentTab={setCurrentTab} scrollToSection={scrollToSection} />

            {/* [섹션2] Anxiety Relief block */}
            <TrustSection />

            {/* [섹션3] Functional Practice Areas */}
            <PracticeAreas 
              setCurrentTab={setCurrentTab} 
              setBookingSelectedArea={setBookingSelectedArea} 
            />

            {/* [섹션5] Solutions Tracks */}
            <SuccessCases />

            {/* [섹션6] Representative Lawyer Intro */}
            <LawyerCards />

            {/* [섹션10] Location directions and Operating hours */}
            <Directions />

            {/* [섹션7] Final CTA Section */}
            <section className="bg-gradient-to-b from-slate-900 to-brand-navy py-20 text-white text-center border-t border-slate-800 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <Landmark className="mx-auto h-96 w-96 text-white translate-y-24 rotate-12" />
              </div>
              
              <div className="relative z-10 mx-auto max-w-3xl px-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-gold font-bold">
                  EXPEDITE SERVICE ENGAGEMENT
                </span>
                
                <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                  상담은 빠를수록 대응 선택지가 넓어집니다
                </h2>
                
                <p className="mx-auto mt-4 max-w-lg text-xs text-slate-400 sm:text-sm leading-relaxed">
                  인터넷에 겉도는 보편적 정보에만 의지해 혼자 속앓이하기보다,<br className="hidden sm:block" />
                  본인이 처한 독자적 정황을 적어주시면 가장 냉철하고 따뜻한 갈등 해결의 실마리를 제시해 드리겠습니다.
                </p>

                <div className="mt-8 flex flex-col justify-center sm:flex-row gap-3">
                  <button
                    onClick={() => { setCurrentTab('booking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="rounded bg-brand-gold px-8 py-3.5 text-sm font-bold text-brand-navy shadow hover:bg-brand-gold-light cursor-pointer transition active:scale-95"
                  >
                    법률 상담 예약 신청하기
                  </button>
                  <a
                    href="tel:051-711-4509"
                    className="rounded border border-slate-700 bg-slate-950/40 px-6 py-3.5 text-sm font-semibold hover:border-brand-gold hover:text-white cursor-pointer transition"
                  >
                    대표 직할전화 연결 (051-711-4509)
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentTab === 'booking' && (
          <div className="animate-fade-in">
            <BookingForm 
              reservations={reservations} 
              addReservation={addReservation} 
              selectedAreaFromCard={bookingSelectedArea}
              setBookingSelectedArea={setBookingSelectedArea}
            />
          </div>
        )}

        {currentTab === 'admin' && (
          <div className="animate-fade-in">
            <AdminPanel 
              reservations={reservations} 
              updateReservation={updateReservation} 
              deleteReservation={deleteReservation} 
            />
          </div>
        )}
      </main>

      {/* Clean high-contrast corporate footer */}
      <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-12 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 md:grid-cols-12">
          
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center -ml-1">
              <Logo className="h-10 w-auto" />
            </div>
            
            <p className="text-[11px] leading-relaxed">
              법무법인 율인은 의뢰인의 어려운 시간 속 아픔을 방관하지 않고, 사건 초동 해결의 확실한 실마리부터 권리를 사수하기 위해 끝까지 발로 뛰겠습니다.
            </p>
          </div>

          <div className="md:col-span-5 space-y-2">
            <h4 className="text-white font-serif tracking-wider font-semibold">부산분사무소 주재 정보</h4>
            <div className="space-y-1.5 text-[11px]">
              <p className="flex items-center"><MapPin className="mr-1.5 h-3.5 w-3.5 text-brand-gold shrink-0" /> 부산광역시 동래구 금강공원로 2, 209호 (온천교 사거리 앞)</p>
              <p className="flex items-center"><Phone className="mr-1.5 h-3.5 w-3.5 text-brand-gold shrink-0" /> 대표전화: 051-711-4509</p>
              <p className="flex items-center"><Printer className="mr-1.5 h-3.5 w-3.5 text-brand-gold shrink-0" /> 팩스번호: 051-980-6509</p>
              <p className="flex items-center"><Mail className="mr-1.5 h-3.5 w-3.5 text-brand-gold shrink-0" /> 대표이메일 주소: lawprofessional@naver.com</p>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="text-white font-serif tracking-wider font-semibold mb-2">업무 보호 조항</h4>
              <p className="text-[10px] leading-relaxed">
                법무법인 율인은 변호사법 제26조 비밀 엄수권에 근거해 상담 예약인의 모든 면제 정보를 제3자에 사전동의 없이 절대 공개하지 않습니다.
              </p>
            </div>
            
            <button
              onClick={() => { setCurrentTab('admin'); window.scrollTo({ top: 0 }); }}
              className="flex items-center justify-center space-x-1.5 rounded bg-slate-900 border border-slate-800 py-2.5 text-center text-[10px] font-bold text-slate-500 hover:text-brand-gold hover:border-brand-gold-light tracking-wide uppercase"
            >
              <Lock className="h-3 w-3" />
              <span>대표 변호사 상담 현황판 (관리자 전용)</span>
            </button>
          </div>

        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-900 text-center text-[10px] text-slate-600 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 법무법인 율인 Yulin Law Firm. All Rights Reserved. 대표담당 손혁준 대표변호사.</p>
          <div className="flex space-x-4">
            <span className="hover:text-slate-500 cursor-pointer">개인정보보호방침</span>
            <span>|</span>
            <span className="hover:text-slate-500 cursor-pointer">변호사법 제26조 수지선언</span>
            <span>|</span>
            <span className="hover:text-slate-500 cursor-pointer" onClick={() => setCurrentTab('admin')}>상담 현황 관리</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
