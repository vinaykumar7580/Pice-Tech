# Chess App - Anti-Chess Variant

## Description
This is a web-based chess application implementing the Anti-Chess variant. Anti-Chess follows unique rules where the goal is to sacrifice all your pieces before your opponent does. Capturing is mandatory, and the game is won by losing all pieces or being unable to make a move.

## Features
- Allow to enter players name before starting the game.
- Standard 8x8 chessboard with chess piece movements.
- Unique Anti-Chess rules implemented for capturing and piece movement.
- Player names and turn indicators.
- Responsive design using Chakra UI for styling.
- Modal popups for game over and restart options.

## Technologies Used
- **React**: Frontend framework for building the user interface.
- **Chakra UI**: Component library for UI components.
- **React Router DOM**: For navigation within the application.
- **SVG Images**: Used for displaying chess piece icons.
- **Session Storage**: Stores player information across sessions.

## How to Play
- Enter players name on the page and click on submit.
- Each player alternates turns starting with Player 1 (White pieces).
- Click on a piece to see valid moves highlighted.
- Select a destination to move the piece.
- Capturing is mandatory; if multiple captures are possible, all non-capture moves are invalid.

## Screenshots
![Players Page Screenshot](./screenshots/game.png)
![Dashboard Page Screenshot](./screenshots/game.png)
![Game Over Modal](./screenshots/game-over.png)