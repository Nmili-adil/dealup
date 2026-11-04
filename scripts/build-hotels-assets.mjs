import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const OUT_DIR = "public/assets/hotels";

const palette = {
  ink: "#071426",
  muted: "#5c6b86",
  border: "#dbe6e0",
  soft: "#f2fbf6",
  cream: "#fffaf0",
  brand: "#087f5b",
  brandDark: "#064d3b",
  brandLight: "#26c281",
  ai: "#13b8a6",
  accent: "#f4b24b",
  danger: "#e06b5f",
  white: "#ffffff",
};

const assets = [
  {
    name: "hotels-hero-command-center",
    width: 1600,
    height: 1080,
    svg: heroCommandCenter(),
  },
  {
    name: "hotels-guest-inbox",
    width: 1300,
    height: 900,
    svg: guestInbox(),
  },
  {
    name: "hotels-ai-concierge",
    width: 1200,
    height: 860,
    svg: aiConcierge(),
  },
  {
    name: "hotels-routing-automation",
    width: 1300,
    height: 850,
    svg: routingAutomation(),
  },
  {
    name: "hotels-analytics-dashboard",
    width: 1300,
    height: 850,
    svg: analyticsDashboard(),
  },
];

await mkdir(OUT_DIR, { recursive: true });

for (const asset of assets) {
  const file = path.join(OUT_DIR, `${asset.name}.png`);
  await sharp(Buffer.from(asset.svg)).png().toFile(file);
  console.log(`${asset.name}.png  ${asset.width}x${asset.height}`);
}

function svg(width, height, body) {
  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="150%" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="22" stdDeviation="22" flood-color="#064d3b" flood-opacity="0.14"/>
    </filter>
    <filter id="smallShadow" x="-30%" y="-30%" width="160%" height="170%" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#071426" flood-opacity="0.11"/>
    </filter>
    <linearGradient id="panelGrad" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#ffffff"/>
      <stop offset="1" stop-color="#f1fbf5"/>
    </linearGradient>
    <linearGradient id="darkGrad" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#07553f"/>
      <stop offset="1" stop-color="#032b23"/>
    </linearGradient>
    <linearGradient id="phoneGrad" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#132033"/>
      <stop offset="1" stop-color="#040812"/>
    </linearGradient>
  </defs>
  ${body}
</svg>`;
}

function panel(x, y, w, h, r = 28, fill = "url(#panelGrad)", stroke = palette.border) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" filter="url(#softShadow)"/>`;
}

function smallPanel(x, y, w, h, r = 18, fill = palette.white) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${palette.border}" filter="url(#smallShadow)"/>`;
}

function text(label, x, y, size = 28, color = palette.ink, weight = 600, anchor = "start") {
  return `<text x="${x}" y="${y}" fill="${color}" font-family="Inter, Arial, sans-serif" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${label}</text>`;
}

function pill(label, x, y, w, fill = "#e9fbf2", color = palette.brand, icon = true) {
  return `
    <rect x="${x}" y="${y}" width="${w}" height="42" rx="21" fill="${fill}" stroke="${palette.border}"/>
    ${icon ? `<circle cx="${x + 23}" cy="${y + 21}" r="8" fill="${color}"/>` : ""}
    ${text(label, x + (icon ? 43 : 22), y + 27, 16, color, 700)}
  `;
}

function chatBubble(x, y, w, h, fill, align = "left") {
  const r = 20;
  const tail =
    align === "right"
      ? `<path d="M${x + w - 18} ${y + h - 3}c14 10 27 12 39 6-14-5-22-15-25-28" fill="${fill}"/>`
      : `<path d="M${x + 18} ${y + h - 3}c-14 10-27 12-39 6 14-5 22-15 25-28" fill="${fill}"/>`;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${palette.border}"/>${tail}`;
}

function avatar(cx, cy, fill = palette.brand) {
  return `
    <circle cx="${cx}" cy="${cy}" r="28" fill="${fill}"/>
    <circle cx="${cx}" cy="${cy - 8}" r="8" fill="${palette.white}" opacity="0.92"/>
    <path d="M${cx - 15} ${cy + 16}c4-13 26-13 30 0" stroke="${palette.white}" stroke-width="6" stroke-linecap="round" opacity="0.92"/>
  `;
}

function devicePhone(x, y, w, h, body) {
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.12}" fill="url(#phoneGrad)" filter="url(#softShadow)"/>
    <rect x="${x + 14}" y="${y + 16}" width="${w - 28}" height="${h - 32}" rx="${w * 0.095}" fill="#f7fbf8"/>
    <rect x="${x + w * 0.34}" y="${y + 20}" width="${w * 0.32}" height="22" rx="11" fill="#050a12"/>
    ${body}
  `;
}

function browserChrome(x, y, w, h, title) {
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="30" fill="url(#panelGrad)" stroke="${palette.border}" filter="url(#softShadow)"/>
    <rect x="${x}" y="${y}" width="${w}" height="78" rx="30" fill="${palette.white}"/>
    <path d="M${x} ${y + 78}H${x + w}" stroke="${palette.border}"/>
    <circle cx="${x + 38}" cy="${y + 39}" r="8" fill="${palette.danger}"/>
    <circle cx="${x + 66}" cy="${y + 39}" r="8" fill="${palette.accent}"/>
    <circle cx="${x + 94}" cy="${y + 39}" r="8" fill="${palette.brandLight}"/>
    ${text(title, x + 132, y + 47, 20, palette.ink, 700)}
  `;
}

function heroCommandCenter() {
  const body = `
    ${browserChrome(95, 105, 1090, 710, "Guest conversations")}
    <rect x="135" y="218" width="300" height="550" rx="24" fill="${palette.white}" stroke="${palette.border}"/>
    ${pill("Priority", 160, 248, 132)}
    ${conversationRow(160, 320, "Room 204", "Airport pickup confirmed", true)}
    ${conversationRow(160, 410, "Suite 18", "Late checkout request", false)}
    ${conversationRow(160, 500, "Table 7", "Dinner booking at 20:30", false)}
    ${conversationRow(160, 590, "VIP guest", "Spa voucher sent", true)}
    <rect x="472" y="218" width="665" height="550" rx="24" fill="${palette.white}" stroke="${palette.border}"/>
    ${text("Room 204", 512, 272, 26)}
    ${pill("Checked in", 905, 238, 165, "#e7f9f1", palette.brand)}
    ${chatBubble(522, 320, 340, 76, "#f2f7f4")}
    ${text("Can I book a taxi for 7 AM?", 552, 367, 20, palette.muted, 500)}
    ${chatBubble(720, 435, 360, 92, "#ddf8eb", "right")}
    ${text("Done. Driver details will", 750, 475, 20, palette.brandDark, 700)}
    ${text("arrive here shortly.", 750, 505, 20, palette.brandDark, 700)}
    <rect x="522" y="585" width="560" height="96" rx="22" fill="#f9fbf8" stroke="${palette.border}"/>
    ${text("AI suggested reply", 555, 628, 18, palette.ai, 800)}
    ${text("Confirm pickup, add booking note, notify front desk.", 555, 660, 20, palette.ink, 600)}
    ${devicePhone(1078, 260, 345, 645, phoneGuestScreen())}
    ${smallPanel(1015, 130, 300, 118)}
    ${text("Bookings linked", 1050, 181, 22)}
    ${text("94% automated", 1050, 217, 28, palette.brand, 800)}
    ${smallPanel(210, 805, 330, 108)}
    ${text("WhatsApp", 250, 853, 22, palette.brand, 800)}
    ${text("Guest profile updated", 250, 889, 20, palette.muted, 600)}
    ${smallPanel(875, 795, 340, 112)}
    ${text("Human handoff", 915, 846, 22)}
    ${text("Front desk in 3 min", 915, 883, 20, palette.muted, 600)}
  `;
  return svg(1600, 1080, body);
}

function conversationRow(x, y, name, preview, active) {
  return `
    <rect x="${x}" y="${y}" width="245" height="66" rx="18" fill="${active ? palette.soft : "#fbfdfb"}" stroke="${active ? "#bdebd3" : palette.border}"/>
    ${avatar(x + 35, y + 33, active ? palette.brand : "#b7c9c0")}
    ${text(name, x + 76, y + 30, 18)}
    ${text(preview, x + 76, y + 55, 14, palette.muted, 500)}
  `;
}

function phoneGuestScreen() {
  return `
    <rect x="1112" y="323" width="277" height="64" rx="22" fill="${palette.brandDark}"/>
    ${text("Dealup Hotel", 1152, 363, 18, palette.white, 800)}
    ${chatBubble(1127, 424, 190, 70, "#ffffff")}
    ${text("Pool hours today?", 1150, 466, 17, palette.muted, 600)}
    ${chatBubble(1168, 532, 202, 88, "#dbf8e9", "right")}
    ${text("Open until 22:00.", 1190, 572, 17, palette.brandDark, 700)}
    ${text("Enjoy your stay.", 1190, 598, 17, palette.brandDark, 700)}
    <rect x="1128" y="690" width="242" height="74" rx="18" fill="#ffffff" stroke="${palette.border}"/>
    ${text("Room service", 1150, 727, 18)}
    ${text("Menu sent", 1150, 754, 15, palette.brand, 800)}
    <rect x="1130" y="815" width="238" height="42" rx="21" fill="#ffffff" stroke="${palette.border}"/>
  `;
}

function guestInbox() {
  const body = `
    ${browserChrome(75, 85, 1150, 690, "Front desk inbox")}
    <rect x="115" y="200" width="315" height="510" rx="26" fill="${palette.white}" stroke="${palette.border}"/>
    ${pill("Open now", 145, 228, 142)}
    ${conversationRow(145, 300, "Riad guest", "Arrival at 18:45", true)}
    ${conversationRow(145, 390, "Room 312", "Extra towels please", false)}
    ${conversationRow(145, 480, "Lobby", "Restaurant question", false)}
    ${conversationRow(145, 570, "Suite Atlas", "Invoice request", true)}
    <rect x="470" y="200" width="490" height="510" rx="26" fill="${palette.white}" stroke="${palette.border}"/>
    ${text("Riad guest", 510, 256, 26)}
    ${pill("Reservation found", 730, 222, 190)}
    ${chatBubble(512, 310, 312, 76, "#f2f7f4")}
    ${text("Can you arrange airport pickup?", 542, 357, 19, palette.muted, 600)}
    ${chatBubble(598, 430, 312, 98, "#ddf8eb", "right")}
    ${text("Yes. Please share flight", 628, 471, 19, palette.brandDark, 700)}
    ${text("number and arrival time.", 628, 501, 19, palette.brandDark, 700)}
    <rect x="512" y="585" width="398" height="76" rx="20" fill="#fbfdfb" stroke="${palette.border}"/>
    ${text("Internal note", 542, 625, 17, palette.ai, 800)}
    ${text("Assign to concierge after reply.", 542, 652, 18, palette.muted, 600)}
    ${smallPanel(985, 220, 190, 156)}
    ${text("Guest card", 1018, 272, 22)}
    ${text("2 nights", 1018, 318, 30, palette.brand, 800)}
    ${text("Breakfast included", 1018, 354, 17, palette.muted, 600)}
    ${smallPanel(985, 420, 190, 156)}
    ${text("SLA", 1030, 474, 22)}
    ${text("03:12", 1030, 520, 32, palette.accent, 800)}
    ${text("until first reply", 1030, 556, 17, palette.muted, 600)}
  `;
  return svg(1300, 900, body);
}

function aiConcierge() {
  const body = `
    ${panel(120, 92, 960, 650, 34)}
    <rect x="120" y="92" width="960" height="88" rx="34" fill="${palette.white}"/>
    <path d="M120 180H1080" stroke="${palette.border}"/>
    <circle cx="178" cy="136" r="22" fill="#e6fbf3"/>
    <path d="M178 122v28M164 136h28" stroke="${palette.ai}" stroke-width="6" stroke-linecap="round"/>
    ${text("AI concierge draft", 220, 145, 24)}
    ${pill("Tone: warm", 820, 115, 164, "#eaf8f6", palette.ai)}
    ${chatBubble(180, 238, 405, 88, "#ffffff")}
    ${text("Is breakfast served before 7?", 214, 290, 22, palette.muted, 600)}
    ${chatBubble(330, 366, 570, 128, "#dcf8eb", "right")}
    ${text("Yes, we can prepare an early breakfast box", 368, 416, 22, palette.brandDark, 700)}
    ${text("from 6:30. Would you like us to add it?", 368, 452, 22, palette.brandDark, 700)}
    <rect x="180" y="548" width="820" height="112" rx="26" fill="#f4fbf8" stroke="#bdebd3"/>
    ${text("Suggested next action", 224, 596, 20, palette.ai, 800)}
    ${text("Save preference to guest profile and alert kitchen.", 224, 636, 24, palette.ink, 700)}
    ${smallPanel(70, 485, 230, 126)}
    ${text("Languages", 108, 536, 22)}
    ${text("FR  AR  EN", 108, 578, 28, palette.brand, 800)}
    ${smallPanel(900, 650, 230, 126)}
    ${text("Confidence", 938, 701, 22)}
    ${text("96%", 938, 743, 34, palette.brand, 800)}
  `;
  return svg(1200, 860, body);
}

function routingAutomation() {
  const nodes = [
    [120, 270, "New booking", "WhatsApp"],
    [400, 170, "Pre-arrival", "Concierge"],
    [400, 390, "Room issue", "Housekeeping"],
    [690, 170, "VIP guest", "Manager"],
    [690, 390, "Billing", "Reception"],
    [970, 280, "Resolved", "Follow-up"],
  ];
  const body = `
    ${panel(70, 80, 1160, 630, 34)}
    ${text("Routing rules", 125, 150, 30)}
    ${pill("Live automation", 970, 118, 185)}
    <path d="M320 326C365 326 365 226 400 226" stroke="#8eddb8" stroke-width="8" stroke-linecap="round"/>
    <path d="M320 326C365 326 365 446 400 446" stroke="#8eddb8" stroke-width="8" stroke-linecap="round"/>
    <path d="M600 226H690" stroke="#8eddb8" stroke-width="8" stroke-linecap="round"/>
    <path d="M600 446H690" stroke="#8eddb8" stroke-width="8" stroke-linecap="round"/>
    <path d="M890 226C930 226 930 334 970 334" stroke="#8eddb8" stroke-width="8" stroke-linecap="round"/>
    <path d="M890 446C930 446 930 334 970 334" stroke="#8eddb8" stroke-width="8" stroke-linecap="round"/>
    ${nodes.map(([x, y, title, label], index) => workflowNode(x, y, title, label, index === 0 || index === 5)).join("")}
    ${smallPanel(170, 585, 360, 92)}
    ${text("Escalate after 5 min", 210, 635, 24, palette.brandDark, 800)}
    ${smallPanel(740, 585, 360, 92)}
    ${text("Keep guest context attached", 780, 635, 24, palette.brandDark, 800)}
  `;
  return svg(1300, 850, body);
}

function workflowNode(x, y, title, label, active) {
  return `
    <rect x="${x}" y="${y}" width="200" height="112" rx="26" fill="${active ? "url(#darkGrad)" : palette.white}" stroke="${active ? palette.brandDark : palette.border}" filter="url(#smallShadow)"/>
    <circle cx="${x + 42}" cy="${y + 40}" r="18" fill="${active ? "rgba(255,255,255,0.18)" : "#e7fbf1"}"/>
    <path d="M${x + 34} ${y + 40}h16M${x + 42} ${y + 32}v16" stroke="${active ? palette.white : palette.brand}" stroke-width="5" stroke-linecap="round"/>
    ${text(title, x + 28, y + 78, 21, active ? palette.white : palette.ink, 800)}
    ${text(label, x + 28, y + 103, 16, active ? "#d7fae7" : palette.muted, 700)}
  `;
}

function analyticsDashboard() {
  const body = `
    ${browserChrome(70, 78, 1160, 665, "Guest experience dashboard")}
    <rect x="112" y="200" width="1040" height="140" rx="28" fill="${palette.white}" stroke="${palette.border}"/>
    ${metric(150, 234, "Reply time", "3 min", "-22%")}
    ${metric(400, 234, "CSAT", "4.8", "+0.4")}
    ${metric(650, 234, "Resolved", "89%", "+12%")}
    ${metric(900, 234, "Guests", "312", "+35%")}
    <rect x="112" y="382" width="690" height="290" rx="30" fill="${palette.white}" stroke="${palette.border}"/>
    ${text("Requests by day", 154, 438, 24)}
    ${bar(165, 590, 54, 40)}
    ${bar(250, 550, 54, 80)}
    ${bar(335, 515, 54, 115)}
    ${bar(420, 470, 54, 160)}
    ${bar(505, 500, 54, 130)}
    ${bar(590, 438, 54, 192)}
    ${bar(675, 485, 54, 145)}
    <path d="M150 630H750" stroke="${palette.border}" stroke-width="3"/>
    <rect x="840" y="382" width="312" height="290" rx="30" fill="${palette.white}" stroke="${palette.border}"/>
    ${text("Sentiment", 884, 438, 24)}
    <circle cx="996" cy="548" r="78" stroke="#dbe6e0" stroke-width="28"/>
    <path d="M996 470a78 78 0 1 1-66 120" stroke="${palette.brandLight}" stroke-width="28" stroke-linecap="round"/>
    ${text("76%", 996, 562, 34, palette.brandDark, 800, "middle")}
    ${pill("Review campaign ready", 855, 635, 245, "#fff7e8", palette.accent, false)}
  `;
  return svg(1300, 850, body);
}

function metric(x, y, label, value, trend) {
  return `
    <g>
      ${text(label, x, y + 20, 17, palette.muted, 700)}
      ${text(value, x, y + 65, 35, palette.ink, 800)}
      <rect x="${x + 100}" y="${y + 38}" width="72" height="30" rx="15" fill="#e8fbf1"/>
      ${text(trend, x + 136, y + 59, 15, palette.brand, 800, "middle")}
    </g>
  `;
}

function bar(x, y, w, h) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${palette.brand}" opacity="${0.52 + h / 400}"/>`;
}
