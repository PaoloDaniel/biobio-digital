import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useData } from '../../context/DataContext';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';

export default function TramiteDetailScreen({ navigation, route }) {
  const { tramite } = route.params;
  const { scheduleTramite } = useData();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Mock data para fechas y horarios
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

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Error', 'Por favor selecciona fecha y hora');
      return;
    }

    const scheduled = {
      ...tramite,
      date: selectedDate,
      time: selectedTime,
    };

    scheduleTramite(scheduled);

    Alert.alert(
      'Hora Agendada',
      `Tu hora ha sido agendada para el ${selectedDate} a las ${selectedTime}`,
      [{ text: 'OK', onPress: () => navigation.navigate('Tramites') }]
    );
  };

  const handleOpenDigitalLink = () => {
    if (tramite.digitalLink) {
      Linking.openURL(tramite.digitalLink);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle del Trámite</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Ionicons name="document-text" size={64} color={colors.accent} />
          </View>
          <Text style={styles.tramiteTitle}>{tramite.title}</Text>
          <Text style={styles.tramiteCategory}>{tramite.category}</Text>
          <Text style={styles.tramiteDescription}>{tramite.description}</Text>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Ionicons name="cash" size={32} color={colors.success} />
            <Text style={styles.infoLabel}>Costo</Text>
            <Text style={styles.infoValue}>{tramite.cost}</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="time" size={32} color={colors.secondary} />
            <Text style={styles.infoLabel}>Tiempo Est.</Text>
            <Text style={styles.infoValue}>{tramite.estimatedTime}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requisitos</Text>
          <View style={styles.listCard}>
            {tramite.requirements.map((req, index) => (
              <View key={index} style={styles.listItem}>
                <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                <Text style={styles.listText}>{req}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documentos Necesarios</Text>
          <View style={styles.listCard}>
            {tramite.documents.map((doc, index) => (
              <View key={index} style={styles.listItem}>
                <Ionicons name="document" size={20} color={colors.accent} />
                <Text style={styles.listText}>{doc}</Text>
              </View>
            ))}
          </View>
        </View>

        {tramite.digitalLink ? (
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.digitalButton}
              onPress={handleOpenDigitalLink}
            >
              <Ionicons name="globe" size={24} color={colors.white} />
              <Text style={styles.digitalButtonText}>Realizar Trámite Digital</Text>
              <Ionicons name="open-outline" size={20} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.orText}>o</Text>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Agendar Hora Presencial</Text>

          <Text style={styles.subsectionTitle}>Selecciona Fecha</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
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

          <Text style={styles.subsectionTitle}>Selecciona Hora</Text>
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

          {selectedDate && selectedTime && (
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Resumen de la Cita</Text>
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
              styles.scheduleButton,
              (!selectedDate || !selectedTime) && styles.buttonDisabled,
            ]}
            onPress={handleSchedule}
            disabled={!selectedDate || !selectedTime}
          >
            <Text style={styles.scheduleButtonText}>Confirmar Hora</Text>
          </TouchableOpacity>
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
    backgroundColor: colors.accent + '20',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  tramiteTitle: {
    fontSize: fontSize.xxlarge,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  tramiteCategory: {
    fontSize: fontSize.medium,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  tramiteDescription: {
    fontSize: fontSize.medium,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  infoCard: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.large,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
  },
  infoLabel: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  infoValue: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: spacing.xs,
    textAlign: 'center',
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
  subsectionTitle: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
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
  digitalButton: {
    backgroundColor: colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.medium,
  },
  digitalButtonText: {
    color: colors.white,
    fontSize: fontSize.large,
    fontWeight: 'bold',
    marginLeft: spacing.sm,
    marginRight: spacing.sm,
  },
  orText: {
    fontSize: fontSize.large,
    color: colors.textSecondary,
    textAlign: 'center',
    marginVertical: spacing.md,
    fontWeight: 'bold',
  },
  dateScroll: {
    marginBottom: spacing.md,
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
  selectedCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  dateText: {
    fontSize: fontSize.small,
    color: colors.text,
  },
  selectedText: {
    color: colors.primary,
    fontWeight: 'bold',
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
    marginTop: spacing.md,
    marginBottom: spacing.md,
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
  scheduleButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.medium,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.textSecondary,
  },
  scheduleButtonText: {
    color: colors.white,
    fontSize: fontSize.large,
    fontWeight: 'bold',
  },
});
