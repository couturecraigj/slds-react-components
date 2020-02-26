import React from "react";
import Button from "./Button";
import Layout from "./Layout";

export default { title: "Button" };

export const withText = () => <Button>Hello Button</Button>;

export const withEmoji = () => (
  <Button>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);

export const withLayout = () => (
  <Layout>
    <Button variant="brand">With Layout</Button>
  </Layout>
);
