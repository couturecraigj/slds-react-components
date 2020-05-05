import React, { useContext } from "react";
import Button from "./Button";
import Layout from "./Layout";
import Context from "./Context";

export default { title: "Button" };

export const withText = () => <Button>Hello Button</Button>;

export const withEmoji = () => (
  <Button>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);

const ButtonWithLayout = () => {
  const { changeSize } = useContext(Context);
  return (
    <Button onClick={changeSize} variant="brand">
      With Layout
    </Button>
  );
};

export const withLayout = () => (
  <Layout>
    <ButtonWithLayout />
  </Layout>
);
