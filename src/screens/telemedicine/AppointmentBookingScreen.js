import React, { useState } from 'react';
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

export default function AppointmentBookingScreen({ navigation, route }) {
  const { center } = route.params;
  const { addAppointment } = useData();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  // Mock data para fechas y horarios disponibles
  const availableDates = [
    '2025-11-18',
    '2025-11-19',
    '2025-11-20',
    '2025-11-21',
    '2025-11-22',
  ];

  const availableTimes = [
    '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00',
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedSpecialty) {
      Alert.alert('Error', 'Por favor selecciona fecha, hora y especialidad');
      return;
    }

    const appointment = {
      centerName: center.name,
      date: selectedDate,
      time: selectedTime,
      specialty: selectedSpecialty,
      virtualLink: 'https://meet.example.com/virtual-consultation',
    };

    addAppointment(appointment);

    Alert.alert(
      'Cita Agendada',
      `Tu cita ha sido agendada exitosamente para el ${selectedDate} a las ${selectedTime}`,
      [{ text: 'OK', onPress: () => navigation.navigate('Telemedicine') }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agendar Cita</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.centerInfo}>
          <Ionicons name="medical" size={40} color={colors.primary} />
          <View style={styles.centerDetails}>
            <Text style={styles.centerName}>{center.name}</Text>
            <Text style={styles.centerAddress}>{center.address}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selecciona Especialidad</Text>
          {center.specialties.map((specialty, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionCard,
                selectedSpecialty === specialty && styles.selectedCard,
              ]}
              onPress={() => setSelectedSpecialty(specialty)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedSpecialty === specialty && styles.selectedText,
                ]}
              >
                {specialty}
              </Text>
              {selectedSpecialty === specialty && (
                <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selecciona Fecha</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {availableDates.map((date) => (
              <TouchableOpacity
                key={date}
                style={[
                  styles.dateCard,
                  selectedDate === date && styles.selectedCard,
                ]}
                onPress={() => setSelectedDate(date)}
              >
                <Text
                  style={[
                    styles.dateText,
                    selectedDate === date && styles.selectedText,
                  ]}
                >
                  {new Date(date).toLocaleDateString('es-CL', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                  })}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selecciona Hora</Text>
          <View style={styles.timeGrid}>
            {availableTimes.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeCard,
                  selectedTime === time && styles.selectedCard,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === time && styles.selectedText,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {selectedDate && selectedTime && selectedSpecialty && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Resumen de la Cita</Text>
            <View style={styles.summaryRow}>
              <Ionicons name="medical" size={20} color={colors.textSecondary} />
              <Text style={styles.summaryText}>{selectedSpecialty}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Ionicons name="calendar" size={20} color={colors.textSecondary} />
              <Text style={styles.summaryText}>{selectedDate}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Ionicons name="time" size={20} color={colors.textSecondary} />
              <Text style={styles.summaryText}>{selectedTime}</Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.bookButton,
            (!selectedDate || !selectedTime || !selectedSpecialty) && styles.buttonDisabled,
          ]}
          onPress={handleBooking}
          disabled={!selectedDate || !selectedTime || !selectedSpecialty}
        >
          <Text style={styles.bookButtonText}>Confirmar Cita</Text>
        </TouchableOpacity>
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
  centerInfo: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.large,
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  centerDetails: {
    marginLeft: spacing.md,
    flex: 1,
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
  optionCard: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.medium,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  selectedCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  optionText: {
    fontSize: fontSize.medium,
    color: colors.text,
  },
  selectedText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  dateCard: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.medium,
    marginRight: spacing.sm,
    minWidth: 100,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  dateText: {
    fontSize: fontSize.small,
    color: colors.text,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeCard: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.medium,
    marginBottom: spacing.sm,
    width: '23%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  timeText: {
    fontSize: fontSize.small,
    color: colors.text,
  },
  summaryCard: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.large,
    marginBottom: spacing.lg,
  },
  summaryTitle: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  summaryText: {
    fontSize: fontSize.medium,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  bookButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.medium,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  buttonDisabled: {
    backgroundColor: colors.textSecondary,
  },
  bookButtonText: {
    color: colors.white,
    fontSize: fontSize.large,
    fontWeight: 'bold',
  },
});
