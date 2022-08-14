import { useState, useEffect } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import {
  Modal,
  Portal,
  Text,
  FAB,
  useTheme,
  TextInput,
  HelperText,
  Button,
  Menu,
  Divider,
} from "react-native-paper";
import { resourceAPI, subjectAPI } from "../../../apis";
import { useToken } from "../../../hooks/useToken";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
export default function AddResourcesButton() {
  const [token] = useToken();
  const { colors } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const [link, setLink] = useState("");
  const [subject, setSubject] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [idSub, setIdSub] = useState({
    id: 0,
    name: "Chọn môn học",
  });
  const [linkInvalid, setLinkInvalid] = useState(false);
  const validateLink = () => {
    if (
      link.indexOf(".pdf") != -1 ||
      link.indexOf(".mp4") != -1 ||
      link.indexOf(".png") != -1 ||
      link.indexOf(".jpg") != -1
    ) {
      setLinkInvalid(false);
      return true;
    } else {
      setLinkInvalid(true);
      return false;
    }
  };

  useEffect(() => {
    const a = async () => {
      const resGetSubject = await subjectAPI.getSubject(token);
      if (resGetSubject.data.payload.length > 0) {
        setSubject(resGetSubject.data.payload);
        setIsLoading(true);
      } else {
        console.log("Lỗi subj");
      }
    };
    a();
  }, []);
  const addResources = async () => {
    setIsLoadingButton(true);
    const checkLink = validateLink();
    if (checkLink) {
      console.log({
        name: title,
        link: link,
        type: type,
        subject: idSub.id,
      });
      try {
        const resAddResourcesAPI = await resourceAPI.addResourcesAPI(
          {
            name: title,
            link: link,
            type: type,
            subject: idSub.id,
          },
          token
        );
        if (resAddResourcesAPI.data.data) {
          setIsLoadingButton(false);
          setModalVisible(false);
        } else {
          throw new Error("Wrong password");
        }
      } catch (error) {
        console.log("sai mật khẩu rồi mày ơi");
      }
    }
  };

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

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
          <TextInput
            style={{
              width: SCREEN_WIDTH - 80,
              backgroundColor: "#fff",
            }}
            label="Link"
            value={link}
            onChangeText={(link) => {
              setLink(link);
              const linkCheckValid = validateLink();
              if (linkCheckValid) {
                link.indexOf(".pdf") != -1 && setType(" PDF");
                link.indexOf(".mp4") != -1 && setType(" MP4");
                link.indexOf(".png") != -1 && setType(" IMAGE");
                link.indexOf(".jpg") != -1 && setType(" IMAGE");
              } else {
                setType("");
              }
            }}
            autoCapitalize="none"
          />
          <HelperText type="error" visible={linkInvalid}>
            Link không hợp lệ
          </HelperText>
          <View>
            <Text>Type: {type}</Text>
          </View>
          <TextInput
            style={{
              width: SCREEN_WIDTH - 80,
              backgroundColor: "#fff",
              marginBottom: 16,
            }}
            label="Title"
            value={title}
            onChangeText={setTitle}
            autoCapitalize="none"
          />

          <Menu
            visible={visible}
            onDismiss={closeMenu}
            style={{ width: SCREEN_WIDTH - 80 }}
            anchor={<Button onPress={openMenu}>{idSub.name}</Button>}
          >
            {isLoading &&
              subject.map((sub) => (
                <Menu.Item
                  key={sub.name}
                  onPress={() => (setIdSub(sub), setVisible(false))}
                  title={sub.name}
                />
              ))}
          </Menu>
          <Button
            loading={isLoadingButton}
            mode="contained"
            uppercase={false}
            // onPress={signIn}
            //   onPress={() => props.navigation.replace("Root", { screen: "Home" })}
            style={{ borderRadius: 50, overflow: "hidden" }}
            contentStyle={{
              borderRadius: 50,
              width: 300,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => addResources()}
          >
            Submit
          </Button>
        </Modal>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 16,
  },
  fab: {
    position: "absolute",
    backgroundColor: "white",
    margin: 24,
    right: 0,
    bottom: 0,
  },
});
