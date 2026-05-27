import React, { useState } from 'react';
import { Reservation, ReservationStatus } from '../types';
import { RESERVATION_TIMES } from '../data';
import { 
  Building2, Search, Edit3, Trash2, Calendar, Clock, ListFilter,
  CheckCircle, ArrowLeft, Eye, MessageSquare, BadgeAlert, AlertCircle, FileSpreadsheet,
  Bell, Send, Mail
} from 'lucide-react';

interface AdminPanelProps {
  reservations: Reservation[];
  updateReservation: (updatedRes: Reservation) => void;
  deleteReservation: (id: string) => void;
}

export default function AdminPanel({ reservations, updateReservation, deleteReservation }: AdminPanelProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [notificationLogs, setNotificationLogs] = useState<any[]>([]);
  const [smtpConfigured, setSmtpConfigured] = useState<boolean>(false);
  const [smsConfigured, setSmsConfigured] = useState<boolean>(false);
  const [isNotificationsLoading, setIsNotificationsLoading] = useState<boolean>(false);
  const [isSendingTest, setIsSendingTest] = useState<boolean>(false);
  const [showNotificationHelp, setShowNotificationHelp] = useState<boolean>(false);

  const fetchNotificationLogs = () => {
    setIsNotificationsLoading(true);
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => {
        setNotificationLogs(data.logs || []);
        setSmtpConfigured(data.smtpConfigured);
        setSmsConfigured(data.smsConfigured);
      })
      .catch(err => {
        console.error('Failed to fetch notification status:', err);
      })
      .finally(() => {
        setIsNotificationsLoading(false);
      });
  };

  React.useEffect(() => {
    fetchNotificationLogs();
  }, []);

  const handleSendTestNotification = () => {
    setIsSendingTest(true);
    fetch('/api/test-notification', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        alert('테스트 알람 발송이 실행되었습니다! 로그 기록을 확인해 주십시오.');
        fetchNotificationLogs();
      })
      .catch(err => {
        alert('테스트 알림 발송 중 오류 발생: ' + err.message);
      })
      .finally(() => {
        setIsSendingTest(false);
      });
  };
  const [filterArea, setFilterArea] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const [selectedResId, setSelectedResId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Form edit fields
  const [editDate, setEditDate] = useState<string>('');
  const [editTime, setEditTime] = useState<string>('');
  const [editArea, setEditArea] = useState<string>('');
  const [editName, setEditName] = useState<string>('');
  const [editPhone, setEditPhone] = useState<string>('');
  const [editDetails, setEditDetails] = useState<string>('');
  const [editStatus, setEditStatus] = useState<ReservationStatus>('접수');
  const [editMemo, setEditMemo] = useState<string>('');

  const selectedRes = reservations.find(r => r.id === selectedResId) || null;

  // Set edit field values when selecting a booking
  const handleSelectRes = (res: Reservation) => {
    setSelectedResId(res.id);
    setIsEditing(false); // Default to review view first
    
    setEditDate(res.date);
    setEditTime(res.time);
    setEditArea(res.area);
    setEditName(res.name);
    setEditPhone(res.phone);
    setEditDetails(res.details);
    setEditStatus(res.status);
    setEditMemo(res.memo);
  };

  const handleSaveEdits = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResId) return;

    const updatedRes: Reservation = {
      id: selectedResId,
      date: editDate,
      time: editTime,
      name: editName,
      phone: editPhone,
      area: editArea,
      details: editDetails,
      status: editStatus,
      memo: editMemo,
      createdAt: selectedRes?.createdAt || new Date().toISOString()
    };

    updateReservation(updatedRes);
    setIsEditing(false);
    alert('상담 예약 마스터가 성공적으로 업데이트되었습니다.');
  };

  const handleDeleteRes = (id: string) => {
    if (window.confirm('의뢰인의 소중한 상담 기록을 원천 영구 파기하시겠습니까? 관련 세무/보안 백업을 확인하세요.')) {
      deleteReservation(id);
      setSelectedResId(null);
    }
  };

  // Status badge styling helper
  const getStatusBadge = (status: ReservationStatus) => {
    switch (status) {
      case '접수':
        return <span className="inline-flex items-center rounded-sm bg-blue-100 px-2 py-0.5 text-[11px] font-bold text-blue-700">접수대기</span>;
      case '진행중':
        return <span className="inline-flex items-center rounded-sm bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-700">진행중</span>;
      case '상담완료':
        return <span className="inline-flex items-center rounded-sm bg-green-100 px-2 py-0.5 text-[11px] font-bold text-green-700">상담완료</span>;
      case '취소':
        return <span className="inline-flex items-center rounded-sm bg-slate-200 px-2 py-0.5 text-[11px] font-bold text-slate-600">취소됨</span>;
      default:
        return <span className="inline-flex items-center rounded-sm bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-500">{status}</span>;
    }
  };

  // Filter reservations
  const filteredReservations = reservations.filter(res => {
    const matchSearch = res.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        res.phone.replace(/[^0-9]/g, '').includes(searchTerm.replace(/[^0-9]/g, '')) || 
                        res.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchArea = filterArea === 'all' || res.area === filterArea;
    const matchStatus = filterStatus === 'all' || res.status === filterStatus;
    
    return matchSearch && matchArea && matchStatus;
  });

  // Calculate stats counters
  const totalCount = reservations.length;
  const pendingCount = reservations.filter(r => r.status === '접수').length;
  const ongoingCount = reservations.filter(r => r.status === '진행중').length;
  const compCount = reservations.filter(r => r.status === '상담완료').length;
  const cancelCount = reservations.filter(r => r.status === '취소').length;

  return (
    <div className="bg-slate-900 min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-6 mb-8">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest bg-brand-navy p-1 px-2.5 rounded border border-brand-gold/30">
                SYSTEM ADMINISTRATOR SPACE
              </span>
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-slate-400">보안 등급: 최고 등급 보장</span>
            </div>
            
            <h1 className="font-serif text-3xl font-bold tracking-tight text-white mt-2">
              율인 상담 예약 마스터 관리실
            </h1>
          </div>

          <div className="mt-4 md:mt-0 bg-slate-950 p-3 rounded border border-slate-800 flex items-center space-x-3 text-xs text-slate-400">
            <span>실시간 연동: <span className="font-bold text-green-400">ON</span></span>
            <span className="text-slate-700">|</span>
            <span>최근 동기화: 2026-05-22 서울 표준시</span>
          </div>
        </div>

        {/* Dashboard Counters Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5 mb-8">
          <div className="rounded border border-slate-800 bg-slate-950 p-4">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">총 누적 예약</p>
            <p className="text-2xl font-black text-white mt-1">{totalCount}건</p>
          </div>
          <div className="rounded border border-slate-800 bg-slate-950 p-4">
            <p className="text-[10px] text-blue-500 uppercase tracking-wider font-semibold">접수 대기 목록</p>
            <p className="text-2xl font-black text-blue-400 mt-1">{pendingCount}건</p>
          </div>
          <div className="rounded border border-slate-800 bg-slate-950 p-4">
            <p className="text-[10px] text-amber-500 uppercase tracking-wider font-semibold">진행중 전담</p>
            <p className="text-2xl font-black text-amber-400 mt-1">{ongoingCount}건</p>
          </div>
          <div className="rounded border border-slate-800 bg-slate-950 p-4">
            <p className="text-[10px] text-green-500 uppercase tracking-wider font-semibold">상담 전격 완료</p>
            <p className="text-2xl font-black text-green-400 mt-1">{compCount}건</p>
          </div>
          <div className="rounded border border-slate-800 bg-slate-950 p-4 col-span-2 md:col-span-1">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">취소/파기 처리</p>
            <p className="text-2xl font-black text-slate-400 mt-1">{cancelCount}건</p>
          </div>
        </div>

        {/* Search controls & Query Filters */}
        <div className="rounded border border-slate-800 bg-slate-950 p-4 mb-8 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="의뢰인 성명, 연락처(-없이 가능) 또는 내용 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded bg-slate-900 border border-slate-800 pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 md:w-80">
            <select
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded p-2.5 text-xs text-slate-300 focus:outline-none"
            >
              <option value="all">모든 법률 분야</option>
              <option value="민사">민사</option>
              <option value="형사">형사</option>
              <option value="가사">가사</option>
              <option value="회생·파산">회생·파산</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded p-2.5 text-xs text-slate-300 focus:outline-none"
            >
              <option value="all">모든 진행 상태</option>
              <option value="접수">접수대기</option>
              <option value="진행중">진행중</option>
              <option value="상담완료">상담완료</option>
              <option value="취소">취소됨</option>
            </select>
          </div>
        </div>

        {/* Master Database Area split into Table & Inspector Details inside single frame */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Left panel: List Table */}
          <div className="lg:col-span-7 rounded border border-slate-800 bg-slate-950 p-4 overflow-hidden h-[600px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <span className="text-xs font-bold text-brand-gold flex items-center">
                  <FileSpreadsheet className="mr-1.5 h-4 w-4 text-brand-gold animate-pulse" />
                  <span>예약 데이터베이스 실시간 원장</span>
                </span>
                <span className="text-[10px] text-slate-500">필터 검색 매칭: {filteredReservations.length}건</span>
              </div>

              {/* Responsive custom design Table */}
              <div className="overflow-y-auto max-h-[480px]">
                {filteredReservations.length === 0 ? (
                  <div className="text-center py-20 text-slate-500 text-xs">
                    <AlertCircle className="mx-auto h-8 w-8 text-slate-600 mb-3" />
                     매칭되는 예약 내역이 원장에 존재하지 않습니다.
                  </div>
                ) : (
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="py-2.5">일정 (날짜/시간)</th>
                        <th className="py-2.5">성명</th>
                        <th className="py-2.5">상담 분야</th>
                        <th className="py-2.5 text-right">상태</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredReservations.map((res) => (
                        <tr 
                          key={res.id} 
                          onClick={() => handleSelectRes(res)}
                          className={`hover:bg-slate-900 cursor-pointer transition-colors ${
                            selectedResId === res.id ? 'bg-slate-900 border-l border-brand-gold pl-2' : ''
                          }`}
                        >
                          <td className="py-3 font-medium text-slate-300">
                            {res.date} <span className="text-[11px] font-bold text-brand-gold ml-1">({res.time})</span>
                          </td>
                          <td className="py-3 font-bold text-white">{res.name}</td>
                          <td className="py-3 text-slate-400">{res.area}</td>
                          <td className="py-3 text-right">{getStatusBadge(res.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-3 text-[10px] text-slate-500 flex justify-between items-center">
              <span>* 행을 클릭하시면 상세 신상명세 및 상담기록 검사와 관리자 메모 수정방이 열립니다.</span>
              <span>Yulin Law Firm System</span>
            </div>
          </div>

          {/* Right panel: Inspector / Edit Card */}
          <div className="lg:col-span-5">
            {selectedRes ? (
              <div className="rounded border border-slate-800 bg-slate-950 p-6 shadow-2xl relative">
                
                {/* Header indicators */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-mono">CLIENT CASE DOSSIER</span>
                    <h3 className="font-serif text-lg font-bold text-white mt-0.5">상세 신상 및 소장 검토서</h3>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="rounded bg-slate-800 hover:bg-slate-700 hover:text-brand-gold px-3 py-1.5 text-xs font-semibold text-slate-300 transition"
                    >
                      {isEditing ? '보기 모드' : '수정 모드'}
                    </button>
                    
                    <button
                      onClick={() => handleDeleteRes(selectedRes.id)}
                      className="rounded bg-red-950/40 border border-red-900/60 hover:bg-red-950 px-2 py-1.5 text-xs font-semibold text-red-400 transition"
                      title="소장 영구 파기"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  /* EDITING FORM PORTLET */
                  <form onSubmit={handleSaveEdits} className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">상담 날짜</label>
                        <input
                          type="date"
                          value={editDate}
                          onChange={(e) => setEditDate(e.target.value)}
                          className="w-full rounded bg-slate-900 border border-slate-850 p-2 text-xs text-white focus:outline-none focus:border-brand-gold"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">시간 대역</label>
                        <select
                          value={editTime}
                          onChange={(e) => setEditTime(e.target.value)}
                          className="w-full rounded bg-slate-900 border border-slate-850 p-2 text-xs text-white focus:outline-none focus:border-brand-gold"
                        >
                          {RESERVATION_TIMES.map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">의뢰인 성명</label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full rounded bg-slate-900 border border-slate-850 p-2 text-xs text-white focus:outline-none focus:border-brand-gold"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">일관 연락처</label>
                        <input
                          type="text"
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value)}
                          className="w-full rounded bg-slate-900 border border-slate-850 p-2 text-xs text-white focus:outline-none focus:border-brand-gold"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">상담 소송 전담 분야</label>
                      <select
                        value={editArea}
                        onChange={(e) => setEditArea(e.target.value)}
                        className="w-full rounded bg-slate-900 border border-slate-850 p-2 text-xs text-white focus:outline-none focus:border-brand-gold"
                      >
                        <option value="민사">민사</option>
                        <option value="형사">형사</option>
                        <option value="가사">가사</option>
                        <option value="회생·파산">회생·파산</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">의뢰 내용 요강</label>
                      <textarea
                        rows={3}
                        value={editDetails}
                        onChange={(e) => setEditDetails(e.target.value)}
                        className="w-full rounded bg-slate-900 border border-slate-850 p-2 text-xs text-white focus:outline-none focus:border-brand-gold"
                        required
                      />
                    </div>

                    <div className="border-t border-slate-850 pt-3">
                      <label className="block text-[10px] text-brand-gold uppercase tracking-wider mb-1 font-bold">1. 상담 상태 변경 (접수 / 상담완료 / 진행중 / 취소)</label>
                      <div className="grid grid-cols-4 gap-1">
                        {(['접수', '진행중', '상담완료', '취소'] as ReservationStatus[]).map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => setEditStatus(st)}
                            className={`rounded py-1.5 text-[10px] font-bold border ${
                              editStatus === st
                                ? 'bg-brand-gold border-brand-gold text-brand-navy'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {st === '접수' ? '접수대기' : st}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-brand-gold uppercase tracking-wider mb-grow font-bold flex items-center">
                        <MessageSquare className="mr-1 h-3.5 w-3.5" />
                        <span>2. 변호인 내부 심의 메모 (상태 영구 저장)</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="전화 상담 시간 조율 경위, 징구해야 할 조서, 기성 서집 기획 등을 기록하세요..."
                        value={editMemo}
                        onChange={(e) => setEditMemo(e.target.value)}
                        className="w-full rounded bg-slate-900 border border-slate-850 p-2 text-xs text-yellow-300 font-mono focus:outline-none focus:border-brand-gold"
                      />
                    </div>

                    <div className="pt-2 flex space-x-2">
                      <button
                        type="submit"
                        className="flex-1 rounded bg-brand-gold hover:bg-brand-gold-light py-2 px-4 text-xs font-extrabold text-brand-navy transition cursor-pointer"
                      >
                        수정사항 데이터 저장
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="rounded bg-slate-900 border border-slate-800 hover:border-slate-700 py-2 px-4 text-xs font-semibold text-slate-400 transition"
                      >
                        취소
                      </button>
                    </div>

                  </form>
                ) : (
                  /* VIEW DETAILS MODE */
                  <div className="space-y-4 text-xs leading-normal">
                    
                    <div className="grid grid-cols-2 gap-4 bg-slate-900/60 p-3 rounded border border-slate-850">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">희망 일자</span>
                        <span className="font-serif text-sm font-bold text-white mt-0.5 block">{selectedRes.date}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">상담 시각</span>
                        <span className="font-serif text-sm font-bold text-brand-gold mt-0.5 block">{selectedRes.time}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex border-b border-slate-850 pb-2 justify-between">
                        <span className="text-slate-500 font-medium">의뢰인 성명</span>
                        <span className="font-bold text-white text-sm">{selectedRes.name}</span>
                      </div>
                      <div className="flex border-b border-slate-850 pb-2 justify-between">
                        <span className="text-slate-500 font-medium">연락처 일렬</span>
                        <a href={`tel:${selectedRes.phone}`} className="font-semibold text-brand-gold hover:underline">{selectedRes.phone}</a>
                      </div>
                      <div className="flex border-b border-slate-850 pb-2 justify-between">
                        <span className="text-slate-500 font-medium">법률 지정 분야</span>
                        <span className="font-bold text-slate-300">{selectedRes.area} 전문</span>
                      </div>
                      <div className="flex border-b border-slate-850 pb-2 justify-between">
                        <span className="text-slate-500 font-medium">신청 접수 시각</span>
                        <span className="text-slate-400 font-mono">{new Date(selectedRes.createdAt).toLocaleString('ko-KR')}</span>
                      </div>
                      <div className="flex border-b border-slate-850 pb-2 justify-between items-center">
                        <span className="text-slate-500 font-medium">상담 검토 진행태</span>
                        <span>{getStatusBadge(selectedRes.status)}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase block tracking-wider mb-1">의뢰내용 원 기록</span>
                      <div className="bg-slate-900 p-3 rounded border border-slate-850 font-sans text-slate-300 leading-relaxed max-h-[120px] overflow-y-auto">
                        {selectedRes.details}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-brand-gold font-bold uppercase block tracking-wider mb-1 flex items-center">
                        <MessageSquare className="mr-1 h-3 w-3" />
                        <span>변호인 전담 심의 메모</span>
                      </span>
                      <div className="bg-[#1e1e24] p-3 rounded border border-slate-800 text-yellow-300 font-mono text-xs whitespace-pre-wrap leading-relaxed min-h-[80px]">
                        {selectedRes.memo || '작성된 전담 메모가 존재하지 않습니다. 우측 상단 "수정 모드"를 눌러 내부 소송 요도를 일지하십시오.'}
                      </div>
                    </div>

                    {selectedRes.status === '접수' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const updated = { ...selectedRes, status: '진행중' as ReservationStatus };
                            updateReservation(updated);
                            handleSelectRes(updated);
                          }}
                          className="flex-1 rounded-sm bg-amber-600 hover:bg-amber-500 py-2.5 text-center font-bold text-white transition active:scale-95 cursor-pointer"
                        >
                          진행 승인 처리
                        </button>
                        <button
                          onClick={() => {
                            const updated = { ...selectedRes, status: '상담완료' as ReservationStatus };
                            updateReservation(updated);
                            handleSelectRes(updated);
                          }}
                          className="flex-1 rounded-sm bg-green-700 hover:bg-green-600 py-2.5 text-center font-bold text-white transition active:scale-95 cursor-pointer"
                        >
                          상담완료 처리
                        </button>
                      </div>
                    )}

                  </div>
                )}

              </div>
            ) : (
              <div className="rounded border-2 border-dashed border-slate-850 bg-slate-950/40 p-12 text-center h-[340px] flex flex-col justify-center items-center text-slate-500 text-xs">
                <BadgeAlert className="h-10 w-10 text-slate-700 mb-3" />
                <p className="font-bold text-slate-400">의뢰사건 정밀 검토 대상 없음</p>
                <p className="mt-1.5 max-w-[240px] text-[11px] text-slate-500 leading-normal">
                  왼쪽 예약목록 테이블에서 성함을 클릭하시면 이곳에 고객의 사실관계 기재 원본 및 변호사 내부 메모작성 기능이 로드됩니다.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Real-time Notification System Dashboard Control Panel */}
        <div className="mt-12 rounded border border-slate-800 bg-slate-950 p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 mb-6 gap-4">
            <div>
              <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest bg-brand-navy p-1 px-2 mb-1.5 inline-block rounded border border-brand-gold/20">
                REAL-TIME DISPATCH ENGINE
              </span>
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <Bell className="h-5 w-5 text-brand-gold animate-bounce" />
                <span>율인 실시간 상담예약 알람 제어센터</span>
              </h3>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={fetchNotificationLogs}
                disabled={isNotificationsLoading}
                className="rounded bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-2 text-xs font-bold text-slate-300 transition cursor-pointer active:scale-95"
              >
                {isNotificationsLoading ? '조회 중...' : '동기화/새로고침'}
              </button>
              <button
                type="button"
                onClick={handleSendTestNotification}
                disabled={isSendingTest}
                className="rounded bg-brand-gold hover:bg-brand-gold-light px-4 py-2 text-xs font-extrabold text-brand-navy transition cursor-pointer active:scale-95 flex items-center gap-1.5"
              >
                <Send className="h-3.5 w-3.5 animate-pulse" />
                <span>{isSendingTest ? '테스트 실행중...' : '테스트 알람 발송'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Status indicators */}
            <div className="lg:col-span-1 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">알림 연동 상태 및 환경정보</h4>
              
              <div className="rounded bg-slate-900/60 border border-slate-850 p-4 space-y-3">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                  <span className="text-xs text-slate-400">SMTP 메일 알람 연동</span>
                  <div className="flex items-center gap-1.5">
                    {smtpConfigured ? (
                      <>
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-xs font-bold text-green-400">연동 활성화</span>
                      </>
                    ) : (
                      <>
                        <span className="h-2 w-2 rounded-full bg-slate-600" />
                        <span className="text-xs font-bold text-slate-400">시뮬레이션 모드</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Twilio SMS 문자 연동</span>
                  <div className="flex items-center gap-1.5">
                    {smsConfigured ? (
                      <>
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-xs font-bold text-green-400">연동 활성화</span>
                      </>
                    ) : (
                      <>
                        <span className="h-2 w-2 rounded-full bg-slate-600" />
                        <span className="text-xs font-bold text-slate-400">시뮬레이션 모드</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-brand-navy/30 p-4 rounded border border-slate-800 text-xs text-slate-300 space-y-2">
                <p className="font-extrabold text-brand-gold flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>실시간 알람 작동 매뉴얼</span>
                </p>
                <p className="leading-relaxed text-[11px]">
                  의뢰인이 홈페이지 예약 신청을 완료하면 즉시 지정된 이메일 계정 및 기재한 연락처로 알람이 도달합니다.
                </p>
                <button
                  type="button"
                  onClick={() => setShowNotificationHelp(!showNotificationHelp)}
                  className="text-[11px] text-brand-gold hover:underline font-bold text-left block"
                >
                  {showNotificationHelp ? '설정 가이드 닫기 ▲' : '서버 Secrets 환경변수 세팅 가이드 보기 ▼'}
                </button>
              </div>

              {showNotificationHelp && (
                <div className="bg-slate-900 border border-slate-800 p-4 rounded text-[11px] text-slate-400 space-y-2 animate-fade-in font-mono">
                  <p className="font-bold text-slate-200">※ .env.example / Secrets 구성 항목</p>
                  <div className="space-y-1">
                    <p><span className="text-brand-gold">SMTP_HOST</span>: "smtp.naver.com" (네이버/구글 등)</p>
                    <p><span className="text-brand-gold">SMTP_PORT</span>: 587 (혹은 465)</p>
                    <p><span className="text-brand-gold">SMTP_USER</span>: "본인계정@naver.com"</p>
                    <p><span className="text-brand-gold">SMTP_PASS</span>: "네이버 애플리케이션 비밀번호"</p>
                    <p><span className="text-brand-gold">NOTIFICATION_RECEIVER_EMAIL</span>: 수신용 법무 메일</p>
                  </div>
                  <div className="border-t border-slate-800 pt-2 space-y-1">
                    <p><span className="text-brand-gold">TWILIO_ACCOUNT_SID</span>: Twilio SID</p>
                    <p><span className="text-brand-gold">TWILIO_AUTH_TOKEN</span>: Twilio 토큰</p>
                    <p><span className="text-brand-gold">TWILIO_PHONE_NUMBER</span>: 발신 가상 번호</p>
                    <p><span className="text-brand-gold">NOTIFICATION_RECEIVER_PHONE</span>: 비서 수신 연락처</p>
                  </div>
                </div>
              )}
            </div>

            {/* Notification logs history */}
            <div className="lg:col-span-2 flex flex-col h-[300px] overflow-hidden justify-between border border-slate-850 rounded bg-slate-900/40 p-4">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                  <span className="text-xs font-bold text-slate-300">최근 실시간 알람 전송 기록 (최대 100건 보관)</span>
                  <span className="text-[10px] text-slate-500">누적 로그: {notificationLogs.length}건</span>
                </div>

                <div className="overflow-y-auto flex-1 space-y-2 pr-1 scrollbar-thin">
                  {notificationLogs.length === 0 ? (
                    <div className="text-center py-16 text-slate-600 text-[11px]">
                      연동 이후 수신되거나 테스트 전송된 알람 내역이 존재하지 않습니다.<br />
                      우측 상단 '테스트 알람 발송' 또는 예약폼에서 테스트해보세요!
                    </div>
                  ) : (
                    notificationLogs.map((log: any) => (
                      <div 
                        key={log.id} 
                        className="p-3 rounded bg-slate-950 border border-slate-850 flex items-start justify-between text-[11px] leading-relaxed gap-2"
                      >
                        <div className="space-y-1 w-full">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                              log.type === 'email' ? 'bg-indigo-950 text-indigo-300 border border-indigo-900' : 'bg-emerald-950 text-emerald-300 border border-emerald-900'
                            }`}>
                              {log.type === 'email' ? '📧 이메일' : '💬 문자메시지'}
                            </span>
                            
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold ${
                              log.status === 'sent' 
                                ? 'bg-green-950 text-green-300 border border-green-800' 
                                : log.status === 'simulated'
                                ? 'bg-slate-900 text-slate-400 border border-slate-800'
                                : 'bg-red-950 text-red-300 border border-red-800'
                            }`}>
                              {log.status === 'sent' ? '실제발송' : log.status === 'simulated' ? '시뮬레이션완료' : '발송실패'}
                            </span>

                            <span className="text-slate-500 text-[10px] font-mono">
                              {new Date(log.timestamp).toLocaleTimeString('ko-KR')}
                            </span>
                          </div>
                          
                          <p className="text-slate-300 font-bold">수신 대상자: {log.recipient}</p>
                          <p className="text-slate-400 whitespace-pre-wrap line-clamp-2 mt-1">{log.body}</p>
                          {log.error && (
                            <p className="text-red-400 font-mono text-[9px] mt-0.5">에러 로그: {log.error}</p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
