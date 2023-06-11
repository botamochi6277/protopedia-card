import { useState } from 'react'

import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import UpdateIcon from '@mui/icons-material/Update';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import axios from 'axios';

function MyForm(props) {

    const [access_token, setAccessToken] = useState('abcd')

    const [project_id, setProjectId] = useState('2385')

    const fetchHandle = props.fetchHandle;

    const fetchProjectData = (token: String, prototype_id: String) => {

        const url = `https://protopedia.net/api/prototypes.json?token=${token}&prototypeId=${prototype_id}`
        axios.get(url).then((res) => {
            console.log(res);
            fetchHandle(res.data[0]);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <Accordion defaultExpanded={true}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                    backgroundColor: 'primary.main',
                    color: "white",
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        mr: 2,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}>ProtoPedia Card</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="h6" component="div" gutterBottom>
                    Access Data Form
                </Typography>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    alignItems="center"
                >
                    <TextField
                        required
                        id="access-token"
                        label="access token"
                        value={access_token}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setAccessToken(event.target.value)
                        }}
                    />

                    <TextField
                        required
                        id="project-id"
                        label="project id"
                        value={project_id}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setProjectId(event.target.value)
                        }}
                    />

                    <Button
                        variant="contained"
                        startIcon={<UpdateIcon />}
                        onClick={() => { fetchProjectData(access_token, project_id) }}>
                        Fetch
                    </Button>

                </Stack>

                <Typography>
                    You can get <Link href='https://protopedia.net/settings/application' target='_blank' >access token</Link> from ProtoPedia Page.
                </Typography>
                <Typography>
                    You can get project id from a prototype page's url:
                </Typography>
                <Typography sx={{ fontFamily: 'monospace' }}>
                    {"https://protopedia.net/prototype/${project_id}"}
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}

export default MyForm;