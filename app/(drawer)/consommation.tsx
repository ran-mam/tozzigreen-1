import TopBar from "@/components/layout/TopBar";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

const STATS = [
  { label: "Consommation totale", value: "0 kWh", color: Colors.light.primary },
  { label: "Moyenne journalière", value: "0 kWh", color: Colors.light.primaryDark },
  { label: "Coût estimé", value: "0 Ar", color: Colors.light.primary },
];

export default function ConsommationScreen() {
  const { theme } = useTheme();
  const themeColors = Colors[theme];

  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [stats, setStats] = useState(STATS);

  const handleSearch = () => {
    console.log('Recherche du', dateFrom.toLocaleDateString(), 'au', dateTo.toLocaleDateString());

    setStats([
      { label: "Consommation totale", value: "45 kWh", color: Colors.light.primary },
      { label: "Moyenne journalière", value: "3.2 kWh", color: Colors.light.primary },
      { label: "Coût estimé", value: "90 000 Ar", color: Colors.light.primary },
    ]);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const onChangeFrom = (_event: any, selectedDate?: Date) => {
    setShowFrom(Platform.OS === 'ios');
    if (selectedDate) setDateFrom(selectedDate);
  };

  const onChangeTo = (_event: any, selectedDate?: Date) => {
    setShowTo(Platform.OS === 'ios');
    if (selectedDate) setDateTo(selectedDate);
  };

  return (
    <View style={[styles.screen, { backgroundColor: themeColors.background }]}>
      <TopBar />
      <View style={[styles.titleBar, { backgroundColor: Colors.light.primary }]}>
        <Text style={styles.titleText}>Consommation</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Filtre période */}
        <View style={[styles.filterCard, { backgroundColor: themeColors.card }]}>
          <Text style={[styles.filterTitle, { color: themeColors.text }]}>
            Période
          </Text>

          {/* Date Début */}
          <TouchableOpacity
            style={styles.dateRow}
            onPress={() => setShowFrom(true)}
          >
            <Feather name="calendar" size={18} color={Colors.light.primary} />
            <Text style={[styles.dateLabel, { color: themeColors.textSecondary }]}>Du :</Text>
            <Text style={[styles.dateValue, { color: themeColors.text }]}>
              {formatDate(dateFrom)}
            </Text>
          </TouchableOpacity>

          {/* Date Fin */}
          <TouchableOpacity
            style={styles.dateRow}
            onPress={() => setShowTo(true)}
          >
            <Feather name="calendar" size={18} color={Colors.light.primary} />
            <Text style={[styles.dateLabel, { color: themeColors.textSecondary }]}>Au :</Text>
            <Text style={[styles.dateValue, { color: themeColors.text }]}>
              {formatDate(dateTo)}
            </Text>
          </TouchableOpacity>

          {/* Bouton Rechercher */}
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
            <Feather name="search" size={16} color="#fff" />
            <Text style={styles.searchText}>Rechercher</Text>
          </TouchableOpacity>
        </View>

        {/* Résultats */}
        {stats.map(({ label, value, color }) => (
          <View
            key={label}
            style={[
              styles.card,
              { backgroundColor: themeColors.card, borderLeftColor: color },
            ]}
          >
            <Text style={[styles.label, { color: themeColors.textSecondary }]}>
              {label}
            </Text>
            <Text style={[styles.value, { color: themeColors.text }]}>{value}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Picker Date Début */}
      {showFrom && (
        <DateTimePicker
          value={dateFrom}
          mode="date"
          display="default"
          onChange={onChangeFrom}
          maximumDate={dateTo}
        />
      )}

      {/* Picker Date Fin */}
      {showTo && (
        <DateTimePicker
          value={dateTo}
          mode="date"
          display="default"
          onChange={onChangeTo}
          minimumDate={dateFrom}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  titleBar: { padding: 14 },
  titleText: { color: "#fff", fontWeight: "800", fontSize: 15 },
  content: { padding: 18 },
  filterCard: {
    borderRadius: 12,
    padding: 18,
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 14,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  dateValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  searchBtn: {
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 4,
  },
  searchText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  card: {
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeftWidth: 4,
  },
  label: { fontSize: 14, fontWeight: "500" },
  value: { fontSize: 20, fontWeight: "900" },
});