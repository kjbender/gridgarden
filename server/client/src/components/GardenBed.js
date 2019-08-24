import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { fetchTransformedPlot } from "../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import shortid from "shortid";
import Grid from '@material-ui/core/Grid';

import Square from './Square';
import Plant from './Plant';
import styled from 'styled-components';

import onion from '../icons/onion.svg'
import corn from '../icons/corn.svg'
import carrot from '../icons/carrot.svg'
import tomato from '../icons/tomato.svg'
import beans from '../icons/beans.svg'
const ICONS = ['', tomato, corn, beans, onion, carrot];

const PLANTS = {
  0: { name: '', matrixIndex: 0, icon: '' },
  1: { name: 'Tomatoes', matrixIndex: 1, icon: tomato },
  2: { name: 'Corn', matrixIndex: 2, icon: corn },
  3: { name: 'Beans', matrixIndex: 3, icon: beans },
  4: { name: 'Onion', matrixIndex: 4, icon: onion },
  5: { name: 'Carrots', matrixIndex: 5, icon: carrot }
}
const grid = 8;
// shows suggestions where applicable 
const SuggestionDiv = styled.div`
  border-radius: 50%;
  margin: '0 0 ${grid}px 0'; 
  padding: 16px;
  background: transparent; 
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  margin-right: ${grid}px;
`;

// initialize tray with a set of plants 
const getTrayItems = number =>
  Array.from({ length: number }, (v, k) => k).map(k => ({
    _id: shortid.generate(),
    plantId: k+1,
    label: `plant-${k+1}`
  }));
const getTrayStyle = isDraggingOver => ({
  background: isDraggingOver ? "black" : "grey",
  padding: grid,
  display: 'flex',
  overflow: 'auto'
});

// reorder the result when item is dropped on list of origin
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// move item between lists
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};

class GardenBed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 5,
      tray: getTrayItems(5),
      droppable00: [],
      droppable01: [],
      droppable02: [],
      droppable10: [],
      droppable11: [],
      droppable12: [],
      droppable20: [],
      droppable21: [],
      droppable22: [],
      plot: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    };
    this.getListNameFromDim = this.getListNameFromDim.bind(this);
  }

  droppableArray = [
    ['droppable00', 'droppable01', 'droppable02'],
    ['droppable10', 'droppable11', 'droppable12'],
    ['droppable20', 'droppable21', 'droppable22']
  ];

  getListNameFromDim = (row, col) => this.droppableArray[row][col];

  // this.getListNameFromDim(2,1)
  getDimFromListName = (name) => [name.slice(-2, -1), name.slice(-1)];
  // this.getDimFromListName('droppable21')

  // drop0 [drop00, drop10, drop20] (first col)
  // drop1 [drop01, drop11, drop21] 
  renderPlotGrid() {
    const array = [
      ['droppable00', 'droppable01', 'droppable02'],
      ['droppable10', 'droppable11', 'droppable12'],
      ['droppable20', 'droppable21', 'droppable22']
    ];
    return array.map( (row, indexR) => {
      let colKey = `drop${indexR}`;
      return (
        <Grid item key={colKey}>
          {row.map( (col, indexC) => {
            let colRowKey = `drop${indexC}${indexR}`;
            let dropId = array[indexC][indexR];
            let isDropDis = !!this.state[dropId].length;
            return (
              <Grid item key={colRowKey}>
                <Square dropId={dropId} isDropDis={isDropDis}>
                  {this.renderCell(dropId, isDropDis, indexC, indexR)}
                </Square>
              </Grid>
            )
          })}
        </Grid>
      )
    })
  }

  renderCell(dropId, isDropDis, row, col) {
    if (isDropDis) {
      return (
        this.state[dropId].map((item, index) => (
          <Plant index={index} icon={ICONS[item.plantId]} name={PLANTS[item.plantId].name} itemId={item._id} key={item.label} />
        ))
      )
    } else if (this.props.transformedPlot.length !== 0) {
      if (this.props.transformedPlot[row][col] !== 0) {
        let plant = Math.abs(this.props.transformedPlot[row][col]);
        return (
          <SuggestionDiv>
            <Avatar src={PLANTS[plant].icon} alt={PLANTS[plant].name} />
          </SuggestionDiv>
        )
      }
    }
  }

  // _id, plantId, label 
  renderTrayPlants(trayArray) {
    return trayArray.map((item, index) => (
      <Plant index={index} icon={ICONS[item.plantId]} name={PLANTS[item.plantId].name} itemId={item._id} key={item.label} />
    ));
  }

  componentDidMount() {
    this.props.fetchTransformedPlot(this.state.plot); 
  }

  onDragEnd = result => {
    console.log(result);
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
        this.state[source.droppableId],
        this.state[destination.droppableId],
        source,
        destination
      );
      const listNames = Object.keys(result); 
      let first = listNames[0];
      let second = listNames[1];
      console.log(listNames);
      let firstArray = result[first];
      let secondArray = result[second]; 

      // get dimensions for whichever non-tray droppables are involved
      // build updated 'plot' and fetch transformation 
      let plotUp = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]; 
      console.log('component', plotUp);
      //this.props.fetchTransformedPlot(plotUp);
        // plot: plotUp 

        this.setState({
        [first]: firstArray,
        [second]: secondArray
      });
    }
  }

  render() {
    return (
      <Grid container spacing={1}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Grid item key='dropTray' xs={12}>
            <Droppable droppableId={'tray'} direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={getTrayStyle(snapshot.isDraggingOver)}>
                  {this.renderTrayPlants(this.state.tray)}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Grid>
          {this.renderPlotGrid()}
        </DragDropContext>
      </Grid>
    )
  }
}
// {this.renderPlotGrid()}
function mapStateToProps(state) {
  return {
    transformedPlot: state.transformedPlot,
    plants: state.plants
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchTransformedPlot }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GardenBed); 
