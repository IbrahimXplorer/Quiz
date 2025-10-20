import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CourseCard from '../components/CourseCard';
import coursesData from '../data/courses.json';
import { Course } from '../types/course';

const COURSES_KEY = 'cachedCourses';

export const CoursesScreen: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { isInternetReachable } = useNetInfo();
  const safeAreaInsets = useSafeAreaInsets();

  const saveCoursesToStorage = useCallback(async (data: Course[]) => {
    try {
      await AsyncStorage.setItem(COURSES_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to cache courses:', error);
    }
  }, []);

  const loadCachedCourses = useCallback(async () => {
    try {
      const cached = await AsyncStorage.getItem(COURSES_KEY);
      if (cached) setCourses(JSON.parse(cached));
    } catch (error) {
      console.error('Error loading cached courses:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadOnlineCourses = useCallback(async () => {
    try {
      setCourses(coursesData);
      await saveCoursesToStorage(coursesData);
    } catch (error) {
      console.warn('Error loading courses online:', error);
      await loadCachedCourses();
    } finally {
      setIsLoading(false);
    }
  }, [saveCoursesToStorage, loadCachedCourses]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isInternetReachable) {
        loadOnlineCourses();
      } else {
        loadCachedCourses();
      }
    });

    if (!isInternetReachable) {
      loadCachedCourses();
    } else if (isInternetReachable) {
      loadOnlineCourses();
    }

    return () => unsubscribe();
  }, [isInternetReachable, loadOnlineCourses, loadCachedCourses]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Loading courses...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <StatusBar barStyle="dark-content" />
      {!isInternetReachable && (
        <Text style={styles.offlineText}>
          Offline mode: showing cached data
        </Text>
      )}
      <FlatList
        data={courses}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <CourseCard course={item} />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default CoursesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingBottom: 16,
  },
  offlineText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
  itemSeparator: {
    height: 10,
  },
});
