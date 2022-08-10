import * as React from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  TabView,
  TabBar,
  SceneMap,
  NavigationState,
  SceneRendererProps,
} from "react-native-tab-view";
import { List, Modal, Text, Button } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import PDFReader from "rn-pdf-reader-js";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const Data = [
  {
    name: "Toán",
    type: "pdf",
    idSubject: 1,
    link: "https://shopee.vn/S%C3%A1ch-Chi%E1%BA%BFn-th%E1%BA%AFng-k%C3%AC-thi-9-v%C3%A0o-10-chuy%C3%AAn-m%C3%B4n-V%E1%BA%ADt-L%C3%BD-t%E1%BA%ADp-1-i.17755904.7239258167?sp_atk=1b50e220-588c-443e-8695-bf7560e034af&xptdk=1b50e220-588c-443e-8695-bf7560e034af",
  },
  {
    name: "Toán",
    type: "pdf",
    idSubject: 1,
    link: "https://shopee.vn/S%C3%A1ch-Chi%E1%BA%BFn-th%E1%BA%AFng-k%C3%AC-thi-9-v%C3%A0o-10-chuy%C3%AAn-m%C3%B4n-V%E1%BA%ADt-L%C3%BD-t%E1%BA%ADp-1-i.17755904.7239258167?sp_atk=1b50e220-588c-443e-8695-bf7560e034af&xptdk=1b50e220-588c-443e-8695-bf7560e034af",
  },
  {
    name: "Toán",
    type: "pdf",
    idSubject: 1,
    link: "https://shopee.vn/S%C3%A1ch-Chi%E1%BA%BFn-th%E1%BA%AFng-k%C3%AC-thi-9-v%C3%A0o-10-chuy%C3%AAn-m%C3%B4n-V%E1%BA%ADt-L%C3%BD-t%E1%BA%ADp-1-i.17755904.7239258167?sp_atk=1b50e220-588c-443e-8695-bf7560e034af&xptdk=1b50e220-588c-443e-8695-bf7560e034af",
  },
  {
    name: "Toán",
    type: "pdf",
    idSubject: 1,
    link: "https://shopee.vn/S%C3%A1ch-Chi%E1%BA%BFn-th%E1%BA%AFng-k%C3%AC-thi-9-v%C3%A0o-10-chuy%C3%AAn-m%C3%B4n-V%E1%BA%ADt-L%C3%BD-t%E1%BA%ADp-1-i.17755904.7239258167?sp_atk=1b50e220-588c-443e-8695-bf7560e034af&xptdk=1b50e220-588c-443e-8695-bf7560e034af",
  },
  {
    name: "Toán",
    type: "pdf",
    idSubject: 1,
    link: "https://shopee.vn/S%C3%A1ch-Chi%E1%BA%BFn-th%E1%BA%AFng-k%C3%AC-thi-9-v%C3%A0o-10-chuy%C3%AAn-m%C3%B4n-V%E1%BA%ADt-L%C3%BD-t%E1%BA%ADp-1-i.17755904.7239258167?sp_atk=1b50e220-588c-443e-8695-bf7560e034af&xptdk=1b50e220-588c-443e-8695-bf7560e034af",
  },
  {
    name: "Toán",
    type: "pdf",
    idSubject: 1,
    link: "https://shopee.vn/S%C3%A1ch-Chi%E1%BA%BFn-th%E1%BA%AFng-k%C3%AC-thi-9-v%C3%A0o-10-chuy%C3%AAn-m%C3%B4n-V%E1%BA%ADt-L%C3%BD-t%E1%BA%ADp-1-i.17755904.7239258167?sp_atk=1b50e220-588c-443e-8695-bf7560e034af&xptdk=1b50e220-588c-443e-8695-bf7560e034af",
  },
  {
    name: "Toán",
    type: "pdf",
    idSubject: 1,
    link: "https://shopee.vn/S%C3%A1ch-Chi%E1%BA%BFn-th%E1%BA%AFng-k%C3%AC-thi-9-v%C3%A0o-10-chuy%C3%AAn-m%C3%B4n-V%E1%BA%ADt-L%C3%BD-t%E1%BA%ADp-1-i.17755904.7239258167?sp_atk=1b50e220-588c-443e-8695-bf7560e034af&xptdk=1b50e220-588c-443e-8695-bf7560e034af",
  },
  {
    name: "Toán",
    type: "pdf",
    idSubject: 1,
    link: "https://shopee.vn/S%C3%A1ch-Chi%E1%BA%BFn-th%E1%BA%AFng-k%C3%AC-thi-9-v%C3%A0o-10-chuy%C3%AAn-m%C3%B4n-V%E1%BA%ADt-L%C3%BD-t%E1%BA%ADp-1-i.17755904.7239258167?sp_atk=1b50e220-588c-443e-8695-bf7560e034af&xptdk=1b50e220-588c-443e-8695-bf7560e034af",
  },
];

export default function Resources({ navigation }) {
  const FirstRoute = () => (
    <ScrollView
      style={{
        paddingVertical: 8,
        backgroundColor: "#fff",
        paddingHorizontal: 8,
      }}
    >
      {Data.map((v, k) => (
        <List.Item
          key={k}
          title={() => (
            <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "800" }}>
              {v.name}
            </Text>
          )}
          description={() => <Text numberOfLines={1}>{v.link}</Text>}
          left={() => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ViewPDF", { screen: "ViewPDF" })
              }
              style={{
                width: 50,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: 5,
                borderColor: "#cccbd9",
                borderWidth: 1,
              }}
            >
              <FontAwesome5
                name={
                  v.type == "pdf"
                    ? "file-pdf"
                    : v.type == "video"
                    ? "file-video"
                    : "file-word"
                }
                size={24}
                color={"#473f97"}
              />
            </TouchableOpacity>
          )}
          style={{
            padding: 16,
            marginVertical: 8,
            backgroundColor: "#ffd4d4",
            marginHorizontal: 12,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      ))}
    </ScrollView>
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#fff" }} />
  );

  const renderScene = SceneMap({
    0: FirstRoute,
    1: FirstRoute,
    2: SecondRoute,
    3: FirstRoute,
    4: SecondRoute,
    5: FirstRoute,
    6: SecondRoute,
    7: FirstRoute,
    8: SecondRoute,
  });
  const _renderLabel = ({ route }) => {
    return (
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: activeColor == route.key ? "#fd3667" : "#473f97",
        }}
      >
        {route.title}
      </Text>
    );
  };

  const renderTabBar = (SceneRendererProps) => (
    <View style={{ backgroundColor: "#473f97" }}>
      <TabBar
        {...SceneRendererProps}
        renderLabel={_renderLabel}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
        labelStyle={styles.label}
        activeColor={"#fd3667"}
        onTabPress={(e) => setActiveColor(e.route.key)}
      />
    </View>
  );
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 0, title: "All" },
    { key: 1, title: "Toán" },
    { key: 2, title: "Lý" },
    { key: 3, title: "Hóa" },
    { key: 4, title: "Văn" },
    { key: 5, title: "Sử" },
    { key: 6, title: "Địa" },
    { key: 7, title: "GDCD" },
    { key: 8, title: "Mỹ thuật" },
  ]);
  const [activeColor, setActiveColor] = React.useState(routes[0].key);

  const containerStyle = {
    backgroundColor: "white",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    paddingTop: 16,
    zIndex: 100,
  };
  return (
    <>
      <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: "#fff",
    elevation: 0,
    paddingBottom: 8,
    borderTopEndRadius: 30,
  },
  tab: {
    width: 100,
    borderBottomColor: "#fff",
  },
  indicator: {
    backgroundColor: "#fd3667",
  },
  label: {
    fontWeight: "600",
    color: "#473f97",
  },
});
