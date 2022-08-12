import * as React from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { List, Text, useTheme } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import ContentLoader from "react-native-easy-content-loader";

import subjectAPI from "../../apis/subjectAPI";
import resourceAPI from "../../apis/resourceAPI";
import { useToken } from "../../hooks/useToken";

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
    if (dsResources.length < totalCount) {
      let params = {
        page: dem,
        limit: 10,
        subjectId: "",
      };
      if (activeColor != 0) {
        params.subjectId = activeColor;
      }
      const resStudyResource = await resourceAPI.studyResource(token, params);
      if (resStudyResource.data.data.length > 0) {
        const { data, page_info } = resStudyResource.data;
        setDsResources(data);
        setTotalCount(page_info.total);
      } else {
        console.log("sai mật khẩu rồi mày ơi");
      }
      var de = dem + 1;
      setDem(de);
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
  const [token] = useToken();

  React.useEffect(() => {
    const getData = async () => {
      let params = {
        page: 1,
        limit: 10,
        subjectId: "",
      };
      const resGetClassSubject = await subjectAPI.getClassSubject(token);
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
          token,
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
    getData();
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
