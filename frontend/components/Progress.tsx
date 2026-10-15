// A bar that fills over `seconds` and then waits near the end: for work of roughly known length
// that reports no real progress. `labelledBy` is the id of the text that says what is happening.
export function Progress({ labelledBy, seconds = 60 }: { labelledBy: string; seconds?: number }) {
  return (
    <div role="progressbar" aria-labelledby={labelledBy} className="ds-progress" style={{ ["--ds-progress-s" as string]: `${seconds}s` }}>
      <span />
    </div>
  );
}
