import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function Task() {


    return (
        <div>
            <Accordion TransitionProps={{ unmountOnExit: true }} sx={{ boxShadow: 'none' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Accordion 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Accordion TransitionProps={{ unmountOnExit: true }} sx={{ boxShadow: 'none' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1b-content"
                            id="panel1b-header"
                        >
                            <Typography>Accordion 1.1</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Accordion TransitionProps={{ unmountOnExit: true }}  sx={{ boxShadow: 'none' }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography>Accordion 1.1.1</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </AccordionDetails>
                    </Accordion>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
