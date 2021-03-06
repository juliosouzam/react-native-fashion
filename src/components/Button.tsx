import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

interface ButtonProps {
  label: string;
  variant: "primary" | "default";
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: "SFProText-Regular",
    fontSize: 15,
    textAlign: "center",
  },
});

const Button: React.FC<ButtonProps> = ({ variant, label, onPress }) => {
  const backgroundColor =
    variant === "primary" ? "#2cb9b0" : "rgba(12, 13, 52, 0.05)";
  const color = variant === "primary" ? "white" : "#0c0d34";

  return (
    <RectButton
      style={[styles.container, { backgroundColor }]}
      {...{ onPress }}
    >
      <Text style={[styles.label, { color }]}>{label}</Text>
    </RectButton>
  );
};

Button.defaultProps = {
  variant: "default",
};

export default Button;
