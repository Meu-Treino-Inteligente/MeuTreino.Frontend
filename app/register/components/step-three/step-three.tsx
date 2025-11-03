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
  { value: GoalType.Hipertrofia, label: "Hipertrofia" },
  { value: GoalType.Emagrecimento, label: "Emagrecimento" },
  { value: GoalType.DisfuncaoSexual, label: "Disfunção Sexual" },
];

export function StepThree({
  form_data,
  update_form_data,
  next_step,
  prev_step,
}: StepThreeProps) {
  const is_valid = form_data.goal !== null && form_data.availableDays !== null;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-white font-semibold mb-4">
          Qual seu objetivo principal?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {goals.map((goal) => (
            <button
              key={goal.value}
              onClick={() => update_form_data("goal", goal.value)}
              className={`px-4 py-3 rounded-lg border-2 transition-all text-sm font-semibold cursor-pointer ${
                form_data.goal === goal.value
                  ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                  : "border-gray-700 text-gray-400 hover:border-cyan-500/50"
              }`}
            >
              {goal.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-white font-semibold mb-4">
          Quantos dias por semana você pode treinar?
        </label>
        <div className="grid grid-cols-3 sm:flex sm:flex-wrap sm:justify-center gap-3 sm:gap-2">
          {[1, 2, 3, 4, 5, 6].map((day) => (
            <button
              key={day}
              onClick={() => update_form_data("availableDays", day)}
              className={`w-full sm:w-14 sm:h-14 h-14 rounded-lg border-2 transition-all text-lg sm:text-base font-bold cursor-pointer flex items-center justify-center ${
                form_data.availableDays === day
                  ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                  : "border-gray-700 text-gray-400 hover:border-cyan-500/50"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
        <p className="text-gray-500 text-sm mt-3 text-center">
          {form_data.availableDays
            ? `${form_data.availableDays} ${
                form_data.availableDays === 1 ? "dia" : "dias"
              } por semana`
            : "Selecione a quantidade"}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-8">
        <button
          onClick={prev_step}
          className="flex-1 px-4 md:px-6 py-3 md:py-4 rounded-full border-2 border-cyan-500 text-cyan-400 text-sm md:text-base font-bold hover:bg-cyan-500/10 transition-all cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 w-4 h-4" />
          Voltar
        </button>
        <button
          onClick={next_step}
          disabled={!is_valid}
          className={`flex-1 px-4 md:px-6 py-3 md:py-4 rounded-full text-sm md:text-base font-bold transition-all transform cursor-pointer ${
            is_valid
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105"
              : "bg-gray-700 text-gray-500 cursor-not-allowed"
          }`}
        >
          Próximo
          <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
