import { useForm, Controller } from "react-hook-form";
import { Modal, Form, Input, Select, Slider, InputNumber, Flex } from "antd";

const ORDER_OPTIONS = [
  { value: "relevance", label: "По релевантности" },
  { value: "date", label: "По дате" },
  { value: "rating", label: "По рейтингу" },
  { value: "title", label: "По названию" },
  { value: "viewCount", label: "По количеству просмотров" },
];

const ModalWindow = ({ onClose, onSave, initialValues, isEdit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      order: "relevance",
      maxResults: 12,
      ...initialValues,
    },
  });

  const onSubmit = (data) => {
    onSave(data);
    onClose();
  };

  return (
    // Modal из antd сам рисует затемнение, крестик, закрытие по Escape и клику по фону.
    // onCancel срабатывает во всех этих случаях, onOk — по кнопке «Сохранить».
    <Modal
      open
      title={isEdit ? "Редактировать запрос" : "Сохранить запрос"}
      okText="Сохранить"
      cancelText="Не сохранять"
      onOk={handleSubmit(onSubmit)}
      onCancel={onClose}
    >
      <Form layout="vertical" onFinish={() => handleSubmit(onSubmit)()}>
        <Form.Item label="Запрос">
          <Controller
            name="query"
            control={control}
            render={({ field }) => <Input {...field} disabled={!isEdit} />}
          />
        </Form.Item>

        <Form.Item
          label="Название"
          required
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Поле обязательно для заполнения",
              maxLength: { value: 30, message: "Максимум 30 символов" },
            }}
            render={({ field }) => (
              <Input {...field} placeholder="Укажите название" autoFocus />
            )}
          />
        </Form.Item>

        <Form.Item label="Сортировать по">
          <Controller
            name="order"
            control={control}
            render={({ field }) => (
              <Select {...field} options={ORDER_OPTIONS} />
            )}
          />
        </Form.Item>

        {/* Ползунок и число — два Controller на одно поле maxResults.
            Оба читают field.value и пишут через field.onChange,
            поэтому синхронизируются сами — watch и setValue больше не нужны */}
        <Form.Item label="Максимальное количество">
          <Controller
            name="maxResults"
            control={control}
            render={({ field }) => (
              <Flex gap={16} align="center">
                <Slider
                  min={0}
                  max={50}
                  value={field.value}
                  onChange={field.onChange}
                  style={{ flex: 1 }}
                />
                <InputNumber
                  min={0}
                  max={50}
                  value={field.value}
                  onChange={(v) => field.onChange(v ?? 0)}
                />
              </Flex>
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalWindow;
