import { Modal, Text, Button } from 'react-native-paper';
import { View, TextInput, StyleSheet } from 'react-native';

const ModalUpdateRevision = ({
  showModalUpdateRevision,
  setShowModalUpdateRevision,
  handlerSubmit,
}) => {
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <Modal
      visible={showModalUpdateRevision}
      dismissable={false}
      contentContainerStyle={containerStyle}
      style={styles.container}
    >
      <View style={styles.wrapperText}>
        <Text style={styles.titleText}>Update revision</Text>
      </View>
      <View>
        <View style={styles.wrapperInput}>
          <TextInput style={styles.inputField} />
        </View>
        <View style={styles.wrapperInput}>
          <TextInput style={styles.inputField} />
        </View>
        <View style={styles.wrapperButton}>
          <Button onPress={() => setShowModalUpdateRevision(false)}>
            Cancel
          </Button>
          <Button onPress={handlerSubmit}>Update</Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 18,
    paddingHorizontal: 24,
  },
  wrapperText: {
    marginBottom: 10,
  },
  wrapperInput: {
    borderWidth: 1,
    borderColor: 'red',
    height: 50,
    marginBottom: 10,
  },
  wrapperButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  titleText: {
    fontSize: 25,
    fontWeight: '700',
  },
  inputField: {
    backgroundColor: '#ffffff',
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonUpdate: {},
  buttonCancel: {},
});

export default ModalUpdateRevision;
