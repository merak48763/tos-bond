import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import NavBar from "../components/navBar";
import styled from "@emotion/styled";
import axios from "axios";

const LoadingPageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  text-align: center;
  &>* {
    flex-grow: 1;
  }
`;
const AppWrapper = styled.div`
  margin: 10px;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`;

const RootPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [bondByAbility, setBondByAbility] = useState([]);
  const [bondByCondition, setBondByCondition] = useState([]);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get("https://merak48763.github.io/tool_data/data/bond.json"),
      axios.get("https://merak48763.github.io/tool_data/data/monster.json")
    ]).then(([bondRes, monsterRes]) => {
      const [byAbility, byCondition] = [[], []];
      bondRes.data.forEach(bond => {
        const abilityEntry = byAbility.find(e => e[0] === bond.ability);
        if(abilityEntry === undefined) {
          byAbility.push([bond.ability, [bond]]);
        }
        else {
          byAbility[1].push(bond);
        }

        const conditionEntry = byCondition.find(e => e[0] === bond.condition);
        if(conditionEntry === undefined) {
          byCondition.push([bond.condition, [bond]]);
        }
        else {
          byCondition[1].push(bond);
        }
      });

      const cards = Object.entries(monsterRes.data.monster).map(([k, v]) => [parseInt(k), v]);

      setBondByAbility(byAbility);
      setBondByCondition(byCondition);
      setCardData(cards);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if(!loading && location.pathname === "/") {
      navigate("/ability");
    }
  }, [loading, navigate, location]);

  return (loading
    ? <LoadingPageContainer>
      <Typography variant="h5" component="div">資料載入中</Typography>
    </LoadingPageContainer>
    : <>
      <NavBar />
      <AppWrapper>
        <Outlet context={{
          bondByAbility,
          bondByCondition,
          cardData
        }} />
      </AppWrapper>
    </>
  );
}

export default RootPage;
