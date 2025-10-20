import React, { memo } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Course } from '../types/course';

interface CourseCardProps {
  course: Course;
  onPress?: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      activeOpacity={0.85}
      onPress={() => onPress?.(course)}
    >
      <FastImage
        style={styles.image}
        source={{
          uri: course.imageUrl,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {course.title}
        </Text>
        <Text style={styles.instructor} numberOfLines={1}>
          {course.instructor}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(CourseCard);

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginHorizontal:10,
    borderRadius:10
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  instructor: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
