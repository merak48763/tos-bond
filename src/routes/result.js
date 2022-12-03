import { useMemo, useState } from "react";
import { useRouteLoaderData, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import CardItem from "../components/cardItem";
import BondDialog from "../components/bondDialog";

const ResultWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`;
const ResultTitle = styled.div`
  margin: 20px 0 7px 10px;
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

const queryResult = (query, filterValues, bonds) => {
  const m = /^(\d+(?:,\d+)*)$/g.exec(query);
  if(!m) return {};
  const tagList = query.split(",");
  const bondIds = Object.entries(filterValues).reduce((a, [k, v]) => tagList.includes(k) ? a.concat(...v) : a, []);
  const filteredBonds = bonds.filter(bond => bondIds.includes(bond.ability));
  const result = {};
  filteredBonds.forEach(bond => {
    if(bond.owner in result)
      result[bond.owner].push(bond);
    else
      result[bond.owner] = [bond];
  });
  return result;
};

const ResultPage = () => {
  const {bond: bondData, filterValues} = useRouteLoaderData("root");
  const {query} = useParams();
  const searchResult = useMemo(() => {
    return queryResult(query, filterValues, bondData);
  }, [query, bondData, filterValues]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [displayingId, setDisplayingId] = useState(0);
  const showBond = id => () => {
    setDisplayingId(id);
    setIsDialogOpen(true);
  };

  return (<>
    <ResultTitle>搜尋結果</ResultTitle>
    <ResultWrapper>
      {Object.keys(searchResult).length ? Object.keys(searchResult).map(owner => (
        <CardItem
          key={owner}
          cardId={owner}
          onClick={showBond(owner)}
        />
      )) : <NoItemLabel>無結果</NoItemLabel>}
      <BondDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        cardId={displayingId}
        bonds={searchResult[displayingId]}
      />
    </ResultWrapper>
  </>);
};

export { loader };
export default ResultPage;