import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import RooteNavigator from './RooteNavigator';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';

const AppRouter = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  console.log(user);
  // const user = useSelector(state => state.authUser.authenticated);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  return (
    <NavigationContainer>
      {!user ? <AuthNavigator /> : <RooteNavigator />}
    </NavigationContainer>
  );
};

export default AppRouter;
