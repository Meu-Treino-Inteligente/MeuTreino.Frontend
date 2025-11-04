"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getUserSiteBySlug } from "@/services/users/user.service";
import { UserSiteResponse } from "@/types/users/user.types";
import { TrainingPlan } from "@/types/training-plans/training-plan.types";
import { HeaderNavigation } from "../components/header-navigation/header-navigation";
import { FooterSection } from "../components/footer-section/footer-section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faClock,
  faUtensils,
  faChartLine,
  faLightbulb,
  faCalendarWeek,
  faCheckCircle,
  faRefresh,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { TrainingPDFDocument } from "./components/training-pdf";
import { PDFDownloadLink } from "@react-pdf/renderer";

const dayNames = {
  monday: "Segunda-feira",
  tuesday: "Terça-feira",
  wednesday: "Quarta-feira",
  thursday: "Quinta-feira",
  friday: "Sexta-feira",
  saturday: "Sábado",
  sunday: "Domingo",
};

export default function UserTrainingPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [userSiteData, setUserSiteData] = useState<UserSiteResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchUserTraining = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getUserSiteBySlug(slug);
        setUserSiteData(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Erro ao carregar treino. Tente novamente.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserTraining();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <HeaderNavigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Carregando seu treino...</p>
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }

  if (error || !userSiteData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <HeaderNavigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-400 text-lg mb-4">Treino não encontrado.</p>
            <p className="text-gray-400">Verifique se o link está correto.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all mt-4"
            >
              <FontAwesomeIcon icon={faRefresh} className="mr-2" />
              Tentar novamente
            </button>
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }

  // Parse jsonTreino se for string (vem da API como string JSON)
  const trainingPlan: TrainingPlan =
    typeof userSiteData.jsonTreino === "string"
      ? JSON.parse(userSiteData.jsonTreino)
      : userSiteData.jsonTreino;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <HeaderNavigation />
      <div className="container mx-auto px-4 pt-24 pb-12 md:pt-32 md:py-20">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-xs md:text-sm mb-6">
            <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            Plano Personalizado por IA
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
            <span className="block text-white">Seu Plano de</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
              Treino Inteligente
            </span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg mt-4">
            Criado exclusivamente para você
          </p>
          <div className="mt-6">
            <PDFDownloadLink
              document={<TrainingPDFDocument trainingPlan={trainingPlan} />}
              fileName={`treino-${slug}.pdf`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold hover:shadow-xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105"
            >
              {({ loading }: { loading: boolean }) => (
                <>
                  <FontAwesomeIcon icon={faDownload} />
                  {loading ? "Carregando..." : "Baixar PDF"}
                </>
              )}
            </PDFDownloadLink>
          </div>
        </div>

        {/* Semana */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
            <FontAwesomeIcon icon={faCalendarWeek} className="text-cyan-400" />
            Planejamento Semanal
          </h2>
          <div className="space-y-8">
            {Object.entries(trainingPlan.weeklyPlan).map(([day, dayPlan]) => (
              <DayCard
                key={day}
                day={day as keyof typeof dayNames}
                dayPlan={dayPlan}
              />
            ))}
          </div>
        </div>

        {/* Diretrizes Gerais */}
        {trainingPlan.generalGuidelines &&
          trainingPlan.generalGuidelines.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                <FontAwesomeIcon icon={faLightbulb} className="text-cyan-400" />
                Diretrizes Gerais
              </h2>
              <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-cyan-500/20 rounded-2xl p-6 md:p-8">
                <ul className="space-y-4">
                  {trainingPlan.generalGuidelines.map((guideline, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-cyan-400 mt-1 flex-shrink-0"
                      />
                      <span className="text-gray-300">{guideline}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        {/* Dicas de Nutrição */}
        {trainingPlan.nutritionTips &&
          trainingPlan.nutritionTips.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                <FontAwesomeIcon icon={faUtensils} className="text-cyan-400" />
                Dicas de Nutrição
              </h2>
              <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-cyan-500/20 rounded-2xl p-6 md:p-8">
                <ul className="space-y-4">
                  {trainingPlan.nutritionTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-cyan-400 mt-1 flex-shrink-0"
                      />
                      <span className="text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        {/* Plano de Progressão */}
        {trainingPlan.progressionPlan && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <FontAwesomeIcon icon={faChartLine} className="text-cyan-400" />
              Plano de Progressão
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProgressionCard
                title="Semanas 1-2"
                description={trainingPlan.progressionPlan.week1to2}
              />
              <ProgressionCard
                title="Semanas 3-4"
                description={trainingPlan.progressionPlan.week3to4}
              />
              <ProgressionCard
                title="Semanas 5-6"
                description={trainingPlan.progressionPlan.week5to6}
              />
              <ProgressionCard
                title="Semanas 7-8"
                description={trainingPlan.progressionPlan.week7to8}
              />
            </div>
          </div>
        )}
      </div>
      <FooterSection />
    </div>
  );
}

function DayCard({
  day,
  dayPlan,
}: {
  day: keyof typeof dayNames;
  dayPlan: import("@/types/training-plans/training-plan.types").DayPlan;
}) {
  const isRestDay = dayPlan.exercises.length === 0;

  return (
    <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border-l-4 border-cyan-500/50 rounded-r-2xl p-6 md:p-8 hover:border-cyan-400/70 transition-all shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
            {dayNames[day].charAt(0)}
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-cyan-400">
              {dayNames[day]}
            </h3>
            {dayPlan.muscleGroups && dayPlan.muscleGroups.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {dayPlan.muscleGroups.map((group, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded-md text-xs font-semibold"
                  >
                    {group}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        {!isRestDay && (
          <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <FontAwesomeIcon icon={faClock} className="text-cyan-400" />
            <span className="text-white font-semibold">
              {dayPlan.totalDurationMinutes} min
            </span>
          </div>
        )}
      </div>

      {isRestDay ? (
        <div className="text-center py-12 text-gray-500">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-5xl mb-4 opacity-50"
          />
          <p className="font-semibold text-lg">Dia de Descanso</p>
          <p className="text-sm mt-2">
            Recuperação é essencial para o progresso
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dayPlan.exercises.map((exercise, index) => (
            <ExerciseCard key={index} exercise={exercise} />
          ))}
        </div>
      )}
    </div>
  );
}

function ExerciseCard({
  exercise,
}: {
  exercise: import("@/types/training-plans/training-plan.types").Exercise;
}) {
  return (
    <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
          <FontAwesomeIcon
            icon={faDumbbell}
            className="text-cyan-400 text-sm"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-white text-lg mb-2">{exercise.name}</h4>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-400 mb-2">
            <span>
              <span className="text-cyan-400 font-semibold">
                {exercise.sets}
              </span>{" "}
              séries
            </span>
            <span>
              <span className="text-cyan-400 font-semibold">
                {exercise.reps}
              </span>{" "}
              repetições
            </span>
            <span>
              Descanso:{" "}
              <span className="text-cyan-400 font-semibold">
                {exercise.restSeconds}s
              </span>
            </span>
          </div>
          {exercise.notes && (
            <p className="text-sm text-gray-500 mt-2 italic">
              {exercise.notes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ProgressionCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-cyan-500/20 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-cyan-400 mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
