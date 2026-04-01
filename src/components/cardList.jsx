import { useState } from "react";
import { Typography } from "@mui/material";
import CardItem from "./cardItem";
import BondDialog from "./bondDialog";
import styled from "@emotion/styled";

const CardListContainer = styled.div`
	display: flex;
	flex-flow: row wrap;
`;

const NoItemLabel = () => (
  <Typography color="gray" sx={{mt: 1}}>無結果</Typography>
);

const CardList = ({groupedSearchResult, isShowingOwner}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [displayingId, setDisplayingId] = useState(0);
  const [displayingBonds, setDisplayingBonds] = useState([]);
  const showBondOf = entry => () => {
    const [id, bonds] = entry;
    setDisplayingId(id);
    setIsDialogOpen(true);
    setDisplayingBonds(bonds);
  };

  return <>
    <Typography variant="h5" component="div" sx={{mt: 4}}>搜尋結果</Typography>
    {groupedSearchResult.length > 0
    ? <CardListContainer>
      {groupedSearchResult.map(entry => (
        <CardItem key={entry[0]} cardId={entry[0]} onClick={showBondOf(entry)} />
      ))}
    </CardListContainer>
    : <NoItemLabel />}
    <BondDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} cardId={displayingId} bonds={displayingBonds} showByOwner={isShowingOwner} />
  </>;
}

export default CardList;
