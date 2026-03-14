import type { GalleryItem } from "@/backend.d";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";
import { useActor } from "@/hooks/useActor";
import { useStorageUpload } from "@/hooks/useStorageUpload";
import {
  ArrowLeft,
  ChevronDown,
  Images,
  Loader2,
  Play,
  Upload,
  X,
  ZoomIn,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const INITIAL_SHOW = 6;

interface Props {
  onBack: () => void;
}

function formatDate(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function GalleryPage({ onBack }: Props) {
  const { t } = useLanguage();
  const { user } = useUser();
  const { actor, isFetching } = useActor();
  const { uploadFile } = useStorageUpload();

  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Upload form state
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchItems = useCallback(async () => {
    if (!actor) return;
    setLoading(true);
    try {
      const data = await actor.getGalleryItems();
      setItems([...data].sort((a, b) => Number(b.uploadedAt - a.uploadedAt)));
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    if (actor && !isFetching) {
      fetchItems();
    }
  }, [actor, isFetching, fetchItems]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    if (filePreview) URL.revokeObjectURL(filePreview);
    const url = URL.createObjectURL(f);
    setFilePreview(url);
  };

  const handleUpload = async () => {
    if (!file || !actor || !user) return;
    setUploading(true);
    setUploadError("");
    setUploadProgress(0);
    try {
      const blobUrl = await uploadFile(file, (pct) => setUploadProgress(pct));
      const mediaType = file.type.startsWith("video/") ? "video" : "image";
      await actor.addGalleryItem(
        user.name,
        user.phone,
        blobUrl,
        mediaType,
        caption.trim(),
      );
      setCaption("");
      setFile(null);
      setFilePreview(null);
      setShowUpload(false);
      await fetchItems();
    } catch {
      setUploadError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const visibleItems = showAll ? items : items.slice(0, INITIAL_SHOW);
  const hasMore = items.length > INITIAL_SHOW && !showAll;

  return (
    <>
      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors"
              onClick={() => setLightbox(null)}
              data-ocid="gallery.close_button"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>
            <div
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              {lightbox.mediaType === "video" ? (
                <video
                  src={lightbox.blobId}
                  controls
                  className="w-full max-h-[80vh] rounded-xl object-contain"
                >
                  <track kind="captions" />
                </video>
              ) : (
                <img
                  src={lightbox.blobId}
                  alt={lightbox.caption || "Temple photo"}
                  className="w-full max-h-[80vh] rounded-xl object-contain"
                />
              )}
              {lightbox.caption && (
                <p className="text-white text-center mt-3 text-sm opacity-80">
                  {lightbox.caption}
                </p>
              )}
              <p className="text-temple-gold/60 text-center text-xs mt-1">
                {lightbox.uploaderName} · {formatDate(lightbox.uploadedAt)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Page Content */}
      <section
        data-ocid="gallery.page"
        className="min-h-screen pt-20 pb-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                data-ocid="gallery.secondary_button"
                onClick={onBack}
                className="flex items-center justify-center w-9 h-9 rounded-full border border-temple-gold/40 text-temple-gold hover:bg-temple-gold/10 transition-colors"
                aria-label="Back to home"
              >
                <ArrowLeft size={18} />
              </button>
              <div className="flex items-center gap-2">
                <Images size={22} className="text-temple-gold" />
                <h2 className="font-display text-temple-gold text-2xl font-bold">
                  {t("galleryTitle")}
                </h2>
                <span className="text-temple-gold/40 text-sm">
                  ({items.length})
                </span>
              </div>
            </div>

            {user && (
              <button
                type="button"
                data-ocid="gallery.upload_button"
                onClick={() => setShowUpload((v) => !v)}
                className="flex items-center gap-1.5 text-sm text-temple-gold border border-temple-gold/50 hover:bg-temple-gold/10 rounded-lg px-3 py-1.5 transition-colors"
              >
                <Upload size={14} />
                {t("galleryUpload")}
              </button>
            )}
          </motion.div>

          {/* Upload Form */}
          <AnimatePresence>
            {showUpload && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border border-temple-gold/20 rounded-xl mb-6"
              >
                <div className="px-6 py-4 bg-zinc-900/80 flex flex-col gap-3">
                  <h3 className="text-temple-gold text-sm font-semibold">
                    {t("galleryUpload")}
                  </h3>
                  <div className="flex gap-3 flex-col sm:flex-row">
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*,video/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        id="gallery-file-input"
                      />
                      <label
                        htmlFor="gallery-file-input"
                        data-ocid="gallery.dropzone"
                        className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-temple-gold/30 hover:border-temple-gold/60 rounded-lg cursor-pointer transition-colors bg-black/20 hover:bg-temple-gold/5"
                      >
                        {filePreview && file ? (
                          file.type.startsWith("video/") ? (
                            <span className="text-temple-gold text-xs text-center px-2">
                              <Play size={16} className="inline mr-1" />
                              {file.name}
                            </span>
                          ) : (
                            <img
                              src={filePreview}
                              alt="Preview"
                              className="h-20 w-full object-contain rounded-md"
                            />
                          )
                        ) : (
                          <span className="text-gray-500 text-xs text-center">
                            <Upload size={16} className="inline mr-1" />
                            Tap to select photo or video
                          </span>
                        )}
                      </label>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <input
                        type="text"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        data-ocid="gallery.input"
                        placeholder={t("galleryCaption")}
                        className="w-full bg-zinc-900 border border-zinc-700 focus:border-temple-gold text-white px-3 py-2 rounded-lg outline-none transition-colors text-sm"
                      />
                      {uploadProgress > 0 && uploadProgress < 100 && (
                        <div data-ocid="gallery.loading_state">
                          <Progress value={uploadProgress} className="h-1.5" />
                          <p className="text-xs text-gray-400 mt-1">
                            Uploading... {uploadProgress}%
                          </p>
                        </div>
                      )}
                      {uploadError && (
                        <p
                          data-ocid="gallery.error_state"
                          className="text-red-400 text-xs"
                        >
                          {uploadError}
                        </p>
                      )}
                      <Button
                        onClick={handleUpload}
                        disabled={!file || uploading}
                        data-ocid="gallery.submit_button"
                        className="bg-temple-gold text-black hover:bg-temple-gold/80 font-semibold text-sm"
                      >
                        {uploading ? (
                          <>
                            <Loader2 size={14} className="mr-1 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload size={14} className="mr-1" />
                            Upload
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Gallery Grid */}
          {loading ? (
            <div
              data-ocid="gallery.loading_state"
              className="flex items-center justify-center h-48 text-gray-500 gap-2"
            >
              <Loader2 size={24} className="animate-spin" />
              <span className="text-sm">Loading...</span>
            </div>
          ) : items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              data-ocid="gallery.empty_state"
              className="flex flex-col items-center justify-center h-48 gap-3"
            >
              <Images size={48} className="text-temple-gold/20" />
              <p className="text-gray-500 text-sm">{t("galleryEmpty")}</p>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4"
              >
                {visibleItems.map((item, i) => (
                  <motion.div
                    key={String(item.id)}
                    data-ocid={`gallery.item.${i + 1}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="group relative bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-hidden cursor-pointer hover:border-temple-gold/40 transition-all hover:shadow-lg hover:shadow-temple-gold/5"
                    onClick={() => setLightbox(item)}
                  >
                    {/* Thumbnail */}
                    <div className="aspect-square relative bg-zinc-800">
                      {item.mediaType === "video" ? (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                          <video
                            src={item.blobId}
                            className="w-full h-full object-cover"
                            muted
                            preload="metadata"
                          >
                            <track kind="captions" />
                          </video>
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Play
                              size={32}
                              className="text-white/80 fill-white/80 drop-shadow"
                            />
                          </div>
                        </div>
                      ) : (
                        <img
                          src={item.blobId}
                          alt={item.caption || "Temple photo"}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}
                      {/* Zoom overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <ZoomIn
                          size={24}
                          className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>
                    {/* Info */}
                    <div className="px-3 py-2">
                      {item.caption && (
                        <p className="text-white text-xs font-medium line-clamp-1">
                          {item.caption}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-temple-gold/60 text-xs">
                          {item.uploaderName}
                        </span>
                        <span className="text-gray-600 text-xs">
                          {formatDate(item.uploadedAt)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* View More Button */}
              {hasMore && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center mt-8"
                >
                  <button
                    type="button"
                    data-ocid="gallery.secondary_button"
                    onClick={() => setShowAll(true)}
                    className="flex items-center gap-2 text-temple-gold border border-temple-gold/50 hover:bg-temple-gold/10 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors"
                  >
                    <ChevronDown size={16} />
                    {t("galleryViewMore") ||
                      `View More (${items.length - INITIAL_SHOW} more)`}
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
