import * as React from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { List, Text, useTheme, ActivityIndicator } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import ContentLoader from "react-native-easy-content-loader";

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
const DataSubject = [
  {
    key: 1,
    title: "Toán",
  },
  {
    key: 2,
    title: "Lý",
  },
  {
    key: 3,
    title: "Hóa",
  },
  {
    key: 4,
    title: "Văn",
  },
  {
    key: 5,
    title: "Sử",
  },
  {
    key: 6,
    title: "Địa",
  },
  {
    key: 7,
    title: "GDCD",
  },
  {
    key: 8,
    title: "Mỹ thuật",
  },
];
export default function Resources({ navigation }) {
  const [routes, setRoutes] = React.useState([]);
  const { colors } = useTheme();
  const SRoute = () => (
    <ScrollView
      style={{
        paddingVertical: 8,
        paddingHorizontal: 18,
        backgroundColor: "#fff",
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
              onPress={() => navigation.navigate("ViewPDF")}
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
                color={colors.secondary}
              />
            </TouchableOpacity>
          )}
          style={{
            padding: 16,
            marginVertical: 6,
            backgroundColor: colors.lightPink,
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      ))}
    </ScrollView>
  );

  const [renderScene, setRenderScene] = React.useState();
  const [isLoadingRenderScene, setIsLoadingRenderScene] = React.useState(false);

  React.useEffect(() => {
    var sce = { 0: SRoute };
    setTimeout(() => {
      DataSubject.map((v) => {
        sce[v.key] = SRoute;
      });
      DataSubject.unshift({
        key: 0,
        title: "All",
      });
      setRenderScene(sce);
      setRoutes(DataSubject);
      setIsLoadingRenderScene(true);
    }, 2000);
  }, []);

  const _renderLabel = ({ route }) => {
    return (
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: activeColor == route.key ? colors.primary : colors.secondary,
        }}
      >
        {route.title}
      </Text>
    );
  };

  const renderTabBar = (SceneRendererProps) => (
    <View style={{ backgroundColor: colors.secondary }}>
      <TabBar
        {...SceneRendererProps}
        renderLabel={_renderLabel}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
        labelStyle={styles.label}
        activeColor={colors.primary}
        onTabPress={(e) => setActiveColor(e.route.key)}
      />
    </View>
  );
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [activeColor, setActiveColor] = React.useState(0);

  const containerStyle = {
    backgroundColor: "white",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    paddingTop: 16,
    zIndex: 100,
  };
  return (
    <>
      {isLoadingRenderScene ? (
        <TabView
          lazy
          navigationState={{ index, routes }}
          renderScene={SceneMap(renderScene)}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      ) : (
        <View
          style={{
            paddingRight: 16,
            backgroundColor: "#fff",
            marginTop: 10,
            paddingVertical: 16,
          }}
        >
          <ContentLoader
            active
            avatar
            aSize={60}
            pRows={1}
            pWidth={[100]}
            aShape={"square"}
          />
        </View>
      )}
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
  },
});
