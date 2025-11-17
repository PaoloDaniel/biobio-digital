import React, { useState } from 'react';
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

export default function TramitesScreen({ navigation }) {
  const { tramites, scheduledTramites } = useData();

  // Agrupar trámites por categoría
  const categorizedTramites = tramites.reduce((acc, tramite) => {
    if (!acc[tramite.category]) {
      acc[tramite.category] = [];
    }
    acc[tramite.category].push(tramite);
    return acc;
  }, {});

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trámites</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {scheduledTramites.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mis Trámites Agendados</Text>
            {scheduledTramites.map((tramite) => (
              <View key={tramite.id} style={styles.scheduledCard}>
                <View style={styles.scheduledHeader}>
                  <Ionicons name="calendar" size={24} color={colors.primary} />
                  <Text style={styles.scheduledDate}>
                    {tramite.date} - {tramite.time}
                  </Text>
                </View>
                <Text style={styles.scheduledTitle}>{tramite.title}</Text>
                <Text style={styles.scheduledCategory}>{tramite.category}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorías de Trámites</Text>
          {Object.keys(categorizedTramites).map((category) => (
            <View key={category} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>{category}</Text>
              {categorizedTramites[category].map((tramite) => (
                <TouchableOpacity
                  key={tramite.id}
                  style={styles.tramiteCard}
                  onPress={() => navigation.navigate('TramiteDetail', { tramite })}
                >
                  <View style={styles.tramiteHeader}>
                    <Ionicons name="document-text" size={28} color={colors.accent} />
                    <View style={styles.tramiteInfo}>
                      <Text style={styles.tramiteTitle}>{tramite.title}</Text>
                      <Text style={styles.tramiteDescription} numberOfLines={2}>
                        {tramite.description}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
                  </View>

                  <View style={styles.tramiteFooter}>
                    <View style={styles.tramiteMeta}>
                      <Ionicons name="cash-outline" size={16} color={colors.textSecondary} />
                      <Text style={styles.metaText}>{tramite.cost}</Text>
                    </View>
                    <View style={styles.tramiteMeta}>
                      <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
                      <Text style={styles.metaText}>{tramite.estimatedTime}</Text>
                    </View>
                    {tramite.digitalLink && (
                      <View style={styles.digitalBadge}>
                        <Ionicons name="globe" size={14} color={colors.success} />
                        <Text style={styles.digitalBadgeText}>Digital</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color={colors.secondary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>¿Necesitas ayuda?</Text>
            <Text style={styles.infoText}>
              Revisa los requisitos de cada trámite antes de agendar tu hora.
              Algunos trámites están disponibles de forma digital.
            </Text>
          </View>
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
  scheduledCard: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.large,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  scheduledHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  scheduledDate: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: spacing.sm,
  },
  scheduledTitle: {
    fontSize: fontSize.medium,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  scheduledCategory: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
  },
  categorySection: {
    marginBottom: spacing.lg,
  },
  categoryTitle: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.sm,
    paddingLeft: spacing.xs,
  },
  tramiteCard: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.large,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tramiteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  tramiteInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  tramiteTitle: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  tramiteDescription: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  tramiteFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  tramiteMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  metaText: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  digitalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.small,
    marginLeft: 'auto',
  },
  digitalBadgeText: {
    fontSize: fontSize.small,
    color: colors.success,
    fontWeight: 'bold',
    marginLeft: spacing.xs,
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
});
