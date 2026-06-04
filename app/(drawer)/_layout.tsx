import Sidebar from "@/components/layout/Sidebar";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DrawerLayout() {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          drawerContent={(props) => <Sidebar {...props} />}
          screenOptions={{ headerShown: false }}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}