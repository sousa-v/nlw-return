import { Camera, Trash } from "phosphor-react-native";
import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { theme } from "../../theme";

import { styles } from "./styles";
interface IProps {
  screenshot: string | null;
  onTakeShot: () => void;
  onRemoveShot: () => void;
}
export function ScreenshotButton({
  screenshot,
  onRemoveShot,
  onTakeShot,
}: IProps) {
  return (
    <TouchableOpacity
      onPress={screenshot ? onRemoveShot : onTakeShot}
      style={styles.container}
    >
      {screenshot ? (
        <View>
          <Image style={styles.image} source={{ uri: screenshot }} />

          <Trash
            size={22}
            weight="fill"
            color={theme.colors.text_secondary}
            style={styles.removeIcon}
          />
        </View>
      ) : (
        <Camera size={24} weight="bold" color={theme.colors.text_primary} />
      )}
    </TouchableOpacity>
  );
}
