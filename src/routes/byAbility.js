import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { AttributeFilter, RaceFilter, RarityFilter, AbilityFilter, InventoryFilter } from "../components/filters";
import CardList from "../components/cardList";
import { searchByAbility } from "../util/search";
import { useCheckup } from "../util/checkup";

const ByAbilityPage = () => {
  const {inventory, hasCard} = useCheckup();
  const [attrFilter, setAttrFilter] = useState([]);
  const [raceFilter, setRaceFilter] = useState([]);
  const [rarityFilter, setRarityFilter] = useState([]);
  const [invFilter, setInvFilter] = useState(false);
  const [skillFilter, setSkillFilter] = useState([]);
  const {filterTag, bondByAbility, cardData, filterConfig} = useOutletContext();
  const [result, setResult] = useState([]);

  const handleSearch = () => {
    const inventoryFilterFunction = invFilter ? hasCard : () => true;
    setResult(searchByAbility(attrFilter, raceFilter, rarityFilter, skillFilter, bondByAbility, cardData, filterConfig, inventoryFilterFunction));
  }

  return <>
    <AbilityFilter filterTag={filterTag} value={skillFilter} setValue={setSkillFilter} />
    <AttributeFilter value={attrFilter} setValue={setAttrFilter} />
    <RaceFilter value={raceFilter} setValue={setRaceFilter} />
    <RarityFilter value={rarityFilter} setValue={setRarityFilter} />
    <InventoryFilter value={invFilter} setValue={setInvFilter} disabled={!inventory} />
    <Button sx={{mt: 2}} color="primary" size="large" variant="contained" startIcon={<SearchIcon />} onClick={handleSearch}>搜尋</Button>
    <CardList groupedSearchResult={result} isShowingOwner={true} />
  </>;
}

export default ByAbilityPage;
