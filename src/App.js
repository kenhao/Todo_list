import React,{useState, useEffect} from "react";
// import Form from "./components/Form";
// import TodoList from "./components/TodoList";
// import Data from "./components/Data";

import { database } from './firebase/firebase_config';
import { ref, onValue, off } from 'firebase/database';

const App = () => {
  
  const [data, setData] = useState({}); // 用于存储从Firebase读取的数据

  useEffect(() => {
    const databaseRef = ref(database, 'Test'); // 更换为您的数据路径
    onValue(databaseRef, (snapshot) => {
      const dbData = snapshot.val();
      console.log('Firebase Data:', dbData); // 输出Firebase数据
      setData(dbData);
    });

    return () => off(databaseRef);
  }, []);

  return (
    <div className="App">
      <h1>Firebase Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>  {/* 以JSON格式输出数据 */}
    </div>
  );
}

export default App;
