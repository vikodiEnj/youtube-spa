import { login } from "./authApi";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Alert,
  Typography,
  Flex,
  theme,
} from "antd";
import { YoutubeFilled, MailOutlined, LockOutlined } from "@ant-design/icons";

const LoginForm = ({ handleAuthSuccess }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });

  // Цвета текущей темы. Страница логина лежит вне <Layout>,
  // поэтому фон берём из темы сами — иначе в тёмной теме остаётся белый body
  const { token } = theme.useToken();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    setError(null);
    try {
      setLoading(true);
      const result = await login(data.email, data.password);
      handleAuthSuccess(result.access_token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        minHeight: "100vh",
        padding: 16,
        background: token.colorBgLayout,
      }}
    >
      <Card style={{ width: "100%", maxWidth: 380 }}>
        <Flex vertical align="center" style={{ marginBottom: 16 }}>
          <YoutubeFilled style={{ fontSize: 48, color: "#ff0033" }} />
          <Typography.Title level={3} style={{ margin: 0 }}>
            Вход
          </Typography.Title>
        </Flex>

        {/* Form из antd здесь только для разметки и вывода ошибок.
            Значения и валидацией управляет react-hook-form,
            поэтому onFinish просто запускает его handleSubmit. */}
        <Form layout="vertical" onFinish={() => handleSubmit(onSubmit)()}>
          <Form.Item
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
          >
            {/* Controller — «переходник»: связывает поле antd с react-hook-form.
                register тут не подходит: antd-инпуты не отдают ref как обычный input */}
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Поле обязательно для заполнения",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                  message: "Введите корректный email",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  prefix={<MailOutlined />}
                  placeholder="Введите почту"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Укажите пароль",
                minLength: { value: 6, message: "Минимум 6 символов" },
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="Пароль"
                />
              )}
            />
          </Form.Item>

          {/* loading у Button — встроенный спиннер и блокировка кнопки */}
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
          >
            Войти
          </Button>
        </Form>

        {error && (
          <Alert
            type="error"
            title={error}
            showIcon
            style={{ marginTop: 16 }}
          />
        )}
      </Card>
    </Flex>
  );
};

export default LoginForm;
