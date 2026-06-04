import Sidebar from "@/components/layout/Sidebar";
import { ThemeProvider } from "@/context/ThemeContext";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Text, TextInput } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

// Appliquer Roboto partout
(Text as any).defaultProps = (Text as any).defaultProps || {};
(Text as any).defaultProps.style = { fontFamily: "Roboto-Regular" };
(TextInput as any).defaultProps = (TextInput as any).defaultProps || {};
(TextInput as any).defaultProps.style = { fontFamily: "Roboto-Regular" };

export default function DrawerLayout() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("@/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("@/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("@/assets/fonts/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer
            drawerContent={(props) => <Sidebar {...props} />}
            screenOptions={{ headerShown: false }}
          />
        </GestureHandlerRootView>
      </SafeAreaView>
    </ThemeProvider>
  );
}
