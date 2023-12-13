import React from "react";
import {
  PDFViewer,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import { Item } from "@/queries/items";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    textAlign: "center",
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  table: {
    display: "flex",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#bfbfbf",
    alignItems: "center",
  },
  tableColHeader: {
    width: "33.33%",
    borderRightWidth: 1,
    borderRightColor: "#bfbfbf",
    padding: 5,
    fontWeight: "bold",
  },
  tableCol: {
    width: "33.33%",
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: "#bfbfbf",
  },
});

const PdfReport = ({ items, name }: { items: Item[]; name: string }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>User {name} item list</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>ID</Text>
              <Text style={styles.tableColHeader}>Name</Text>
              <Text style={styles.tableColHeader}>Description</Text>
            </View>
            {items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{index + 1}</Text>
                <Text style={styles.tableCol}>{item.name}</Text>
                <Text style={styles.tableCol}>{item.description}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfReport;
