"use client";
import {
  Grid,
  Group,
  Text,
  Stack,
  Box,
  TextInput,
  Button,
} from "@mantine/core";
import { getWeekdayName, getCurrentTime } from "@/helpers/date";
import { Message, MessageOwners } from "./types";
import "./style.css";
import { FormEvent, useRef, useState } from "react";
import { useChat } from "@/hooks/api/chat";
import ProfileCard from "./_components/ProfileCard";
import { ArrowRight, Bot } from "lucide-react";

const startingMsg =
  "Hey, I'm Sam, your AI hiring assistant. Describe your ideal hire and I'll search hundreds of thousands of candidates to find the perfect fit. How can I help?";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const ref = useRef<any>();
  const [messages, setMessages] = useState<Message[]>([
    {
      owner: MessageOwners.BOT,
      msg: startingMsg,
      time: getCurrentTime(new Date()),
    },
  ]);
  const { trigger, isMutating, data, reset } = useChat({
    onSuccess: (res: any) => {
      if (res?.bot_msg) {
        setPrompt("");
        setMessages((prev) => [
          ...prev,
          {
            owner: MessageOwners.BOT,
            msg: res.bot_msg,
            candidates: res?.candidates,
            time: getCurrentTime(new Date()),
          },
        ]);
        setTimeout(function () {
          ref.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 300);
      }
    },
  });
  const date = `${getWeekdayName(new Date())} ${getCurrentTime(new Date())}`;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (prompt.length > 1) {
      trigger({ prompt, context: data?.context });
      setMessages((prev) => [
        ...prev,
        {
          owner: MessageOwners.USER,
          msg: prompt,
          time: getCurrentTime(new Date()),
        },
      ]);
    }
  };

  return (
    <main>
      <Grid>
        <Grid.Col
          span={{ sm: 12, md: 7 }}
          offset={{ sm: 0, md: 2 }}
          h="100vh"
          px={"24px"}
        >
          <Stack h={"100%"}>
            <Stack
              flex={1}
              style={{ overflowY: "scroll", overflowX: "hidden" }}
            >
              <Stack align="center" gap={"xs"} mt={"50px"}>
                <Bot size={40} />
                <Text size="md" fw={700}>
                  Sam
                </Text>
                <Text size="sm">AI Assistant Bot</Text>
                <Text size="xs">Made with ❤️</Text>
                <Text size="xs">{date}</Text>
              </Stack>
              <Stack gap={"md"} mt={"xl"} p={"lg"}>
                {messages.map((msg, i) =>
                  msg.owner == MessageOwners.BOT ? (
                    <Box key={i}>
                      {msg?.candidates && (
                        <Stack gap={"md"} py={"md"}>
                          {msg?.candidates.map((candidate: any) => (
                            <ProfileCard
                              key={candidate.user_id}
                              details={candidate}
                            />
                          ))}
                        </Stack>
                      )}
                      <Stack
                        bg={"gray.3"}
                        w={{ xs: "100%", sm: "50%" }}
                        p="md"
                        gap={"xs"}
                        style={{
                          border: "1px solid #f1f1f1",
                          borderRadius: "10px",
                          alignSelf: "start",
                        }}
                      >
                        <Text size="sm" fw={"500"}>
                          {msg.msg}
                        </Text>
                        <Text
                          size="xs"
                          style={{
                            alignSelf: "end",
                          }}
                        >
                          {msg.time}
                        </Text>
                      </Stack>
                    </Box>
                  ) : (
                    <Stack
                      key={i}
                      bg={"blue.7"}
                      p="md"
                      w={{ xs: "100%", sm: "50%" }}
                      gap={"xs"}
                      style={{ borderRadius: "10px", alignSelf: "end" }}
                    >
                      <Text size="sm" fw={"500"} c={"white"}>
                        {msg.msg}
                      </Text>
                      <Text
                        c="white"
                        size="xs"
                        style={{
                          alignSelf: "end",
                        }}
                      >
                        {msg.time}
                      </Text>
                    </Stack>
                  )
                )}
              </Stack>
              <div ref={ref} style={{ display: "hidden" }}></div>
            </Stack>
            <Box py={"lg"} w="100%">
              <form onSubmit={handleSubmit}>
                <TextInput
                  placeholder="How can I help build your team ?"
                  px={"lg"}
                  size="md"
                  radius={"lg"}
                  rightSection={
                    <Button
                      loading={isMutating}
                      loaderProps={{ type: "dots", size: "sm" }}
                      type="submit"
                      variant="transparent"
                      justify="center"
                      leftSection={<ArrowRight />}
                    ></Button>
                  }
                  onChange={(e) => setPrompt(e.target.value)}
                  value={prompt}
                />
              </form>
            </Box>
          </Stack>
        </Grid.Col>
        <Grid.Col span={3} p={"lg"} visibleFrom="md">
          <Stack gap={"md"}>
            {messages.length > 1 && (
              <Box>
                <Text size="md" fw={600}>
                  Actions
                </Text>
                <Group mt={"md"}>
                  <Button
                    size="xs"
                    variant="outline"
                    color="red"
                    onClick={() => {
                      reset();
                      setMessages([
                        {
                          owner: MessageOwners.BOT,
                          msg: startingMsg,
                          time: getCurrentTime(new Date()),
                        },
                      ]);
                    }}
                  >
                    Clear Converstation
                  </Button>
                </Group>
              </Box>
            )}
            {data?.context && (
              <Box>
                <Text size="md" fw={600}>
                  Filters Applied
                </Text>
                <Text size="sm">
                  Skills : {data.context["skills"].join(",")}
                </Text>
                <Text size="sm">
                  Employment Type : {data.context["employment_type"].join(",")}
                </Text>
                <Text size="sm">Budget : {data.context["budget"]}$</Text>
              </Box>
            )}
          </Stack>
        </Grid.Col>
      </Grid>
    </main>
  );
}
