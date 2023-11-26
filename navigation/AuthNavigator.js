import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../src/screens/Home';
import SignIn from '../src/screens/userAuth/SignIn';
import SignUp from '../src/screens/userAuth/SignUp';
const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
