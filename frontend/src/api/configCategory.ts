export const CATEGORY_MAP = {
  laptop: {
    label: "Laptops",
    api: "laptop",
  },
  pc: {
    label: "Desktop PCs",
    api: "pc",
  },
  "networking-devices": { 
    label: "Networking Devices",
    api: "network_device",
  },
  "printers-scanners": {
    label: "Printers & Scanners",
    api: "printer_scanner",
  },
  "pc-parts": {
    label: "PC Parts",
    api: "pc_part",
  },
  other: {
    label: "All Other Products",
    api: "other",
  },
} as const;