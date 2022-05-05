import { ArrowLeft } from "phosphor-react-native";
import React, { useState } from "react";
import { captureScreen } from "react-native-view-shot";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { theme } from "../theme";

import * as FileSystem from "expo-file-system";

import { FeedbackType } from "../components/Widget";
import { ScreenshotButton } from "../components/ScreenshotButton";
import { Button } from "../components/Button";

import { feedbackTypes } from "../utils/feedbackTypes";

import { styles } from "./styles";
import { api } from "../libs/api";

interface IProps {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({
  feedbackType,
  onFeedbackCanceled,
  onFeedbackSent,
}: IProps) {
  const [isSendingFeeback, setIsSendingFeeback] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const feedbackTypesInfo = feedbackTypes[feedbackType];

  function handleScreenshot() {
    captureScreen({
      format: "jpg",
      quality: 0.8,
    })
      .then((uri) => setScreenshot(uri))
      .catch((error) => console.error(error));
  }

  function handleScreenshotRemove() {
    setScreenshot(null);
  }

  async function handleSendFeedback() {
    if (isSendingFeeback) {
      return;
    }

    setIsSendingFeeback(true);

    const screenshotBase64 =
      screenshot &&
      (await FileSystem.readAsStringAsync(screenshot, { encoding: "base64" }));

    try {
      await api.post("/feedbacks", {
        type: feedbackType,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
        comment,
      });

      onFeedbackSent();
    } catch (error) {
      console.log(error);

      setIsSendingFeeback(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypesInfo.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackTypesInfo.title}</Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que esta acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
        />

        <Button onPress={handleSendFeedback} isLoading={isSendingFeeback} />
      </View>
    </View>
  );
}
