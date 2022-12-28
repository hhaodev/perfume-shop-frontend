import {
  Space,
  Table,
  Tag,
  Button,
  Form,
  Input,
  Radio,
  Upload,
  Select,
  Divider,
} from "antd";
import Search from "antd/es/input/Search";
import ModalButton from "../../components/Modal";
import "./product.scss";
import {
  PlusCircleOutlined,
  FormOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
const { Column, ColumnGroup } = Table;
const Product = () => {
  const [listProducts, setListProducts] = useState([]);
  useEffect(() => {
    const getListProducts = async () => {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8080/api/v1/products",
      });
      setListProducts(response.data.data);
    };
    getListProducts();
  }, []);

  ///////
  const formCreateProduct = (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
    >
      <Form.Item label="Name">
        <Input name="name" placeholder="Type something..." />
      </Form.Item>
      <Form.Item label="Trade mark">
        <Input name="trade_mark" placeholder="Type something..." />
      </Form.Item>
      <Form.Item label="Type">
        <Radio.Group defaultValue="Xịt" name="type">
          <Radio value="Xịt"> Xịt </Radio>
          <Radio value="Lăn"> Lăn </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Sex">
        <Radio.Group defaultValue="Nam" name="sex">
          <Radio value="Nam"> Nam </Radio>
          <Radio value="Nữ"> Nữ </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Description">
        <TextArea rows={4} name="desc" />
      </Form.Item>
      <Form.Item label="Price">
        <Input name="price" style={{ width: "40%" }} />
      </Form.Item>
      <Form.Item label="Image" valuePropName="fileList">
        <Upload action="/upload.do" listType="picture-card" name="url">
          <div>
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </div>
        </Upload>
      </Form.Item>
      <Form.Item label="Category">
        <Select defaultValue="beauty">
          <Select.Option value="beauty">Beauty</Select.Option>
          <Select.Option value="makeup">Makeup</Select.Option>
          <Select.Option value="cosmetic">Cosmetic</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
  const formEditProduct = (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
    >
      <Form.Item label="Name">
        <Input name="name" placeholder="Type something..." />
      </Form.Item>
      <Form.Item label="Trade mark">
        <Input name="trade_mark" placeholder="Type something..." />
      </Form.Item>
      <Form.Item label="Type">
        <Radio.Group defaultValue="Xịt" name="type">
          <Radio value="Xịt"> Xịt </Radio>
          <Radio value="Lăn"> Lăn </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Sex">
        <Radio.Group defaultValue="Nam" name="sex">
          <Radio value="Nam"> Nam </Radio>
          <Radio value="Nữ"> Nữ </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Description">
        <TextArea rows={4} name="desc" />
      </Form.Item>
      <Form.Item label="Price">
        <Input name="price" style={{ width: "40%" }} />
      </Form.Item>
      <Form.Item label="Image" valuePropName="fileList">
        <Upload action="/upload.do" listType="picture-card" name="url">
          <div>
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </div>
        </Upload>
      </Form.Item>
      <Form.Item label="Category">
        <Select defaultValue="beauty">
          <Select.Option value="beauty">Beauty</Select.Option>
          <Select.Option value="makeup">Makeup</Select.Option>
          <Select.Option value="cosmetic">Cosmetic</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
  return (
    <>
      <div className="navbar__input">
        <Search
          placeholder="Type something..."
          enterButton
          className="search__input"
        />
        <Button style={{ backgroundColor: "#1677FF", color: "white" }}>
          <ModalButton
            icon={<PlusCircleOutlined />}
            title="CREATE PRODUCT"
            label="Create Product"
            content={formCreateProduct}
          />
        </Button>
        <Button style={{ backgroundColor: "#1677FF", color: "white" }}>
          <ModalButton
            icon={<FormOutlined />}
            title="EDIT PRODUCT"
            label="Edit Product"
            content={formEditProduct}
          />
        </Button>
      </div>
      <Table dataSource={listProducts}>
        <Column
          title="Image"
          dataIndex="url"
          key="image"
          render={(_, record) => (
            <>
              <img
                src={record.url}
                alt={record.name}
                className="product__img"
              />
            </>
          )}
        />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Trade mark" dataIndex="trade_mark" key="trademark" />
        <Column title="Type" dataIndex="type" key="type" />
        <Column
          title="Descripton"
          dataIndex="desc"
          key="desc"
          render={(_, record) => (
            <>
              <p className="product__desc" style={{ color: "#333" }}>
                {record.desc}
              </p>
            </>
          )}
          className="desc"
        />
        <Column title="Sex" dataIndex="sex" key="sex" />
        <Column
          title="Category"
          dataIndex="category"
          key="category"
          render={(_, record) => (
            <>
              <Tag color="orange">{record.category}</Tag>
            </>
          )}
        />
        <Column title="Price" dataIndex="price" key="price" />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Button style={{ backgroundColor: "#1677FF", color: "white" }}>
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default Product;
