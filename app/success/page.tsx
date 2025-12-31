"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getUserSiteByUserId } from "@/services/users/user.service";
import { load_user_id, clear_user_id } from "@/infrastructure/cookies";

export default function SuccessPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState(
    "Processando seu pagamento..."
  );
  const [dots, setDots] = useState("");

  useEffect(() => {
    // Animação de pontos
    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  useEffect(() => {
    const checkSlugAvailability = async () => {
      const userId = load_user_id();

      if (!userId) {
        setStatusMessage("Erro: ID do usuário não encontrado");
        setIsLoading(false);
        return;
      }

      setStatusMessage("Aguardando geração do treino pela IA...");

      // Polling para verificar se o slug está disponível
      const maxAttempts = 60; // 5 minutos (60 tentativas * 5 segundos)
      let attempts = 0;
      const pollInterval = 5000; // 5 segundos

      const pollSlug = async () => {
        try {
          const response = await getUserSiteByUserId(userId);

          // Atualizar mensagem de status se disponível
          if (response.message) {
            setStatusMessage(response.message);
          }

          // Verificar o status da resposta
          if (response.status === "ready") {
            // Treino pronto! Redirecionar para a página do slug
            if (response.slug) {
              clear_user_id();
              router.push(`/${response.slug}`);
              return;
            }
          } else if (response.status === "error") {
            // Erro no processamento - parar polling e exibir mensagem de erro
            setStatusMessage(
              response.message || "Ocorreu um erro ao processar seu treino. Nossa equipe foi notificada e irá corrigir em breve."
            );
            setIsLoading(false);
            return;
          }
          // Se status é "pending", continuar polling

          attempts++;
          if (attempts >= maxAttempts) {
            setStatusMessage(
              "O processamento está demorando mais que o esperado. Você receberá um email quando seu treino estiver pronto."
            );
            setIsLoading(false);
            return;
          }

          // Continuar polling
          setTimeout(pollSlug, pollInterval);
        } catch (error) {
          console.error("Erro ao verificar status:", error);
          attempts++;

          if (attempts >= maxAttempts) {
            setStatusMessage(
              "Erro ao verificar status. Você receberá um email quando seu treino estiver pronto."
            );
            setIsLoading(false);
          } else {
            // Continuar tentando mesmo em caso de erro
            setTimeout(pollSlug, pollInterval);
          }
        }
      };

      // Iniciar polling após um pequeno delay
      setTimeout(pollSlug, 2000);
    };

    checkSlugAvailability();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 flex items-center justify-center py-20 px-4">
      <div className="text-center max-w-md">
        {/* Card branco com borda */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 shadow-xl">
          {/* Animação de IA */}
          <div className="mb-8 relative">
            <div className="relative inline-block">
              {/* Círculo pulsante de fundo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 via-pink-500/20 to-orange-500/20 animate-pulse"></div>
              
              {/* Ícone de cérebro com rotação */}
              <div className="relative">
                <FontAwesomeIcon
                  icon={faBrain}
                  className="text-8xl text-purple-600 animate-pulse"
                />
                {/* Partículas de brilho */}
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-2 left-2 w-2 h-2 bg-purple-500 rounded-full animate-ping"></div>
                  <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-pink-500 rounded-full animate-ping" style={{ animationDelay: "0.5s" }}></div>
                  <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping" style={{ animationDelay: "1s" }}></div>
                  <div className="absolute bottom-2 right-2 w-2 h-2 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: "1.5s" }}></div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="block text-gray-900">Pagamento</span>
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Aprovado!
            </span>
          </h1>
          
          <p className="text-gray-600 text-lg mb-6">
            {statusMessage}
            {isLoading && <span className="inline-block w-4">{dots}</span>}
          </p>

          {isLoading && (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-purple-600">
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="animate-spin text-2xl"
                />
                <span className="text-sm font-semibold">Gerando seu treino personalizado...</span>
              </div>
              
              {/* Barra de progresso animada */}
              <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-full animate-pulse" style={{ width: "60%" }}></div>
              </div>
            </div>
          )}

          {!isLoading && (
            <div className="mt-8">
              <p className="text-gray-600 text-sm">
                Você receberá um email com o link do seu treino quando estiver pronto.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
