import { useEffect, useState } from "react";
import { timelineItems } from "../timelineItems.js";
import { assignLanes } from "../utils/assignLanes.js";
import { TimelineContent } from "./timeline-content.js";
import { TimelineHeader } from "./timeline-header.js";

export function Timeline() {
  const [lanes, setLanes] = useState([]);
  const [dateRange, setDateRange] = useState({ minDate: null, maxDate: null });
  const [monthLabels, setMonthLabels] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const assignedLanes = assignLanes(timelineItems);
    setLanes(assignedLanes);

    const allDates = timelineItems.flatMap(item => [
      new Date(item.start),
      new Date(item.end)
    ]);
    const minDate = new Date(Math.min(...allDates));
    const maxDate = new Date(Math.max(...allDates));
    setDateRange({ minDate, maxDate });

    const labels = [];
    const currentDate = new Date(minDate);
    while (currentDate <= maxDate) {
      labels.push({
        date: new Date(currentDate),
        label: currentDate.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric'
        })
      });
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    setMonthLabels(labels);
  }, []);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
  };

  if (!dateRange.minDate || !dateRange.maxDate) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading timeline...</div>
      </div>
    );
  }

  const totalDays = (dateRange.maxDate - dateRange.minDate) / (1000 * 60 * 60 * 24);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <TimelineHeader
        itemCount={timelineItems.length}
        laneCount={lanes.length}
        zoomLevel={zoomLevel}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomReset={handleZoomReset}
      />

      <TimelineContent
        monthLabels={monthLabels}
        dateRange={dateRange}
        totalDays={totalDays}
        zoomLevel={zoomLevel}
        lanes={lanes}
      />
    </div>
  );
}