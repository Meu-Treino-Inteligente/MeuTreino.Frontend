"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { GoalType } from "@/types/users/user.types";

interface StepThreeProps {
  form_data: {
    goal: number | null;
    availableDays: number | null;
  };
  update_form_data: (field: string, value: string | number | null) => void;
  next_step: () => void;
  prev_step: () => void;
}

const goals = [
  { value: GoalType.Hipertrofia, label: "Hipertrofia", icon: "💪", color: "from-purple-500 to-pink-500" },
  { value: GoalType.Emagrecimento, label: "Emagrecimento", icon: "🔥", color: "from-orange-500 to-red-500" },
  { value: GoalType.DisfuncaoSexual, label: "Disfunção Sexual", icon: "❤️", color: "from-pink-500 to-purple-500" },
];

export function StepThree({
  form_data,
  update_form_data,
  next_step,
  prev_step,
}: StepThreeProps) {
  const is_valid = form_data.goal !== null && form_data.availableDays !== null;

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Objetivo */}
      <div>
        <label className="block text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base">
          Qual seu objetivo principal?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
          {goals.map((goal) => (
            <button
              key={goal.value}
              onClick={() => update_form_data("goal", goal.value)}
              className={`px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl border-2 transition-all text-xs sm:text-sm font-bold cursor-pointer relative overflow-hidden group ${
                form_data.goal === goal.value
                  ? `border-transparent bg-gradient-to-r ${goal.color} text-white shadow-lg shadow-purple-500/30 scale-105`
                  : "border-gray-700 text-gray-400 hover:border-purple-500/50 hover:bg-gray-800/50"
              }`}
            >
              {form_data.goal === goal.value && (
                <div className="absolute inset-0 bg-white/10" />
              )}
              <span className="relative z-10 flex flex-col items-center gap-2">
                <span className="text-2xl sm:text-3xl">{goal.icon}</span>
                <span>{goal.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Dias por Semana */}
      <div>
        <label className="block text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base">
          Quantos dias por semana você pode treinar?
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {[1, 2, 3, 4, 5, 6].map((day) => (
            <button
              key={day}
              onClick={() => update_form_data("availableDays", day)}
              className={`w-full h-12 sm:h-14 rounded-lg sm:rounded-xl border-2 transition-all text-base sm:text-lg font-black cursor-pointer flex items-center justify-center relative overflow-hidden group ${
                form_data.availableDays === day
                  ? "border-purple-500 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 shadow-lg shadow-purple-500/30 scale-110"
                  : "border-gray-700 text-gray-400 hover:border-purple-500/50 hover:bg-gray-800/50"
              }`}
            >
              {form_data.availableDays === day && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
              )}
              <span className="relative z-10">
              {day}
              </span>
            </button>
          ))}
        </div>
        <p className="text-gray-400 text-sm sm:text-base mt-4 text-center">
          {form_data.availableDays ? (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30">
              <span className="font-semibold text-purple-300">
                {form_data.availableDays}{" "}
                {form_data.availableDays === 1 ? "dia" : "dias"} por semana
              </span>
            </span>
          ) : (
            <span className="text-gray-500">Selecione a quantidade</span>
          )}
        </p>
      </div>

      {/* Botões */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-6 sm:mt-8">
        <button
          onClick={prev_step}
          className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-purple-500/50 text-purple-400 text-sm sm:text-base font-bold hover:bg-purple-500/10 hover:border-purple-400 transition-all cursor-pointer group"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="mr-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform"
          />
          Voltar
        </button>
        <button
          onClick={next_step}
          disabled={!is_valid}
          className={`flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-black transition-all transform relative overflow-hidden group ${
            is_valid
              ? "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 cursor-pointer"
              : "bg-gray-700 text-gray-500 cursor-not-allowed"
          }`}
        >
          {is_valid && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
          Próximo
            <FontAwesomeIcon
              icon={faArrowRight}
              className={`w-4 h-4 transition-transform ${is_valid ? "group-hover:translate-x-1" : ""}`}
            />
          </span>
        </button>
      </div>
    </div>
  );
}
