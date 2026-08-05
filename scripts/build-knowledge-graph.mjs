/**
 * Assembles knowledge graph export from seed nodes/relationships + corpus edges.
 */
import fs from "node:fs";
import { r } from "./lib/paths.mjs";

const nodes = JSON.parse(fs.readFileSync(r("knowledge_graph/nodes/seed_nodes.json"), "utf8"));
const rels = JSON.parse(fs.readFileSync(r("knowledge_graph/relationships/seed_relationships.json"), "utf8"));
const corpusGraph = JSON.parse(
  fs.readFileSync(r("research/corpus/research_relationship_graph.json"), "utf8"),
);

const exportObj = {
  version: "0.1.0-foundation",
  built_at: new Date().toISOString().slice(0, 10),
  nodes: nodes.nodes || [],
  relationships: rels.relationships || [],
  corpus_edges: corpusGraph.edges || [],
  counts: {
    nodes: (nodes.nodes || []).length,
    relationships: (rels.relationships || []).length,
    corpus_edges: (corpusGraph.edges || []).length,
  },
  note: "Foundation export only. No AI inference. No automatic edges.",
};

fs.writeFileSync(r("knowledge_graph/exports/knowledge_graph_export.json"), JSON.stringify(exportObj, null, 2) + "\n");
console.log("[OK] wrote knowledge_graph/exports/knowledge_graph_export.json", exportObj.counts);
