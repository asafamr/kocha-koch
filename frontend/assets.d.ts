// Image imports resolve to a URL (Bun bundler and Vite both do this).
declare module "*.webp" {
  const src: string;
  export default src;
}
