import React from "react";
import { Page, Text, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  table: {
    display: "table",
    width: "auto",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    alignItems: "center",
  },
  cell: {
    padding: 5,
    fontSize: 12,
  },
});

function PDFResult({ formData, maxX, minX, maxY, minY, maxZ, minZ }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Result</Text>
        <Text>Step 1:</Text>
        <Text>Project Name: {formData.projectName}</Text>
        <Text>Project Description: {formData.projectDescription}</Text>
        <Text>Client: {formData.client}</Text>
        <Text>Contractor: {formData.contractor}</Text>

        <Text>Step 2:</Text>
        <Text>Max X: {maxX}</Text>
        <Text>Min X: {minX}</Text>
        <Text>Max Y: {maxY}</Text>
        <Text>Min Y: {minY}</Text>
        <Text>Max Z: {maxZ}</Text>
        <Text>Min Z: {minZ}</Text>
      </Page>
    </Document>
  );
}

export default PDFResult;
