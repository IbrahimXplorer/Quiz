import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useQuiz } from '../context/QuizContext';
import FastImage from 'react-native-fast-image';

const { width } = Dimensions.get('window');

export const QuizScreen = () => {
  const { questions, currentIndex, selectAnswer, nextQuestion, score } =
    useQuiz();
  const navigation = useNavigation<any>();
  const [selected, setSelected] = useState<{ [key: number]: string | null }>(
    {},
  );
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      navigation.navigate('Result', { total: questions.length, score });
    } else {
      nextQuestion();
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    }
  };

  const renderItem = ({ item, index }: any) => (
    <View style={[styles.questionContainer, { width }]}>
      <Text style={styles.progress}>
        Question {index + 1} of {questions.length}
      </Text>
      <Text style={styles.question}>{item.question}</Text>

      {item.options.map((opt: string) => (
        <TouchableOpacity
          key={opt}
          style={[
            styles.option,
            selected[index] === opt && styles.optionSelected,
          ]}
          onPress={() => {
            setSelected(prev => ({ ...prev, [index]: opt }));
            selectAnswer(opt);
          }}
        >
          <Text>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const isAnswered =
    selected[currentIndex] !== undefined && selected[currentIndex] !== null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <View style={styles.logoContainer}>
        <FastImage
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <FlatList
        ref={flatListRef}
        data={questions}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      <TouchableOpacity
        style={[styles.nextButton, !isAnswered && styles.nextButtonDisabled]}
        onPress={handleNext}
        disabled={!isAnswered}
      >
        <Text style={styles.nextButtonText}>
          {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
  logo: {
    width: 140,
    height: 60,
  },
  questionContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  progress: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#222',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },

  option: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginVertical: 6,
    backgroundColor: '#fafafa',
  },
  optionSelected: {
    backgroundColor: '#ffcd00',
    borderColor: '#ffcd00',
  },

  nextButton: {
    backgroundColor: '#ffcd00',
    paddingVertical: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 25,
  },
  nextButtonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  nextButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default QuizScreen;
