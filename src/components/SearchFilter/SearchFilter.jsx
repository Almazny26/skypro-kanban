import { useState } from "react";
import styled from "styled-components";

const SearchFilterContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 10px 15px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 6px;
  font-size: 16px;
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
  }

  &::placeholder {
    color: ${(props) => props.theme.textSecondary};
  }
`;

const ClearButton = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => props.theme.primary};
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }
`;

function SearchFilter({ onSearch, searchValue }) {
  const [localSearch, setLocalSearch] = useState(searchValue || "");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    onSearch(value);
  };

  const handleClear = () => {
    setLocalSearch("");
    onSearch("");
  };

  return (
    <SearchFilterContainer>
      <SearchInput
        type="text"
        placeholder="Поиск по названию задачи..."
        value={localSearch}
        onChange={handleSearchChange}
      />
      {localSearch && <ClearButton onClick={handleClear}>Очистить</ClearButton>}
    </SearchFilterContainer>
  );
}

export default SearchFilter;
