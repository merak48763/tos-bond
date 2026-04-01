import aprilFool2026Data from "../data/aprilFool2026.json"

const aprilFool2026IconSet = new Set(aprilFool2026Data.special_icons);

const cardImageUrl = (id, isAprilFool) => (
  isAprilFool && aprilFool2026IconSet.has(id)
  ? `https://merak48763.github.io/tool_data/image/monster/sp/april_fool_2026/${id}.png`
  : `https://merak48763.github.io/tool_data/image/monster/${id}.png`
);

export { cardImageUrl };
