// Import Third-Party npm packages.
import { UAParser } from "ua-parser-js";

const parseDeviceName = (userAgent) => {
  // Parse user device info.
  const parser = new UAParser(userAgent);

  const device = parser.getDevice(); // Devise Name{model, type, vendor}
  const os = parser.getOS(); // Devise OS{name, version}
  const browser = parser.getBrowser(); // Devise Browser{name, version}

  // Determine device type.
  const type = device.type
    ? device.type.charAt(0).toUpperCase() + device.type.slice(1)
    : "Desktop";

  // Determine the main device text.
  const deviceText = device.model || os.name || "Unknown Device";

  // Chrome on Windows [Desktop]
  return `${browser.name || "Unknown Device"} on ${deviceText} [${type}]`;
};

export default parseDeviceName;
