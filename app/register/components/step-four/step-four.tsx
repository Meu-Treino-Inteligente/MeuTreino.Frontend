"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
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

const locations = [
  { value: "Casa", icon: "🏠", color: "from-purple-500 to-pink-500" },
  { value: "Academia", icon: "🏋️", color: "from-orange-500 to-red-500" },
];

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

      if (created_user?.id) {
        save_user_id(created_user.id);
      }

      router.push("/select-plan");
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
    <div className="space-y-5 sm:space-y-6">
      {/* Local de Treino */}
      <div>
        <label className="block text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base">
          Onde você prefere treinar?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {locations.map((location) => (
            <button
              key={location.value}
              onClick={() => update_form_data("trainingLocation", location.value)}
              disabled={is_loading}
              className={`px-4 sm:px-5 py-3 sm:py-4 rounded-lg sm:rounded-xl border-2 transition-all font-bold text-xs sm:text-sm cursor-pointer relative overflow-hidden group ${
                form_data.trainingLocation === location.value
                  ? `border-transparent bg-gradient-to-r ${location.color} text-white shadow-lg shadow-purple-500/30 scale-105`
                  : "border-gray-700 text-gray-400 hover:border-purple-500/50 hover:bg-gray-800/50"
              } ${is_loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {form_data.trainingLocation === location.value && (
                <div className="absolute inset-0 bg-white/10" />
              )}
              <span className="relative z-10 flex flex-col items-center gap-2">
                <span className="text-3xl sm:text-4xl">{location.icon}</span>
                <span>{location.value}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Exercícios por Treino */}
      <div>
        <label className="block text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base">
          Quantos exercícios por treino você prefere?
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {[3, 4, 5, 6, 7, 8].map((count) => (
            <button
              key={count}
              onClick={() => update_form_data("exercicesPerDay", count)}
              disabled={is_loading}
              className={`w-full h-12 sm:h-14 rounded-lg sm:rounded-xl border-2 transition-all text-base sm:text-lg font-black cursor-pointer flex items-center justify-center relative overflow-hidden group ${
                form_data.exercicesPerDay === count
                  ? "border-purple-500 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 shadow-lg shadow-purple-500/30 scale-110"
                  : "border-gray-700 text-gray-400 hover:border-purple-500/50 hover:bg-gray-800/50"
              } ${is_loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {form_data.exercicesPerDay === count && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
              )}
              <span className="relative z-10">
                {count}
              </span>
            </button>
          ))}
        </div>
        <p className="text-gray-400 text-sm sm:text-base mt-4 text-center">
          {form_data.exercicesPerDay ? (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30">
              <span className="font-semibold text-purple-300">
                {form_data.exercicesPerDay}{" "}
                {form_data.exercicesPerDay === 1 ? "exercício" : "exercícios"} por treino
              </span>
            </span>
          ) : (
            <span className="text-gray-500">Selecione a quantidade</span>
          )}
        </p>
      </div>

      {/* Erro */}
      {error && (
        <div className="p-4 bg-red-500/10 border-2 border-red-500/50 rounded-xl text-red-400 flex items-center gap-3">
          <span className="text-xl">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Botões */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-6 sm:mt-8">
        <button
          onClick={prev_step}
          disabled={is_loading}
          className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-purple-500/50 text-purple-400 text-sm sm:text-base font-bold hover:bg-purple-500/10 hover:border-purple-400 transition-all disabled:opacity-50 cursor-pointer group"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="mr-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform"
          />
          Voltar
        </button>
        <button
          onClick={handle_submit}
          disabled={!is_valid || is_loading}
          className={`flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-black transition-all transform relative overflow-hidden group ${
            is_valid && !is_loading
              ? "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 cursor-pointer"
              : "bg-gray-700 text-gray-500 cursor-not-allowed"
          }`}
        >
          {is_valid && !is_loading && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {is_loading ? (
              <>
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="mr-2 w-4 h-4 animate-spin"
                />
                Enviando...
              </>
            ) : (
              <>Enviar informações</>
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
