import { useState, useRef, useMemo, createContext, useContext } from "react";
import axios from "axios";

const [uid, auth] = ["1004578927", "391890"];

async function getToken(uid, auth) {
  return await axios.post("https://website-api.tosgame.com/api/checkup/login", null, {
    params: {uid, auth}
  })
  .then(res => res.data?.token)
  .catch(err => {
    console.error(err?.message);
    throw err;
  });
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
    console.error(err?.message);
    throw err;
  });
}

const CheckupContext = createContext({});

const Provider = ({children}) => {
  const commonToken = useRef(undefined);
  const [inventory, setInventory] = useState(undefined);
  // TODO: trim and sort the inventory in advance
  const reducedInventory = useMemo(() => undefined, []);

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

  const hasCard = (id, minLv=0, minSlv=0, minEnhance=0) => {
    if(!inventory?.cards) return false;
    return inventory.cards.some(card => card.id === id && card.level >= minLv && card.skillLevel >= minSlv && card.enhanceLevel >= minEnhance);
  }

  return (
    <CheckupContext.Provider
      value={{
        queryInventory,
        updateInventory,
        inventory,
        reducedInventory,
        hasCard
      }}
    >
      {children}
    </CheckupContext.Provider>
  );
}

const useCheckup = () => useContext(CheckupContext);

export default Provider;
export { useCheckup };

// For F12 testing
if(process.env.NODE_ENV !== "production") {
  let token;
  global.testInventory = async () => {
    if(!token) token = await getCommonToken();
    return await getInventory(token, "909964560");
  }
}
