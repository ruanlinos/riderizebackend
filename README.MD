<div style="text-align:center"><img src="https://i.ibb.co/R0jZYvv/RIDERIZE.png" /></div>

### <div align="center">A App that allow users to add, list and remove pictures.</div>

#### ⚡️ TECHNOLOGIES

---

This project was developed for the Riderize Backend Challenge with the following technologies:

- [React Native](https://github.com/facebook/react-native)
- [Typescript](https://www.typescriptlang.org/)
- [GraphQL](https://graphql.org/)
- [Postgres](https://github.com/postgres/postgres)
- [Docker](https://www.docker.com/)
- [Sequelize](https://github.com/sequelize/sequelize)
- [Sequelize-cli](https://github.com/sequelize/cli)
- [Koa](https://github.com/koajs/koa)

For code formatter and padronization:

- [Eslint](https://github.com/eslint/eslint)
- [Prettier](https://github.com/prettier/prettier)

#### 💻 DEVELOPING

---

To run this applications, you need Git, Yarn, `Docker >= 17.12.0+` and `docker-compose`

```bash
    # To see a version of docker
    $ docker -v
    Docker version 19.03.8, build afacb8b7f0
    # To see a version of docker-compose
    $ docker-compose -v
    docker-compose version 1.25.4, build 8d51620a
```

Next step you must clone this repository:

```bash
    $ git clone https://github.com/ruanlinos/riderizebackend.git
```

Inside the foder project, just run:

```bash
    # First, we need to ensure that the database is up to date:
    $ docker-compose up migration

    # And now we can seed the database:
    $ docker-compose up seed

    # So, we can start the server:
    $ docker-compose up api

    # Otherwise, you can run the api server detached:
    $ docker-compose up -d api
```

Well done! all your changes will be automatically read by the docker.
