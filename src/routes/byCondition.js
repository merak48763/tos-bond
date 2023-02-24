import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { AttributeFilter, RaceFilter } from "../components/filters";
import CardList from "../components/cardList";
import { searchByCondition } from "../util/search";

const ByConditionPage = () => {
  const [filterA, setFilterA] = useState([]);
  const [filterR, setFilterR] = useState([]);
  const {bondByCondition, cardData} = useOutletContext();
  const [result, setResult] = useState([]);

  const handleSearch = () => {
    setResult(searchByCondition(filterA, filterR, bondByCondition, cardData));
  }

  return <>
    <AttributeFilter value={filterA} setValue={setFilterA} />
    <RaceFilter value={filterR} setValue={setFilterR} />
    <Button sx={{mt: 2}} color="primary" size="large" variant="contained" startIcon={<SearchIcon />} onClick={handleSearch}>搜尋</Button>
    <CardList groupedSearchResult={result} isShowingOwner={false} />
  </>;
}

export default ByConditionPage;
