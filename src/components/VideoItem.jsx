import { Card, Typography, Flex } from "antd";
import { decodeHtml } from "../utils/decodeHtml";

const VideoItem = ({ video, view }) => {
  const title = decodeHtml(video.snippet.title);
  const channel = decodeHtml(video.snippet.channelTitle);
  const url = "https://www.youtube.com/watch?v=" + video.id.videoId;
  const img = (
    <img
      src={video.snippet.thumbnails.medium.url}
      alt={title}
      style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover" }}
    />
  );

  // Режим списка: картинка слева, текст справа
  if (view === "list") {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Card hoverable styles={{ body: { padding: 12 } }}>
          <Flex gap={16}>
            <div
              style={{
                width: 280,
                flexShrink: 0,
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              {img}
            </div>
            <div style={{ minWidth: 0 }}>
              <Typography.Title level={5} style={{ marginTop: 0 }}>
                {title}
              </Typography.Title>
              <Typography.Text type="secondary">{channel}</Typography.Text>
              {/* ellipsis={{ rows: 2 }} — antd сам обрежет текст до 2 строк */}
              <Typography.Paragraph
                type="secondary"
                ellipsis={{ rows: 2 }}
                style={{ marginTop: 8, marginBottom: 0 }}
              >
                {decodeHtml(video.snippet.description)}
              </Typography.Paragraph>
            </div>
          </Flex>
        </Card>
      </a>
    );
  }

  // Режим плитки: карточка с картинкой сверху (cover)
  return (
    // height: 100% — карточки в одном ряду одинаковой высоты
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "block", height: "100%" }}
    >
      <Card
        hoverable
        cover={img}
        style={{ height: "100%" }}
        styles={{ body: { padding: 12 } }}
      >
        <Card.Meta
          title={
            <span className="clamp-2" style={{ whiteSpace: "normal" }}>
              {title}
            </span>
          }
          description={channel}
        />
      </Card>
    </a>
  );
};

export default VideoItem;
