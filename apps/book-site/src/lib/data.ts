import identity from "../../../../data/project/book_identity.json";
import principles from "../../../../data/project/principles.json";
import structure from "../../../../data/manuscript/book_structure.json";
import snapshot from "../../../../data/metrics/progress_snapshot.json";
import updates from "../../../../data/project/updates.json";
import layers from "../../../../data/metrics/progress_layers.json";

export { identity, principles, structure, snapshot, updates, layers };

type Layer = { id: string; label: string; percent: number; status: string };

export function publicProgressLayers(): Layer[] {
  const safeIds = [
    "project_governance",
    "book_architecture",
    "foundational_philosophy",
    "manuscript",
    "research_foundation",
    "public_book_website",
    "publishing_formats",
    "free_distribution",
    "public_launch_readiness",
  ];
  return ((layers.layers || []) as Layer[]).filter((l) => safeIds.includes(l.id));
}

export function chapterAvailability(status: string, publicStatus: string) {
  if (publicStatus === "available" || status === "published") return "available";
  if (["drafting", "draft_complete", "editing", "fact_check", "final"].includes(status)) {
    return "in_development";
  }
  return "planned";
}
