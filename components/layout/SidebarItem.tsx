import { Colors } from "@/constants/Colors";
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
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.item, active && styles.activeItem]}
    >
      <View style={styles.iconWrap}>{icon}</View>
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
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
  activeItem: {
    backgroundColor: "#f0f9e5",
    borderLeftColor: Colors.primary,
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
    color: "#444",
  },
  activeLabel: {
    fontWeight: "700",
    color: Colors.dark,
  },
});
