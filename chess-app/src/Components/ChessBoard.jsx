import { Box } from "@chakra-ui/react";

function ChessBoard({ board, handleSelectedBox, selectedBox, validMoves }) {
  return (
    <Box
      display={"grid"}
      gridTemplateColumns={"repeat(8, 1fr)"}
      justifyContent={"center"}
      alignItems={"center"}
      color={"yellow"}
      fontWeight={"bold"}
    >
      {board &&
        board.map((row, rowIndex) =>
          row.map((col, colIndex) => {
            const isSelected =
              selectedBox?.row === rowIndex && selectedBox?.col === colIndex;
            const isValidMove = validMoves.some(
              (move) => move.row === rowIndex && move.col === colIndex
            );

            return (
              <Box
                key={`${rowIndex}-${colIndex}`}
                h={"70px"}
                bg={(rowIndex + colIndex) % 2 === 0 ? "gray.300" : "gray.700"}
                border={
                  isSelected
                    ? "3px solid yellow"
                    : isValidMove
                    ? "3px solid red"
                    : ""
                }
                onClick={() => handleSelectedBox(rowIndex, colIndex)}
              >
                {col}
              </Box>
            );
          })
        )}
    </Box>
  );
}

export default ChessBoard;
