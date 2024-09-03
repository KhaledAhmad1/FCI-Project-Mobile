import React, { useState } from 'react';
import { View, StyleSheet, Button, ActivityIndicator } from 'react-native';
import Pdf from 'react-native-pdf';

const PdfViewer = () => {
  const [pdfUri, setPdfUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const openPdf = () => {
    const url = 'https://www.pdf995.com/samples/pdf.pdf'; 
    setPdfUri(url);
  };

  return (
    <View style={styles.container}>
      <Button title="Open PDF" onPress={openPdf} />
      {pdfUri && (
        <View style={styles.frame}>
          {loading && (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
          <Pdf
            source={{ uri: pdfUri, cache: true }}
            onLoadStart={() => setLoading(true)}
            onLoadComplete={() => setLoading(false)}
            onError={(error) => {
              console.log(error);
              setLoading(false);
            }}
            style={styles.pdf}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame: {
    width: '90%',
    height: '80%',
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PdfViewer;
