# Model Armor Integration Guide

## Current Status

✅ Model Armor API enabled
✅ Service account permissions granted  
⚠️ Template creation requires manual setup via Google Cloud Console

## Manual Template Creation (Alternative Method)

Since the gcloud CLI is experiencing permission issues, please create the template via the Google Cloud Console:

### Option 1: Use Google Cloud Console (Web UI)

1. Go to: https://console.cloud.google.com/security/model-armor/templates?project=qwiklabs-asl-03-7e6910d4e317

2. Click "CREATE TEMPLATE"

3. Configure the template:
   - **Name**: `claimjet_model_armor_template_1`
   - **Location**: `us-central1`
   
4. Enable these filters:
   - **Responsible AI Filters**:
     - Harassment (High confidence)
     - Hate Speech (High confidence)
     - Sexually Explicit (High confidence)
     - Dangerous Content (High confidence)
   
   - **Prompt Injection & Jailbreak**: Enabled (Medium and above)
   - **Malicious URI Filter**: Enabled

5. Click "CREATE"

6. Copy the full template resource name (looks like):
   ```
   projects/qwiklabs-asl-03-7e6910d4e317/locations/us-central1/templates/claimjet_model_armor_template_1
   ```

### Option 2: Try gcloud from Your Local Machine

If you have gcloud installed locally and authenticated:

```bash
gcloud model-armor templates create claimjet_model_armor_template_1 \
  --location=us-central1 \
  --project=qwiklabs-asl-03-7e6910d4e317 \
  --malicious-uri-filter-settings-enforcement=enabled \
  --rai-settings-filters='[
    {"filterType": "harassment", "confidenceLevel": "high"},
    {"filterType": "hate-speech", "confidenceLevel": "high"},
    {"filterType": "sexually-explicit", "confidenceLevel": "high"},
    {"filterType": "dangerous", "confidenceLevel": "high"}
  ]' \
  --pi-and-jailbreak-filter-settings-enforcement=enabled \
  --pi-and-jailbreak-filter-settings-confidence-level=medium-and-above
```

## After Template Creation

Once you have the template ID, share it and I will:

1. ✅ Update `.env` file with the template ID
2. ✅ Integrate Model Armor into `adk_agent.py`
3. ✅ Update `requirements.txt` with Model Armor SDK
4. ✅ Rebuild Docker image
5. ✅ Redeploy to Cloud Run with Model Armor protection

## Template ID Format

The template ID will look like:
```
projects/qwiklabs-asl-03-7e6910d4e317/locations/us-central1/templates/claimjet_model_armor_template_1
```

Share this with me once you have it!
