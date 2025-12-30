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
    <div className="space-y-4">
      {/* Nome Completo */}
      <div>
        <label className="block text-gray-900 font-semibold mb-1.5 text-sm">
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
            className={`w-full px-3 py-2.5 bg-gray-50 border-2 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none transition-all text-sm ${
              form_data.name && !is_name_valid
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                : "border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            }`}
          />
        </div>
        {form_data.name &&
          form_data.name
            .trim()
            .split(/\s+/)
            .filter((n) => n.length > 0).length < 2 && (
            <p className="text-red-500 text-xs mt-1">
              Digite nome e sobrenome
            </p>
          )}
      </div>

      {/* Idade */}
      <div>
        <label className="block text-gray-900 font-semibold mb-1.5 text-sm">
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
            className={`w-full px-3 py-2.5 bg-gray-50 border-2 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none transition-all text-sm ${
              form_data.age && !is_age_valid
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                : "border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            }`}
          />
        </div>
        {form_data.age && form_data.age < MIN_AGE && (
          <p className="text-red-500 text-xs mt-1">
            Idade mínima: {MIN_AGE} anos
          </p>
        )}
        {form_data.age && form_data.age > MAX_AGE && (
          <p className="text-red-500 text-xs mt-1">
            Idade máxima: {MAX_AGE} anos
          </p>
        )}
      </div>

      {/* Gênero */}
      <div>
        <label className="block text-gray-900 font-semibold mb-1.5 text-sm">
          Gênero
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {["Masculino", "Feminino", "Outro"].map((gender) => (
            <button
              key={gender}
              onClick={() => update_form_data("gender", gender)}
              className={`px-4 py-2.5 rounded-lg border-2 transition-all font-semibold text-xs cursor-pointer ${
                form_data.gender === gender
                  ? "border-purple-500 bg-purple-50 text-purple-700 shadow-md"
                  : "border-gray-200 text-gray-600 hover:border-purple-300 hover:bg-gray-50"
              }`}
            >
              {gender}
            </button>
          ))}
        </div>
      </div>

      {/* Botão Próximo */}
      <button
        onClick={next_step}
        disabled={!is_valid}
        className={`w-full mt-6 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all transform relative overflow-hidden group ${
          is_valid
            ? "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white hover:shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        {is_valid && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
        <span className="relative z-10 flex items-center justify-center gap-2">
        Próximo Passo
          <FontAwesomeIcon
            icon={faArrowRight}
            className={`w-3 h-3 transition-transform ${is_valid ? "group-hover:translate-x-1" : ""}`}
          />
        </span>
      </button>
    </div>
  );
}
