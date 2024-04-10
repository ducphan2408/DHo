import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useCallback, memo } from "react";
import { dataGen } from "../../constants/data";
import WatchItem from "./WatchItem";
import { useSelector } from "react-redux";
import EmptyItem from "../../Screens/Overlay/EmptyItem";
import Empty from "../ui/Empty";
import color from "../../constants/color";

const WatchList = memo((props) => {

  const screenType = props.screenType;
  const refreshing = props.refreshing;
  const onRefreshing = props.onRefreshing;
  // console.log("WatchList.jsx in " + screenType);

  let dataList = [];
  if (screenType === "home") {
    // console.log("home")
    dataList = useSelector((state) => state.watch.items);
  } else if (screenType === "selling") {
    dataList = useSelector((state) => state.trading.sellingItems);
  } else if (screenType === "sold") {
    dataList = useSelector((state) => state.trading.soldItems);
  } else if (screenType === "favoritePosts") {
    dataList = useSelector((state) => state.favoritePost.items);
  } else if (screenType === "favoriteProducts") {
    // const numOfData = 1;
    // for (let i = 0; i < numOfData; i++) {
    //   const dataPoint = dataGen();
    //   dataList.push(dataGen());
    // }
    // console.log(dataList);
    dataList = useSelector((state) => state.favoriteProduct.resultList);
  }
  // console.log(dataList)
  // const numOfData = 10;
  // console.log("WatchList.jsx: prepare data");
  // console.log("dataPoint start");
  // for (let i = 0; i < numOfData; i++) {
  //   const dataPoint = dataGen();
  //   // console.log(dataPoint);

  //   dataList.push(dataGen());
  // }
  // console.log(dataList);
  // console.log("dataPoint end");
  const renderWatchItem = useCallback((itemData) => {
    return (
      <WatchItem
        screenType={screenType}
        onRefreshing={props.onRefreshing}
        data={itemData.item}
      />
    );
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        windowSize={5}
        removeClippedSubviews={true}
        maxToRenderPerBatch={4}
        initialNumToRender={4}
        data={dataList}
        ListEmptyComponent={<EmptyItem onPress={onRefreshing}/>}
        renderItem={renderWatchItem}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        progressViewOffset={2}
        showsVerticalScrollIndicator={false}
        ListFooterComponentStyle={{ color: "#ccc" }}
        refreshControl={
          <RefreshControl
            colors={["black"]}
            refreshing={refreshing}
            onRefresh={onRefreshing}
          />
        }
      />
    </View>
  );
});

export default WatchList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,

    // backgroundColor: "white",
  },
});
