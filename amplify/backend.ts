import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";

const backend = defineBackend({
  auth,
  data
});

backend.addOutput({
  custom: {
    bedrockModelId: process.env.BEDROCK_MODEL_ID ?? "amazon.nova-pro-v1:0"
  }
});

export default backend;
