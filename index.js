import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function Home() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) loadMenu();
    });
  }, []);

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loadMenu = async () => {
    const snapshot = await getDocs(collection(db, "menu"));
    setMenu(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const addItem = async () => {
    await addDoc(collection(db, "menu"), { name: "Novo X", price: 25 });
    loadMenu();
  };

  if (!user) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Login Admin</h1>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} /><br/><br/>
        <input type="password" placeholder="Senha" onChange={e => setPassword(e.target.value)} /><br/><br/>
        <button onClick={login}>Entrar</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Painel Delivery Araquari</h1>
      <button onClick={() => signOut(auth)}>Sair</button>
      <h2>Cardápio</h2>
      <button onClick={addItem}>Adicionar Item Teste</button>
      {menu.map(item => (
        <div key={item.id}>
          {item.name} - R$ {item.price}
        </div>
      ))}
    </div>
  );
}
