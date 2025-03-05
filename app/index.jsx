import { Link } from "expo-router";
import { Text, View, StyleSheet, Button } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera}></CameraView>
      <Link href="book-details">Go to Details</Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 12,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
});
