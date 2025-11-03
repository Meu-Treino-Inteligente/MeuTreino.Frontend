"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface StepTwoProps {
  form_data: {
    weight: number | null;
    height: number | null;
  };
  update_form_data: (field: string, value: string | number | null) => void;
  next_step: () => void;
  prev_step: () => void;
}

const MIN_WEIGHT = 30;
const MAX_WEIGHT = 250;
const MIN_HEIGHT = 100;
const MAX_HEIGHT = 230;

export function StepTwo({
  form_data,
  update_form_data,
  next_step,
  prev_step,
}: StepTwoProps) {
  const [weightError, setWeightError] = useState<string>("");
  const [heightError, setHeightError] = useState<string>("");

  const is_weight_valid =
    form_data.weight !== null &&
    form_data.weight >= MIN_WEIGHT &&
    form_data.weight <= MAX_WEIGHT;
  const is_height_valid =
    form_data.height !== null &&
    form_data.height >= MIN_HEIGHT / 100 &&
    form_data.height <= MAX_HEIGHT / 100;

  const is_valid = is_weight_valid && is_height_valid;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-white font-semibold mb-2">Peso (kg)</label>
        <input
          type="text"
          inputMode="decimal"
          value={form_data.weight !== null ? form_data.weight.toString() : ""}
          onChange={(e) => {
            const value = e.target.value;
            // Permite apenas números e um ponto decimal
            const clean_value = value.replace(/[^0-9.]/g, "");
            // Remove múltiplos pontos
            const parts = clean_value.split(".");
            const formatted_value =
              parts.length > 2
                ? parts[0] + "." + parts.slice(1).join("")
                : clean_value;
            // Limita a 6 caracteres (ex: 250.5)
            if (formatted_value.length <= 6) {
              const num_value =
                formatted_value === "" ? null : parseFloat(formatted_value);

              if (num_value === null) {
                update_form_data("weight", null);
                setWeightError("");
              } else if (num_value < MIN_WEIGHT) {
                setWeightError(`Peso mínimo: ${MIN_WEIGHT}kg`);
                update_form_data("weight", num_value);
              } else if (num_value > MAX_WEIGHT) {
                setWeightError(`Peso máximo: ${MAX_WEIGHT}kg`);
                update_form_data("weight", num_value);
              } else {
                update_form_data("weight", num_value);
                setWeightError("");
              }
            }
          }}
          placeholder="Ex: 70.5"
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
            weightError
              ? "border-red-500 focus:border-red-500"
              : "border-cyan-500/20 focus:border-cyan-500"
          }`}
        />
        {weightError && (
          <p className="text-red-500 text-sm mt-1">{weightError}</p>
        )}
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          Altura (cm)
        </label>
        <input
          type="text"
          inputMode="numeric"
          value={
            form_data.height !== null
              ? Math.round(form_data.height * 100).toString()
              : ""
          }
          onChange={(e) => {
            const value = e.target.value;
            // Permite apenas números
            const only_numbers = value.replace(/[^0-9]/g, "");
            // Limita a 3 caracteres
            if (only_numbers.length <= 3) {
              const num_value =
                only_numbers === "" ? null : parseInt(only_numbers);

              if (num_value === null) {
                update_form_data("height", null);
                setHeightError("");
              } else if (num_value < MIN_HEIGHT) {
                setHeightError(`Altura mínima: ${MIN_HEIGHT}cm`);
                update_form_data("height", num_value / 100);
              } else if (num_value > MAX_HEIGHT) {
                setHeightError(`Altura máxima: ${MAX_HEIGHT}cm`);
                update_form_data("height", num_value / 100);
              } else {
                // Converte cm para metros e armazena
                update_form_data("height", num_value / 100);
                setHeightError("");
              }
            }
          }}
          placeholder="Ex: 175"
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
            heightError
              ? "border-red-500 focus:border-red-500"
              : "border-cyan-500/20 focus:border-cyan-500"
          }`}
        />
        {heightError && (
          <p className="text-red-500 text-sm mt-1">{heightError}</p>
        )}
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
          className={`flex-1 px-4 md:px-6 py-3 md:py-4 rounded-full text-sm md:text-base font-bold transition-all transform ${
            is_valid
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105 cursor-pointer"
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
