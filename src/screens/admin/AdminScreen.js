import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useData } from '../../context/DataContext';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';

export default function AdminScreen({ navigation }) {
  const { courses, addCourse, updateCourse, deleteCourse, wifiPoints } = useData();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: 'Básico',
    modality: 'Online',
    duration: '',
    objectives: '',
    requirements: '',
  });

  const handleOpenModal = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        title: course.title,
        description: course.description,
        level: course.level,
        modality: course.modality,
        duration: course.duration,
        objectives: course.objectives.join('\n'),
        requirements: course.requirements,
      });
    } else {
      setEditingCourse(null);
      setFormData({
        title: '',
        description: '',
        level: 'Básico',
        modality: 'Online',
        duration: '',
        objectives: '',
        requirements: '',
      });
    }
    setModalVisible(true);
  };

  const handleSaveCourse = () => {
    if (!formData.title || !formData.description) {
      Alert.alert('Error', 'Por favor completa título y descripción');
      return;
    }

    const courseData = {
      title: formData.title,
      description: formData.description,
      level: formData.level,
      modality: formData.modality,
      duration: formData.duration,
      objectives: formData.objectives.split('\n').filter(o => o.trim()),
      requirements: formData.requirements,
    };

    if (editingCourse) {
      updateCourse(editingCourse.id, courseData);
      Alert.alert('Éxito', 'Curso actualizado');
    } else {
      addCourse(courseData);
      Alert.alert('Éxito', 'Curso creado');
    }

    setModalVisible(false);
  };

  const handleDeleteCourse = (courseId) => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de eliminar este curso?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            deleteCourse(courseId);
            Alert.alert('Éxito', 'Curso eliminado');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Administración</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="school" size={32} color={colors.secondary} />
            <Text style={styles.statValue}>{courses.length}</Text>
            <Text style={styles.statLabel}>Cursos</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="wifi" size={32} color={colors.secondary} />
            <Text style={styles.statValue}>{wifiPoints.length}</Text>
            <Text style={styles.statLabel}>Puntos WiFi</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Gestión de Cursos</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleOpenModal()}
            >
              <Ionicons name="add-circle" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {courses.length === 0 ? (
            <View style={styles.emptyCard}>
              <Ionicons name="school-outline" size={48} color={colors.textSecondary} />
              <Text style={styles.emptyText}>No hay cursos disponibles</Text>
            </View>
          ) : (
            courses.map((course) => (
              <View key={course.id} style={styles.courseCard}>
                <View style={styles.courseInfo}>
                  <Text style={styles.courseName}>{course.title}</Text>
                  <Text style={styles.courseDetails}>
                    {course.level} • {course.modality} • {course.duration}
                  </Text>
                </View>
                <View style={styles.courseActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleOpenModal(course)}
                  >
                    <Ionicons name="create" size={20} color={colors.secondary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDeleteCourse(course.id)}
                  >
                    <Ionicons name="trash" size={20} color={colors.error} />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color={colors.secondary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Panel de Administración</Text>
            <Text style={styles.infoText}>
              Desde aquí puedes gestionar los cursos digitales de la plataforma.
              Próximamente se agregarán más funcionalidades administrativas.
            </Text>
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingCourse ? 'Editar Curso' : 'Nuevo Curso'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={28} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.label}>Título</Text>
              <TextInput
                style={styles.input}
                value={formData.title}
                onChangeText={(text) => setFormData({ ...formData, title: text })}
                placeholder="Título del curso"
              />

              <Text style={styles.label}>Descripción</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                placeholder="Descripción del curso"
                multiline
                numberOfLines={3}
              />

              <Text style={styles.label}>Nivel</Text>
              <View style={styles.pickerContainer}>
                {['Básico', 'Intermedio', 'Avanzado'].map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.pickerOption,
                      formData.level === level && styles.pickerOptionSelected,
                    ]}
                    onPress={() => setFormData({ ...formData, level })}
                  >
                    <Text
                      style={[
                        styles.pickerText,
                        formData.level === level && styles.pickerTextSelected,
                      ]}
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Modalidad</Text>
              <View style={styles.pickerContainer}>
                {['Online', 'Presencial', 'Híbrido'].map((modality) => (
                  <TouchableOpacity
                    key={modality}
                    style={[
                      styles.pickerOption,
                      formData.modality === modality && styles.pickerOptionSelected,
                    ]}
                    onPress={() => setFormData({ ...formData, modality })}
                  >
                    <Text
                      style={[
                        styles.pickerText,
                        formData.modality === modality && styles.pickerTextSelected,
                      ]}
                    >
                      {modality}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Duración</Text>
              <TextInput
                style={styles.input}
                value={formData.duration}
                onChangeText={(text) => setFormData({ ...formData, duration: text })}
                placeholder="Ej: 4 semanas"
              />

              <Text style={styles.label}>Objetivos (uno por línea)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.objectives}
                onChangeText={(text) => setFormData({ ...formData, objectives: text })}
                placeholder="Objetivo 1&#10;Objetivo 2&#10;Objetivo 3"
                multiline
                numberOfLines={4}
              />

              <Text style={styles.label}>Requisitos</Text>
              <TextInput
                style={styles.input}
                value={formData.requirements}
                onChangeText={(text) => setFormData({ ...formData, requirements: text })}
                placeholder="Requisitos para el curso"
              />

              <TouchableOpacity style={styles.saveButton} onPress={handleSaveCourse}>
                <Text style={styles.saveButtonText}>
                  {editingCourse ? 'Actualizar Curso' : 'Crear Curso'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.large,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
  },
  statValue: {
    fontSize: fontSize.title,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: spacing.sm,
  },
  statLabel: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: colors.text,
  },
  addButton: {
    padding: spacing.xs,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  courseDetails: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
  },
  courseActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: spacing.sm,
    marginLeft: spacing.sm,
  },
  infoCard: {
    backgroundColor: colors.secondary + '10',
    padding: spacing.lg,
    borderRadius: borderRadius.large,
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  infoContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  infoTitle: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  infoText: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xlarge,
    borderTopRightRadius: borderRadius.xlarge,
    padding: spacing.lg,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    fontSize: fontSize.xxlarge,
    fontWeight: 'bold',
    color: colors.text,
  },
  label: {
    fontSize: fontSize.medium,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.medium,
    padding: spacing.md,
    fontSize: fontSize.medium,
    backgroundColor: colors.white,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerOption: {
    flex: 1,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.medium,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
  },
  pickerOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pickerText: {
    fontSize: fontSize.small,
    color: colors.text,
  },
  pickerTextSelected: {
    color: colors.white,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.medium,
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: fontSize.large,
    fontWeight: 'bold',
  },
});
