import { useState } from "react";
import TokenModal from "./TokenModal";

export default function FloatingContactButton() {
  const [open, setOpen] = useState(false);
  const [tokenOpen, setTokenOpen] = useState(false);

  const phoneNumber = "+910000000000";
  const whatsappNumber = "910000000000";
  const email = "temple@example.com";

  return (
    <>
      <div
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        data-ocid="floating_contact.panel"
      >
        {open && (
          <div className="flex flex-col items-end gap-3">
            {/* Token Booking */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setTokenOpen(true);
              }}
              className="flex items-center gap-2 bg-white rounded-full shadow-lg px-4 py-2 text-gray-800 font-medium hover:bg-gray-50 transition-all"
              data-ocid="floating_contact.token.button"
            >
              <span className="text-sm">Book Token</span>
              <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                <svg
                  role="img"
                  aria-label="Token"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <title>Token</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
              </div>
            </button>

            {/* Phone */}
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center gap-2 bg-white rounded-full shadow-lg px-4 py-2 text-gray-800 font-medium hover:bg-gray-50 transition-all"
              data-ocid="floating_contact.phone.button"
            >
              <span className="text-sm">Call Us</span>
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  role="img"
                  aria-label="Phone"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>Phone</title>
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.58 1 1 0 01-.25 1.01l-2.2 2.2z" />
                </svg>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white rounded-full shadow-lg px-4 py-2 text-gray-800 font-medium hover:bg-gray-50 transition-all"
              data-ocid="floating_contact.whatsapp.button"
            >
              <span className="text-sm">WhatsApp</span>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  role="img"
                  aria-label="WhatsApp"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>WhatsApp</title>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.112 1.523 5.837L.057 23.215a.75.75 0 00.921.921l5.378-1.466A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.807 9.807 0 01-5.001-1.373l-.358-.213-3.714 1.013 1.013-3.714-.213-.358A9.808 9.808 0 012.182 12C2.182 6.565 6.565 2.182 12 2.182S21.818 6.565 21.818 12 17.435 21.818 12 21.818z" />
                </svg>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 bg-white rounded-full shadow-lg px-4 py-2 text-gray-800 font-medium hover:bg-gray-50 transition-all"
              data-ocid="floating_contact.email.button"
            >
              <span className="text-sm">Email Us</span>
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <svg
                  role="img"
                  aria-label="Email"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <title>Email</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </a>
          </div>
        )}

        {/* Main FAB button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-14 h-14 bg-yellow-600 hover:bg-yellow-700 rounded-full shadow-xl flex items-center justify-center transition-all duration-300"
          data-ocid="floating_contact.toggle.button"
          aria-label="Contact us"
        >
          {open ? (
            <svg
              role="img"
              aria-label="Close"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <title>Close</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              role="img"
              aria-label="Contact"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Contact</title>
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.58 1 1 0 01-.25 1.01l-2.2 2.2z" />
            </svg>
          )}
        </button>
      </div>

      <TokenModal open={tokenOpen} onClose={() => setTokenOpen(false)} />
    </>
  );
}
