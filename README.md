# ASE_Abgabe

[![Build status](https://teamcity.brunner.codes/app/rest/builds/buildType:id:AseAbgabe_Build/statusIcon.svg)](https://teamcity.brunner.codes/buildConfiguration/AseAbgabe_Build)


## Getting Started

### Deployment

TODO  
something something  
`docker compose up`
`docker compose down --volumes --remove-orphans`
`postgres://root:secret@postgres:4444/postgres`

### Entwicklung

1. Enusre you have the required tools
   - [NodeJS](https://nodejs.org/en/download/package-manager), recommended version 22.12
   - [pnpm](https://pnpm.io/installation) (recommended or packagemanager of choice)
   - nest JS cli
   - docker and docker compose
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
### Frontend
#### Cypress
1. Ensure that Cypress is installed by running `pnpm install` in `ase-frontend`.
2. Run all Cypress E2E tests with `pnpm cypress run`.
- Note: Running E2E test will create a test user `newuser` inside the database
- **Important!**: When using Electron (the default browser in Cypress), you may encounter issues where Mindmap components in the panel (e.g., buttons) are covered or not fully visible. To avoid this, it is recommended to run the tests in Google Chrome by using the following command: `pnpm cypress run --browser chrome`

## User storys

### normaler Nutzer

- [x] Als Nutzer möchte ich eine neue leere Mindmap erstellen können
- [x] Als Nutzer möchte ich ein Nutzerkonto anlegen können, um mehrere Mindmaps zu verwalten
- [ ] Als Nutzer möchte ich E-Mail-Adresse und Passwort meines Kontos änderen können
- [x] Als Nutzer möchte ich neue Inhalte auf meine Mindmap hinzufügen können
- [x] Als Nutzer möchte ich meine Mindmaps exportieren können
- [x] [Bonus] Als Nutzer möchte ich meine Mindmaps mit anderen Nutzern teilen können
- [x] [Bonus] Als einladender Nutzer möchte ich mitlesende wieder entfernen können
- [x] [Bonus] Als einladender Nutzer möchte ich Lese-/Schreibrechte der anderen verwalten können
- [x] [Bonus] Als eingeladener Nutzer möchte ich in geteilten Mindmaps mitarbeiten können

### admin Nutzer

- [ ] Als admin Nutzer möchte ich Statistiken über das Nutzverhalten einsehen können
- [ ] Als admin Nutzer möchte ich Nutzerkonten sperren können

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
- [ ] [Bonus] Frontend: Multi language support
- [ ] [Bonus] Frontend: 1 week authentifiziert, danach automatisch ausloggen
- [ ] Backend: tests (K)
- [x] Backend: fix mit Share auf eigenen owner (K)
- [ ] Doku: README, Aufsetzen der Anwendung (K)
- [ ] Doku: README, Tests ausführen (K)
- [ ] Doku: User Storys schönmachen (E)
