export const toSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

  // laptop, pc, network_device, printer_scanner, pc_part, other


export const fromSlug = (slug: string) => {
  const map: Record<string, string> = {
    laptop: "Laptops",
    "pc": "Desktop PCs",
    "network_device": "Networking Devices",
    "printer_scanner": "Printers & Scanners",
    "pc_part": "PC Parts",
    "other": "All Other Product",
  };

  return map[slug];
};
