import React, { ReactElement } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuiz } from '../context/QuizContext';

export const ResultScreen = (): ReactElement => {
  const navigation = useNavigation<any>();
  const { questions, score, resetQuiz } = useQuiz();

  const total = questions.length;

  const renderItem = ({ item, index }: any) => {
    const isCorrect = item.userAnswer === item.answer;
    return (
      <View
        style={[
          styles.questionCard,
          isCorrect ? styles.correctCard : styles.wrongCard,
        ]}
      >
        <Text style={styles.questionText}>
          {index + 1}. {item.question}
        </Text>
        <Text style={styles.answerText}>
          Your Answer:{' '}
          <Text style={isCorrect ? styles.correctText : styles.wrongText}>
            {item.userAnswer ?? 'Not answered'}
          </Text>
        </Text>
        <Text style={styles.correctAnswer}>Correct Answer: {item.answer}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Completed</Text>
      <Text style={styles.score}>
        You scored {score} out of {total}
      </Text>

      <FlatList
        data={questions}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            resetQuiz();
            navigation.navigate('Quiz');
          }}
        >
          <Text style={styles.btnText}>Try Again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.secondaryBtn]}
          onPress={() => navigation.navigate('Courses')}
        >
          <Text style={styles.btnText}>Go to Courses</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },
  score: { fontSize: 18, textAlign: 'center', marginVertical: 10 },
  message: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  questionCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
  },
  questionText: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  answerText: { fontSize: 15, marginBottom: 3 },
  correctAnswer: { fontSize: 15, color: '#444' },
  correctCard: { borderColor: '#28a745', backgroundColor: '#e6f9ed' },
  wrongCard: { borderColor: '#dc3545', backgroundColor: '#fdecea' },
  correctText: { color: '#28a745', fontWeight: '600' },
  wrongText: { color: '#dc3545', fontWeight: '600' },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 30,
  },
  btn: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  secondaryBtn: { backgroundColor: '#6c757d' },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});

export default ResultScreen;
