import { useOutletContext } from "react-router-dom";

const parseAttribute = id => [null, "水", "火", "木", "光", "暗"][id];
const parseRace = id => [null, "人", "獸", "妖", "龍", "神", null, null, "魔", null, "機械"][id];

const CardInfo = ({cardId}) => {
  const {cardData} = useOutletContext();
  return <>({parseAttribute(cardData[cardId]?.attribute) ?? "??"}/{parseRace(cardData[cardId]?.race) ?? "??"}) </>;
}

export default CardInfo;
