import { Tooltip } from "@mui/material";
import styled from "@emotion/styled";
import { useThemeConfig } from "../theme/provider";
import { cardImageUrl } from "../util/cardImage";

const CardImage = styled.img`
  box-sizing: content-box;
  width: 2em;
  height: 2em;
  padding: 0 .2em;
  vertical-align: bottom;
  cursor: help;
`;

const tooltipModifier = [
  {
    name: "offset",
    options: {
      offset: [0, -10]
    }
  }
];

const Card = ({name, id}) => {
  const {isAprilFool} = useThemeConfig();

  return (
    <Tooltip enterTouchDelay={0} title={`${id} ${name ?? "未知"}`} PopperProps={{modifiers: tooltipModifier}}>
      <CardImage src={cardImageUrl(id, isAprilFool)} alt={name}/>
    </Tooltip>
  );
}

export default Card;
