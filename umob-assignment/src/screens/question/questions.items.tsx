import { useNavigation } from "@react-navigation/native";
import AnimatedLottieView from "lottie-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LatLng } from "react-native-maps";
import { Button, RadioButton } from "react-native-paper";

interface IQuestionsItems {
  question: string;
  options: { title: string; is_correct: boolean }[];
  location?: LatLng[];
  hasMap?: boolean;
  setScore: (value: number) => void;
  score: number;
  goNext: () => void;
}

function QuestionsItems(props: IQuestionsItems) {
  const { question, options, hasMap, location, setScore, score, goNext } =
    props;

  const [selected, setSelected] = useState<string>("");

  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question}</Text>
      {hasMap ? (
        <Button
          mode={"text"}
          style={styles.mapButton}
          onPress={() => {
            navigate("MapScreen", { locations: location ?? [] });
          }}
        >
          Show Map
        </Button>
      ) : null}

      <RadioButton.Group
        onValueChange={(title) => {
          setSelected(title);
          options?.forEach((item) => {
            if (item.title === title && item.is_correct === true) {
              setScore(score + 50);
            } else if (item.title === title && item.is_correct !== true) {
              setScore(score - 20);
            }
            goNext();
          });
        }}
        value={selected}
      >
        {options?.map((i, index) => (
          <RadioButton.Item label={i.title} value={i.title} key={`${i.title}-${index}`} />
        ))}
      </RadioButton.Group>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "4%",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  mapButton: {
    marginVertical: "4%",
  },
});

export default React.memo(QuestionsItems);
