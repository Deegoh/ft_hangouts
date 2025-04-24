import {Tabs, useLocalSearchParams} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export const unstable_settings = {
  initialRouteName: '(message)/[id]',
};

const TabLayout = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Tabs>
      <Tabs.Screen name="(message)/[id]"
        options={{

          title: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" color={color} size={size} />
          ),
          href: {
            pathname: '/contacts/(tabs)/(message)/[id]',
            params: {
              id: id,
            },
          },
        }}
      />

      <Tabs.Screen name="(edit)/[id]"
        options={{
          title: 'Edit',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="user-pen" color={color} size={size} />
          ),
          href: {
            pathname: '/contacts/(tabs)/(edit)/[id]',
            params: {
              id: id,
            },
          },
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
