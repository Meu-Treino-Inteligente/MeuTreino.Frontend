"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faHome } from "@fortawesome/free-solid-svg-icons";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center py-20 px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-8xl text-cyan-400 mb-6"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Perfil Criado!
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Seu perfil foi criado com sucesso. Agora você pode gerar seu plano de
          treino personalizado.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold hover:shadow-xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105"
        >
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
}
