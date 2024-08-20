"use client";

import Skeleton from "react-loading-skeleton";
import useConfig from "../../hooks/useConfig";

export default function FlowBoardSkeleton() {
   
  const { theme } = useConfig();
  console.log(theme);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: theme === "dark" ? "#141414" : "#fff",
      }}
    >
      <Skeleton
        width={200}
        height={150}
        style={{ position: "absolute", top: "15px", left: "15px", borderRadius: 0 }}
      />

      <Skeleton
        width={34}
        height={139}
        style={{ position: "absolute", left: "15px", bottom: "5.8rem", borderRadius: 0 }}
      />

      <Skeleton
        width="90%"
        height={77}
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "1rem",
          borderRadius: "6px",
        }}
      />

      <Skeleton
        width="50px"
        height="352px"
        style={{
          position: "absolute",
          top: "1rem",
          right: "3rem",
        }}
      />
    </div>
  );
}
