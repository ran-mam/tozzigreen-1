// components/layout/Sidebar.tsx
import { Colors } from "@/constants/Colors";
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

const NAV_ITEMS = [
  { id: "index", label: "Accueil", icon: "home" },
  // { id: "facturation", label: "Facturation", icon: "file-text" },
  { id: "historique", label: "Historique", icon: "clock" },
  // { id: "consommation", label: "Consommation", icon: "zap" },
  { id: "notification", label: "Notifications", icon: "bell" },
  { id: "settings", label: "Paramètres", icon: "settings" },
  // { id: "profile", label: "Mon Profil", icon: "user" },
] as const;

export default function Sidebar(props: any) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (id: string) =>
    id === "index" ? pathname === "/" : pathname.includes(id);

  return (
    <View style={styles.container}>
      {/* Profile header */}
      <TouchableOpacity
        onPress={() => {
          router.push("/");
          props.navigation.closeDrawer();
        }}
      >
        <Image
          source={require('@/assets/images/tozzigreen-logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
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
                color={isActive(id) ? Colors.primary : "#555"}
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
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.logout}
          activeOpacity={0.7}
          onPress={() => {
            router.replace('/login' as any);
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
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: Colors.primary,
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
  name: { color: "#fff", fontWeight: "800", fontSize: 16 },
  email: { color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 2 },
  nav: { flex: 1, paddingVertical: 12 },
  footer: { borderTopWidth: 1, borderTopColor: "#eee", paddingVertical: 16 },
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
