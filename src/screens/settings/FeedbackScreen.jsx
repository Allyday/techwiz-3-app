import { StyleSheet, Text } from 'react-native';

import StyledScreen from '../../components/wrappers/StyledScreen';

export default function FeedbackScreen() {
  return (
    <StyledScreen style={styles.container}>
      <Text>FeedbackScreen</Text>
    </StyledScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
