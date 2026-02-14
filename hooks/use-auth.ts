"use client";

import { useEffect, useState } from "react";
import { fetchAuthSession, getCurrentUser, signOut as amplifySignOut } from "aws-amplify/auth";
import { configureAmplifyClient, hasAmplifyOutputs } from "@/lib/amplify-client";

type AuthState = {
  status: "loading" | "authenticated" | "guest";
  username: string | null;
  role: "LEARNER" | "INSTRUCTOR" | "ADMIN" | null;
  isDemoMode: boolean;
};

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    status: "loading",
    username: null,
    role: null,
    isDemoMode: !hasAmplifyOutputs()
  });

  useEffect(() => {
    const configured = configureAmplifyClient();

    if (!configured) {
      setState({
        status: "authenticated",
        username: "demo-learner",
        role: "LEARNER",
        isDemoMode: true
      });
      return;
    }

    Promise.all([getCurrentUser(), fetchAuthSession()])
      .then(([user, session]) => {
        const groups = (session.tokens?.idToken?.payload["cognito:groups"] as string[] | undefined) ?? [];
        const role = groups.includes("Admin")
          ? "ADMIN"
          : groups.includes("Instructor")
            ? "INSTRUCTOR"
            : "LEARNER";

        setState({
          status: "authenticated",
          username: user.username,
          role,
          isDemoMode: false
        });
      })
      .catch(() => {
        setState({
          status: "guest",
          username: null,
          role: null,
          isDemoMode: false
        });
      });
  }, []);

  async function signOut() {
    if (state.isDemoMode) {
      setState({
        status: "guest",
        username: null,
        role: null,
        isDemoMode: true
      });
      return;
    }

    await amplifySignOut();
    setState({
      status: "guest",
      username: null,
      role: null,
      isDemoMode: false
    });
  }

  return {
    ...state,
    signOut
  };
}
