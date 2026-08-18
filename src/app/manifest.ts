import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dealup",
    short_name: "Dealup",
    description: "Transformez WhatsApp en moteur de croissance.",
    start_url: "/fr/",
    display: "standalone",
    background_color: "#fafcfb",
    theme_color: "#20c66a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
