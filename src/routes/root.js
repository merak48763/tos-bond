import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Typography, Fab, Tooltip } from "@mui/material";
import { Brightness6Outlined as BrightnessIcon } from "@mui/icons-material";
import { useDarkModeConfig } from "../theme/provider";
import NavBar from "../components/navBar";
import InventoryFlow from "../components/inventoryFlow";
import DevOnly from "../components/devOnly";
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
  margin: 16px;
  padding-bottom: 120px;
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
  const [cardData, setCardData] = useState({});
  const [filterConfig, setFilterConfig] = useState([]);
  const [filterTag, setFilterTag] = useState([]);

  const {toggleDarkMode} = useDarkModeConfig();

  useEffect(() => {
    Promise.all([
      axios.get("https://merak48763.github.io/tool_data/data/bond.json"),
      axios.get("https://merak48763.github.io/tool_data/data/monster.json"),
      axios.get("https://merak48763.github.io/tool_data/config/tos-bond.json")
    ]).then(([bondRes, monsterRes, configRes]) => {
      const [byAbility, byCondition] = [[], []];
      bondRes.data.forEach(bond => {
        const abilityEntry = byAbility.find(e => e[0] === bond.ability);
        if(abilityEntry === undefined) {
          byAbility.push([bond.ability, [bond]]);
        }
        else {
          abilityEntry[1].push(bond);
        }

        const conditionEntry = byCondition.find(e => e[0] === bond.condition);
        if(conditionEntry === undefined) {
          byCondition.push([bond.condition, [bond]]);
        }
        else {
          conditionEntry[1].push(bond);
        }
      });
      byAbility.sort((a, b) => a[0] - b[0]);
      byCondition.sort((a, b) => a[0] - b[0]);

      const cards = monsterRes.data.monster;

      const groupedTag = {};
      configRes.data.filters.forEach(rule => {
        if(rule.group in groupedTag) {
          groupedTag[rule.group].push(rule);
        }
        else {
          groupedTag[rule.group] = [rule];
        }
      });

      setBondByAbility(byAbility);
      setBondByCondition(byCondition);
      setCardData(cards);
      setFilterTag(Object.values(groupedTag));
      setFilterConfig(configRes.data.filters);
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
      <Typography variant="h5" component="div">資料載入中…</Typography>
    </LoadingPageContainer>
    : <>
      <NavBar />
      <AppWrapper>
        <Outlet context={{
          bondByAbility,
          bondByCondition,
          cardData,
          filterTag,
          filterConfig
        }} />
      </AppWrapper>
      <Tooltip placement="left" arrow title="切換主題">
        <Fab color="primary" sx={{
          position: "fixed",
          bottom: 16,
          right: 16
        }} onClick={toggleDarkMode}>
          <BrightnessIcon />
        </Fab>
      </Tooltip>
      <DevOnly>
        <InventoryFlow />
      </DevOnly>
    </>
  );
}

export default RootPage;
