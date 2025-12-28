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
    <div className="space-y-5 sm:space-y-6">
      {/* Peso */}
      <div>
        <label className="block text-white font-bold mb-2 sm:mb-3 text-sm sm:text-base">
          Peso (kg)
        </label>
        <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          value={form_data.weight !== null ? form_data.weight.toString() : ""}
          onChange={(e) => {
            const value = e.target.value;
            const clean_value = value.replace(/[^0-9.]/g, "");
            const parts = clean_value.split(".");
            const formatted_value =
              parts.length > 2
                ? parts[0] + "." + parts.slice(1).join("")
                : clean_value;
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
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800/50 border-2 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all text-sm sm:text-base ${
            weightError
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : is_weight_valid
                ? "border-green-500/50 focus:border-green-500 focus:ring-green-500/20"
                : "border-purple-500/20 focus:border-purple-500 focus:ring-purple-500/20"
          }`}
        />
          {form_data.weight && !is_weight_valid && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <span className="text-red-400 text-xl">✗</span>
            </div>
          )}
        </div>
        {weightError && (
          <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
            <span>⚠️</span> {weightError}
          </p>
        )}
      </div>

      {/* Altura */}
      <div>
        <label className="block text-white font-bold mb-2 sm:mb-3 text-sm sm:text-base">
          Altura (cm)
        </label>
        <div className="relative">
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
            const only_numbers = value.replace(/[^0-9]/g, "");
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
                update_form_data("height", num_value / 100);
                setHeightError("");
              }
            }
          }}
          placeholder="Ex: 175"
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800/50 border-2 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all text-sm sm:text-base ${
            heightError
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : is_height_valid
                ? "border-green-500/50 focus:border-green-500 focus:ring-green-500/20"
                : "border-purple-500/20 focus:border-purple-500 focus:ring-purple-500/20"
          }`}
        />
          {form_data.height && !is_height_valid && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <span className="text-red-400 text-xl">✗</span>
            </div>
          )}
        </div>
        {heightError && (
          <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
            <span>⚠️</span> {heightError}
          </p>
        )}
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
