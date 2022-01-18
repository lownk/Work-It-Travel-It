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
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const [done, setDone] = useState(false);
  const [newText, setNewText] = useState("");
  const [editing, setEditing] = useState(false);

  const work = async () => {
    setWorking(true);
    await AsyncStorage.setItem("working", JSON.stringify(true));
  };

  const travel = async () => {
    setWorking(false);
    await AsyncStorage.setItem("working", JSON.stringify(false));
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
      // console.log(s);
      if (s !== null) {
        setToDos(JSON.parse(s));
      }
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    loadToDos();
  }, []);

  useEffect(async () => {
    try {
      const f = await AsyncStorage.getItem("working");
      if (f !== null) {
        if (f === "true") {
          setWorking(true);
        } else {
          setWorking(false);
        }
      } else {
        setWorking(true);
      }
    } catch (error) {
      console.log("error f");
    }
  }, []);

  const addToDo = async () => {
    if (text === "") {
      return;
    }
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working, done, editing },
    };
    // console.log(newToDos);

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

  const doneToDo = async (key) => {
    const newToDos = { ...toDos };
    newToDos[key].done = !newToDos[key].done;
    setToDos(newToDos);
    await saveToDos(newToDos);
  };

  const editToDo = async (key) => {
    const newToDos = { ...toDos };
    newToDos[key].editing = true;
    setToDos(newToDos);
    await saveToDos(newToDos);

    console.log(toDos);
  };

  // useEffect(() => {
  //   console.log(toDos);
  // }, [toDos]);

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
              <Text>
                <FontAwesome
                  name="trash"
                  size={17}
                  color="#a9aecb"
                  onPress={() => {
                    doneToDo(key);
                  }}
                />{" "}
                {toDos[key].editing === true ? (
                  <View>
                    <Text>김롱롱 사랑해</Text>
                    <TextInput
                      placeholder={"Task를 수정해주세요."}
                      style={{}}
                    />
                  </View>
                ) : (
                  <Text
                    onPress={() => {
                      editToDo(key);
                    }}
                    style={
                      toDos[key].done === false
                        ? styles.toDoText
                        : styles.toDoTextLine
                    }
                  >
                    {toDos[key].text}
                  </Text>
                )}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  deleteToDo(key);
                }}
              >
                <Text>
                  <Fontisto name="trash" size={17} color="#a9aecb" />
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
  toDoTextLine: {
    color: "#a9aecb",
    textDecorationLine: "line-through",
    fontSize: 16,
    fontWeight: "500",
  },
});
