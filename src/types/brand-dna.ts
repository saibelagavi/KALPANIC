export interface BrandDNA {
  url: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accents: string[];
  };
  fonts: {
    headings: string | null;
    body: string | null;
  };
  tone: "corporate" | "playful" | "editorial" | "technical" | "cultural";
  logoUrl: string | null;
  extractedAt: string;
}
