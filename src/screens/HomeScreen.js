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
import { useAuth } from '../context/AuthContext';
import { colors, spacing, fontSize, borderRadius } from '../constants/theme';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();

  const menuItems = [
    {
      id: '1',
      title: 'Telemedicina',
      icon: 'medical',
      color: '#E91E63',
      screen: 'Telemedicine',
      description: 'Agenda citas médicas',
    },
    {
      id: '2',
      title: 'Cursos Digitales',
      icon: 'school',
      color: '#3F51B5',
      screen: 'Courses',
      description: 'Aprende nuevas habilidades',
    },
    {
      id: '3',
      title: 'Puntos WiFi',
      icon: 'wifi',
      color: '#00BCD4',
      screen: 'WiFi',
      description: 'Encuentra conexión gratis',
    },
    {
      id: '4',
      title: 'Trámites Municipales',
      icon: 'document-text',
      color: '#FF9800',
      screen: 'Tramites',
      description: 'Gestiona tus trámites',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Biobío Digital</Text>
          <Text style={styles.headerSubtitle}>Bienvenido, {user?.name}</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuCard}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon} size={40} color={item.color} />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {user?.role === 'admin' && (
          <TouchableOpacity
            style={styles.adminButton}
            onPress={() => navigation.navigate('Admin')}
          >
            <Ionicons name="settings" size={20} color={colors.white} />
            <Text style={styles.adminButtonText}>Panel de Administración</Text>
          </TouchableOpacity>
        )}

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Acerca de Biobío Digital</Text>
          <Text style={styles.infoText}>
            Plataforma móvil diseñada para reducir la brecha digital en la Región del Biobío,
            integrando servicios esenciales en un solo ecosistema accesible para todos.
          </Text>
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
    fontSize: fontSize.xxlarge,
    fontWeight: 'bold',
    color: colors.primary,
  },
  headerSubtitle: {
    fontSize: fontSize.medium,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  logoutButton: {
    padding: spacing.sm,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.large,
    padding: spacing.lg,
    marginBottom: spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  menuTitle: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  menuDescription: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  adminButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.medium,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  adminButtonText: {
    color: colors.white,
    fontSize: fontSize.medium,
    fontWeight: 'bold',
    marginLeft: spacing.sm,
  },
  infoSection: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.large,
    marginBottom: spacing.lg,
  },
  infoTitle: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  infoText: {
    fontSize: fontSize.medium,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});
