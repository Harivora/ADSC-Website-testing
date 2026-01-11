import React from "react";

// Admin pages use their own layout without the main navbar/footer
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
