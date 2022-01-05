import {
  extendTheme,
  ThemeConfig,
  theme as base,
  withDefaultVariant,
} from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme(
  {
    config,
    colors: {
      "gray.dark": "#1C1C1C",
      // "gray.light": "#646464",
      "gray.light": "#aadddd",
      "brand.red": "#e14949",
    },
    fonts: {
      heading: `Circular Std Book, ${base.fonts?.heading}`,
      body: `Circular Std Book, ${base.fonts?.body}`,
    },
  },
  withDefaultVariant({
    variant: "ghost",
    components: ["Button", "IconButton"],
  })
);
