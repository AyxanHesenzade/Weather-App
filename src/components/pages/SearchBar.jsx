import { Input, Button } from "antd";

const SearchBar = ({ city, setCity, onSubmit }) => {
  return (
    <form className="Search-Bar" onSubmit={onSubmit} style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
      <Input className="Searc-Bar-Input"
        variant="filled"
        placeholder="Şəhəri daxil edin"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button className="Search-Bar-Button" type="primary" htmlType="submit">
        <img className="iconsearch" src="./src/assets/iconsearch.svg" alt="" />
      </Button>
    </form>
  );
};

export default SearchBar;
