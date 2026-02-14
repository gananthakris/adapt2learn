# Adapt2Learn Deployment Checklist

## Local Status (Completed on February 13, 2026)
- Dependencies installed (`npm install`)
- Type-check passing (`npm run type-check`)
- Lint passing (`npm run lint`)
- Production build passing (`npm run build`)
- Seed script passing (`npm run seed`)
- End-to-end smoke tests passing (`npm run test:e2e`)
- Full QA pipeline passing (`npm run qa`)

## Blocker
`npx ampx sandbox --once` failed with:
`UnrecognizedClientException: The security token included in the request is invalid.`

This indicates local AWS credentials/session are invalid or expired.

## Fix AWS Credentials
1. Validate active identity:
   ```bash
   aws sts get-caller-identity
   ```
2. Re-authenticate profile (SSO example):
   ```bash
   aws sso login --profile <your-profile>
   ```
3. Re-run sandbox with that profile:
   ```bash
   npx ampx sandbox --once --profile <your-profile>
   ```

## Required Secrets for OAuth
Set these before deploying auth with Google provider:
```bash
npx ampx sandbox secret set GOOGLE_CLIENT_ID
npx ampx sandbox secret set GOOGLE_CLIENT_SECRET
```

## After Sandbox Succeeds
1. Generate outputs in project root:
   ```bash
   npx ampx sandbox --once --outputs-format json --outputs-out-dir .
   ```
2. Start app:
   ```bash
   npm run dev
   ```
3. Smoke test routes:
   - `/dashboard`
   - `/skill-graph`
   - `/tutor`
   - `/analytics`
   - `/class-analytics`

## One Command Local QA
```bash
npm run qa
```
