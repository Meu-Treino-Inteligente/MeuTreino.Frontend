"use client";

import { useState, useEffect, useRef } from "react";
import { StepOne } from "./components/step-one/step-one";
import { StepTwo } from "./components/step-two/step-two";
import { StepThree } from "./components/step-three/step-three";
import { StepFour } from "./components/step-four/step-four";
import { TrainingPreview } from "./components/training-preview/training-preview";
import { HeaderNavigation } from "../components/header-navigation/header-navigation";
import { FooterSection } from "../components/footer-section/footer-section";
import {
  save_register_form_data,
  load_register_form_data,
  save_register_current_step,
  load_register_current_step,
} from "@/infrastructure/cookies";
import RegisterLoading from "./loading";

interface UserFormData {
  name: string;
  age: number | null;
  gender: string;
  weight: number | null;
  height: number | null;
  goal: number | null;
  availableDays: number | null;
  trainingLocation: string;
  exercicesPerDay: number | null;
}

export default function RegisterPage() {
  // Inicializar sempre com valores padrão para evitar erros de hidratação
  const [current_step, set_current_step] = useState(1);
  const [form_data, set_form_data] = useState<UserFormData>({
    name: "",
    age: null,
    gender: "",
    weight: null,
    height: null,
    goal: null,
    availableDays: null,
    trainingLocation: "",
    exercicesPerDay: null,
  });
  const [is_loading, set_is_loading] = useState(true);
  const is_initialized_ref = useRef(false);

  // Carregar dados salvos apenas no cliente após montagem
  // Este effect é necessário para evitar erros de hidratação (SSR vs Client mismatch)
  useEffect(() => {
    const saved_form_data = load_register_form_data();
    const saved_step = load_register_current_step();

    // Carregar dados salvos do localStorage
    if (saved_form_data) {
      // Migração: converter goal de string para number se necessário
      const migrated_data: UserFormData = {
        ...saved_form_data,
        goal:
          typeof saved_form_data.goal === "string"
            ? saved_form_data.goal === "Hipertrofia"
              ? 1
              : saved_form_data.goal === "Emagrecimento"
              ? 2
              : saved_form_data.goal === "Disfunção Sexual" ||
                saved_form_data.goal === "Disfunção Erétil"
              ? 3
              : null
            : saved_form_data.goal,
      };

      set_form_data(migrated_data);
    }
    if (
      saved_step &&
      saved_step >= 1 &&
      saved_step <= 4 &&
      saved_step !== current_step
    ) {
      set_current_step(saved_step);
    }
    is_initialized_ref.current = true;
    // Pequeno delay para garantir que a UI não mude repentinamente
    setTimeout(() => {
      set_is_loading(false);
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Salvar form_data sempre que mudar (após inicialização)
  // Mas não salvar se os dados estiverem vazios (para evitar sobrescrever dados válidos)
  useEffect(() => {
    if (is_initialized_ref.current) {
      // Verificar se há pelo menos um campo preenchido antes de salvar
      // Isso evita sobrescrever dados válidos salvos com dados vazios
      const has_data =
        form_data.name.trim() !== "" ||
        form_data.age !== null ||
        form_data.gender.trim() !== "" ||
        form_data.weight !== null ||
        form_data.height !== null ||
        form_data.goal !== null ||
        form_data.availableDays !== null ||
        form_data.trainingLocation.trim() !== "" ||
        form_data.exercicesPerDay !== null;

      if (has_data) {
        save_register_form_data(form_data);
      }
    }
  }, [form_data]);

  // Salvar current_step sempre que mudar (após inicialização)
  useEffect(() => {
    if (is_initialized_ref.current) {
      save_register_current_step(current_step);
    }
  }, [current_step]);

  const update_form_data = (field: string, value: string | number | null) => {
    set_form_data((prev) => ({
      ...prev,
      [field as keyof UserFormData]: value,
    }));
  };

  const next_step = () => {
    if (current_step < 4) {
      set_current_step(current_step + 1);
    }
  };

  const prev_step = () => {
    if (current_step > 1) {
      set_current_step(current_step - 1);
    }
  };

  const get_step_title = () => {
    switch (current_step) {
      case 1:
        return "Informações Básicas";
      case 2:
        return "Dados Físicos";
      case 3:
        return "Seus Objetivos";
      case 4:
        return "Local de Treino";
      default:
        return "";
    }
  };

  if (is_loading) {
    return <RegisterLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900">
      <HeaderNavigation />
      <div className="container mx-auto px-4 pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16">
        {/* Mobile: Stacked Layout */}
        <div className="lg:hidden space-y-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-black mb-2 text-gray-900">
              Crie Seu Perfil
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">{get_step_title()}</p>
          </div>

          {/* Progress Indicator Mobile */}
          <div className="mb-6">
            <div className="flex items-center justify-center mb-3 px-2">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className="relative">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-black transition-all duration-300 relative z-10 ${
                        current_step >= step
                          ? "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white shadow-lg shadow-purple-500/50 scale-105"
                          : "bg-gray-200 text-gray-400 border-2 border-gray-300"
                      }`}
                    >
                      {current_step > step ? (
                        <span className="text-white text-xs">✓</span>
                      ) : (
                        step
                      )}
                    </div>
                    {current_step === step && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-full blur-xl opacity-50 animate-pulse" />
                    )}
                  </div>
                  {step < 4 && (
                    <div className="relative mx-1.5 sm:mx-2">
                      <div className="w-6 sm:w-8 h-0.5 sm:h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            current_step > step
                              ? "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 w-full"
                              : "w-0"
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <div className="inline-block px-3 py-1.5 rounded-full border border-purple-200 bg-purple-50">
                <span className="text-purple-700 text-xs sm:text-sm font-semibold">
                  Passo {current_step} de 4
                </span>
              </div>
            </div>
          </div>

          {/* Steps Card Mobile */}
          <div className="bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-xl">
            {current_step === 1 && (
              <StepOne
                form_data={form_data}
                update_form_data={update_form_data}
                next_step={next_step}
              />
            )}
            {current_step === 2 && (
              <StepTwo
                form_data={form_data}
                update_form_data={update_form_data}
                next_step={next_step}
                prev_step={prev_step}
              />
            )}
            {current_step === 3 && (
              <StepThree
                form_data={form_data}
                update_form_data={update_form_data}
                next_step={next_step}
                prev_step={prev_step}
              />
            )}
            {current_step === 4 && (
              <StepFour
                form_data={form_data}
                update_form_data={update_form_data}
                prev_step={prev_step}
              />
            )}
          </div>

          {/* Preview Mobile */}
          <div className="lg:hidden">
            <TrainingPreview form_data={form_data} />
          </div>
        </div>

        {/* Desktop: 50/50 Split Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6 lg:items-start">
          {/* Left: Steps */}
          <div className="sticky top-24">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-black mb-2 text-gray-900">
              Crie Seu Perfil
            </h1>
              <p className="text-gray-600 text-base">{get_step_title()}</p>
          </div>

            {/* Progress Indicator Desktop */}
            <div className="mb-6">
              <div className="flex items-center justify-center mb-3 px-2">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                    <div className="relative">
                  <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300 relative z-10 ${
                      current_step >= step
                            ? "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white shadow-lg shadow-purple-500/50 scale-105"
                            : "bg-gray-200 text-gray-400 border-2 border-gray-300"
                    }`}
                  >
                        {current_step > step ? (
                          <span className="text-white text-xs">✓</span>
                        ) : (
                          step
                        )}
                      </div>
                      {current_step === step && (
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-full blur-xl opacity-50 animate-pulse" />
                      )}
                  </div>
                  {step < 4 && (
                      <div className="relative mx-2">
                        <div className="w-10 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                            className={`h-full transition-all duration-500 ${
                        current_step > step
                                ? "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 w-full"
                                : "w-0"
                      }`}
                    />
                        </div>
                      </div>
                  )}
                </div>
              ))}
            </div>
              <div className="text-center">
                <div className="inline-block px-3 py-1.5 rounded-full border border-purple-200 bg-purple-50">
                  <span className="text-purple-700 text-sm font-semibold">
                    Passo {current_step} de 4
                  </span>
                </div>
              </div>
          </div>

            {/* Steps Card Desktop */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-xl">
            {current_step === 1 && (
              <StepOne
                form_data={form_data}
                update_form_data={update_form_data}
                next_step={next_step}
              />
            )}
            {current_step === 2 && (
              <StepTwo
                form_data={form_data}
                update_form_data={update_form_data}
                next_step={next_step}
                prev_step={prev_step}
              />
            )}
            {current_step === 3 && (
              <StepThree
                form_data={form_data}
                update_form_data={update_form_data}
                next_step={next_step}
                prev_step={prev_step}
              />
            )}
            {current_step === 4 && (
              <StepFour
                form_data={form_data}
                update_form_data={update_form_data}
                prev_step={prev_step}
              />
            )}
            </div>
          </div>

          {/* Right: Preview Desktop */}
          <div className="sticky top-24">
            <TrainingPreview form_data={form_data} />
          </div>
        </div>
      </div>
      
      <FooterSection />
    </div>
  );
}
