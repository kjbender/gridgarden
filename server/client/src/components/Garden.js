import React, { Component } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { fetchTransformedPlot } from "../actions";
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import onion from '../icons/onion.svg'
import corn from '../icons/corn.svg'
import carrot from '../icons/carrot.svg'
import tomato from '../icons/tomato.svg'
import beans from '../icons/beans.svg'
import styled from 'styled-components';
import shortid from "shortid";

const grid = 8;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  margin-right: ${grid}px;
`;
const SuggestionDiv = styled.div`
  border-radius: 50%;
  margin: '0 0 ${grid}px 0'; 
  padding: 16px;
  background: transparent; 
`;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  borderRadius: '50%',
  background: isDragging ? "lightblue" : "white",
  ...draggableStyle
});
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "grey" : "lightgrey",
  padding: grid,
  width: 100,
  height: 104,
});
const getTrayStyle = isDraggingOver => ({
  background: isDraggingOver ? "black" : "grey",
  padding: grid,
  width: 100,
  minHeight: 500,
});

const PLANTS = {
  0: { id: shortid.generate(), matrixIndex: 0, icon: '' },
  1: { id: 'Tomatoes', matrixIndex: 1, icon: tomato },
  2: { id: 'Corn', matrixIndex: 2, icon: corn },
  3: { id: 'Beans', matrixIndex: 3, icon: beans },
  4: { id: 'Onion', matrixIndex: 4, icon: onion },
  5: { id: 'Carrots', matrixIndex: 5, icon: carrot }
}

// reorder the result when item is dropped on list of origin
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// move item between lists
const move = (source, destination, droppableSource, droppableDestination) => {
  //console.log(source, destination, droppableSource, droppableDestination);
  const sourceClone = Array.from(source);
  //console.log(sourceClone);
  const destClone = Array.from(destination);
  //console.log(destClone);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  //console.log(removed); 
  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  //console.log(result);
  return result;
};

// idea: set rows as keys in state filled in with 0s for number of columns (m by n). 
// for each row, within a grid item, map the columns to droppables.
// if the element is 0 (or negative), don't include a draggable, but set the background image 
// (blank if 0, opaque veg if negative, making isDropDisabled set to false);
// if the element is positive, include the draggable and set isDropDisabled to true.

// the 'move' logic will need to be adjusted to accomodate singletons-as-array-elements 
// (conditional based on whether source/target is the tray)
// ...business as usual for the tray logic, but for the other components, 
// zeros should be replaced by incoming and should replace outgoing. 

// draggable IDs must be generated based on row/column for uniqueness. 

class Garden extends Component {

  componentDidMount() {
    this.props.fetchTransformedPlot([[0, 0], [0, 0]])
  }

  renderTransformedPlot() {
    if (this.props.transformedPlot) {
      return this.props.transformedPlot.map(function (row) {
        return row.map(function (cell) {
          return (<p key={shortid.generate()}>`{cell}`</p>)
        })
      })
    }
  }

  renderCell(stateName, row, col) {
    if (this.state[stateName].length > 0) {
      return (
        this.state[stateName].map((item, index) => (
          <Draggable draggableId={PLANTS[item].id} index={index} key={PLANTS[item].id}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
              ><Avatar src={PLANTS[item].icon} alt="" /></div>
            )}
          </Draggable>
        ))
      )
    } else if (this.props.transformedPlot.length !== 0) {
      //console.log(this.props.transformedPlot); 
      if (this.props.transformedPlot[row][col] !== 0) {
        let plant = Math.abs(this.props.transformedPlot[row][col]);
        return (
          <SuggestionDiv>
            <Avatar src={PLANTS[plant].icon} alt="" />
          </SuggestionDiv>
        )
      }
    }
  }

  state = {
    tray: [1, 2, 3, 4, 5],
    row0col0: [],
    row1col0: [],
    row0col1: [],
    row1col1: [],
    dropDisabled00: false,
    dropDisabled10: false,
    dropDisabled01: false,
    dropDisabled11: false,
    plot: []
  };

  // handle multiple lists: match IDs of droppable container to names of source arrays in state 
  id2List = {
    tray: 'tray',
    droppable00: 'row0col0',
    droppable10: 'row1col0',
    droppable01: 'row0col1',
    droppable11: 'row1col1'
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
    const { source, destination } = result;

    // dragged item is dropped outside the list (no changes)
    if (!destination) {
      return;
    }

    // dragged item is dropped within the same list (can only happen in tray)
    // settings for isDropDisabled on singletons means they never meet this condition 
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.state.tray,
        source.index,
        destination.index
      );
      let state = { tray: items };
      this.setState(state);

      // dragged item is dropped in another list (therefore 'plot' changes)
    } else {

      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      let trayUp = (result.tray) ? result.tray : this.state.tray;
      let row0col0Up = (result.droppable00) ? result.droppable00 : this.state.row0col0;
      let row1col0Up = (result.droppable10) ? result.droppable10 : this.state.row1col0;
      let row0col1Up = (result.droppable01) ? result.droppable01 : this.state.row0col1;
      let row1col1Up = (result.droppable11) ? result.droppable11 : this.state.row1col1;
      let dropDisabled00Up = (row0col0Up.length > 0) ? true : false;
      let dropDisabled10Up = (row1col0Up.length > 0) ? true : false;
      let dropDisabled01Up = (row0col1Up.length > 0) ? true : false;
      let dropDisabled11Up = (row1col1Up.length > 0) ? true : false;

      let plotUp = [[row0col0Up[0] || 0, row0col1Up[0] || 0], [row1col0Up[0] || 0, row1col1Up[0] || 0]]
      console.log('component', plotUp);
      this.props.fetchTransformedPlot(plotUp);

      this.setState({
        tray: trayUp,
        row0col0: row0col0Up,
        row1col0: row1col0Up,
        row0col1: row0col1Up,
        row1col1: row1col1Up,
        dropDisabled00: dropDisabled00Up,
        dropDisabled10: dropDisabled10Up,
        dropDisabled01: dropDisabled01Up,
        dropDisabled11: dropDisabled11Up,
        plot: plotUp
      });

      // update display of draggables based on plot (dispatch action with plot) 
      // in fact, plot can be part of redux state (this.props.plot used for draggables)

      //let stateToSend = [row0Up, row1Up]; 
      //this.props.movePlant(stateToSend); 
    }
  };

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item >{this.renderTransformedPlot()}</Grid>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Grid item key='dropTray'>
            <Droppable droppableId={'tray'} isDropDisabled={false}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={getTrayStyle(snapshot.isDraggingOver)}>
                  {this.state.tray.map((item, index) => (
                    <Draggable draggableId={PLANTS[item].id} index={index} key={PLANTS[item].id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        ><Avatar src={PLANTS[item].icon} alt="" /></div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Grid>

          <Grid item key='drop0'>
            <Grid item key='drop00'>
              <Droppable droppableId={'droppable00'} isDropDisabled={this.state.dropDisabled00}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={getListStyle(snapshot.isDraggingOver)}>
                    {this.renderCell('row0col0', 0, 0)}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Grid>
            <Grid item key='drop10'>
              <Droppable droppableId={'droppable10'} isDropDisabled={this.state.dropDisabled10}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={getListStyle(snapshot.isDraggingOver)}>
                    {this.renderCell('row1col0', 1, 0)}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Grid>
          </Grid>

          <Grid item key='drop1'>
            <Grid item key='drop01'>
              <Droppable droppableId={'droppable01'} isDropDisabled={this.state.dropDisabled01}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={getListStyle(snapshot.isDraggingOver)}>
                    {this.renderCell('row0col1', 0, 1)}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Grid>
            <Grid item key='drop11'>
              <Droppable droppableId={'droppable11'} isDropDisabled={this.state.dropDisabled11}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={getListStyle(snapshot.isDraggingOver)}>
                    {this.renderCell('row1col1', 1, 1)}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Grid>
          </Grid>

        </DragDropContext>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    transformedPlot: state.transformedPlot
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchTransformedPlot }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Garden); 