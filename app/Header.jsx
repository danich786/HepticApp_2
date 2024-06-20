import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { FontSize, FontFamily, Color, Padding } from "./GlobalStyles";

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.hapticQuranAppParent}>
        <Image
          style={styles.hapticQuranApp}
          contentFit="cover"
          source={require("../assets/images/text_logo.svg")}
        />
        <Image
          style={styles.tayyaibahUniversity2}
          contentFit="cover"
          source={require("../assets/images/logo.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hapticQuranApp: {
    textAlign: "left",
    width: 120,
    height: 50,
    overflow: "hidden",
  },
  tayyaibahUniversity2: {
    width: 40,
    height: 50,
    overflow: "hidden",
  },
  hapticQuranAppParent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Padding.p_xl,
    paddingVertical: 0,
    alignSelf: "stretch",
  },
  header: {
    backgroundColor: Color.colorSkyblue,
    justifyContent: "center",
    paddingHorizontal: 0,
    paddingVertical: Padding.p_xs,
    alignSelf: "stretch",
    paddingTop: 50,
  },
});

export default Header;
