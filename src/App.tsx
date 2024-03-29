/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { getPreparedTodos } from './utils/getPrepareTodos';

import { Todo } from './types/Todo';
import { SortFields } from './types/SortFields';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState(SortFields.All);
  const [query, setQuery] = useState('');
  const [modalInfo, setModalInfo] = useState<Todo | null>(null);

  const visibleTodos = useMemo(() => {
    return getPreparedTodos(todos, filter, query);
  }, [todos, filter, query]);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                query={query}
                setFilter={setFilter}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && todos.length && (
                <TodoList
                  todos={visibleTodos}
                  modalInfo={modalInfo}
                  setModalInfo={setModalInfo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalInfo && (
        <TodoModal modalInfo={modalInfo} setModalInfo={setModalInfo} />
      )}
    </>
  );
};
