import { MonthLabels } from "./month-labels.js";
import { TimelineLanes } from "./timeline-lanes.js";
import { TimelineLegend } from "./timeline-legend.js";

export function TimelineContent({ 
  monthLabels, 
  dateRange, 
  totalDays, 
  zoomLevel, 
  lanes
}) {
  return (
    <div className="p-6 bg-white">
      <MonthLabels 
        monthLabels={monthLabels}
        dateRange={dateRange}
        totalDays={totalDays}
        zoomLevel={zoomLevel}
      />

      <TimelineLanes 
        lanes={lanes}
        dateRange={dateRange}
        zoomLevel={zoomLevel}
      />

      <TimelineLegend />
    </div>
  );
}
