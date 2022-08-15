import * as React from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Linking,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { List, Text, useTheme } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import ContentLoader from "react-native-easy-content-loader";
import { useSelector } from 'react-redux';

import subjectAPI from "../../apis/subjectAPI";
import resourceAPI from "../../apis/resourceAPI";
import { useToken } from "../../hooks/useToken";
import AddResourcesButton from "./components/AddResourcesButton";
import CustomVideo from "./components/CustomVideo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StyledScreen from "../../components/wrappers/StyledScreen";

export default function Resources({ navigation }) {
  const userRedux = useSelector((state) => state.user.user);
  const [routes, setRoutes] = React.useState([]);
  const { colors } = useTheme();
  const gameItemExtractorKey = (item, index) => {
    return index.toString();
  };

  const renderData = (value) => {
    return value.item.type == "MP4" ? (
      <View
        style={{
          padding: 16,
          marginVertical: 6,
          backgroundColor: colors.lightPink,
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <CustomVideo
          videoStyle={{
            width: Dimensions.get("window").width - 80,
            height: 150,
            borderRadius: 6,
            marginBottom: 20,
          }}
          source={{
            uri: value.item.link,
          }}
          posterSource={undefined}
          autoPlay={false}
        />
        <Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            fontWeight: "800",
            textAlign: "left",
            width: "100%",
          }}
        >
          {value.item.name}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            fontWeight: "400",
            textAlign: "left",
            width: "100%",
          }}
        >
          {value.item.link}
        </Text>
      </View>
    ) : value.item.type == "IMAGE" ? (
      <View
        style={{
          padding: 16,
          marginVertical: 6,
          backgroundColor: colors.lightPink,
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Image
          style={{
            width: Dimensions.get("window").width - 80,
            height: 150,
            borderRadius: 10,
            zIndex: 100,
            marginBottom: 20,
          }}
          source={{
            uri: value.item.link,
          }}
        />
        <Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            fontWeight: "800",
            textAlign: "left",
            width: "100%",
          }}
        >
          {value.item.name}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            fontWeight: "400",
            textAlign: "left",
            width: "100%",
          }}
        >
          {value.item.link}
        </Text>
      </View>
    ) : value.item.type == "WEB" ? (
      <List.Item
        onPress={() => Linking.openURL(value.item.link)}
        title={() => (
          <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "800" }}>
            {value.item.name}
          </Text>
        )}
        description={() => <Text numberOfLines={1}>{value.item.link}</Text>}
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
            <FontAwesome5 name="globe" size={24} color={colors.secondary} />
          </View>
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
    ) : (
      <List.Item
        onPress={() => navigation.navigate("ViewPDF")}
        title={() => (
          <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "800" }}>
            {value.item.name}
          </Text>
        )}
        description={() => <Text numberOfLines={1}>{value.item.link}</Text>}
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
                value.item.type == "PDF"
                  ? "file-pdf"
                  : value.item.type == "MP4"
                  ? "file-video"
                  : value.item.type == "IMAGE"
                  ? "file-image"
                  : "file-word"
              }
              size={24}
              color={colors.secondary}
            />
          </View>
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
    if (isFetchingNextPage) return;
    // console.log(dem);
    if (dsResources.length < totalCount) {
      let params = {
        page: dem,
        limit: 10,
      };
      if (subjectId != 0) {
        params.subject_id = subjectId;
      }
      setIsFetchingNextPage(true);
      const resStudyResource = await resourceAPI.studyResource(token, params);
      if (resStudyResource.data.data.length > 0) {
        const { data } = resStudyResource.data;
        setDsResources(dsResources.concat(data));
      }
      var de = dem + 1;
      setDem(de);
    }
    setIsFetchingNextPage(false);
  };

  const renderSpinner = () => {
    if (!isFetchingNextPage) return null;
    return (
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
    );
  };

  const SRoute = ({ resources }) => (
    <View
      style={{
        paddingVertical: 8,
        paddingHorizontal: 24,
        backgroundColor: "#fff",
      }}
    >
      {resources.length > 0 ? (
        resources[0] == "No resources" ? (
          <Text>{resources[0]}</Text>
        ) : (
          <FlatList
            data={resources}
            keyExtractor={gameItemExtractorKey}
            renderItem={renderData}
            onEndReached={loadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderSpinner}
          />
        )
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
    </View>
  );

  const [sceneMap, setSceneMap] = React.useState();
  const [isLoadingRenderScene, setIsLoadingRenderScene] = React.useState(false);
  const [dem, setDem] = React.useState(2);
  const [isFetchingNextPage, setIsFetchingNextPage] = React.useState(false);
  const [totalCount, setTotalCount] = React.useState(0);
  const [dsResources, setDsResources] = React.useState([]);
  const [role, setRole] = React.useState("");

  const [token] = useToken();

  React.useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    // const savedUser = await AsyncStorage.getItem("user");
    // const user = JSON.parse(savedUser);
    const user = userRedux;
    setRole(user.role);
    let params = {
      page: 1,
      limit: 10,
    };
    const resGetSubject = await subjectAPI.getSubject(token);
    if (resGetSubject.data.payload.length > 0) {
      var dsMonHoc = [
        {
          key: 0,
          title: "All",
        },
      ];
      const sceneMapObj = { 0: SRoute };
      resGetSubject.data.payload.map((subject) => {
        dsMonHoc.push({
          key: subject.id,
          title: subject.name,
        });
        sceneMapObj[subject.id] = SRoute;
      });
      setSceneMap(sceneMapObj);
      setRoutes(dsMonHoc);
      const resStudyResource = await resourceAPI.studyResource(token, params);
      const { data, page_info } = resStudyResource.data;
      setDsResources(data);
      setTotalCount(page_info.total);
      setIsLoadingRenderScene(true);
    }
  };

  const renderTabBar = (SceneRendererProps) => (
    <View style={{ backgroundColor: colors.secondary }}>
      <TabBar
        {...SceneRendererProps}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
        labelStyle={[
          styles.label,
          { color: colors.secondary, textTransform: "none" },
        ]}
        activeColor={colors.primary}
        onTabPress={async (e) => {
          setDsResources([]);
          let params = {
            page: 1,
            limit: 10,
          };
          if (e.route.key != 0) {
            params.subject_id = e.route.key;
          }
          const resStudyResource = await resourceAPI.studyResource(
            token,
            params
          );
          if (resStudyResource.data.data.length > 0) {
            const { data, page_info } = resStudyResource.data;
            setDsResources(data);
            setTotalCount(page_info.total);
          } else {
            setDsResources(["No resources"]);
          }
        }}
      />
    </View>
  );
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [subjectId, setsubjectId] = React.useState(0);

  const renderSceneFnc = ({ route }) => {
    const RenderedRoute = sceneMap[route.key];
    return <RenderedRoute resources={dsResources} />;
  };

  return (
    <StyledScreen>
      {isLoadingRenderScene ? (
        <TabView
          lazy
          navigationState={{ index, routes }}
          renderScene={renderSceneFnc}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      ) : (
        <View style={{ margin: 15 }}>
          <View
            style={{
              flexDirection: "row",
              marginLeft: -12,
              marginRight: -24,
              marginBottom: -11,
            }}
          >
            <ContentLoader
              tHeight={40}
              tWidth={65}
              pRows={0}
              titleStyles={{ borderRadius: 16 }}
              containerStyles={{ width: 75 }}
            />
            <ContentLoader
              tHeight={40}
              tWidth={70}
              pRows={0}
              titleStyles={{ borderRadius: 16 }}
              containerStyles={{ width: 80 }}
            />
            <ContentLoader
              tHeight={40}
              tWidth={70}
              pRows={0}
              titleStyles={{ borderRadius: 16 }}
              containerStyles={{ width: 80 }}
            />
            <ContentLoader
              tHeight={40}
              tWidth={70}
              pRows={0}
              titleStyles={{ borderRadius: 16 }}
              containerStyles={{ width: 80 }}
            />
            <ContentLoader
              tHeight={40}
              tWidth={70}
              pRows={0}
              titleStyles={{ borderRadius: 16 }}
              containerStyles={{ width: 80 }}
            />
          </View>
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
        </View>
      )}
      {role == "TEACHER" && <AddResourcesButton />}
    </StyledScreen>
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
    width: "auto",
    borderBottomColor: "#fff",
  },
  indicator: {
    backgroundColor: "#fd3667",
  },
  label: {
    fontWeight: "600",
  },
});
