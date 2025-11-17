import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useData } from '../../context/DataContext';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';

export default function CourseDetailScreen({ navigation, route }) {
  const { course } = route.params;
  const { enrolledCourses, enrollInCourse, updateCourseProgress } = useData();

  const enrollment = enrolledCourses.find(c => c.courseId === course.id);
  const isEnrolled = !!enrollment;

  const handleEnroll = () => {
    enrollInCourse(course.id);
    Alert.alert(
      'Inscripción Exitosa',
      `Te has inscrito en ${course.title}`,
      [{ text: 'OK' }]
    );
  };

  const handleUpdateProgress = (status) => {
    updateCourseProgress(course.id, status);
    Alert.alert('Progreso Actualizado', `Estado: ${getStatusText(status)}`);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'in_progress':
        return 'En Curso';
      case 'completed':
        return 'Completado';
      default:
        return 'No Inscrito';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle del Curso</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Ionicons
              name={isEnrolled ? 'school' : 'school-outline'}
              size={64}
              color={colors.secondary}
            />
          </View>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.courseDescription}>{course.description}</Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={24} color={colors.textSecondary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Duración</Text>
              <Text style={styles.infoValue}>{course.duration}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="bar-chart-outline" size={24} color={colors.textSecondary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Nivel</Text>
              <Text style={styles.infoValue}>{course.level}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="laptop-outline" size={24} color={colors.textSecondary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Modalidad</Text>
              <Text style={styles.infoValue}>{course.modality}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Objetivos</Text>
          <View style={styles.listCard}>
            {course.objectives.map((objective, index) => (
              <View key={index} style={styles.listItem}>
                <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                <Text style={styles.listText}>{objective}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requisitos</Text>
          <View style={styles.listCard}>
            <Text style={styles.requirementText}>{course.requirements}</Text>
          </View>
        </View>

        {isEnrolled && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mi Progreso</Text>
            <View style={styles.progressCard}>
              <Text style={styles.currentStatus}>
                Estado Actual: {getStatusText(enrollment.status)}
              </Text>
              <View style={styles.progressButtons}>
                <TouchableOpacity
                  style={[
                    styles.progressButton,
                    enrollment.status === 'pending' && styles.activeProgressButton,
                  ]}
                  onPress={() => handleUpdateProgress('pending')}
                >
                  <Text
                    style={[
                      styles.progressButtonText,
                      enrollment.status === 'pending' && styles.activeProgressButtonText,
                    ]}
                  >
                    Pendiente
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.progressButton,
                    enrollment.status === 'in_progress' && styles.activeProgressButton,
                  ]}
                  onPress={() => handleUpdateProgress('in_progress')}
                >
                  <Text
                    style={[
                      styles.progressButtonText,
                      enrollment.status === 'in_progress' && styles.activeProgressButtonText,
                    ]}
                  >
                    En Curso
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.progressButton,
                    enrollment.status === 'completed' && styles.activeProgressButton,
                  ]}
                  onPress={() => handleUpdateProgress('completed')}
                >
                  <Text
                    style={[
                      styles.progressButtonText,
                      enrollment.status === 'completed' && styles.activeProgressButtonText,
                    ]}
                  >
                    Completado
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {!isEnrolled && (
          <TouchableOpacity style={styles.enrollButton} onPress={handleEnroll}>
            <Ionicons name="add-circle" size={24} color={colors.white} />
            <Text style={styles.enrollButtonText}>Inscribirme en este Curso</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: fontSize.xlarge,
    fontWeight: 'bold',
    color: colors.text,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  heroCard: {
    backgroundColor: colors.white,
    padding: spacing.xl,
    borderRadius: borderRadius.large,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  heroIcon: {
    width: 120,
    height: 120,
    backgroundColor: colors.secondary + '20',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  courseTitle: {
    fontSize: fontSize.xxlarge,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  courseDescription: {
    fontSize: fontSize.medium,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  infoCard: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.large,
    marginBottom: spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoContent: {
    marginLeft: spacing.md,
  },
  infoLabel: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  listCard: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.large,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  listText: {
    fontSize: fontSize.medium,
    color: colors.text,
    marginLeft: spacing.sm,
    flex: 1,
  },
  requirementText: {
    fontSize: fontSize.medium,
    color: colors.text,
  },
  progressCard: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.large,
  },
  currentStatus: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  progressButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressButton: {
    flex: 1,
    padding: spacing.sm,
    borderRadius: borderRadius.medium,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  activeProgressButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  progressButtonText: {
    fontSize: fontSize.small,
    color: colors.text,
  },
  activeProgressButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  enrollButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.medium,
    marginBottom: spacing.lg,
  },
  enrollButtonText: {
    color: colors.white,
    fontSize: fontSize.large,
    fontWeight: 'bold',
    marginLeft: spacing.sm,
  },
});
