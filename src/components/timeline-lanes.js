import { TimelineItem } from "./time-line-item.js";

export function TimelineLanes({ lanes, dateRange, zoomLevel }) {
  return (
    <div className="relative border border-gray-200 rounded-lg bg-gray-50">
      <div 
        className="relative bg-gray-50 w-full"
        style={{ 
          width: `${100 * zoomLevel}%`,
          minWidth: `${100 * zoomLevel}%`,
        }}
      >
        {lanes.map((lane, laneIndex) => (
          <div
            key={laneIndex}
            className="relative h-12 bg-white flex items-center justify-center border-b border-gray-200"
          >
            {lane.map((item) => (
              <TimelineItem
                key={item.id}
                item={item}
                dateRange={dateRange}
                laneIndex={laneIndex}
                totalLanes={lanes.length}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
