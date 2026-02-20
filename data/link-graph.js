/* ═══════════════════════════════════════════════
   AMC Debt Navigator - Document Link Graph
   Cross-document relationships, model links, metadata
   ═══════════════════════════════════════════════ */

window.AMC_LINK_GRAPH = {
  "doc1": {
    name: "DOC 1 - Covenant Strip",
    relatedDocs: ["doc4","doc7"],
    relatedModels: ["waterfall"],
    tranche: "amc-sub",
    entity: "amc"
  },
  "doc2": {
    name: "DOC 2 - Muvico 15% PIK",
    relatedDocs: ["doc4","doc5","doc7"],
    relatedModels: ["waterfall","pik","leverage"],
    tranche: "muvico-15pik",
    entity: "muvico"
  },
  "doc3": {
    name: "DOC 3 - AMC 7.5% Notes",
    relatedDocs: ["doc4"],
    relatedModels: ["waterfall"],
    tranche: "amc-750",
    entity: "amc"
  },
  "doc4": {
    name: "DOC 4 - $2B Term Loan",
    relatedDocs: ["doc2","doc3","doc5","doc7"],
    relatedModels: ["waterfall","leverage"],
    tranche: "term-loan",
    entity: "muvico"
  },
  "doc5": {
    name: "DOC 5 - Muvico 8% PIK Exchangeable",
    relatedDocs: ["doc4","doc2"],
    relatedModels: ["waterfall","exchange"],
    tranche: "muvico-8pik",
    entity: "muvico"
  },
  "doc6": {
    name: "DOC 6 - Odeon 12.75%",
    relatedDocs: [],
    relatedModels: ["waterfall"],
    tranche: "odeon-1275",
    entity: "odeon"
  },
  "doc7": {
    name: "DOC 7 - 6/8% PIK Toggle",
    relatedDocs: ["doc4","doc2"],
    relatedModels: ["waterfall","pik"],
    tranche: "muvico-6-8pik",
    entity: "muvico"
  }
};

window.AMC_DOC_URLS = {
  "doc1": "doc1-covenant-strip.html",
  "doc2": "doc2-muvico-secured-2029.html",
  "doc3": "doc3-amc-7500-notes.html",
  "doc4": "doc4-credit-agreement.html",
  "doc5": "doc5-exchangeable-2030.html",
  "doc6": "doc6-odeon-notes.html",
  "doc7": "doc7-pik-toggle.html"
};

window.AMC_MODEL_URLS = {
  "waterfall": { url: "waterfall.html", name: "Recovery Waterfall" },
  "pik":       { url: "pik-projector.html", name: "PIK Projector" },
  "leverage":  { url: "leverage.html", name: "Leverage Analyzer" },
  "exchange":  { url: "exchange.html", name: "Exchange Calculator" }
};
