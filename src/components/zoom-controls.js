import { Button } from "./button";

export function ZoomControls({ zoomLevel, onZoomIn, onZoomOut, onZoomReset }) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        onClick={onZoomOut}
        title="Zoom Out"
      >
        −
      </Button>

      <span className="text-sm text-zinc-900 bg-white bg-opacity-20 px-3 py-1 rounded" >
        {Math.round(zoomLevel * 100)}%
      </span>

      <Button
        onClick={onZoomIn}
        title="Zoom In"
      >
        +
      </Button>

      <Button
        onClick={onZoomReset}
        title="Reset Zoom"
      >
        Reset
      </Button>
    </div>
  );
}
