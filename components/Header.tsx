import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

type HeaderProps = {
  title?: string,
  children?: React.ReactNode,
  onBack?: () => void
};

function Header({title, children, onBack}: HeaderProps) {
  return (
    <View style={[styles.row, {justifyContent: "space-between"}]}>
      <View style={styles.row}>
        {onBack && (
          <Pressable style={{marginRight: 24}} onPress={onBack}><FontAwesome6 name="arrow-left" size={18} color="black"/></Pressable>
        )}
        <Text style={styles.txt}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  txt: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Header;