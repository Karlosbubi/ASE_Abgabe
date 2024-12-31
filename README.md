# ASE_Abgabe

![Build status](<https://teamcity.brunner.codes/guestAuth/app/rest/builds/buildType:(id:AseAbgabe_Build)/statusIcon>)

## Getting Started

### Deployment

TODO  
something something  
`docker compose up`

### Entwicklung

1. Enusre you have the required tools
   - [NodeJS](https://nodejs.org/en/download/package-manager), recommended version 22.12, minimum version 18.18
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

## User storys

### normaler Nutzer

- Als Nutzer möchte ich eine neue leere Mindmap erstellen können
- Als Nutzer möchte ich ein Nutzerkonto anlegen können, um mehrere Mindmaps zu verwalten
- Als Nutzer möchte ich E-Mail-Adresse und Passwort meines Kontos änderen können
- Als Nutzer möchte ich neue Inhalte auf meine Mindmap hinzufügen können
- Als Nutzer möchte ich meine Mindmaps exportieren können
- [Bonus] Als Nutzer möchte ich meine Mindmaps mit anderen Nutzern teilen können
  - [Bonus] Als einladender Nutzer möchte ich mitlesende wieder entfernen können
  - [Bonus] Als eingeladener Nutzer möchte ich in geteilten Mindmaps mitarbeiten können
  - [Bonus] Als einladender Nutzer möchte ich Lese-/Schreibrechte der anderen verwalten können

### admin Nutzer

- Als admin Nutzer möchte ich Statistiken über das Nutzverhalten einsehen können
- Als admin Nutzer möchte ich Nutzerkonten sperren können
