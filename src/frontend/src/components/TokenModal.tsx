import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";
import { useActor } from "@/hooks/useActor";
import {
  Building2,
  CalendarDays,
  Clock,
  Loader2,
  MessageCircle,
  RotateCcw,
  Ticket,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { DayPickerSingleProps } from "react-day-picker";

const DEPLOYMENT_EPOCH = "v42";

interface Props {
  open: boolean;
  onClose: () => void;
}

/** Returns true if the given date is a Saturday */
function isSaturday(date: Date): boolean {
  return date.getDay() === 6;
}

/** Returns true if the date is today or in the future */
function isFutureOrToday(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
}

/** Returns a date string YYYY-MM-DD for the given date */
function dateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

/** Check if user already booked a token for a specific date */
function hasBookedForDate(phone: string, date: Date): boolean {
  try {
    return (
      localStorage.getItem(`temple_token_booked_${phone}_${dateKey(date)}`) ===
      "true"
    );
  } catch {
    return false;
  }
}

/** Save booking for a user on a specific date */
function markBookedForDate(phone: string, date: Date): void {
  try {
    localStorage.setItem(
      `temple_token_booked_${phone}_${dateKey(date)}`,
      "true",
    );
  } catch {}
}

/** Clear stale booking records if epoch has changed */
function clearStaleBookings(): void {
  try {
    if (localStorage.getItem("temple_token_epoch") !== DEPLOYMENT_EPOCH) {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("temple_token_booked_")) {
          keysToRemove.push(key);
        }
      }
      for (const k of keysToRemove) {
        localStorage.removeItem(k);
      }
      localStorage.setItem("temple_token_epoch", DEPLOYMENT_EPOCH);
    }
  } catch {}
}

export default function TokenModal({ open, onClose }: Props) {
  const { t } = useLanguage();
  const { actor } = useActor();
  const { user } = useUser();

  const [step, setStep] = useState<"calendar" | "form">("calendar");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tokenNumber, setTokenNumber] = useState<number | null>(null);

  // Clear stale localStorage bookings on mount
  useEffect(() => {
    clearStaleBookings();
  }, []);

  // Sync name/phone when user changes
  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setPhone(user.phone ?? "");
    }
  }, [user]);

  // Check if user already booked for the selected date
  const alreadyBooked =
    user && selectedDate ? hasBookedForDate(user.phone, selectedDate) : false;

  const handleDateSelect: DayPickerSingleProps["onSelect"] = (date) => {
    if (!date) return;
    setSelectedDate(date);
  };

  const handleProceedToForm = () => {
    if (!selectedDate) return;
    setStep("form");
  };

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) {
      setError(t("tokenFillAll"));
      return;
    }
    if (!actor) {
      setError("Unable to connect. Please try again.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await actor.bookToken(name.trim(), phone.trim());
      setTokenNumber(Number(result));
      if (user && selectedDate) {
        markBookedForDate(user.phone, selectedDate);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t("tokenError"));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName(user?.name ?? "");
    setPhone(user?.phone ?? "");
    setError("");
    setTokenNumber(null);
    setSelectedDate(undefined);
    setStep("calendar");
  };

  const handleClose = () => {
    onClose();
    setTimeout(handleReset, 300);
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const whatsappUrl =
    tokenNumber !== null
      ? `https://wa.me/919074971633?text=${encodeURIComponent(
          `🛕 *PALLIKUDATH VISHNUMAYA TEMPLE*\n*Token Booking Confirmation*\n──────────────────────\n👤 Name: ${name}\n📞 Phone: ${phone}\n🎟️ Token Number: ${tokenNumber}\n📅 Date: ${selectedDate ? formatDate(selectedDate) : ""}\n⏰ Time: From 6:00 PM onwards\n──────────────────────\nPlease show this token number at the temple office.\nPallikudath Vishnumaya Temple`,
        )}`
      : "";

  // Disable all non-Saturdays and past dates
  const disabledDays = (date: Date) =>
    !isSaturday(date) || !isFutureOrToday(date);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            data-ocid="token.modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="w-full max-w-lg bg-zinc-950 border border-temple-gold/40 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-temple-gold/20 bg-black">
                <div className="flex items-center gap-2">
                  <Ticket size={18} className="text-temple-gold" />
                  <h2 className="font-display text-temple-gold text-lg font-bold">
                    {t("tokenTitle")}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  data-ocid="token.close_button"
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="px-6 py-6 overflow-y-auto max-h-[80vh]">
                {/* Already booked for selected date notice */}
                {alreadyBooked && tokenNumber === null ? (
                  <div
                    data-ocid="token.already_booked.error_state"
                    className="flex flex-col items-center gap-5 py-4 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                      <Ticket size={28} className="text-red-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-base mb-2">
                        Token Already Booked
                      </p>
                      <p className="text-gray-400 text-sm">
                        You have already booked a token for this date. Only 1
                        token can be booked per day per number.
                      </p>
                      <p className="text-gray-500 text-xs mt-3">
                        To book another token, please logout and register with a
                        different number.
                      </p>
                    </div>
                    <Button
                      onClick={handleClose}
                      data-ocid="token.close_already_booked.button"
                      className="bg-temple-gold text-black hover:bg-temple-gold/80 font-semibold px-6"
                    >
                      Close
                    </Button>
                  </div>
                ) : tokenNumber === null ? (
                  step === "calendar" ? (
                    /* Step 1: Date selection */
                    <div className="flex flex-col gap-5">
                      <div className="text-center">
                        <div className="inline-flex items-center gap-2 text-temple-gold font-semibold text-sm mb-1">
                          <CalendarDays size={15} />
                          {t("tokenSelectDate")}
                        </div>
                        <p className="text-gray-400 text-xs">
                          {t("tokenSaturdayOnly")}
                        </p>
                      </div>

                      {/* Time info */}
                      <div className="bg-zinc-900/80 border border-temple-gold/20 rounded-xl px-4 py-3 flex items-center gap-3">
                        <Clock
                          size={15}
                          className="text-temple-gold shrink-0"
                        />
                        <p className="text-gray-300 text-sm">
                          {t("tokenFromEvening")}
                        </p>
                      </div>

                      {/* Calendar — white background, black digits, full width */}
                      <div className="w-full">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={handleDateSelect}
                          disabled={disabledDays}
                          data-ocid="token.calendar"
                          className="rounded-xl border border-temple-gold/30 bg-white text-black w-full [&_button]:text-black [&_button:hover]:bg-gray-100 [&_[data-selected=true]]:bg-temple-gold [&_[data-selected=true]]:text-black [&_[data-selected-single=true]]:bg-temple-gold [&_[data-selected-single=true]]:text-black [&_[data-outside=true]]:text-gray-400 [&_[data-disabled=true]]:text-gray-300 [&_[data-disabled=true]]:opacity-40 [&_.rdp-caption]:text-black [&_.rdp-head_cell]:text-black [&_.rdp-nav_button]:text-black [&_.rdp-day]:text-black [&_td]:p-1 [&_th]:p-1"
                        />
                      </div>

                      {selectedDate && (
                        <div className="bg-temple-gold/10 border border-temple-gold/30 rounded-lg px-4 py-2.5 text-center">
                          <p className="text-temple-gold text-sm font-semibold">
                            {formatDate(selectedDate)}
                          </p>
                        </div>
                      )}

                      <Button
                        onClick={handleProceedToForm}
                        disabled={!selectedDate}
                        data-ocid="token.primary_button"
                        className="bg-temple-gold text-black hover:bg-temple-gold/80 font-semibold w-full flex items-center gap-2 disabled:opacity-40"
                      >
                        <Ticket size={16} />
                        {t("tokenContinue")}
                      </Button>
                    </div>
                  ) : (
                    /* Step 2: Booking form */
                    <div className="flex flex-col gap-5">
                      {/* Selected date reminder */}
                      {selectedDate && (
                        <div className="flex items-center gap-2 bg-temple-gold/10 border border-temple-gold/30 rounded-lg px-4 py-2.5">
                          <CalendarDays
                            size={14}
                            className="text-temple-gold shrink-0"
                          />
                          <div>
                            <p className="text-temple-gold text-xs font-semibold">
                              {formatDate(selectedDate)}
                            </p>
                            <p className="text-gray-400 text-xs">
                              {t("tokenFromEvening")}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setStep("calendar")}
                            className="ml-auto text-gray-400 hover:text-temple-gold text-xs underline transition-colors"
                          >
                            {t("tokenChange")}
                          </button>
                        </div>
                      )}

                      <p className="text-gray-400 text-sm text-center">
                        {t("tokenSubtitle")}
                      </p>

                      {/* Name */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="token-name"
                          className="text-temple-gold text-sm font-medium"
                        >
                          {t("tokenName")}
                        </label>
                        <input
                          id="token-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          data-ocid="token.name.input"
                          placeholder={t("tokenName")}
                          className="w-full bg-zinc-900 border border-zinc-700 focus:border-temple-gold text-white px-4 py-2.5 rounded-lg outline-none transition-colors text-sm"
                        />
                      </div>

                      {/* Phone */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="token-phone"
                          className="text-temple-gold text-sm font-medium"
                        >
                          {t("tokenPhone")}
                        </label>
                        <input
                          id="token-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                          data-ocid="token.phone.input"
                          placeholder={t("tokenPhonePlaceholder")}
                          className="w-full bg-zinc-900 border border-zinc-700 focus:border-temple-gold text-white px-4 py-2.5 rounded-lg outline-none transition-colors text-sm"
                        />
                      </div>

                      {error && (
                        <p
                          data-ocid="token.error_state"
                          className="text-red-400 text-xs"
                        >
                          {error}
                        </p>
                      )}

                      <Button
                        onClick={handleSubmit}
                        disabled={loading || !actor}
                        data-ocid="token.submit_button"
                        className="bg-temple-gold text-black hover:bg-temple-gold/80 font-semibold w-full flex items-center gap-2"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            {t("tokenSubmitting")}
                          </>
                        ) : (
                          <>
                            <Ticket size={16} />
                            {t("tokenSubmit")}
                          </>
                        )}
                      </Button>
                    </div>
                  )
                ) : (
                  /* Success screen */
                  <div className="flex flex-col items-center gap-6 py-4">
                    <div className="text-center">
                      <p className="text-gray-400 text-sm mb-3">
                        {t("tokenSuccess")}
                      </p>
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                        }}
                        className="inline-flex items-center justify-center w-36 h-36 rounded-full border-4 border-temple-gold bg-temple-gold/10 shadow-lg shadow-temple-gold/20"
                      >
                        <span className="font-display text-temple-gold text-5xl font-bold">
                          {tokenNumber}
                        </span>
                      </motion.div>
                      {selectedDate && (
                        <p className="text-temple-gold/80 text-xs mt-3 font-medium">
                          {formatDate(selectedDate)}
                        </p>
                      )}
                      <p className="text-gray-400 text-xs mt-1">
                        {t("tokenSlot6PM")}
                      </p>
                      <p className="text-gray-500 text-xs mt-2">
                        🪔 Pallikudath Vishnumaya Temple
                      </p>
                    </div>

                    {/* Temple office notice */}
                    <div className="w-full flex items-center gap-3 bg-temple-gold/10 border border-temple-gold/40 rounded-xl px-4 py-3">
                      <Building2
                        size={20}
                        className="text-temple-gold shrink-0"
                      />
                      <p className="text-temple-gold text-sm font-semibold">
                        {t("tokenShowAtOffice")}
                      </p>
                    </div>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-ocid="token.whatsapp.button"
                      className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm"
                    >
                      <MessageCircle size={16} />
                      Send Slip via WhatsApp
                    </a>

                    <Button
                      onClick={handleReset}
                      data-ocid="token.another.button"
                      variant="outline"
                      className="w-full border-temple-gold/50 text-temple-gold hover:bg-temple-gold/10 hover:text-temple-gold bg-transparent font-medium flex items-center gap-2"
                    >
                      <RotateCcw size={15} />
                      {t("tokenBookAnother")}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
