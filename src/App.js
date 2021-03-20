import { styled, useStyletron } from "baseui";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { Input } from "baseui/input";
import { Button } from "baseui/button";

import { Accordion, Panel } from "baseui/accordion";
import { Block } from "baseui/block";
import { Checkbox } from "baseui/checkbox";
import { Slider } from "baseui/slider";
import { FormControl } from "baseui/form-control";
import { StatefulTooltip } from "baseui/tooltip";

import Lottie from "react-lottie";
import refresh from "./assets/Refresh.json";
import { useEffect, useState } from "react";
import { generate as generatePassword } from "generate-password";

const App = styled("div", {
  width: "100vw",
  height: "100vh",
});
const Centered = styled("div", {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const End = styled("div", {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
});

export default function Hello() {
  const [useCss, theme] = useStyletron();
  const [length, setLength] = useState(32);
  const [uppercase, setUppercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const [generated, setGenerated] = useState(false);

  const setNewPassword = (p) => {
    const newPassword = p
      ? p
      : generatePassword({ length, numbers, uppercase, symbols });
    setPassword(newPassword);
    setGenerated(false);
    window.setTimeout(() => {
      setGenerated(true);
    }, 1000);
  };

  useEffect(() => {
    setNewPassword();
  }, [length, uppercase, symbols, numbers]);

  return (
    <App>
      <Centered>
        <Card
          overrides={{
            Root: {
              style: {
                borderRadius: "1rem",
                padding: "1rem",
                minWidth: "36rem",
              },
            },
            Title: {
              style: {
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              },
            },
          }}
          title="Password Generator"
        >
          <StyledBody>
            <Input
              value={password}
              onChange={(event) => setNewPassword(event.target.value)}
              overrides={{
                After: () => (
                  <Button kind="minimal" shape="square">
                    <div
                      className={useCss({
                        height: theme.sizing.scale800,
                        width: theme.sizing.scale800,
                        // backgroundColor: "red",
                      })}
                    >
                      <Lottie
                        options={{
                          autoplay: generated,
                          loop: false,
                          animationData: refresh,
                        }}
                      />
                    </div>
                  </Button>
                ),
              }}
            />
          </StyledBody>
          <StyledAction>
            <End>
              <StatefulTooltip
                content={() => <Block>Generate a new password!</Block>}
                returnFocus
                autoFocus
              >
                <Button
                  kind="primary"
                  overrides={{
                    BaseButton: {
                      style: {
                        margin: ".25rem 0",
                        borderRadius: "8px",
                        width: "100%",
                        paddingTop: "1rem",
                        paddingBottom: "1rem",
                      },
                    },
                  }}
                  onClick={() => setNewPassword()}
                >
                  Generate
                </Button>
              </StatefulTooltip>
            </End>
            <Accordion>
              <Panel title="Options">
                <Block marginBottom="scale800">
                  <FormControl label="Length">
                    <Slider
                      min={4}
                      max={64}
                      value={[length]}
                      onChange={({ value }) => setLength(value[0])}
                    />
                  </FormControl>
                </Block>
                <Block>
                  <FormControl label="Characters">
                    <div>
                      <Checkbox
                        checked={uppercase}
                        onChange={() => setUppercase(!uppercase)}
                      >
                        A-Z
                      </Checkbox>
                      <Checkbox
                        checked={numbers}
                        onChange={() => setNumbers(!numbers)}
                      >
                        0-9
                      </Checkbox>
                      <Checkbox
                        checked={symbols}
                        onChange={() => setSymbols(!symbols)}
                      >
                        %@#
                      </Checkbox>
                    </div>
                  </FormControl>
                </Block>
              </Panel>
            </Accordion>
          </StyledAction>
        </Card>
      </Centered>
    </App>
  );
}
