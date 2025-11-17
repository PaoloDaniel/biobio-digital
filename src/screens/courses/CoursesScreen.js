import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useData } from '../../context/DataContext';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';

export default function CoursesScreen({ navigation }) {
  const { courses, enrolledCourses } = useData();

  const getCourseStatus = (courseId) => {
    const enrolled = enrolledCourses.find(c => c.courseId === courseId);
    return enrolled?.status || null;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return colors.warning;
      case 'in_progress':
        return colors.secondary;
      case 'completed':
        return colors.success;
      default:
        return colors.textSecondary;
    }
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

  const myEnrolledCourses = courses.filter(course =>
    enrolledCourses.some(ec => ec.courseId === course.id)
  );

  const availableCourses = courses.filter(course =>
    !enrolledCourses.some(ec => ec.courseId === course.id)
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cursos Digitales</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {myEnrolledCourses.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mis Cursos</Text>
            {myEnrolledCourses.map((course) => (
              <TouchableOpacity
                key={course.id}
                style={styles.courseCard}
                onPress={() => navigation.navigate('CourseDetail', { course })}
              >
                <View style={styles.courseHeader}>
                  <View style={styles.iconContainer}>
                    <Ionicons name="school" size={32} color={colors.secondary} />
                  </View>
                  <View style={styles.courseInfo}>
                    <Text style={styles.courseTitle}>{course.title}</Text>
                    <Text style={styles.courseDescription} numberOfLines={2}>
                      {course.description}
                    </Text>
                  </View>
                </View>
                <View style={styles.courseFooter}>
                  <View style={styles.courseMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
                      <Text style={styles.metaText}>{course.duration}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="bar-chart-outline" size={16} color={colors.textSecondary} />
                      <Text style={styles.metaText}>{course.level}</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(getCourseStatus(course.id)) + '20' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        { color: getStatusColor(getCourseStatus(course.id)) },
                      ]}
                    >
                      {getStatusText(getCourseStatus(course.id))}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cursos Disponibles</Text>
          {availableCourses.length === 0 ? (
            <View style={styles.emptyCard}>
              <Ionicons name="school-outline" size={48} color={colors.textSecondary} />
              <Text style={styles.emptyText}>No hay cursos disponibles</Text>
            </View>
          ) : (
            availableCourses.map((course) => (
              <TouchableOpacity
                key={course.id}
                style={styles.courseCard}
                onPress={() => navigation.navigate('CourseDetail', { course })}
              >
                <View style={styles.courseHeader}>
                  <View style={styles.iconContainer}>
                    <Ionicons name="school-outline" size={32} color={colors.secondary} />
                  </View>
                  <View style={styles.courseInfo}>
                    <Text style={styles.courseTitle}>{course.title}</Text>
                    <Text style={styles.courseDescription} numberOfLines={2}>
                      {course.description}
                    </Text>
                  </View>
                </View>
                <View style={styles.courseFooter}>
                  <View style={styles.courseMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
                      <Text style={styles.metaText}>{course.duration}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="bar-chart-outline" size={16} color={colors.textSecondary} />
                      <Text style={styles.metaText}>{course.level}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="laptop-outline" size={16} color={colors.textSecondary} />
                      <Text style={styles.metaText}>{course.modality}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
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
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  emptyCard: {
    backgroundColor: colors.white,
    padding: spacing.xl,
    borderRadius: borderRadius.large,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: fontSize.medium,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  courseCard: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.large,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseHeader: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: colors.secondary + '20',
    borderRadius: borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  courseTitle: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  courseDescription: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseMeta: {
    flexDirection: 'row',
    flex: 1,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  metaText: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.small,
  },
  statusText: {
    fontSize: fontSize.small,
    fontWeight: 'bold',
  },
});
