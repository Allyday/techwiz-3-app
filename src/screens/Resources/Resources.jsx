import * as React from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import {
  List,
  Text,
  useTheme,
  ActivityIndicator,
  IconButton,
} from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import ContentLoader from "react-native-easy-content-loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authAPI from "../../apis/authAPI";
import { Video, AVPlaybackStatus, VideoFullscreenUpdateEvent } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import subjectAPI from "../../apis/subjectAPI";
import resourceAPI from "../../apis/resourceAPI";

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
  const gameItemExtractorKey = (item, index) => {
    return index.toString();
  };

  const renderData = (value) => {
    return (
      <List.Item
        title={() => (
          <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "800" }}>
            {value.item.name}
          </Text>
        )}
        description={() => <Text numberOfLines={1}>{value.item.link}</Text>}
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
                value.item.type == "pdf"
                  ? "file-pdf"
                  : value.item.type == "video"
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
    );
  };

  const loadMore = async () => {
    // console.log(dem);
    const accessL = await AsyncStorage.getItem("access");
    if (dsResources.length < totalCount) {
      let params = {
        page: dem,
        limit: 10,
        subjectId: "",
      };
      if (activeColor != 0) {
        params.subjectId = activeColor;
      }
      const resStudyResource = await resourceAPI.studyResource(accessL, params);
      if (resStudyResource.data.data.length > 0) {
        const { data, page_info } = resStudyResource.data;
        setDsResources(data);
        setTotalCount(page_info.total);
      } else {
        console.log("sai mật khẩu rồi mày ơi");
      }
      var de = dem + 1;
      await setDem(de);
    }
  };

  const renderSpinner = () => {
    if (dsNotes.features.length == totalCount) {
      setIsFetchingNextPage(false);
    }
    return (
      <>
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
            aSize={140}
            pRows={4}
            pWidth={[100]}
            aShape={"square"}
          />
        </View>
      </>
    );
  };

  const SRoute = () => (
    <>
      {/* <ScrollView
        style={{
          paddingVertical: 8,
          paddingHorizontal: 18,
          backgroundColor: "#fff",
        }}
      ></ScrollView> */}
      <FlatList
        data={dsResources}
        keyExtractor={gameItemExtractorKey}
        renderItem={renderData}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
      />
    </>
  );

  const [renderScene, setRenderScene] = React.useState();
  const [isLoadingRenderScene, setIsLoadingRenderScene] = React.useState(false);
  const [dem, setDem] = React.useState(1);
  const [isFetchingNextPage, setIsFetchingNextPage] = React.useState(true);
  const [totalCount, setTotalCount] = React.useState(0);
  const [dsResources, setDsResources] = React.useState([]);

  React.useEffect(() => {
    const a = async () => {
      let params = {
        page: 1,
        limit: 10,
        subjectId: "",
      };
      const accessL = await AsyncStorage.getItem("access");
      const resGetClassSubject = await subjectAPI.getClassSubject(accessL);
      if (resGetClassSubject.data.payload.length > 0) {
        var dsMonHoc = [
          {
            key: 0,
            title: "All",
          },
        ];
        var sce = { 0: SRoute };
        resGetClassSubject.data.payload.map((v) => {
          dsMonHoc.push({
            key: v.subject.id,
            title: v.subject.name,
          });
          sce[v.subject.id] = SRoute;
        });
        setRenderScene(sce);
        setRoutes(dsMonHoc);
        const resStudyResource = await resourceAPI.studyResource(
          accessL,
          params
        );
        if (resStudyResource.data.data.length > 0) {
          const { data, page_info } = resStudyResource.data;
          setDsResources(data);
          setTotalCount(page_info.total);
          setIsLoadingRenderScene(true);
        } else {
          console.log("sai mật khẩu rồi mày ơi res");
        }
      } else {
        console.log("sai mật khẩu rồi mày ơi subj");
      }
    };
    a();
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
