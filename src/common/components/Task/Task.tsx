import React, {memo, useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {TasksType} from "../../../features/tasksList/tasks-reducer.ts";
import {Button, Checkbox, IconButton, Paper} from "@mui/material";
import s from './Task.module.css'
import classNames from "classnames";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store.ts";

type TaskPropsType = {
    findTaskHandler: (id: string) => void
    changeTaskStatusHandler: (id: string) => void
    chooseTaskHandler: (id: string, e: Event) => void
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
                                          backgroundColor: task.isChosen ? 'rgb(25, 118, 210, 0.2)' : '',
                                          mt: '10px'
                                      }}
                                      expandIcon={<IconButton sx={isExpandMoreVisible}
                                                              onClick={handleExpand}><ExpandMoreIcon/></IconButton>}
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                    >
                    <span style={{display: 'flex', alignItems: 'center'}}>
                        <Checkbox onChange={() => changeTaskStatusHandler(task.id)} checked={task.isDone}/>
                        <Typography onClick={() => findTaskHandler(task.id)}>{task.title}</Typography>
                        {/*<Button onClick={() => chooseTaskHandler(task.id)}>choose</Button>*/}
                    </span>
                    </AccordionSummary>
                </Paper>
                <AccordionDetails sx={{padding: '0 0 0 20px'}}>
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
