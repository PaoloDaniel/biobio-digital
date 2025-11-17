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
import MapView, { Marker } from 'react-native-maps';
import { useData } from '../../context/DataContext';
import { colors, spacing, fontSize, borderRadius } from '../../constants/theme';

export default function WiFiScreen({ navigation }) {
  const { wifiPoints } = useData();
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

  const region = {
    latitude: -36.8201,
    longitude: -73.0444,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
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
              </View>

              <TouchableOpacity
                style={styles.directionButton}
                onPress={() => setViewMode('map')}
              >
                <Ionicons name="navigate" size={20} color={colors.primary} />
                <Text style={styles.directionButtonText}>Ver en Mapa</Text>
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.tipCard}>
            <Ionicons name="bulb" size={24} color={colors.warning} />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Consejo</Text>
              <Text style={styles.tipText}>
                Asegúrate de tener WiFi activado en tu dispositivo para conectarte a estos
                puntos de acceso gratuito.
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.mapContainer}>
          <MapView style={styles.map} initialRegion={region}>
            {wifiPoints.map((point) => (
              <Marker
                key={point.id}
                coordinate={point.coordinates}
                title={point.name}
                description={point.address}
              >
                <View style={styles.markerContainer}>
                  <Ionicons name="wifi" size={32} color={colors.secondary} />
                </View>
              </Marker>
            ))}
          </MapView>

          <View style={styles.mapLegend}>
            <Ionicons name="wifi" size={24} color={colors.secondary} />
            <Text style={styles.legendText}>Puntos WiFi Disponibles: {wifiPoints.length}</Text>
          </View>
        </View>
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
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    backgroundColor: colors.white,
    padding: spacing.sm,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  mapLegend: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.lg,
    right: spacing.lg,
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.medium,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  legendText: {
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: spacing.sm,
  },
});
