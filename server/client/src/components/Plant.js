import React, { Component } from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import styled from 'styled-components'; 

const grid = 8;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  margin-right: ${grid/2}px;
  margin-left: ${grid/2}px;
`;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,
  borderRadius: '50%',
  background: isDragging ? "lightblue" : "white",
  ...draggableStyle
});

class Plant extends Component {
  render() {
    const { index, itemId, icon, name } = this.props;

    return (
      <Draggable draggableId={itemId} index={index} key={itemId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          ><Avatar src={icon} alt={name} /></div>
        )}
      </Draggable>
    );
  }
}

export default connect()(Plant);
