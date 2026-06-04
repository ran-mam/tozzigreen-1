import { Layout } from "@/constants/Layout";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: Layout.borderRadius,
    padding: 16,
    marginBottom: 10,
    ...Layout.cardShadow,
  },
});
