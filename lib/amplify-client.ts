"use client";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

type OutputsShape = {
  auth?: {
    user_pool_id?: string;
    user_pool_client_id?: string;
    identity_pool_id?: string;
  };
  data?: {
    url?: string;
    api_key?: string;
    default_authorization_type?: string;
    region?: string;
  };
};

let configured = false;

export function hasAmplifyOutputs() {
  const typed = outputs as OutputsShape;
  return Boolean(typed.auth?.user_pool_id || typed.data?.url);
}

export function configureAmplifyClient() {
  if (configured) return hasAmplifyOutputs();
  if (!hasAmplifyOutputs()) {
    configured = true;
    return false;
  }

  Amplify.configure(outputs as Record<string, unknown>);
  configured = true;
  return true;
}
