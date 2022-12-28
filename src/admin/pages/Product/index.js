import { Space, Table, Tag, Button } from "antd";
import Search from "antd/es/input/Search";
import ModalButton from "../../components/Modal";
import "./product.scss";
import { PlusCircleOutlined, FormOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
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
          />
        </Button>
        <Button style={{ backgroundColor: "#1677FF", color: "white" }}>
          <ModalButton
            icon={<FormOutlined />}
            title="EDIT PRODUCT"
            label="Edit Product"
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
