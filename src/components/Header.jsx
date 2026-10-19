import { Link, useLocation } from "react-router";
import { Layout, Menu, Button, Flex, Typography, theme } from "antd";
import { YoutubeFilled, LogoutOutlined } from "@ant-design/icons";

const Header = ({ handleLogout }) => {
  const { pathname } = useLocation();
  // useToken даёт значения темы (цвета и т.д.) — чтобы шапка совпала по цвету с меню
  const { token } = theme.useToken();

  // Пункты меню описываются массивом объектов, а не JSX-разметкой.
  // key совпадает с путём — так легко подсветить активный пункт.
  const items = [
    { key: "/", label: <Link to="/">Поиск</Link> },
    { key: "/favorites", label: <Link to="/favorites">Избранное</Link> },
  ];

  return (
    <Layout.Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        gap: 24,
        padding: "0 24px",
        background: token.colorBgContainer,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
      }}
    >
      <Link to="/">
        <Flex align="center" gap={8}>
          <YoutubeFilled style={{ fontSize: 30, color: token.colorPrimary }} />
          <Typography.Text strong style={{ fontSize: 18 }}>
            VideoSearch
          </Typography.Text>
        </Flex>
      </Link>

      <Menu
        mode="horizontal"
        items={items}
        selectedKeys={[pathname]}
        style={{ flex: 1, minWidth: 0, borderBottom: "none" }}
      />

      <Button icon={<LogoutOutlined />} onClick={handleLogout}>
        Выйти
      </Button>
    </Layout.Header>
  );
};

export default Header;
