import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import axios from "axios";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // sinon reset de mes states et de ma page
    // console.log("submited");
    setErrorMessage(null);
    if (password !== confPassword) {
      return setErrorMessage("Password are not same");
    }
    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
        {
          password: password,
          email: email,
          username: username,
          description: description,
        }
      );
      alert("Vous etes inscris !");
      console.log(response.data);
    } catch (error) {
      alert(error.message);
      if (error.response.status === 409) {
        setErrorMessage("adresse déja utilisée");
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez renseigner toutes vos informations");
      } else {
        setErrorMessage("Erreur, veuillez réessayer svp !");
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "space-evenly",
          flex: 1,
        }}
      >
        <View
          style={{ justifyContent: "center", alignItems: "center", gap: 40 }}
        >
          <Image
            resizeMode="contain"
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8fYsTmR0-TXLa06mx13LRXBgbNyBgylU3cw&s",
            }}
            style={{ height: 100, width: 120 }}
          ></Image>
          <Text style={{ color: "gray", fontWeight: "bold", fontSize: 20 }}>
            Sign Up
          </Text>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <TextInput
            style={{
              height: 44,
              width: "50%",
              borderBottomColor: "red",
              borderBottomWidth: 1,
              marginBottom: 40,
            }}
            placeholder="Email"
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
          />
          <TextInput
            style={{
              height: 44,
              width: "50%",
              borderBottomColor: "red",
              borderBottomWidth: 1,
              marginBottom: 40,
            }}
            placeholder="username"
            onChangeText={(text) => {
              setUsername(text);
            }}
            value={username}
          />
          <TextInput
            style={{
              height: 100,
              width: "50%",
              borderColor: "red",
              borderWidth: 1,
              marginBottom: 40,
            }}
            multiline={true}
            numberOfLines={10}
            maxLength={250}
            placeholder="decris toi en quelques lignes !"
            onChangeText={(text) => {
              setDescription(text);
            }}
            value={description}
          />

          <TextInput
            style={{
              height: 44,
              width: "50%",
              borderBottomColor: "red",
              borderBottomWidth: 1,
            }}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
          />
          <TextInput
            style={{
              height: 44,
              width: "50%",
              borderBottomColor: "red",
              borderBottomWidth: 1,
            }}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setConfPassword(text);
            }}
            value={confPassword}
          />
        </View>
        <View style={{ alignItems: "center", gap: 10 }}>
          <TouchableOpacity style={{}} onPress={handleSubmit}>
            <Text>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Text style={{ color: "gray" }}>already registered ? Sign In</Text>
          </TouchableOpacity>
        </View>
        {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
        <StatusBar />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default Signup;
