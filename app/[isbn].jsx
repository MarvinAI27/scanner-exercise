import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

export default function BookDetails() {
  const { isbn } = useLocalSearchParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookDetails() {
      try {
        setLoading(true);

        const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const bookData = data[`ISBN:${isbn}`]?.details;

        if (bookData) {
          setBookDetails(bookData);
        } else {
          setError("No details found for this ISBN.");
        }
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    }

    if (isbn) {
      fetchBookDetails();
    }
  }, [isbn]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {bookDetails.title} , {bookDetails.publishers.join(",")}
      </Text>

      <Image
        source={{ uri: bookDetails.thumbnail_url }}
        style={styles.thumbnail}
      />

      <Text style={styles.description}>
        {bookDetails.description || "No description available"}
      </Text>
      <Text style={styles.isbn}>ISBN: {isbn}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  thumbnail: {
    width: 100,
    height: 150,
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  isbn: {
    fontSize: 16,
    marginTop: 10,
  },
});
