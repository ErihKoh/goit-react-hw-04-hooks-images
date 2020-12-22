import s from './Button.module.css';

function ButtonLoadMore({ onClick }) {
  return (
    <button type="button" className={s.Button} onClick={onClick}>
      Load more
    </button>
  );
}

export default ButtonLoadMore;
