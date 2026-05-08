import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/index")({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/vision-hub.html${location.searchStr}${location.hash}` });
  },
  component: IndexRedirect,
});

function IndexRedirect() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center text-foreground">
      <p className="text-lg font-semibold">Opening Vision Hub…</p>
    </main>
  );
}