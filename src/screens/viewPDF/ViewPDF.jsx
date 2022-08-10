import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import PDFReader from "rn-pdf-reader-js";
import { FontAwesome5 } from "@expo/vector-icons";

export default function ViewPDF({ navigation }) {
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          zIndex: 1,
          marginBottom: -21,
          marginTop: 24,
          position: "absolute",
          right: 0,
          margin: 4,
        }}
      >
        <FontAwesome5 name={"times"} size={30} color={"#fff"} />
      </TouchableOpacity>
      <PDFReader
        style={{ marginTop: 24 }}
        source={{
          uri: "https://youreflcorner.files.wordpress.com/2016/11/first-certificate-english-1-cambridge-revised-exam-from-2015.pdf",
        }}
      ></PDFReader>
    </>
  );
}
