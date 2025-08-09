import React from "react";
import { useTimeline } from "../context/timeline-context.js";

export function TimelineList({ items }) {
  const { selectedItem, selectItem, editingItem, editedName, isSaving, startEditing, saveEdit, cancelEdit, setEditedName } = useTimeline();

  // Sort items by start date
  const sortedItems = [...items].sort((a, b) => 
    new Date(a.start) - new Date(b.start)
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getItemColor = (itemId) => {
    const hue = (itemId * 137.5) % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  const handleNameClick = (item, e) => {
    e.stopPropagation();
    startEditing(item);
  };

  return (
    <aside className="w-80 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-purple-600 text-white px-4 py-3">
        <h3 className="text-lg font-semibold">Timeline Items</h3>
        <p className="text-sm opacity-90 mt-1">
          {items.length} items in chronological order
        </p>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {sortedItems.map((item) => {
          const isSelected = selectedItem && selectedItem.id === item.id;
          const isEditing = editingItem && editingItem.id === item.id;
          
          return (
            <div
              key={item.id}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
              onClick={() => isSelected ? selectItem(null) : selectItem(item)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getItemColor(item.id) }}
                  ></div>
                  {isEditing ? (
                    <div className="flex items-center space-x-1">
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !isSaving) saveEdit();
                          if (e.key === 'Escape') cancelEdit();
                        }}
                        onBlur={saveEdit}
                        disabled={isSaving}
                        className="font-medium text-gray-900 text-sm bg-white border border-blue-300 rounded px-1 disabled:opacity-50"
                        autoFocus
                      />
                      {isSaving && (
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      )}
                    </div>
                  ) : (
                    <h4 
                      className="font-medium text-gray-900 text-sm cursor-pointer hover:underline"
                      onClick={(e) => handleNameClick(item, e)}
                    >
                      {item.name}
                    </h4>
                  )}
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  #{item.id}
                </span>
              </div>

              {/* Dates */}
              <div className="space-y-1">
                <div className="flex items-center text-xs text-gray-600">
                  <span className="font-medium mr-2">Start:</span>
                  <span>{formatDate(item.start)}</span>
                </div>
                <div className="flex items-center text-xs text-gray-600">
                  <span className="font-medium mr-2">End:</span>
                  <span>{formatDate(item.end)}</span>
                </div>
              </div>

              {/* Duration */}
              <div className="mt-2">
                <span className="text-xs text-gray-500">
                  Duration: {Math.ceil((new Date(item.end) - new Date(item.start)) / (1000 * 60 * 60 * 24) + 1)} days
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <p>• Click on items to highlight them</p>
          <p>• Click on names to edit them</p>
          <p>• Items are sorted by start date</p>
          {isSaving && (
            <p className="text-blue-600 font-medium">• Saving changes...</p>
          )}
        </div>
      </div>
    </aside>
  );
}
