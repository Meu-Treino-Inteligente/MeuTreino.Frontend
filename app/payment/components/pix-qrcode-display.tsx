import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCopy,
  faCheck,
  faCheckCircle,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

interface PixQrCodeDisplayProps {
  pixQrcode: string;
  pixCode: string;
  /** Link da página do Mercado Pago para pagar (opcional) */
  ticketUrl?: string;
  timeRemaining: string;
  copied: boolean;
  onCopyCode: (e: React.MouseEvent) => void;
}

/** Converte base64 puro em data URL para <img src="..." /> */
function toDataUrl(base64: string): string {
  if (!base64) return "";
  if (base64.startsWith("data:")) return base64;
  return `data:image/png;base64,${base64}`;
}

export function PixQrCodeDisplay({
  pixQrcode,
  pixCode,
  ticketUrl,
  timeRemaining,
  copied,
  onCopyCode,
}: PixQrCodeDisplayProps) {
  const qrSrc = toDataUrl(pixQrcode);

  return (
    <div className="space-y-6">
      {timeRemaining && (
        <div className="flex items-center justify-center gap-2.5 p-4 bg-orange-50 border border-orange-200 rounded-xl">
          <FontAwesomeIcon icon={faClock} className="text-orange-600 text-lg" />
          <p className="text-orange-700 font-semibold text-sm">
            QR Code expira em:{" "}
            <span className="font-black text-base">{timeRemaining}</span>
          </p>
        </div>
      )}

      <div className="bg-white p-8 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-gray-200">
        {qrSrc && (
          <img
            src={qrSrc}
            alt="QR Code PIX"
            className="w-full max-w-[280px] h-auto"
          />
        )}
      </div>

      {ticketUrl && (
        <div className="flex justify-center">
          <a
            href={ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-[#009ee3] hover:bg-[#0088c7] text-white transition-colors"
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} className="w-4" />
            Pagar no Mercado Pago
          </a>
        </div>
      )}

      <div>
        <label className="block text-gray-900 text-sm font-semibold mb-3">
          Ou copie o código PIX:
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={pixCode || ""}
            readOnly
            className="flex-1 px-4 py-3.5 bg-gray-50 border-2 border-purple-200 rounded-xl text-gray-900 text-sm font-mono focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 hover:border-purple-300 transition-all cursor-text"
            onClick={(e) => (e.target as HTMLInputElement).select()}
          />
          <button
            onClick={onCopyCode}
            className={`px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center min-w-[56px] ${
              copied
                ? "bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95"
            }`}
          >
            <FontAwesomeIcon
              icon={copied ? faCheck : faCopy}
              className="w-4 h-4"
            />
          </button>
        </div>
        {copied && (
          <p className="text-green-600 text-sm mt-2.5 flex items-center gap-2 font-medium">
            <FontAwesomeIcon icon={faCheckCircle} className="text-base" />
            Código copiado para a área de transferência!
          </p>
        )}
      </div>

      <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-5">
        <p className="text-purple-700 text-sm text-center leading-relaxed flex items-center justify-center gap-2">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-base shrink-0"
          />
          <span>
          Escaneie o QR Code com o app do seu banco ou copie o código PIX para
          fazer o pagamento.
          </span>
        </p>
      </div>
    </div>
  );
}
