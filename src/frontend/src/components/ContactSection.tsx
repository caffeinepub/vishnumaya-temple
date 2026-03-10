import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Clock, ExternalLink, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      className="py-20 lg:py-28"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.22 0.06 40) 0%, oklch(0.16 0.04 35) 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-3xl block mb-2">📍</span>
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "oklch(0.92 0.1 80)" }}
          >
            {t("contactTitle")}
          </h2>
          <div
            className="h-px w-24 mx-auto"
            style={{
              background:
                "linear-gradient(to right, transparent, oklch(0.82 0.15 85), transparent)",
            }}
          />
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="rounded-xl p-6 text-center"
            style={{
              background: "oklch(0.98 0.005 80 / 0.08)",
              border: "1px solid oklch(0.82 0.15 85 / 0.2)",
            }}
          >
            <MapPin
              size={28}
              className="mx-auto mb-3"
              style={{ color: "oklch(0.82 0.15 85)" }}
            />
            <h3
              className="font-display text-lg font-bold mb-2"
              style={{ color: "oklch(0.92 0.1 80)" }}
            >
              {t("address")}
            </h3>
            <p
              className="font-body text-sm"
              style={{ color: "oklch(0.82 0.03 70)" }}
            >
              {t("addressText")}
            </p>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-xl p-6 text-center"
            style={{
              background: "oklch(0.98 0.005 80 / 0.08)",
              border: "1px solid oklch(0.82 0.15 85 / 0.2)",
            }}
          >
            <Phone
              size={28}
              className="mx-auto mb-3"
              style={{ color: "oklch(0.82 0.15 85)" }}
            />
            <h3
              className="font-display text-lg font-bold mb-2"
              style={{ color: "oklch(0.92 0.1 80)" }}
            >
              {t("phone")}
            </h3>
            <p
              className="font-body text-sm"
              style={{ color: "oklch(0.82 0.03 70)" }}
            >
              {t("phoneText")}
            </p>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="rounded-xl p-6 text-center"
            style={{
              background: "oklch(0.98 0.005 80 / 0.08)",
              border: "1px solid oklch(0.82 0.15 85 / 0.2)",
            }}
          >
            <Clock
              size={28}
              className="mx-auto mb-3"
              style={{ color: "oklch(0.82 0.15 85)" }}
            />
            <h3
              className="font-display text-lg font-bold mb-2"
              style={{ color: "oklch(0.92 0.1 80)" }}
            >
              {t("openingHours")}
            </h3>
            <div
              className="font-body text-sm space-y-1"
              style={{ color: "oklch(0.82 0.03 70)" }}
            >
              <p>{t("morningHours")}</p>
              <p>{t("eveningHours")}</p>
              <p
                className="font-semibold"
                style={{ color: "oklch(0.82 0.15 85)" }}
              >
                {t("allDaysOpen")}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Directions button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-8"
        >
          <Button
            asChild
            variant="outline"
            className="font-body border-temple-gold/40 hover:bg-temple-gold/10"
            style={{
              color: "oklch(0.82 0.15 85)",
              borderColor: "oklch(0.82 0.15 85 / 0.4)",
            }}
          >
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={16} className="mr-2" />
              {t("getDirections")}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
