import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  ImageProps,
} from "react-native";

import { styles } from "./styles";

interface IProps extends TouchableOpacityProps {
  title: string;
  image: ImageProps;
}
export function Option({ title, image, ...rest }: IProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Image source={image} style={styles.image} />

      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
