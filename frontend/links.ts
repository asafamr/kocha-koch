// Outbound links. kocha.co.il links carry UTM parameters so the site can tell which part of
// this tool sent the visitor.
export const REPO_URL = "https://github.com/asafamr/kocha-koch";

export const kochaUrl = (placement: string) =>
  `https://kocha.co.il/?utm_source=cv-tool&utm_medium=${encodeURIComponent(placement)}&utm_campaign=kocha-koch`;
