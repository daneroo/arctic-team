export interface Place {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  osm_id: string | null;
  description: string;
}

export type ViewMode = "none" | "view" | "edit" | "new";

export interface LeftPanelState {
  mode: ViewMode;
  place: Place | null;
}
