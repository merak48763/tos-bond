import React from "react";
import {
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Tooltip,
  Typography
} from "@mui/material";
import { ClearOutlined as ResetIcon } from "@mui/icons-material";
import styled from "@emotion/styled";

const FilterWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-flow: column nowrap;
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;
const TagGroupContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  &:not(:last-of-type) {
    margin-bottom: 12px;
  }
`;
const TagButton = styled(ToggleButton)`
  padding: 6px 8px;
  margin: 4px;
  width: 10em;
`;
const SwitchButton = styled(ToggleButton)`
  padding: 4px 6px;
  width: 7em;
`;

const createToggleButtons = (entries, Component=TagButton) => {
  return entries.map(entry => (
    <Component key={entry[0]} value={entry[0]} disableRipple>{entry[1]}</Component>
  ));
}

const TagGroup = ({value, onChange, children}) => {
  const handleOnChange = (e, toggledKey) => {
    const index = value?.indexOf(toggledKey) ?? -1;
    if(value && index >= 0) {
      const newValue = [...value];
      newValue.splice(index, 1);
      onChange?.(e, newValue);
    }
    else {
      const newValue = value ? value.concat(toggledKey) : [toggledKey];
      onChange?.(e, newValue);
    }
  }

  return (
    <TagGroupContainer>
      {React.Children.map(children, child => {
        if(!React.isValidElement(child)) return null;
        return React.cloneElement(child, {
          onChange: handleOnChange,
          selected: value.indexOf(child.props.value) >= 0,
          color: "primary"
        });
      })}
    </TagGroupContainer>
  )
}

const AttributeFilter = ({value, setValue}) => {
  return (
    <FilterWrapper>
      <TitleWrapper>
        <Typography variant="h6" component="div" sx={{mr: 3}}>屬性</Typography>
        <Tooltip title="清除">
          <IconButton onClick={() => setValue([])}>
            <ResetIcon />
          </IconButton>
        </Tooltip>
      </TitleWrapper>
      <TagGroup value={value} onChange={(_, newValue) => setValue(newValue)}>
        {createToggleButtons([
          [1, "水"],
          [2, "火"],
          [3, "木"],
          [4, "光"],
          [5, "暗"]
        ])}
      </TagGroup>
    </FilterWrapper>
  );
}

const RaceFilter = ({value, setValue}) => {
  return (
    <FilterWrapper>
      <TitleWrapper>
        <Typography variant="h6" component="div" sx={{mr: 3}}>種族</Typography>
        <Tooltip title="清除">
          <IconButton onClick={() => setValue([])}>
            <ResetIcon />
          </IconButton>
        </Tooltip>
      </TitleWrapper>
      <TagGroup value={value} onChange={(_, newValue) => setValue(newValue)}>
        {createToggleButtons([
          [1, "人類"],
          [2, "獸類"],
          [3, "妖精"],
          [4, "龍類"],
          [5, "神族"],
          [8, "魔族"],
          [10, "機械"]
        ])}
      </TagGroup>
    </FilterWrapper>
  );
}

const RarityFilter = ({value, setValue}) => {
  return (
    <FilterWrapper>
      <TitleWrapper>
        <Typography variant="h6" component="div" sx={{mr: 3}}>稀有度</Typography>
        <Tooltip title="清除">
          <IconButton onClick={() => setValue([])}>
            <ResetIcon />
          </IconButton>
        </Tooltip>
      </TitleWrapper>
      <TagGroup value={value} onChange={(_, newValue) => setValue(newValue)}>
        {createToggleButtons([
          [5, "5 ★"],
          [6, "6 ★"],
          [7, "7 ★"],
          [8, "8 ★"]
        ])}
      </TagGroup>
    </FilterWrapper>
  );
}

const InventoryFilter = ({value, setValue, disabled}) => {
  return (
    <FilterWrapper>
      <TitleWrapper>
        <Typography variant="h6" component="div">篩選</Typography>
      </TitleWrapper>
      <ToggleButtonGroup exclusive value={!disabled && value} onChange={(_, newValue) => setValue(newValue ?? value)} disabled={disabled} color="primary">
        {createToggleButtons([
          [false, "全部顯示"],
          [true, "僅背包"]
        ], SwitchButton)}
      </ToggleButtonGroup>
    </FilterWrapper>
  );
}

const AbilityFilter = ({filterTag, value, setValue}) => {
  return (
    <FilterWrapper>
      <TitleWrapper>
        <Typography variant="h6" component="div" sx={{mr: 3}}>能力</Typography>
        <Tooltip title="清除">
          <IconButton onClick={() => setValue([])}>
            <ResetIcon />
          </IconButton>
        </Tooltip>
      </TitleWrapper>
      {filterTag.map((group, i) => (
        <TagGroup key={i} value={value} onChange={(_, newValue) => setValue(newValue)}>
          {createToggleButtons(group.map(rule => [rule.id, rule.tag]))}
        </TagGroup>
      ))}
    </FilterWrapper>
  );
}

export { AttributeFilter, RaceFilter, RarityFilter, InventoryFilter, AbilityFilter };
