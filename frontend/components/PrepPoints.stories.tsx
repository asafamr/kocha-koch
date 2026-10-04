import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { PrepPoints } from "./PrepPoints";
import { PREP_SAMPLES, type Seniority, type Track } from "./prepPointsSample";

// Pick a seniority and track with the controls; "לא רלוונטי" dismisses a point.
function Demo({ seniority, track }: { seniority: Seniority; track: Track }) {
  const sample = PREP_SAMPLES[`${seniority}/${track}`];
  const [dismissed, setDismissed] = useState<string[]>([]);
  useEffect(() => setDismissed([]), [seniority, track]);
  if (!sample) return <p className="ds-prep-empty">אין מסלול ניהול לג'וניורים.</p>;
  return (
    <PrepPoints
      strengths={sample.strengths}
      jobFit={sample.jobFit.filter((p) => !dismissed.includes(p.id))}
      points={sample.points.filter((p) => !dismissed.includes(p.id))}
      onDismiss={(id) => setDismissed((d) => [...d, id])}
    />
  );
}

const meta = {
  title: "Components/PrepPoints",
  component: Demo,
  argTypes: {
    seniority: { control: "inline-radio", options: ["junior", "mid", "senior"] },
    track: { control: "inline-radio", options: ["hands-on", "management"] },
  },
  decorators: [(Story) => <div style={{ maxInlineSize: 560 }}><Story /></div>],
} satisfies Meta<typeof Demo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const JuniorHandsOn: Story = { args: { seniority: "junior", track: "hands-on" } };
export const MidHandsOn: Story = { args: { seniority: "mid", track: "hands-on" } };
export const SeniorHandsOn: Story = { args: { seniority: "senior", track: "hands-on" } };
export const MidManagement: Story = { args: { seniority: "mid", track: "management" } };
export const SeniorManagement: Story = { args: { seniority: "senior", track: "management" } };
