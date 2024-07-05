import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/views/screens/LoginScreen";
import RegistrationScreen from "./src/views/screens/RegistrationScreen";
import HomeScreen from "./src/views/screens/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "./src/views/components/Loader";

const Stack = createNativeStackNavigator();
const App=()=>{
  const [initialRouteName,setInitialRouteName]=React.useState('');
  React.useEffect(()=>{
    setTimeout(authUser,2000);
  },[]);
  console.log("App page Enter.......");
  const authUser =()=>{
    setInitialRouteName('LoginScreen');
  }
  return(
    // <NavigationContainer>
      
    // </NavigationContainer>
    <NavigationContainer>
      {
        initialRouteName == ''?
        (<Loader visible={true} />):
        (
          <>
            <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{headerShown:false}}>
              <Stack.Screen name="RegistrationScreen" component={RegistrationScreen}/>
              <Stack.Screen name="LoginScreen" component={LoginScreen}/>
              <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            </Stack.Navigator>
          </>
        )
      }
    </NavigationContainer>
  );
};
export default App;