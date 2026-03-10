import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/context/LanguageContext";
import { useGetAllPoojas } from "@/hooks/useQueries";
import {
  CalendarDays,
  Clock,
  Flame,
  Flower2,
  Heart,
  IndianRupee,
  Moon,
  Sparkles,
  Star,
  Sun,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const POOJA_ICONS = [
  { Icon: Flame, bg: "oklch(0.94 0.07 40)", color: "oklch(0.55 0.22 35)" },
  { Icon: Star, bg: "oklch(0.95 0.08 80)", color: "oklch(0.62 0.18 80)" },
  { Icon: Sun, bg: "oklch(0.95 0.07 90)", color: "oklch(0.70 0.16 90)" },
  { Icon: Moon, bg: "oklch(0.93 0.05 270)", color: "oklch(0.52 0.14 270)" },
  { Icon: Flower2, bg: "oklch(0.94 0.07 0)", color: "oklch(0.58 0.20 10)" },
  { Icon: Sparkles, bg: "oklch(0.95 0.06 60)", color: "oklch(0.65 0.18 55)" },
  { Icon: Heart, bg: "oklch(0.93 0.08 15)", color: "oklch(0.55 0.22 20)" },
  { Icon: Zap, bg: "oklch(0.95 0.07 95)", color: "oklch(0.60 0.20 75)" },
];

export default function PoojasSection() {
  const { t, lang } = useLanguage();
  const { data: poojas, isLoading } = useGetAllPoojas();

  return (
    <section
      id="poojas"
      className="py-20 lg:py-28"
      style={{ background: "oklch(0.97 0.008 75)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-3xl block mb-2">🙏</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-temple-crimson mb-4">
            {t("poojasTitle")}
          </h2>
          <p className="ornament-divider text-temple-gold/70 text-sm max-w-xs mx-auto mb-4">
            <span>✦</span>
          </p>
          <p className="font-body text-lg text-foreground/70 max-w-2xl mx-auto">
            {t("poojasSubtitle")}
          </p>
        </motion.div>

        {/* Loading */}
        {isLoading && (
          <div
            data-ocid="poojas.loading_state"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && (!poojas || poojas.length === 0) && (
          <div data-ocid="poojas.empty_state" className="text-center py-16">
            <p className="font-body text-lg text-muted-foreground">
              {t("noPoojas")}
            </p>
          </div>
        )}

        {/* Poojas grid */}
        {!isLoading && poojas && poojas.length > 0 && (
          <div
            data-ocid="poojas.list"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {poojas.map((pooja, index) => {
              const { Icon, bg, color } =
                POOJA_ICONS[index % POOJA_ICONS.length];
              return (
                <motion.div
                  key={String(pooja.poojaId)}
                  data-ocid={`poojas.item.${index + 1}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card
                    className="h-full hover:shadow-temple transition-all duration-300 overflow-hidden group"
                    style={{
                      background: "oklch(0.99 0.003 70)",
                      border: "1px solid oklch(0.88 0.06 70)",
                    }}
                  >
                    {/* Card top accent */}
                    <div
                      className="h-1 w-full"
                      style={{
                        background:
                          "linear-gradient(to right, oklch(0.65 0.2 46), oklch(0.82 0.15 85))",
                      }}
                    />
                    <CardHeader className="pb-3">
                      {/* Unique icon badge */}
                      <div className="mb-3">
                        <span
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full shadow-sm"
                          style={{ background: bg }}
                        >
                          <Icon size={20} style={{ color }} strokeWidth={2} />
                        </span>
                      </div>
                      <CardTitle className="font-display text-xl text-temple-crimson group-hover:text-temple-saffron transition-colors">
                        {lang === "ml"
                          ? pooja.nameMalayalam
                          : pooja.nameEnglish}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="font-body text-foreground/75 text-base leading-relaxed">
                        {lang === "ml"
                          ? pooja.descriptionMalayalam
                          : pooja.descriptionEnglish}
                      </p>

                      <div className="space-y-2 pt-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock
                            size={14}
                            className="text-temple-saffron flex-shrink-0"
                          />
                          <span className="font-body text-foreground/70">
                            <span className="font-semibold text-foreground/90">
                              {t("timing")}:
                            </span>{" "}
                            {pooja.timing}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <IndianRupee
                            size={14}
                            className="text-temple-saffron flex-shrink-0"
                          />
                          <span className="font-body text-foreground/70">
                            <span className="font-semibold text-foreground/90">
                              {t("fee")}:
                            </span>{" "}
                            ₹{String(pooja.fee)}
                          </span>
                        </div>

                        <div className="flex items-start gap-2 text-sm">
                          <CalendarDays
                            size={14}
                            className="text-temple-saffron flex-shrink-0 mt-0.5"
                          />
                          <div className="flex flex-wrap gap-1">
                            {pooja.availableDays.map((day) => (
                              <Badge
                                key={day}
                                variant="secondary"
                                className="text-xs font-body"
                                style={{
                                  background: "oklch(0.92 0.04 70)",
                                  color: "oklch(0.35 0.06 40)",
                                }}
                              >
                                {day}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Button
                        asChild
                        size="sm"
                        className="w-full mt-2 font-body"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.65 0.2 46), oklch(0.55 0.22 35))",
                          color: "oklch(0.98 0.005 80)",
                        }}
                      >
                        <a href="#booking">{t("bookThisPooja")}</a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
