import { useLanguage } from "@/context/LanguageContext";
import { useActor } from "@/hooks/useActor";
import { Bell, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface Notification {
  id: bigint;
  message: string;
  timestamp: bigint;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  const d = new Date(ms);
  return d.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function NotificationPanel({ open, onClose }: Props) {
  const { t } = useLanguage();
  const { actor, isFetching } = useActor();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && actor && !isFetching) {
      setLoading(true);
      actor
        .getNotifications()
        .then((data) => {
          setNotifications([...data].reverse());
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [open, actor, isFetching]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 right-4 z-50 w-full max-w-sm bg-zinc-900 border border-temple-gold/30 rounded-xl shadow-2xl overflow-hidden"
            data-ocid="notifications.panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-temple-gold/20 bg-black">
              <div className="flex items-center gap-2">
                <Bell size={18} className="text-temple-gold" />
                <h2 className="font-display text-temple-gold text-base font-semibold">
                  {t("notificationPanelTitle")}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                data-ocid="notifications.close_button"
                className="text-gray-400 hover:text-white transition-colors p-1 rounded"
                aria-label="Close notifications"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div
                  data-ocid="notifications.loading_state"
                  className="flex items-center justify-center py-10 text-gray-400 text-sm"
                >
                  <span className="animate-pulse">Loading…</span>
                </div>
              ) : notifications.length === 0 ? (
                <div
                  data-ocid="notifications.empty_state"
                  className="flex flex-col items-center justify-center py-10 gap-3 text-gray-500"
                >
                  <Bell size={32} className="opacity-30" />
                  <p className="text-sm">{t("noNotifications")}</p>
                </div>
              ) : (
                <ul className="divide-y divide-zinc-800">
                  {notifications.map((n, i) => (
                    <li
                      key={String(n.id)}
                      data-ocid={`notifications.item.${i + 1}`}
                      className="px-4 py-3 hover:bg-zinc-800/50 transition-colors"
                    >
                      <p className="text-white text-sm leading-relaxed">
                        {n.message}
                      </p>
                      <p className="text-temple-gold/60 text-xs mt-1">
                        {formatTimestamp(n.timestamp)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
