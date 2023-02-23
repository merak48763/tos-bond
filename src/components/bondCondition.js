import styled from "@emotion/styled";
import { useOutletContext } from "react-router-dom";
import CardText from "./cardText";

const ConditionText = styled.div`
  font-family: Roboto;
  padding-bottom: 8px;
`;

const BondCondition = ({condition, conditionType, fullText}) => {
  const {cardData} = useOutletContext();
  switch(conditionType) {
    case -100:
      return (
        <ConditionText>
          羈絆持有者：
          <CardText id={condition} name={cardData[condition]?.name} />
        </ConditionText>
      );
    case 1:
      return fullText ? (
        <ConditionText>
          解鎖條件：擁有
          <CardText id={condition} name={cardData[condition]?.name} />
        </ConditionText>
      ) : (
        <ConditionText>解鎖條件：擁有此卡</ConditionText>
      );
    case 2:
      return fullText ? (
        <ConditionText>
          解鎖條件：擁有 Dual Max
          <CardText id={condition} name={cardData[condition]?.name} />
        </ConditionText>
      ) : (
        <ConditionText>解鎖條件：此卡為 Dual Max</ConditionText>
      );
    case 3:
      return fullText ? (
        <ConditionText>
          解鎖條件：擁有 All Max
          <CardText id={condition} name={cardData[condition]?.name} />
        </ConditionText>
      ) : (
        <ConditionText>解鎖條件：此卡為 All Max</ConditionText>
      );
    default:
      return (
        <ConditionText>
          【解鎖條件資料未更新】
        </ConditionText>
      );
  }
}

export default BondCondition;