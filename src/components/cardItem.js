import styled from "@emotion/styled";

const cardImageUrl = id => `https://merak48763.github.io/tool_data/image/monster/${id}.png`;

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
  background-color: rgba(0 0 0 / .8);
  color: white;
  font-family: Roboto;
  padding: 1px 0;
`;

const CardItem = ({name, cardId, onClick}) => {
  return (
    <CardWrapper>
      <CardImage src={cardImageUrl(cardId)} alt={name} onClick={onClick}/>
      <CardLabel>{cardId}</CardLabel>
    </CardWrapper>
  );
}

export default CardItem;
