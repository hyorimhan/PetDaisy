import { NextResponse } from "next/server";

export function handleJoinError(message: string) {
  return NextResponse.json({
    message: message.includes("already registered")
      ? "이미 가입된 이메일입니다"
      : message,
  });
}

export function handleError(message: string) {
  return NextResponse.json({ message });
}

export function handleNetworkError() {
  return NextResponse.json({ error: "네트워크 오류가 발생했습니다" });
}

export function handleSuccess(message: string, data?: unknown) {
  return NextResponse.json({ message, data });
}
