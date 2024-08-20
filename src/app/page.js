"use client";

import dynamic from "next/dynamic";
import FlowBoardSkeleton from "./components/loaders/FlowBoardSkeleton";

const FlowBoard = dynamic(() => import("./components/FlowBoard"), {
  ssr: false,
  loading: FlowBoardSkeleton,
});

export default function Home() {
  return (
    <main>
      <FlowBoard />
      {/* <FlowBoardSkeleton /> */}
    </main>
  );
}
