import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, Border, FontSize, Color, Padding } from "../GlobalStyles";
import Header from "../Header";
import { Image } from "expo-image";
import { useState, useEffect } from "react";
import Voice from "@react-native-voice/voice";

const androidPermissionChecking = async () => {
  if (Platform.OS === "android") {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    );
  }
};

export default function Home() {
  const [isListening, setIsListening] = useState(false);
  const [recognisedText, setRecognisedText] = useState("");

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = stopListening;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = (error) => console.log("On Speech Error:", error);

    const androidPermissionChecking = async () => {
      if (Platform.OS === "android") {
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        );
        const getService = await Voice.getSpeechRecognitionServices();
        console.log("Listening Service:", getService);
      }
    };
    androidPermissionChecking();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (event) => {
    console.log("Recording Started...", event);
  };

  const onSpeechResults = (event) => {
    console.log("on Speech Results : ", event);
    const text = event.value[0];
    setRecognisedText(text);
  };

  const startListening = async () => {
    setIsListening(true);
    try {
      await Voice.start("ar");
    } catch (error) {
      console.log(" start listening - error: ", error);
    }
  };

  const stopListening = async () => {
    try {
      Voice.removeAllListeners();
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.log("stop listening - error: ", error);
    }
  };

  return (
    <LinearGradient
      style={[styles.mainScreen, styles.containerFlexBox]}
      locations={[0, 1]}
      colors={["rgba(118, 223, 255, 0.15)", "rgba(0, 173, 224, 0.5)"]}
    >
      <Header />
      <View style={styles.titlewrapper}>
        <Text style={styles.titleText}>{"صوت إلى نص"}</Text>
      </View>
      <ScrollView>
        <View style={styles.home}>
          <View style={[styles.homeInner, styles.wrapperFlexBox]}>
            <View>
              <Text style={styles.translationText}>
                {recognisedText == "" && !isListening ? (
                  <>{"يرجى الضغط على زر الميكروفون لبدء التسجيل"}</>
                ) : (
                  <>{isListening ? <>{"بدأ التسجيل"}"</> : recognisedText}</>
                )}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.home}>
        <ImageBackground
          style={styles.micboxIcon}
          resizeMode="cover"
          source={require("../../assets/images/micbox.png")}
        >
          <View>
            {isListening ? (
              <TouchableOpacity
                onPress={() => {
                  stopListening();
                }}
              >
                <Image
                  style={styles.micboxChild}
                  contentFit="cover"
                  source={require("../../assets/images/stop_button.png")}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  startListening();
                }}
              >
                <Image
                  style={styles.micboxChild}
                  contentFit="cover"
                  source={require("../../assets/images/group-1.png")}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={[styles.wrapper, styles.textLayout]}>
            <Text style={[styles.text, styles.textLayout]}>تكلم{` `}الآن</Text>
          </View>
        </ImageBackground>
        {/* <Footer /> */}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  containerFlexBox: {
    overflow: "hidden",
    flex: 1,
    alignItems: "center",
  },
  wrapperFlexBox: {
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  titleText: {
    fontSize: 30,
    fontFamily: FontFamily.adelleSansDevanagari,
    textAlign: "center",
    color: Color.colorSteelblue_100,
  },
  text: {
    // fontSize: 50,
    lineHeight: 16,
    fontFamily: FontFamily.adelleSansDevanagari,
    textAlign: "center",
  },
  translationText: {
    fontSize: 16,
    lineHeight: 25,
  },
  titlewrapper: {
    paddingTop: 50,
    alignItems: "center",
  },
  wrapper: {
    height: 48,
    alignItems: "center",
  },
  text1: {
    fontSize: 18,
    letterSpacing: 0.4,
    lineHeight: 32,
    fontFamily: FontFamily.abelRegular,
    textAlign: "right",
    alignSelf: "stretch",
  },
  container: {
    borderStyle: "solid",
    borderColor: "rgba(24, 144, 255, 0.35)",
    borderWidth: 1,
    padding: 10,
    height: 270,
    alignItems: "center",
  },
  homeInner: {
    paddingHorizontal: 15,
    paddingVertical: 0,
  },
  home: {
    marginTop: 30,
    alignSelf: "stretch",
    alignItems: "center",
  },
  mainScreen: {
    borderTopLeftRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  //
  textLayout: {
    height: 29,
    width: 201,
  },
  micboxChild: {
    width: 180,
    height: 180,
  },
  text: {
    position: "absolute",
    top: 0,
    left: 0,
    // fontSize: FontSize.size_9xl,
    // lineHeight: 16,
    fontWeight: "700",
    fontFamily: FontFamily.simplifiedArabic,
    color: Color.colorWhite,
    textAlign: "center",
  },
  wrapper: {
    marginTop: 25,
  },
  micboxIcon: {
    alignSelf: "stretch",
    borderTopLeftRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
    height: 274,
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: Padding.p_xl,
  },
});
