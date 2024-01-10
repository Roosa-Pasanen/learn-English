import { useLocation } from "react-router-dom";
import { useState } from "react";
import { WriteObject } from "./WriteObject.jsx";

export default function WriteTest() {
  const { promptList } = useLocation();
  const [checkState, setCheckState] = useState(false);
}
