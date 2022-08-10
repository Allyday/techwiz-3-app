import * as React from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";
import {
  TabView,
  TabBar,
  SceneMap,
  NavigationState,
  SceneRendererProps,
} from "react-native-tab-view";
import { List } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";

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

const FirstRoute = () => (
  <ScrollView style={{ paddingVertical: 10, backgroundColor: "#fff" }}>
    {Data.map((v, k) => (
      <List.Item
        key={k}
        title={v.name}
        description={() => <Text numberOfLines={1}>{v.link}</Text>}
        left={() => (
          <View
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
              size={20}
              color={"#473f97"}
            />
          </View>
        )}
        style={{
          padding: 15,
          marginVertical: 5,
          backgroundColor: "#ffd4d4",
          marginHorizontal: 12,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    ))}
  </ScrollView>
);

const SecondRoute = () => <View style={{ flex: 1, backgroundColor: "#fff" }} />;

const renderScene = SceneMap({
  first: FirstRoute,
  second1: SecondRoute,
  first2: FirstRoute,
  second3: SecondRoute,
  first4: FirstRoute,
  second5: SecondRoute,
  first6: FirstRoute,
  second7: SecondRoute,
});

const renderTabBar = (SceneRendererProps) => (
  <View style={{ backgroundColor: "#473f97" }}>
    <TabBar
      {...SceneRendererProps}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
      activeColor={"#fd3667"}
      onTabPress={(e) => console.log(e)}
    />
  </View>
);
export default function Resources() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Toán" },
    { key: "second1", title: "Lý" },
    { key: "first2", title: "Hóa" },
    { key: "second3", title: "Văn" },
    { key: "first4", title: "Sử" },
    { key: "second5", title: "Địa" },
    { key: "first6", title: "GDCD" },
    { key: "second7", title: "Mỹ thuật" },
  ]);

  return (
    <TabView
      lazy
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: "#fff",
    elevation: 0,
    paddingBottom: 10,
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
