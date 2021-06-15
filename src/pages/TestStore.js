import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { changeCount } from '../store/actions/counts';

export const TestStore = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count.count);

  const incrementCount = () => {
    dispatch(changeCount(count + 1));
  };

  const decrementCount = () => {
    dispatch(changeCount(count - 1));
  };

  return (
    <View>
      <Button title="increment" onPress={() => incrementCount()} />
      <Text>{count}</Text>
      <Button title="decrement" onPress={() => decrementCount()} />
    </View>
  );
};
