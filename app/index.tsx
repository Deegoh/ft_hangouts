import { Link, useNavigation } from "expo-router";
import { Text, View } from "react-native";

export const Index = () => {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href='/contacts/1'>contact 1</Link>
      <Link href={{
        pathname: '/contacts/[id]',
        params: {id: '2'}
      }}>
      contact 2</Link>
    </View>
  );
}

export default Index;