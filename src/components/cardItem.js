import styled from "@emotion/styled";
import { useThemeConfig } from "../theme/provider";
import { cardImageUrl } from "./cardImage";

const CardWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  text-align: center;
  width: 60px;
  margin: 8px 12px;
`;

const CardImage = styled.img`
  width: 60px;
  height: 60px;
  cursor: pointer;
`;

const CardLabel = styled.div`
  background-color: rgba(50 50 50);
  color: white;
  font-family: Roboto;
`;

const CardItem = ({cardId, onClick}) => {
  const {isAprilFool} = useThemeConfig();

  return (
    <CardWrapper>
      <CardImage src={cardImageUrl(cardId, isAprilFool)} alt={cardId} onClick={onClick} />
      <CardLabel>{cardId}</CardLabel>
    </CardWrapper>
  );
}

export default CardItem;
