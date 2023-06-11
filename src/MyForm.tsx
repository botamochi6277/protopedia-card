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


type MyFormProps = {
    fetchHandle: (data: any) => void,
};

function MyForm(props: MyFormProps) {

    const [access_token, setAccessToken] = useState('');
    const [token_error, setTokenError] = useState(false);
    const [token_help, setTokenHelp] = useState('');

    const [prototype_id, setProtoTypeId] = useState('2385');
    const [prototype_id_error, setPrototypeIdError] = useState(false);
    const [prototype_id_help, setPrototypeIdHelp] = useState('');

    const fetchHandle = props.fetchHandle;

    const fetchProjectData = (token: string, prototype_id: string) => {
        // input validation
        const token_ref = token.match(/[a-f0-9]{32}/g);
        if (!token_ref) {
            setTokenError(true);
            setTokenHelp('token must be 32 letters')
            return;
        } else {
            setTokenError(false);
            setTokenHelp('');
        }

        const id_ref = Number(prototype_id);
        if (!id_ref) {
            // id have non-number value
            setPrototypeIdError(true);
            setPrototypeIdHelp('ID must be numbers')
            return;
        } else {
            setPrototypeIdError(false);
            setPrototypeIdHelp('');
        }

        const url = `https://protopedia.net/api/prototypes.json?token=${token}&prototypeId=${prototype_id}`
        axios.get(url).then((res) => {
            console.debug(res);
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
            <AccordionDetails sx={{ displayPrint: 'none' }}>
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
                        error={token_error}
                        helperText={token_help}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setAccessToken(event.target.value)
                        }}
                    />

                    <TextField
                        required
                        id="prototype-id"
                        label="prototype id"
                        value={prototype_id}
                        error={prototype_id_error}
                        helperText={prototype_id_help}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setProtoTypeId(event.target.value)
                        }}
                    />

                    <Button
                        variant="contained"
                        startIcon={<UpdateIcon />}
                        onClick={() => { fetchProjectData(access_token, prototype_id) }}>
                        Fetch
                    </Button>

                </Stack>

                <Typography>
                    You can get <Link href='https://protopedia.net/settings/application' target='_blank' >access token</Link> from ProtoPedia Page.
                </Typography>
                <Typography>
                    You can get prototype id from a prototype page's url:
                </Typography>
                <Typography sx={{ fontFamily: 'monospace' }}>
                    {"https://protopedia.net/prototype/${prototype_id}"}
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}

export default MyForm;