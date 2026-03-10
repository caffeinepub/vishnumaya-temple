import { useLanguage } from "@/context/LanguageContext";

interface Props {
  onAdminClick?: () => void;
}

export default function Footer({ onAdminClick }: Props) {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer
      className="py-8 text-center"
      style={{
        background: "oklch(0.12 0.04 40)",
        borderTop: "1px solid oklch(0.82 0.15 85 / 0.2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-3">
          <span className="text-2xl">🪔</span>
        </div>
        <p
          className="font-display text-sm font-bold mb-1"
          style={{ color: "oklch(0.82 0.15 85)" }}
        >
          {t("heroTitle")}
        </p>
        <p
          className="font-body text-xs mb-3"
          style={{ color: "oklch(0.65 0.03 60)" }}
        >
          © {year}. {t("footerRights")}
        </p>
        <p
          className="font-body text-xs mb-4"
          style={{ color: "oklch(0.5 0.03 60)" }}
        >
          {t("footerBuilt")}{" "}
          <a
            href={utmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80 transition-opacity"
            style={{ color: "oklch(0.72 0.15 65)" }}
          >
            caffeine.ai
          </a>
        </p>
        {/* Hidden admin access */}
        <button
          type="button"
          onClick={onAdminClick}
          data-ocid="footer.admin.button"
          className="text-xs opacity-20 hover:opacity-50 transition-opacity"
          style={{ color: "oklch(0.5 0.03 60)" }}
        >
          Admin
        </button>
      </div>
    </footer>
  );
}
