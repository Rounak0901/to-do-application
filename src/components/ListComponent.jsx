import { useState } from "react";
import { Button, Form, ListGroup, Container, Row, Col } from 'react-bootstrap';
import initialTasks from "../../data";
import 'bootstrap/dist/css/bootstrap.min.css';

function ListComp() {
    const [tasks, setTasks] = useState(initialTasks)
    const [filter, setfilter] = useState("all")
    const [newTask, setNewTask] = useState("");

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };

    const addTask = () => {
        if (newTask.trim() === "") return;

        setTasks([...tasks, { text: newTask, completed: false }]);
        setNewTask("");
    };

    const removeTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks.map(task => task));
    };

    const moveUp = (index) => {
        if (index <= 0) return;
        const newTasks = [...tasks];
        [newTasks[index], newTasks[index - 1]] = [
            newTasks[index - 1],
            newTasks[index],
        ];
        setTasks(newTasks.map(task => task));
    };

    const moveDown = (index) => {
        if (index >= tasks.length - 1) return;
        const newTasks = [...tasks];
        [newTasks[index], newTasks[index + 1]] = [
            newTasks[index + 1],
            newTasks[index],
        ];
        setTasks(newTasks.map(task => task));
    };

    const toggleComplete = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks.map(task => task));
    };

    const filteredTasks = tasks.filter((item) => {
        switch (filter) {
            case "pending":
            return !item.completed;
            case "completed":
            return item.completed;
            default:
                return true;
        }
    });

    const taskItems = filteredTasks.map((item, index) => {
        return (
            <ListGroup.Item key={item.text + index} className="d-flex justify-content-between align-items-center">

                <span className="flex-grow-1 me-2" onClick={() => toggleComplete(index)} style={{ cursor: 'pointer', textDecoration: item.completed ? 'line-through' : 'none' }}>
                    {item.text}
                </span>
                <div>
                    <Button variant="outline-secondary" size="sm" onClick={() => moveUp(index)} disabled={index === 0}>
                        <i className="bi bi-arrow-up">Move Up</i>
                    </Button>
                    <Button variant="outline-secondary" size="sm" onClick={() => moveDown(tasks.indexOf(item))} disabled={tasks.indexOf(item) === tasks.length - 1}>
                        <i className="bi bi-arrow-down">Move Down</i>
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => removeTask(tasks.indexOf(item))}>
                        <i className="bi bi-trash">Delete</i>
                    </Button>
                </div>
            </ListGroup.Item>
        );
    });

    return (
        <Container className="mb-5">
            <h2 className="mb-3">To-Do List</h2>
            <Row className="mb-3">
                <Col xs={5}>
                    <Form.Control type="text" placeholder="Search a task"  />
                </Col>
                <Col xs={7}>
                    <div className="d-flex justify-content-end">
                        <Button size="sm" variant={filter === "all" ? "primary" : "outline-primary"} onClick={() => setfilter("all")} className="me-2">
                            All
                        </Button>
                        <Button size="sm" variant={filter === "pending" ? "primary" : "outline-primary"} onClick={() => setfilter("pending")} className="me-2">
                            Pending
                        </Button>
                        <Button size="sm" variant={filter === "completed" ? "primary" : "outline-success"} onClick={() => setfilter("completed")}>
                        Completed
                        </Button>
                    </div> 
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={8}>
                    <Form.Control type="text" placeholder="Add a task" value={newTask} onChange={handleInputChange}  />
                </Col>
                <Col xs={4}>
                    <Button onClick={addTask} variant="primary">Add Task</Button>
                </Col>
            </Row>
            <ListGroup>{taskItems}</ListGroup>
        </Container>
    );
}

export default ListComp;