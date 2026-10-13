// إعدادات أكاديمية نور القرآن
// مهم: اكتبي رقم واتساب الأكاديمية بصيغة دولية من غير + أو مسافات.
// مثال لمصر: 201012345678
const WHATSAPP_NUMBER = "201000000000"; // استبدلي هذا الرقم برقم الأكاديمية الحقيقي

const messages = {
  general: "السلام عليكم، أريد الاستفسار عن أكاديمية نور القرآن والبرامج المتاحة.",
  adult: "السلام عليكم، أريد الاستفسار عن برنامج تحفيظ القرآن للكبار.",
  kids: "السلام عليكم، أريد الاستفسار عن برنامج تحفيظ القرآن للأطفال.",
  tajweed: "السلام عليكم، أريد الاستفسار عن برنامج تعليم أحكام التجويد.",
  noorani: "السلام عليكم، أريد الاستفسار عن القاعدة النورانية.",
  teachers: "السلام عليكم، أريد معرفة المعلمين والمعلمات المتاحين والتخصصات والمواعيد.",
  foundation: "السلام عليكم، أريد الاستفسار عن باقة التأسيس وأسعارها.",
  memorization: "السلام عليكم، أريد الاستفسار عن باقة الحفظ والمتابعة وأسعارها."
};

function getWhatsAppUrl(key = "general") {
  const number = WHATSAPP_NUMBER.replace(/\D/g, "");
  const message = messages[key] || messages.general;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll("[data-wa]").forEach((link) => {
  const key = link.dataset.wa || "general";
  link.href = getWhatsAppUrl(key);
  link.addEventListener("click", (event) => {
    if (WHATSAPP_NUMBER === "201000000000") {
      event.preventDefault();
      alert("قبل نشر الموقع، افتحي ملف script.js واستبدلي الرقم التجريبي برقم واتساب الأكاديمية الحقيقي بصيغة دولية، بدون + أو مسافات.");
    }
  });
});

// قائمة الموبايل
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "إغلاق القائمة" : "فتح القائمة");
  });
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// سنة حقوق النشر
document.getElementById("year").textContent = new Date().getFullYear();

// ظهور العناصر عند التمرير
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// زر العودة للأعلى
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (backToTop) backToTop.classList.toggle("show", window.scrollY > 500);
}, { passive: true });
if (backToTop) backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// قائمة تنقل بسيطة: تمييز القسم الظاهر
const sections = document.querySelectorAll("main section[id], main section:not([id])");
const navLinks = document.querySelectorAll(".main-nav a");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${id}`));
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => { if (section.id) sectionObserver.observe(section); });
}
