import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLine, FaFacebook } from "react-icons/fa";
import { PhoneCall, ShieldCheck, Sparkles, Droplets, Menu, X, Star, Clock, MapPin, ChevronRight } from "lucide-react";
import bannerImg from "../assets/banner.png";
import gallery1Img from "../assets/gallery1.png";
import gallery2Img from "../assets/gallery2.png";

// ============================================================
//  แก้ไขข้อมูลร้านได้ที่นี่ที่เดียว
// ============================================================
const SHOP_CONFIG = {
  name: "รวยล้านล้านเลเซอร์",
  tagline: "ศูนย์รวมเลี่ยมกรอบพระด้วยเลเซอร์",
  highlight: "งานดี กันน้ำ 100%",
  craftsman: "By ช่างพนม",
  phone: "063-465-0129",
  phoneRaw: "0634650129",
  // แก้ LINE ID ของคุณที่นี่ (ไม่ต้องใส่ @)
  lineId: "ruaylanlanlazer",
  // แก้ Facebook URL ของคุณที่นี่
  facebookUrl: "https://www.facebook.com/profile.php?id=61585500669796",
  address: "สอบถามที่ตั้งร้านได้ทาง LINE ครับ",
  hours: "เปิดทุกวัน 09:00 – 18:00 น.",
};

// ============================================================
//  เมนูนำทาง — แก้ชื่อหรือเพิ่มเมนูได้ที่นี่
// ============================================================
const NAV_LINKS = [
  { name: "หน้าแรก",   href: "#hero" },
  { name: "บริการ",    href: "#services" },
  { name: "ผลงาน",    href: "#gallery" },
  { name: "วิธีสั่งทำ", href: "#how-to-order" },
  { name: "ติดต่อเรา",  href: "#contact" },
];

// ============================================================
//  บริการ — แก้ข้อความหรือเพิ่มบริการได้ที่นี่
// ============================================================
const SERVICES = [
  {
    icon: <Sparkles className="w-8 h-8 text-yellow-500" />,
    title: "เลี่ยมกรอบเลเซอร์แม่นยำ",
    desc: "ตัดขอบด้วยเลเซอร์ เข้ารูปพอดีทุกองค์พระ ไม่ขูดขีดผิวเคลือบ",
  },
  {
    icon: <Droplets className="w-8 h-8 text-yellow-500" />,
    title: "กันน้ำ 100% รับประกัน",
    desc: "ซีลขอบพิเศษโดยช่างพนม ใส่อาบน้ำได้ ไม่เป็นสนิม ไม่ขึ้นราน้ำ",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-yellow-500" />,
    title: "ออกแบบลวดลายพิเศษ",
    desc: "สลักลวดลายตามสั่ง เพิ่มความมงคลและเป็นเอกลักษณ์เฉพาะตัว",
  },
];

// ============================================================
//  รีวิวลูกค้า — เพิ่มหรือแก้ไขรีวิวได้ที่นี่
// ============================================================
const REVIEWS = [
  {
    name: "คุณสมชาย",
    location: "กรุงเทพฯ",
    text: "งานละเอียดมากครับ สั่งทำกรอบทองเลเซอร์ กันน้ำได้จริงตามที่บอก ประทับใจมาก",
    rating: 5,
  },
  {
    name: "คุณวิภา",
    location: "เชียงใหม่",
    text: "ช่างพนมให้คำแนะนำดีมากค่ะ พระเก่าเก็บมานาน เอามาเลี่ยมใหม่สวยเหมือนเพิ่งเช่ามาเลย",
    rating: 5,
  },
  {
    name: "พี่เอก",
    location: "นนทบุรี",
    text: "ไว้ใจที่นี่เสมอครับ ทำมากี่องค์ก็เนียนกริบ สมราคาจริงๆ แนะนำเลย",
    rating: 5,
  },
];

// ============================================================
//  ขั้นตอนการสั่งทำ — แก้ไขได้ที่นี่
// ============================================================
const STEPS = [
  { step: 1, title: "ส่งรูปองค์พระ",   desc: "ถ่ายรูปองค์พระชัดๆ พร้อมขนาด ส่งมาทาง LINE" },
  { step: 2, title: "เลือกแบบกรอบ",   desc: "ช่างพนมแนะนำแบบที่เหมาะกับองค์พระของท่าน" },
  { step: 3, title: "ยืนยันและชำระ",  desc: "รับใบเสนอราคา ยืนยันงาน ชำระมัดจำ" },
  { step: 4, title: "รับงานคุณภาพ",   desc: "จัดส่งถึงมือท่านอย่างปลอดภัย พร้อมรับประกัน" },
];

// ============================================================
//  ภาพแกลเลอรี — วิธีใส่รูปจริง:
//  1. วางไฟล์รูปไว้ใน artifacts/laser-frame-shop/public/gallery/
//  2. แทนที่ null ด้วย "/gallery/ชื่อไฟล์.jpg" เช่น "/gallery/work1.jpg"
//  3. แต่ละ item มี caption สำหรับคำบรรยายรูป
// ============================================================
const GALLERY_ITEMS: { src: string | null; caption: string }[] = [
  { src: gallery1Img, caption: "ผลงานช่างพนม" },
  { src: gallery2Img, caption: "ผลงานช่างพนม" },
  { src: null, caption: "กรอบสแตนเลสเลเซอร์" },
  { src: null, caption: "กรอบทองคำขาว" },
  { src: null, caption: "กรอบพระหลวงพ่อโสธร" },
  { src: null, caption: "กรอบพระสมเด็จ" },
  { src: null, caption: "กรอบพระนาคปรก" },
  { src: null, caption: "กรอบพระพิมพ์ขนาดใหญ่" },
];

// ============================================================
//  Component หลัก
// ============================================================
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">

      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur border-b border-primary/15 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">

            {/* โลโก้ร้าน */}
            <a href="#hero" onClick={(e) => scrollTo(e, "#hero")} className="flex items-center gap-3 flex-shrink-0">
              {/*
                ── วิธีใส่โลโก้ของคุณ ──
                1. วางไฟล์โลโก้ไว้ใน artifacts/laser-frame-shop/src/assets/
                2. เพิ่ม import: import logoImg from "@assets/logo.png"
                3. แทนที่ <div> ด้านล่างด้วย: <img src={logoImg} alt="โลโก้" className="h-12 w-auto" />
              */}
              <div
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border-2 border-yellow-400 shadow"
                data-testid="img-logo-placeholder"
              >
                <ShieldCheck className="text-yellow-400 w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="font-serif font-bold text-primary text-lg leading-none">{SHOP_CONFIG.name}</div>
                <div className="text-xs text-muted-foreground">{SHOP_CONFIG.highlight}</div>
              </div>
            </a>

            {/* เมนู Desktop */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="px-4 py-2 rounded-lg text-foreground hover:text-primary hover:bg-primary/5 transition-all font-medium text-sm"
                >
                  {link.name}
                </a>
              ))}
              <a
                href={`tel:${SHOP_CONFIG.phoneRaw}`}
                className="ml-4 px-5 py-2 bg-primary text-white rounded-full font-bold text-sm hover:bg-primary/90 transition-all flex items-center gap-2 shadow-sm"
                data-testid="button-nav-call"
              >
                <PhoneCall className="w-4 h-4" />
                {SHOP_CONFIG.phone}
              </a>
            </div>

            {/* ปุ่มเมนู Mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-foreground hover:text-primary hover:bg-primary/5 transition-all"
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* เมนู Mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-primary/10"
            >
              <div className="px-4 py-3 space-y-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-foreground hover:text-primary hover:bg-primary/5 font-medium transition-all"
                  >
                    {link.name}
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </a>
                ))}
                <a
                  href={`tel:${SHOP_CONFIG.phoneRaw}`}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-xl font-bold mt-2"
                  data-testid="button-mobile-call"
                >
                  <PhoneCall className="w-4 h-4" />
                  โทร {SHOP_CONFIG.phone}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section id="hero" className="relative pt-16 md:pt-20 overflow-hidden">
        {/* Banner Image — เต็มความกว้าง */}
        <div className="relative w-full">
          <img
            src={bannerImg}
            alt="รวยล้านล้านเลเซอร์ Banner"
            className="w-full object-cover"
            style={{ maxHeight: "520px", objectPosition: "center" }}
          />
          {/* Overlay gradient ด้านล่างให้อ่านข้อความได้ */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* ข้อความและปุ่มบน Hero */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <motion.a
                  href="#contact"
                  onClick={(e) => scrollTo(e, "#contact")}
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative inline-flex items-center justify-center gap-2 px-7 py-3 bg-yellow-400 text-gray-900 font-bold rounded-full shadow-lg text-base"
                  data-testid="button-hero-contact"
                >
                  <FaLine className="w-5 h-5" />
                  ติดต่อสั่งทำเลย
                  {/* จุดแดงแจ้งเตือน */}
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full border-2 border-yellow-400 animate-bounce" />
                </motion.a>
                <a
                  href={`tel:${SHOP_CONFIG.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white/15 text-white font-bold rounded-full hover:bg-white/25 transition-all border border-white/40 backdrop-blur-sm text-base"
                  data-testid="button-hero-call"
                >
                  <PhoneCall className="w-5 h-5" />
                  {SHOP_CONFIG.phone}
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* แถบ USP ด้านล่าง Hero */}
        <div className="bg-primary text-white py-4">
          <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm md:text-base font-medium">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-yellow-400" />
              งานดี กันน้ำ 100%
            </span>
            <span className="hidden sm:block w-px h-5 bg-white/30" />
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              ฝีมือช่างผู้ชำนาญการ
            </span>
            <span className="hidden sm:block w-px h-5 bg-white/30" />
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              {SHOP_CONFIG.hours}
            </span>
          </div>
        </div>
      </section>

      {/* ── บริการ ─────────────────────────────────────────── */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">ทำไมต้อง รวยล้านล้านเลเซอร์?</h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto rounded-full mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="group p-8 rounded-2xl bg-background border border-primary/10 shadow-sm hover:shadow-lg hover:border-yellow-400/50 transition-all text-center"
              >
                <div className="w-16 h-16 mx-auto bg-primary/5 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-yellow-50 transition-colors">
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── แกลเลอรีผลงาน ─────────────────────────────────── */}
      <section id="gallery" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">ผลงานของเรา</h2>
            <p className="text-muted-foreground mt-3">ความประณีตที่ส่งมอบให้ลูกค้าทุกท่าน</p>
            <div className="w-20 h-1 bg-yellow-400 mx-auto rounded-full mt-4" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {GALLERY_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden border-2 border-yellow-400/30 hover:border-yellow-400 transition-all shadow-sm hover:shadow-xl"
              >
                {item.src ? (
                  /* ── รูปจริง: แก้ src ใน GALLERY_ITEMS ด้านบนให้ครบทุก item ── */
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  /* ── Placeholder: ยังไม่มีรูป ── */
                  <div className="w-full h-full bg-gradient-to-br from-yellow-50 to-amber-100 flex flex-col items-center justify-center gap-2 p-4">
                    <div className="w-16 h-16 rounded-full border-4 border-yellow-400/50 bg-yellow-100 flex items-center justify-center">
                      <Sparkles className="w-7 h-7 text-yellow-500/70" />
                    </div>
                    <span className="text-xs text-center text-muted-foreground font-medium leading-snug">
                      {item.caption}
                    </span>
                  </div>
                )}

                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs font-medium text-center">{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p {...fadeUp} className="text-center text-sm text-muted-foreground mt-6 italic">
            ผลงานอัปเดตเพิ่มเติมได้ทาง Facebook และ LINE ของร้าน
          </motion.p>
        </div>
      </section>

      {/* ── วิธีสั่งทำ ─────────────────────────────────────── */}
      <section id="how-to-order" className="py-20 bg-primary relative overflow-hidden">
        {/* พื้นหลังตกแต่ง */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-400">ขั้นตอนการสั่งทำ</h2>
            <div className="w-20 h-1 bg-yellow-400/50 mx-auto rounded-full mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {STEPS.map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto bg-yellow-400 text-primary rounded-2xl flex items-center justify-center text-2xl font-bold mb-5 shadow-lg shadow-black/20">
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-yellow-400 mb-2">{item.title}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA กลาง */}
          <motion.div {...fadeUp} className="text-center mt-14">
            <a
              href={`https://line.me/ti/p/~${SHOP_CONFIG.lineId}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-yellow-400 text-gray-900 font-bold text-lg rounded-full hover:bg-yellow-300 transition-all shadow-xl shadow-black/20"
              data-testid="button-steps-line"
            >
              <FaLine className="w-6 h-6" />
              เริ่มสั่งทำผ่าน LINE เลย
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── รีวิวลูกค้า ────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">เสียงตอบรับจากลูกค้า</h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto rounded-full mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="p-7 rounded-2xl bg-background border border-primary/10 shadow-sm hover:shadow-md transition-all relative"
              >
                {/* เครื่องหมายคำพูด */}
                <span className="absolute top-5 right-6 text-5xl text-primary/8 font-serif leading-none select-none">"</span>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(r.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed mb-5">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{r.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ติดต่อเรา ──────────────────────────────────────── */}
      <section id="contact" className="py-20 bg-background border-t border-primary/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">ติดต่อช่างพนม</h2>
            <p className="text-muted-foreground mb-10">
              ยินดีให้คำปรึกษาฟรี ส่งรูปพระมาประเมินก่อนได้เลยครับ
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
          >
            {/* ปุ่มโทร */}
            <a
              href={`tel:${SHOP_CONFIG.phoneRaw}`}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border-2 border-primary/20 hover:border-primary hover:shadow-lg transition-all group"
              data-testid="button-contact-phone"
            >
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <PhoneCall className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">โทรศัพท์</div>
                <div className="font-bold text-primary text-lg">{SHOP_CONFIG.phone}</div>
              </div>
            </a>

            {/* ปุ่ม LINE */}
            <a
              href={`https://line.me/ti/p/~${SHOP_CONFIG.lineId}`}
              target="_blank"
              rel="noreferrer"
              className="relative flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border-2 border-[#00B900] shadow-lg shadow-[#00B900]/15 hover:shadow-xl hover:shadow-[#00B900]/25 transition-all group"
              data-testid="button-contact-line"
            >
              {/* แถบ "แนะนำ" มุมบน */}
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[11px] font-bold px-3 py-0.5 rounded-full whitespace-nowrap shadow">
                แนะนำ! ตอบเร็วที่สุด
              </span>
              <div className="relative w-14 h-14 bg-[#00B900] rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform mt-1">
                <FaLine className="w-8 h-8 text-white" />
                {/* จุดออนไลน์ */}
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white">
                  <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                </span>
              </div>
              <div className="text-center">
                <div className="text-[11px] text-[#00B900] font-medium mb-0.5 flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00B900] animate-pulse" />
                  ออนไลน์อยู่
                </div>
                <div className="font-bold text-[#00B900] text-lg">@{SHOP_CONFIG.lineId}</div>
              </div>
            </a>

            {/* ปุ่ม Facebook */}
            <a
              href={SHOP_CONFIG.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border-2 border-[#1877F2]/20 hover:border-[#1877F2] hover:shadow-lg transition-all group"
              data-testid="button-contact-facebook"
            >
              <div className="w-14 h-14 bg-[#1877F2] rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <FaFacebook className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Facebook</div>
                <div className="font-bold text-[#1877F2] text-lg">รวยล้านๆเลเซอร์</div>
              </div>
            </a>
          </motion.div>

          {/* ที่อยู่ / เวลาเปิด */}
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              {SHOP_CONFIG.address}
            </span>
            <span className="hidden sm:block w-px h-4 bg-border" />
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary flex-shrink-0" />
              {SHOP_CONFIG.hours}
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-white py-10 border-t-4 border-yellow-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center border-2 border-yellow-400">
                <ShieldCheck className="text-yellow-400 w-5 h-5" />
              </div>
              <div>
                <div className="font-serif font-bold text-yellow-400 text-lg leading-none">{SHOP_CONFIG.name}</div>
                <div className="text-white/50 text-xs mt-0.5">{SHOP_CONFIG.craftsman}</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={`https://line.me/ti/p/~${SHOP_CONFIG.lineId}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-[#00B900] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="LINE"
              >
                <FaLine className="w-5 h-5 text-white" />
              </a>
              <a
                href={SHOP_CONFIG.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-[#1877F2] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5 text-white" />
              </a>
              <a
                href={`tel:${SHOP_CONFIG.phoneRaw}`}
                className="w-9 h-9 bg-primary rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="โทร"
              >
                <PhoneCall className="w-4 h-4 text-white" />
              </a>
            </div>

            <p className="text-white/40 text-xs text-center md:text-right">
              &copy; {new Date().getFullYear()} {SHOP_CONFIG.name}<br />
              {SHOP_CONFIG.highlight} เลี่ยมกรอบพระด้วยเลเซอร์
            </p>
          </div>
        </div>
      </footer>

      {/* ── ปุ่มลอย (Fixed) ────────────────────────────────── */}
      <div className="fixed bottom-6 right-5 flex flex-col gap-3 z-50">
        <a
          href={`https://line.me/ti/p/~${SHOP_CONFIG.lineId}`}
          target="_blank"
          rel="noreferrer"
          className="w-13 h-13 w-[52px] h-[52px] bg-[#00B900] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
          data-testid="button-floating-line"
          aria-label="ติดต่อ LINE"
        >
          <FaLine className="w-7 h-7" />
        </a>
        <a
          href={`tel:${SHOP_CONFIG.phoneRaw}`}
          className="relative w-[52px] h-[52px] bg-primary text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
          data-testid="button-floating-call"
          aria-label="โทรเลย"
        >
          <span className="absolute inset-0 rounded-full animate-ping bg-primary/40" />
          <PhoneCall className="w-6 h-6 relative" />
        </a>
      </div>

    </div>
  );
}
