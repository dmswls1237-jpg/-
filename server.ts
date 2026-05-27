import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

interface NotificationLog {
  id: string;
  type: 'email' | 'sms';
  timestamp: string;
  status: 'sent' | 'failed' | 'simulated';
  recipient: string;
  subject?: string;
  body: string;
  error?: string;
}

interface ReservationPayload {
  name: string;
  phone: string;
  date: string;
  time: string;
  area: string;
  details: string;
}

// In-memory logs
const notificationLogs: NotificationLog[] = [];

// Email dispatcher
async function sendEmailNotification(payload: ReservationPayload): Promise<NotificationLog> {
  const smtpHost = process.env.SMTP_HOST || 'smtp.naver.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587');
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpSecure = smtpPort === 465;
  const receiver = process.env.NOTIFICATION_RECEIVER_EMAIL || 'lawprofessional@naver.com';

  const subject = `[율인 실시간예약 알림] ${payload.name} 의뢰인의 상담 신청이 접수되었습니다.`;
  const body = `
========================================
[법무법인 율인 - 실시간 소송상담 예약 접수]
========================================

신청 의뢰인: ${payload.name} 고객님
법률 소집분야: ${payload.area} 전문
연락처: ${payload.phone}
의뢰 일정: ${payload.date} (${payload.time})

[의뢰내용 개요]
----------------------------------------
${payload.details}
----------------------------------------

이 이메일은 율인 실시간 상담 예약 시스템에서 대표변호사 수신용으로 자동 생성되었습니다.
변호사 직접 책임원칙에 따라 3시간 이내에 보정 서면 분석 및 유선 상담을 개시하시기 바랍니다.
  `.trim();

  const timestamp = new Date().toISOString();
  const id = `email_${Math.floor(Math.random() * 90000 + 10000)}`;

  if (!smtpUser || !smtpPass) {
    console.log(`[SIMULATED EMAIL] To: ${receiver}\nSubject: ${subject}\nBody:\n${body}`);
    const log: NotificationLog = {
      id,
      type: 'email',
      timestamp,
      status: 'simulated',
      recipient: receiver,
      subject,
      body,
    };
    notificationLogs.unshift(log);
    return log;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    const info = await transporter.sendMail({
      from: `"법무법인 율인 알림" <${smtpUser}>`,
      to: receiver,
      subject,
      text: body
    });

    console.log('[SMTP MAIL SENT] Msg ID:', info.messageId);
    const log: NotificationLog = {
      id,
      type: 'email',
      timestamp,
      status: 'sent',
      recipient: receiver,
      subject,
      body,
    };
    notificationLogs.unshift(log);
    return log;
  } catch (err: any) {
    console.error('[SMTP EMAIL ERROR]', err);
    const log: NotificationLog = {
      id,
      type: 'email',
      timestamp,
      status: 'failed',
      recipient: receiver,
      subject,
      body,
      error: err.message || String(err)
    };
    notificationLogs.unshift(log);
    return log;
  }
}

// SMS dispatcher
async function sendSmsNotification(payload: ReservationPayload): Promise<NotificationLog> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNum = process.env.TWILIO_PHONE_NUMBER;
  const receiverNum = process.env.NOTIFICATION_RECEIVER_PHONE || payload.phone;

  const body = `[율인 법무법인] 실시간 상담예약이 알림 접수되었습니다: ${payload.name}님 (${payload.area}) ${payload.date} ${payload.time} 희망일정.`.trim();

  const timestamp = new Date().toISOString();
  const id = `sms_${Math.floor(Math.random() * 90000 + 10000)}`;

  if (!accountSid || !authToken || !fromNum) {
    console.log(`[SIMULATED SMS] To: ${receiverNum}\nBody: ${body}`);
    const log: NotificationLog = {
      id,
      type: 'sms',
      timestamp,
      status: 'simulated',
      recipient: receiverNum,
      body
    };
    notificationLogs.unshift(log);
    return log;
  }

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const authString = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
    
    const params = new URLSearchParams();
    params.append('To', receiverNum);
    params.append('From', fromNum);
    params.append('Body', body);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Twilio response error');
    }

    console.log('[REAL SMS SENT] Twilio Message SID:', data.sid);
    const log: NotificationLog = {
      id,
      type: 'sms',
      timestamp,
      status: 'sent',
      recipient: receiverNum,
      body
    };
    notificationLogs.unshift(log);
    return log;
  } catch (err: any) {
    console.error('[SMS ERROR]', err);
    const log: NotificationLog = {
      id,
      type: 'sms',
      timestamp,
      status: 'failed',
      recipient: receiverNum,
      body,
      error: err.message || String(err)
    };
    notificationLogs.unshift(log);
    return log;
  }
}

// ----------------------------------------
// API ENDPOINTS
// ----------------------------------------

// Health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Reservation notification dispatcher route
app.post("/api/notify-reservation", async (req, res) => {
  const { name, phone, date, time, area, details } = req.body;
  
  if (!name || !phone || !date || !time) {
    return res.status(400).json({ error: 'Missing reservation parameters' });
  }

  const payload: ReservationPayload = {
    name,
    phone,
    date,
    time,
    area: area || '미지정',
    details: details || '상세 기재 내용 없음'
  };

  // Run email and SMS dispatch concurrently
  const [emailResult, smsResult] = await Promise.all([
    sendEmailNotification(payload),
    sendSmsNotification(payload)
  ]);

  res.json({
    success: true,
    email: {
      status: emailResult.status,
      recipient: emailResult.recipient,
      simulated: emailResult.status === 'simulated'
    },
    sms: {
      status: smsResult.status,
      recipient: smsResult.recipient,
      simulated: smsResult.status === 'simulated'
    }
  });
});

// Notifications Log query route
app.get("/api/notifications", (req, res) => {
  res.json({
    logs: notificationLogs,
    smtpConfigured: !!(process.env.SMTP_USER && process.env.SMTP_PASS),
    smsConfigured: !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER)
  });
});

// Notification Trigger test route
app.post("/api/test-notification", async (req, res) => {
  const testPayload: ReservationPayload = {
    name: '테스트의뢰인',
    phone: '010-1234-5678',
    date: '2026-05-30',
    time: '오후 15:30',
    area: '형사',
    details: '테스트 상담예약 알람 연동입니다. 정상 작동 여부를 사전에 소명하는 심의 테스트용 전신입니다.'
  };

  const [emailResult, smsResult] = await Promise.all([
    sendEmailNotification(testPayload),
    sendSmsNotification(testPayload)
  ]);

  res.json({
    success: true,
    email: emailResult,
    sms: smsResult
  });
});

// ----------------------------------------
// VITE DEV SERVER & STACK MIDDLEWARES
// ----------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}

startServer();
