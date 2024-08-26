import logoSvg from "../../assets/logo.svg";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestModal } from '../create-trip/invite-guest-modal'
import { ConfirmTripModal } from '../create-trip/confirm-trip-modal'
import { DestinationAndStep } from "./steps/destination-and-step";
import { InviteGuestStep } from "./steps/invite-guest-step";

export function CreateTripPage() {
  const navigate = useNavigate();
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [emailsToInvite, setEmailsToInvite] = useState([
    "teste@gmail.com",
    "g@mail.com",
  ]);

  const openGuestInput = () => {
    setIsGuestInputOpen(true);
  };

  const closeGuestInput = () => {
    setIsGuestInputOpen(false);
  };

  const openGuestModal = () => {
    setIsGuestModalOpen(true);
  };

  const openConfirmTripModal = () => {
    setIsConfirmTripModalOpen(true);
  };

  const closeConfirmTripModal = () => {
    setIsConfirmTripModalOpen(false);
  };

  const closeGuestModal = () => {
    setIsGuestModalOpen(false);
  };

  const addNewEmailToInvite = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      return;
    }

    setEmailsToInvite([...emailsToInvite, email]);

    e.currentTarget.reset();
  };

  const removeEmailFromInvites = (emailToRemove: string) => {
    const newEmailList = emailsToInvite.filter(
      (invited) => invited !== emailToRemove
    );

    setEmailsToInvite(newEmailList);
  };

  const createTrip = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate("/trip/123")
  };

  return (
    <div className="h-screen flex items-center justify-center bg-pattern">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src={logoSvg} alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndStep 
            closeGuestInput={closeGuestInput}
            isGuestInputOpen={isGuestInputOpen}
            openGuestInput={openGuestInput}
          />

          {isGuestInputOpen && (
            <InviteGuestStep 
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openGuestModal={openGuestModal}
            />
          )}
        </div>

        <p className="text-zinc-500 text-sm">
          Ao planejar sua viagem pela plann.er você automaticamente concorda
          <br />
          com nossos{" "}
          <a className="text-zinc-300 underline" href="#">
            termos de uso
          </a>{" "}
          e{" "}
          <a className="text-zinc-300 underline" href="#">
            políticas de privacidade
          </a>
          .
        </p>
      </div>

      {isGuestModalOpen && (
       <InviteGuestModal  
        addNewEmailToInvite={addNewEmailToInvite}
        closeGuestModal={closeGuestModal}
        emailsToInvite={emailsToInvite}
        removeEmailFromInvites={removeEmailFromInvites}
       />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal 
        closeConfirmTripModal={closeConfirmTripModal}
        createTrip={createTrip}
        />
      )}
    </div>
  );
}
