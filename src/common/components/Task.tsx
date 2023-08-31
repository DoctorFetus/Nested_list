import React, {useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {TasksType} from "../../features/tasksList/tasks-reducer.ts";
import {IconButton} from "@mui/material";

export function Task(props: TasksType) {
    const [expanded, setExpanded] = useState(false);


    const handleExpand = () => {
        setExpanded(!expanded);
    };

    if (!props.children) return <Typography sx={{'marginLeft': '16px'}}>{props.title}</Typography>;

    return (
        <div>
            <Accordion TransitionProps={{unmountOnExit: true}} sx={{
                boxShadow: 'none',
            }} expanded={expanded}>
                <AccordionSummary
                    sx={{
                        cursor: 'default !important',
                    }}
                    expandIcon={<IconButton onClick={handleExpand}><ExpandMoreIcon/></IconButton>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{props.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {props.children.map(task => {
                        return (
                            <Task
                                title={task.title}
                                description={task.description}
                                isDone={task.isDone}
                                id={task.title}
                                children={task.children}
                            />
                        );
                    })}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

