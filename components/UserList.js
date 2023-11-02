import { FlatList, SafeAreaView } from "react-native";
import { ListItem } from "react-native-elements";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useState, useEffect } from "react";

export default function UserList({ route, navigation }) {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const usersCollection = collection(db, "users");
    const querySnapshot = await getDocs(usersCollection);

    const userList = [];
    querySnapshot.forEach((doc) => {
      userList.push({
        id: doc.id,
        nome: doc.data().nome,
        email: doc.data().email,
        nota1: doc.data().nota1,
        nota2: doc.data().nota2,
      });
    });

    setUsers(userList);
  };

  useEffect(() => {
    getUsers();
    console.log("Executou a atualização da lista");
  }, [route.params]);

  const renderAlunoItem = ({ item: aluno }) => (
    <ListItem
      key={aluno.id}
      bottomDivider
      onPress={() => navigation.navigate("UserDetails", aluno)}
    >
      <ListItem.Content>
        <ListItem.Title>{aluno.nome}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <SafeAreaView>
      <FlatList
        data={users}
        keyExtractor={(aluno) => aluno.id}
        renderItem={renderAlunoItem}
      />
    </SafeAreaView>
  );
}
