export function MonthLabels({ monthLabels, dateRange, totalDays, zoomLevel }) {
  return (
    <div className="relative h-8 mb-4 border-b border-gray-200 overflow-x-auto overflow-y-hidden">
      <div 
        className="relative h-full bg-white"
        style={{ 
          width: `${100 * zoomLevel}%`,
          minWidth: `${100 * zoomLevel}%`,
        }}
      >
        {monthLabels.map((month, index) => {
          const monthOffset = (month.date - dateRange.minDate) / (1000 * 60 * 60 * 24);
          const leftPercent = (monthOffset / totalDays) * 100;
          
          return (
            <div
              key={index}
              className="absolute text-xs font-medium text-gray-600"
              style={{
                left: `${leftPercent}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {month.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
