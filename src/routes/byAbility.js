import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { AttributeFilter, RaceFilter, AbilityFilter } from "../components/filters";
import CardList from "../components/cardList";
import { searchByAbility } from "../util/search";

const ByAbilityPage = () => {
  const [filterA, setFilterA] = useState([]);
  const [filterR, setFilterR] = useState([]);
  const [filterS, setFilterS] = useState([]);
  const {filterTag, bondByAbility, cardData} = useOutletContext();
  const [result, setResult] = useState([]);

  const handleSearch = () => {
    setResult(searchByAbility(filterA, filterR, filterS, bondByAbility, cardData));
  }

  return <>
    <AttributeFilter value={filterA} setValue={setFilterA} />
    <RaceFilter value={filterR} setValue={setFilterR} />
    <AbilityFilter filterTag={filterTag} value={filterS} setValue={setFilterS} />
    <Button color="primary" size="large" variant="contained" startIcon={<SearchIcon />} onClick={handleSearch}>搜尋</Button>
    <CardList groupedSearchResult={result} isShowingOwner={true} />
  </>;
}

export default ByAbilityPage;
