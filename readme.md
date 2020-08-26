# Chess Coordinate Trainer

This app helps you learn the chess board coordinates! You can use it [here](https://chess-coordinates-trainer.herokuapp.com).

## Pseudocode

```
There is a global variable called `currentCoordinate`

There is a global variable for the `quadrant`

There is a global variable for the side. `white = true`

Each cell contains coordinate data.

Run updateCellCoordinateData
```

* HandleClick function

    ```
    Put this on the event listener of the cell

    When a cell is clicked, its coordinate data is compared to the currentCoordinate
        if they are the same, you change the currentCoordinate display to green, by adding the `correct` class
        if not, you change the class to `wrong`

        After some fractions of second
            Call random Coordinate
            Call updateCurrentCoordinateDisplay
    ```


* Switch sides function

    ```
    Put this on the event listener of the switch

    Updates `white` variable.
    Call `updateCellCoordinateData`.
    Call `Switch Quadrant display`.

    ```

* Switch Quadrant function
* Put this on the event listener of the quadrant selector
    ```
    Change global `quadrant` variable according to user's input.
    Call `Random Coordinate`. This step is necessary to avoid the current coordinate to be out of the selected quadrant.
    Call `Switch Quadrant display`.
    ```

* updateCurrentCoordinateDisplay function
    ```
    remove `wrong` and `correct` classes
    update its content with currentCoordinate variable
    ```

* updateCellCoordinateData
    ```
    Updates the coordinate data of the cells depending on `white` variable.
    ```

* Random Coordinate
    ```
    Updates `currentCoordinate` depending on the global `quadrant` variable.
    ```

* Switch Quadrant display
    ```
    Changes the display of the board according to `quadrant` and `white`.
    ```
