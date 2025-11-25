
export interface Hotspot {
  id: string;
  targetSceneId: number;
  position: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
  label: string;
}

export interface Scene {
  id: number;
  imageUrl: string;
  alt: string;
  hotspots?: Hotspot[];
}
