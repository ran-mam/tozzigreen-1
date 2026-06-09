import { BrandColors, Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SidebarItemProps {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onPress: () => void;
}

export default function SidebarItem({
  label,
  icon,
  active,
  onPress,
}: SidebarItemProps) {
  const { theme } = useTheme();
  const themeColors = Colors[theme];

  // dynamic active background
  const activeBackground = theme === "dark" ? "#2d2d2d" : "#f0f9e5";

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.item,
        active && {
          backgroundColor: activeBackground,
          borderLeftColor: BrandColors.primary,
        },
      ]}
    >
      <View style={styles.iconWrap}>{icon}</View>
      <Text
        style={[
          styles.label,
          { color: themeColors.textSecondary }, // inactive → textSecondary
          active && { color: BrandColors.primary }, // active → brand primary
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderLeftWidth: 3,
    borderLeftColor: "transparent",
  },
  iconWrap: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
});