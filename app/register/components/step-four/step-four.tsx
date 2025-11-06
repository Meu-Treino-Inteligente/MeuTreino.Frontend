"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheck,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { createUser } from "@/services/users/user.service";
import { useRouter } from "next/navigation";
import { save_user_id } from "@/infrastructure/cookies";

interface StepFourProps {
  form_data: {
    name: string;
    age: number | null;
    gender: string;
    weight: number | null;
    height: number | null;
    goal: number | null;
    availableDays: number | null;
    trainingLocation: string;
    exercicesPerDay: number | null;
  };
  update_form_data: (field: string, value: string | number | null) => void;
  prev_step: () => void;
}

const locations = ["Casa", "Academia"];

export function StepFour({
  form_data,
  update_form_data,
  prev_step,
}: StepFourProps) {
  const [is_loading, set_is_loading] = useState(false);
  const [error, set_error] = useState<string | null>(null);
  const router = useRouter();

  const is_valid =
    form_data.trainingLocation !== "" && form_data.exercicesPerDay !== null;

  const handle_submit = async () => {
    if (!is_valid) return;

    set_is_loading(true);
    set_error(null);

    try {
      const user_data = {
        name: form_data.name,
        age: form_data.age!,
        gender: form_data.gender,
        weight: form_data.weight!,
        height: form_data.height!,
        goal: form_data.goal!,
        availableDays: form_data.availableDays!,
        trainingLocation: form_data.trainingLocation,
        exercicesPerDay: form_data.exercicesPerDay!,
      };

      const created_user = await createUser(user_data);

      // Guardar o ID do usuário criado para usar no pagamento
      if (created_user?.id) {
        save_user_id(created_user.id);
      }

      router.push("/plans");
    } catch (err) {
      const error_message =
        err instanceof Error
          ? err.message
          : "Erro ao criar perfil. Tente novamente.";
      set_error(error_message);
      set_is_loading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-white font-semibold mb-4">
          Onde você prefere treinar?
        </label>
        <div className="grid grid-cols-2 gap-4">
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => update_form_data("trainingLocation", location)}
              disabled={is_loading}
              className={`px-6 py-4 rounded-lg border-2 transition-all font-semibold cursor-pointer ${
                form_data.trainingLocation === location
                  ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                  : "border-gray-700 text-gray-400 hover:border-cyan-500/50"
              } ${is_loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {location}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-white font-semibold mb-4">
          Quantos exercícios por treino você prefere?
        </label>
        <div className="grid grid-cols-3 sm:flex sm:flex-wrap sm:justify-center gap-3 sm:gap-2">
          {[3, 4, 5, 6, 7, 8].map((count) => (
            <button
              key={count}
              onClick={() => update_form_data("exercicesPerDay", count)}
              disabled={is_loading}
              className={`w-full sm:w-14 sm:h-14 h-14 rounded-lg border-2 transition-all text-lg sm:text-base font-bold cursor-pointer flex items-center justify-center ${
                form_data.exercicesPerDay === count
                  ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                  : "border-gray-700 text-gray-400 hover:border-cyan-500/50"
              } ${is_loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {count}
            </button>
          ))}
        </div>
        <p className="text-gray-500 text-sm mt-3 text-center">
          {form_data.exercicesPerDay
            ? `${form_data.exercicesPerDay} ${
                form_data.exercicesPerDay === 1 ? "exercício" : "exercícios"
              } por treino`
            : "Selecione a quantidade"}
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-8">
        <button
          onClick={prev_step}
          disabled={is_loading}
          className="flex-1 px-4 md:px-6 py-3 md:py-4 rounded-full border-2 border-cyan-500 text-cyan-400 text-sm md:text-base font-bold hover:bg-cyan-500/10 transition-all disabled:opacity-50 cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 w-4 h-4" />
          Voltar
        </button>
        <button
          onClick={handle_submit}
          disabled={!is_valid || is_loading}
          className={`flex-1 px-4 md:px-6 py-3 md:py-4 rounded-full text-sm md:text-base font-bold transition-all transform cursor-pointer ${
            is_valid && !is_loading
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105"
              : "bg-gray-700 text-gray-500 cursor-not-allowed"
          }`}
        >
          {is_loading ? (
            <>
              <FontAwesomeIcon
                icon={faSpinner}
                className="mr-2 w-4 h-4 animate-spin"
              />
              Enviando...
            </>
          ) : (
            <>
              Enviar informações
              <FontAwesomeIcon icon={faCheck} className="ml-2 w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
