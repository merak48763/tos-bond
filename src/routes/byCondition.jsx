import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { AttributeFilter, RaceFilter, RarityFilter } from "../components/filters";
import CardList from "../components/cardList";
import { searchByCondition } from "../util/search";

const ByConditionPage = () => {
  const [attrFilter, setAttrFilter] = useState([]);
  const [raceFilter, setRaceFilter] = useState([]);
  const [rarityFilter, setRarityFilter] = useState([]);
  const {bondByCondition, cardData} = useOutletContext();
  const [result, setResult] = useState([]);

  const handleSearch = () => {
    setResult(searchByCondition(attrFilter, raceFilter, rarityFilter, bondByCondition, cardData));
  }

  return <>
    <AttributeFilter value={attrFilter} setValue={setAttrFilter} />
    <RaceFilter value={raceFilter} setValue={setRaceFilter} />
    <RarityFilter value={rarityFilter} setValue={setRarityFilter} />
    <Button sx={{mt: 2}} color="primary" size="large" variant="contained" startIcon={<SearchIcon />} onClick={handleSearch}>搜尋</Button>
    <CardList groupedSearchResult={result} isShowingOwner={false} />
  </>;
}

export default ByConditionPage;
