import { StyleSheet, Text } from 'react-native';
import { List, Title, useTheme } from 'react-native-paper';

import StyledScreen from '../../components/wrappers/StyledScreen';

export default function ParentHomeScreen({ route, navigation }) {
  const { colors } = useTheme();
  const { children } = route.params;

  return (
    <StyledScreen style={styles.container}>
      <Title>Your children</Title>
      <Text>Select a child to view their report card</Text>
      {children.map((child) => (
        <List.Item
          id={child.user_id}
          title={child.full_name}
          description={`Class ${child.class_name}`}
          onPress={() =>
            navigation.navigate('ReportCardScreen', { student: child })
          }
          rippleColor={colors.darkBlue}
          style={{ ...styles.childItem, backgroundColor: colors.lightBlue }}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
      ))}
    </StyledScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  childItem: {
    padding: 12,
    marginVertical: 12,
    borderRadius: 12,
  },
});
