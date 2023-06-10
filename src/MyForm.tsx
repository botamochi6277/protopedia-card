import { useState } from 'react'


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import UpdateIcon from '@mui/icons-material/Update';

import axios from 'axios';

function MyForm() {

    const [access_token, setAccessToken] = useState('abcd')

    const [project_id, setProjectId] = useState('efgh')

    const fetchProjectData = (token: String, prototype_id: String) => {

        const url = `https://protopedia.net/api/prototypes.json?token=${token}&prototypeId=${prototype_id}`
        axios.get(url).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    Form
                </Typography>
            </CardContent>
            <CardActions>
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
                    Fetch Data
                </Button>


            </CardActions>
        </Card>
    )
}

export default MyForm;