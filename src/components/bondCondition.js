import styled from "@emotion/styled";
import { useRouteLoaderData } from "react-router-dom";
import CardText from "./cardText";

const ConditionText = styled.div`
  font-family: Roboto;
  padding-bottom: 8px;
`;

const BondCondition = ({condition, conditionType}) => {
  const card = useRouteLoaderData("root")?.card ?? [];
  switch(conditionType) {
    case -100:
      return (
        <ConditionText>
          持有者：
          <CardText id={condition} name={card[condition]?.name} />
        </ConditionText>
      );
    case 1:
      return (
        <ConditionText>
          條件：擁有
          <CardText id={condition} name={card[condition]?.name} />
        </ConditionText>
      );
    case 2:
      return (
        <ConditionText>
          條件：擁有 Dual Max
          <CardText id={condition} name={card[condition]?.name} />
        </ConditionText>
      );
    case 3:
      return (
        <ConditionText>
          條件：擁有 All Max
          <CardText id={condition} name={card[condition]?.name} />
        </ConditionText>
      );
    default:
      return (
        <ConditionText>
          【解鎖條件資料未更新】
        </ConditionText>
      );
  }
};

export default BondCondition;