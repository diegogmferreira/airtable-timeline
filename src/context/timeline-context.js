import { createContext, useContext, useState } from "react";
import { updateTimelineItem } from "../timelineItems.js";

const TimelineContext = createContext();

export function TimelineProvider({ children }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const selectItem = (item) => {
    setSelectedItem(item);
  };

  const startEditing = (item) => {
    setEditingItem(item);
    setEditedName(item.name);
  };

  const saveEdit = () => {
    if (editingItem && editedName.trim()) {
      setIsSaving(true);
      
      const updatedItem = updateTimelineItem(editingItem.id, { name: editedName.trim() });
      
      if (updatedItem) {
        if (selectedItem && selectedItem.id === editingItem.id) {
          setSelectedItem(updatedItem);
        }
        
        setEditingItem(null);
        setEditedName('');
      }
      
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditedName('');
  };

  const value = {
    selectedItem,
    editingItem,
    editedName,
    isSaving,
    selectItem,
    startEditing,
    saveEdit,
    cancelEdit,
    setEditedName,
  };

  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error("useTimeline must be used within a TimelineProvider");
  }
  return context;
}
