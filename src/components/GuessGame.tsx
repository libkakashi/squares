import {useState, useEffect} from 'react';
import {Alert, Checkbox, Col, Divider, Input, Row, Typography} from 'antd';
import Chessboard from './Chessboard';

const convertToIndex = (alphanumeric: string) => {
  const letters = 'abcdefgh';
  const letter = alphanumeric[0]!.toLowerCase();
  const number = parseInt(alphanumeric[1]!, 10);
  const letterIndex = letters.indexOf(letter);

  return (8 - number) * 8 + letterIndex;
};

const GuessGame = () => {
  const [randomSquare, setRandomSquare] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [result, setResult] = useState('');

  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const randomValue = Math.floor(Math.random() * 64);

    setStartTime(Date.now());
    setRandomSquare(randomValue);
  }, []);

  useEffect(() => {
    if (!result || result.startsWith('Correct')) {
      document.body.style.backgroundColor = 'rgb(135, 208, 104)';
    } else {
      document.body.style.backgroundColor = 'rgb(255, 85, 0)';
    }
  }, [result]);

  const handleGuess = () => {
    const guessIndex = convertToIndex(userGuess);
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000;

    if (guessIndex === randomSquare) {
      setResult('Correct Guess!' + ' Time taken: ' + timeTaken + ' seconds');
      setStartTime(Date.now());
      setRandomSquare(Math.floor(Math.random() * 64));
    } else {
      setResult('Incorrect Guess. Try again!');
    }
    setUserGuess('');
  };

  return (
    <Row>
      <Col>
        <Row style={{width: '100%'}} justify="end">
          <Col>
            <Typography.Title level={4} style={{marginTop: 0}}>
              {!flipped ? 'Black' : 'White'}
            </Typography.Title>
          </Col>
        </Row>
        <Chessboard selectedSquare={randomSquare} flipped={flipped} />
        <Typography.Title level={4} style={{marginTop: 0}}>
          {flipped ? 'Black' : 'White'}
        </Typography.Title>
      </Col>
      <Col style={{paddingTop: '20px', paddingLeft: '100px'}}>
        <Checkbox onChange={event => setFlipped(event.target.checked)}>
          Flip Board
        </Checkbox>
        <br />
        <Input
          style={{width: '200px', marginTop: '20px'}}
          placeholder="Enter your guess (a1-h8)"
          value={userGuess}
          onChange={event => setUserGuess(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              handleGuess();
            }
          }}
        />
        <Divider />
        {result && (
          <Alert
            message={result}
            type={result.startsWith('Correct') ? 'success' : 'error'}
          />
        )}
      </Col>
    </Row>
  );
};

export default GuessGame;
