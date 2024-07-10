import { Box } from "@chakra-ui/react";
import {
  FaChessPawn,
  FaChessRook,
  FaChessKnight,
  FaChessBishop,
  FaChessQueen,
  FaChessKing,
} from "react-icons/fa";

const pieceIcons = {
  bP: <FaChessPawn style={{ color: "black", fontSize:"25px" }} />,
  bR: <FaChessRook style={{ color: "black", fontSize:"25px" }} />,
  bN: <FaChessKnight style={{ color: "black", fontSize:"25px" }} />,
  bB: <FaChessBishop style={{ color: "black", fontSize:"25px" }} />,
  bQ: <FaChessQueen style={{ color: "black", fontSize:"25px" }} />,
  bK: <FaChessKing style={{ color: "black", fontSize:"25px" }} />,
  wP: <FaChessPawn style={{ color: "white", fontSize:"25px" }} />,
  wR: <FaChessRook style={{ color: "white", fontSize:"25px" }} />,
  wN: <FaChessKnight style={{ color: "white", fontSize:"25px" }} />,
  wB: <FaChessBishop style={{ color: "white", fontSize:"25px" }} />,
  wQ: <FaChessQueen style={{ color: "white", fontSize:"25px" }} />,
  wK: <FaChessKing style={{ color: "white", fontSize:"25px" }} />,
};

function ChessBoard({ board, handleSelectedBox, selectedBox, validMoves }) {
  return (
    <Box
      display={"grid"}
      gridTemplateColumns={"repeat(8, 1fr)"}
      justifyContent={"center"}
      alignItems={"center"}
      color={"red"}
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
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
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
                {col ? pieceIcons[col] : null}
              </Box>
            );
          })
        )}
    </Box>
  );
}

export default ChessBoard;
