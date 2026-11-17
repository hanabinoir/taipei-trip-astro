import * as maplibregl from "maplibre-gl";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url";
import "maplibre-gl/dist/maplibre-gl.css";

maplibregl.setWorkerUrl(maplibreWorkerUrl);

export const ctrlZoomMap = ({ container, center, zoom }: { container: HTMLDivElement; center: [number, number]; zoom: number }) => {
    return new maplibregl.Map({
        container: container,
        style: "https://tiles.openfreemap.org/styles/liberty", // free, no API key
        center: center,
        zoom: zoom,
        scrollZoom: false,
    });
};

export const handleWheel = (map: maplibregl.Map, e: maplibregl.MapWheelEvent) => {
    if (e.originalEvent.ctrlKey || e.originalEvent.metaKey) {
    e.originalEvent.preventDefault();
    if (!map.scrollZoom.isEnabled()) {
        map.scrollZoom.enable();
    }
    } else {
    if (map.scrollZoom.isEnabled()) {
        map.scrollZoom.disable();
    }
    }
};