import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import Stars from "react-native-stars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BarChart } from "react-native-gifted-charts";
import { reviewList } from "../../constants/data";
import EmptyReview from "../../Screens/Overlay/EmptyReview";
import Ionicons from "@expo/vector-icons/Ionicons";

// import { Feather } from "@expo/vector-icons";
// import { SimpleLineIcons } from "@expo/vector-icons";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useSelector } from "react-redux";
import color from "../../constants/color";
// import { watchDetailsActions } from "../../redux/watch/watchDetailsSlice";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const avatarSize = screenHeight / 18;
const rList = reviewList;

const Review = (props) => {
  //   const data = useSelector(state => state.details.item);
  const dataReview = [
    { value: 250, label: "(5)" },
    { value: 625, label: "(4)" },
    { value: 200, label: "(3)" },
    { value: 320, label: "(2)" },
    { value: 1000, label: "(1)" },
  ];

  function Box({ id, avatar, name, message, date, watch }) {
    return (
      <View style={styles.chatContainer}>
        <View style={{ flexDirection: "row", paddingVertical: "3%" }}>
          <View style={{ width: avatarSize, height: avatarSize }}>
            <Image
              style={styles.avatarImg}
              source={{
                uri: avatar,
              }}
            />
          </View>
          <View
            style={{
              marginLeft: "3%",
              justifyContent: "space-around",
              width: "85%",
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.name}>{name}</Text>
              <Stars
                display={3}
                spacing={5}
                count={3}
                starSize={100}
                fullStar={<Icon name={"star"} style={[styles.myStarStyle]} />}
                emptyStar={
                  <Icon
                    name={"star-outline"}
                    style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                  />
                }
                halfStar={
                  <Icon name={"star-half"} style={[styles.myStarStyle]} />
                }
              />
            </View>
            <Text style={styles.date}>
              {date} - {watch}
            </Text>

            <Text style={styles.message}>{message}</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Nhận xét người bán</Text>
      {rList.length > 0 && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View style={{ alignItems: "center", width: "30%" }}>
            <Text style={styles.text}>3.5 / 5</Text>
            <Stars
              display={3.5}
              spacing={10}
              count={5}
              starSize={50}
              fullStar={<Icon name={"star"} size={15} style={[styles.myStarStyle]} />}
              emptyStar={
                <Icon
                  name={"star-outline"}
                  size={15}
                  style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                />
              }
              halfStar={
                <Icon name={"star-half"} size={15} style={[styles.myStarStyle]} />
              }
            />
          </View>
          <View
            style={{
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              maxHeight: 180,
            }}
          >
            <BarChart
              horizontal
              shiftX={-20}
              barWidth={10}
              barBorderRadius={4}
              initialSpacing={0}
              frontColor={color.baemin1}
              data={dataReview}
              hideRules
              hideYAxisText
              yAxisThickness={0}
              xAxisThickness={0}
              isAnimated
            />
          </View>
        </View>
      )}
      {rList.length > 0 ? (
        rList.map((item, key) => (
          <Box
            key={key}
            id={item.id}
            avatar={item.avatar}
            name={item.name}
            message={item.message}
            date={item.date}
            watch={item.watch}
          />
        ))
      ) : (
        <Text style={[styles.text, { color: "black", fontSize: 15 }]}>
          Người bán chưa có nhận xét nào!
        </Text>
      )}
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  root: {
    marginVertical: "2.5%",
    paddingHorizontal: 10,
    flex: 1,
  },
  text: {
    fontFamily: "montserrat-bold",
    fontSize: 18,
    marginHorizontal: "5%",
    color: color.baemin1,
  },
  myStarStyle: {
    color: color.yellow,
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: "white",
  },
  chatContainer: {
    backgroundColor: "white",
    elevation: 2,
    overflow: "hidden",
    paddingHorizontal: "5%",
    marginVertical: "1%",
  },
  avatarImg: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: 100,
  },
  message: {
    fontSize: 12,
    fontFamily: "montserrat-regular",
  },
  date: {
    fontSize: 12,
    fontFamily: "montserrat-light",
  },
  name: {
    fontSize: 16,
    fontFamily: "montserrat-semi-bold",
  },
});
