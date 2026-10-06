import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppPage } from "./AppPage";
import { fakeApi, OVERFLOW_THREAD, SAMPLE_THREAD } from "./fakeApi";

const meta = {
  title: "Pages/App",
  component: AppPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AppPage>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Intake: Story = { args: { initialStage: 0, api: fakeApi([]) } };
export const CvAndChat: Story = { args: { initialStage: 1, api: fakeApi(SAMPLE_THREAD) } };
export const Waiting: Story = { args: { initialStage: 1, api: fakeApi([{ ...SAMPLE_THREAD[0], reply: null }]) } };
export const Design: Story = { args: { initialStage: 2, api: fakeApi(SAMPLE_THREAD) } };
export const Export: Story = { args: { initialStage: 3, api: fakeApi(SAMPLE_THREAD) } };
export const DesignOverflow: Story = { args: { initialStage: 2, api: fakeApi(OVERFLOW_THREAD) } };
