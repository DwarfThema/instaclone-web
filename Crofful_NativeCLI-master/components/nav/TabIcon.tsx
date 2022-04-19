import { Ionicons } from "@expo/vector-icons";
import React from "react";

const TabIcon = ({ iconName, color, focused, size }: any) => {
  return <Ionicons name={iconName} size={size} color={color} />;
};

export default TabIcon;
