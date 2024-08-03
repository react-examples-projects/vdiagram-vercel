import dynamic from "next/dynamic";

const FlowBoard = dynamic(() => import("./components/FlowBoard"), {
  ssr: false,
  loading: () => <h4>Loading...</h4>,
});

export default function Home() {
  return (
    <main>
      <FlowBoard />
    </main>
  );
}
