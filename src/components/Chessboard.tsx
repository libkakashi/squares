import {Col, Row} from 'antd';
import {useMemo} from 'react';

const Chessboard = ({
  selectedSquare,
  flipped,
}: {
  selectedSquare: number;
  flipped: boolean;
}) => {
  const squares = useMemo(() => {
    const squares = [];

    for (let i = 0; i < 64; i++) {
      const isWhite = (Math.floor(i / 8) + (i % 8)) % 2 === 1;
      const isSelected = i === selectedSquare;

      squares.push(
        <Col
          key={i}
          xs={3}
          style={{
            backgroundColor: isSelected ? 'blue' : isWhite ? 'white' : 'black',
            padding: '0',
            margin: 0,
          }}
        />
      );
    }
    return squares;
  }, [selectedSquare]);

  return (
    <Row
      gutter={[0, 0]}
      style={{
        width: '80vh',
        height: '80vh',
        transform: flipped ? 'rotate(180deg)' : 'none',
      }}
      align="stretch"
    >
      {squares}
    </Row>
  );
};

export default Chessboard;
