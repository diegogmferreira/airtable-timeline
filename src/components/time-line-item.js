import React, { useState } from "react";
import { useTimeline } from "../context/timeline-context.js";

export function TimelineItem({ item, dateRange, laneIndex, totalLanes }) {
  const [isHovered, setIsHovered] = useState(false);
  const { selectedItem, selectItem } = useTimeline();
  const isSelected = selectedItem && selectedItem.id === item.id;
  
  // Calculate position and width based on actual date range
  const { minDate, maxDate } = dateRange;
  const totalDays = (maxDate - minDate) / (1000 * 60 * 60 * 24);
  const itemStartOffset = (new Date(item.start) - minDate) / (1000 * 60 * 60 * 24);
  const itemDuration = (new Date(item.end) - new Date(item.start)) / (1000 * 60 * 60 * 24) + 1; // +1 to include end date
  
  const leftPercent = (itemStartOffset / totalDays) * 100;
  const widthPercent = (itemDuration / totalDays) * 100;
  
  // Generate a consistent color based on item ID
  const hue = (item.id * 137.5) % 360; // Golden angle approximation for good color distribution
  const backgroundColor = `hsl(${hue}, 70%, 60%)`;
  
  // Ensure minimum width for readability (at least 3 characters)
  const minWidthPercent = 2; // Minimum 2% width
  const finalWidthPercent = Math.max(widthPercent, minWidthPercent);
  
  return (
    <div
      className={`absolute rounded-md border px-2 py-1 text-xs font-medium text-white shadow-sm transition-all duration-200 cursor-pointer ${
        isSelected 
          ? 'border-2 border-blue-500 shadow-lg' 
          : 'border-gray-300'
      }`}
      style={{
        left: `${leftPercent}%`,
        width: `${finalWidthPercent}%`,
        backgroundColor,
        zIndex: isHovered || isSelected ? 10 : 1,
        transform: isHovered ? 'scale(1.02)' : isSelected ? 'scale(1.05)' : 'scale(1)',
        minWidth: '32px', // Minimum width in pixels for at least 3 characters
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={`${item.name}\n${item.start} to ${item.end}`}
      onClick={() => {
        isSelected 
          ? selectItem(null)
          : selectItem(item)
      }}
    >
      <div className="truncate">
        {item.name}
      </div>
      
      {(isHovered || isSelected) && (
        <div className="absolute bottom-full left-0 mb-2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20">
          <div className="font-bold">{item.name}</div>
          <div className="text-gray-300">
            {item.start} - {item.end}
          </div>
          {isSelected && (
            <div className="text-blue-300 text-xs mt-1">
              ✓ Selected
            </div>
          )}
        </div>
      )}
    </div>
  );
}
