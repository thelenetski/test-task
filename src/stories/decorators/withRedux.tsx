import { Provider } from "react-redux";
import { store } from "../../redux/store"; // Импортируй свой store

const withRedux = (Story) => (
  <Provider store={store}>
    <Story />
  </Provider>
);

export default withRedux;
