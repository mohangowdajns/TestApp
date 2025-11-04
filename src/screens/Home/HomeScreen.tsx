import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../../navigation/MainTabs";
import { View, Text, StyleSheet } from "react-native";


type Props = BottomTabScreenProps<TabParamList, "Home">;

export default function HomeScreen({ navigation, route }: Props) {
  return (
    <View style={styles.container}>
     <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});