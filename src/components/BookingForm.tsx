import React, { useState, useEffect } from 'react';
import { Reservation, ReservationStatus } from '../types';
import { RESERVATION_TIMES } from '../data';
import { Calendar, Clock, Landmark, User, Phone, CheckCircle, ListTodo, ShieldCheck, FileText } from 'lucide-react';

interface BookingFormProps {
  reservations: Reservation[];
  addReservation: (newRes: Omit<Reservation, 'id' | 'createdAt'>) => void;
  selectedAreaFromCard: string;
  setBookingSelectedArea: (area: string) => void;
}

export default function BookingForm({ reservations, addReservation, selectedAreaFromCard, setBookingSelectedArea }: BookingFormProps) {
  // Today is May 22, 2026 based on metadata
  const TODAY_STR = '2026-05-22';
  
  const [selectedDate, setSelectedDate] = useState<string>(TODAY_STR);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<string>('민사');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [privacyAgreed, setPrivacyAgreed] = useState<boolean>(false);
  
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [bookingSummary, setBookingSummary] = useState<any>(null);
  
  // Format phone number live
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    let formatted = raw;
    if (raw.length > 3 && raw.length <= 7) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3)}`;
    } else if (raw.length > 7) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7, 11)}`;
    }
    setClientPhone(formatted);
  };

  // Sync chosen practice area if they passed one via clicking cards
  useEffect(() => {
    if (selectedAreaFromCard) {
      setSelectedArea(selectedAreaFromCard);
    }
  }, [selectedAreaFromCard]);

  // Find times that are already booked for the selected date
  const bookedTimesOnSelectedDate = reservations
    .filter(res => res.date === selectedDate && res.status !== '취소')
    .map(res => res.time);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) return alert('날짜를 선택해 주세요.');
    if (!selectedTime) return alert('상담 시간을 선택해 주세요.');
    if (!clientName.trim()) return alert('성함을 입력해 주세요.');
    if (!clientPhone.trim() || clientPhone.length < 10) return alert('올바른 연락처를 입력해 주세요.');
    if (!details.trim()) return alert('대략적인 상담 내용을 기록해 주세요. 변호사가 사전 심사하는 데 사용됩니다.');
    if (!privacyAgreed) return alert('개인정보 동의가 완료되어야 정상 예약이 처분될 수 있습니다.');

    const newBooking = {
      date: selectedDate,
      time: selectedTime,
      name: clientName,
      phone: clientPhone,
      area: selectedArea,
      details: details,
      status: '접수' as ReservationStatus,
      memo: ''
    };

    addReservation(newBooking);
    
    // Save state for final congrats page
    setBookingSummary({
      ...newBooking,
      ticketNumber: `YLN-${Math.floor(Math.random() * 900000 + 100000)}`
    });

    setIsSuccess(true);
    
    // Reset state values
    setClientName('');
    setClientPhone('');
    setDetails('');
    setSelectedTime('');
    setPrivacyAgreed(false);
    setBookingSelectedArea(''); // Clear temporary passed state
  };

  return (
    <div className="bg-slate-50 py-16 text-slate-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center mb-10">
          <span className="text-sm font-bold tracking-widest text-brand-gold uppercase">ONLINE SCHEDULING PLATFORM</span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-navy mt-1">
            율인 1:1 방문·전화 법률 상담 예약
          </h2>
          <div className="mx-auto mt-3 h-[2px] w-12 bg-brand-gold" />
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-600 leading-relaxed font-semibold">
            원하시는 날짜와 시간을 선택하시면 담당 변호사가 서류 심사 후 즉시 전화를 드려 확정 예약을 잡아드립니다. 일시적 수수료나 보증수수료 등은 일절 발생치 않습니다.
          </p>
        </div>

        {isSuccess ? (
          /* CONGRATS FLOW SUCCESS PAGE */
          <div className="rounded-sm border-2 border-brand-gold bg-white p-8 md:p-12 text-center shadow-2xl animate-fade-in">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 border border-brand-gold text-brand-gold mb-6">
              <CheckCircle className="h-8 w-8 text-brand-gold" />
            </div>
            
            <h3 className="font-serif text-2xl font-bold text-brand-navy">상담 예약 신청서 전달 완료</h3>
            <p className="text-sm text-slate-500 mt-1">보안 관리번호: {bookingSummary?.ticketNumber}</p>
            
            <div className="mt-8 mx-auto max-w-sm rounded border border-slate-200 bg-slate-50 p-6 text-left">
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">RESERVATION TICKET</span>
              <table className="w-full text-sm mt-3 space-y-2">
                <tbody>
                  <tr className="border-b border-slate-200 pb-2">
                    <th className="py-2 text-slate-500 font-medium">상담 의뢰인</th>
                    <td className="py-2 text-right font-bold text-brand-navy">{bookingSummary?.name} 고객님</td>
                  </tr>
                  <tr className="border-b border-slate-200 py-2">
                    <th className="py-2 text-slate-500 font-medium">소송 상담 분야</th>
                    <td className="py-2 text-right font-bold text-slate-700">{bookingSummary?.area} 전문</td>
                  </tr>
                  <tr className="border-b border-slate-200 py-2">
                    <th className="py-2 text-slate-500 font-medium">신청 날짜 및 시간</th>
                    <td className="py-2 text-right font-bold text-slate-700">{bookingSummary?.date} ({bookingSummary?.time})</td>
                  </tr>
                  <tr className="py-2">
                    <th className="py-2 text-slate-500 font-medium">예약 상태</th>
                    <td className="py-2 text-right font-bold text-amber-600">심사 승인대기중</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 max-w-lg mx-auto bg-brand-navy/5 p-4 rounded text-sm text-slate-700 text-left space-y-1.5 border border-slate-200">
              <p className="font-bold text-slate-800">💡 법인 접수처 심층 대응 조치사항 안내</p>
              <p>• 율인의 담당 지정 변호사가 영업일 기준 3시간 이내에 전송하신 내용을 심사하여 일대일 면담 대동 서면 요강과 사전 보조용 서류가 필요할 시 기재하신 연락처로 보이스 상담 전화를 발송하겠습니다.</p>
              <p>• 긴급 대동 주치의를 소싱하시길 바란다면 <span className="font-semibold text-brand-navy font-bold">051-711-4509</span> 대표전화로 유선 예약도 별도로 하실 수 있습니다.</p>
            </div>

            <button
              onClick={() => setIsSuccess(false)}
              className="mt-8 rounded bg-brand-navy px-8 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 cursor-pointer"
            >
              새로운 상담 추가 신청하기
            </button>
          </div>
        ) : (
          /* RESERVATION FORM SCREEN */
          <form onSubmit={handleSubmit} className="bg-white rounded-sm border border-slate-200 p-6 md:p-10 shadow-lg">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              
              {/* Left Segment: Time slots & Date */}
              <div className="space-y-6">
                <div>
                  <label className="flex items-center text-sm font-bold tracking-wider text-slate-700 uppercase mb-2">
                    <Calendar className="mr-1.5 h-4.5 w-4.5 text-brand-gold" />
                    <span>1. 희망 방문 상담일 선택</span>
                  </label>
                  <input
                    type="date"
                    min={TODAY_STR}
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedTime(''); // Reset selected time on date change
                    }}
                    className="w-full rounded border border-slate-300 p-3 text-sm focus:border-brand-gold focus:outline-none"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1.5 font-semibold">※ 당일 방문상담은 오전 접수건에 한합니다. 토요일 상담 필요시 별도 표기.</p>
                </div>

                <div>
                  <label className="flex items-center text-sm font-bold tracking-wider text-slate-700 uppercase mb-2">
                    <Clock className="mr-1.5 h-4.5 w-4.5 text-brand-gold" />
                    <span>2. 원하는 시간 선택 (실시간)</span>
                  </label>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {RESERVATION_TIMES.map((time) => {
                      const isBooked = bookedTimesOnSelectedDate.includes(time);
                      return (
                        <button
                          key={time}
                          type="button"
                          disabled={isBooked}
                          onClick={() => setSelectedTime(time)}
                          className={`rounded-sm py-2.5 text-center text-sm font-bold border transition-all duration-150 cursor-pointer ${
                            isBooked
                              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                              : selectedTime === time
                              ? 'bg-brand-navy border-brand-navy text-white font-black scale-105'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-brand-gold hover:bg-slate-50'
                          }`}
                        >
                          {time}
                          {isBooked ? (
                            <span className="block text-[10px] text-slate-400 font-bold">예약 마감</span>
                          ) : (
                            <span className="block text-[10px] text-brand-gold font-bold">신청가능</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between mt-3 text-xs text-slate-500 font-bold">
                    <span>(정기 휴게점심시간: 12시 - 13시)</span>
                    <span className="flex items-center text-brand-gold font-semibold">
                      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-brand-gold"></span>
                      실시간 비활성화 연동중
                    </span>
                  </div>
                </div>

                <div>
                  <label className="flex items-center text-sm font-bold tracking-wider text-slate-700 uppercase mb-2">
                    <ListTodo className="mr-1.5 h-4.5 w-4.5 text-brand-gold" />
                    <span>3. 법률 소송 희망 분야</span>
                  </label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full rounded border border-slate-300 p-3 text-sm focus:border-brand-gold focus:outline-none"
                  >
                    <option value="민사">민사 전문 (대여금, 손해배상, 계약, 부동산 분쟁)</option>
                    <option value="형사">형사 전문 (사기죄, 음주운전, 폭행, 경찰조사방어)</option>
                    <option value="가사">가사 전문 (부부이혼, 재산분할, 양육비, 유산상속)</option>
                    <option value="회생·파산">회생·파산 전문 (개인 소득 회생, 다중 파산면책)</option>
                  </select>
                </div>
              </div>

              {/* Right Segment: Contact Details & Details */}
              <div className="space-y-6">
                <div>
                  <label className="flex items-center text-sm font-bold tracking-wider text-slate-700 uppercase mb-2">
                    <User className="mr-1.5 h-4.5 w-4.5 text-brand-gold" />
                    <span>4. 의뢰인 성명</span>
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    placeholder="성함을 입력하세요 (예: 홍길동)"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full rounded border border-slate-300 p-3 text-sm focus:border-brand-gold focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-bold tracking-wider text-slate-700 uppercase mb-2">
                    <Phone className="mr-1.5 h-4.5 w-4.5 text-brand-gold" />
                    <span>5. 연락처 (승인 문자 수신용)</span>
                  </label>
                  <input
                    type="tel"
                    maxLength={13}
                    placeholder="010-0000-0000"
                    value={clientPhone}
                    onChange={handlePhoneChange}
                    className="w-full rounded border border-slate-300 p-3 text-sm focus:border-brand-gold focus:outline-none"
                    required
                  />
                  <p className="text-xs text-red-500 mt-1 font-bold">※ 허위 연락처 작성 시 예약이 자동으로 무효 취소 조치됩니다.</p>
                </div>

                <div>
                  <label className="flex items-center text-sm font-bold tracking-wider text-slate-700 uppercase mb-2">
                    <FileText className="mr-1.5 h-4.5 w-4.5 text-brand-gold" />
                    <span>6. 간단한 사건 사실관계 설명</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="현재 겪고 계신 법률 갈등 상황을 3줄 내외로 간략히 적어주시면, 변호인이 분석 지점 서류를 가지고 바로 1차 무료 상담 연락을 드리겠습니다."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full rounded border border-slate-300 p-3 text-sm focus:border-brand-gold focus:outline-none leading-relaxed"
                    maxLength={400}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Privacy Compliance consent check */}
            <div className="mt-8 border-t border-slate-100 pt-6">
              <div className="rounded border border-slate-150 bg-slate-50/50 p-4">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="privacy"
                      type="checkbox"
                      checked={privacyAgreed}
                      onChange={(e) => setPrivacyAgreed(e.target.checked)}
                      className="h-4.5 w-4.5 rounded border-slate-300 text-brand-navy focus:ring-brand-gold cursor-pointer"
                    />
                  </div>
                  <div className="ml-3 text-sm leading-relaxed text-slate-600">
                    <label htmlFor="privacy" className="font-extrabold text-slate-800 cursor-pointer">
                      개인정보 수집 및 상담 활용동의서 (필수)
                    </label>
                    <p className="mt-1 leading-relaxed">수집 정보: 성명, 휴대폰 일련 연락처, 사건 기재 개요. 본 법률 사무소는 변호사법 제26조 및 업무 비밀 엄수 규정에 근거하여 작성해주신 상담 서류 내역을 외부 채권자, 고소기관 등에 영구히 비밀 보장의 원칙으로 철저 보안 및 소지 사멸 관리합니다.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form button submission */}
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="w-full sm:w-1/2 rounded-sm bg-brand-navy py-4.5 text-center text-sm font-extrabold tracking-wide text-white transition duration-200 hover:bg-slate-800 shadow-md cursor-pointer active:scale-95"
              >
                예약 신청서 제출 및 법률 심의 연동
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
