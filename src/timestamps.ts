/* eslint-disable @typescript-eslint/naming-convention */
export interface Manifest {
  early_release: {
    image_directory: string;
    resized_image_directory: string;
    timestamps: number[];
  };
  released: {
    image_directory: string;
    resized_image_directory: string;
    timestamps: number[];
  };
  clouds: {
    image_directory: string;
    resized_image_directory: string;
    timestamps: number[];
  };
}

export async function fetchManifest(): Promise<Manifest> {
  console.log("fetching manifest");
  return fetch("https://raw.githubusercontent.com/johnarban/tempo-data-holdings/main/manifest.json").then((response) => response.json());
}

interface Timestamps {
  early_release: number[];
  released: number[];
  clouds: number[];
}

export  async function getTimestamps(): Promise<Timestamps> {
  const manifest = await fetchManifest();
  const earlyRelease = manifest.early_release;
  const released = manifest.released;
  const clouds = manifest.clouds;
  return { early_release: earlyRelease.timestamps, released: released.timestamps, clouds: clouds.timestamps };
}
