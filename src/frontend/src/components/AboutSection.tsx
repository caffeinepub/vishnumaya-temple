import { useLanguage } from "@/context/LanguageContext";
import { motion } from "motion/react";

function AboutCard({
  title,
  text,
  icon,
}: { title: string; text: string; icon: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-xl p-6 lg:p-8"
      style={{
        background: "oklch(0.99 0.003 70)",
        border: "1px solid oklch(0.88 0.06 70)",
        boxShadow: "0 4px 24px oklch(0.65 0.2 46 / 0.08)",
      }}
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-display text-xl lg:text-2xl font-bold text-temple-crimson mb-3">
        {title}
      </h3>
      <p className="font-body text-base lg:text-lg text-foreground/75 leading-relaxed">
        {text}
      </p>
    </motion.div>
  );
}

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="py-20 lg:py-28"
      style={{ background: "oklch(0.95 0.012 72)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-3xl block mb-2">🏛️</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-temple-crimson mb-4">
            {t("aboutTitle")}
          </h2>
          <p className="ornament-divider text-temple-gold/70 text-sm max-w-xs mx-auto">
            <span>✦</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <AboutCard
            icon="🕌"
            title={t("aboutHistory")}
            text={t("aboutHistoryText")}
          />
          <AboutCard
            icon="🙏"
            title={t("aboutVishnumaya")}
            text={t("aboutVishnumayaText")}
          />
          <AboutCard
            icon="⭐"
            title={t("aboutSignificance")}
            text={t("aboutSignificanceText")}
          />
        </div>
      </div>
    </section>
  );
}
