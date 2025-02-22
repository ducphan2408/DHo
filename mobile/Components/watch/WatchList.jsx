import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useCallback, memo } from "react";
import WatchItem from "./WatchItem";
import { useSelector, useDispatch } from "react-redux";
import EmptyItem from "../../Screens/Overlay/EmptyItem";
import Empty from "../ui/Empty";
import { dataGen } from "../../constants/data";
import color from "../../constants/color";
import { fetchMore, watchActions } from "../../redux/watch/watchSlice";
import { searchWatch } from "../../utils/watch";

const WatchList = memo((props) => {

  const screenType = props.screenType;
  const refreshing = props.refreshing;
  const onRefreshing = props.onRefreshing;
  const fetchMore = props.fetchMore;

  let dataList = [];
  if (screenType === "home") {
    // console.log("home")
    dataList = useSelector((state) => state.watch.items);
  } else {
    const numOfData = 4;
    for (let i = 0; i < numOfData; i++) {
      dataList.push(dataGen());
    }	
  }
  // const numOfData = 10;
  // for (let i = 0; i < numOfData; i++) {
  //   dataList.push(dataGen());
  // }	
  // console.log(dataList)

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
        onEndReached={fetchMore}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl
            colors={[color.baemin1]}
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
