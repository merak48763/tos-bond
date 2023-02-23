import { Fragment } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider
} from "@mui/material";
import styled from "@emotion/styled";
import BondCondition from "./bondCondition";
import BondAbility from "./bondAbility";
import CardInfo from "./cardInfo";

const AbilityData = styled.div`
  padding: 3px 0;
`;

const BondDialog = ({cardId, bonds, open, onClose, showByOwner}) => {
  const {cardData} = useOutletContext();
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        <CardInfo cardId={cardId} />
        {cardData[cardId]?.name ?? `未知`}
      </DialogTitle>
      <DialogContent dividers>
        {bonds?.map((bond, index) => (
          <Fragment key={showByOwner ? bond.condition : bond.owner}>
            {index > 0 && <Divider sx={{my: "6px"}} />}
            <AbilityData>
              {!showByOwner && <BondCondition condition={bond.owner} conditionType={-100} />}
              <BondCondition condition={bond.condition} conditionType={bond.conditionType} fullText={showByOwner} />
              <BondAbility ability={bond.ability} args={bond.args} />
            </AbilityData>
          </Fragment>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>關閉</Button>
      </DialogActions>
    </Dialog>
  );
}

export default BondDialog;
