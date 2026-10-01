import Link from "next/link";
import InnerPage from "@/components/layout/InnerPage";

export default function NotFound() {
  return (
    <InnerPage>
      <h1 className="serif text-[36px]">Agent not found</h1>
      <p className="mt-3 text-[14px] text-[#6B6B6B]">
        This profile may have moved.{" "}
        <Link
          href="/agents"
          className="underline underline-offset-4 text-[#1A1A1A]"
        >
          See all agents
        </Link>
      </p>
    </InnerPage>
  );
}
