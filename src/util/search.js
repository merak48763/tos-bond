import filterConfig from "../data/filterConfig.json";

const searchByAbility = (filterA, filterR, filterS, bondByAbility, cardData) => {
  const abilitySet = new Set();
  filterS.forEach(tagId => {
    const abilities = filterConfig.find(f => f.id === tagId).values;
    abilities.forEach(a => abilitySet.add(a));
  });
  const abilityList = [...abilitySet].sort((a, b) => a - b);

  const result = [];
  if(abilityList.length > 0) {
    let index = 0;
    abilityList.forEach(ability => {
      while(index < bondByAbility.length && ability > bondByAbility[index][0]) ++index;
      if(index >= bondByAbility.length || ability < bondByAbility[index][0]) return;
      result.push(...bondByAbility[index][1]);
    });
  }
  else {
    bondByAbility.forEach(entry => result.push(entry[1]));
  }

  const groupedResult = [];
  result.filter(bond => {
    const card = cardData[bond.owner];
    if(filterA.length > 0) {
      if(!card) return false;
      if(!filterA.includes(card.attribute)) return false;
    }
    if(filterR.length > 0) {
      if(!card) return false;
      if(!filterR.includes(card.race)) return false;
    }
    return true;
  }).sort((a, b) => a.owner - b.owner).forEach(bond => {
    if(groupedResult.length === 0 || groupedResult[groupedResult.length-1][0] !== bond.owner) {
      groupedResult.push([bond.owner, [bond]]);
    }
    else {
      groupedResult[groupedResult.length-1][1].push(bond);
    }
  });

  return groupedResult;
}

const searchByCondition = (filterA, filterR, bondByCondition, cardData) => {
  const groupedResult = [];
  bondByCondition.forEach(entry => {
    const card = cardData[entry[0]];
    if(filterA.length > 0) {
      if(!card) return;
      if(!filterA.includes(card.attribute)) return;
    }
    if(filterR.length > 0) {
      if(!card) return;
      if(!filterR.includes(card.race)) return;
    }
    groupedResult.push(entry);
  });

  return groupedResult;
}

export { searchByAbility, searchByCondition };
