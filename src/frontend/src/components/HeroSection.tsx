import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "motion/react";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.12 0.04 40) 0%, oklch(0.22 0.08 45) 40%, oklch(0.18 0.06 35) 100%)",
      }}
    >
      {/* Decorative pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            oklch(0.82 0.15 85) 0px,
            oklch(0.82 0.15 85) 1px,
            transparent 1px,
            transparent 20px
          )`,
        }}
      />

      {/* Glow effects */}
      <div
        className="absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "oklch(0.65 0.2 46)" }}
      />
      <div
        className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full opacity-15 blur-3xl"
        style={{ background: "oklch(0.82 0.15 85)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-0 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Om symbol */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl mb-4 inline-block"
            >
              ॐ
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4"
              style={{ color: "oklch(0.92 0.1 80)" }}
            >
              {t("heroTitle")}
            </motion.h1>

            {/* Gold divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="h-0.5 w-32 mx-auto lg:mx-0 mb-6"
              style={{
                background:
                  "linear-gradient(to right, oklch(0.82 0.15 85), transparent)",
              }}
            />

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="font-display text-lg sm:text-xl lg:text-2xl italic mb-4"
              style={{ color: "oklch(0.82 0.15 85)" }}
            >
              {t("heroTagline")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="font-body text-base lg:text-lg mb-8"
              style={{ color: "oklch(0.85 0.03 70)" }}
            >
              {t("heroSubtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Button
                data-ocid="hero.book.primary_button"
                asChild
                size="lg"
                className="font-display text-lg px-8 py-6 rounded-sm shadow-gold hover:shadow-temple transition-all"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.2 46), oklch(0.55 0.22 35))",
                  color: "oklch(0.98 0.005 80)",
                  border: "1px solid oklch(0.82 0.15 85 / 0.4)",
                }}
              >
                <a href="#booking">{t("heroCta")}</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-40"
                style={{
                  background:
                    "radial-gradient(oklch(0.82 0.15 85), transparent 70%)",
                }}
              />
              {/* Image frame */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  boxShadow:
                    "0 0 0 2px oklch(0.82 0.15 85 / 0.5), 0 20px 60px oklch(0.12 0.04 40 / 0.8)",
                }}
              >
                <img
                  src="/assets/uploads/WhatsApp-Image-2026-03-10-at-7.53.05-PM-2-1.jpeg"
                  alt="Lord Vishnumaya"
                  className="w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg object-cover"
                  loading="eager"
                />
                {/* Gradient overlay at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-24"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.12 0.04 40), transparent)",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, oklch(0.82 0.15 85 / 0.6), transparent)",
        }}
      />
    </section>
  );
}
