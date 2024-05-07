import { useState, useEffect, useLayoutEffect, Fragment } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  Alert,
} from "react-native";

import Slider from "../ui/Slider";
import color from "../../constants/color";
import Button from "../../Components/ui/Button";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import WatchInfor from "./WatchInfor";
import SellerInfor from "./SellerInfor";
import BuyerInfor from "./BuyerInfor";
import FaceBookSvg from "../../assets/images/svg/Facebook";
import MessengerSvg from "../../assets/images/svg/Messenger";
import ZaloSvg from "../../assets/images/svg/Zalo";
import LinkSvg from "../../assets/images/svg/Link";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import {
  fetchWatchDetails,
  deletePost,
  toggePostState,
  saveWatchInformation,
} from "../../utils/watch";
import { useDispatch, useSelector } from "react-redux";
import { tradingActions } from "../../redux/trading/tradingSlice";
import { watchDetailsActions } from "../../redux/watch/watchDetailsSlice";
import { favoritePostActions } from "../../redux/favorite/favoritePostSlice";
import { favoriteProductActions } from "../../redux/favorite/favoriteProductSlice";
import LoadingOverlay from "../../Screens/Overlay/LoadingOverlay";
import ErrorOverlay from "../../Screens/Overlay/ErrorOverlay";
import IconButton from "../ui/IconButton";
import Review from "./Review";
import AdSvg from "../../assets/images/svg/Ad";

const facebookLink = "https://www.facebook.com/shopdongho2004";
const zaloLink = "https://zalo.me/966767707628083905";
const WatchDetails = (props) => {
  const originalData = props.route.params.data;
  // console.log("originalData = ", originalData);
  const token = useSelector((state) => state.auth.token);
  // console.log("token = ", token);
  const id = props.route.params.id;
  // console.log("id = ", id);
  const watch_id = props.route.params.watch_id;
  // const watch_id = useSelector(state => state.details.watch_id);
  // console.log("watch_id = ", watch_id);
  const addFavoritePost = props.route.params.addFavoritePost;
  const deleteFavoritePost = props.route.params.deleteFavoritePost;
  const [isFavorite, setIsFavourite] = useState(props.route.params.isFavorite);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  // console.log("WatchDetails.jsx");

  // const addToFavorite = async () => {
  //   console.log("addToFavorite clicked");
  //   setIsFavourite(true);
  // };

  // const deleteFromFavotite = async () => {
  //   console.log("deleteFromFavotite clicked");
  //   setIsFavourite(false);
  // };
  const changeFavoritesHandler = () => {
    if (isFavorite) {
      setIsFavourite(false);
      deleteFavoritePost(token, id);
      dispatch(favoritePostActions.remove(id));
    } else {
      setIsFavourite(true);
      addFavoritePost(token, id);
      dispatch(favoritePostActions.add({ ...originalData, isFavorite: true }));
    }
    // console.log("clicked");
  };
  const deletePostHandler = () => {
    const deletePostDetails = async (token, id) => {
      try {
        dispatch(tradingActions.deleteSellingItem(id));
        navigation.goBack();
        await deletePost(token, id);
      } catch (err) {
        console.log(err);
      }
    };
    deletePostDetails(token, id);
  };
  const moveToSoldItems = () => {
    const switchPostState = async (token, id) => {
      try {
        dispatch(tradingActions.moveToSoldPosts(originalData));
        navigation.navigate("Sold");
        const data = await toggePostState(token, id);
      } catch (err) {
        console.log(err);
      }
    };
    switchPostState(token, id);
  };
  const moveToSellingItems = () => {
    const switchPostState = async (token, id) => {
      try {
        dispatch(tradingActions.moveToSellingPosts(originalData));
        navigation.navigate("Selling");
        const data = await toggePostState(token, id);
      } catch (err) {
        console.log(err);
      }
    };
    switchPostState(token, id);
  };
  const screenType = props.route.params.screenType;
  // console.log(screenType);
  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: props.route.params.title,
      headerRight: () => {
        if (!!token) {
          if (screenType === "selling") {
            return (
              <View style={{ flexDirection: "row" }}>
                <SimpleLineIcons
                  name="user-following"
                  size={21}
                  color="black"
                  style={{ marginHorizontal: 5 }}
                  // onPress={() => {
                  //   navigation.navigate("ManageRequest", {});
                  // }}
                  onPress={() => {
                    Alert.alert(
                      "Thông báo",
                      "Bạn có muốn xác nhận bán sản phẩm này không ?",
                      [
                        { text: "Hủy" },
                        { text: "Đồng ý", onPress: moveToSoldItems },
                      ]
                    );
                  }}
                />
                <AntDesign
                  style={{ marginRight: 5 }}
                  name="edit"
                  size={22}
                  color="black"
                  onPress={() => {
                    navigation.navigate("ManageWatch", { isAdding: false });
                    dispatch(watchDetailsActions.overrideUpdatedImages());
                  }}
                />
                <AntDesign
                  name="delete"
                  size={22}
                  color="black"
                  onPress={() => {
                    Alert.alert(
                      "Thông báo",
                      "Bạn có muốn xóa bài đăng về sản phẩm này không ?",
                      [
                        { text: "Hủy" },
                        { text: "Đồng ý", onPress: deletePostHandler },
                      ]
                    );
                  }}
                />
              </View>
            );
          } else if (screenType === "sold") {
            return (
              <FontAwesome
                onPress={() => {
                  Alert.alert(
                    "Thông báo",
                    "Bạn có muốn hủy bán sản phẩm này không?",
                    [
                      { text: "Hủy" },
                      { text: "Xác nhận", onPress: moveToSellingItems },
                    ]
                  );
                }}
                name="undo"
                size={22}
                color="black"
              />
            );
          } else if (screenType === "favoriteProducts") {
            return null;
          } else {
            return (
              <IconButton
                icon={isFavorite ? "heart" : "hearto"}
                color={isFavorite ? color.red : color.baemin1}
                onPress={changeFavoritesHandler}
              />
            );
          }
        }
      },
    });
  }, [props.navigation, changeFavoritesHandler]);

  // let detailsInfor = {};
  useLayoutEffect(() => {
    // console.log("WatchDetails.jsx: useEffect");
    const getWatchDetails = async (token, id) => {
      setIsFetching(true);
      try {
        // console.log("id = ", id);
        const data = await fetchWatchDetails(token, id);

        dispatch(watchDetailsActions.set(data));
      } catch (err) {
        console.log(err);
        setError("Không thể tải thông tin chi tiết của sản phẩm");
      }
      setIsFetching(false);
    };
    getWatchDetails(token, id);
  }, []);

  const saveWatchHandler = async () => {
    if (!!watch_id === false) {
      Alert.alert(
        "Thông báo",
        "Không tìm thấy sản phẩm, bạn vui lòng lưu tin!",
        [{ text: "Đồng ý" }]
      );
    } else {
      try {
        // console.log("originalData = ", originalData);
        dispatch(favoriteProductActions.add(originalData));
        await saveWatchInformation(token, watch_id);
        Alert.alert("Thông báo", "Lưu sản phẩm thành công!", [
          { text: "Đồng ý" },
        ]);
      } catch (err) {
        // console.log(err);
        Alert.alert("Thông báo", "Đã có lỗi trong quá trình xử lý", [
          { text: "Đồng ý" },
        ]);
      }
    }
  };
  const contactSellerHandler = () => {
    Alert.alert("Thông báo", "Tính năng đang phát triển!", [{ text: "OK" }]);
  };
  let renderedItem = useSelector((state) => state.details.item);
  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }

  console.log(props.route.params.data)
  // console.log(renderedItem)
  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      <Slider images={renderedItem.images} />

      <View style={styles.contentContainer}>
        <Text style={styles.watchName}>{renderedItem.name}</Text>
        {screenType !== "favoriteProducts" && (
          <View style={{flexDirection: "row"}}>
            <Text style={[styles.price, { width: "30%"}]}>{renderedItem.formatted_price}</Text>

            <View style={{flexDirection: "row", justifyContent: "space-between", width: "70%"}}>
              <AdSvg />
              <View style={{backgroundColor: color.verify, flexDirection: "row", alignItems:"center", marginLeft: -135, paddingHorizontal: 5, borderRadius: 5}}>
                <Ionicons name="checkmark-circle" size={15} color="white" /> 
                <Text style={{ color: color.white, fontSize: 10, marginLeft: 3, fontFamily: "montserrat-regular"}}>
                  Đã kiểm định
                </Text>
              </View>
            </View>

            {/* only  */}
            {/* <View style={{flexDirection: "row", justifyContent: "flex-end", width: "70%"}}>
              <View style={{backgroundColor: color.verify, flexDirection: "row", alignItems:"center", marginLeft: -135, paddingHorizontal: 5, borderRadius: 5}}>
                <Ionicons name="checkmark-circle" size={15} color="white" /> 
                <Text style={{ color: color.white, fontSize: 10, marginLeft: 3, fontFamily: "montserrat-regular"}}>
                  Đã kiểm định
                </Text>
              </View>
            </View> */}
          </View>
        )}
        {screenType !== "favoriteProducts" && (
          <Text style={styles.description}>
            Mô tả: {renderedItem.description}
          </Text>
        )}
      </View>
      {!["selling", "sold", "favoriteProducts"].includes(screenType) &&
      token ? (
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: "5%",
            justifyContent: "space-between",
          }}
        >
          <Button
            // onPress={saveWatchHandler}
            onPress={() => {navigation.navigate("Payment", {props: props.route.params.data})}}
            color={color.baemin1}
            width="80%"
            textSize={15}
            borR={7.5}
            textVP="1%"
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Ionicons
                name="cart-outline"
                size={20}
                color={color.background_white}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: color.white,
                  textAlign: "center",
                  marginLeft: 5,
                  fontFamily: "montserrat-semi-bold",
                }}
              >
                Mua
              </Text>
            </View>
          </Button>

          <Button
            onPress={contactSellerHandler}
            color={color.baemin1}
            width="15%"
            textSize={15}
            borR={7.5}
            textVP="1%"
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={22}
              color={color}
            />
          </Button>

          {/* <Button
            onPress={saveWatchHandler}
            color={color.baemin1}
            width="15%"
            textSize={15}
            borR={7.5}
            textVP="1%"
          >
            <Ionicons name="heart-outline" size={22} color={color} />
          </Button> */}
        </View>
      ) : null}

      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          marginVertical: "5%",
        }}
      >
        {!["selling", "sold"].includes(screenType) && (
          <Pressable style={styles.warning}>
            <View style={styles.icon}>
              <Ionicons name="warning-outline" size={16} color="black" />
            </View>

            <View>
              <Text style={[styles.text, styles.warningText]}>Báo cáo tin</Text>
            </View>
          </Pressable>
        )}

        <View style={styles.shareContainer}>
          <Text style={styles.shareText}>Chia sẻ tin này cho bạn bè</Text>
          <View style={styles.shareImageContainer}>
            <Pressable
              style={styles.image}
              onPress={() => {
                Linking.openURL(facebookLink);
              }}
            >
              <FaceBookSvg />
            </Pressable>
            <View style={styles.image}>
              <MessengerSvg />
            </View>
            <Pressable
              style={styles.image}
              onPress={() => {
                Linking.openURL(zaloLink);
              }}
            >
              <ZaloSvg />
            </Pressable>
            <View style={styles.image}>
              <LinkSvg />
            </View>
          </View>
        </View>
      </View>

      {!["favoriteProducts"].includes(screenType) && (
        <View style={styles.layout}>
          {renderedItem.view > 0 && (
            <Text style={styles.text}>
              Có{" "}
              <Text style={{ fontFamily: "montserrat-semi-bold" }}>
                {renderedItem.view + " "}
              </Text>
              lượt xem sản phẩm này
            </Text>
          )}
        </View>
      )}
      <WatchInfor />

      {!["sold", "favoriteProducts"].includes(screenType) && <SellerInfor />}
      {screenType === "sold" && <BuyerInfor />}
      <Review />
      {/* {!["selling", "sold", "favoriteProducts"].includes(screenType) && (
        <Button
          onPress={contactSellerHandler}
          color={color.button_indigo}
          width="90%"
          marX="5%"
          marY="2.5%"
          textSize={15}
          borR={7.5}
          textVP="1%"
        >
          Liên hệ
        </Button>
      )} */}
    </ScrollView>
  );
};

export default WatchDetails;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: "2.5%",
  },
  text: {
    fontSize: 13,
    fontFamily: "montserrat-regular",
  },
  price: {
    color: color.baemin1,
    fontSize: 16,
    fontFamily: "montserrat-semi-bold",
    marginVertical: "1.5%",
  },
  description: {
    fontFamily: "montserrat-medium",
  },
  watchName: {
    fontSize: 16,
    fontFamily: "montserrat-bold",
  },
  layout: {
    width: "90%",
    marginHorizontal: "5%",
  },
  warning: {
    marginRight: "5%",
    flexDirection: "row",
  },
  warningText: {
    // fontStyle: "italic",
    textDecorationLine: "underline",
  },
  icon: {
    marginRight: "2.5%",
  },
  shareText: {
    fontSize: 13,
    fontFamily: "montserrat-semi-bold",
  },
  shareContainer: {
    marginHorizontal: "5%",
  },
  shareImageContainer: {
    flexDirection: "row",
    marginVertical: "5%",
  },
  image: {
    marginRight: "3.5%",
  },
});
