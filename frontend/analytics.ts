// Optional Google Analytics 4, on only when the server reports a measurement id.
// Events carry no personal data: fixed names and small enum params.
type Params = Record<string, string | boolean>;

let on = false;

export function initAnalytics(id?: string) {
  if (on || !id) return;
  on = true;
  const w = window as unknown as { dataLayer: unknown[] };
  w.dataLayer = w.dataLayer || [];
  gtag("js", new Date());
  gtag("config", id);
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}

function gtag(..._args: unknown[]) {
  // gtag.js reads the arguments object, not an array.
  (window as unknown as { dataLayer: unknown[] }).dataLayer.push(arguments);
}

export function track(event: string, params?: Params) {
  if (on) gtag("event", event, params);
}
