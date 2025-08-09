import { ZoomControls } from "./zoom-controls.js";

export function TimelineHeader({ itemCount, laneCount, zoomLevel, onZoomIn, onZoomOut, onZoomReset }) {
  return (
    <div className="bg-purple-600 text-white px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Project Timeline</h2>
          <p className="text-sm opacity-90 mt-1">
            {itemCount} items across {laneCount} lanes
          </p>
        </div>
        
        <ZoomControls 
          zoomLevel={zoomLevel}
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onZoomReset={onZoomReset}
        />
      </div>
    </div>
  );
}
