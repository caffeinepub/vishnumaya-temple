import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/LanguageContext";
import { useSubmitBooking } from "@/hooks/useQueries";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function BookingSection() {
  const { t } = useLanguage();
  const { mutate: submitBooking, isPending } = useSubmitBooking();

  const [devoteeName, setDevoteeName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [poojaDescription, setPoojaDescription] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    if (!devoteeName || !phoneNumber || !poojaDescription || !preferredDate) {
      setValidationError(t("allFieldsRequired"));
      return;
    }
    submitBooking(
      { devoteeName, phoneNumber, poojaId: BigInt(0), preferredDate },
      {
        onSuccess: () => setStatus("success"),
        onError: () => setStatus("error"),
      },
    );
  };

  const resetForm = () => {
    setDevoteeName("");
    setPhoneNumber("");
    setPoojaDescription("");
    setPreferredDate("");
    setStatus("idle");
    setValidationError("");
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
          {status === "success" ? (
            <motion.div
              key="success"
              data-ocid="booking.success_state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-xl p-8 text-center"
              style={{
                background: "oklch(0.98 0.005 80)",
                border: "1px solid oklch(0.82 0.15 85 / 0.5)",
              }}
            >
              <CheckCircle2
                size={56}
                className="mx-auto mb-4"
                style={{ color: "oklch(0.65 0.2 46)" }}
              />
              <p className="font-body text-lg text-foreground leading-relaxed mb-6">
                {t("bookingSuccess")}
              </p>
              <Button
                onClick={resetForm}
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.2 46), oklch(0.55 0.22 35))",
                  color: "oklch(0.98 0.005 80)",
                }}
              >
                {t("bookAnother")}
              </Button>
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

              {status === "error" && (
                <div
                  data-ocid="booking.error_state"
                  className="flex items-center gap-2 text-sm rounded-md p-3"
                  style={{
                    background: "oklch(0.95 0.04 25)",
                    color: "oklch(0.48 0.22 25)",
                  }}
                >
                  <AlertCircle size={16} />
                  {t("bookingError")}
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                data-ocid="booking.submit_button"
                disabled={isPending}
                className="w-full font-display text-lg py-6"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.2 46), oklch(0.55 0.22 35))",
                  color: "oklch(0.98 0.005 80)",
                }}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("submitting")}
                  </>
                ) : (
                  t("submitBooking")
                )}
              </Button>

              {isPending && (
                <div
                  data-ocid="booking.loading_state"
                  className="sr-only"
                  aria-live="polite"
                >
                  {t("submitting")}
                </div>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
