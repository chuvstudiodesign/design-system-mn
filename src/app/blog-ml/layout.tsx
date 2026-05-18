import { BlogPublicShell } from "@/components/blog/blog-public-shell";

export default function BlogMLLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BlogPublicShell>{children}</BlogPublicShell>;
}
