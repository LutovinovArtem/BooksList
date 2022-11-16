import style from "./books.module.css";
import "antd/dist/antd.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table, Space, Button } from "antd";
import { AddButton } from "../../components/AddButton";
import { Loader } from "../../components/Loader/Loader";
import { AlertResponse } from "../../components/AlertResponse";
import { getBooks, deleteBook } from "../../store/bookSlice";

const Books = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { books, isLoading, error } = useSelector((state) => state.books);

  // const [response, setResponse] = useState();

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  const handleDeleteClick = (id) => {
    dispatch(deleteBook(id));
  };

  const goToEditBook = (id) => {
    navigate(`/editBook/${id}`);
  };

  const columns = [
    {
      title: "Название",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Жанр",
      dataIndex: "genres",
      key: "genres",
      // render: (genres) => {String(genres)},
    },
    {
      title: "Автор",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Цена в рублях",
      dataIndex: "rub_price",
      key: "price",
    },
    {
      title: "Действия",
      key: "action",
      render: (
        _,
        { id } // book => id
      ) => (
        <Space size="middle">
          <div>
            <Button type="primary" onClick={() => goToEditBook(id)}>
              Редактировать
            </Button>
          </div>

          <div>
            <Button danger type="primary" onClick={() => handleDeleteClick(id)}>
              Удалить
            </Button>
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {error && <h2> Error: {error}</h2>}

      {isLoading ? (
        <Loader />
      ) : (
        <div className={style.table}>
          <div className={style.tableHeader}>
            <h1> Книги </h1>
            <AlertResponse /> {/* response={response} */}
            <AddButton />
          </div>
          <Table dataSource={books} columns={columns} />
        </div>
      )}
    </div>
  );
};

export default Books;
