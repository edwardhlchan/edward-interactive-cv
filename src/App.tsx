import { profile } from "./data/profile";

export default function App() {
  return (
    <main aria-label="Interactive CV" id="main-content">
      {profile.identity.name}
    </main>
  );
}
