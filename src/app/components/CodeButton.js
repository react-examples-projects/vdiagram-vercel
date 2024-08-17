"use client";
import { Button } from "@geist-ui/core";
import { LuCode2 } from "react-icons/lu";
import useConfig from "../hooks/useConfig";

export default function CodeButton({ toggleOpen }) {
  const { theme } = useConfig();
  return (
    <Button
      title="See json code"
      aria-label="See json code"
      iconRight={<LuCode2 color={theme === "dark" ? "#fff" : "#000"} />}
      type="abort"
      scale={2.5}
      onClick={toggleOpen}
      auto
    />
  );
}
