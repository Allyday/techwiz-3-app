import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text, Title, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export default function StudentInfo() {
  const { colors } = useTheme();
  const [student, setStudent] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getStudentData();
  }, []);

  const getStudentData = async () => {
    setLoading(true);
    const savedStudent = await AsyncStorage.getItem('user');
    setStudent(JSON.parse(savedStudent));
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.row, { marginBottom: 16}]}>
        <Avatar.Image
          size={40}
          source={{ uri: student.avatar_url }}
          style={styles.avatar}
        />
        <View>
          <Title>
            {student.first_name} {student.last_name}
          </Title>
          <Text>Class {student.class_name}</Text>
        </View>
      </View>
      <View style={[styles.row, styles.infoContainer]}>
        <Text style={styles.infoTitle}>Date of Birth</Text>
        <Text style={{ color: colors.secondary }}>
          {moment(student.date_of_birth).format('D MMM YYYY')}
        </Text>
      </View>
      <View style={[styles.row, styles.infoContainer]}>
        <Text style={styles.infoTitle}>Email</Text>
        <Text style={{ color: colors.secondary }}>{student.email}</Text>
      </View>
      <View style={[styles.row, styles.infoContainer]}>
        <Text style={styles.infoTitle}>Phone</Text>
        <Text style={{ color: colors.secondary }}>{student.phone}</Text>
      </View>
      <View style={[styles.row]}>
        <Text style={styles.infoTitle}>Parent/Guardian</Text>
        <Text style={{ color: colors.secondary }}>{student.parent_name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 24 },
  row: { flexDirection: 'row', alignItems: 'center' },
  avatar: { marginRight: 16 },
  infoContainer: { borderBottomWidth: 1, borderBottomColor: '#e8eaec' },
  infoTitle: { fontWeight: '600', width: '50%', paddingVertical: 8 },
});
