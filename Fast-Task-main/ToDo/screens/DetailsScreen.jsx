import React from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';

export default function DetailsScreen({ route }) {
  const { title, description } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerDecor} />
      <View style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>{title}</Text>
        <View style={styles.separator} />
        <Text style={styles.detailsDescription}>{description}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f6fc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerDecor: {
    width: '100%',
    height: 120,
    backgroundColor: '#007bff',
    position: 'absolute',
    top: 0,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    zIndex: -1,
  },
  detailsCard: {
    backgroundColor: '#fff',
    padding: 32,
    borderRadius: 24,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  detailsTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 12,
    textAlign: 'center',
  },
  separator: {
    width: 60,
    height: 3,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginBottom: 18,
  },
  detailsDescription: {
    fontSize: 18,
    color: '#444',
    textAlign: 'center',
    lineHeight: 26,
  },
});
