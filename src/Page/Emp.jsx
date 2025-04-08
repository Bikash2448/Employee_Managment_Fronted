import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import TaskList from '../TaskList/TaskList';
import TaskListNumber from '../Others/TaskListNumber';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Emp = () => {
    const [tasks, setTasks] = useState([]);
    const [taskCounts, setTaskCounts] = useState({
        newTask: 0,
        inProgress: 0,
        completed: 0,
        uncomplete: 0,
    });

    const [loading, setLoading] = useState(true);
    const [triggerEffect, setTriggerEffect] = useState(false);
    const location = useLocation();
    const { id } = location.state || {};

    const triggerBothEffects = () => {
        setTriggerEffect((prev) => !prev); // Toggle to refresh both components
    };

    useEffect(() => {
        if (!id) return;
        setLoading(true);

        async function fetchTaskCounts() {
            try {
                //  Fetch only task count data for `TaskListNumber`
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks/emp/${id}`);
                console.log("Task Counts Response:", response.data);

                // Use the API response directly for counts
                setTaskCounts({
                    newTask: response.data.newTask || 0,
                    inProgress: response.data.inProgress || 0,
                    completed: response.data.completed || 0,
                    uncomplete: response.data.uncomplete || 0,
                });

            } catch (error) {
                console.error('Error fetching task counts:', error);
            }
        }

        async function fetchFullTaskList() {
            try {
                //  Fetch full task list for `TaskList`
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks`);
                console.log("Full Task List Response:", response.data);

                //  Extract tasks for the current user
                const userTasks = response.data.find(task => task.user === id)?.tasks || [];
                setTasks(userTasks);

            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }

        fetchTaskCounts(); //  Update counts for TaskListNumber
        fetchFullTaskList(); // Fetch full task list for TaskList

        setLoading(false);
    }, [id, triggerEffect]);

    return (
        <div className='bg-[#1c1c1c] min-h-screen '>
            <Header />
            <TaskListNumber taskCounts={taskCounts} triggerBothEffects={triggerBothEffects} />
            <TaskList tasks={tasks} triggerBothEffects={triggerBothEffects} />
        </div>
    );
};

export default Emp;