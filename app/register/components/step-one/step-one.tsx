"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface StepOneProps {
  form_data: {
    name: string;
    age: number | null;
    gender: string;
  };
  update_form_data: (field: string, value: string | number | null) => void;
  next_step: () => void;
}

export function StepOne({
  form_data,
  update_form_data,
  next_step,
}: StepOneProps) {
  const MIN_AGE = 14;
  const MAX_AGE = 100;

  const name_parts = form_data.name
    .trim()
    .split(/\s+/)
    .filter((n) => n.length > 0);

  const is_name_valid = name_parts.length >= 2;
  const is_age_valid =
    form_data.age !== null &&
    form_data.age >= MIN_AGE &&
    form_data.age <= MAX_AGE;
  const is_gender_valid = form_data.gender !== "";

  const is_valid = is_name_valid && is_age_valid && is_gender_valid;

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Nome Completo */}
      <div>
        <label className="block text-white font-bold mb-2 sm:mb-3 text-sm sm:text-base">
          Nome Completo
        </label>
        <div className="relative">
          <input
            type="text"
            value={form_data.name}
            onChange={(e) => {
              const value = e.target.value;
              const only_letters = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
              update_form_data("name", only_letters);
            }}
            placeholder="Digite seu nome e sobrenome"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800/50 border-2 border-purple-500/20 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base"
          />
          {form_data.name && !is_name_valid && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <span className="text-orange-400 text-xl">!</span>
            </div>
          )}
        </div>
        {form_data.name &&
          form_data.name
            .trim()
            .split(/\s+/)
            .filter((n) => n.length > 0).length < 2 && (
            <p className="text-orange-400 text-sm mt-2 flex items-center gap-2">
              <span>⚠️</span> Digite nome e sobrenome
            </p>
          )}
      </div>

      {/* Idade */}
      <div>
        <label className="block text-white font-bold mb-2 sm:mb-3 text-sm sm:text-base">
          Idade
        </label>
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            value={form_data.age || ""}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 2) {
                const num_value = value ? parseInt(value) : null;
                if (num_value === null) {
                  update_form_data("age", null);
                } else {
                  update_form_data("age", num_value);
                }
              }
            }}
            placeholder="Sua idade"
            maxLength={2}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-800/50 border-2 border-purple-500/20 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base"
          />
          {form_data.age && !is_age_valid && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <span className="text-red-400 text-xl">✗</span>
            </div>
          )}
        </div>
        {form_data.age && form_data.age < MIN_AGE && (
          <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
            <span>⚠️</span> Idade mínima: {MIN_AGE} anos
          </p>
        )}
        {form_data.age && form_data.age > MAX_AGE && (
          <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
            <span>⚠️</span> Idade máxima: {MAX_AGE} anos
          </p>
        )}
      </div>

      {/* Gênero */}
      <div>
        <label className="block text-white font-bold mb-2 sm:mb-3 text-sm sm:text-base">
          Gênero
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
          {["Masculino", "Feminino", "Outro"].map((gender) => (
            <button
              key={gender}
              onClick={() => update_form_data("gender", gender)}
              className={`px-4 sm:px-5 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border-2 transition-all font-bold text-xs sm:text-sm cursor-pointer relative overflow-hidden group ${
                form_data.gender === gender
                  ? "border-purple-500 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 shadow-lg shadow-purple-500/30 scale-105"
                  : "border-gray-700 text-gray-400 hover:border-purple-500/50 hover:bg-gray-800/50"
              }`}
            >
              {form_data.gender === gender && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                {gender}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Botão Próximo */}
      <button
        onClick={next_step}
        disabled={!is_valid}
        className={`w-full mt-6 sm:mt-8 px-5 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl font-black text-sm sm:text-base transition-all transform relative overflow-hidden group ${
          is_valid
            ? "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 cursor-pointer"
            : "bg-gray-700 text-gray-500 cursor-not-allowed"
        }`}
      >
        {is_valid && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
        <span className="relative z-10 flex items-center justify-center gap-3">
          Próximo Passo
          <FontAwesomeIcon
            icon={faArrowRight}
            className={`w-4 h-4 transition-transform ${is_valid ? "group-hover:translate-x-1" : ""}`}
          />
        </span>
      </button>
    </div>
  );
}
