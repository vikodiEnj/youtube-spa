import { useState } from "react";
import { Input, Button, Tooltip } from "antd";
import { HeartOutlined } from "@ant-design/icons";

const SearchBar = ({
  handleSearch,
  handleOpenModal,
  canSave,
  initialQuery,
}) => {
  const [text, setText] = useState(initialQuery || "");

  // Input.Search сам ловит Enter и клик по кнопке и отдаёт текст в onSearch,
  // поэтому своя <form> с preventDefault больше не нужна
  const onSearch = (value) => {
    if (!value.trim()) return;
    handleSearch({ query: value.trim() });
  };

  return (
    <Input.Search
      size="large"
      placeholder="Что хотите посмотреть?"
      enterButton="Найти"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onSearch={onSearch}
      style={{ maxWidth: 720 }}
      // suffix — слот справа внутри поля, туда кладём сердечко.
      // Слот есть всегда (пустой span, пока нечего сохранять): если добавлять
      // и убирать suffix на лету, antd перестраивает DOM и поле теряет фокус
      suffix={
        canSave ? (
          <Tooltip title="Сохранить запрос">
            <Button
              type="text"
              size="small"
              icon={<HeartOutlined />}
              onClick={handleOpenModal}
            />
          </Tooltip>
        ) : (
          <span />
        )
      }
    />
  );
};
export default SearchBar;
