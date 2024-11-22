import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";

export default function ContactsScreen() {
    const {id} = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({headerShown: false});
    }, [navigation])
    
    return (
        <View>
            <Text>
                Hello contact {id}
            </Text>
        </View>
    );
}