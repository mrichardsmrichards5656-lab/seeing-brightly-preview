import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/index")({
  component: IndexRedirect,
});

function IndexRedirect() {
  useEffect(() => {
    fetch("/vision-hub.html")
      .then((response) => response.text())
      .then((html) => {
        document.open();
        document.write(html);
        document.close();
      });
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center text-foreground">
      <p className="text-lg font-semibold">Opening Vision Hub…</p>
    </main>
  );
}