import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLine } from "react-icons/fa";
import { PhoneCall, ShieldCheck, Wrench, Menu, X, Star, Send, MapPin, Map } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import bannerImg from "@assets/รวยล้านล้านเลเซอร์_(1640_x_800_px)_1778614840161.png";

const NAV_LINKS = [
  { name: "หน้าแรก", href: "#hero" },
  { name: "บริการของเรา", href: "#services" },
  { name: "ผลงาน", href: "#gallery" },
  { name: "วิธีสั่งทำ", href: "#how-to-order" },
  { name: "ติดต่อเรา", href: "#contact" },
];

const SERVICES = [
  {
    title: "เลี่ยมกรอบพระด้วยเลเซอร์",
    desc: "เทคโนโลยีเลเซอร์แม่นยำสูง ตัดขอบเนียนกริบ เข้ารูปพอดีกับองค์พระ",
    icon: <Wrench className="w-8 h-8 text-secondary" />,
  },
  {
    title: "กันน้ำ 100%",
    desc: "รับประกันน้ำไม่เข้า ด้วยเทคนิคซีลขอบพิเศษโดยช่างพนม",
    icon: <ShieldCheck className="w-8 h-8 text-secondary" />,
  },
  {
    title: "ออกแบบลวดลายพิเศษ",
    desc: "สลักลวดลายสวยงามตามสั่ง เพิ่มความมงคลและเป็นเอกลักษณ์",
    icon: <Star className="w-8 h-8 text-secondary" />,
  },
];

const REVIEWS = [
  {
    name: "คุณสมชาย",
    text: "งานละเอียดมากครับ สั่งทำกรอบทองเลเซอร์ กันน้ำได้จริงตามที่บอก ประทับใจมาก",
    rating: 5,
  },
  {
    name: "คุณวิภา",
    text: "ช่างพนมให้คำแนะนำดีมากค่ะ พระเก่าเก็บมานาน เอามาเลี่ยมใหม่สวยเหมือนเพิ่งเช่ามาเลย",
    rating: 5,
  },
  {
    name: "พี่เอก นนทบุรี",
    text: "ไว้ใจที่นี่เสมอครับ ทำมากี่องค์ก็เนียนกริบ สมราคาจริงๆ",
    rating: 5,
  },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "ส่งข้อความสำเร็จ",
      description: "ทางเราจะติดต่อกลับโดยเร็วที่สุด ขอบคุณครับ",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      {/* Sticky Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-primary/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center border-2 border-secondary shadow-lg">
                <ShieldCheck className="text-secondary w-6 h-6" />
              </div>
              <span className="font-serif text-2xl font-bold text-primary tracking-wide">
                รวยล้านล้านเลเซอร์
              </span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-foreground hover:text-primary transition-colors font-medium text-lg"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground hover:text-primary p-2"
                data-testid="button-mobile-menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-b border-primary/20"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-md"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-20 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-background/95 z-10" />
          {/* Use the banner image directly from assets via vite import */}
          <img
            src={bannerImg}
            alt="รวยล้านล้านเลเซอร์ Banner"
            className="w-full h-full object-cover object-center opacity-40"
          />
        </div>
        
        {/* CSS Sparkles */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-secondary rounded-full animate-pulse shadow-[0_0_8px_2px_rgba(255,215,0,0.8)]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 2 + 1}s`,
                animationDelay: `${Math.random()}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-secondary mb-6 drop-shadow-lg">
              รวยล้านล้านเลเซอร์
            </h1>
            <p className="text-xl md:text-3xl font-medium text-white mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              ศูนย์รวมเลี่ยมกรอบพระด้วยเลเซอร์ <br className="hidden md:block"/>
              <span className="text-secondary">งานดี กันน้ำ 100%</span> ฝีมือช่างผู้ชำนาญการ By ช่างพนม
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, "#contact")}
                className="px-8 py-4 bg-secondary text-primary font-bold text-lg rounded-full hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(255,215,0,0.5)] transform hover:scale-105"
                data-testid="button-hero-cta"
              >
                สั่งทำกรอบพระเลย
              </a>
              <a
                href="tel:0634650129"
                className="px-8 py-4 bg-white/10 text-white font-bold text-lg rounded-full hover:bg-white/20 transition-all border border-white/30 backdrop-blur-sm flex items-center gap-2"
              >
                <PhoneCall className="w-5 h-5" /> 063-465-0129
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About/USP Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">ทำไมต้อง รวยล้านล้านเลเซอร์?</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="p-8 rounded-2xl bg-background border border-primary/10 shadow-lg text-center hover:shadow-xl transition-shadow relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-secondary/[0.05] z-0" />
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-background relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">ผลงานของเรา</h2>
            <p className="text-lg text-muted-foreground">ความประณีตที่ส่งมอบให้ลูกค้าทุกท่าน</p>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full mt-4" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[...Array(8)].map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="aspect-[3/4] rounded-xl bg-gradient-to-br from-yellow-100 to-yellow-600 p-1 shadow-md hover:shadow-2xl transition-all"
              >
                <div className="w-full h-full bg-white rounded-lg p-2 flex items-center justify-center relative overflow-hidden">
                  {/* CSS Mock Amulet */}
                  <div className="w-[80%] h-[90%] rounded-[40%] border-[6px] border-secondary/80 bg-gradient-to-b from-primary/10 to-primary/30 flex items-center justify-center shadow-inner relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.4),transparent)] rounded-[40%]" />
                    <div className="w-1/2 h-2/3 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-[30%] opacity-50 blur-[2px]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Order */}
      <section id="how-to-order" className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">ขั้นตอนการสั่งทำ</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "ส่งรูปองค์พระ", desc: "ถ่ายรูปองค์พระชัดๆ พร้อมขนาด" },
              { step: 2, title: "เลือกแบบกรอบ", desc: "เลือกแบบและวัสดุที่ต้องการ" },
              { step: 3, title: "ประเมินราคา", desc: "ช่างพนมแจ้งราคาและเวลาทำ" },
              { step: 4, title: "รับงานคุณภาพ", desc: "จัดส่งถึงมือ ปลอดภัย 100%" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="text-center relative"
              >
                <div className="w-20 h-20 mx-auto bg-secondary text-primary rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-[0_0_15px_rgba(255,215,0,0.5)] z-10 relative">
                  {item.step}
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-[2px] bg-secondary/30 -z-0" />
                )}
                <h3 className="text-xl font-bold mb-2 text-secondary">{item.title}</h3>
                <p className="text-primary-foreground/80">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">เสียงตอบรับจากลูกค้า</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-white border border-primary/10 shadow-lg relative"
              >
                <div className="flex text-secondary mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-foreground/80 mb-6 italic">"{review.text}"</p>
                <div className="font-bold text-primary">{review.name}</div>
                <div className="absolute top-4 right-4 text-primary/10">
                  <Star className="w-12 h-12 fill-current" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">ติดต่อช่างพนม</h2>
              <p className="text-lg text-muted-foreground mb-8">
                ยินดีให้คำปรึกษาฟรี สอบถามราคา หรือส่งรูปพระมาให้ประเมินก่อนได้ครับ
              </p>

              <div className="space-y-6">
                <a
                  href="tel:0634650129"
                  className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-md">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">โทรศัพท์</div>
                    <div className="text-xl font-bold text-primary">063-465-0129</div>
                  </div>
                </a>

                <a
                  href="https://line.me/ti/p/~ruaylanlanlazer"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#00B900]/10 hover:bg-[#00B900]/20 transition-colors"
                >
                  <div className="w-12 h-12 bg-[#00B900] rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-md">
                    <FaLine className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">LINE ID</div>
                    <div className="text-xl font-bold text-[#00B900]">@ruaylanlanlazer</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-md">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">ที่ตั้งร้าน</div>
                    <div className="text-base font-medium text-foreground">
                      ตลาดพระเครื่อง ภาคกลาง<br/>
                      เปิดบริการทุกวัน 09:00 - 18:00 น.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleContactSubmit} className="p-8 rounded-2xl bg-background border border-primary/10 shadow-xl">
                <h3 className="text-2xl font-bold text-primary mb-6">ฝากข้อความ</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">ชื่อ-นามสกุล</label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      placeholder="คุณลูกค้า..."
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">เบอร์ติดต่อกลับ</label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                      placeholder="08X-XXX-XXXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">ข้อความหรือคำถาม</label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                      placeholder="สนใจเลี่ยมกรอบพระ..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    data-testid="button-submit-contact"
                  >
                    <Send className="w-5 h-5" /> ส่งข้อความ
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 border-t-4 border-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-secondary w-8 h-8" />
              <span className="font-serif text-2xl font-bold text-secondary">
                รวยล้านล้านเลเซอร์
              </span>
            </div>
            <div className="text-center md:text-right text-background/60 text-sm">
              <p>&copy; {new Date().getFullYear()} รวยล้านล้านเลเซอร์ By ช่างพนม. All rights reserved.</p>
              <p className="mt-1">งานดี กันน้ำ 100% เลี่ยมกรอบพระด้วยเลเซอร์</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        <a
          href="https://line.me/ti/p/~ruaylanlanlazer"
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 bg-[#00B900] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          data-testid="button-floating-line"
          aria-label="ติดต่อผ่าน LINE"
        >
          <FaLine className="w-8 h-8" />
        </a>
        <a
          href="tel:0634650129"
          className="w-14 h-14 bg-primary text-secondary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative group"
          data-testid="button-floating-call"
          aria-label="โทรเลย"
        >
          <div className="absolute inset-0 rounded-full animate-ping bg-primary/40 -z-10" />
          <PhoneCall className="w-7 h-7" />
          
          {/* Tooltip */}
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-foreground text-background px-3 py-1.5 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            โทรเลย!
            <div className="absolute top-1/2 -translate-y-1/2 right-[-4px] border-[6px] border-transparent border-l-foreground" />
          </span>
        </a>
      </div>
    </div>
  );
}
