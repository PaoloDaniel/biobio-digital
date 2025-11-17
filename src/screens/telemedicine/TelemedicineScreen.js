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

export default function TelemedicineScreen({ navigation }) {
  const { healthCenters, appointments } = useData();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Telemedicina</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mis Citas</Text>
          {appointments.length === 0 ? (
            <View style={styles.emptyCard}>
              <Ionicons name="calendar-outline" size={48} color={colors.textSecondary} />
              <Text style={styles.emptyText}>No tienes citas agendadas</Text>
            </View>
          ) : (
            appointments.map((appointment) => (
              <View key={appointment.id} style={styles.appointmentCard}>
                <View style={styles.appointmentHeader}>
                  <Ionicons name="calendar" size={24} color={colors.primary} />
                  <Text style={styles.appointmentDate}>
                    {appointment.date} - {appointment.time}
                  </Text>
                </View>
                <Text style={styles.appointmentCenter}>{appointment.centerName}</Text>
                <Text style={styles.appointmentSpecialty}>{appointment.specialty}</Text>
                {appointment.virtualLink && (
                  <TouchableOpacity style={styles.virtualButton}>
                    <Ionicons name="videocam" size={20} color={colors.white} />
                    <Text style={styles.virtualButtonText}>Acceder a Consulta Virtual</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Centros de Salud Disponibles</Text>
          {healthCenters.map((center) => (
            <TouchableOpacity
              key={center.id}
              style={styles.centerCard}
              onPress={() => navigation.navigate('AppointmentBooking', { center })}
            >
              <View style={styles.centerHeader}>
                <Ionicons name="medical" size={32} color={colors.primary} />
                <View style={styles.centerInfo}>
                  <Text style={styles.centerName}>{center.name}</Text>
                  <Text style={styles.centerAddress}>{center.address}</Text>
                  <Text style={styles.centerPhone}>{center.phone}</Text>
                </View>
              </View>
              <View style={styles.specialtiesContainer}>
                {center.specialties.map((specialty, index) => (
                  <View key={index} style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>{specialty}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Agendar Cita</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.primary} />
              </View>
            </TouchableOpacity>
          ))}
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
  appointmentCard: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.large,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  appointmentDate: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: spacing.sm,
  },
  appointmentCenter: {
    fontSize: fontSize.medium,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  appointmentSpecialty: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
  },
  virtualButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    borderRadius: borderRadius.medium,
    marginTop: spacing.md,
  },
  virtualButtonText: {
    color: colors.white,
    fontSize: fontSize.small,
    fontWeight: 'bold',
    marginLeft: spacing.xs,
  },
  centerCard: {
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
  centerHeader: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  centerInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  centerName: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  centerAddress: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  centerPhone: {
    fontSize: fontSize.small,
    color: colors.primary,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  specialtyTag: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.small,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  specialtyText: {
    fontSize: fontSize.small,
    color: colors.primary,
  },
  bookButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bookButtonText: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
