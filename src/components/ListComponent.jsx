// Suggested code may be subject to a license. Learn more: ~LicenseLog:4096752660.
import { useState } from "react";
import { Button, Form, ListGroup, Container, Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

function ListComp() {
    const [tasks, setTasks] = useState([
        "Eat breakfast",
        "Do work",
        "Go to sleep",
    ].map(task => ({
        text: task,
        completed: false
    })))
    
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

    const taskItems = tasks.map((item, index) => {
        return(
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                
                <span className="flex-grow-1 me-2" onClick={() => toggleComplete(index)} style={{ cursor: 'pointer', textDecoration: item.completed ? 'line-through' : 'none' }}>
                    {item.text}
                </span>
                <div>
                    <Button variant="outline-secondary" size="sm" onClick={() => moveUp(index)} disabled={index === 0}>
                        <i className="bi bi-arrow-up">Move Up</i>
                    </Button>{' '}
                    <Button variant="outline-secondary" size="sm" onClick={() => moveDown(index)} disabled={index === tasks.length - 1}>
                        <i className="bi bi-arrow-down">Move Down</i>
                    </Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => removeTask(index)}>
                        <i className="bi bi-trash">Delete</i>
                    </Button>
                </div>
            </ListGroup.Item>
        );
    });

    return (
        <Container className="mt-5">
            <h2 className="mb-3">To-Do List</h2>
            <Row className="mb-3">
                <Col xs={8}>
                    <Form.Control type="text" placeholder="Add a task" value={newTask} onChange={handleInputChange} />
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