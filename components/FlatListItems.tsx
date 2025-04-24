import {Link} from "expo-router";
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {Contact} from "@/types/contact";
import {adjustColor} from "@/utils/Color";
import { Colors } from "@/constants/Colors";

const FlatListItems = ({item}: {item: Contact}) => {

  if (Object.keys(item).length === 0) {
    return <View style={{width: 80, height: 80}}></View>;
  }

  const getFirstLetterUpperCase = (str: string) => {
    return str.charAt(0).toUpperCase();
  }

  function sumCharacters(str: string): number {
    return str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  }

  const firstLetter = getFirstLetterUpperCase(item.firstName);
  const phone = parseInt(item.phone.replace(/\s/g, ''))
  let bright = phone % 40;
  if (phone % 2) {
    bright = -bright;
  }
  const hexColor = adjustColor(Colors['light'].iconColors[sumCharacters(item.firstName) % 5], bright);

  return (
    <Pressable>
      <Link href={{
        pathname: '/contacts/(tabs)/(message)/[id]',
        params: { id: item.id ?? "0" }
      }}>
        <View style={styles.container}>

          {item.img ? (
            <Image
              style={styles.dot}
              source={{uri: item.img}}
            />
          ):(
            <View style={[styles.dot, {backgroundColor: hexColor}]}>
              <Text style={styles.capitalLetter}>{firstLetter}</Text>
            </View>
          )}
          <Text style={styles.text}>{item.firstName}</Text>
        </View>
      </Link>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    paddingBottom: 12,
    alignItems: "center",
  },
  capitalLetter: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: "auto",
  },
  dot: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  text: {
    marginLeft: 16,
  },
});

export default FlatListItems;