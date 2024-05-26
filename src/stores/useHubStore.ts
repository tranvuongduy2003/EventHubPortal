import { HubConnection } from "@microsoft/signalr";
import { create } from "zustand";

type State = {
  connection?: HubConnection;
};

type Action = {
  setConnection: (connection: HubConnection) => void;
};

export const useHubStore = create<State & Action>((set) => ({
  connection: undefined,
  setConnection: (connection) => set(() => ({ connection: connection })),
}));
