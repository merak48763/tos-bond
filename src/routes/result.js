import { useMemo, useState } from "react";
import { useRouteLoaderData, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import CardItem from "../components/cardItem";
import BondDialog from "../components/bondDialog";

const HeaderWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding-left: 10px;
  margin-bottom: 10px;
`;
const ResultWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`;
const ResultTitle = styled.div`
  margin: 20px 0 7px 0;
  font-size: 1.5em;
`;
const NoItemLabel = styled.div`
  color: #999;
  font-size: 1.2em;
  margin-left: 10px;
`;

const loader = async () => {
  return null;
};

const queryResult = (query, filterValues, bonds, showByOwner) => {
  const m = /^(\d+(?:,\d+)*)$/g.exec(query);
  if(!m) return {};
  const tagList = query.split(",");
  const bondIds = Object.entries(filterValues).reduce((a, [k, v]) => tagList.includes(k) ? a.concat(...v) : a, []);
  const filteredBonds = bonds.filter(bond => bondIds.includes(bond.ability));
  const result = {};
  if(showByOwner) {
    filteredBonds.forEach(bond => {
      if(bond.owner in result)
        result[bond.owner].push(bond);
      else
        result[bond.owner] = [bond];
    });
  }
  else {
    filteredBonds.forEach(bond => {
      if(bond.condition in result)
        result[bond.condition].push(bond);
      else
        result[bond.condition] = [bond];
    });
  }
  return result;
};

const ResultPage = () => {
  const {bond: bondData, filterValues} = useRouteLoaderData("root");
  const {query} = useParams();

  const [showByOwner, setShowByOwner] = useState(true);
  const togglePerspective = () => setShowByOwner(!showByOwner);

  const searchResult = useMemo(() => {
    return queryResult(query, filterValues, bondData, showByOwner);
  }, [query, bondData, filterValues, showByOwner]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [displayingId, setDisplayingId] = useState(0);
  const showBond = id => () => {
    setDisplayingId(id);
    setIsDialogOpen(true);
  };

  return (<>
    <HeaderWrapper>
      <ResultTitle>搜尋結果</ResultTitle>
      <Button variant="outlined" onClick={togglePerspective}>{showByOwner ? "持有者" : "解鎖條件"}</Button>
    </HeaderWrapper>
    <ResultWrapper>
      {Object.keys(searchResult).length ? Object.keys(searchResult).map(key => (
        <CardItem
          key={key}
          cardId={key}
          onClick={showBond(key)}
        />
      )) : <NoItemLabel>無結果</NoItemLabel>}
      <BondDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        cardId={displayingId}
        bonds={searchResult[displayingId]}
        showByOwner={showByOwner}
      />
    </ResultWrapper>
  </>);
};

export { loader };
export default ResultPage;