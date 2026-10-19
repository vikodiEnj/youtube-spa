import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { searchVideos } from "../api/youtubeapi";
import { useState, useEffect } from "react";
import ModalWindow from "../components/ModalWindow";
import { useLocation } from "react-router";
import { saveFavorites, getFavorites } from "../utils/favoritesStorage";
import { Flex, Typography, message } from "antd";

const MainPage = () => {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // message — всплывающие уведомления antd. Хук возвращает api и contextHolder,
  // contextHolder нужно отрендерить, чтобы уведомления подхватили тему
  const [messageApi, contextHolder] = message.useMessage();

  const location = useLocation();
  const saved = location.state;

  useEffect(() => {
    if (saved) handleSearch(saved);
  }, [saved]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  async function handleSearch(params) {
    try {
      const res = await searchVideos(params);
      setVideos(res);
      setTitle(params.query);
    } catch (error) {
      console.error(error);
      messageApi.error(error.message);
    }
  }

  const handleSaveNew = (data) => {
    saveFavorites([...getFavorites(), { id: crypto.randomUUID(), ...data }]);
    messageApi.success("Запрос сохранён в избранное");
  };

  return (
    // Пока поиска не было — всё по центру, после — прижимается наверх
    <Flex
      vertical
      align={title ? "stretch" : "center"}
      justify={title ? "flex-start" : "center"}
      style={{ minHeight: title ? undefined : "60vh" }}
    >
      {contextHolder}
      <Typography.Title level={title ? 2 : 1}>Поиск видео</Typography.Title>
      <SearchBar
        handleSearch={handleSearch}
        handleOpenModal={handleOpenModal}
        canSave={Boolean(title)}
        initialQuery={saved?.query}
      />
      {isModalOpen && (
        <ModalWindow
          onSave={handleSaveNew}
          onClose={handleCloseModal}
          initialValues={{ query: title }}
        />
      )}
      <SearchResults videos={videos} title={title} />
    </Flex>
  );
};

export default MainPage;
