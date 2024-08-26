import {
  Plus,
} from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guest } from "./guest";
import { Activities } from "./activities";
import { DestinationAndHeader } from "./destination-and-header";

export const TripDetailsPage = () => {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  const openCreateActivityModalOpen = () => {
    setIsCreateActivityModalOpen(true);
  };

  const closeCreateActivityModalOpen = () => {
    setIsCreateActivityModalOpen(false);
  };

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      
      <DestinationAndHeader />
      
      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between ">
            <h2 className="text-3xl font-semibold">Atividades</h2>

            <button
              onClick={openCreateActivityModalOpen}
              className="flex items-center gap-2 bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium hover:bg-lime-400"
            >
              <Plus className="size-5" />
              Cadatrar atividade
            </button>
          </div>

          <Activities />
        </div>

        <div className="w-80 space-y-6">
       
          <ImportantLinks />

          <div className="w-full h-px bg-zinc-800" />
          
          <Guest />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeCreateActivityModalOpen={closeCreateActivityModalOpen}
        />
      )}
    </div>
  );
};
