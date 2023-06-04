import axios from "axios";
import { useEffect, useRef, useReducer } from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";
import { getMessage } from "../helpers/getMessage";

export const useForecast = (url: any) => {
  const cache = useRef({});

  const initialState = {
    status: "idle",
    error: null,
    data: [],
  };

  const [state, dispatch] = useReducer((state: any, action: any) => {
    switch (action.type) {
      case "FETCHING":
        return { ...initialState, status: "fetching" };
      case "FETCHED":
        return { ...initialState, status: "fetched", data: action.payload };
      case "FETCH_ERROR":
        return { ...initialState, status: "error", error: action.payload };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    let cancelRequest = false;
    if (!url || !url.trim()) return;

    const fetchData = async () => {
      dispatch({ type: "FETCHING" });
      //   @ts-ignore
      if (cache.current[url]) {
        //   @ts-ignore

        const data = cache.current[url];
        dispatch({ type: "FETCHED", payload: data });
      } else {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            Alert.alert("Permission to access location was denied");
            return;
          }
          const { data } = await axios.get(url);
          //   @ts-ignore
          cache.current[url] = data;
          if (cancelRequest) return;
          dispatch({ type: "FETCHED", payload: data });
        } catch (error: any) {
          if (cancelRequest) return;
          dispatch({ type: "FETCH_ERROR", payload: getMessage(error) });
        }
      }
    };

    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [url]);

  return state;
};
