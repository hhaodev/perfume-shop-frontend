import React, { useState } from "react";
import { Button, Form, Input, Radio, Space, Table, Tag } from "antd";
import ModalBox from "../Modal";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
const { Column, ColumnGroup } = Table;

const App = ({ data }) => {
  const [infoUserChange, setInfoUserChange] = useState({
    fName: "",
    lName: "",
    street: "",
    status: false,
  });
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInfoUserChange((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  const handleSave = () => {
    console.log(infoUserChange);
  };
  const modalEdit = (record) => (
    <div className="form__edit">
      <Form.Item label="First Name">
        <Input placeholder={record.fName} name="fName" onChange={handleInput} />
      </Form.Item>
      <Form.Item label="Last Name">
        <Input placeholder={record.lName} name="lName" onChange={handleInput} />
      </Form.Item>
      <Form.Item label="Address">
        <Input
          placeholder={record.street}
          name="street"
          onChange={handleInput}
        />
      </Form.Item>
      <Form.Item label="Status">
        <Radio.Group
          defaultValue={record.status ? "true" : "false"}
          name="status"
          onChange={handleInput}
        >
          <Radio value="false">
            <Tag color="yellow">Pending</Tag>
          </Radio>
          <Radio value="true">
            <Tag color="green">Approve</Tag>
          </Radio>
        </Radio.Group>
      </Form.Item>
      <Button
        style={{ backgroundColor: "#1677FF", color: "white" }}
        onClick={handleSave}
      >
        Save
      </Button>
    </div>
  );
  return (
    <Table dataSource={data}>
      <Column title="First Name" dataIndex="fName" key="firstName" />
      <Column title="Last Name" dataIndex="lName" key="lastName" />
      <Column
        title="Product"
        key="product"
        render={(text, record) => (
          <Space size="middle">
            <ModalBox
              title="VIEW PRODUCT"
              label="View Product"
              content={record.orders.map((product, index) => {
                return (
                  <div className="product" key={index}>
                    <div className="product__img">
                      <img src={product.url} alt="" />
                    </div>
                    <div className="product__title">
                      <h3 className="product__title-name">{product.name}</h3>
                      <span className="product__title-price">
                        {product.quantity} x {product.price} VND
                      </span>
                    </div>
                  </div>
                );
              })}
              key="product"
            />
          </Space>
        )}
      />
      <Column title="Address" dataIndex="street" key="address" />

      <Column
        title="Status"
        key="status"
        render={(_, record) =>
          record.status ? (
            <Tag color="green">Approve</Tag>
          ) : (
            <Tag color="yellow">Pending</Tag>
          )
        }
      />
      <Column
        title="Action"
        key="action"
        render={(_, record) => (
          <Space size="middle">
            <Button style={{ backgroundColor: "#1677FF", color: "white" }}>
              <ModalBox
                title="EDIT TRANSACTION"
                label="Edit"
                content={modalEdit(record)}
                icon={<FormOutlined />}
              />
            </Button>
            <Button
              icon={<DeleteOutlined />}
              style={{ backgroundColor: "#1677FF", color: "white" }}
            >
              Delete
            </Button>
          </Space>
        )}
      />
    </Table>
  );
};
export default App;
