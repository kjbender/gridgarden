import React, { Component } from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import blueberry from '../icons/blueberry.svg'
import styled from 'styled-components'; 

const grid = 8;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  margin-right: ${grid}px;
`;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,
  borderRadius: '50%',
  // change background colour if dragging
  background: isDragging ? "lightblue" : "white",

  // styles we need to apply on draggables
  ...draggableStyle
});

class RowPlant extends Component {

  render() {
    const { index, item } = this.props;
    //const { isModalOpen } = this.state;

    return (
      <Draggable draggableId={item.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          ><Avatar src={blueberry} alt="" /></div>
        )}
      </Draggable>
    );
  }
}

// const mapStateToProps = (state, ownProps) => ({
//   plant: state.plantsById[ownProps.plantId]
// });

export default connect()(RowPlant);

