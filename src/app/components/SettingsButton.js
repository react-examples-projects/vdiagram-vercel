"use client";
import { Button } from "@geist-ui/core";
import { RiSettings5Fill } from "react-icons/ri";
import useConfig from "../hooks/useConfig";

export default function SettingsButton({ toggleOpen }) {
  const { theme } = useConfig();
  return (
    <Button
      className="settings-button"
      title="Settings"
      aria-label="Settings"
      iconRight={<RiSettings5Fill color={theme === "dark" ? "#fff" : "#000"} />}
      type="abort"
      scale={2.7}
      onClick={toggleOpen}
      auto
    />
  );
}
