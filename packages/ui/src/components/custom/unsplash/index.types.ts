export interface UnsplashImage {
  id: string;
  user: { name: string; portfolio_url: string };
  links: { html: string };
  urls: { thumb: string; full: string; regular: string; small: string };
  description: string;
}
