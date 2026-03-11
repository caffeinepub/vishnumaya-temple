import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { ExternalLink, MapPin } from "lucide-react";
import { motion } from "motion/react";

const MAPS_URL = "https://maps.app.goo.gl/UGXtnF6utBpYkeEM9";

export default function LocationSection() {
  const { t } = useLanguage();

  return (
    <section
      id="location"
      className="py-20 lg:py-28"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.18 0.05 38) 0%, oklch(0.13 0.03 33) 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-3xl block mb-2">🗺️</span>
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "oklch(0.92 0.1 80)" }}
          >
            {t("navLocation")}
          </h2>
          <div
            className="h-px w-24 mx-auto"
            style={{
              background:
                "linear-gradient(to right, transparent, oklch(0.82 0.15 85), transparent)",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="rounded-xl overflow-hidden"
          style={{
            border: "1px solid oklch(0.82 0.15 85 / 0.35)",
            boxShadow: "0 16px 48px oklch(0.1 0.04 40 / 0.5)",
          }}
        >
          {/* Map embed */}
          <div className="relative w-full" style={{ paddingBottom: "56%" }}>
            <iframe
              title="Temple Location"
              src="https://maps.google.com/maps?q=Pallikudath+Vishnumaya+Temple&output=embed&z=15"
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </div>

          {/* Address bar */}
          <div
            className="px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ background: "oklch(0.98 0.005 80 / 0.08)" }}
          >
            <div className="flex items-center gap-3">
              <MapPin
                size={20}
                style={{ color: "oklch(0.82 0.15 85)" }}
                className="shrink-0"
              />
              <p
                className="font-body text-sm"
                style={{ color: "oklch(0.82 0.03 70)" }}
              >
                {t("addressText")}
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="shrink-0 font-body"
              style={{
                color: "oklch(0.82 0.15 85)",
                borderColor: "oklch(0.82 0.15 85 / 0.5)",
              }}
            >
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="location.directions.button"
              >
                <ExternalLink size={14} className="mr-1.5" />
                {t("getDirections")}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
