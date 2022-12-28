import { Steps } from "antd";
const Transaction = () => {
  return (
    <>
      <div
        className="container"
        style={{
          backgroundColor: "#F9FBFA",
          minHeight: "500px",
          marginTop: "50px",
        }}
      >
        <Steps
          current={0}
          items={[
            {
              title: "Pending",
              description: "Wait for confirmation",
            },
            {
              title: "Confirmed",
              description: "Order confirmed",
            },
            {
              title: "Delivery",
              description: "The order has been given to the carrier",
            },
          ]}
        />
      </div>
    </>
  );
};

export default Transaction;
