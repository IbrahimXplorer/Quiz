import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useQuiz } from '../context/QuizContext';

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
          style={[styles.option, selected[index] === opt && styles.selected]}
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
        style={[styles.nextBtn, !isAnswered && styles.disabledBtn]}
        onPress={handleNext}
        disabled={!isAnswered}
      >
        <Text style={styles.nextText}>
          {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  questionContainer: { padding: 20, justifyContent: 'center' },
  question: { fontSize: 18, marginBottom: 20 },
  progress: { fontSize: 16, marginBottom: 10, color: '#666' },
  option: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 5,
    borderColor: '#ccc',
  },
  selected: { backgroundColor: '#cce5ff', borderColor: '#007bff' },
  nextBtn: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    margin: 20,
  },
  disabledBtn: {
    backgroundColor: '#a0a0a0',
  },
  nextText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});

export default QuizScreen;
