const {request} = require('pactum');
const { config } = require("dotenv");
config();

const setup = () => {
    request.setBaseUrl(process.env.BASE_URL);
    request.setDefaultHeaders({
        Authorization: `Bearer ${process.env.API_TOKEN}`,
    });
    request.setDefaultTimeout(30_000);
}

setup();