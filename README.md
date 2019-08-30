# Grid Garden

Grid Garden is a web application for intelligent garden design through guided companion planting, which is the technique of planting certain crops in proximity to maximize use of space, increase yield, and improve the chances of a successful harvest. 

Companion planting dates back thousands of years (see the "three sisters": corn, beans, and squash) and incorporates strategies for pest control, nutrient provision, and protective shelter, among many others. 

This application encodes relationships between plants in a matrix: all pairwise interactions between plants in the database are recorded as positive, negative, or neutral. 

As a user drags and drops plants onto the grid, suggestions are progressively generated for empty spaces adjacent to planted crops, and the compatibility measures of adjacent planted crops are analyzed and indicated by background color (green for compatible, red for incompatible). 

As plants are added to the board, a planting calendar is populated with approximate time intervals from sowing/planting to harvest (for the USDA hardiness zone 7b). 

React, Redux, Material-UI, Bootstrap, react-beautiful-dnd, and Highcharts on the front end; Node and Express on the back end. 

#### Created as a final project for the Project Shift software engineering program

### Plans for future development 

* Use MongoDB/Mongoose, SQL, or a graph database for the plants (especially to record reasons for interactions and other data such as sunlight requirements and ideal growing conditions) 
* Increase the number of available plants 
* Provide the user with textual information as they build their plot 
* Make planting calendar dependent on user-provided location information (so it changes by hardiness zone) 
* Refactor the grid component to be variable in size 
* Maintain set collection in the "tray" of plants so each vegetable can be used more than once  
