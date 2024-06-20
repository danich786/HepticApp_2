import { StyleSheet, View, ScrollView, Text } from "react-native";
import { FontFamily, Border, FontSize, Color, Padding } from "../GlobalStyles";
import Header from "../Header";
import { LinearGradient } from "expo-linear-gradient";

export default function TabTwoScreen() {
  return (
    <LinearGradient
      style={[styles.mainScreen, styles.containerFlexBox]}
      locations={[0, 1]}
      colors={["rgba(118, 223, 255, 0.15)", "rgba(0, 173, 224, 0.5)"]}
    >
      <Header />
      <ScrollView>
        <View style={styles.viewBox}>
          <Text style={styles.text}>
            {"\n"}Haptic Quran App aims to help deaf and mute individuals by
            developing a novel Arabic teaching application. By converting voice
            into text, our application provides a seamless and efficient way for
            users to understand spoken language, making it an invaluable tool
            for the deaf and mute community, as well as for individuals with
            other communication impairments. {"\n\n"}
            This application leverages haptic technology to convert voice
            signals into tactile feedback, allowing users to perceive and
            understand the Arabic alphabet and Arabic language through
            vibration-based sign language. By integrating advanced technologies,
            customization options, and seamless integration with smart gloves,
            this project seeks to create a transformative learning experience
            for the deaf and mute individuals, empowering them to explore and
            the Arabic language independently.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    borderTopLeftRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  containerFlexBox: {
    overflow: "hidden",
    flex: 1,
    alignItems: "center",
  },
  viewBox: {
    margin: 20,
  },
  text: {
    fontSize: FontSize.size_large,
    lineHeight: 30,
  },
});
