import { Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
function IconButton({ icon, color, onPress, size }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <AntDesign
        name={icon}
        size={size}
        color={color}
      />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
