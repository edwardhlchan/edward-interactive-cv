import { AppShell } from "./components/AppShell";
import { profile } from "./data/profile";

export default function App() {
  return <AppShell profile={profile} />;
}
