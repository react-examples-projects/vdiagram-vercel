"use client";
import Loader from "react-loaders";
import { Textarea, Button } from "@geist-ui/core";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { BsFillStopCircleFill } from "react-icons/bs";

export default function PromptInput({
  isLoading,
  prompt,
  onChangePrompt,
  onChangeText,
  generateDiagram,
  stop,
}) {
  return (
    <div className="input">
      {isLoading && <Loader type="ball-pulse-sync" className="input-loader" />}
      
      <div className="input-wrapper">
        <Textarea
          disabled={isLoading}
          placeholder="Enter your diagram flow prompt here"
          value={prompt}
          onChange={isLoading ? null : onChangePrompt}
          width="100%"
          className="textarea"
          scale={3}
          onInput={isLoading ? null : onChangeText}
        />

        <Button
          onClick={isLoading ? stop : generateDiagram}
          iconRight={
            isLoading ? (
              <BsFillStopCircleFill color="#fff" size="1.8rem" />
            ) : (
              <BsArrowUpCircleFill color="#fff" size="1.8rem" />
            )
          }
          className="submit"
          type="abort"
          scale={2.5}
          auto
        />
      </div>
    </div>
  );
}
