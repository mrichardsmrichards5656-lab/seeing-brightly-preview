import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/index_")({
  component: IndexAlias,
});

function IndexAlias() {
  return (
    <iframe
      src="/vision-hub.html"
      title="Vision Hub UK"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: "none",
      }}
    />
  );
}
