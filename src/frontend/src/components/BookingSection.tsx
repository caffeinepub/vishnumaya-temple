import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/LanguageContext";
import { useActor } from "@/hooks/useActor";
import { AlertCircle, MessageCircle, Printer } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const TEMPLE_WHATSAPP = "919074971633";

function generateBookingRef() {
  return `BK${Date.now().toString().slice(-6)}`;
}

export default function BookingSection() {
  const { t } = useLanguage();
  const { actor } = useActor();

  const [devoteeName, setDevoteeName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [poojaDescription, setPoojaDescription] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [validationError, setValidationError] = useState("");
  const [bookingRef, setBookingRef] = useState("");
  const [slippedData, setSlippedData] = useState<{
    name: string;
    phone: string;
    pooja: string;
    date: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    if (!devoteeName || !phoneNumber || !poojaDescription || !preferredDate) {
      setValidationError(t("allFieldsRequired"));
      return;
    }
    const ref = generateBookingRef();
    setBookingRef(ref);
    setSlippedData({
      name: devoteeName,
      phone: phoneNumber,
      pooja: poojaDescription,
      date: preferredDate,
    });
    setStatus("success");
    // Fire and forget -- don't block UI on backend
    actor
      ?.submitBooking(devoteeName, phoneNumber, BigInt(0), preferredDate)
      .catch(() => {});
  };

  const handleSendWhatsApp = () => {
    if (!slippedData) return;
    const msg = [
      "🙏 *BOOKING SLIP* 🙏",
      "━━━━━━━━━━━━━━━━━━━━━",
      `*${t("slipTemple")}*`,
      "Pallikudath Vishnumaya Temple",
      "━━━━━━━━━━━━━━━━━━━━━",
      `📋 *${t("slipRef")}:* ${bookingRef}`,
      `👤 *${t("devoteeName")}:* ${slippedData.name}`,
      `📞 *${t("phoneNumber")}:* ${slippedData.phone}`,
      `🕉️ *${t("whichPooja")}:* ${slippedData.pooja}`,
      `📅 *${t("preferredDate")}:* ${slippedData.date}`,
      "━━━━━━━━━━━━━━━━━━━━━",
      `✅ ${t("slipFooter")}`,
    ].join("\n");
    const url = `https://wa.me/${TEMPLE_WHATSAPP}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const resetForm = () => {
    setDevoteeName("");
    setPhoneNumber("");
    setPoojaDescription("");
    setPreferredDate("");
    setStatus("idle");
    setValidationError("");
    setBookingRef("");
    setSlippedData(null);
  };

  return (
    <section
      id="booking"
      className="py-20 lg:py-28"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.22 0.06 40) 0%, oklch(0.16 0.04 35) 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-3xl block mb-2">📿</span>
          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "oklch(0.92 0.1 80)" }}
          >
            {t("bookingTitle")}
          </h2>
          <div
            className="h-px w-24 mx-auto mb-4"
            style={{
              background:
                "linear-gradient(to right, transparent, oklch(0.82 0.15 85), transparent)",
            }}
          />
          <p
            className="font-body text-lg"
            style={{ color: "oklch(0.82 0.03 70)" }}
          >
            {t("bookingSubtitle")}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === "success" && slippedData ? (
            <motion.div
              key="slip"
              data-ocid="booking.success_state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-xl overflow-hidden"
              style={{
                border: "2px solid oklch(0.82 0.15 85 / 0.6)",
                boxShadow: "0 20px 60px oklch(0.12 0.04 40 / 0.5)",
              }}
            >
              {/* Slip header */}
              <div
                className="px-6 py-5 text-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.25 0.08 40), oklch(0.20 0.06 35))",
                  borderBottom: "2px dashed oklch(0.82 0.15 85 / 0.4)",
                }}
              >
                <p
                  className="font-display text-sm font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "oklch(0.82 0.15 85)" }}
                >
                  {t("slipTemple")}
                </p>
                <h3
                  className="font-display text-xl sm:text-2xl font-bold"
                  style={{ color: "oklch(0.96 0.08 80)" }}
                >
                  Pallikudath Vishnumaya Temple
                </h3>
                <p
                  className="mt-2 text-sm font-mono font-bold px-3 py-1 rounded-full inline-block"
                  style={{
                    background: "oklch(0.82 0.15 85 / 0.15)",
                    color: "oklch(0.88 0.12 85)",
                    border: "1px solid oklch(0.82 0.15 85 / 0.4)",
                  }}
                >
                  {t("slipRef")}: {bookingRef}
                </p>
              </div>

              {/* Slip body */}
              <div
                className="px-6 py-6 space-y-3"
                style={{ background: "oklch(0.98 0.005 80)" }}
              >
                {[
                  { label: t("devoteeName"), value: slippedData.name },
                  { label: t("phoneNumber"), value: slippedData.phone },
                  { label: t("whichPooja"), value: slippedData.pooja },
                  { label: t("preferredDate"), value: slippedData.date },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex gap-3 pb-3"
                    style={{ borderBottom: "1px dashed oklch(0.85 0.05 80)" }}
                  >
                    <span
                      className="font-body text-sm font-semibold min-w-[120px]"
                      style={{ color: "oklch(0.45 0.06 40)" }}
                    >
                      {label}
                    </span>
                    <span
                      className="font-body text-sm"
                      style={{ color: "oklch(0.25 0.04 40)" }}
                    >
                      {value}
                    </span>
                  </div>
                ))}

                {/* Footer note */}
                <p
                  className="text-center text-xs pt-1"
                  style={{ color: "oklch(0.55 0.05 40)" }}
                >
                  {t("slipFooter")}
                </p>
              </div>

              {/* Actions */}
              <div
                className="px-6 py-5 flex flex-col sm:flex-row gap-3"
                style={{
                  background: "oklch(0.95 0.01 80)",
                  borderTop: "1px solid oklch(0.88 0.05 80)",
                }}
              >
                <Button
                  data-ocid="booking.whatsapp_button"
                  onClick={handleSendWhatsApp}
                  className="flex-1 flex items-center justify-center gap-2 font-display text-base py-5"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.55 0.2 146), oklch(0.45 0.22 146))",
                    color: "white",
                  }}
                >
                  <MessageCircle size={18} />
                  {t("slipSendWhatsApp")}
                </Button>
                <Button
                  data-ocid="booking.new_button"
                  variant="outline"
                  onClick={resetForm}
                  className="flex-1 flex items-center justify-center gap-2 font-display text-base py-5"
                >
                  <Printer size={18} />
                  {t("bookAnother")}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="rounded-xl p-6 sm:p-8 space-y-6"
              style={{
                background: "oklch(0.98 0.005 80)",
                border: "1px solid oklch(0.82 0.15 85 / 0.4)",
                boxShadow: "0 20px 60px oklch(0.12 0.04 40 / 0.4)",
              }}
            >
              {/* Devotee Name */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="devoteeName"
                  className="font-body text-base text-foreground/90"
                >
                  {t("devoteeName")}
                </Label>
                <Input
                  id="devoteeName"
                  data-ocid="booking.name.input"
                  value={devoteeName}
                  onChange={(e) => setDevoteeName(e.target.value)}
                  placeholder={t("devoteeNamePlaceholder")}
                  className="font-body text-base"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="phone"
                  className="font-body text-base text-foreground/90"
                >
                  {t("phoneNumber")}
                </Label>
                <Input
                  id="phone"
                  data-ocid="booking.phone.input"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder={t("phoneNumberPlaceholder")}
                  className="font-body text-base"
                />
              </div>

              {/* Pooja description */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="poojaDescription"
                  className="font-body text-base text-foreground/90"
                >
                  {t("whichPooja")}
                </Label>
                <Textarea
                  id="poojaDescription"
                  data-ocid="booking.pooja.textarea"
                  value={poojaDescription}
                  onChange={(e) => setPoojaDescription(e.target.value)}
                  placeholder={t("whichPoojaPlaceholder")}
                  className="font-body text-base"
                  rows={3}
                />
              </div>

              {/* Date */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="date"
                  className="font-body text-base text-foreground/90"
                >
                  {t("preferredDate")}
                </Label>
                <Input
                  id="date"
                  data-ocid="booking.date.input"
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="font-body text-base"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              {/* Validation error */}
              {validationError && (
                <div
                  data-ocid="booking.error_state"
                  className="flex items-center gap-2 text-sm rounded-md p-3"
                  style={{
                    background: "oklch(0.95 0.04 25)",
                    color: "oklch(0.48 0.22 25)",
                  }}
                >
                  <AlertCircle size={16} />
                  {validationError}
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                data-ocid="booking.submit_button"
                className="w-full font-display text-lg py-6"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.2 46), oklch(0.55 0.22 35))",
                  color: "oklch(0.98 0.005 80)",
                }}
              >
                {t("submitBooking")}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
