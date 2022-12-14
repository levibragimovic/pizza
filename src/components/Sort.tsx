import { memo, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSortTypeId } from '../redux/slices/filterSlice';

type PopupClick = MouseEvent & { path: Node[] };
interface ISortProps {
  sortId: number;
}

const Sort: React.FC<ISortProps> = memo(({ sortId }) => {
  const dispatch = useDispatch();
  const list = ['популярности', 'цене', 'алфавиту'];
  const [open, setOpen] = useState(false);
  const sortRef = useRef<HTMLSpanElement>(null);
  const selectFilter = (i: number) => {
    dispatch(setSortTypeId(i));
    setOpen(false);
  };

  useEffect(() => {
    const onOutsideClick = (e: MouseEvent) => {
      const _event = e as PopupClick;
      if (sortRef.current !== _event.target) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', onOutsideClick);
    return () => document.body.removeEventListener('click', onOutsideClick);
  }, []);

  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          className={open ? 'sort-open' : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span
          style={{ userSelect: 'none' }}
          onClick={() => setOpen((pv) => !pv)}
          ref={sortRef}
        >
          {list[sortId]}
        </span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((item, i) => (
              <li
                key={i}
                onClick={() => selectFilter(i)}
                className={sortId === i ? 'active' : ''}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
