import { useState, useRef, createContext, useContext } from "react";
import axios from "axios";

const [uid, auth] = ["1004578927", "391890"];

async function getToken(uid, auth) {
  return await axios.post("https://website-api.tosgame.com/api/checkup/login", null, {
    params: {uid, auth}
  })
  .then(res => res.data?.token)
  .catch(err => console.error(err?.message));
}

async function getCommonToken() {
  return await getToken(uid, auth);
}

async function getInventory(token, targetUid) {
  return await axios.get("https://website-api.tosgame.com/api/checkup/getUserProfile", {
    params: {token, targetUid}
  })
  .then(res => res.data?.userData)
  .catch(err => {
    if(err.response?.status === 400) return 400;
    console.error(err);
  });
}

const CheckupContext = createContext({});

const Provider = ({children}) => {
  const commonToken = useRef(undefined);
  const [inventory, setInventory] = useState(undefined);

  const queryInventory = async targetUid => {
    if(commonToken.current === undefined) {
      commonToken.current = await getCommonToken();
    }
    setInventory(await getInventory(commonToken.current, targetUid));
  }

  const updateInventory = async (targetUid, targetAuth) => {
    const token = await getToken(targetUid, targetAuth);
    setInventory(await getInventory(token, targetUid));
  }

  return (
    <CheckupContext.Provider value={{queryInventory, updateInventory, inventory}}>
      {children}
    </CheckupContext.Provider>
  );
}

const useCheckup = () => useContext(CheckupContext);

export default Provider;
export { useCheckup };
