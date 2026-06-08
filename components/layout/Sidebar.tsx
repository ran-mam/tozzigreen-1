import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { Href, usePathname, useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SidebarItem from "./SidebarItem";
import AsyncStorage from '@react-native-async-storage/async-storage';

const NAV_ITEMS = [
  { id: "index", label: "Accueil", icon: "home" },
  { id: "historique", label: "Historique", icon: "clock" },
  { id: "notification", label: "Notifications", icon: "bell" },
  { id: "settings", label: "Paramètres", icon: "settings" },
] as const;

export default function Sidebar(props: any) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();
  const themeColors = Colors[theme];
  const isDark = theme === "dark";

  const logoSrc = isDark
    ? require("@/assets/images/tozzigreen-dark.jpeg")
    : require("@/assets/images/tozzigreen-light.jpeg");

  const isActive = (id: string) =>
    id === "index" ? pathname === "/" : pathname.includes(id);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.card }]}>
      {/* Profile header */}
      <TouchableOpacity
        onPress={() => {
          router.push("/");
          props.navigation.closeDrawer();
        }}
      >
        <Image source={logoSrc} style={styles.logoImage} resizeMode="contain" />
      </TouchableOpacity>

      {/* Nav items */}
      <ScrollView style={styles.nav} showsVerticalScrollIndicator={false}>
        {NAV_ITEMS.map(({ id, label, icon }) => (
          <SidebarItem
            key={id}
            label={label}
            active={isActive(id)}
            icon={
              <Feather
                name={icon as any}
                size={20}
                color={
                  isActive(id)
                    ? Colors.light.primary
                    : themeColors.textSecondary
                }
              />
            }
            onPress={() => {
              const path = id === "index" ? "/" : `/${id}`;
              router.push(path as Href);
              props.navigation.closeDrawer();
            }}
          />
        ))}
      </ScrollView>

      {/* Logout */}
      <View style={[styles.footer, { borderTopColor: themeColors.border }]}>
        <TouchableOpacity
          style={styles.logout}
          activeOpacity={0.7}
          onPress={async () => {
            await AsyncStorage.removeItem('token');
            router.replace("/login" as any);
          }}
        >
          <Feather name="log-out" size={20} color="#e53e3e" />
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
    marginBottom: 10,
  },
  name: { fontWeight: "800", fontSize: 16 },
  email: { fontSize: 12, marginTop: 2 },
  nav: { flex: 1, paddingVertical: 12 },
  footer: { borderTopWidth: 1, paddingVertical: 16 },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  logoutText: { fontSize: 14, fontWeight: "600", color: "#e53e3e" },
  logoImage: {
    marginTop: 20,
    alignSelf: "center",
    width: 180,
    height: 50,
  },
});