interface OsmPoint {
  lon: number;
  lat: number;
}

export async function fetchOsmBuilding(osmId: string) {
  const query = `
    [out:json][timeout:25];
    (
      way(${osmId});
      relation(${osmId});
    );
    out geom;
  `;

  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
    query
  )}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.elements && data.elements[0]) {
      const element = data.elements[0];

      // Handle relations (multiple ways)
      if (element.type === "relation") {
        const firstWay = element.members?.[0];
        if (firstWay?.geometry) {
          const coordinates = firstWay.geometry.map((point: OsmPoint) => [
            point.lon,
            point.lat,
          ]);
          coordinates.push(coordinates[0]);

          return {
            type: "Feature" as const,
            properties: {
              name: element.tags?.name || "Unknown Building",
              id: osmId,
            },
            geometry: {
              type: "Polygon" as const,
              coordinates: [coordinates],
            },
          };
        }
      }

      // Handle single ways
      if (element.geometry) {
        const coordinates = element.geometry.map((point: OsmPoint) => [
          point.lon,
          point.lat,
        ]);
        coordinates.push(coordinates[0]);

        return {
          type: "Feature" as const,
          properties: {
            name: element.tags?.name || "Unknown Building",
            id: osmId,
          },
          geometry: {
            type: "Polygon" as const,
            coordinates: [coordinates],
          },
        };
      }
    }
  } catch (error) {
    console.error("Error fetching OSM data:", error);
  }
  return null;
}
