import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../../navigation/MainTabs";
import { View, Text, StyleSheet } from "react-native";
import SolarPage from "../../components/SolarPage1";


type Props = BottomTabScreenProps<TabParamList, "Home">;

export default function HomeScreen({ navigation, route }: Props) {
  return (
    <SolarPage/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});