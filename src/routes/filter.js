import { useState, useEffect } from "react";
import {
  Outlet,
  redirect,
  useNavigate,
  useLocation,
  useLoaderData
} from "react-router-dom";
import { Button, ToggleButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import styled from "@emotion/styled";
import axios from "axios";
import NavBar from "../components/navBar";

const AppWrapper = styled.div`
  margin: 0 10px;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`;

const FilterGroup = styled.div`
  margin: 12px 0;
  display: flex;
  flex-flow: row wrap;
`;
const TagButton = styled(ToggleButton)`
  padding: 6px 8px;
  margin: 4px;
  width: 10em;
`;

const loader = async () => {
  try {
    const [bondRes, monsterRes, configRes] = await Promise.all([
      axios.get("https://merak48763.github.io/tool_data/data/bond.json"),
      axios.get("https://merak48763.github.io/tool_data/data/monster.json"),
      axios.get("https://merak48763.github.io/tool_data/config/tos-bond.json")
    ]);
    const groupedFilter = {};
    const filterValues = {};
    configRes.data.filters.forEach(rule => {
      if(rule.group in groupedFilter)
        groupedFilter[rule.group].push({
          id: rule.id,
          tag: rule.tag
        });
      else
        groupedFilter[rule.group] = [{
          id: rule.id,
          tag: rule.tag
        }];
      filterValues[rule.id] = rule.values;
    });

    return {
      bond: bondRes.data,
      card: monsterRes.data.monster,
      groupedFilter: Object.values(groupedFilter),
      filterValues
    };
  }
  catch {
    return redirect("/error");
  }
};

const genQuery = filters => {
  return Object.entries(filters).reduce((a, [k, v]) => v ? a.concat(k) : a, []);
};

const initFilter = location => {
  const m = /^\/(\d+(?:,\d+)*)$/g.exec(location.pathname);
  if(!m) return {};
  return Object.fromEntries(m[1].split(",").map(k => [k, true]));
};

const FilterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {groupedFilter} = useLoaderData();
  const [filters, setFilters] = useState({});

  useEffect(() => setFilters(initFilter(location)), [location]);

  const toggleFilter = key => () => {
    if(filters[key])
      setFilters({...filters, [key]: false});
    else
      setFilters({...filters, [key]: true});
  };

  const handleSearch = () => {
    const query = genQuery(filters);
    if(query) navigate(`/${query}`);
    else navigate("/");
  };

  return (<>
    <NavBar />
    <AppWrapper>
      {groupedFilter.map((group, i) => (
        <FilterGroup key={i}>
          {group.map(rule => (
            <TagButton disableRipple
              key={rule.tag}
              color="secondary"
              value={rule.tag}
              selected={filters[rule.id] ?? false}
              onChange={toggleFilter(rule.id)}
            >{rule.tag}</TagButton>
          ))}
        </FilterGroup>
      ))}
      <Button color="primary" size="large" variant="contained" startIcon={<SearchIcon />} onClick={handleSearch}>搜尋</Button>
      <Outlet />
    </AppWrapper>
  </>);
};

export { loader };
export default FilterPage;