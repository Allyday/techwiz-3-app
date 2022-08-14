import { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { systemAPI } from '../../apis';
import { useToken } from '../../hooks/useToken';

export default function FeedbackScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [token] = useToken();

  const onChangeInput = (text, type) => {
    if (type === 'title') {
      setTitle(text);
    } else {
      setContent(text);
    }
  };

  const showAlert = (message) =>
    Alert.alert(
      message,
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );

  const handleSubmit = async () => {
    if (title.length <= 0 || content.length <= 0) {
      showAlert('Please, Fill in the data');
      return;
    }
    const data = {
      title,
      content,
    };
    // validate
    await systemAPI
      .sendFeedback(token, data)
      .then((res) => {
        showAlert('Thanks for your feedback');
      })
      .catch((error) => {
        showAlert('Error! An error occurred. Please try again later');
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        label="Title"
        style={styles.input}
        autoCapitalize="none"
        onChangeText={(value) => onChangeInput(value, 'title')}
      />

      <TextInput
        value={content}
        style={[styles.input, styles.inputContent]}
        autoCapitalize="none"
        onChangeText={(value) => onChangeInput(value, 'content')}
        multiline={true}
        numberOfLines={4}
      />

      <Button style={styles.btn} onPress={handleSubmit}>
        Submit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 30,
    marginTop: 15,
  },
  input: {
    marginVertical: 5,
    marginBottom: 20,
  },
  inputContent: {
    height: 200,
    textAlignVertical: 'top',
  },
  btn: {
    borderRadius: 50,
    paddingVertical: 5,
    marginHorizontal: 20,
    marginTop: 20,
  },
});
