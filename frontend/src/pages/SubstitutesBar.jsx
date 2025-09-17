import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import PlayerCard from "./PlayerCard";
import "./PlayerCard.css";
import "./ClubDetailPage.css";

export default function SubstitutesBar({ subs, setSubs }) {
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(subs);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setSubs(items);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="subs" direction="vertical">
        {(provided) => (
          <div
            className="subs-bar-grid"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {subs.map((player, idx) => (
              <Draggable
                key={player.id}
                draggableId={player.id.toString()}
                index={idx}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      opacity: snapshot.isDragging ? 0.6 : 1,
                      border:
                        snapshot.isDragging
                          ? "2px solid #f6e49a"
                          : "2px solid #e7d26b",
                      borderRadius: "18px",
                      margin: "0",
                      background: "transparent"
                    }}
                  >
                    <PlayerCard player={player} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}