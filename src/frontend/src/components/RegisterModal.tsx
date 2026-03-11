import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";
import { useActor } from "@/hooks/useActor";
import { CheckCircle, Eye, EyeOff, KeyRound, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
}

type Tab = "register" | "signin" | "forgot";
type Step = "form" | "success";

const PASSWORDS_KEY = "temple_passwords";

function getStoredPasswords(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(PASSWORDS_KEY) || "{}");
  } catch {
    return {};
  }
}

function savePassword(phone: string, password: string) {
  const passwords = getStoredPasswords();
  passwords[phone] = password;
  localStorage.setItem(PASSWORDS_KEY, JSON.stringify(passwords));
}

export default function RegisterModal({ open, onClose }: Props) {
  const { t } = useLanguage();
  const { actor } = useActor();
  const { setUser } = useUser();

  const [tab, setTab] = useState<Tab>("register");
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);

  // Register fields
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [showRegPwd, setShowRegPwd] = useState(false);
  const [showRegConfirm, setShowRegConfirm] = useState(false);

  // Sign in fields
  const [signPhone, setSignPhone] = useState("");
  const [signPassword, setSignPassword] = useState("");
  const [showSignPwd, setShowSignPwd] = useState(false);

  // Forgot password fields
  const [forgotPhone, setForgotPhone] = useState("");
  const [forgotNewPwd, setForgotNewPwd] = useState("");
  const [forgotConfirmPwd, setForgotConfirmPwd] = useState("");
  const [showForgotNewPwd, setShowForgotNewPwd] = useState(false);
  const [showForgotConfirmPwd, setShowForgotConfirmPwd] = useState(false);

  const resetAll = () => {
    setTab("register");
    setStep("form");
    setRegName("");
    setRegPhone("");
    setRegPassword("");
    setRegConfirm("");
    setShowRegPwd(false);
    setShowRegConfirm(false);
    setSignPhone("");
    setSignPassword("");
    setShowSignPwd(false);
    setForgotPhone("");
    setForgotNewPwd("");
    setForgotConfirmPwd("");
    setShowForgotNewPwd(false);
    setShowForgotConfirmPwd(false);
  };

  const handleClose = () => {
    resetAll();
    onClose();
  };

  const validatePhone = (p: string) =>
    /^[0-9]{10,15}$/.test(p.replace(/[\s+\-]/g, ""));

  // ---- Register ----
  const handleRegister = async () => {
    if (!regName.trim() || !regPhone.trim() || !regPassword || !regConfirm) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!validatePhone(regPhone)) {
      toast.error(t("registerInvalidPhone"));
      return;
    }
    if (regPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (regPassword !== regConfirm) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!actor) {
      toast.error(t("registerError"));
      return;
    }

    setLoading(true);
    try {
      const isReg = await actor.isRegistered(regPhone.trim());
      if (isReg) {
        toast.error(t("registerAlreadyRegistered"));
        return;
      }
      // Use OTP flow silently to persist user in backend
      const code = await actor.requestOTP(regPhone.trim(), regName.trim());
      await actor.verifyOTP(regPhone.trim(), code);
      savePassword(regPhone.trim(), regPassword);
      setUser({ phone: regPhone.trim(), name: regName.trim() });
      setStep("success");
    } catch {
      toast.error(t("registerError"));
    } finally {
      setLoading(false);
    }
  };

  // ---- Sign In ----
  const handleSignIn = async () => {
    if (!signPhone.trim() || !signPassword) {
      toast.error("Please enter your mobile number and password.");
      return;
    }
    if (!validatePhone(signPhone)) {
      toast.error(t("registerInvalidPhone"));
      return;
    }
    if (!actor) {
      toast.error(t("registerError"));
      return;
    }

    setLoading(true);
    try {
      const isReg = await actor.isRegistered(signPhone.trim());
      if (!isReg) {
        toast.error(
          "No account found with this number. Please register first.",
        );
        return;
      }
      const passwords = getStoredPasswords();
      if (passwords[signPhone.trim()] !== signPassword) {
        toast.error("Incorrect password. Please try again.");
        return;
      }
      const userData = await actor.getUser(signPhone.trim());
      const userName =
        Array.isArray(userData) && userData.length > 0
          ? (userData[0] as { name: string }).name
          : signPhone.trim();
      setUser({ phone: signPhone.trim(), name: userName });
      setStep("success");
    } catch {
      toast.error(t("registerError"));
    } finally {
      setLoading(false);
    }
  };

  // ---- Forgot Password ----
  const handleResetPassword = async () => {
    if (!forgotPhone.trim() || !forgotNewPwd || !forgotConfirmPwd) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!validatePhone(forgotPhone)) {
      toast.error(t("registerInvalidPhone"));
      return;
    }
    if (forgotNewPwd.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (forgotNewPwd !== forgotConfirmPwd) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!actor) {
      toast.error(t("registerError"));
      return;
    }

    setLoading(true);
    try {
      const isReg = await actor.isRegistered(forgotPhone.trim());
      if (!isReg) {
        toast.error("No account found with this number.");
        return;
      }
      savePassword(forgotPhone.trim(), forgotNewPwd);
      toast.success("Password reset successfully!");
      setForgotPhone("");
      setForgotNewPwd("");
      setForgotConfirmPwd("");
      setTab("signin");
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
            {tab === "forgot" ? <KeyRound size={20} /> : <Phone size={20} />}
            {tab === "register"
              ? t("registerTitle")
              : tab === "signin"
                ? "Sign In"
                : "Reset Password"}
          </DialogTitle>
        </DialogHeader>

        {step === "form" && (
          <>
            {/* Tabs — only show for register/signin */}
            {tab !== "forgot" && (
              <div className="flex border border-gray-700 rounded-lg overflow-hidden mb-4">
                <button
                  type="button"
                  data-ocid="register.register.tab"
                  onClick={() => setTab("register")}
                  className={`flex-1 py-2 text-sm font-semibold transition-colors ${
                    tab === "register"
                      ? "bg-temple-gold text-black"
                      : "bg-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  Register
                </button>
                <button
                  type="button"
                  data-ocid="register.signin.tab"
                  onClick={() => setTab("signin")}
                  className={`flex-1 py-2 text-sm font-semibold transition-colors ${
                    tab === "signin"
                      ? "bg-temple-gold text-black"
                      : "bg-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  Sign In
                </button>
              </div>
            )}

            {tab === "register" && (
              <div className="space-y-3">
                <p className="text-gray-300 text-sm">{t("registerSubtitle")}</p>

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
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
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
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder={t("registerPhonePlaceholder")}
                    type="tel"
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-temple-gold"
                  />
                </div>

                <div>
                  <label
                    htmlFor="reg-password"
                    className="text-sm text-gray-400 mb-1 block"
                  >
                    Create Password
                  </label>
                  <div className="relative">
                    <Input
                      id="reg-password"
                      data-ocid="register.password.input"
                      type={showRegPwd ? "text" : "password"}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min. 6 characters"
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-temple-gold pr-10"
                    />
                    <button
                      type="button"
                      data-ocid="register.password.toggle"
                      onClick={() => setShowRegPwd(!showRegPwd)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showRegPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="reg-confirm"
                    className="text-sm text-gray-400 mb-1 block"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Input
                      id="reg-confirm"
                      data-ocid="register.confirm_password.input"
                      type={showRegConfirm ? "text" : "password"}
                      value={regConfirm}
                      onChange={(e) => setRegConfirm(e.target.value)}
                      placeholder="Re-enter password"
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-temple-gold pr-10"
                    />
                    <button
                      type="button"
                      data-ocid="register.confirm_password.toggle"
                      onClick={() => setShowRegConfirm(!showRegConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showRegConfirm ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  data-ocid="register.submit_button"
                  onClick={handleRegister}
                  disabled={loading}
                  className="w-full bg-temple-gold text-black hover:bg-temple-gold/90 font-semibold mt-2"
                >
                  {loading ? "Registering..." : "Create Account"}
                </Button>
              </div>
            )}

            {tab === "signin" && (
              <div className="space-y-3">
                <p className="text-gray-300 text-sm">
                  Sign in with your registered mobile number and password.
                </p>

                <div>
                  <label
                    htmlFor="sign-phone"
                    className="text-sm text-gray-400 mb-1 block"
                  >
                    Mobile Number
                  </label>
                  <Input
                    id="sign-phone"
                    data-ocid="signin.phone.input"
                    value={signPhone}
                    onChange={(e) => setSignPhone(e.target.value)}
                    placeholder={t("registerPhonePlaceholder")}
                    type="tel"
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-temple-gold"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sign-password"
                    className="text-sm text-gray-400 mb-1 block"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="sign-password"
                      data-ocid="signin.password.input"
                      type={showSignPwd ? "text" : "password"}
                      value={signPassword}
                      onChange={(e) => setSignPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-temple-gold pr-10"
                    />
                    <button
                      type="button"
                      data-ocid="signin.password.toggle"
                      onClick={() => setShowSignPwd(!showSignPwd)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showSignPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <Button
                  data-ocid="signin.submit_button"
                  onClick={handleSignIn}
                  disabled={loading}
                  className="w-full bg-temple-gold text-black hover:bg-temple-gold/90 font-semibold mt-2"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>

                {/* Forgot Password link */}
                <div className="text-center">
                  <button
                    type="button"
                    data-ocid="signin.forgot_password.link"
                    onClick={() => setTab("forgot")}
                    className="text-temple-gold/80 hover:text-temple-gold text-xs hover:underline transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                <p className="text-center text-gray-500 text-xs">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    data-ocid="signin.register.link"
                    onClick={() => setTab("register")}
                    className="text-temple-gold hover:underline"
                  >
                    Register here
                  </button>
                </p>
              </div>
            )}

            {tab === "forgot" && (
              <div className="space-y-3">
                <p className="text-gray-300 text-sm">
                  Enter your registered mobile number and set a new password.
                </p>

                <div>
                  <label
                    htmlFor="forgot-phone"
                    className="text-sm text-gray-400 mb-1 block"
                  >
                    Mobile Number
                  </label>
                  <Input
                    id="forgot-phone"
                    data-ocid="forgotpwd.phone.input"
                    value={forgotPhone}
                    onChange={(e) => setForgotPhone(e.target.value)}
                    placeholder={t("registerPhonePlaceholder")}
                    type="tel"
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-temple-gold"
                  />
                </div>

                <div>
                  <label
                    htmlFor="forgot-new-pwd"
                    className="text-sm text-gray-400 mb-1 block"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <Input
                      id="forgot-new-pwd"
                      data-ocid="forgotpwd.new_password.input"
                      type={showForgotNewPwd ? "text" : "password"}
                      value={forgotNewPwd}
                      onChange={(e) => setForgotNewPwd(e.target.value)}
                      placeholder="Min. 6 characters"
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-temple-gold pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowForgotNewPwd(!showForgotNewPwd)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showForgotNewPwd ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="forgot-confirm-pwd"
                    className="text-sm text-gray-400 mb-1 block"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Input
                      id="forgot-confirm-pwd"
                      data-ocid="forgotpwd.confirm_password.input"
                      type={showForgotConfirmPwd ? "text" : "password"}
                      value={forgotConfirmPwd}
                      onChange={(e) => setForgotConfirmPwd(e.target.value)}
                      placeholder="Re-enter new password"
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-temple-gold pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowForgotConfirmPwd(!showForgotConfirmPwd)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showForgotConfirmPwd ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  data-ocid="forgotpwd.submit_button"
                  onClick={handleResetPassword}
                  disabled={loading}
                  className="w-full bg-temple-gold text-black hover:bg-temple-gold/90 font-semibold mt-2"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    data-ocid="forgotpwd.back.link"
                    onClick={() => setTab("signin")}
                    className="text-temple-gold/80 hover:text-temple-gold text-xs hover:underline transition-colors"
                  >
                    ← Back to Sign In
                  </button>
                </div>
              </div>
            )}
          </>
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
              {tab === "register" ? t("registerSuccessTitle") : "Welcome back!"}
            </h3>
            <p className="text-gray-300 text-sm">
              {tab === "register"
                ? t("registerSuccessMessage")
                : "You have successfully signed in."}
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
