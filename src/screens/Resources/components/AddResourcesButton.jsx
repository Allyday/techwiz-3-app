import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Portal, Text, FAB, useTheme } from 'react-native-paper';

export default function AddResourcesButton() {
  const { colors } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <>
      <FAB
        icon="plus"
        uppercase={false}
        label="Add"
        size="large"
        color={colors.secondary}
        style={styles.fab}
        onPress={showModal}
      />
      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.container}
        >
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: 'white', padding: 20 },
  fab: {
    position: 'absolute',
    backgroundColor: 'white',
    margin: 24,
    right: 0,
    bottom: 0,
  },
});
