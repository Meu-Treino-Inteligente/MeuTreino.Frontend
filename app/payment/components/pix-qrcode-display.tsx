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
        <div className="flex items-center justify-center gap-2 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
          <FontAwesomeIcon icon={faClock} className="text-orange-400" />
          <p className="text-orange-400 font-semibold text-sm">
            QR Code expira em:{" "}
            <span className="font-black">{timeRemaining}</span>
          </p>
        </div>
      )}

      <div className="bg-white p-6 rounded-xl flex items-center justify-center shadow-lg">
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
            className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono"
            onClick={(e) => (e.target as HTMLInputElement).select()}
          />
          <button
            onClick={onCopyCode}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              copied
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-cyan-500 hover:bg-cyan-600 text-white"
            }`}
          >
            <FontAwesomeIcon
              icon={copied ? faCheck : faCopy}
              className="w-4 h-4"
            />
          </button>
        </div>
        {copied && (
          <p className="text-green-400 text-sm mt-2 flex items-center gap-2">
            <FontAwesomeIcon icon={faCheckCircle} />
            Código copiado para a área de transferência!
          </p>
        )}
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
        <p className="text-cyan-400 text-sm text-center">
          <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
          Escaneie o QR Code com o app do seu banco ou copie o código PIX para
          fazer o pagamento.
        </p>
      </div>
    </div>
  );
}
