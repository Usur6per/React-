import { use, useEffect, useState } from "react";
import { Badge, Button, Form, Table, Modal } from "react-bootstrap";
import { fetchTodos } from "../data/todos";
const Todos = () => {
  // [fetchTodos] -> todosRaw -> [filters] -> todos -> [pagination] -> todos
  //            onlyWating ->

  //            todos -> [] -> numPages -> [] -> curPage
  // itemPerPage ->
  const [todosRaw, setTodosRaw] = useState([]);
  const [todos, setTodos] = useState([]);

  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [curPage, setCurPage] = useState(1);
  const [numPages, setNumPages] = useState(3);

  const newIdRef = useRef();
  const newTitleRef = useRef();

  useEffect(() => {
    setTodosRaw(fetchTodos());
  }, []); //load

  useEffect(() => {
    if (onlyWaiting) setTodos(todosRaw.filter((todo) => !todo.completed));
    else setTodos(todosRaw);
  }, [todosRaw, onlyWaiting]);

  //   useEffect(() => {
  //     console.log("onlyWaiting: " + onlyWaiting);
  //   }, [onlyWaiting]);

  useEffect(() => {
    setNumPages(Math.ceil(todos.length / itemsPerPage));
  }, [todos, itemsPerPage]);

  useEffect(() => {
    if (numPages <= 0) setCurPage(0);
    else if (curPage > numPages) setCurPage(numPages);
    else if (curPage <= 0) setCurPage(1);
  }, [numPages]);

  const waitingClicked = (id) => {
    console.log(id);

    const selectedTodo = todosRaw.find((todo) => {
      return todo.id === id;
    });

    selectedTodo.completed = true;

    setTodosRaw([...todosRaw]);
  };

  const deleteClicked = (id) => {
    const remainTodos = todosRaw.filter((todo) => {
      return todo.id !== id;
    });

    setTodosRaw(remainTodos);
  };

  const saveClicked = (id, title) => {
    console.log(id, title);

    if (title.trim() !== "") {
      // add new
      const newTodo = {
        userId: 1,
        id,
        title,
        completed: false,
      };

      setTodosRaw([...todosRaw, newTodo]);
    }

    handleClose();
  };

  // modal state and handles
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* modal begin */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add todos</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID :</Form.Label>
              <Form.Control
                ref={newIdRef}
                value={
                  todosRaw.reduce((prev, todo) => {
                    return todo.id > prev ? todo.id : prev;
                  }, -1) + 1
                }
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title :</Form.Label>
              <Form.Control
                ref={newTitleRef}
                placeholder="ใส่ todo ใหม่ตรงนี้"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              saveClicked((newIdRef.current.value), (newTitleRef.current.value))
            }
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal end */}

      {/* filters */}
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            // label='Show only waiting'
            onChange={(e) => setOnlyWaiting(e.target.checked)}
          />
          <label htmlFor="custom-switch">
            Show only&nbsp;
            <Button variant="warning" style={{ pointerEvents: "none" }}>
              waiting&nbsp;<i className="bi bi-clock"></i>
            </Button>
          </label>
        </div>
        <Form.Select
          aria-label="Default select example"
          className="w-25"
          onChange={(e) => setItemsPerPage(e.target.value)}
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={50}>50 items per page</option>
          <option value={100}>100 items per page</option>
        </Form.Select>
      </div>
      {/* table */}
      <div className="mt-2">
        <Table striped hover>
          <thead className="table-dark">
            <tr>
              <th className="text-center" style={{ width: "4rem" }}>
                ID
              </th>
              <th className="text-center">Title</th>
              <th className="text-end" style={{ width: "12rem" }}>
                Completed&nbsp;
                <Button
                  onClick={() => {
                    handleShow();
                  }}
                >
                  <i className="bi bi-plus"></i>
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              //
              // start = (curPage - 1) * itemPerPage + 1   = 0
              // stop = curPage * itemPerPage - 1          = 4
              todos
                .filter((todo, index) => {
                  return (
                    index >= (curPage - 1) * itemsPerPage &&
                    index <= curPage * itemsPerPage - 1
                  );
                })

                .map((todo) => {
                  return (
                    <tr key={todo.id}>
                      <td className="text-center">
                        <Badge bg="secondary">{todo.id}</Badge>
                      </td>
                      <td>{todo.title}</td>
                      <td className="text-end">
                        {todo.completed ? (
                          <Badge bg="success">
                            done&nbsp;<i className="bi bi-check"></i>
                          </Badge>
                        ) : (
                          <Button
                            variant="warning"
                            onClick={() => {
                              waitingClicked(todo.id);
                            }}
                          >
                            waiting&nbsp;<i className="bi bi-clock"></i>
                          </Button>
                        )}
                        &nbsp;
                        <Button
                          variant="danger"
                          onClick={() => {
                            deleteClicked(todo.id);
                          }}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  );
                })
            }
          </tbody>
        </Table>
      </div>
      {/* page control */}
      <div className="text-center mt-2">
        <Button
          variant="outline-primary"
          onClick={() => setCurPage(1)}
          disabled={curPage <= 1}
        >
          First
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => curPage > 1 && setCurPage((p) => p - 1)}
          disabled={curPage <= 1}
        >
          Previous
        </Button>
        &nbsp;
        <span>
          {curPage}&nbsp;/&nbsp;{numPages}
        </span>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => curPage < numPages && setCurPage((p) => p + 1)}
          disabled={curPage >= numPages}
        >
          Next
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => {
            setCurPage(numPages);
          }}
          disabled={curPage >= numPages}
        >
          Last
        </Button>
      </div>
    </>
  );
};
export default Todos;
