import React, { Component } from "react";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";

const grid = 8;

const getListStyle = (isDraggingOver, color) => ({
  background: isDraggingOver ? "#ba926c" : color,
  padding: grid,
  width: 104,
  height: 104,
  display: 'flex',
});

function getColor(status) {
  if (status === true) {
    return '#cc331499'
  } else if (status === false) {
    return '#628f0e99'
  } else {
    return '#d0b69c99'
  }
}

class Square extends Component {
  render() {
    const { dropId, isDropDis, hasConflict, children } = this.props;
    let color = getColor(hasConflict); 

    return (
      <Droppable droppableId={dropId} isDropDisabled={isDropDis} direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getListStyle(snapshot.isDraggingOver, color)}>
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    )
  }
}

export default connect()(Square);