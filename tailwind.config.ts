import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        shadow: "1px 1px 8px 1px rgba(0, 0, 0, 0.03);",
      },
      backgroundImage: {
        "gradient-1": "linear-gradient(180deg, #ECF9FF 0%, #F5F4FF 100%)",
        "gradient-2": "linear-gradient(180deg, #FFFBE8 0%, #F5F4FF 100%)",
        "gradient-3": "linear-gradient(180deg, #FFECEC 0%, #F5F4FF 100%)",
      },
      colors: {
        black: "#251F2A",
        white: "#ffffff",
        main: {
          1: "#F5F3FF",
          2: "#E1DCFF",
          3: "#CBC2FF",
          4: "#A596FF",
          5: "#7E6AF0",
        },
        pink: {
          1: "#FFEBE",
          2: "#FFDADB",
          3: "#FFB1B3",
          4: "#FB888C",
          5: "#F7676C",
        },
        blue: {
          1: "#ECF8FF",
          2: "#D5F0FF",
          3: "#ACDEF9",
          4: "#77CAF7",
          5: "#54B8ED",
        },
        yellow: {
          1: "#FFFAE8",
          2: "#FFF6D3",
          3: "#FFEFAA",
          4: "#FFE265",
          5: "#F3D347",
        },
        green: {
          1: "#E4F8EF",
          2: "#C6F3DE",
          3: "#82E7B8",
          4: "#39DB8F",
          5: "#1CC174",
        },
        red: {
          1: "#FFE2E2",
          2: "#FFBDBD",
          3: "#FF8080",
          4: "#FF4949",
          5: "#F41F1F",
        },
        gray: {
          1: "#EBE8ED",
          2: "#C2B6CA",
          3: "#9B8CA6",
          4: "#64596D",
        },
      },
    },
  },
  plugins: [],
};
export default config;
