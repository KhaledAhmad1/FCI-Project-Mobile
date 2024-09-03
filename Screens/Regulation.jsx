import React from 'react';
import { SafeAreaView } from 'react-native';
import PdfViewer from "../components/PdfViewer"

const PdfPage = () => {
  const pdfUri = './File.pdf'; 


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PdfViewer uri={pdfUri} />
    </SafeAreaView>
  );
};

export default PdfPage;
