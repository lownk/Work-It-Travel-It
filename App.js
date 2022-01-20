import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "./colors";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

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
  const NewOnChangeText = (payload) => setNewText(payload);

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
  };

  const cancelEditing = async (key) => {
    const newToDos = { ...toDos };
    newToDos[key].editing = false;
    setToDos(newToDos);
    await saveToDos(newToDos);

    // console.log(newToDos);
  };

  const addEditedTodo = async (key) => {
    const newToDos = { ...toDos };

    if (newText == "") {
      newToDos[key].editing = false;
    } else {
      newToDos[key].text = newText;
      setToDos(newToDos);
      // console.log(newToDos[key].text);
      await saveToDos(newToDos);
      setNewText("");
    }
  };

  // useEffect(() => {
  //   console.log(toDos);
  // }, [toDos]);

  const inputRef = useRef(null);
  const onFocusHandler = () => {};
  useEffect(() => {
    console.log();
    inputRef.current && inputRef.current.focus();
  }, [toDos]);

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
                {toDos[key].done === false ? (
                  <Ionicons
                    name="md-checkbox-outline"
                    size={24}
                    color="#a9aecb"
                    onPress={() => {
                      doneToDo(key);
                    }}
                  />
                ) : (
                  <Ionicons
                    name="md-checkbox"
                    size={24}
                    color="#a9aecb"
                    onPress={() => {
                      doneToDo(key);
                    }}
                  />
                )}{" "}
                {toDos[key].editing === true ? (
                  <View>
                    <TextInput
                      ref={inputRef}
                      //  우리가 이제 하려는건
                      //  투두 클릭했을때 인풋에 포커스가 생기는거
                      //  그럼 어ㅓ쨌든 투두의 에디팅을 너가 바꿔줬잖아 그럼
                      //  인풋에 포커스가 올라오는건 투두가 바뀔떄마다 실행이된까
                      //  유즈이펙트에 [투두스] 이걸로 유즈이펙트를 실행하는거지 해바 여기까지만 어디?

                      //  유즈이펙트가 특정 스테이트가 변할때 뭔가를 할수 있다고 했잖앙? 용도는 여러가지고 그중하나가 특정스테이트 변하는걸 관찰하고 변하면 유즈이펙트 안에 있는것을 실행한다 그러니까 투두스를 클릭했을때 어떤 스테이트가 변하고 그 변하는 스테이트를 관찰하는 유즈이펙트를 만든다

                      //  너가 어떻게 하고싶은지? 투두가 바뀔때잖아?
                      //  그렇지 않아?난 영어 안쓰니까 너가 정해놓은 스테이트 명칭
                      placeholder={toDos[key].text}
                      onBlur={() => {
                        cancelEditing(key);
                      }}
                      value={newText}
                      onChangeText={NewOnChangeText}
                      onSubmitEditing={() => {
                        addEditedTodo(key);
                      }}
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
          shadowColor: "#000000",
          shadowOpacity: 0.3,
          shadowOffset: { width: 2, height: 2 },
          elevation: 4,
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
    elevation: 4,
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
    elevation: 2,
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
