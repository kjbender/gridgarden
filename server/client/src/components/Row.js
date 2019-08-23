import React, { Component } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
//import styled from 'styled-components';
import { connect } from "react-redux";
import RowPlant from './Plant';

const grid = 8;

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "grey" : "lightgrey",
  display: 'flex',
  padding: grid,
  overflow: 'auto'
});

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(7)
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  //<DragDropContext onDragEnd={this.handleDragEnd}>
  // handleDragEnd = ({ source, destination, type }) => {
  //   // dropped outside the list
  //   if (!destination) {
  //     return;
  //   }
  //   const { dispatch, boardId } = this.props;

  //   // Move card
  //   if (
  //     source.index !== destination.index ||
  //     source.droppableId !== destination.droppableId
  //   ) {
  //     dispatch({
  //       type: "MOVE_CARD",
  //       payload: {
  //         sourceListId: source.droppableId,
  //         destListId: destination.droppableId,
  //         oldCardIndex: source.index,
  //         newCardIndex: destination.index,
  //         boardId
  //       }
  //     });
  //   }
  // };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
                <RowPlant key={item.id} item={item} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

// Put the thing into the DOM!
export default connect()(Row);

//{item.content}
//  border-color: ${({ isDragging }) => (isDragging ? colors.G50 : colors.N0)};
// box-shadow: ${({ isDragging }) =>
//     isDragging ? `2px 2px 1px ${colors.N200}` : 'none'};

//   &:focus {
//     /* disable standard focus color */
//     outline: none;

//     /* use our own awesome one */
//     border-color: ${({ isDragging }) =>
//       isDragging ? colors.G50 : colors.B200};
//   }

// margin-right: ${grid}px;
// border-style: solid;
// border-width: ${grid}px;
//   border-radius: 50%;
