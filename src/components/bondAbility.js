import styled from "@emotion/styled";

const AbilityText = styled.div`
  white-space: pre
`;

const parseElement = id => [null, "水", "火", "木", "光", "暗"][id] ?? "??";
const parseRace = id => [null, "人族", "獸族", "妖族", "龍族", "神族",null ,null ,"魔族",null ,"機械族"][id] ?? "??族"

const parseAbility = (id, [arg0, arg1]) => {
  switch(id) {
    case 20001:
      return `發動自身角色符石\n⇒ 將移動符石時觸碰的\n    首 ${arg0} 粒符石轉化為${parseRace(arg1)}符石`;
    case 20002:
      return `首批消除自身角色符石\n⇒ 個人以 ${arg0}% 攻擊力追打 ${arg1} 次`;
    case 20003:
      return `首批消除自身角色符石\n⇒ 增加 ${arg0} 連擊 (Combo)`;
    case 20004:
      return `消除符石後，\n若場上有自身角色符石\n⇒ 將角色符石所在兩側的符石\n    轉化為${parseElement(arg0)}${parseRace(arg1)}符石`;
    case 20005:
      return `發動自身角色符石及\n首批沒有消除自身角色符石\n⇒ 自身技能 CD -${arg0}`;
    case 20006:
      return `發動自身角色符石及\n首批沒有消除自身角色符石\n⇒ 自身技能 EP +${arg0}`;
    case 20007:
      return `發動自身角色符石\n⇒ 必然延長移動符石時間 ${arg0} 秒`;
    case 20008:
      return `首批消除自身角色符石\n⇒ 自身無視敵人防禦力`;
    case 20009:
      return `首批消除自身角色符石\n⇒ 自身對${parseElement(arg0)}屬性目標攻擊力 +${arg1}1%`;
    case 20010:
      return `首批消除自身角色符石\n⇒ 自身對${parseRace(arg0)}目標攻擊力 +${arg1}%`;
    case 20011:
      return `首批消除自身角色符石\n⇒ 自身無視「攻前盾」`;
    case 20012:
      return `首批消除自身角色符石\n⇒ 自身無視「固定連擊盾」`;
    case 20013:
      return `首批消除自身角色符石\n⇒ 自身無視「二屬盾」`;
    case 20014:
      return `首批消除自身角色符石\n⇒ 自身無視「三屬盾」`;
    case 20015:
      return `首批消除自身角色符石\n⇒ 自身無視「四屬盾」`;
    case 20016:
      return `首批消除自身角色符石\n⇒ 自身無視「五屬盾」`;
    case 20017:
      return `發動自身角色符石\n⇒「燃燒」傷害減至 ${arg0}`;
    case 20018:
      return `發動自身角色符石\n⇒ 無視「黏腐」敵技`;
    case 20019:
      return `消除符石後，\n若場上有自身角色符石\n⇒ 將角色符石上下兩側的符石\n    轉化為${parseElement(arg0)}${parseRace(arg1)}符石`;
    case 20020:
      return `發動自身角色符石\n⇒ 該粒角色符石添加為\n    自身種族符石`;
    case 20021:
      return `發動自身角色符石\n⇒ 回復自身回復力基值 ${arg0}% \n    的生命力`;
    case 20022:
      return `發動自身角色符石\n⇒ 觸碰「暴風」時仍可移動符石`;
    case 20023:
      return `發動自身角色符石\n⇒ 觸碰「連環光牢」時仍可移動符石`;
    default:
      return `羈絆能力 #${id}\n【資料未更新】`;
  }
};

const BondAbility = ({ability, args}) => {
  return (
    <AbilityText>{parseAbility(ability, args)}</AbilityText>
  );
};

export default BondAbility