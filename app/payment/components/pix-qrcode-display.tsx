import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCopy,
  faCheck,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

interface PixQrCodeDisplayProps {
  pixQrcode: string;
  pixCode: string;
  timeRemaining: string;
  copied: boolean;
  onCopyCode: (e: React.MouseEvent) => void;
}

export function PixQrCodeDisplay({
  pixQrcode,
  pixCode,
  timeRemaining,
  copied,
  onCopyCode,
}: PixQrCodeDisplayProps) {
  return (
    <div className="space-y-6">
      {timeRemaining && (
        <div className="flex items-center justify-center gap-2.5 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl backdrop-blur-sm">
          <FontAwesomeIcon icon={faClock} className="text-orange-400 text-lg" />
          <p className="text-orange-400 font-semibold text-sm">
            QR Code expira em:{" "}
            <span className="font-black text-base">{timeRemaining}</span>
          </p>
        </div>
      )}

      <div className="bg-white p-8 rounded-2xl flex items-center justify-center shadow-2xl border border-gray-200/20">
        {pixQrcode && (
          <img
            src={pixQrcode}
            alt="QR Code PIX"
            className="w-full max-w-[280px] h-auto"
          />
        )}
      </div>

      <div>
        <label className="block text-white text-sm font-semibold mb-3">
          Ou copie o código PIX:
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={pixCode || ""}
            readOnly
            className="flex-1 px-4 py-3.5 bg-gray-800/60 border-2 border-purple-500/20 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 hover:border-purple-500/40 transition-all cursor-text"
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
          <p className="text-green-400 text-sm mt-2.5 flex items-center gap-2 font-medium">
            <FontAwesomeIcon icon={faCheckCircle} className="text-base" />
            Código copiado para a área de transferência!
          </p>
        )}
      </div>

      <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-purple-500/30 rounded-xl p-5 backdrop-blur-sm">
        <p className="text-purple-400 text-sm text-center leading-relaxed flex items-center justify-center gap-2">
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
