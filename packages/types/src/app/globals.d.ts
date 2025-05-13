/// <reference types="solid-js" />

// Declaration for image modules with vite-imagetools parameters
declare module "*&imagetools" {
  /**
   * Types based on imagetools output formats
   * - code: https://github.com/JonasKruckenberg/imagetools/blob/main/packages/core/src/output-formats.ts
   * - docs: https://github.com/JonasKruckenberg/imagetools/blob/main/docs/guide/getting-started.md#metadata
   */
  const out: string;
  export default out;
} 