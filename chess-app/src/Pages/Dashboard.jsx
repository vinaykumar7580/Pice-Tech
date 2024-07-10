import {
  Box,
  Button,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import ChessBoard from "../Components/ChessBoard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialState = [
  ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
  ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
  ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"],
];

function Dashboard() {
  const [board, setBoard] = useState(initialState);
  const [currentPlayer, setCurrentPlayer] = useState("w");
  const [selectedBox, setSelectedBox] = useState(null);
  const [error, setError] = useState("");
  const [validMoves, setValidMoves] = useState([]);
  const [winner, setWinner] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const players = JSON.parse(sessionStorage.getItem("players"));
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedBox) {
      const moves = calculateValidMoves(selectedBox, board, currentPlayer);
      setValidMoves(moves);
    } else {
      setValidMoves([]);
    }
  }, [selectedBox, board, currentPlayer]);

  const handleSelectedBox = (row, col) => {
    if (selectedBox) {
      handleMovePlayer(selectedBox, { row, col });
      setSelectedBox(null);
    } else {
      setSelectedBox({ row, col });
    }
  };

  const handleMovePlayer = (from, to) => {
    const newBoard = board.map((row) => row.slice());
    const piece = newBoard[from.row][from.col];

    if (!isValid(from, to, board, currentPlayer)) {
      setError("Invalid move. Please select a valid move.");
      toast({
        title: "Error",
        description: "Invalid move. Please select a valid move.",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    newBoard[from.row][from.col] = null;
    newBoard[to.row][to.col] = piece;

    setBoard(newBoard);
    if (checkWinner(newBoard, currentPlayer)) {
      setWinner(currentPlayer === "w" ? players.player1 : players.player2);
      onOpen();
    } else {
      setCurrentPlayer(currentPlayer === "w" ? "b" : "w");
    }
    setError("");
  };

  const isValid = (from, to, board, currentPlayer) => {
    const piece = board[from.row][from.col];

    if (!piece || piece.charAt(0) !== currentPlayer) {
      return false;
    }

    if (to.row < 0 || to.row >= 8 || to.col < 0 || to.col >= 8) {
      return false;
    }

    switch (piece.charAt(1)) {
      case "P": // Pawn
        return validatePawnMove(from, to, board, currentPlayer);
      case "R": // Rook
        return validateRookMove(from, to, board);
      case "N": // Knight
        return validateKnightMove(from, to);
      case "B": // Bishop
        return validateBishopMove(from, to, board);
      case "Q": // Queen
        return validateQueenMove(from, to, board);
      case "K": // King
        return validateKingMove(from, to);
      default:
        return false;
    }
  };

  const validatePawnMove = (from, to, board, currentPlayer) => {
    const direction = currentPlayer === "w" ? -1 : 1;
    const targetPiece = board[to.row][to.col];
    if (from.col === to.col) {
      if (to.row === from.row + direction && !targetPiece) {
        return true;
      }
    } else if (
      Math.abs(to.col - from.col) === 1 &&
      to.row === from.row + direction &&
      targetPiece
    ) {
      return true;
    }
    return false;
  };

  const validateRookMove = (from, to, board) => {
    if (from.row !== to.row && from.col !== to.col) {
      return false;
    }

    if (from.row === to.row) {
      const step = from.col < to.col ? 1 : -1;
      for (let col = from.col + step; col !== to.col + step; col += step) {
        if (board[from.row][col]) {
          return false;
        }
      }
    } else {
      const step = from.row < to.row ? 1 : -1;
      for (let row = from.row + step; row !== to.row + step; row += step) {
        if (board[row][from.col]) {
          return false;
        }
      }
    }

    return true;
  };

  const validateKnightMove = (from, to) => {
    const rowDiff = Math.abs(from.row - to.row);
    const colDiff = Math.abs(from.col - to.col);
    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
  };

  const validateBishopMove = (from, to, board) => {
    if (Math.abs(from.row - to.row) !== Math.abs(from.col - to.col))
      return false;
    const rowStep = from.row < to.row ? 1 : -1;
    const colStep = from.col < to.col ? 1 : -1;
    for (let i = 1; i < Math.abs(from.row - to.row); i++) {
      if (board[from.row + i * rowStep][from.col + i * colStep]) return false;
    }
    return true;
  };

  const validateQueenMove = (from, to, board) => {
    return (
      validateRookMove(from, to, board) || validateBishopMove(from, to, board)
    );
  };

  const validateKingMove = (from, to) => {
    const rowDiff = Math.abs(from.row - to.row);
    const colDiff = Math.abs(from.col - to.col);
    return rowDiff <= 1 && colDiff <= 1;
  };

  const calculateValidMoves = (from, board, currentPlayer) => {
    const moves = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (isValid(from, { row, col }, board, currentPlayer)) {
          moves.push({ row, col });
        }
      }
    }
    return moves;
  };

  const checkWinner = (board, currentPlayer) => {
    const opponent = currentPlayer === "w" ? "b" : "w";
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (board[row][col] && board[row][col].charAt(0) === opponent) {
          return false;
        }
      }
    }
    return true;
  };

  const handleQuit = () => {
    setWinner(currentPlayer === "w" ? players.player2 : players.player1);
    onOpen();
  };

  const handleRestart = () => {
    setBoard(initialState);
    setCurrentPlayer("w");
    setSelectedBox(null);
    setWinner(null);
    onClose();
  };

  const handleEndGame = () => {
    navigate("/");
  };

  return (
    <Box h={"100vh"} bg={"purple.500"} p={"10px"}>
      <Box
        w={"70%"}
        m={"auto"}
        bg={"white"}
        boxShadow={"md"}
        p={"10px 30px"}
        borderRadius={"10px"}
      >
        <Box
          p={"10px"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box
            border={currentPlayer === "b" ? "2px solid green" : ""}
            p={"0px 20px"}
            borderRadius={"3px"}
          >
            <Heading fontSize={"22px"} fontFamily={"serif"} color={"green"}>
              Player 2 : {players?.player2}
            </Heading>
          </Box>
          <Button colorScheme={"red"} onClick={handleQuit}>
            Quit
          </Button>
        </Box>
        <Box>
          <ChessBoard
            board={board}
            handleSelectedBox={handleSelectedBox}
            selectedBox={selectedBox}
            validMoves={validMoves}
          />
        </Box>
        <Box
          p={"10px"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box
            border={currentPlayer === "w" ? "2px solid blue" : ""}
            p={"0px 20px"}
            borderRadius={"3px"}
          >
            <Heading fontSize={"22px"} fontFamily={"serif"} color={"blue"}>
              Player 1 : {players?.player1}
            </Heading>
          </Box>
          {winner && (
            <Box>
              <Modal isOpen={isOpen} onClose={handleEndGame} isCentered>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Game Over</ModalHeader>
                  <ModalBody>
                    <Box
                      w={"50%"}
                      m={"auto"}
                      textAlign={"center"}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Box>
                        <Image
                          w={"100%"}
                          h={"100%"}
                          src="https://cdn-icons-png.flaticon.com/128/1021/1021202.png"
                          alt="win"
                        />
                      </Box>
                      <Text
                        fontSize={"25px"}
                        fontWeight={"bold"}
                        fontFamily={"serif"}
                        mt={"10px"}
                      >
                        {winner} Wins!
                      </Text>
                    </Box>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme={"blue"} mr={3} onClick={handleRestart}>
                      Start Again
                    </Button>
                    <Button variant="ghost" onClick={handleEndGame}>
                      End Game
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
