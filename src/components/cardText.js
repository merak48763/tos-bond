import { Tooltip } from "@mui/material";
import styled from "@emotion/styled";

const cardImageUrl = id => `https://merak48763.github.io/tool_data/image/monster/${id}.png`;

const CardImage = styled.img`
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
  return (
    <Tooltip title={`${id} ${name ?? "未知"}`} PopperProps={{modifiers: tooltipModifier}}>
      <CardImage src={cardImageUrl(id)} alt={name}/>
    </Tooltip>
  );
}

export default Card;
