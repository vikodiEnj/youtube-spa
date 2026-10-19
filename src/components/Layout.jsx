import { Outlet } from "react-router";
import { Layout as AntLayout } from "antd";
import Header from "./Header";

// Layout из antd назван AntLayout, чтобы не путать с нашим компонентом
const Layout = ({ handleLogout }) => {
  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Header handleLogout={handleLogout} />
      <AntLayout.Content
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "32px 24px 64px",
        }}
      >
        <Outlet />
      </AntLayout.Content>
    </AntLayout>
  );
};

export default Layout;
