import VideoItem from "../components/VideoItem";
import { Row, Col, Flex } from "antd";

const VideoList = ({ videos, view }) => {
  if (view === "list") {
    return (
      <Flex vertical gap={16}>
        {videos.map((item) => (
          <VideoItem key={item.id.videoId} video={item} view="list" />
        ))}
      </Flex>
    );
  }

  // Сетка antd: строка делится на 24 части.
  // xs={24} — на телефоне карточка на всю ширину, lg={6} — 4 в ряд на больших экранах
  return (
    <Row gutter={[16, 24]}>
      {videos.map((item) => (
        <Col key={item.id.videoId} xs={24} sm={12} md={8} lg={6}>
          <VideoItem video={item} view="grid" />
        </Col>
      ))}
    </Row>
  );
};

export default VideoList;
