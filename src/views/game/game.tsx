import Header from '@components/header';
import Footer from '@components/footer';
import Score from './score';
import Board from './board';
import GameOver from './game-over';
import './game.css';

const GameView = () => {
  return (
    <div className="game">
      <Header className="game__header" />
      <div className="game__main">
        <Board>
          <Score />
        </Board>
      </div>
      <Footer className="game__footer" />
      <GameOver />
    </div>
  );
};

export default GameView;
