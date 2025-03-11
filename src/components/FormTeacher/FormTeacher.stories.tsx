import type { Meta, StoryObj } from "@storybook/react";
import FormTeacher from "./FormTeacher";
import withRedux from "../../stories/decorators/withRedux";

const meta: Meta<typeof FormTeacher> = {
  title: "Forms/FormTeacher",
  component: FormTeacher,
  decorators: [withRedux],
};

export default meta;
type Story = StoryObj<typeof FormTeacher>;

export const Default: Story = {};
