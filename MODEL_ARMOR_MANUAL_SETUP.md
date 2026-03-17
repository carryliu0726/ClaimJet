# Model Armor Integration - Manual Setup Required

## Issue
The Model Armor API returns `403 PERMISSION_DENIED` errors when attempting to create templates programmatically, even with Owner-level permissions. This appears to be a restriction in Qwiklabs environments.

## Solution: Create Template via Google Cloud Console

### Step 1: Open Model Armor Console

Navigate to:
```
https://console.cloud.google.com/security/model-armor/templates?project=qwiklabs-asl-03-7e6910d4e317
```

Or:
1. Go to Google Cloud Console
2. Search for "Model Armor" in the top search bar
3. Click on "Model Armor"
4. Select "Templates" from the left menu

### Step 2: Create Template

1. Click **"CREATE TEMPLATE"** button

2. **Basic Information:**
   - **Template name**: Choose any name (e.g., `claimjet_armor`, `flight_safety_v1`)
   - **Location**: Select `us-central1`

3. **Configure Filters** (Responsible AI Settings):
   Enable and set to **HIGH** confidence:
   - ☑️ **Harassment**
   - ☑️ **Hate Speech**
   - ☑️ **Sexually Explicit**
   - ☑️ **Dangerous Content**

4. **Prompt Injection & Jailbreak Filter:**
   - ☑️ **Enable**
   - Confidence Level: **MEDIUM_AND_ABOVE**

5. **Malicious URI Filter:**
   - ☑️ **Enable**

6. Click **"CREATE"**

### Step 3: Get Template ID

After creation, you'll see the template in the list. Click on it and copy the full resource name, which looks like:

```
projects/qwiklabs-asl-03-7e6910d4e317/locations/us-central1/templates/YOUR_TEMPLATE_NAME
```

### Step 4: Update Configuration

Once you have the template ID, update the `.env` file:

```bash
MODEL_ARMOR_TEMPLATE_ID=projects/qwiklabs-asl-03-7e6910d4e317/locations/us-central1/templates/YOUR_TEMPLATE_NAME
```

### Step 5: Notify for Deployment

Share the template ID, and the code will be updated and redeployed to Cloud Run with Model Armor protection enabled.

## What Model Armor Does

Once integrated, Model Armor will:
- ✅ **Filter user prompts** before sending to the LLM
- ✅ **Filter LLM responses** before returning to users
- ✅ **Block harmful content**: harassment, hate speech, explicit content
- ✅ **Prevent jailbreak attempts** and prompt injection
- ✅ **Block malicious URLs** in prompts and responses
- ✅ **Log all safety events** for monitoring

## Alternative: Skip Model Armor

If you prefer to deploy without Model Armor protection, that's also an option. The current deployment works perfectly without it.

---

## Troubleshooting

**Why can't we create it programmatically?**
The Model Armor API appears to have additional access controls beyond standard IAM permissions, possibly requiring:
- Domain verification
- Organization-level policies
- Specific project types (not Qwiklabs temporary projects)

**Can we test without it?**
Yes! The chatbot works perfectly without Model Armor. It's an additional security layer for production use.
