import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CheckCircle2,
  Circle,
  ArrowLeft,
  Phone,
  MapPin,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";
import { FaLine } from "react-icons/fa";
import { fetchOrder, type OrderResult } from "@/lib/fetchOrder";

// ── ร้านค้า ──────────────────────────────────────────────────
const LINE_ID = "@285rnzxn";
const LINE_URL = `https://line.me/ti/p/~${LINE_ID}`;

// ── 4 ขั้นตอน ────────────────────────────────────────────────
const STEPS = [
  {
    id: 1,
    label: "รับงานแล้ว",
    desc: "ได้รับพระของคุณและบันทึกงานเรียบร้อย",
    icon: PackageCheck,
  },
  {
    id: 2,
    label: "ออกแบบ / เลเซอร์",
    desc: "กำลังออกแบบกรอบและตัดด้วยเลเซอร์แม่นยำ",
    icon: ShieldCheck,
  },
  {
    id: 3,
    label: "ประกอบ / กันน้ำ",
    desc: "ประกอบกรอบและเคลือบกันน้ำ 100%",
    icon: ShieldCheck,
  },
  {
    id: 4,
    label: "เสร็จสมบูรณ์",
    desc: "งานเสร็จแล้ว พร้อมส่งมอบ",
    icon: CheckCircle2,
  },
];

// ── animation presets ────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

export default function Track() {
  const [phone, setPhone] = useState("");
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OrderResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim() || !orderId.trim()) {
      setError("กรุณากรอกเบอร์โทรและรหัสงานให้ครบ");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetchOrder(phone, orderId);
      setResult(res);
    } catch {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Navbar ─────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
          <a
            href="/"
            className="flex items-center gap-1.5 text-gray-500 hover:text-primary transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            กลับหน้าแรก
          </a>
          <span className="text-gray-300">|</span>
          <span className="text-gray-800 font-semibold text-sm">
            ติดตามสถานะงาน
          </span>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-red-50 to-gray-50 py-10 px-4 text-center">
        <motion.div {...fadeUp} className="max-w-lg mx-auto">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            <Search className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            ติดตามสถานะงาน
          </h1>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            ติดตามสถานะงานเลี่ยมพระของคุณได้ง่ายๆ
            <br className="hidden sm:block" />
            เพียงกรอกข้อมูลด้านล่าง
          </p>
        </motion.div>
      </section>

      <main className="max-w-lg mx-auto px-4 pb-20 -mt-2">
        {/* ── Form Card ──────────────────────────────────── */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                เบอร์โทรศัพท์ที่ใช้สั่งทำ
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="เช่น 063-465-0129"
                  inputMode="tel"
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-sm
                             focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                             placeholder:text-gray-300 transition-all"
                />
              </div>
            </div>

            {/* Order ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                รหัสใบสั่งทำ
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="เช่น A101"
                  autoCapitalize="characters"
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-sm
                             focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                             placeholder:text-gray-300 transition-all"
                />
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-500 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold text-sm
                         flex items-center justify-center gap-2 shadow-md
                         hover:bg-primary/90 active:scale-95 transition-all
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  กำลังตรวจสอบ...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  ตรวจสอบสถานะ
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* ── Results ────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {result && result.found && result.source === "current" && (
            <CurrentJobResult key="current" result={result} />
          )}
          {result && result.found && result.source === "history" && (
            <HistoryResult key="history" result={result} />
          )}
          {result && !result.found && (
            <NotFoundResult key="notfound" />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// ── Current Job: Step Indicator ─────────────────────────────
function CurrentJobResult({
  result,
}: {
  result: Extract<import("@/lib/fetchOrder").OrderResult, { source: "current" }>;
}) {
  return (
    <motion.div
      {...fadeUp}
      className="bg-white rounded-2xl shadow-md border border-gray-100 p-6"
    >
      {/* Info */}
      <div className="mb-6 pb-5 border-b border-gray-100">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-gray-400 mb-1">รหัสงาน</p>
            <p className="text-xl font-bold text-primary">{result.orderId}</p>
            {result.description && (
              <p className="text-sm text-gray-600 mt-1">({result.description})</p>
            )}
          </div>
          {result.customerName && (
            <div className="text-right">
              <p className="text-xs text-gray-400 mb-1">ลูกค้า</p>
              <p className="text-sm font-semibold text-gray-800">
                {result.customerName}
              </p>
            </div>
          )}
        </div>
        {result.note && (
          <p className="mt-3 text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
            {result.note}
          </p>
        )}
      </div>

      {/* Steps */}
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-5">
        ความคืบหน้า
      </p>
      <div className="flex flex-col gap-0">
        {STEPS.map((step, i) => {
          const isDone = step.id < result.status;
          const isActive = step.id === result.status;
          const isLast = i === STEPS.length - 1;

          return (
            <div key={step.id} className="flex gap-4">
              {/* Icon + line */}
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.2, type: "spring" }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    isDone
                      ? "bg-green-500"
                      : isActive
                        ? "bg-primary shadow-lg shadow-primary/30"
                        : "bg-gray-100"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : isActive ? (
                    <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                </motion.div>
                {!isLast && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    style={{ transformOrigin: "top" }}
                    className={`w-0.5 h-8 mt-1 ${
                      isDone ? "bg-green-400" : "bg-gray-150"
                    }`}
                  />
                )}
              </div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className={`pb-8 ${isLast ? "pb-0" : ""}`}
              >
                <p
                  className={`text-sm font-semibold leading-tight ${
                    isDone
                      ? "text-green-600"
                      : isActive
                        ? "text-primary"
                        : "text-gray-300"
                  }`}
                >
                  {step.label}
                  {isActive && (
                    <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      กำลังดำเนินการ
                    </span>
                  )}
                </p>
                {(isDone || isActive) && (
                  <p className="text-xs text-gray-400 mt-0.5">{step.desc}</p>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── History: Completed ──────────────────────────────────────
function HistoryResult({
  result,
}: {
  result: Extract<import("@/lib/fetchOrder").OrderResult, { source: "history" }>;
}) {
  return (
    <motion.div
      {...fadeUp}
      className="bg-white rounded-2xl shadow-md border border-green-100 p-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.1 }}
        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4"
      >
        <CheckCircle2 className="w-9 h-9 text-green-500" />
      </motion.div>

      <h2 className="text-lg font-bold text-green-700 mb-1">
        ส่งมอบเสร็จสิ้นแล้ว
      </h2>
      <p className="text-sm text-gray-500 mb-1">รหัสงาน: {result.orderId}</p>
      {result.description && (
        <p className="text-sm text-gray-500 mb-1">({result.description})</p>
      )}
      {result.completionDate && (
        <p className="text-xs text-gray-400 mt-2">
          วันที่ส่งมอบ: {result.completionDate}
        </p>
      )}

      <p className="text-xs text-gray-400 mt-4 leading-relaxed">
        งานของคุณส่งมอบเรียบร้อยแล้ว
        <br />
        หากมีข้อสงสัย ติดต่อเราได้ทาง LINE
      </p>
      <a
        href={LINE_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-2 bg-[#00B900] text-white text-sm font-semibold
                   px-5 py-2.5 rounded-full hover:bg-[#009900] transition-colors shadow-sm"
      >
        <FaLine className="w-4 h-4" />
        ติดต่อทาง LINE
      </a>
    </motion.div>
  );
}

// ── Not Found ───────────────────────────────────────────────
function NotFoundResult() {
  return (
    <motion.div
      {...fadeUp}
      className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-center"
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 mb-4">
        <Search className="w-7 h-7 text-gray-400" />
      </div>
      <h2 className="text-base font-bold text-gray-800 mb-2">
        ไม่พบข้อมูลงานของคุณ
      </h2>
      <p className="text-sm text-gray-500 leading-relaxed mb-5">
        กรุณาตรวจสอบเบอร์โทรและรหัสงานอีกครั้ง
        <br />
        หรือติดต่อช่างพนม / คุณขวัญเรือน
        <br />
        ผ่านทาง LINE ได้เลยครับ
      </p>
      <a
        href={LINE_URL}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 bg-[#00B900] text-white text-sm font-semibold
                   px-5 py-2.5 rounded-full hover:bg-[#009900] transition-colors shadow-sm"
      >
        <FaLine className="w-4 h-4" />
        แชท LINE ทันที
      </a>
    </motion.div>
  );
}
