# ASE_Abgabe

[![Build status](https://teamcity.brunner.codes/app/rest/builds/buildType:id:AseAbgabe_Build/statusIcon.svg)](https://teamcity.brunner.codes/buildConfiguration/AseAbgabe_Build)


## Getting Started

### Deployment

"If you wish to [run this App] from scratch, you must first invent the universe." -Carl Sagan  
We're a bit short of inventing the universe, so we'll assume you have a working computer and an internet connection as prerequisites.

1. Install the Docker engine following the [Official Instructions](https://docs.docker.com/engine/install/)
2. Ensure Docker works including `docker compose`
3. Download this Code
   - Preferably using [git](https://git-scm.com/downloads). `git clone git@github.com:Karlosbubi/ASE_Abgabe.git`
   - Otherwise fall back to downloading and extracting the Zip archive.
4. Open the Project directory (This one, where this file is) in a Terminal. ([cd](https://www.howtoforge.com/linux-cd-command) is also available in standard cmd and poweshell)
5. Start everything, by excecuting the following command : `docker compose up`
   - For obvious reasons there is no workflow for anyone to register as an Admin, so to promote a user you need to connect to the database. In the configureation as provided the connection string is `postgres://root:secret@postgres:4444/postgres`. Use any DB Client of choice, PostgreSQL is widely supported, e.g. [DataGrip](https://www.jetbrains.com/datagrip/) or [DBeaver](https://github.com/dbeaver/dbeaver)
6. To stop the App.
   - Check if your terminal is still linked to the process.
   - If so, press `Strg+c`/`Ctrl-c`
   - If not run `docker compose stop` (still in Project directory)
7. After beeing stopped, the stack can be resarted in its old state with `docker compose start`
8. Finally To Clean Everything up run : `docker compose down --volumes --remove-orphans`
>[!Warning]
>The cleanup deletes the Database, therefore all user Data

### Development

1. Enusre you have the required tools
   - [NodeJS](https://nodejs.org/en/download/package-manager), version 22.12
   - [pnpm](https://pnpm.io/installation) (packagemanager of choice)
   - [nest JS](https://nestjs.com/)
   - [docker and docker compose](https://docs.docker.com/engine/install/)
2. Get the repo `git clone git@github.com:Karlosbubi/ASE_Abgabe.git`
3. Install dependencies with `pnpm install` for both frontend and backend
4. Get started
   - Spin up development Database `docker compose -f docker-compose_dev_db.yaml up`
   - Run the backend with `pnpm start:dev`
   - Spin up the frontend with `pnpm dev`
5. When done shut everything down
   - Node stops with `Ctrl+C`
   - Database `docker compose -f docker-compose_dev_db.yaml down`

## Tests
### Backend
1. Navigate to `ase-backend`
2. Ensure everthing is installed and up to date.
3. start the dev_db, requreied for the e2e tests
4. run
   - `pnpm test` for unit test
   - `pnpm test:e2e` for nest e2e test
### Frontend
#### Cypress
1. Ensure that Cypress is installed by running `pnpm install` in `ase-frontend`.
2. Start the database and the backend.
3. Run all Cypress E2E tests with `pnpm cypress run`.
- Note: Running E2E test will create a test user `newuser` inside the database
- **Important!**: When using Electron (the default browser in Cypress), you may encounter issues where Mindmap components in the panel (e.g., buttons) are covered or not fully visible. To avoid this, it is recommended to run the tests in Google Chrome by using the following command: `pnpm cypress run --browser chrome`
- `pnpm test:chrome` and `pnpm test:firefox` are available and run cypress with the respecitve browser.

## User storys

### normaler Nutzer

- [x] Als Nutzer möchte ich eine neue leere Mindmap erstellen können
- [x] Als Nutzer möchte ich ein Nutzerkonto anlegen können, um mehrere Mindmaps zu verwalten
- [x] Als Nutzer möchte ich E-Mail-Adresse und Passwort meines Kontos änderen können
- [x] Als Nutzer möchte ich neue Inhalte auf meine Mindmap hinzufügen können
- [x] Als Nutzer möchte ich meine Mindmaps exportieren können
- [x] [Bonus] Als Nutzer möchte ich meine Mindmaps mit anderen Nutzern teilen können
- [x] [Bonus] Als einladender Nutzer möchte ich mitlesende wieder entfernen können
- [x] [Bonus] Als einladender Nutzer möchte ich Lese-/Schreibrechte der anderen verwalten können
- [x] [Bonus] Als eingeladener Nutzer möchte ich in geteilten Mindmaps mitarbeiten können

### admin Nutzer

- [ ] Als admin Nutzer möchte ich Statistiken über das Nutzverhalten einsehen können
- [x] Als admin Nutzer möchte ich Nutzerkonten sperren können

## Todos

- [x] add user password hashing
- [x] add Auth Guard
- [x] Mindmap Nodes SQL Schema fixen
- [x] add Mindmap Controller
- [x] Frontend mal anfangen
- [x] Docker Daten persintenz gegen checken
- [x] add Auth Roles (Will der Habeck unbedingt)
- [x] Frontend: Export fixen (E/K)
- [ ] Frontend: Admin Dashboard (D)
- [x] Frontend: User Profile (E)
- [ ] Frontend: tests (D/E)
- [ ] Backend: tests (K)
- [x] Backend: fix no Share auf eigenen owner (K)
- [x] Doku: README, Aufsetzen der Anwendung (K)
- [x] Doku: README, Tests ausführen (K)
- [ ] Doku: User Storys schönmachen (E)
