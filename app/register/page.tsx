"use client";

import { useState, useEffect, useRef } from "react";
import { StepOne } from "./components/step-one/step-one";
import { StepTwo } from "./components/step-two/step-two";
import { StepThree } from "./components/step-three/step-three";
import { StepFour } from "./components/step-four/step-four";
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

    // Atualizar apenas se houver diferenças para evitar re-renders desnecessários
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
      
      set_form_data((prev) => {
        // Verificar se os dados são diferentes antes de atualizar
        const has_changes =
          prev.name !== migrated_data.name ||
          prev.age !== migrated_data.age ||
          prev.gender !== migrated_data.gender ||
          prev.weight !== migrated_data.weight ||
          prev.height !== migrated_data.height ||
          prev.goal !== migrated_data.goal ||
          prev.availableDays !== migrated_data.availableDays ||
          prev.trainingLocation !== migrated_data.trainingLocation ||
          prev.exercicesPerDay !== migrated_data.exercicesPerDay;
        return has_changes ? migrated_data : prev;
      });
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
  useEffect(() => {
    if (is_initialized_ref.current) {
      save_register_form_data(form_data);
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <HeaderNavigation />
      <div className="flex items-center justify-center py-20 px-4 pt-32">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Crie Seu Perfil
            </h1>
            <p className="text-gray-400 text-lg">{get_step_title()}</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-center mb-4 px-2">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-bold transition-all ${
                      current_step >= step
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                        : "bg-gray-800 text-gray-500 border border-gray-700"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`w-6 md:w-16 h-0.5 md:h-1 mx-1 md:mx-2 transition-all ${
                        current_step > step
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600"
                          : "bg-gray-800"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-cyan-500/20 rounded-2xl p-4 md:p-8 backdrop-blur-sm">
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
      </div>
      <FooterSection />
    </div>
  );
}
