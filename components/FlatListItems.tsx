import {Link} from "expo-router";
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {Contact} from "@/types/contact";
import {generateColor} from "@/utils/Color";

const FlatListItems = ({item}: {item: Contact}) => {

  if (Object.keys(item).length === 0) {
    return <View style={{width: 80, height: 80}}></View>;
  }

  const getFirstLetterUpperCase = (str: string) => {
    return str.charAt(0).toUpperCase();
  }

  const firstLetter = getFirstLetterUpperCase(item.firstName);
  const hexColor = generateColor(firstLetter, item.phone);

  return (
    <Pressable>
      <Link href={`/contacts/${item.id}`}>
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
    paddingBottom: 16,
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