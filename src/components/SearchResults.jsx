import VideoList from "../components/VideoList";
import { useState } from "react";
import { Flex, Typography, Tag, Segmented } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";

const SearchResults = ({ videos, title }) => {
  const [view, setView] = useState("grid");

  if (!videos.length) return null;
  return (
    <div style={{ marginTop: 32 }}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 20 }}>
        <Typography.Text type="secondary">
          Видео по запросу <Typography.Text strong>«{title}»</Typography.Text>{" "}
          <Tag>{videos.length}</Tag>
        </Typography.Text>

        {/* Segmented — переключатель из нескольких вариантов, вместо двух кнопок */}
        <Segmented
          value={view}
          onChange={setView}
          options={[
            { value: "grid", icon: <AppstoreOutlined /> },
            { value: "list", icon: <BarsOutlined /> },
          ]}
        />
      </Flex>
      <VideoList videos={videos} view={view} />
    </div>
  );
};

export default SearchResults;
