import { Fragment } from "react";
import { useRouteLoaderData } from "react-router-dom";
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

const AbilityData = styled.div`
  padding: 3px 0;
`;

const parseAttribute = id => [null, "水", "火", "木", "光", "暗"][id];
const parseRace = id => [null, "人", "獸", "妖", "龍", "神", null, null, "魔", null, "機械"][id];

const BondDialog = ({cardId, bonds, open, onClose}) => {
  const cardData = useRouteLoaderData("root").card;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
    >
      <DialogTitle>{cardData[cardId]?.name ?? `未知 (${cardId})`} （{parseAttribute(cardData[cardId]?.attribute) ?? "??"}/{parseRace(cardData[cardId]?.race) ?? "??"}）</DialogTitle>
      <DialogContent dividers>
        {bonds?.map((bond, index) => (
          <Fragment key={bond.condition}>
            {index > 0 && <Divider sx={{my: "6px"}} />}
            <AbilityData>
              <BondCondition condition={bond.condition} conditionType={bond.conditionType} />
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
};

export default BondDialog;