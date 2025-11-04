"use client";

import { useState, useEffect } from "react";
import { HeaderNavigation } from "../components/header-navigation/header-navigation";
import { FooterSection } from "../components/footer-section/footer-section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQrcode,
  faCreditCard,
  faCopy,
  faCheck,
  faSpinner,
  faShieldAlt,
  faClock,
  faCheckCircle,
  faDumbbell,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  createPixQrcode,
  getPixQrcodeStatus,
} from "@/services/payments/pix.service";
import {
  validate_cpf,
  validate_email,
  validate_phone,
  format_cpf,
  format_phone,
  unformat_phone,
} from "@/utils/validation";
import {
  load_user_id,
  save_pix_payment_data,
  load_pix_payment_data,
  clear_pix_payment_data,
  is_pix_payment_expired,
  clear_register_session,
} from "@/infrastructure/cookies";

const PRODUCT_PRICE = 9900; // R$ 99,00 em centavos

export default function PaymentPage() {
  const [selected_method, set_selected_method] = useState<
    "pix" | "card" | null
  >(null);
  const [is_loading, set_is_loading] = useState(false);
  const [pix_qrcode, set_pix_qrcode] = useState<string | null>(null);
  const [pix_code, set_pix_code] = useState<string | null>(null);
  const [copied, set_copied] = useState(false);
  const [expires_at, set_expires_at] = useState<Date | null>(null);
  const [time_remaining, set_time_remaining] = useState<string>("");

  // Campos do formulário
  const [email, set_email] = useState<string>("");
  const [cpf, set_cpf] = useState<string>("");
  const [name, set_name] = useState<string>("");
  const [cellphone, set_cellphone] = useState<string>("");
  const [email_error, set_email_error] = useState<string>("");
  const [cpf_error, set_cpf_error] = useState<string>("");
  const [name_error, set_name_error] = useState<string>("");
  const [cellphone_error, set_cellphone_error] = useState<string>("");
  const [user_id, set_user_id] = useState<number | null>(null);
  const [is_summary_expanded, set_is_summary_expanded] = useState(false);
  const [swiper_instance, set_swiper_instance] = useState<SwiperType | null>(
    null
  );
  const [payment_status, set_payment_status] = useState<string | null>(null);
  const [payment_id, set_payment_id] = useState<string | null>(null);

  // Carregar user_id e dados do pagamento PIX ao montar o componente
  useEffect(() => {
    const load_payment_data = async () => {
      const saved_user_id = load_user_id();
      if (saved_user_id) {
        set_user_id(saved_user_id);
      }

      // Verificar se existe um pagamento PIX salvo
      const saved_payment = load_pix_payment_data();
      if (saved_payment) {
        // Verificar status do pagamento na API independente da data de expiração
        // (a API pode ter atualizado o status mesmo se a data passou)
        try {
          const status_response = await getPixQrcodeStatus(
            saved_payment.payment_id
          );

          if (status_response.data) {
            const current_status =
              status_response.data.status?.toUpperCase() || "PENDING";
            set_payment_status(current_status);
            set_payment_id(saved_payment.payment_id);

            // Tratar diferentes status
            // Status possíveis: PENDING, APPROVED, EXPIRED
            if (current_status === "APPROVED") {
              // Pagamento aprovado - limpar dados e redirecionar para sucesso
              clear_pix_payment_data();
              clear_register_session(); // Limpar dados do formulário de registro
              window.location.href = "/success";
              return;
            } else if (current_status === "EXPIRED") {
              // QR Code expirado - limpar dados do pagamento
              clear_pix_payment_data();
              // NÃO limpar dados do formulário aqui - usuário pode gerar novo QR Code
              set_pix_qrcode(null);
              set_pix_code(null);
              set_selected_method(null);
              set_payment_id(null);
              set_payment_status(null);
              return;
            } else if (current_status === "PENDING") {
              // Ainda pendente - restaurar e exibir QR Code automaticamente
              set_pix_code(saved_payment.pix_code);
              set_pix_qrcode(saved_payment.pix_qrcode);

              // Usar expiresAt da API se disponível, senão usar o salvo
              if (status_response.data.expiresAt) {
                set_expires_at(new Date(status_response.data.expiresAt));
              } else {
                set_expires_at(new Date(saved_payment.expires_at));
              }

              set_selected_method("pix");

              // Restaurar dados do formulário do pagamento
              set_name(saved_payment.customer.name);
              set_email(saved_payment.customer.email);
              set_cpf(saved_payment.customer.cpf);
              if (saved_payment.customer.cellphone) {
                // Formatar telefone se existir
                const phone_formatted =
                  saved_payment.customer.cellphone.replace(/\D/g, "");
                if (phone_formatted.length === 11) {
                  set_cellphone(
                    `(${phone_formatted.slice(0, 2)}) ${phone_formatted.slice(
                      2,
                      7
                    )}-${phone_formatted.slice(7)}`
                  );
                } else if (phone_formatted.length === 10) {
                  set_cellphone(
                    `(${phone_formatted.slice(0, 2)}) ${phone_formatted.slice(
                      2,
                      6
                    )}-${phone_formatted.slice(6)}`
                  );
                }
              }
            }
          }
        } catch (error) {
          console.error("Erro ao verificar status do pagamento:", error);

          // Em caso de erro, verificar se ainda não expirou localmente
          if (!is_pix_payment_expired(saved_payment)) {
            // Assumir que ainda está pendente e restaurar
            set_pix_code(saved_payment.pix_code);
            set_pix_qrcode(saved_payment.pix_qrcode);
            set_expires_at(new Date(saved_payment.expires_at));
            set_selected_method("pix");
            set_payment_id(saved_payment.payment_id);
            set_payment_status("PENDING");

            // Restaurar dados do formulário
            set_name(saved_payment.customer.name);
            set_email(saved_payment.customer.email);
            set_cpf(saved_payment.customer.cpf);
            if (saved_payment.customer.cellphone) {
              const phone_formatted = saved_payment.customer.cellphone.replace(
                /\D/g,
                ""
              );
              if (phone_formatted.length === 11) {
                set_cellphone(
                  `(${phone_formatted.slice(0, 2)}) ${phone_formatted.slice(
                    2,
                    7
                  )}-${phone_formatted.slice(7)}`
                );
              } else if (phone_formatted.length === 10) {
                set_cellphone(
                  `(${phone_formatted.slice(0, 2)}) ${phone_formatted.slice(
                    2,
                    6
                  )}-${phone_formatted.slice(6)}`
                );
              }
            }
          } else {
            // Expirou localmente, limpar dados do pagamento
            clear_pix_payment_data();
            set_pix_qrcode(null);
            set_pix_code(null);
            set_selected_method(null);
          }
        }
      }
    };

    load_payment_data();
  }, []);

  useEffect(() => {
    if (expires_at) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const expiry = expires_at.getTime();
        const difference = expiry - now;

        if (difference > 0) {
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          set_time_remaining(
            `${minutes}:${seconds.toString().padStart(2, "0")}`
          );
        } else {
          set_time_remaining("Expirado");
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [expires_at]);

  // Polling para verificar status do pagamento a cada 5 segundos
  useEffect(() => {
    if (!payment_id || !selected_method || selected_method !== "pix") {
      return;
    }

    // Não fazer polling se o status já for diferente de PENDING
    if (payment_status && payment_status !== "PENDING") {
      return;
    }

    const check_payment_status = async () => {
      try {
        const status_response = await getPixQrcodeStatus(payment_id);

        if (status_response.data?.status) {
          const current_status = status_response.data.status.toUpperCase();
          set_payment_status(current_status);

          // Tratar diferentes status
          // Status possíveis: PENDING, APPROVED, EXPIRED
          if (current_status === "APPROVED") {
            // Pagamento aprovado - limpar dados e redirecionar para sucesso
            clear_pix_payment_data();
            clear_register_session(); // Limpar dados do formulário de registro
            window.location.href = "/success";
          } else if (current_status === "EXPIRED") {
            // QR Code expirado - limpar dados do pagamento
            clear_pix_payment_data();
            // NÃO limpar dados do formulário aqui - usuário pode gerar novo QR Code
            set_pix_qrcode(null);
            set_pix_code(null);
            set_selected_method(null);
            set_payment_id(null);
            set_payment_status("EXPIRED");
          }
        }
      } catch (error) {
        console.error("Erro ao verificar status do pagamento:", error);
      }
    };

    // Verificar imediatamente
    check_payment_status();

    // Verificar a cada 5 segundos
    const interval = setInterval(check_payment_status, 5000);

    return () => clearInterval(interval);
  }, [payment_id, payment_status, selected_method]);

  const handle_cpf_change = (value: string) => {
    const formatted = format_cpf(value);
    set_cpf(formatted);
    set_cpf_error("");
  };

  const handle_email_change = (value: string) => {
    set_email(value);
    set_email_error("");
  };

  const handle_phone_change = (value: string) => {
    const formatted = format_phone(value);
    set_cellphone(formatted);
    set_cellphone_error("");
  };

  const validate_form = (): boolean => {
    let is_valid = true;

    if (!name.trim()) {
      set_name_error("Nome é obrigatório");
      is_valid = false;
    }

    if (!email.trim()) {
      set_email_error("Email é obrigatório");
      is_valid = false;
    } else if (!validate_email(email)) {
      set_email_error("Email inválido");
      is_valid = false;
    }

    if (!cellphone.trim()) {
      set_cellphone_error("Telefone é obrigatório");
      is_valid = false;
    } else if (!validate_phone(cellphone)) {
      set_cellphone_error("Telefone inválido");
      is_valid = false;
    }

    if (!cpf.trim()) {
      set_cpf_error("CPF é obrigatório");
      is_valid = false;
    } else if (!validate_cpf(cpf)) {
      set_cpf_error("CPF inválido");
      is_valid = false;
    }

    return is_valid;
  };

  const handle_pix_payment = async () => {
    // Se já está selecionado e com dados válidos, não precisa gerar novamente
    if (selected_method === "pix" && pix_qrcode) {
      // Verificar se o QR Code ainda está válido
      const saved_payment = load_pix_payment_data();
      if (saved_payment && !is_pix_payment_expired(saved_payment)) {
        return; // QR Code ainda válido
      }
      // Se expirou, limpar e gerar novo
      clear_pix_payment_data();
      set_pix_qrcode(null);
      set_pix_code(null);
    }

    // Primeira vez - seleciona o método
    if (selected_method !== "pix") {
      set_selected_method("pix");
      set_pix_qrcode(null);
      set_pix_code(null);
      clear_pix_payment_data(); // Limpar dados antigos ao selecionar novamente
      return;
    }

    // Segunda vez - valida e gera QR Code
    if (!validate_form()) {
      return;
    }

    // Verificar se tem user_id
    if (!user_id) {
      set_email_error(
        "Erro: ID do usuário não encontrado. Por favor, volte e crie seu perfil novamente."
      );
      return;
    }

    set_is_loading(true);
    set_copied(false);

    try {
      const response = await createPixQrcode({
        userId: user_id, // OBRIGATÓRIO - ID retornado ao criar o usuário
        amount: PRODUCT_PRICE, // OBRIGATÓRIO - Valor em centavos
        description: "Treino personalizado",
        expiresIn: 3600, // Opcional - 1 hora
        customer: {
          // OBRIGATÓRIO
          name: name.trim(),
          email: email.trim(), // OBRIGATÓRIO
          cpf: cpf.trim(), // OBRIGATÓRIO (aceita com ou sem formatação)
          cellphone: cellphone.trim() ? unformat_phone(cellphone) : undefined, // Opcional
        },
      });

      if (response.data) {
        // A API retorna brCode (código PIX completo) e brCodeBase64 (imagem do QR Code)
        set_pix_code(response.data.brCode || ""); // Código PIX completo para copiar e colar
        set_pix_qrcode(response.data.brCodeBase64 || ""); // Imagem base64 do QR Code

        // Calcular expiração se não vier expiresAt
        let expiry_date: Date;
        if (response.data.expiresAt) {
          expiry_date = new Date(response.data.expiresAt);
          set_expires_at(expiry_date);
        } else if (response.data.expiresIn) {
          expiry_date = new Date();
          expiry_date.setSeconds(
            expiry_date.getSeconds() + response.data.expiresIn
          );
          set_expires_at(expiry_date);
        } else {
          // Fallback: 1 hora padrão
          expiry_date = new Date();
          expiry_date.setHours(expiry_date.getHours() + 1);
          set_expires_at(expiry_date);
        }

        // Salvar dados do pagamento no localStorage para recuperar após reload
        if (user_id && expiry_date) {
          const payment_id_value = response.data.id;
          set_payment_id(payment_id_value);
          set_payment_status(response.data.status?.toUpperCase() || "PENDING");

          save_pix_payment_data({
            pix_code: response.data.brCode || "",
            pix_qrcode: response.data.brCodeBase64 || "",
            expires_at: expiry_date.toISOString(),
            payment_id: payment_id_value,
            user_id: user_id,
            customer: {
              name: name.trim(),
              email: email.trim(),
              cpf: cpf.trim(),
              cellphone: cellphone.trim()
                ? unformat_phone(cellphone)
                : undefined,
            },
          });
        }
      }
    } catch (error) {
      console.error("Erro ao gerar QR Code PIX:", error);
      set_email_error("Erro ao gerar QR Code PIX. Tente novamente.");
    } finally {
      set_is_loading(false);
    }
  };

  const handle_copy_code = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pix_code) {
      navigator.clipboard.writeText(pix_code);
      set_copied(true);
      setTimeout(() => set_copied(false), 2000);
    }
  };

  const format_price = (cents: number) => {
    return (cents / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Função para renderizar o resumo do pedido (reutilizável)
  const render_order_summary = () => {
    return (
      <>
        <h2 className="text-xl font-bold text-white mb-6">Resumo do Pedido</h2>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-4 pb-4 border-b border-gray-700">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
              <FontAwesomeIcon
                icon={faDumbbell}
                className="text-xl text-cyan-400"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1">
                Plano de Treino Personalizado
              </h3>
              <p className="text-gray-400 text-sm">
                Criado por Inteligência Artificial
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Plano de treino único</span>
              <span className="text-white">Incluído</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Ajustes conforme seu progresso</span>
              <span className="text-white">Incluído</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Suporte via email</span>
              <span className="text-white">Incluído</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-700 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Subtotal</span>
            <span className="text-white font-semibold">
              {format_price(PRODUCT_PRICE)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Taxa</span>
            <span className="text-green-400 font-semibold">Grátis</span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-700">
            <span className="text-xl font-bold text-white">Total</span>
            <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {format_price(PRODUCT_PRICE)}
            </span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-gray-400 text-xs text-center">
            Após a confirmação do pagamento, você receberá seu plano de treino
            personalizado por email em até 24 horas.
          </p>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <HeaderNavigation />
      <div className="py-20 px-4 pt-32 pb-24 lg:pb-16">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10 mb-6">
              <FontAwesomeIcon
                icon={faDumbbell}
                className="text-3xl text-cyan-400"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Finalize sua Compra
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Você está a um passo de transformar seu corpo com um plano de
              treino personalizado criado por inteligência artificial
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Payment Methods */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-cyan-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Método de Pagamento
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card PIX */}
                  <button
                    onClick={handle_pix_payment}
                    disabled={is_loading || selected_method === "pix"}
                    className={`relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 rounded-xl p-6 text-left transition-all ${
                      selected_method === "pix"
                        ? "border-cyan-500 shadow-xl shadow-cyan-500/20 scale-105"
                        : "border-gray-700 hover:border-cyan-500/50 hover:scale-[1.02] cursor-pointer"
                    } ${is_loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                            selected_method === "pix"
                              ? "bg-cyan-500/20"
                              : "bg-gray-700/50"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={faQrcode}
                            className={`text-2xl ${
                              selected_method === "pix"
                                ? "text-cyan-400"
                                : "text-gray-400"
                            }`}
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">PIX</h3>
                          <p className="text-sm text-gray-400">
                            Aprovação instantânea
                          </p>
                        </div>
                      </div>
                      {selected_method === "pix" && (
                        <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-white text-xs"
                          />
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <p className="text-2xl font-black text-white">
                        {format_price(PRODUCT_PRICE)}
                      </p>
                      <p className="text-xs text-gray-400">
                        Sem taxas adicionais
                      </p>
                    </div>
                  </button>

                  {/* Card Cartão de Crédito */}
                  <button
                    disabled
                    className="relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 border-2 border-gray-700 rounded-xl p-6 text-left opacity-60 cursor-not-allowed"
                  >
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-gray-800 text-gray-400 text-xs font-semibold rounded-full">
                        Em breve
                      </span>
                    </div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gray-700/50 flex items-center justify-center">
                          <FontAwesomeIcon
                            icon={faCreditCard}
                            className="text-2xl text-gray-500"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-500">
                            Cartão de Crédito
                          </h3>
                          <p className="text-sm text-gray-500">Em breve</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-2xl font-black text-gray-500">
                        {format_price(PRODUCT_PRICE)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Pagamento recorrente
                      </p>
                    </div>
                  </button>
                </div>

                {/* PIX Payment Details */}
                {selected_method === "pix" && (
                  <div className="mt-8 pt-8 border-t border-gray-700">
                    {!pix_qrcode ? (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-4">
                            Informações para Pagamento
                          </h3>
                          <p className="text-gray-400 text-sm mb-6">
                            Preencha seus dados para gerar o QR Code PIX
                          </p>
                        </div>

                        {/* Campo Nome */}
                        <div>
                          <label className="block text-white text-sm font-semibold mb-2">
                            Nome Completo{" "}
                            <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                              set_name(e.target.value);
                              set_name_error("");
                            }}
                            placeholder="Seu nome completo"
                            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
                              name_error
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-700 focus:border-cyan-500"
                            }`}
                          />
                          {name_error && (
                            <p className="text-red-400 text-xs mt-1">
                              {name_error}
                            </p>
                          )}
                        </div>

                        {/* Campo Email */}
                        <div>
                          <label className="block text-white text-sm font-semibold mb-2">
                            Email <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                              handle_email_change(e.target.value)
                            }
                            placeholder="seu@email.com"
                            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
                              email_error
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-700 focus:border-cyan-500"
                            }`}
                          />
                          {email_error && (
                            <p className="text-red-400 text-xs mt-1">
                              {email_error}
                            </p>
                          )}
                        </div>

                        {/* Campo Telefone */}
                        <div>
                          <label className="block text-white text-sm font-semibold mb-2">
                            Telefone/Celular{" "}
                            <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={cellphone}
                            onChange={(e) =>
                              handle_phone_change(e.target.value)
                            }
                            placeholder="(00) 00000-0000"
                            maxLength={15}
                            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
                              cellphone_error
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-700 focus:border-cyan-500"
                            }`}
                          />
                          {cellphone_error && (
                            <p className="text-red-400 text-xs mt-1">
                              {cellphone_error}
                            </p>
                          )}
                        </div>

                        {/* Campo CPF */}
                        <div>
                          <label className="block text-white text-sm font-semibold mb-2">
                            CPF <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={cpf}
                            onChange={(e) => handle_cpf_change(e.target.value)}
                            placeholder="000.000.000-00"
                            maxLength={14}
                            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
                              cpf_error
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-700 focus:border-cyan-500"
                            }`}
                          />
                          {cpf_error && (
                            <p className="text-red-400 text-xs mt-1">
                              {cpf_error}
                            </p>
                          )}
                        </div>

                        {/* Botão Gerar QR Code */}
                        <button
                          onClick={handle_pix_payment}
                          disabled={is_loading}
                          className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-bold hover:shadow-xl hover:shadow-cyan-500/50 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {is_loading ? (
                            <>
                              <FontAwesomeIcon
                                icon={faSpinner}
                                className="mr-2 animate-spin"
                              />
                              Gerando QR Code...
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon
                                icon={faQrcode}
                                className="mr-2"
                              />
                              Gerar QR Code PIX
                            </>
                          )}
                        </button>
                      </div>
                    ) : is_loading ? (
                      <div className="flex flex-col items-center justify-center py-12">
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="text-5xl text-cyan-400 animate-spin mb-4"
                        />
                        <p className="text-gray-400">Gerando QR Code PIX...</p>
                      </div>
                    ) : pix_qrcode ? (
                      <div className="space-y-6">
                        {time_remaining && (
                          <div className="flex items-center justify-center gap-2 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                            <FontAwesomeIcon
                              icon={faClock}
                              className="text-orange-400"
                            />
                            <p className="text-orange-400 font-semibold text-sm">
                              QR Code expira em:{" "}
                              <span className="font-black">
                                {time_remaining}
                              </span>
                            </p>
                          </div>
                        )}

                        <div className="bg-white p-6 rounded-xl flex items-center justify-center shadow-lg">
                          {pix_qrcode && (
                            <img
                              src={pix_qrcode}
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
                              value={pix_code || ""}
                              readOnly
                              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono"
                              onClick={(e) =>
                                (e.target as HTMLInputElement).select()
                              }
                            />
                            <button
                              onClick={handle_copy_code}
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
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              className="mr-2"
                            />
                            Escaneie o QR Code com o app do seu banco ou copie o
                            código PIX para fazer o pagamento. A aprovação é
                            instantânea!
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              {/* Security Badge */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className="text-2xl text-cyan-400"
                  />
                  <div>
                    <p className="text-white font-semibold">
                      Pagamento 100% Seguro
                    </p>
                    <p className="text-gray-400 text-sm">
                      Seus dados estão protegidos com criptografia de ponta
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Order Summary (Desktop) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-cyan-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm sticky top-32">
                {render_order_summary()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer de Resumo com Swiper (Mobile) - Sempre Visível na Parte Inferior */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 pointer-events-auto">
        <div
          className={`bg-gradient-to-br from-gray-900 to-black border-t border-cyan-500/20 rounded-t-3xl flex flex-col overflow-hidden shadow-2xl ${
            is_summary_expanded
              ? "animate-slideUpExpand"
              : "animate-slideDownCollapse"
          }`}
          style={{
            maxHeight: is_summary_expanded ? "85vh" : "100px",
            transition:
              "max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Header do Drawer - Sempre Visível */}
          <button
            onClick={() => set_is_summary_expanded(!is_summary_expanded)}
            className="flex items-center justify-between p-4 border-b border-gray-700 w-full hover:bg-gray-800/50 transition-colors"
            aria-label={
              is_summary_expanded ? "Recolher resumo" : "Expandir resumo"
            }
          >
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-white">Resumo do Pedido</h2>
              <span className="text-sm text-gray-400">
                {format_price(PRODUCT_PRICE)}
              </span>
            </div>
            <FontAwesomeIcon
              icon={is_summary_expanded ? faChevronDown : faChevronUp}
              className="text-cyan-400 text-xl"
            />
          </button>

          {/* Swiper Container - Visível apenas quando expandido */}
          {is_summary_expanded && (
            <div className="flex-1 overflow-hidden relative animate-fadeIn">
              <Swiper
                onSwiper={set_swiper_instance}
                spaceBetween={0}
                slidesPerView={1}
                className="h-full"
                pagination={{ clickable: true }}
                navigation={{
                  prevEl: ".swiper-button-prev-custom",
                  nextEl: ".swiper-button-next-custom",
                }}
              >
                {/* Slide 1: Produto */}
                <SwiperSlide className="p-6 overflow-y-auto">
                  {render_order_summary()}
                </SwiperSlide>

                {/* Slide 2: Benefícios */}
                <SwiperSlide className="p-6 overflow-y-auto">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white mb-4">
                      O que está incluído
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg">
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="text-cyan-400 mt-1"
                        />
                        <div>
                          <h4 className="text-white font-semibold mb-1">
                            Plano de treino único
                          </h4>
                          <p className="text-gray-400 text-sm">
                            Treino personalizado criado exclusivamente para você
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg">
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="text-cyan-400 mt-1"
                        />
                        <div>
                          <h4 className="text-white font-semibold mb-1">
                            Ajustes conforme seu progresso
                          </h4>
                          <p className="text-gray-400 text-sm">
                            Atualizações automáticas baseadas no seu desempenho
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg">
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="text-cyan-400 mt-1"
                        />
                        <div>
                          <h4 className="text-white font-semibold mb-1">
                            Suporte via email
                          </h4>
                          <p className="text-gray-400 text-sm">
                            Tire suas dúvidas sempre que precisar
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Slide 3: Garantia */}
                <SwiperSlide className="p-6 overflow-y-auto">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Garantia e Segurança
                    </h3>
                    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6">
                      <FontAwesomeIcon
                        icon={faShieldAlt}
                        className="text-4xl text-cyan-400 mb-4"
                      />
                      <h4 className="text-white font-semibold mb-2">
                        Pagamento 100% Seguro
                      </h4>
                      <p className="text-gray-400 text-sm mb-4">
                        Seus dados estão protegidos com criptografia de ponta
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-800/50 rounded-lg">
                        <p className="text-gray-400 text-sm">
                          Após a confirmação do pagamento, você receberá seu
                          plano de treino personalizado por email em até 24
                          horas.
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>

              {/* Navegação Customizada */}
              <button
                className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-800/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
                onClick={() => swiper_instance?.slidePrev()}
                aria-label="Slide anterior"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-800/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
                onClick={() => swiper_instance?.slideNext()}
                aria-label="Próximo slide"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          )}
        </div>
      </div>

      <FooterSection />
    </div>
  );
}
