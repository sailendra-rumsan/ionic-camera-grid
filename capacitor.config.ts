import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.sailendra.camera",
  appName: "camera",
  webDir: "dist",
  server: {
    url: "http://169.254.65.174:8100/",
    cleartext: true,
  },
};

export default config;
