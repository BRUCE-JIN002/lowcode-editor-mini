import { create, StateCreator } from "zustand";
import { Component } from "./components";
import { persist } from "zustand/middleware";
import { example } from "./exampleFile";

type File = {
  name: string;
  file: Component[];
};

interface State {
  selectedFileKey?: string;
  files: File[];
}

interface Action {
  addFile: (name: string, file: Component[]) => void;
  updateFile: (name: string, file: Component[]) => void;
  deleteFile: (name: string) => void;
  getFile: (name?: string) => File | undefined;
  setFileKey: (key?: string) => void;
  isExistFile: (name: string) => boolean;
}

const exampleFile: File = { name: "示例页面", file: example };

const creator: StateCreator<State & Action> = (set, get) => ({
  files: [exampleFile],
  addFile: (name, file) => {
    set((state) => {
      const newFiles = [...state.files, { name, file }];
      return { files: newFiles };
    });
  },
  deleteFile: (name) => {
    set((state) => {
      const newFiles = [...state.files].filter((file) => file.name !== name);
      return { files: newFiles };
    });
  },
  updateFile: (name, file) => {
    set((state) => {
      const targetFile = state.files.find((file) => file.name === name);
      if (targetFile) {
        targetFile.file = file;
      }
      return { files: [...state.files] };
    });
  },
  getFile: (name) => {
    if (!name) {
      return get().files[0];
    }
    return get().files.find((file) => file.name === name);
  },
  setFileKey: (keyName) => {
    set((state) => {
      return { ...state.files, selectedFileKey: keyName };
    });
  },
  isExistFile: (name) => {
    return get().files.findIndex((file) => file.name === name) > -1;
  }
});

export const useFileStore = create<State & Action>()(
  persist(creator, {
    name: "schamas",
    partialize: (state) =>
      Object.fromEntries(
        Object.entries(state).filter(([key]) => ["files"].includes(key))
      ),
    version: 1
  })
);
