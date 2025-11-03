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
    <div className="space-y-6">
      <div>
        <label className="block text-white font-semibold mb-2">
          Nome Completo
        </label>
        <input
          type="text"
          value={form_data.name}
          onChange={(e) => {
            const value = e.target.value;
            const only_letters = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
            update_form_data("name", only_letters);
          }}
          placeholder="Digite seu nome e sobrenome"
          className="w-full px-4 py-3 bg-gray-800 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
        />
        {form_data.name &&
          form_data.name
            .trim()
            .split(/\s+/)
            .filter((n) => n.length > 0).length < 2 && (
            <p className="text-orange-400 text-sm mt-1">
              Digite nome e sobrenome
            </p>
          )}
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">Idade</label>
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
              } else if (num_value < MIN_AGE) {
                update_form_data("age", num_value);
              } else if (num_value > MAX_AGE) {
                update_form_data("age", num_value);
              } else {
                update_form_data("age", num_value);
              }
            }
          }}
          placeholder="Sua idade"
          maxLength={2}
          className="w-full px-4 py-3 bg-gray-800 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
        />
        {form_data.age && form_data.age < MIN_AGE && (
          <p className="text-orange-400 text-sm mt-1">
            Idade mínima: {MIN_AGE} anos
          </p>
        )}
        {form_data.age && form_data.age > MAX_AGE && (
          <p className="text-orange-400 text-sm mt-1">
            Idade máxima: {MAX_AGE} anos
          </p>
        )}
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">Gênero</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Masculino", "Feminino", "Outro"].map((gender) => (
            <button
              key={gender}
              onClick={() => update_form_data("gender", gender)}
              className={`px-6 py-4 rounded-lg border-2 transition-all font-semibold cursor-pointer ${
                form_data.gender === gender
                  ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                  : "border-gray-700 text-gray-400 hover:border-cyan-500/50"
              }`}
            >
              {gender}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={next_step}
        disabled={!is_valid}
        className={`w-full mt-8 px-4 md:px-6 py-3 md:py-4 rounded-full font-bold text-base md:text-lg transition-all transform ${
          is_valid
            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105 cursor-pointer"
            : "bg-gray-700 text-gray-500 cursor-not-allowed"
        }`}
      >
        Próximo Passo
        <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-4 h-4" />
      </button>
    </div>
  );
}
