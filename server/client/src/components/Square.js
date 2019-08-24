import React, { Component } from "react";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";

const grid = 8;

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "grey" : "lightgrey",
  padding: grid,
  width: 104,
  height: 104,
});

class Square extends Component {
  render() {
    const { dropId, isDropDis, children } = this.props;

    return (
      <Droppable droppableId={dropId} isDropDisabled={isDropDis} direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getListStyle(snapshot.isDraggingOver)}>
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    )
  }
}

export default connect()(Square);