import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useActor } from "@/hooks/useActor";
import { Loader2, MessageCircle, RotateCcw, Ticket, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

/** Extends the base actor with token methods added in the latest backend build. */
interface ActorWithTokens {
  bookToken(name: string, phoneNumber: string): Promise<bigint>;
}

export default function TokenModal({ open, onClose }: Props) {
  const { t } = useLanguage();
  const { actor, isFetching } = useActor();
  const tokenActor = actor as unknown as ActorWithTokens | null;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tokenNumber, setTokenNumber] = useState<number | null>(null);

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) {
      setError(t("tokenFillAll"));
      return;
    }
    if (!tokenActor || isFetching) return;
    setLoading(true);
    setError("");
    try {
      const result = await tokenActor.bookToken(name.trim(), phone.trim());
      setTokenNumber(Number(result));
    } catch {
      setError(t("tokenError"));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName("");
    setPhone("");
    setError("");
    setTokenNumber(null);
  };

  const handleClose = () => {
    onClose();
    setTimeout(handleReset, 300);
  };

  const whatsappUrl =
    tokenNumber !== null
      ? `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Your temple token number is ${tokenNumber}. Please keep this number handy when visiting Pallikudath Vishnumaya Temple.`)}`
      : "";

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
              className="w-full max-w-md bg-zinc-950 border border-temple-gold/40 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
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

              <div className="px-6 py-6">
                {tokenNumber === null ? (
                  /* Booking form */
                  <div className="flex flex-col gap-5">
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
                      disabled={loading || isFetching || !tokenActor}
                      data-ocid="token.submit_button"
                      className="bg-temple-gold text-black hover:bg-temple-gold/80 font-semibold w-full flex items-center gap-2"
                    >
                      {loading || isFetching ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          {loading ? t("tokenSubmitting") : "Connecting..."}
                        </>
                      ) : (
                        <>
                          <Ticket size={16} />
                          {t("tokenSubmit")}
                        </>
                      )}
                    </Button>
                  </div>
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
                      <p className="text-gray-500 text-xs mt-3">
                        🪔 Pallikudath Vishnumaya Temple
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
                      {t("tokenShareWhatsApp")}
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
