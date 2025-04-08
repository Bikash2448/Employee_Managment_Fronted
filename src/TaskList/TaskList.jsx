import React from 'react';
import NewTask from './NewTask';
import CompleteTask from './CompleteTask';
import AcceptTask from './AcceptTask';
import FailedTask from './FailedTask';

const TaskList = ({ tasks, triggerBothEffects }) => {
    const newTasks = tasks.filter((task) => task.status === 'newTask');
    const completedTasks = tasks.filter((task) => task.status === 'completed');
    const activeTasks = tasks.filter((task) => task.status === 'inProgress');
    const failedTasks = tasks.filter((task) => task.status === 'uncomplete');

    return (
        <div 
            id='tasklist' 
            className='pr-4 mx-2 w-full mt-10 
                       flex md:flex-nowrap flex-wrap 
                       items-center justify-around rounded-md 
                       bg-[#1c1c1c] gap-5 overflow-y-auto overflow-x-auto py-5'
        >
            {newTasks.length > 0 &&
                newTasks.map((task, index) => (
                    <NewTask key={index} task={task} onUpdate={triggerBothEffects} />
                ))
            }

            {completedTasks.length > 0 &&
                completedTasks.map((task, index) => (
                    <CompleteTask key={index} task={task} />
                ))
            }

            {activeTasks.length > 0 &&
                activeTasks.map((task, index) => (
                    <AcceptTask key={index} task={task} onUpdate={triggerBothEffects} />
                ))
            }

            {failedTasks.length > 0 &&
                failedTasks.map((task, index) => (
                    <FailedTask key={index} task={task} />
                ))
            }
        </div>
    );
};

export default TaskList;