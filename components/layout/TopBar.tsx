import {Colors} from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation, useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function TopBar() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const router = useRouter();
  const { theme } = useTheme();
  const themeColors = Colors[theme];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.card, borderBottomColor: themeColors.border }]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.replace("/")}
      >
        <Image
          source={require('@/assets/images/tozzigreen-logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Feather name="menu" size={24} color={themeColors.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    height: 60,
  },
  logoImage: {
    height: 36,
    width: 140,
  },
});