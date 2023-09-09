import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {TasksType} from "../../../../features/TasksList/model/tasks-reducer.ts";
import {Checkbox, IconButton, Paper} from "@mui/material";
import s from './Task.module.css'
import {useTask} from "../model/useTask.ts";

type TaskPropsType = {
    task: TasksType
}

export const Task = ({ task }: TaskPropsType) => {

    const {
        findTaskHandler, changeTaskStatusHandler, chooseTaskHandler,
        expanded, handleExpand, isExpandMoreVisible
    } = useTask(task)


    const accordionStyle = {
        boxShadow: 'none',
        mt: '0'
    }

    const accordionSummaryStyle = {
        cursor: 'default !important',
        backgroundColor: task.isChosen ? 'rgba(128, 128, 128, 0.3)' : '',
        mt: '10px'
    }

    const accordionDetails = {
        padding: '0 0 10px 20px'
    }


    return (
        <div>
            <Accordion TransitionProps={{unmountOnExit: true}} sx={accordionStyle} expanded={expanded}>
                <Paper elevation={2}>
                    <AccordionSummary onClick={(event) => chooseTaskHandler(task.id, event)}
                                      sx={accordionSummaryStyle}
                                      expandIcon={
                                          <IconButton
                                              sx={isExpandMoreVisible}
                                              onClick={handleExpand}><ExpandMoreIcon/>
                                          </IconButton>}
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                    >
                    <span className={s.taskInfoWrapper}>
                        <Checkbox onChange={() => changeTaskStatusHandler(task.id)} checked={task.isDone}/>
                        <span className={s.taskTitle} onClick={() => findTaskHandler(task.id)}>{task.title}</span>
                    </span>
                    </AccordionSummary>
                </Paper>
                <AccordionDetails sx={accordionDetails}>
                    {task.children.map(childTask => {
                        return (
                            <Task
                                key={childTask.id}
                                task={childTask}
                            />
                        );
                    })}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
