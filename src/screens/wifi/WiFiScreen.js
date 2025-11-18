import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useData } from '../../context/DataContext';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';

export default function WiFiScreen({ navigation }) {
  const { wifiPoints } = useData();
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

  const openInMaps = (point) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${point.coordinates.latitude},${point.coordinates.longitude}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Puntos WiFi</Text>
        <TouchableOpacity onPress={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}>
          <Ionicons
            name={viewMode === 'list' ? 'map' : 'list'}
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>

      {viewMode === 'list' ? (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.infoBox}>
            <Ionicons name="information-circle" size={24} color={colors.secondary} />
            <Text style={styles.infoText}>
              Encuentra puntos de acceso WiFi gratuito en la Región del Biobío
            </Text>
          </View>

          {wifiPoints.map((point) => (
            <View key={point.id} style={styles.wifiCard}>
              <View style={styles.wifiHeader}>
                <View style={styles.wifiIcon}>
                  <Ionicons name="wifi" size={32} color={colors.secondary} />
                </View>
                <View style={styles.wifiInfo}>
                  <Text style={styles.wifiName}>{point.name}</Text>
                  <Text style={styles.wifiAddress}>{point.address}</Text>
                </View>
              </View>

              <View style={styles.wifiDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="globe-outline" size={20} color={colors.textSecondary} />
                  <Text style={styles.detailText}>{point.type}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={20} color={colors.textSecondary} />
                  <Text style={styles.detailText}>{point.schedule}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="location-outline" size={20} color={colors.textSecondary} />
                  <Text style={styles.detailText}>
                    {point.coordinates.latitude.toFixed(4)}, {point.coordinates.longitude.toFixed(4)}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.directionButton}
                onPress={() => openInMaps(point)}
              >
                <Ionicons name="navigate" size={20} color={colors.primary} />
                <Text style={styles.directionButtonText}>Abrir en Google Maps</Text>
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.tipCard}>
            <Ionicons name="bulb" size={24} color={colors.warning} />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Consejo</Text>
              <Text style={styles.tipText}>
                Asegúrate de tener WiFi activado en tu dispositivo para conectarte a estos
                puntos de acceso gratuito. Presiona "Abrir en Google Maps" para obtener direcciones.
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.mapPlaceholder}>
            <Ionicons name="map" size={64} color={colors.secondary} />
            <Text style={styles.mapPlaceholderTitle}>Vista de Mapa</Text>
            <Text style={styles.mapPlaceholderText}>
              Los puntos WiFi se muestran a continuación. Presiona "Abrir en Google Maps" en cada punto para ver su ubicación exacta.
            </Text>
          </View>

          {wifiPoints.map((point) => (
            <View key={point.id} style={styles.mapCard}>
              <View style={styles.mapCardHeader}>
                <Ionicons name="wifi" size={32} color={colors.secondary} />
                <View style={styles.mapCardInfo}>
                  <Text style={styles.mapCardName}>{point.name}</Text>
                  <Text style={styles.mapCardAddress}>{point.address}</Text>
                </View>
              </View>

              <View style={styles.coordinatesBox}>
                <Ionicons name="location" size={20} color={colors.primary} />
                <Text style={styles.coordinatesText}>
                  Lat: {point.coordinates.latitude.toFixed(6)}
                </Text>
                <Text style={styles.coordinatesSeparator}>•</Text>
                <Text style={styles.coordinatesText}>
                  Lng: {point.coordinates.longitude.toFixed(6)}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.openMapButton}
                onPress={() => openInMaps(point)}
              >
                <Ionicons name="map" size={20} color={colors.white} />
                <Text style={styles.openMapButtonText}>Ver en Google Maps</Text>
                <Ionicons name="open-outline" size={16} color={colors.white} />
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.mapInfoCard}>
            <Ionicons name="information-circle" size={24} color={colors.secondary} />
            <Text style={styles.mapInfoText}>
              Para una mejor experiencia de navegación, las ubicaciones se abren en Google Maps.
            </Text>
          </View>
        </ScrollView>
      )}
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
  infoBox: {
    backgroundColor: colors.secondary + '10',
    padding: spacing.md,
    borderRadius: borderRadius.medium,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  infoText: {
    fontSize: fontSize.small,
    color: colors.text,
    marginLeft: spacing.sm,
    flex: 1,
  },
  wifiCard: {
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
  wifiHeader: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  wifiIcon: {
    width: 60,
    height: 60,
    backgroundColor: colors.secondary + '20',
    borderRadius: borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wifiInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  wifiName: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  wifiAddress: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
  },
  wifiDetails: {
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  detailText: {
    fontSize: fontSize.medium,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  directionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  directionButtonText: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    color: colors.primary,
    marginLeft: spacing.xs,
  },
  tipCard: {
    backgroundColor: colors.warning + '10',
    padding: spacing.lg,
    borderRadius: borderRadius.large,
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  tipContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  tipTitle: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  tipText: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  mapPlaceholder: {
    backgroundColor: colors.white,
    padding: spacing.xl,
    borderRadius: borderRadius.large,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  mapPlaceholderTitle: {
    fontSize: fontSize.xlarge,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  mapPlaceholderText: {
    fontSize: fontSize.medium,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  mapCard: {
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
  mapCardHeader: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  mapCardInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  mapCardName: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  mapCardAddress: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
  },
  coordinatesBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.sm,
    borderRadius: borderRadius.small,
    marginBottom: spacing.md,
  },
  coordinatesText: {
    fontSize: fontSize.small,
    color: colors.text,
    marginLeft: spacing.xs,
  },
  coordinatesSeparator: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
    marginHorizontal: spacing.xs,
  },
  openMapButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    borderRadius: borderRadius.medium,
  },
  openMapButtonText: {
    color: colors.white,
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    marginLeft: spacing.xs,
    marginRight: spacing.xs,
  },
  mapInfoCard: {
    backgroundColor: colors.secondary + '10',
    padding: spacing.lg,
    borderRadius: borderRadius.large,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  mapInfoText: {
    fontSize: fontSize.small,
    color: colors.text,
    marginLeft: spacing.md,
    flex: 1,
    lineHeight: 18,
  },
});
