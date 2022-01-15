import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "./colors";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
const STORAGE_KEY = "@toDos";

export default function App() {
  const [working, setWorking] = useState();
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  const work = () => {
    setWorking(true);
    // console.log(working);
  };

  const travel = () => {
    setWorking(false);
    // console.log(working);
  };

  const onChangeText = (payload) => setText(payload);

  const saveToDos = async (toSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (error) {
      console.log("error");
    }
  };

  const loadToDos = async () => {
    try {
      const s = await AsyncStorage.getItem(STORAGE_KEY);
      console.log(s);
      if (s !== null) {
        console.log("dㅕ기");
        setToDos(JSON.parse(s));
      }
      // const a = await AsyncStorage.getItem("1");
      // setWorking(JSON.parse(a));
    } catch (error) {
      console.log("error");
    }
  };
  console.log(toDos);

  useEffect(() => {
    loadToDos();
  }, []);

  useEffect(async () => {
    try {
      console.log(working, "워킹 셋중");
      await AsyncStorage.setItem("working", JSON.stringify(working));
      const f = await AsyncStorage.getItem("working");
      console.log(f, "확인");
    } catch (error) {
      console.log("error");
    }
  }, [working]);

  useEffect(async () => {
    try {
      const f = await AsyncStorage.getItem("working");
      console.log("새로렌더", f);
      if (f !== null) {
        if ((f = "true")) {
          console.log("1번");
          setWorking(true);
        } else {
          console.log("2번");
          setWorking(false);
        }
      } else {
        console.log("3번");
        setWorking(true);
      }
    } catch (error) {
      console.log("error");
    }
  }, []);

  const addToDo = async () => {
    if (text === "") {
      return;
    }
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };

  const deleteToDo = async (key) => {
    Alert.alert("Delete", "정말로 삭제하시겠어요?", [
      { text: "돌아가기" },
      {
        text: "삭제",
        onPress: async () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          await saveToDos(newToDos);
        },
      },
    ]);
    return;
  };

  console.log(working);
  Object.keys(toDos).map((key) => {
    console.log(typeof toDos[key].working);
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0} onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : "#ceadf7" }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : "#ceadf7",
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>

      {/* To Dos */}
      <ScrollView>
        {Object.keys(toDos).map((key) =>
          toDos[key].working === working ? (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>
                <FontAwesome name="circle-o" size={15} color="#a9aecb" />{" "}
                {/* <FontAwesome name="check-circle-o" size={16} color="#a9aecb" /> */}
                {toDos[key].text}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  deleteToDo(key);
                }}
              >
                <Text>
                  <Fontisto name="trash" size={16} color="#a9aecb" />
                </Text>
              </TouchableOpacity>
            </View>
          ) : null
        )}
      </ScrollView>

      {/* Add To Do */}
      <TextInput
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        returnKeyType={"done"}
        value={text}
        placeholder={working ? "+ New Task" : "+ New Place"}
        placeholderTextColor={"white"}
        placeholderStyle={{ color: "red" }}
        style={{
          ...styles.input,
          width: 150,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 25,
  },
  header: {
    flexDirection: "row",
    marginTop: 100,
    marginBottom: 20,
    justifyContent: "space-between",
    backgroundColor: "#af7fea",
    borderRadius: 5,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "700",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  input: {
    color: "white",
    backgroundColor: "#af7fea",
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 30,
    marginHorizontal: 110,
    fontSize: 18,
    fontWeight: "700",
  },
  toDo: {
    backgroundColor: "white",
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "#a9aecb",
    fontSize: 16,
    fontWeight: "500",
  },
});
