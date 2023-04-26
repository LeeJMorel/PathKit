import DCModule from "./DCModule";
import DiceModule from "./DiceModule";
import NotesModule from "./NotesModule";
import BinderModule from "./BinderModule";

export enum Module {
  DCModule = "DCModule",
  DiceModule = "DiceModule",
  NotesModule = "NotesModule",
  BinderModule = "BinderModule",
}

export interface IModule {
  id: Module;
  label: string;
  ModuleComponent: React.ElementType;
}

// Create a mapping of module names to corresponding component references
const Modules: Record<Module, IModule> = {
  DCModule: {
    id: Module.DCModule,
    label: "DC Adjustments Table",
    ModuleComponent: DCModule,
  },
  DiceModule: {
    id: Module.DiceModule,
    label: "Dice Roller",
    ModuleComponent: DiceModule,
  },
  NotesModule: {
    id: Module.NotesModule,
    label: "Notes Module",
    ModuleComponent: NotesModule,
  },
  BinderModule: {
    id: Module.BinderModule,
    label: "Binder Module",
    ModuleComponent: BinderModule,
  },
};

export { DCModule, DiceModule, NotesModule, BinderModule, Modules };
