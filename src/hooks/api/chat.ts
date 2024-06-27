"use client";
import useSWRMutation from "swr/mutation";
import { postFetcher } from "./fetchers";

const apiHostName = process.env.NEXT_PUBLIC_API_URL;
export function useChat(options = {}) {
  const res = useSWRMutation(
    `${apiHostName}/api/v1/chat`,
    postFetcher,
    options
  );
  return res;
}
