import Checkout from "../../components/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, Select, Space } from "antd";
import "./transaction.scss";
const { Search } = Input;
const Transaction = () => {
  const [infoCheckout, setInfoCheckout] = useState([]);

  useEffect(() => {
    const getCheckout = async () => {
      const response = await axios({
        method: "GET",
        url: "http://localhost:8080/api/v1/checkout",
      });
      setInfoCheckout(response.data.data);
    };
    getCheckout();
  }, []);

  return (
    <>
      <div className="navbar_input">
        <Search
          placeholder="Type something..."
          enterButton
          className="search__input"
        />
        {/* <Form.Item label="Filter by" className="filter__input">
          <Select defaultValue="false">
            <Select.Option value="false">Pending</Select.Option>
            <Select.Option value="true">Approve</Select.Option>
          </Select>
        </Form.Item> */}
      </div>
      <Checkout data={infoCheckout} />
    </>
  );
};

export default Transaction;
