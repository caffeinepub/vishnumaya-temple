import { ExternalBlob } from "@/backend";
import type { GalleryItem } from "@/backend.d";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useActor } from "@/hooks/useActor";
import {
  Bell,
  ExternalLink,
  Images,
  Loader2,
  Lock,
  Send,
  Ticket,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface Notification {
  id: bigint;
  message: string;
  timestamp: bigint;
}

interface TokenRow {
  tokenNumber: number;
  name: string;
  phoneNumber: string;
}

interface ActorWithTokens {
  getAllTokens(): Promise<
    Array<{
      tokenNumber: bigint;
      name: string;
      phoneNumber: string;
      bookedAt: bigint;
    }>
  >;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const ADMIN_PASSWORD = "temple2026";

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

function formatDate(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminPanel({ open, onClose }: Props) {
  const { t } = useLanguage();
  const { actor, isFetching } = useActor();
  const tokenActor = actor as unknown as ActorWithTokens | null;

  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [activeTab, setActiveTab] = useState<
    "notifications" | "tokens" | "gallery"
  >("notifications");

  const [message, setMessage] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [publishError, setPublishError] = useState("");
  const [optedInUsers, setOptedInUsers] = useState<string[]>([]);
  const [showWhatsAppLinks, setShowWhatsAppLinks] = useState(false);

  const [pastNotifications, setPastNotifications] = useState<Notification[]>(
    [],
  );
  const [loadingPast, setLoadingPast] = useState(false);

  const [tokens, setTokens] = useState<TokenRow[]>([]);
  const [loadingTokens, setLoadingTokens] = useState(false);

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [deletingId, setDeletingId] = useState<bigint | null>(null);

  useEffect(() => {
    if (open && authed && actor && !isFetching) {
      setLoadingPast(true);
      actor
        .getNotifications()
        .then((data) => setPastNotifications([...data].reverse()))
        .catch(() => {})
        .finally(() => setLoadingPast(false));
    }
  }, [open, authed, actor, isFetching]);

  useEffect(() => {
    if (open && authed && activeTab === "tokens" && tokenActor && !isFetching) {
      setLoadingTokens(true);
      tokenActor
        .getAllTokens()
        .then((data) =>
          setTokens(
            [...data]
              .sort((a, b) => Number(a.tokenNumber) - Number(b.tokenNumber))
              .map((tk) => ({
                tokenNumber: Number(tk.tokenNumber),
                name: tk.name,
                phoneNumber: tk.phoneNumber,
              })),
          ),
        )
        .catch(() => {})
        .finally(() => setLoadingTokens(false));
    }
  }, [open, authed, activeTab, tokenActor, isFetching]);

  useEffect(() => {
    if (open && authed && activeTab === "gallery" && actor && !isFetching) {
      setLoadingGallery(true);
      actor
        .getGalleryItems()
        .then((data) =>
          setGalleryItems(
            [...data].sort((a, b) => Number(b.uploadedAt - a.uploadedAt)),
          ),
        )
        .catch(() => {})
        .finally(() => setLoadingGallery(false));
    }
  }, [open, authed, activeTab, actor, isFetching]);

  const handleDeleteGalleryItem = async (id: bigint) => {
    if (!actor) return;
    setDeletingId(id);
    try {
      await actor.deleteGalleryItem(id, ADMIN_PASSWORD);
      setGalleryItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      // silent
    } finally {
      setDeletingId(null);
    }
  };

  const handlePasswordLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthed(true);
      setPasswordError("");
    } else {
      setPasswordError(t("adminWrongPassword"));
    }
  };

  const handlePublish = async () => {
    if (!message.trim() || !actor) return;
    setPublishing(true);
    setPublishError("");
    setPublished(false);
    setShowWhatsAppLinks(false);
    try {
      const success = await actor.publishNotification(
        message.trim(),
        ADMIN_PASSWORD,
      );
      if (success) {
        setPublished(true);
        const users = await actor.getOptedInUsers();
        setOptedInUsers(users);
        setShowWhatsAppLinks(true);
        const updated = await actor.getNotifications();
        setPastNotifications([...updated].reverse());
      } else {
        setPublishError("Failed to publish. Check password.");
      }
    } catch {
      setPublishError("An error occurred. Please try again.");
    } finally {
      setPublishing(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setAuthed(false);
      setPasswordInput("");
      setPasswordError("");
      setMessage("");
      setPublished(false);
      setPublishError("");
      setShowWhatsAppLinks(false);
      setOptedInUsers([]);
      setActiveTab("notifications");
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            data-ocid="admin.panel"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              className="w-full max-w-lg bg-zinc-950 border border-temple-gold/40 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-temple-gold/20 bg-black shrink-0">
                <div className="flex items-center gap-2">
                  <Lock size={18} className="text-temple-gold" />
                  <h2 className="font-display text-temple-gold text-lg font-bold">
                    {t("adminPanel")}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  data-ocid="admin.close_button"
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded"
                  aria-label="Close admin panel"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="overflow-y-auto flex-1">
                {!authed ? (
                  /* Password Screen */
                  <div className="px-6 py-8 flex flex-col gap-5">
                    <p className="text-gray-400 text-sm text-center">
                      Enter admin password to access this panel.
                    </p>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="admin-password-input"
                        className="text-temple-gold text-sm font-medium"
                      >
                        {t("adminPassword")}
                      </label>
                      <input
                        id="admin-password-input"
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handlePasswordLogin()
                        }
                        data-ocid="admin.input"
                        placeholder="••••••••"
                        className="w-full bg-zinc-900 border border-zinc-700 focus:border-temple-gold text-white px-4 py-2.5 rounded-lg outline-none transition-colors text-sm"
                      />
                      {passwordError && (
                        <p
                          data-ocid="admin.error_state"
                          className="text-red-400 text-xs"
                        >
                          {passwordError}
                        </p>
                      )}
                    </div>
                    <Button
                      onClick={handlePasswordLogin}
                      data-ocid="admin.primary_button"
                      className="bg-temple-gold text-black hover:bg-temple-gold/80 font-semibold w-full"
                    >
                      {t("adminLogin")}
                    </Button>
                  </div>
                ) : (
                  /* Admin Dashboard */
                  <div className="flex flex-col">
                    {/* Tabs */}
                    <div className="flex border-b border-temple-gold/20 bg-zinc-950 shrink-0">
                      <button
                        type="button"
                        data-ocid="admin.tab"
                        onClick={() => setActiveTab("notifications")}
                        className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                          activeTab === "notifications"
                            ? "border-temple-gold text-temple-gold"
                            : "border-transparent text-gray-400 hover:text-white"
                        }`}
                      >
                        <Bell size={14} />
                        {t("adminPastNotifications")}
                      </button>
                      <button
                        type="button"
                        data-ocid="admin.tab"
                        onClick={() => setActiveTab("tokens")}
                        className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                          activeTab === "tokens"
                            ? "border-temple-gold text-temple-gold"
                            : "border-transparent text-gray-400 hover:text-white"
                        }`}
                      >
                        <Ticket size={14} />
                        {t("adminTokens")}
                      </button>
                      <button
                        type="button"
                        data-ocid="admin.tab"
                        onClick={() => setActiveTab("gallery")}
                        className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                          activeTab === "gallery"
                            ? "border-temple-gold text-temple-gold"
                            : "border-transparent text-gray-400 hover:text-white"
                        }`}
                      >
                        <Images size={14} />
                        {t("adminGallery")}
                      </button>
                    </div>

                    {activeTab === "notifications" ? (
                      <div className="px-6 py-6 flex flex-col gap-6">
                        {/* Compose Notification */}
                        <div className="flex flex-col gap-3">
                          <label
                            htmlFor="admin-message-textarea"
                            className="text-temple-gold text-sm font-semibold flex items-center gap-2"
                          >
                            <Bell size={15} />
                            {t("adminNotificationMessage")}
                          </label>
                          <textarea
                            id="admin-message-textarea"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            data-ocid="admin.textarea"
                            rows={4}
                            placeholder="Type your temple notification message here..."
                            className="w-full bg-zinc-900 border border-zinc-700 focus:border-temple-gold text-white px-4 py-3 rounded-lg outline-none transition-colors text-sm resize-none"
                          />
                          {publishError && (
                            <p
                              data-ocid="admin.error_state"
                              className="text-red-400 text-xs"
                            >
                              {publishError}
                            </p>
                          )}
                          {published && (
                            <p
                              data-ocid="admin.success_state"
                              className="text-green-400 text-xs font-medium"
                            >
                              ✅ {t("adminPublished")}
                            </p>
                          )}
                          <Button
                            onClick={handlePublish}
                            disabled={
                              publishing || !message.trim() || isFetching
                            }
                            data-ocid="admin.submit_button"
                            className="bg-temple-gold text-black hover:bg-temple-gold/80 font-semibold flex items-center gap-2"
                          >
                            <Send size={15} />
                            {publishing
                              ? t("adminPublishing")
                              : t("adminPublish")}
                          </Button>
                        </div>

                        {/* WhatsApp links after publishing */}
                        {showWhatsAppLinks && (
                          <div className="flex flex-col gap-3">
                            <h3 className="text-temple-gold text-sm font-semibold border-b border-temple-gold/20 pb-2">
                              {t("adminOptedInUsers")}
                            </h3>
                            {optedInUsers.length === 0 ? (
                              <p
                                data-ocid="admin.empty_state"
                                className="text-gray-500 text-sm"
                              >
                                {t("adminNoOptedInUsers")}
                              </p>
                            ) : (
                              <div className="flex flex-col gap-2">
                                <p className="text-gray-400 text-xs">
                                  Click each link below to open WhatsApp and
                                  send the notification:
                                </p>
                                <ul className="flex flex-col gap-2">
                                  {optedInUsers.map((phone, i) => (
                                    <li
                                      key={phone}
                                      data-ocid={`admin.item.${i + 1}`}
                                      className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5"
                                    >
                                      <span className="text-white text-sm font-mono">
                                        {phone}
                                      </span>
                                      <a
                                        href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        data-ocid="admin.primary_button"
                                        className="flex items-center gap-1 text-xs bg-green-600 hover:bg-green-500 text-white px-2.5 py-1.5 rounded-md transition-colors font-medium"
                                      >
                                        <ExternalLink size={12} />
                                        {t("adminSendWhatsApp")}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Past Notifications */}
                        <div className="flex flex-col gap-3">
                          <h3 className="text-temple-gold text-sm font-semibold border-b border-temple-gold/20 pb-2">
                            {t("adminPastNotifications")}
                          </h3>
                          {loadingPast ? (
                            <div
                              data-ocid="admin.loading_state"
                              className="text-gray-500 text-sm animate-pulse"
                            >
                              Loading…
                            </div>
                          ) : pastNotifications.length === 0 ? (
                            <p
                              data-ocid="admin.empty_state"
                              className="text-gray-500 text-sm"
                            >
                              {t("noNotifications")}
                            </p>
                          ) : (
                            <ul className="flex flex-col gap-2">
                              {pastNotifications.map((n, i) => (
                                <li
                                  key={String(n.id)}
                                  data-ocid={`admin.item.${i + 1}`}
                                  className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5"
                                >
                                  <p className="text-white text-sm">
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
                      </div>
                    ) : activeTab === "tokens" ? (
                      /* Tokens tab */
                      <div className="px-6 py-6 flex flex-col gap-4">
                        <h3 className="text-temple-gold text-sm font-semibold flex items-center gap-2">
                          <Ticket size={15} />
                          {t("adminTokens")} ({tokens.length})
                        </h3>
                        {loadingTokens ? (
                          <div
                            data-ocid="admin.loading_state"
                            className="text-gray-500 text-sm animate-pulse"
                          >
                            Loading…
                          </div>
                        ) : tokens.length === 0 ? (
                          <p
                            data-ocid="admin.empty_state"
                            className="text-gray-500 text-sm"
                          >
                            {t("adminNoTokens")}
                          </p>
                        ) : (
                          <div className="overflow-x-auto">
                            <table
                              className="w-full text-sm"
                              data-ocid="admin.table"
                            >
                              <thead>
                                <tr className="border-b border-zinc-800">
                                  <th className="text-left text-temple-gold/70 font-medium py-2 pr-4 text-xs">
                                    {t("adminTokenNumber")}
                                  </th>
                                  <th className="text-left text-temple-gold/70 font-medium py-2 pr-4 text-xs">
                                    {t("adminTokenName")}
                                  </th>
                                  <th className="text-left text-temple-gold/70 font-medium py-2 text-xs">
                                    {t("adminTokenPhone")}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {tokens.map((tk, i) => (
                                  <tr
                                    key={tk.tokenNumber}
                                    data-ocid={`admin.item.${i + 1}`}
                                    className="border-b border-zinc-900 hover:bg-zinc-900/50 transition-colors"
                                  >
                                    <td className="py-2.5 pr-4">
                                      <span className="inline-flex items-center justify-center w-10 h-7 rounded bg-temple-gold/20 text-temple-gold font-bold font-mono text-sm">
                                        {tk.tokenNumber}
                                      </span>
                                    </td>
                                    <td className="py-2.5 pr-4 text-white">
                                      {tk.name}
                                    </td>
                                    <td className="py-2.5 text-gray-400 font-mono">
                                      {tk.phoneNumber}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Gallery tab */
                      <div className="px-6 py-6 flex flex-col gap-4">
                        <h3 className="text-temple-gold text-sm font-semibold flex items-center gap-2">
                          <Images size={15} />
                          {t("adminGallery")} ({galleryItems.length})
                        </h3>
                        {loadingGallery ? (
                          <div
                            data-ocid="admin.loading_state"
                            className="flex items-center gap-2 text-gray-500 text-sm"
                          >
                            <Loader2 size={14} className="animate-spin" />
                            Loading…
                          </div>
                        ) : galleryItems.length === 0 ? (
                          <p
                            data-ocid="admin.empty_state"
                            className="text-gray-500 text-sm"
                          >
                            {t("adminGalleryEmpty")}
                          </p>
                        ) : (
                          <div className="flex flex-col gap-3">
                            {galleryItems.map((item, i) => (
                              <div
                                key={String(item.id)}
                                data-ocid={`admin.item.${i + 1}`}
                                className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-3"
                              >
                                {/* Thumbnail */}
                                <div className="w-14 h-14 rounded-lg overflow-hidden bg-zinc-800 shrink-0">
                                  {item.mediaType === "video" ? (
                                    <div className="w-full h-full flex items-center justify-center bg-zinc-700">
                                      <Images
                                        size={18}
                                        className="text-gray-500"
                                      />
                                    </div>
                                  ) : (
                                    <img
                                      src={ExternalBlob.fromURL(
                                        item.blobId,
                                      ).getDirectURL()}
                                      alt={item.caption || "Gallery"}
                                      className="w-full h-full object-cover"
                                    />
                                  )}
                                </div>
                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                  {item.caption && (
                                    <p className="text-white text-sm font-medium line-clamp-1">
                                      {item.caption}
                                    </p>
                                  )}
                                  <p className="text-temple-gold/60 text-xs">
                                    {item.uploaderName}
                                    {item.uploaderPhone
                                      ? ` · ${item.uploaderPhone}`
                                      : ""}
                                  </p>
                                  <p className="text-gray-600 text-xs">
                                    {formatDate(item.uploadedAt)}
                                  </p>
                                  <span
                                    className={`inline-block text-xs px-1.5 py-0.5 rounded mt-0.5 ${
                                      item.mediaType === "video"
                                        ? "bg-blue-900/40 text-blue-400"
                                        : "bg-temple-gold/10 text-temple-gold/70"
                                    }`}
                                  >
                                    {item.mediaType}
                                  </span>
                                </div>
                                {/* Delete */}
                                <button
                                  type="button"
                                  data-ocid="admin.delete_button"
                                  onClick={() =>
                                    handleDeleteGalleryItem(item.id)
                                  }
                                  disabled={deletingId === item.id}
                                  className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-red-900/30 hover:bg-red-800/50 text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                                  aria-label="Delete gallery item"
                                >
                                  {deletingId === item.id ? (
                                    <Loader2
                                      size={14}
                                      className="animate-spin"
                                    />
                                  ) : (
                                    <Trash2 size={14} />
                                  )}
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
