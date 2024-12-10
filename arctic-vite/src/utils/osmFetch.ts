interface OsmPoint {
  lon: number;
  lat: number;
}

export async function fetchOsmBuilding(wayId: string) {
  // Overpass API query to get building geometry
  const query = `[out:json][timeout:25];way(${wayId});out geom;`;
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
    query
  )}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.elements && data.elements[0]) {
      const element = data.elements[0];
      const coordinates = element.geometry.map((point: OsmPoint) => [
        point.lon,
        point.lat,
      ]);
      // Close the polygon by repeating first point
      coordinates.push(coordinates[0]);

      return {
        type: "Feature" as const,
        properties: {
          name: element.tags.name || "Unknown Building",
          id: wayId,
        },
        geometry: {
          type: "Polygon" as const,
          coordinates: [coordinates],
        },
      };
    }
  } catch (error) {
    console.error("Error fetching OSM data:", error);
  }
  return null;
}
