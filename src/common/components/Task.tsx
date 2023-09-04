import React, {memo, useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {TasksType} from "../../features/tasksList/tasks-reducer.ts";
import {Checkbox, IconButton} from "@mui/material";

type TaskPropsType = {
    findTaskHandler: (id: string) => void
    changeTaskStatusHandler: (id: string) => void
    task: TasksType
}

export const Task = memo(({findTaskHandler, changeTaskStatusHandler, task}: TaskPropsType) => {

    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    const isExpandMoreVisible = !task.children.length ? {display: 'none'} : {}

    if (task.title === 'aaa') {
        console.log(task)
    }

    return (
        <div>
            <Accordion TransitionProps={{unmountOnExit: true}} sx={{
                boxShadow: 'none',
            }} expanded={expanded}>
                <AccordionSummary
                    sx={{
                        cursor: 'default !important',
                    }}
                    expandIcon={<IconButton sx={isExpandMoreVisible} onClick={handleExpand}><ExpandMoreIcon/></IconButton>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <span style={{display: 'flex', alignItems: 'center'}}>
                        <Checkbox onChange={() => changeTaskStatusHandler(task.id)} checked={task.isDone}/>
                        <Typography onClick={() => findTaskHandler(task.id)}>{task.title}</Typography></span>
                </AccordionSummary>
                <AccordionDetails>
                    {task.children.map(childTask => {
                        return (
                            <Task
                                key={childTask.id}
                                task={childTask}
                                findTaskHandler={findTaskHandler}
                                changeTaskStatusHandler={changeTaskStatusHandler}
                            />
                        );
                    })}
                </AccordionDetails>
            </Accordion>
        </div>
    );
})
