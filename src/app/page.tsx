import { DragDropContext } from "./components/DragDropContext";

export default function Page() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Planning Screen</h1>
      <DragDropContext />
    </main>
  );
}
