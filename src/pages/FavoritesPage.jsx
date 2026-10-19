import { useNavigate } from "react-router";
import { getFavorites, saveFavorites } from "../utils/favoritesStorage";
import { useState } from "react";
import ModalWindow from "../components/ModalWindow";
import { Typography, Card, Flex, Button, Empty, Popconfirm, Tag } from "antd";
import {
  PlayCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const FavoritesPage = () => {
  const [editingItem, setEditingItem] = useState(null);
  const [favList, setFavList] = useState(getFavorites);
  const navigate = useNavigate();
  function handleDelete(id) {
    const newList = favList.filter((item) => item.id !== id);
    setFavList(newList);
    saveFavorites(newList);
  }
  const handleSaveEdit = (data) => {
    const edited = favList.map((item) => {
      return item.id === editingItem.id ? { ...item, ...data } : item;
    });
    setFavList(edited);
    saveFavorites(edited);
  };
  return (
    <>
      <Typography.Title level={2}>Избранное</Typography.Title>
      {favList.length === 0 ? (
        // Empty — готовое «пустое состояние» с картинкой
        <Empty description="Сохраненных запросов пока нет">
          <Button type="primary" onClick={() => navigate("/")}>
            Перейти к поиску
          </Button>
        </Empty>
      ) : (
        <Flex vertical gap={12} style={{ maxWidth: 820 }}>
          {favList.map((item) => {
            return (
              <Card key={item.id} size="small" hoverable>
                <Flex justify="space-between" align="center" gap={16} wrap>
                  <div style={{ minWidth: 0 }}>
                    <Typography.Text strong>{item.name}</Typography.Text>
                    <br />
                    <Typography.Text type="secondary">
                      {item.query}
                    </Typography.Text>{" "}
                    <Tag>{item.maxResults} видео</Tag>
                  </div>
                  <Flex gap={8}>
                    <Button
                      type="primary"
                      icon={<PlayCircleOutlined />}
                      onClick={() => navigate("/", { state: item })}
                    >
                      Выполнить
                    </Button>
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => setEditingItem(item)}
                    >
                      Редактировать
                    </Button>
                    {/* Popconfirm — подтверждение «Вы уверены?» без своего кода */}
                    <Popconfirm
                      title="Удалить запрос?"
                      okText="Удалить"
                      cancelText="Отмена"
                      onConfirm={() => handleDelete(item.id)}
                    >
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        aria-label="Удалить"
                      />
                    </Popconfirm>
                  </Flex>
                </Flex>
              </Card>
            );
          })}
        </Flex>
      )}
      {editingItem && (
        <ModalWindow
          key={editingItem.id}
          onSave={handleSaveEdit}
          onClose={() => setEditingItem(null)}
          initialValues={editingItem}
          isEdit
        />
      )}
    </>
  );
};

export default FavoritesPage;
