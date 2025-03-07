import { useRouter } from "expo-router";
import { Text, View, StyleSheet, Button } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";

export default function Index() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [isbn, setIsbn] = useState(null);

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
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={(scanningResult) => {
          if (!isbn) {
            setIsbn(scanningResult.data);
            router.push(`/${scanningResult.data}`);
          }
        }}
      />
      <Button
        title="Reset"
        onPress={() => {
          setIsbn(null);
        }}
      />
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
