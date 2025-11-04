import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { TrainingPlan } from "@/types/training-plans/training-plan.types";

const dayNames = {
  monday: "Segunda-feira",
  tuesday: "Terça-feira",
  wednesday: "Quarta-feira",
  thursday: "Quinta-feira",
  friday: "Sexta-feira",
  saturday: "Sábado",
  sunday: "Domingo",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#0a0a0a",
    color: "#ffffff",
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
  },
  header: {
    marginBottom: 30,
    textAlign: "center",
  },
  badge: {
    backgroundColor: "rgba(6, 182, 212, 0.1)",
    borderColor: "rgba(6, 182, 212, 0.2)",
    borderWidth: 1,
    borderRadius: 20,
    padding: 8,
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  badgeText: {
    color: "#67e8f9",
    fontSize: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffffff",
  },
  titleGradient: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#06b6d4",
  },
  subtitle: {
    fontSize: 14,
    color: "#9ca3af",
    marginTop: 10,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#06b6d4",
    marginBottom: 15,
  },
  dayCard: {
    backgroundColor: "rgba(17, 24, 39, 0.5)",
    borderLeftWidth: 4,
    borderLeftColor: "rgba(6, 182, 212, 0.5)",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  dayHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#06b6d4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dayCircleText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  dayName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#06b6d4",
  },
  muscleGroups: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 6,
  },
  muscleGroupTag: {
    backgroundColor: "rgba(6, 182, 212, 0.1)",
    color: "#06b6d4",
    fontSize: 9,
    padding: 4,
    borderRadius: 4,
    fontWeight: "600",
  },
  restDay: {
    textAlign: "center",
    padding: 30,
    color: "#6b7280",
  },
  restDayTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
  },
  restDayText: {
    fontSize: 12,
  },
  exerciseCard: {
    backgroundColor: "rgba(17, 24, 39, 0.3)",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 6,
    padding: 14,
    marginBottom: 14,
    marginLeft: 14,
  },
  exerciseName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
    lineHeight: 1.4,
  },
  exerciseDetails: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    fontSize: 10,
    color: "#9ca3af",
    marginBottom: 8,
    lineHeight: 1.5,
  },
  exerciseDetailValue: {
    color: "#06b6d4",
    fontWeight: "600",
  },
  exerciseNotes: {
    fontSize: 10,
    color: "#6b7280",
    fontStyle: "italic",
    marginTop: 8,
    lineHeight: 1.4,
  },
  guidelinesCard: {
    backgroundColor: "rgba(17, 24, 39, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(6, 182, 212, 0.2)",
    borderRadius: 8,
    padding: 15,
  },
  guidelineItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 8,
  },
  guidelineText: {
    fontSize: 11,
    color: "#d1d5db",
    flex: 1,
  },
  progressionCard: {
    backgroundColor: "rgba(17, 24, 39, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(6, 182, 212, 0.2)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  progressionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#06b6d4",
    marginBottom: 6,
  },
  progressionText: {
    fontSize: 10,
    color: "#d1d5db",
  },
  progressionGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  timeBadge: {
    backgroundColor: "rgba(6, 182, 212, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(6, 182, 212, 0.2)",
    borderRadius: 6,
    padding: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  timeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#ffffff",
  },
});

interface TrainingPDFProps {
  trainingPlan: TrainingPlan;
}

export function TrainingPDFDocument({ trainingPlan }: TrainingPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.badge}>
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: "#06b6d4",
              }}
            />
            <Text style={styles.badgeText}>Plano Personalizado por IA</Text>
          </View>
          <Text style={styles.title}>Seu Plano de</Text>
          <Text style={styles.titleGradient}>Treino Inteligente</Text>
          <Text style={styles.subtitle}>Criado exclusivamente para você</Text>
        </View>

        {/* Planejamento Semanal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Planejamento Semanal</Text>
          {Object.entries(trainingPlan.weeklyPlan).map(([day, dayPlan]) => (
            <DayCardPDF
              key={day}
              day={day as keyof typeof dayNames}
              dayPlan={dayPlan}
            />
          ))}
        </View>

        {/* Diretrizes Gerais */}
        {trainingPlan.generalGuidelines &&
          trainingPlan.generalGuidelines.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Diretrizes Gerais</Text>
              <View style={styles.guidelinesCard}>
                {trainingPlan.generalGuidelines.map((guideline, index) => (
                  <View key={index} style={styles.guidelineItem}>
                    <Text style={{ color: "#06b6d4", fontSize: 10 }}>✓</Text>
                    <Text style={styles.guidelineText}>{guideline}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

        {/* Dicas de Nutrição */}
        {trainingPlan.nutritionTips &&
          trainingPlan.nutritionTips.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Dicas de Nutrição</Text>
              <View style={styles.guidelinesCard}>
                {trainingPlan.nutritionTips.map((tip, index) => (
                  <View key={index} style={styles.guidelineItem}>
                    <Text style={{ color: "#06b6d4", fontSize: 10 }}>✓</Text>
                    <Text style={styles.guidelineText}>{tip}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

        {/* Plano de Progressão */}
        {trainingPlan.progressionPlan && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Plano de Progressão</Text>
            <View style={styles.progressionGrid}>
              <View style={[styles.progressionCard, { width: "48%" }]}>
                <Text style={styles.progressionTitle}>Semanas 1-2</Text>
                <Text style={styles.progressionText}>
                  {trainingPlan.progressionPlan.week1to2}
                </Text>
              </View>
              <View style={[styles.progressionCard, { width: "48%" }]}>
                <Text style={styles.progressionTitle}>Semanas 3-4</Text>
                <Text style={styles.progressionText}>
                  {trainingPlan.progressionPlan.week3to4}
                </Text>
              </View>
              <View
                style={[
                  styles.progressionCard,
                  { width: "48%", marginTop: 10 },
                ]}
              >
                <Text style={styles.progressionTitle}>Semanas 5-6</Text>
                <Text style={styles.progressionText}>
                  {trainingPlan.progressionPlan.week5to6}
                </Text>
              </View>
              <View
                style={[
                  styles.progressionCard,
                  { width: "48%", marginTop: 10 },
                ]}
              >
                <Text style={styles.progressionTitle}>Semanas 7-8</Text>
                <Text style={styles.progressionText}>
                  {trainingPlan.progressionPlan.week7to8}
                </Text>
              </View>
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}

function DayCardPDF({
  day,
  dayPlan,
}: {
  day: keyof typeof dayNames;
  dayPlan: import("@/types/training-plans/training-plan.types").DayPlan;
}) {
  const isRestDay = dayPlan.exercises.length === 0;

  return (
    <View style={styles.dayCard}>
      <View style={styles.dayHeader}>
        <View style={styles.dayCircle}>
          <Text style={styles.dayCircleText}>{dayNames[day].charAt(0)}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.dayName}>{dayNames[day]}</Text>
          {dayPlan.muscleGroups && dayPlan.muscleGroups.length > 0 && (
            <View style={styles.muscleGroups}>
              {dayPlan.muscleGroups.map((group, index) => (
                <Text key={index} style={styles.muscleGroupTag}>
                  {group}
                </Text>
              ))}
            </View>
          )}
        </View>
        {!isRestDay && (
          <View style={styles.timeBadge}>
            <Text style={styles.timeText}>
              {dayPlan.totalDurationMinutes} min
            </Text>
          </View>
        )}
      </View>

      {isRestDay ? (
        <View style={styles.restDay}>
          <Text style={styles.restDayTitle}>Dia de Descanso</Text>
          <Text style={styles.restDayText}>
            Recuperação é essencial para o progresso
          </Text>
        </View>
      ) : (
        <View style={{ marginTop: 8 }}>
          {dayPlan.exercises.map((exercise, index) => (
            <ExerciseCardPDF key={index} exercise={exercise} />
          ))}
        </View>
      )}
    </View>
  );
}

function ExerciseCardPDF({
  exercise,
}: {
  exercise: import("@/types/training-plans/training-plan.types").Exercise;
}) {
  return (
    <View style={styles.exerciseCard}>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <View style={styles.exerciseDetails}>
        <Text>
          <Text style={styles.exerciseDetailValue}>{exercise.sets}</Text> séries
        </Text>
        <Text>
          <Text style={styles.exerciseDetailValue}>{exercise.reps}</Text>{" "}
          repetições
        </Text>
        <Text>
          Descanso:{" "}
          <Text style={styles.exerciseDetailValue}>
            {exercise.restSeconds}s
          </Text>
        </Text>
      </View>
      {exercise.notes && (
        <Text style={styles.exerciseNotes}>{exercise.notes}</Text>
      )}
    </View>
  );
}
