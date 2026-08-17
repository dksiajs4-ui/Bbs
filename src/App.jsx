import React, { useState, useEffect, useRef } from "react";
import {
  Circle,
  Folder,
  Settings,
  Monitor,
  Scissors,
  Radio,
  FolderOpen,
  Moon,
  Crown,
  Home,
  Volume2,
  MicOff,
  EyeOff,
  ChevronRight,
  Square,
  Menu,
  X,
  Mic,
  Bell,
  Timer,
  Play,
} from "lucide-react";

const tabItems = [
  { icon: Home, label: "Ana Sayfa" },
  { icon: Monitor, label: "Kaydet" },
  { icon: Folder, label: "Kayıtlar" },
  { icon: Scissors, label: "Düzenle" },
  { icon: Settings, label: "Ayarlar" },
];

const moreMenuItems = [
  { icon: Radio, label: "Canlı Araçlar" },
  { icon: FolderOpen, label: "Dosya Gezgini" },
];

const statusCards = [
  { icon: Circle, title: "Ekran Kaydı", value: "Hazır", accent: true },
  { icon: Volume2, title: "Dahili Ses", value: "Açık" },
  { icon: MicOff, title: "Mikrofon", value: "Kapalı" },
  { icon: EyeOff, title: "Kayıt Butonu", value: "Gizli" },
];

const tools = [
  { icon: Scissors, title: "Düzenle", desc: "Videolarınızı düzenleyin" },
  { icon: Radio, title: "Canlı Yayın", desc: "Ekranınızı canlı yayınlayın" },
  { icon: FolderOpen, title: "Dosya Gezgini", desc: "Kayıt dosyalarınızı yönetin" },
];

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
        on ? "bg-red-600" : "bg-neutral-700"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
          on ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
}

function SettingRow({ icon: Icon, title, desc, control }) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-neutral-800 last:border-none gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center text-neutral-400 flex-shrink-0">
          <Icon size={17} />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-neutral-100 font-medium truncate">{title}</p>
          <p className="text-xs text-neutral-500 truncate">{desc}</p>
        </div>
      </div>
      {control}
    </div>
  );
}

function Select({ value }) {
  return (
    <button className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 flex-shrink-0 whitespace-nowrap">
      {value}
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function formatDuration(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

function SectionCard({ title, action, children }) {
  return (
    <div className="rounded-xl bg-neutral-950 border border-neutral-900 p-5 mb-4">
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">{title}</h2>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

function EmptyState({ icon: Icon, title, desc }) {
  return (
    <div className="flex flex-col items-center text-center py-10 px-4">
      <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-600 mb-3">
        <Icon size={20} />
      </div>
      <p className="text-sm font-medium text-neutral-300 mb-1">{title}</p>
      <p className="text-xs text-neutral-500">{desc}</p>
    </div>
  );
}

function RecordingGrid({ items }) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={Folder}
        title="Henüz kayıt yok"
        desc="İlk kaydını başlat, burada listelenecek."
      />
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((r) => (
        <a
          key={r.name}
          href={r.url}
          download={r.name}
          className="rounded-lg overflow-hidden bg-neutral-900 block"
        >
          <div className={`h-20 bg-gradient-to-br ${r.color} relative flex items-end justify-end p-2`}>
            <span className="text-[10px] bg-black/60 px-1.5 py-0.5 rounded">{r.dur}</span>
          </div>
          <div className="p-2">
            <p className="text-[11px] font-medium truncate">{r.name}</p>
            <p className="text-[10px] text-neutral-500 mt-0.5 truncate">{r.meta}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

/* ---------- Pages ---------- */

function HomePage({ onQuickStart, recordings }) {
  return (
    <>
      <h1 className="text-xl font-bold">BBS'ye Hoş Geldiniz!</h1>
      <p className="text-sm text-neutral-500 mt-1 mb-5">
        En iyi deneyim için tüm özellikler burada.
      </p>

      <div className="flex gap-3 overflow-x-auto mb-5 -mx-4 px-4 pb-1 snap-x">
        {statusCards.map((c, i) => (
          <div
            key={i}
            className="rounded-xl bg-neutral-950 border border-neutral-900 p-4 flex flex-col items-center text-center gap-2 flex-shrink-0 w-24 snap-start"
          >
            <div className={c.accent ? "text-red-500" : "text-neutral-400"}>
              <c.icon size={20} />
            </div>
            <p className="text-[11px] text-neutral-400 leading-tight">{c.title}</p>
            <p className="text-xs font-medium">{c.value}</p>
          </div>
        ))}
        <div className="rounded-xl bg-neutral-950 border border-neutral-900 p-4 flex flex-col items-center text-center gap-2 flex-shrink-0 w-24 snap-start">
          <div className="text-[10px] leading-tight font-bold bg-neutral-900 rounded-md px-2 py-1 whitespace-pre">
            {"1080P\n60FPS"}
          </div>
          <p className="text-[11px] text-neutral-400">Kalite</p>
          <p className="text-xs font-medium">Yüksek</p>
        </div>
      </div>

      <SectionCard>
        <button
          onClick={onQuickStart}
          className="w-full py-4 rounded-xl bg-red-600 active:bg-red-500 text-white font-semibold flex items-center justify-center gap-2"
        >
          <Circle size={16} fill="white" /> HIZLI KAYIT BAŞLAT
        </button>
        <p className="text-xs text-neutral-500 text-center mt-3">
          Kayıt hemen başlar, ekranda durdurma butonu belirir
        </p>
      </SectionCard>

      <SectionCard title="Araçlar">
        <div className="flex flex-col divide-y divide-neutral-900">
          {tools.map(({ icon: Icon, title, desc }) => (
            <button key={title} className="flex items-center justify-between py-3 first:pt-0 last:pb-0 text-left">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center text-neutral-400 flex-shrink-0">
                  <Icon size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{title}</p>
                  <p className="text-xs text-neutral-500 truncate">{desc}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-neutral-600 flex-shrink-0" />
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Son Kayıtlarım" action={<button className="text-xs text-neutral-400">Tümünü Gör</button>}>
        <RecordingGrid items={recordings.slice(0, 4)} />
      </SectionCard>
    </>
  );
}

function RecordPage({ recording, elapsed, onStart, onStop, mic, setMic, error }) {
  return (
    <>
      <h1 className="text-xl font-bold mb-1">Ekran Kaydet</h1>
      <p className="text-sm text-neutral-500 mb-5">Kaydı başlat, kaynağını ve mikrofonu kontrol et.</p>

      {error && (
        <div className="rounded-xl bg-red-950/40 border border-red-900/50 px-4 py-3 mb-4">
          <p className="text-xs text-red-400">{error}</p>
        </div>
      )}

      <div className="rounded-xl bg-neutral-950 border border-neutral-900 p-6 mb-4 flex flex-col items-center">
        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 border-4 ${
            recording ? "border-red-600 animate-pulse" : "border-neutral-800"
          }`}
        >
          <div className={`w-14 h-14 rounded-full ${recording ? "bg-red-600" : "bg-neutral-800"}`} />
        </div>
        <p className="text-sm font-medium mb-1">{recording ? "Kayıt sürüyor" : "Kayda hazır"}</p>
        <p
          className={`mb-5 tabular-nums ${
            recording ? "text-2xl font-bold text-red-500" : "text-xs text-neutral-500"
          }`}
        >
          {recording ? formatDuration(elapsed) : "1080p • 60FPS • 12 Mbps"}
        </p>

        {!recording ? (
          <button
            onClick={onStart}
            className="w-full py-4 rounded-xl bg-red-600 active:bg-red-500 text-white font-semibold flex items-center justify-center gap-2"
          >
            <Circle size={16} fill="white" /> KAYIT BAŞLAT
          </button>
        ) : (
          <button
            onClick={onStop}
            className="w-full py-4 rounded-xl bg-neutral-800 text-neutral-100 font-semibold flex items-center justify-center gap-2"
          >
            <Square size={14} /> DURDUR
          </button>
        )}
      </div>

      <SectionCard title="Kaynaklar">
        <SettingRow icon={Volume2} title="Ses Kaynağı" desc="Kaydedilecek ses" control={<Select value="Dahili Ses" />} />
        <SettingRow
          icon={Mic}
          title="Mikrofon"
          desc="Mikrofon kaydını aç/kapat"
          control={<Toggle on={mic} onChange={() => setMic(!mic)} />}
        />
      </SectionCard>
    </>
  );
}

function RecordingsPage({ recordings }) {
  return (
    <>
      <h1 className="text-xl font-bold mb-1">Kayıtlarım</h1>
      <p className="text-sm text-neutral-500 mb-5">Tüm kayıtların burada listelenir.</p>
      <SectionCard>
        <RecordingGrid items={recordings} />
      </SectionCard>
    </>
  );
}

function EditPage() {
  return (
    <>
      <h1 className="text-xl font-bold mb-1">Düzenle</h1>
      <p className="text-sm text-neutral-500 mb-5">Kayıtlarını kırp, birleştir, dışa aktar.</p>
      <SectionCard>
        <EmptyState
          icon={Scissors}
          title="Düzenlenecek kayıt yok"
          desc="Önce bir kayıt oluştur, sonra burada düzenle."
        />
      </SectionCard>
    </>
  );
}

function SettingsPage({ recordBtn, setRecordBtn, stealth, setStealth, notify, setNotify, btnOpacity, setBtnOpacity }) {
  return (
    <>
      <h1 className="text-xl font-bold mb-1">Ayarlar</h1>
      <p className="text-sm text-neutral-500 mb-5">Kayıt kalitesi ve davranışını buradan yönet.</p>

      <SectionCard title="Kalite">
        <SettingRow icon={Monitor} title="Çözünürlük" desc="Kayıt çözünürlüğü" control={<Select value="1080p" />} />
        <SettingRow icon={Radio} title="FPS" desc="Kare hızı" control={<Select value="60 FPS" />} />
        <SettingRow icon={Radio} title="Bitrate" desc="Video bitrate" control={<Select value="12 Mbps" />} />
      </SectionCard>

      <SectionCard title="Davranış">
        <SettingRow
          icon={EyeOff}
          title="Kayıt Butonu"
          desc="Ekranda göster/gizle"
          control={<Toggle on={recordBtn} onChange={() => setRecordBtn(!recordBtn)} />}
        />
        {recordBtn && (
          <div className="py-3.5 border-b border-neutral-800">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-neutral-400">Buton Şeffaflığı</p>
              <span className="text-xs text-neutral-500 tabular-nums">{Math.round(btnOpacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={Math.round(btnOpacity * 100)}
              onChange={(e) => setBtnOpacity(Number(e.target.value) / 100)}
              className="w-full accent-red-600"
            />
          </div>
        )}
        <SettingRow
          icon={EyeOff}
          title="Gizli Kayıt"
          desc="Kimse fark etmesin"
          control={<Toggle on={stealth} onChange={() => setStealth(!stealth)} />}
        />
        <SettingRow
          icon={Bell}
          title="Kayıt Sonrası Bildirim"
          desc="Kayıt bitince bildir"
          control={<Toggle on={notify} onChange={() => setNotify(!notify)} />}
        />
        <SettingRow icon={Timer} title="Otomatik Durdurma" desc="Süre dolunca kaydı durdur" control={<Select value="Kapalı" />} />
      </SectionCard>
    </>
  );
}

/* ---------- App ---------- */

function RecordingBubble({ elapsed, opacity, onStop }) {
  const [pos, setPos] = useState({ x: 16, y: 100 });
  const [expanded, setExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragInfo = useRef({ dragging: false, moved: false, startX: 0, startY: 0, origX: 0, origY: 0 });

  const BUBBLE = 56;

  const clamp = (x, y) => {
    const maxX = window.innerWidth - BUBBLE - 8;
    const maxY = window.innerHeight - BUBBLE - 8;
    return { x: Math.min(Math.max(x, 8), maxX), y: Math.min(Math.max(y, 8), maxY) };
  };

  const handlePointerDown = (e) => {
    const point = e.touches ? e.touches[0] : e;
    dragInfo.current = {
      dragging: true,
      moved: false,
      startX: point.clientX,
      startY: point.clientY,
      origX: pos.x,
      origY: pos.y,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!dragInfo.current.dragging) return;
    const point = e.touches ? e.touches[0] : e;
    const dx = point.clientX - dragInfo.current.startX;
    const dy = point.clientY - dragInfo.current.startY;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) dragInfo.current.moved = true;
    setPos(clamp(dragInfo.current.origX + dx, dragInfo.current.origY + dy));
  };

  const handlePointerUp = () => {
    if (dragInfo.current.dragging && !dragInfo.current.moved) {
      setExpanded((v) => !v);
    }
    dragInfo.current.dragging = false;
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchmove", handlePointerMove, { passive: false });
    window.addEventListener("touchend", handlePointerUp);
    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
    };
  });

  const panelAbove = pos.y > 140;

  return (
    <div
      className="fixed z-40"
      style={{ left: pos.x, top: pos.y, touchAction: "none" }}
    >
      <style>{`
        @keyframes bbsFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>

      {expanded && (
        <div
          className={`absolute flex flex-col items-center gap-1.5 ${
            panelAbove ? "bottom-full mb-2" : "top-full mt-2"
          } left-1/2 -translate-x-1/2`}
        >
          <div className="rounded-xl bg-neutral-950 border border-neutral-800 shadow-xl shadow-black/60 px-3 py-2.5 flex flex-col items-center gap-2 w-28">
            <span className="text-xs font-semibold text-red-500 tabular-nums">
              {formatDuration(elapsed)}
            </span>
            <button
              onClick={onStop}
              className="w-full py-2 rounded-lg bg-red-600 active:bg-red-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Square size={11} fill="white" /> Durdur
            </button>
            <button
              onClick={() => setExpanded(false)}
              className="text-[10px] text-neutral-500"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      <button
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        style={{
          width: BUBBLE,
          height: BUBBLE,
          backgroundColor: `rgba(20, 20, 20, ${opacity})`,
          animation: isDragging || expanded ? "none" : "bbsFloat 2.8s ease-in-out infinite",
        }}
        className="rounded-full backdrop-blur-md border-2 border-red-600 shadow-lg shadow-black/50 flex items-center justify-center active:scale-95 transition-transform"
      >
        <span className="w-4 h-4 rounded-full bg-red-600 animate-pulse" />
      </button>
    </div>
  );
}

export default function App() {
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [mic, setMic] = useState(false);
  const [recordBtn, setRecordBtn] = useState(true);
  const [stealth, setStealth] = useState(true);
  const [notify, setNotify] = useState(true);
  const [btnOpacity, setBtnOpacity] = useState(0.6);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Ana Sayfa");
  const [recordings, setRecordings] = useState([]);
  const [error, setError] = useState("");

  const streamRef = useRef(null);
  const micStreamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const startedAtRef = useRef(0);

  useEffect(() => {
    if (!recording) return;
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [recording]);

  const colorPalette = [
    "from-emerald-900 to-emerald-700",
    "from-fuchsia-900 to-purple-700",
    "from-amber-800 to-yellow-700",
    "from-sky-900 to-slate-700",
    "from-rose-900 to-red-700",
  ];

  const stopAllTracks = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    micStreamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    micStreamRef.current = null;
  };

  const handleStart = async () => {
    setError("");

    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      setError("Bu tarayıcı ekran kaydını desteklemiyor. Chrome/Edge gibi güncel bir tarayıcı gerekli.");
      return;
    }

    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 60 },
        audio: true,
      });

      let combinedStream = displayStream;

      if (mic) {
        try {
          const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          micStreamRef.current = micStream;
          combinedStream = new MediaStream([
            ...displayStream.getVideoTracks(),
            ...displayStream.getAudioTracks(),
            ...micStream.getAudioTracks(),
          ]);
        } catch (micErr) {
          setError("Mikrofon izni alınamadı, kayıt yalnızca sistem sesiyle devam ediyor.");
        }
      }

      streamRef.current = displayStream;
      chunksRef.current = [];

      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
        ? "video/webm;codecs=vp9"
        : "video/webm";

      const recorder = new MediaRecorder(combinedStream, { mimeType });
      recorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const durationSeconds = Math.max(1, Math.round((Date.now() - startedAtRef.current) / 1000));
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const now = new Date();
        const pad = (n) => String(n).padStart(2, "0");
        const name = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(
          now.getHours()
        )}-${pad(now.getMinutes())}-${pad(now.getSeconds())}.webm`;
        const sizeMB = (blob.size / (1024 * 1024)).toFixed(1);
        const color = colorPalette[recordings.length % colorPalette.length];

        setRecordings((prev) => [
          {
            name,
            dur: formatDuration(durationSeconds),
            meta: `1080p • ${sizeMB} MB`,
            url,
            color,
          },
          ...prev,
        ]);

        stopAllTracks();
      };

      // If the user stops sharing from the browser's own UI, treat it as a stop.
      displayStream.getVideoTracks()[0].addEventListener("ended", () => {
        if (recorderRef.current && recorderRef.current.state !== "inactive") {
          recorderRef.current.stop();
        }
        setRecording(false);
        setElapsed(0);
      });

      startedAtRef.current = Date.now();
      recorder.start();
      setElapsed(0);
      setRecording(true);
    } catch (err) {
      if (err && err.name === "NotAllowedError") {
        setError("Ekran kaydı izni verilmedi. Kayda başlamak için izin vermen gerekiyor.");
      } else {
        setError("Ekran kaydı başlatılamadı. Tekrar dener misin?");
      }
    }
  };

  const handleStop = () => {
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    }
    setRecording(false);
    setElapsed(0);
  };

  const pageProps = {
    recording,
    elapsed,
    onStart: handleStart,
    onStop: handleStop,
    mic,
    setMic,
    recordBtn,
    setRecordBtn,
    stealth,
    setStealth,
    notify,
    setNotify,
    btnOpacity,
    setBtnOpacity,
    error,
  };

  const renderPage = () => {
    switch (activeTab) {
      case "Ana Sayfa":
        return (
          <HomePage
            recordings={recordings}
            onQuickStart={async () => {
              setActiveTab("Kaydet");
              await handleStart();
            }}
          />
        );
      case "Kaydet":
        return <RecordPage {...pageProps} />;
      case "Kayıtlar":
        return <RecordingsPage recordings={recordings} />;
      case "Düzenle":
        return <EditPage />;
      case "Ayarlar":
        return <SettingsPage {...pageProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans flex flex-col pb-20">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-neutral-900 sticky top-0 bg-black z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
            <Circle size={12} className="text-white" fill="white" />
          </div>
          <div>
            <p className="text-xs font-bold tracking-tight leading-none">BBS RECORDER</p>
            <p className="text-[10px] text-neutral-500 leading-none mt-0.5">v1.0.0</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-300">
            <Moon size={14} />
          </button>
          <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-yellow-500 text-black text-xs font-semibold">
            <Crown size={12} />
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-300"
          >
            <Menu size={16} />
          </button>
        </div>
      </header>

      {/* Slide-over menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 flex">
          <div className="flex-1 bg-black/60" onClick={() => setMenuOpen(false)} />
          <div className="w-72 bg-neutral-950 border-l border-neutral-900 p-4 flex flex-col gap-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold">Menü</p>
              <button onClick={() => setMenuOpen(false)} className="text-neutral-400">
                <X size={18} />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {moreMenuItems.map(({ icon: Icon, label }) => (
                <button key={label} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-300 hover:bg-neutral-900 text-left">
                  <Icon size={17} /> {label}
                </button>
              ))}
            </div>

            <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-4 mt-2">
              <p className="text-sm font-medium mb-1">Depolama</p>
              <p className="text-xs text-neutral-500 mb-2">128 GB / 256 GB</p>
              <div className="h-1.5 rounded-full bg-neutral-800 overflow-hidden mb-1.5">
                <div className="h-full w-1/2 bg-red-600 rounded-full" />
              </div>
              <p className="text-[11px] text-neutral-500">%50 Kullanıldı</p>
            </div>

            <div className="rounded-xl bg-gradient-to-b from-yellow-950/40 to-neutral-950 border border-yellow-900/40 p-4">
              <p className="text-sm font-semibold text-yellow-500 mb-2">Premium'a Yükselt</p>
              <ul className="text-xs text-neutral-300 space-y-1.5 mb-3">
                {["Reklamsız kullanım", "Daha yüksek kalite", "Özel temalar", "Öncelikli destek"].map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <span className="text-emerald-500">✓</span> {t}
                  </li>
                ))}
              </ul>
              <button className="w-full py-2 rounded-lg border border-yellow-700/60 text-yellow-500 text-sm font-medium flex items-center justify-center gap-1.5">
                <Crown size={14} /> Yükselt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page content */}
      <main className="flex-1 px-4 pt-5">{renderPage()}</main>

      {/* Floating recording bubble */}
      {recording && recordBtn && (
        <RecordingBubble elapsed={elapsed} opacity={btnOpacity} onStop={handleStop} />
      )}

      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-neutral-950 border-t border-neutral-900 flex items-center justify-around py-2 px-1 z-20">
        {tabItems.map(({ icon: Icon, label }) => {
          const isActive = activeTab === label;
          return (
            <button
              key={label}
              onClick={() => setActiveTab(label)}
              className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg min-w-[56px] ${
                isActive ? "text-red-500" : "text-neutral-500"
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
