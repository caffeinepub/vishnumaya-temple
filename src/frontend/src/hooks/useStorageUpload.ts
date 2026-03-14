import { loadConfig } from "@/config";
import { StorageClient } from "@/utils/StorageClient";
import { HttpAgent } from "@icp-sdk/core/agent";
import { useCallback } from "react";

export function useStorageUpload() {
  const uploadFile = useCallback(
    async (file: File, onProgress?: (pct: number) => void): Promise<string> => {
      const config = await loadConfig();
      const agent = new HttpAgent({ host: config.backend_host });
      const storageClient = new StorageClient(
        config.bucket_name,
        config.storage_gateway_url,
        config.backend_canister_id,
        config.project_id,
        agent,
      );
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const { hash } = await storageClient.putFile(bytes, onProgress);
      return await storageClient.getDirectURL(hash);
    },
    [],
  );
  return { uploadFile };
}
