import { Text, View, StyleSheet } from "react-native";

export default function User() {
  return (
    <View style={styles.container}>
      <Text>User</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightred",
    alignItems: "center",
    justifyContent: "center",
  },
});
