"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { HeaderNavigation } from "../components/header-navigation/header-navigation";
import { FooterSection } from "../components/footer-section/footer-section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faShieldAlt,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";
import { OrderSummary } from "./components/order-summary";
import { PaymentMethodSelection } from "./components/payment-method-selection";
import { PixPaymentForm } from "./components/pix-payment-form";
import { PixQrCodeDisplay } from "./components/pix-qrcode-display";
import { OrderSummaryDrawer } from "./components/order-summary-drawer";
import {
  createPixQrcode,
  getPixQrcodeStatus,
} from "@/services/payments/pix.service";
import { getPlanById } from "@/services/plans/plan.service";
import { validateCoupon } from "@/services/coupons/coupon.service";
import { Plan } from "@/types/plans/plan.types";
import {
  validate_cpf,
  validate_email,
  validate_phone,
  format_cpf,
  format_phone,
  unformat_phone,
} from "@/utils/validation";
import { load_user_id, clear_register_session } from "@/infrastructure/cookies";

export default function PaymentPage() {
  // ========== CONSTANTES ==========
  const searchParams = useSearchParams();
  const router = useRouter();

  // Estados de pagamento
  const [selected_method, set_selected_method] = useState<
    "pix" | "card" | null
  >(null);
  const [is_loading, set_is_loading] = useState(false);
  const [pix_qrcode, set_pix_qrcode] = useState<string | null>(null);
  const [pix_code, set_pix_code] = useState<string | null>(null);
  const [copied, set_copied] = useState(false);
  const [expires_at, set_expires_at] = useState<Date | null>(null);
  const [time_remaining, set_time_remaining] = useState<string>("");
  const [payment_status, set_payment_status] = useState<string | null>(null);
  const [payment_id, set_payment_id] = useState<string | null>(null);

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

  // Plan e Coupon
  const [plan_id, set_plan_id] = useState<number | null>(null);
  const [plan, set_plan] = useState<Plan | null>(null);
  const [coupon_code, set_coupon_code] = useState<string>("");
  const [coupon_error, set_coupon_error] = useState<string>("");
  const [is_validating_coupon, set_is_validating_coupon] = useState(false);
  const [final_price, set_final_price] = useState<number | null>(null);
  const [discount_amount, set_discount_amount] = useState<number>(0);

  // ========== FUNÇÕES ==========
  // Função para inicializar planId e cupom da query string
  const initialize_plan_and_coupon = () => {
    const planIdParam = searchParams.get("planId");
    const couponParam = searchParams.get("coupon");

    if (planIdParam) {
      const planId = parseInt(planIdParam, 10);
      if (!isNaN(planId)) {
        set_plan_id(planId);
      }
    } else {
      // Se não tem planId, redirecionar para seleção de planos
      router.push("/plans");
      return;
    }

    // Preencher cupom automaticamente se vier na URL
    if (couponParam) {
      set_coupon_code(couponParam);
    }
  };

  // Função para carregar dados do plano
  const load_plan = async () => {
    if (!plan_id) return;

    try {
      const response = await getPlanById(plan_id);
      if (response.data) {
        set_plan(response.data);
        set_final_price(response.data.price);
      }
    } catch (error) {
      console.error("Erro ao carregar plano:", error);
      set_email_error("Erro ao carregar plano. Por favor, tente novamente.");
    }
  };

  // Função para validar cupom
  const validate_coupon_code = async () => {
    if (!coupon_code.trim() || !plan) {
      // Se não tem cupom ou plano, resetar preço
      if (plan) {
        set_final_price(plan.price);
        set_discount_amount(0);
      }
      set_coupon_error("");
      return;
    }

    set_is_validating_coupon(true);
    set_coupon_error("");

    try {
      const response = await validateCoupon({
        code: coupon_code.trim(),
        originalPrice: plan.price,
      });

      if (response.data?.isValid) {
        set_final_price(response.data.finalPrice);
        set_discount_amount(response.data.discountAmount);
        set_coupon_error("");
      } else {
        set_coupon_error(
          response.data?.errorMessage || "Cupom inválido ou expirado"
        );
        set_final_price(plan.price);
        set_discount_amount(0);
      }
    } catch (error) {
      console.error("Erro ao validar cupom:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro ao validar cupom. Tente novamente.";
      set_coupon_error(errorMessage);
      set_final_price(plan.price);
      set_discount_amount(0);
    } finally {
      set_is_validating_coupon(false);
    }
  };

  // Função para carregar dados do pagamento
  const load_payment_data = async () => {
    const saved_user_id = load_user_id();
    if (saved_user_id) {
      set_user_id(saved_user_id);
    }
  };

  // Função para verificar status do pagamento
  const check_payment_status = async () => {
    if (!payment_id) return;

    try {
      const status_response = await getPixQrcodeStatus(payment_id);

      if (status_response.data?.status) {
        const current_status = status_response.data.status.toUpperCase();
        set_payment_status(current_status);

        // Tratar diferentes status
        // Status possíveis: PENDING, APPROVED, PAID, EXPIRED
        if (current_status === "APPROVED" || current_status === "PAID") {
          // Pagamento aprovado - limpar dados e redirecionar para sucesso
          clear_register_session(); // Limpar dados do formulário de registro
          window.location.href = "/success";
        } else if (current_status === "EXPIRED") {
          // QR Code expirado - limpar dados do pagamento
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

  const handle_coupon_change = (value: string) => {
    set_coupon_code(value);
    set_coupon_error("");
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
      return; // QR Code já existe, não precisa gerar novamente
    }

    // Primeira vez - seleciona o método
    if (selected_method !== "pix") {
      set_selected_method("pix");
      set_pix_qrcode(null);
      set_pix_code(null);
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

    // Verificar se tem plan_id
    if (!plan_id) {
      set_email_error(
        "Erro: Plano não selecionado. Por favor, selecione um plano primeiro."
      );
      return;
    }

    // Verificar se o cupom ainda está válido (se fornecido)
    if (coupon_code.trim() && coupon_error) {
      set_coupon_error("Por favor, corrija o cupom antes de continuar.");
      return;
    }

    set_is_loading(true);
    set_copied(false);

    try {
      const response = await createPixQrcode({
        userId: user_id, // OBRIGATÓRIO - ID retornado ao criar o usuário
        planId: plan_id, // OBRIGATÓRIO - ID do plano selecionado
        couponCode: coupon_code.trim() || undefined, // Opcional - Código do cupom
        description: plan?.name || "Treino personalizado",
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

        // Atualizar estados do pagamento
        if (user_id && expiry_date) {
          const payment_id_value = response.data.id;
          set_payment_id(payment_id_value);
          set_payment_status(response.data.status?.toUpperCase() || "PENDING");
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

  const format_price = (price: number | null) => {
    if (price === null) return "R$ 0,00";
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // ========== USEEFFECTS ==========
  // Carregar planId da query string e cupom (se houver)
  useEffect(() => {
    initialize_plan_and_coupon();
  }, [searchParams, router]);

  // Carregar dados do plano
  useEffect(() => {
    load_plan();
  }, [plan_id]);

  // Validar cupom quando o código mudar e houver um plano carregado
  useEffect(() => {
    // Debounce: aguardar 500ms após o usuário parar de digitar
    const timeoutId = setTimeout(validate_coupon_code, 500);
    return () => clearTimeout(timeoutId);
  }, [coupon_code, plan]);

  // Carregar user_id e dados do pagamento PIX ao montar o componente
  useEffect(() => {
    load_payment_data();
  }, []);

  // Timer para exibir tempo restante do QR Code
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

    // Verificar imediatamente
    check_payment_status();

    // Verificar a cada 5 segundos
    const interval = setInterval(check_payment_status, 5000);

    return () => clearInterval(interval);
  }, [payment_id, payment_status, selected_method]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900">
      <HeaderNavigation />
      <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-20 sm:pb-24 md:pb-28">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 md:mb-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
              <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">
                Checkout
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 leading-tight">
              <span className="block text-gray-900">Finalize sua Compra</span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Complete seu pagamento de forma segura e rápida
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content - Payment Methods */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center border border-purple-200">
                    <FontAwesomeIcon
                      icon={faDumbbell}
                      className="text-lg text-purple-600"
                    />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Método de Pagamento
                  </h2>
                </div>

                <PaymentMethodSelection
                  selectedMethod={selected_method}
                  isLoading={is_loading}
                  finalPrice={final_price}
                  onPixClick={handle_pix_payment}
                  formatPrice={format_price}
                />

                {/* PIX Payment Details */}
                {selected_method === "pix" && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    {!pix_qrcode ? (
                      <PixPaymentForm
                        name={name}
                        email={email}
                        cellphone={cellphone}
                        cpf={cpf}
                        couponCode={coupon_code}
                        nameError={name_error}
                        emailError={email_error}
                        cellphoneError={cellphone_error}
                        cpfError={cpf_error}
                        couponError={coupon_error}
                        isValidatingCoupon={is_validating_coupon}
                        discountAmount={discount_amount}
                        isLoading={is_loading}
                        onNameChange={(value) => {
                          set_name(value);
                          set_name_error("");
                        }}
                        onEmailChange={handle_email_change}
                        onPhoneChange={handle_phone_change}
                        onCpfChange={handle_cpf_change}
                        onCouponCodeChange={handle_coupon_change}
                        onGenerateQrCode={handle_pix_payment}
                        formatPrice={format_price}
                      />
                    ) : is_loading ? (
                      <div className="flex flex-col items-center justify-center py-12">
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="text-5xl text-purple-600 animate-spin mb-4"
                        />
                        <p className="text-gray-600">Gerando QR Code PIX...</p>
                      </div>
                    ) : pix_qrcode ? (
                      <PixQrCodeDisplay
                        pixQrcode={pix_qrcode}
                        pixCode={pix_code || ""}
                        timeRemaining={time_remaining}
                        copied={copied}
                        onCopyCode={handle_copy_code}
                      />
                    ) : null}
                  </div>
                )}
              </div>

              {/* Security Badge */}
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl sm:rounded-2xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center border border-purple-200 shrink-0">
                    <FontAwesomeIcon
                      icon={faShieldAlt}
                      className="text-xl text-purple-600"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-bold mb-1.5">
                      Pagamento 100% Seguro
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Seus dados estão protegidos com criptografia de ponta a
                      ponta. Não armazenamos informações sensíveis de pagamento.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Order Summary (Desktop) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-white border-2 border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl sticky top-32">
                <OrderSummary
                  plan={plan}
                  couponCode={coupon_code}
                  discountAmount={discount_amount}
                  finalPrice={final_price}
                  formatPrice={format_price}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer de Resumo com Swiper (Mobile) - Sempre Visível na Parte Inferior */}
      <OrderSummaryDrawer
        plan={plan}
        couponCode={coupon_code}
        discountAmount={discount_amount}
        finalPrice={final_price}
        formatPrice={format_price}
      />

      <FooterSection />
    </div>
  );
}
