import React from 'react';
import {Pressable, StyleSheet} from "react-native";

interface ButtonProps {
  children: React.ReactNode;
  onPress?: any;
  props?: any;
}

function Button(ButtonProps : ButtonProps) {
  return (
    <Pressable
      {...ButtonProps.props}
      android_ripple={
        {color: "rgba(0, 0, 0, 0.2)"}
      }
      onPress={ButtonProps.onPress}
      style={styles.btn}>
      {ButtonProps.children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
    backgroundColor: "#CCC",
  },
});

export default Button;