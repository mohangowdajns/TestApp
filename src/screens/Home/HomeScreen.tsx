import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../../navigation/MainTabs";
import { View, Text } from "react-native";

type Props = BottomTabScreenProps<TabParamList, "Home">;

export default function HomeScreen({ navigation, route }: Props) {
  return (
    <View><Text>🏠 Home</Text></View>
  );
}
