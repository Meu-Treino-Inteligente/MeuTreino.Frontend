"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faClock,
  faCalendarWeek,
  faCheckCircle,
  faEye,
  faEyeSlash,
  faLightbulb,
  faUtensils,
  faChartLine,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

interface TrainingPreviewProps {
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
}

const dayNames = {
  monday: "Segunda-feira",
  tuesday: "Terça-feira",
  wednesday: "Quarta-feira",
  thursday: "Quinta-feira",
  friday: "Sexta-feira",
  saturday: "Sábado",
  sunday: "Domingo",
};

const dayNamesShort = {
  monday: "Seg",
  tuesday: "Ter",
  wednesday: "Qua",
  thursday: "Qui",
  friday: "Sex",
  saturday: "Sáb",
  sunday: "Dom",
};

const goalNames: Record<number, string> = {
  1: "Hipertrofia",
  2: "Emagrecimento",
  3: "Disfunção Sexual",
};

export function TrainingPreview({ form_data }: TrainingPreviewProps) {
  const [showSensitiveGoal, setShowSensitiveGoal] = useState(false);
  const hasBasicInfo = form_data.name && form_data.age && form_data.gender;
  const hasPhysicalData = form_data.weight && form_data.height;
  const hasGoal = form_data.goal !== null && form_data.availableDays !== null;
  const hasLocation = form_data.trainingLocation && form_data.exercicesPerDay;
  const isSensitiveGoal = form_data.goal === 3; // Disfunção Sexual

  // Gerar preview de dias baseado nos dados
  const generatePreviewDays = () => {
    if (!form_data.availableDays) return [];

    const days = Object.keys(dayNames).slice(0, form_data.availableDays);
    return days.map((day) => ({
      day: day as keyof typeof dayNames,
      isRest: false,
    }));
  };

  const previewDays = generatePreviewDays();
  const restDays = form_data.availableDays ? 7 - form_data.availableDays : 0;

  return (
    <div className="w-full h-[600px] lg:h-[calc(100vh-8rem)] flex items-center justify-center">
      {/* Phone Frame - iPhone 17 Style */}
      <div className="relative w-full max-w-[390px] h-full max-h-[844px] bg-gradient-to-b from-gray-900 via-gray-950 to-black rounded-[3rem] p-1 shadow-2xl border-2 border-gray-800/60">
        {/* Dynamic Island - iPhone 17 Style */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-36 h-9 bg-black rounded-full z-30 flex items-center justify-between px-5 shadow-lg border border-gray-800/50">
          {/* Left side - Camera and sensors */}
          <div className="flex items-center gap-2">
            {/* Front Camera */}
            <div className="w-2.5 h-2.5 rounded-full bg-gray-900 border border-gray-700/50 relative">
              <div className="absolute inset-0.5 rounded-full bg-gray-950"></div>
            </div>
            {/* Face ID Dot Projector */}
            <div className="w-1 h-1 rounded-full bg-gray-800"></div>
          </div>

          {/* Center - Speaker grille */}
          <div className="flex-1 flex justify-center">
            <div className="w-16 h-1.5 bg-gradient-to-r from-transparent via-gray-900 to-transparent rounded-full"></div>
          </div>

          {/* Right side - Ambient light sensor */}
          <div className="w-1.5 h-1.5 rounded-full bg-gray-900 border border-gray-700/30"></div>
        </div>

        {/* Status Bar - Around Dynamic Island (moved down) */}
        <div className="absolute top-6 left-0 right-0 px-6 flex justify-between items-center z-20 pointer-events-none">
          <span className="text-white text-[10px] font-semibold ml-2">
            9:41
          </span>
          <div className="flex items-center gap-1.5 mr-2">
            {/* Signal bars */}
            <div className="flex items-end gap-0.5">
              <div className="w-1 h-1 bg-white/90 rounded-sm"></div>
              <div className="w-1 h-1.5 bg-white/90 rounded-sm"></div>
              <div className="w-1 h-2 bg-white/90 rounded-sm"></div>
              <div className="w-1 h-2.5 bg-white/90 rounded-sm"></div>
            </div>
            {/* WiFi */}
            <div className="w-4 h-3 relative">
              <div className="absolute bottom-0 left-0 w-3 h-2 border border-white/90 rounded-t-sm border-b-0"></div>
              <div className="absolute bottom-0.5 left-0.5 w-2 h-1.5 border border-white/90 rounded-t-sm border-b-0"></div>
            </div>
            {/* Battery */}
            <div className="w-5 h-2.5 relative">
              <div className="absolute inset-0 border border-white/90 rounded-sm"></div>
              <div className="absolute top-0.5 left-0.5 w-3.5 h-1.5 bg-white/90 rounded-sm"></div>
              <div className="absolute right-0 top-0.5 w-0.5 h-1.5 bg-white/90 rounded-r-sm"></div>
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="w-full h-full bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-[2.75rem] overflow-hidden relative">
          {/* Scrollable Content - Hidden Scrollbar */}
          <div className="h-full overflow-y-auto pb-6 scrollbar-hide">
            {/* Header Section */}
            <div className="pt-12 pb-4 px-4 text-center border-b border-gray-200">
              <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-purple-200 bg-purple-50 text-purple-700 mb-3">
                <span className="inline-block h-1 w-1 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-[10px]">Plano Personalizado por IA</span>
              </div>
              <h1 className="text-lg font-black mb-2 leading-tight">
                <span className="block text-gray-900 text-sm">
                  Seu Plano de
                </span>
                <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent text-base">
                  Treino Inteligente
                </span>
              </h1>
              {hasBasicInfo && (
                <p className="text-gray-600 text-xs mt-2">
                  Criado exclusivamente para {form_data.name.split(" ")[0]}
                </p>
              )}

              {/* Download PDF Button */}
              {hasBasicInfo && (
                <div className="mt-3 flex justify-center">
                  <button
                    disabled
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-lg text-white font-semibold text-[10px] opacity-80 cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={faDownload}
                      className="text-[10px]"
                    />
                    Baixar PDF
                  </button>
                </div>
              )}
            </div>

            {/* User Info Card */}
            {hasBasicInfo && (
              <div className="mx-4 mt-4 bg-white border-2 border-gray-200 rounded-xl p-3 shadow-xl">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {form_data.name && (
                    <div>
                      <span className="text-gray-500 text-[10px]">Nome:</span>
                      <span className="text-purple-700 font-semibold ml-1 block">
                        {form_data.name.split(" ")[0]}
                      </span>
                    </div>
                  )}
                  {form_data.age && (
                    <div>
                      <span className="text-gray-500 text-[10px]">Idade:</span>
                      <span className="text-purple-700 font-semibold ml-1 block">
                        {form_data.age} anos
                      </span>
                    </div>
                  )}
                  {form_data.gender && (
                    <div>
                      <span className="text-gray-500 text-[10px]">Gênero:</span>
                      <span className="text-purple-700 font-semibold ml-1 block">
                        {form_data.gender}
                      </span>
                    </div>
                  )}
                  {form_data.goal && (
                    <div className="relative">
                      <span className="text-gray-500 text-[10px]">
                        Objetivo:
                      </span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`text-purple-700 font-semibold block transition-all ${
                            isSensitiveGoal && !showSensitiveGoal
                              ? "blur-sm select-none"
                              : ""
                          }`}
                        >
                          {goalNames[form_data.goal] || "Não definido"}
                        </span>
                        {isSensitiveGoal && (
                          <button
                            onClick={() =>
                              setShowSensitiveGoal(!showSensitiveGoal)
                            }
                            className="text-purple-600 hover:text-purple-700 transition-colors p-0.5"
                            aria-label={
                              showSensitiveGoal
                                ? "Ocultar objetivo"
                                : "Mostrar objetivo"
                            }
                          >
                            <FontAwesomeIcon
                              icon={showSensitiveGoal ? faEyeSlash : faEye}
                              className="text-[10px]"
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Physical Data */}
            {hasPhysicalData && (
              <div className="mx-4 mt-3 bg-white border-2 border-gray-200 rounded-xl p-3 shadow-xl">
                <div className="flex items-center gap-2 mb-2">
                  <FontAwesomeIcon
                    icon={faDumbbell}
                    className="text-purple-600 text-xs"
                  />
                  <span className="text-purple-700 font-semibold text-xs">
                    Dados Físicos
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                  {form_data.weight && (
                    <div>
                      <span className="text-gray-500 text-[10px]">Peso:</span>
                      <span className="ml-1 font-semibold block">
                        {form_data.weight} kg
                      </span>
                    </div>
                  )}
                  {form_data.height && (
                    <div>
                      <span className="text-gray-500 text-[10px]">Altura:</span>
                      <span className="ml-1 font-semibold block">
                        {Math.round(form_data.height * 100)} cm
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Weekly Plan Section */}
            {hasGoal && (
              <div className="mt-4 px-4">
                <h2 className="text-sm font-bold mb-3 flex items-center gap-2 text-gray-900">
                  <FontAwesomeIcon
                    icon={faCalendarWeek}
                    className="text-purple-600 text-xs"
                  />
                  Planejamento Semanal
                </h2>
                <div className="space-y-2">
                  {previewDays.map(({ day }) => (
                    <div
                      key={day}
                      className="bg-white border-l-4 border-purple-500 rounded-r-xl p-3 hover:border-purple-600 transition-all shadow-xl"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                          {dayNamesShort[day].charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-purple-700 font-bold text-xs truncate">
                            {dayNamesShort[day]}
                          </h3>
                        </div>
                        {!form_data.exercicesPerDay ? (
                          <div className="flex items-center gap-1 px-2 py-1 bg-purple-50 rounded border border-purple-200">
                            <FontAwesomeIcon
                              icon={faClock}
                              className="text-purple-600 text-[10px]"
                            />
                            <span className="text-gray-900 font-semibold text-[10px]">
                              ?
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 px-2 py-1 bg-purple-50 rounded border border-purple-200">
                            <FontAwesomeIcon
                              icon={faClock}
                              className="text-purple-600 text-[10px]"
                            />
                            <span className="text-gray-900 font-semibold text-[10px]">
                              ~{form_data.exercicesPerDay * 15} min
                            </span>
                          </div>
                        )}
                      </div>
                      {form_data.exercicesPerDay && (
                        <div className="ml-11">
                          <div className="flex items-center gap-2 text-gray-600">
                            <FontAwesomeIcon
                              icon={faDumbbell}
                              className="text-purple-600 text-[10px]"
                            />
                            <span className="text-[10px]">
                              {form_data.exercicesPerDay}{" "}
                              {form_data.exercicesPerDay === 1
                                ? "exercício"
                                : "exercícios"}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {restDays > 0 && (
                    <div className="bg-white rounded-xl p-4 border-2 border-gray-200 text-center shadow-xl">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-gray-400 text-2xl mb-2 opacity-50"
                      />
                      <p className="text-gray-500 text-xs">
                        {restDays}{" "}
                        {restDays === 1
                          ? "dia de descanso"
                          : "dias de descanso"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Diretrizes Gerais Preview */}
            {hasGoal && (
              <div className="mt-4 px-4">
                <h2 className="text-sm font-bold mb-3 flex items-center gap-2 text-gray-900">
                  <FontAwesomeIcon
                    icon={faLightbulb}
                    className="text-purple-600 text-xs"
                  />
                  Diretrizes Gerais
                </h2>
                <div className="bg-white border-2 border-gray-200 rounded-xl p-3 shadow-xl">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-purple-600 text-[10px] mt-0.5 shrink-0"
                      />
                      <span className="text-gray-700 text-[10px] leading-relaxed">
                        Diretrizes personalizadas serão geradas conforme seu
                        perfil e objetivos
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Dicas de Nutrição Preview */}
            {hasGoal && (
              <div className="mt-4 px-4">
                <h2 className="text-sm font-bold mb-3 flex items-center gap-2 text-gray-900">
                  <FontAwesomeIcon
                    icon={faUtensils}
                    className="text-purple-600 text-xs"
                  />
                  Dicas de Nutrição
                </h2>
                <div className="bg-white border-2 border-gray-200 rounded-xl p-3 shadow-xl">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-purple-600 text-[10px] mt-0.5 shrink-0"
                      />
                      <span className="text-gray-700 text-[10px] leading-relaxed">
                        Recomendações nutricionais curtas personalizadas para
                        seu objetivo
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Plano de Progressão Preview */}
            {hasGoal && (
              <div className="mt-4 px-4">
                <h2 className="text-sm font-bold mb-3 flex items-center gap-2 text-gray-900">
                  <FontAwesomeIcon
                    icon={faChartLine}
                    className="text-purple-600 text-xs"
                  />
                  Plano de Progressão
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-2 shadow-xl">
                    <h3 className="text-purple-700 font-bold text-[10px] mb-1">
                      Semanas 1-2
                    </h3>
                    <p className="text-gray-700 text-[9px] leading-tight">
                      Adaptação inicial
                    </p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-2 shadow-xl">
                    <h3 className="text-purple-700 font-bold text-[10px] mb-1">
                      Semanas 3-4
                    </h3>
                    <p className="text-gray-700 text-[9px] leading-tight">
                      Aumento gradual
                    </p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-2 shadow-xl">
                    <h3 className="text-purple-700 font-bold text-[10px] mb-1">
                      Semanas 5-6
                    </h3>
                    <p className="text-gray-700 text-[9px] leading-tight">
                      Intensificação
                    </p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-2 shadow-xl">
                    <h3 className="text-purple-700 font-bold text-[10px] mb-1">
                      Semanas 7-8
                    </h3>
                    <p className="text-gray-700 text-[9px] leading-tight">
                      Otimização
                    </p>
                  </div>
                </div>
                <p className="text-gray-500 text-[9px] mt-2 text-center">
                  Progressão detalhada será gerada conforme seu perfil
                </p>
              </div>
            )}

            {/* Placeholder quando não há dados suficientes */}
            {!hasBasicInfo && (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <FontAwesomeIcon
                    icon={faDumbbell}
                    className="text-3xl mb-3 opacity-30"
                  />
                  <p className="text-xs">
                    Preencha os dados para ver o preview
                  </p>
                </div>
              </div>
            )}

            {/* Mini Footer */}
            {hasBasicInfo && (
              <div className="mt-6 mx-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-gray-500 text-[10px]">
                    Seu treino será gerado após o cadastro
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Home Indicator (iPhone 17 style) - Only the bar, no dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full backdrop-blur-sm"></div>
        </div>

        {/* Side Buttons (iPhone 17 style) - Volume and Power */}
        <div className="absolute left-0 top-28 w-0.5 h-12 bg-gray-800/40 rounded-r-full"></div>
        <div className="absolute left-0 top-44 w-0.5 h-16 bg-gray-800/40 rounded-r-full"></div>
        <div className="absolute right-0 top-36 w-0.5 h-10 bg-gray-800/40 rounded-l-full"></div>
      </div>
    </div>
  );
}
