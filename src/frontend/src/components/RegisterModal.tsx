import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";
import { useActor } from "@/hooks/useActor";
import { CheckCircle, Phone, Shield } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
}

type Step = "form" | "otp" | "success";

export default function RegisterModal({ open, onClose }: Props) {
  const { t } = useLanguage();
  const { actor } = useActor();
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setStep("form");
    setName("");
    setPhone("");
    setOtp("");
    setGeneratedOtp("");
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleRequestOTP = async () => {
    if (!name.trim() || !phone.trim()) {
      toast.error(t("registerFillAll"));
      return;
    }
    if (!/^[0-9]{10,15}$/.test(phone.replace(/[\s+\-]/g, ""))) {
      toast.error(t("registerInvalidPhone"));
      return;
    }
    if (!actor) {
      toast.error(t("registerError"));
      return;
    }
    setLoading(true);
    try {
      const isReg = await actor.isRegistered(phone.trim());
      if (isReg) {
        toast.error(t("registerAlreadyRegistered"));
        return;
      }
      const code = await actor.requestOTP(phone.trim(), name.trim());
      setGeneratedOtp(code);
      setStep("otp");
      toast.success(t("registerOTPSent"));
    } catch {
      toast.error(t("registerError"));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      toast.error(t("registerEnterOTP"));
      return;
    }
    if (!actor) {
      toast.error(t("registerError"));
      return;
    }
    setLoading(true);
    try {
      const success = await actor.verifyOTP(phone.trim(), otp.trim());
      if (success) {
        setStep("success");
      } else {
        toast.error(t("registerInvalidOTP"));
      }
    } catch {
      toast.error(t("registerError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        data-ocid="register.dialog"
        className="bg-gray-900 border border-temple-gold/30 text-white max-w-md mx-4"
      >
        <DialogHeader>
          <DialogTitle className="text-temple-gold font-display text-xl flex items-center gap-2">
            <Phone size={20} />
            {t("registerTitle")}
          </DialogTitle>
        </DialogHeader>

        {step === "form" && (
          <div className="space-y-4 mt-2">
            <p className="text-gray-300 text-sm">{t("registerSubtitle")}</p>
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="reg-name"
                  className="text-sm text-gray-400 mb-1 block"
                >
                  {t("registerName")}
                </label>
                <Input
                  id="reg-name"
                  data-ocid="register.name.input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("registerNamePlaceholder")}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-temple-gold"
                />
              </div>
              <div>
                <label
                  htmlFor="reg-phone"
                  className="text-sm text-gray-400 mb-1 block"
                >
                  {t("registerPhone")}
                </label>
                <Input
                  id="reg-phone"
                  data-ocid="register.phone.input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t("registerPhonePlaceholder")}
                  type="tel"
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-temple-gold"
                />
              </div>
            </div>
            <Button
              data-ocid="register.send_otp.button"
              onClick={handleRequestOTP}
              disabled={loading}
              className="w-full bg-temple-gold text-black hover:bg-temple-gold/90 font-semibold"
            >
              {loading ? t("registerSending") : t("registerSendOTP")}
            </Button>
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-4 mt-2">
            <div className="flex items-start gap-3 bg-yellow-950/40 border border-yellow-600/40 rounded-lg p-3">
              <Shield size={18} className="text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-yellow-300 text-sm font-medium">
                  {t("registerOTPDemoNote")}
                </p>
                <p className="text-yellow-200 text-xl font-bold tracking-widest mt-1">
                  {generatedOtp}
                </p>
              </div>
            </div>
            <div>
              <label
                htmlFor="reg-otp"
                className="text-sm text-gray-400 mb-1 block"
              >
                {t("registerEnterOTPLabel")}
              </label>
              <Input
                id="reg-otp"
                data-ocid="register.otp.input"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="------"
                maxLength={6}
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-temple-gold text-center text-xl tracking-widest"
              />
            </div>
            <div className="flex gap-2">
              <Button
                data-ocid="register.back.button"
                variant="outline"
                onClick={() => setStep("form")}
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                {t("registerBack")}
              </Button>
              <Button
                data-ocid="register.verify.button"
                onClick={handleVerifyOTP}
                disabled={loading}
                className="flex-1 bg-temple-gold text-black hover:bg-temple-gold/90 font-semibold"
              >
                {loading ? t("registerVerifying") : t("registerVerify")}
              </Button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div
            className="text-center space-y-4 py-4"
            data-ocid="register.success_state"
          >
            <div className="flex justify-center">
              <CheckCircle size={56} className="text-green-400" />
            </div>
            <h3 className="text-white text-lg font-semibold">
              {t("registerSuccessTitle")}
            </h3>
            <p className="text-gray-300 text-sm">
              {t("registerSuccessMessage")}
            </p>
            <Button
              data-ocid="register.close.button"
              onClick={handleClose}
              className="bg-temple-gold text-black hover:bg-temple-gold/90 font-semibold px-8"
            >
              {t("registerDone")}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
