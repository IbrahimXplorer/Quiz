import React from 'react';
import Navigator from './navigation';

export type RootStackParamList = {
  Quiz: undefined;
  Result: { total: number; score: number };
};

export default function App() {
  return (
     <Navigator/>
  );
}
