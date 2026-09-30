# glowing-spork

An employee management app for mobile devices. Lists employees and features search bar, department filters, sort options by name, and activity indicators. Allows creating, editing, and deleting employees.

## Setup & Run Instructions

1. Install Expo Go on your mobile device
2. Open a Command Prompt in the EmployeeManagementApp folder (it specifically must be Command Prompt, not PowerShell; the filepath within your command prompt should end with `\EmployeeManagementApp`)
3. Type in `npm install` and press Enter (then wait until it's done installing)
4. Type in `npx expo start` and press Enter
5. Scan the generated QR code with your mobile device, this will open the app with Expo Go

## Project Explanation
This app uses the `blank-typescript` Expo template via `npx create-expo-app@latest --template --no-agents-md`.

Each Employee has data for their Avatar (optional), First Name, Last Name, Job Title, Department, Email, Phone Number, Join Date, and Current Status (Active/Inactive)

### Component Structure
- `src/screens/`: the three main views: `EmployeeList`, `EmployeeDetails`, `EditEmployee`.
- `src/components/`: reusable UI pieces used across screens.
- `src/navigation/`: `AppNavigator.tsx`, which sets up the stack navigator and registers all screens.
- `src/types/`: shared TypeScript interface (`Employee`) and navigation param types (`RootStackParamList`).
- `src/services/`: API calls (`apiData`) and data validation (`validation`).

### State Management
States are managed on each screen via the React hooks `useState` and `useEffect`/`useFocusEffect`. `useFocusEffect` is only used on the `EmployeeList` and `EmployeeDetails` pages so that they automatically refresh when navigated back to (i.e. after adding/editing/deleting an employee via `EditEmployee`).

### Data/API Handling
Employee data comes from mockAPI.io, which supports all REST operations. Aside from employees manually created or edited via the app, all data is randomly generated via Faker.js (this is done automatically by mockAPI, not within this app). All API fetches and operations are in `src/services/apiData.ts`.

### Assumptions
- Nobody has vandalized my mockAPI data.
- The user does not mind using a standard keyboard instead of a numpad to input phone numbers. (I would have constrained the phone format to exclusively 1234567890 but mockAPI does not seem to allow such constraints, so this decision is to avoid a disparity that would otherwise be caused by a technical limitation of the API used).