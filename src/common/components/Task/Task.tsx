import React, {memo, useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {TasksType} from "../../../features/tasksList/tasks-reducer.ts";
import {Checkbox, IconButton, Paper} from "@mui/material";
import s from './Task.module.css'

type TaskPropsType = {
    findTaskHandler: (id: string) => void
    changeTaskStatusHandler: (id: string) => void
    chooseTaskHandler: (id: string, e: React.MouseEvent<HTMLDivElement>) => void
    task: TasksType
}

export const Task = memo(({
                              findTaskHandler,
                              changeTaskStatusHandler,
                              chooseTaskHandler,
                              task
                          }: TaskPropsType) => {

    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    const isExpandMoreVisible = !task.children.length ? {display: 'none'} : {}
    return (
        <div>
            <Accordion TransitionProps={{unmountOnExit: true}} sx={{
                boxShadow: 'none',
                mt: '0'
            }} expanded={expanded}>
                <Paper elevation={2}>
                    <AccordionSummary onClick={(event) => chooseTaskHandler(task.id, event)}
                                      sx={{
                                          cursor: 'default !important',
                                          backgroundColor: task.isChosen ? 'rgba(128, 128, 128, 0.3)': '',
                                          mt: '10px'
                                      }}
                                      expandIcon={
                                          <IconButton
                                              sx={isExpandMoreVisible}
                                              onClick={handleExpand}><ExpandMoreIcon/>
                                          </IconButton>}
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                    >
                    <span style={{display: 'flex', alignItems: 'center'}}>
                        <Checkbox onChange={() => changeTaskStatusHandler(task.id)} checked={task.isDone}/>
                        <span className={s.taskTitle} onClick={() => findTaskHandler(task.id)}>{task.title}</span>
                    </span>
                    </AccordionSummary>
                </Paper>
                <AccordionDetails sx={{padding: '0 0 10px 20px'}}>
                    {task.children.map(childTask => {
                        return (
                            <Task
                                key={childTask.id}
                                task={childTask}
                                findTaskHandler={findTaskHandler}
                                changeTaskStatusHandler={changeTaskStatusHandler}
                                chooseTaskHandler={chooseTaskHandler}
                            />
                        );
                    })}
                </AccordionDetails>
            </Accordion>
        </div>
    );
})
