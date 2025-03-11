import { Provider } from "react-redux";
import { store } from "../../redux/store"; // Импортируй свой store
import { Decorator } from "@storybook/react/*";

const withRedux: Decorator = (Story) => (
  <Provider store={store}>
    <Story />
  </Provider>
);

export default withRedux;
