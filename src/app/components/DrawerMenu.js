"use client";
import { Drawer, Checkbox, Select, Text, Note, Input } from "@geist-ui/core";
import useConfig from "../hooks/useConfig";
import Slider from "rc-slider";

export default function DrawerMenu({ isOpen, toggleOpen, isMagicText, onChangeIsMagicText }) {
  const {
    background,
    theme,
    setBackground,
    setTheme,
    imageFormat,
    setImageFormat,
    backgroundGap,
    setBackgroundGap,
    imageBackground,
    setImageBackground,
    setOpenAiApiKey,
    openAiApiKey,
  } = useConfig();

  return (
    <Drawer visible={isOpen} onClose={toggleOpen} placement="right" width="400px">
      <Drawer.Title>Settings</Drawer.Title>

      <Drawer.Content>
        <p>
          Some of these configurations modify the final result of the diagrams, keep in mind that
          they can improve and have different results when modifying these parameters.
        </p>

        <Checkbox checked={isMagicText} onChange={onChangeIsMagicText}>
          Magic Text Mode
        </Checkbox>

        <Text className="text-muted font-14">
          Interprets your original message according to your instructions and optimizes it to
          maximize variety and enhance details to improve the final result
        </Text>

        {isMagicText && (
          <Note type="warning">
            By activating this option, the diagrams may take longer to generate; you will obtain a
            better result in exchange for waiting more processing time.
          </Note>
        )}

        <label className="block ma-20 mi-10">OpenAI API Key</label>
        <Input
          htmlType="password"
          width="100%"
          onChange={(e) => setOpenAiApiKey(e.target.value)}
          placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          value={openAiApiKey}
          // onChange={onChangeOpenAiApiKey}
        />
        {!openAiApiKey && (
          <Note type="warning" style={{ marginTop: "0.5rem" }}>
            By default, if a valid key is not found, a default key will be used.
          </Note>
        )}

        <label className="block ma-20 mi-10">System theme</label>
        <Select
          placeholder="Theme"
          width="100%"
          onChange={(theme) => setTheme(theme)}
          value={theme}
        >
          <Select.Option value="dark">Dark</Select.Option>
          <Select.Option value="light">Light</Select.Option>
        </Select>

        <label className="block ma-30 mi-10">Diagram background</label>
        <Select
          placeholder="Background"
          width="100%"
          onChange={(background) => setBackground(background)}
          value={background}
        >
          <Select.Option value="lines">Lines</Select.Option>
          <Select.Option value="dots">Dots</Select.Option>
          <Select.Option value="cross">Cross</Select.Option>
        </Select>

        <label className="block ma-30 mi-10">Export Image format</label>
        <Select
          placeholder="Image format"
          width="100%"
          onChange={(imageFormat) => setImageFormat(imageFormat)}
          value={imageFormat}
        >
          <Select.Option value="png">PNG</Select.Option>
          <Select.Option value="jpeg">JPEG</Select.Option>
          <Select.Option value="svg">SVG</Select.Option>
        </Select>

        <label className="block ma-30 mi-10">Export Image background</label>
        <Select
          placeholder="Image background"
          width="100%"
          onChange={(imageBg) => setImageBackground(imageBg)}
          value={imageBackground}
        >
          <Select.Option value="current">Current</Select.Option>
          <Select.Option value="transparent">Transparent</Select.Option>
          <Select.Option value="black">Black</Select.Option>
          <Select.Option value="white">White</Select.Option>
        </Select>

        <label className="block ma-30 mi-10">Background gap</label>
        <Slider
          min={10}
          max={100}
          step={5}
          value={backgroundGap}
          onChange={(backgroundGap) => setBackgroundGap(backgroundGap)}
        />
      </Drawer.Content>
    </Drawer>
  );
}
