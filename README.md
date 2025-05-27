# technicalInterview.node

## Task 1
Design and implement a RESTful API with Node and TypeScript that provides information about electric charging stations. The data must be retrieved from a SQL database, and to improve performance, the API must implement server-side caching. Refer to the [charging station map](https://www.enelx.com/de/en/charging-station-map) for the data fields.

### API Functionalities
The API must expose the following endpoints:
* GET /stations: Return a list of all charging stations.
* GET /stations/{id}: Return detailed information about a specific charging station by ID.
* GET /stations/nearby?lat=xx&lng=yy&radius=zz: Return stations within a given radius (km) from specified coordinates.

## How to contribute
* Fork the project
* Create a branch with your name 
* Solve the exercises
* Commit
* Push
* Share your repository