import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";

const MAPS_URL = "https://maps.app.goo.gl/UGXtnF6utBpYkeEM9";
const PHONE_NUMBER = "+919074971633";
const WHATSAPP_NUMBER = "919074971633";
const EMAIL = "pallikudath@gmail.com";

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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Row 1: Address, Phone, Hours */}
        <div className="grid sm:grid-cols-3 gap-6 mb-6">
          {/* Address */}
          <motion.a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="contact.address.link"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="rounded-xl p-6 text-center block cursor-pointer transition-all hover:scale-105"
            style={{
              background: "oklch(0.98 0.005 80 / 0.08)",
              border: "1px solid oklch(0.82 0.15 85 / 0.4)",
              textDecoration: "none",
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
              className="font-body text-sm mb-2"
              style={{ color: "oklch(0.82 0.03 70)" }}
            >
              {t("addressText")}
            </p>
            <span
              className="font-body text-xs inline-flex items-center gap-1"
              style={{ color: "oklch(0.82 0.15 85)" }}
            >
              <ExternalLink size={12} />
              Open in Maps
            </span>
          </motion.a>

          {/* Phone */}
          <motion.a
            href={`tel:${PHONE_NUMBER}`}
            data-ocid="contact.phone.link"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-xl p-6 text-center block cursor-pointer transition-all hover:scale-105"
            style={{
              background: "oklch(0.98 0.005 80 / 0.08)",
              border: "1px solid oklch(0.82 0.15 85 / 0.2)",
              textDecoration: "none",
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
          </motion.a>

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

        {/* Row 2: WhatsApp & Email (centered) */}
        <div className="grid sm:grid-cols-2 gap-6 sm:max-w-2xl mx-auto">
          {/* WhatsApp */}
          <motion.a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="contact.whatsapp.link"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="rounded-xl p-6 text-center block cursor-pointer transition-all hover:scale-105"
            style={{
              background: "oklch(0.98 0.005 80 / 0.08)",
              border: "1px solid oklch(0.82 0.15 85 / 0.4)",
              textDecoration: "none",
            }}
          >
            {/* WhatsApp icon (SVG) */}
            <div className="mx-auto mb-3 w-7 h-7 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7"
                style={{ color: "oklch(0.82 0.15 85)" }}
                role="img"
                aria-labelledby="whatsapp-icon-title"
              >
                <title id="whatsapp-icon-title">WhatsApp</title>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12.004 2.003a9.993 9.993 0 00-8.391 15.393L2 22l4.733-1.573A9.996 9.996 0 1012.004 2.003zm0 18.181a8.174 8.174 0 01-4.178-1.148l-.3-.178-3.1 1.028 1.04-3.018-.196-.31a8.19 8.19 0 1111.56-11.347A8.186 8.186 0 0112.004 20.184z" />
              </svg>
            </div>
            <h3
              className="font-display text-lg font-bold mb-2"
              style={{ color: "oklch(0.92 0.1 80)" }}
            >
              {t("whatsapp")}
            </h3>
            <p
              className="font-body text-sm mb-1"
              style={{ color: "oklch(0.82 0.03 70)" }}
            >
              {t("whatsappText")}
            </p>
            <span
              className="font-body text-xs inline-flex items-center gap-1"
              style={{ color: "oklch(0.82 0.15 85)" }}
            >
              <MessageCircle size={12} />
              {t("chatOnWhatsApp")}
            </span>
          </motion.a>

          {/* Email */}
          <motion.a
            href={`mailto:${EMAIL}`}
            data-ocid="contact.email.link"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="rounded-xl p-6 text-center block cursor-pointer transition-all hover:scale-105"
            style={{
              background: "oklch(0.98 0.005 80 / 0.08)",
              border: "1px solid oklch(0.82 0.15 85 / 0.4)",
              textDecoration: "none",
            }}
          >
            <Mail
              size={28}
              className="mx-auto mb-3"
              style={{ color: "oklch(0.82 0.15 85)" }}
            />
            <h3
              className="font-display text-lg font-bold mb-2"
              style={{ color: "oklch(0.92 0.1 80)" }}
            >
              {t("email")}
            </h3>
            <p
              className="font-body text-sm mb-1"
              style={{ color: "oklch(0.82 0.03 70)" }}
            >
              {t("emailText")}
            </p>
            <span
              className="font-body text-xs inline-flex items-center gap-1"
              style={{ color: "oklch(0.82 0.15 85)" }}
            >
              <Mail size={12} />
              {t("sendEmail")}
            </span>
          </motion.a>
        </div>

        {/* Directions button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
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
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="contact.directions.button"
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
