# Vishnumaya Temple

## Current State
The site has token booking (TokenModal.tsx) and gallery page (GalleryPage.tsx). Token booking uses localStorage to track "already booked" per user/date. Gallery upload uses ExternalBlob.fromBytes().getDirectURL() which returns a temporary blob:// URL instead of uploading to storage.

## Requested Changes (Diff)

### Add
- useStorageUpload hook that uses StorageClient to actually upload files to blob storage
- Deployment epoch clearing in TokenModal to fix stale localStorage token booking records across redeployments

### Modify
- GalleryPage.tsx: Replace broken ExternalBlob upload with useStorageUpload hook; use item.blobId directly in image/video src attributes
- TokenModal.tsx: Add deployment epoch check to clear stale localStorage booking records; use actor directly from backendInterface; show actual error messages

### Remove
- ExternalBlob import from GalleryPage (no longer needed for upload or display)
- ActorWithTokens interface cast in TokenModal (use backendInterface directly)

## Implementation Plan
1. Create src/frontend/src/hooks/useStorageUpload.ts - hook that loads config, creates StorageClient, uploads file, returns direct URL
2. Update GalleryPage.tsx to use useStorageUpload hook in handleUpload; simplify image/video src to use item.blobId directly
3. Update TokenModal.tsx to add DEPLOYMENT_EPOCH constant, clear stale localStorage token records on mount, use actor directly
