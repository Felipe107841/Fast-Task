import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home" 
          component={HomeScreen}
          options={{title: 'To-Do', headerStyle: {backgroundColor: '#007bff'}, headerTintColor: '#fff'}}
        /> 
        <Stack.Screen
          name="Details" 
          component={DetailsScreen}
          options={{title: 'Detalhes', headerStyle: {backgroundColor: '#007bff'}, headerTintColor: '#fff'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
