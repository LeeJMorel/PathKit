import DCModule from "./DCModule";
import IncomeModule from "./IncomeModule";
import DiceModule from "./DiceModule";
import NotesModule from "./NotesModule";
import BinderModule from "./BinderModule";
import TipModule from "./TipModule";
import ConditionModule from "./ConditionModule";

export enum Module {
  TipModule = "TipModule",
  DCModule = "DCModule",
  IncomeModule = "IncomeModule",
  // DiceModule = "DiceModule",
  NotesModule = "NotesModule",
  BinderModule = "BinderModule",
  ConditionModule = "ConditionModule",
}

export interface IModule {
  id: Module;
  label: string;
  ModuleComponent: React.ElementType;
  collapsible: boolean;
}

// Create a mapping of module names to corresponding component references
const Modules: Record<Module, IModule> = {
  TipModule: {
    id: Module.TipModule,
    label: "Show Tutorial Tips",
    ModuleComponent: TipModule,
    collapsible: false,
  },
  // DiceModule: {
  //   id: Module.DiceModule,
  //   label: "Dice Roller",
  //   ModuleComponent: DiceModule,
  //   collapsible: false,
  // },
  NotesModule: {
    id: Module.NotesModule,
    label: "Notes",
    ModuleComponent: NotesModule,
    collapsible: true,
  },
  BinderModule: {
    id: Module.BinderModule,
    label: "Binder",
    ModuleComponent: BinderModule,
    collapsible: true,
  },
  ConditionModule: {
    id: Module.ConditionModule,
    label: "Conditions",
    ModuleComponent: ConditionModule,
    collapsible: true,
  },
  DCModule: {
    id: Module.DCModule,
    label: "DC Adjustments Table",
    ModuleComponent: DCModule,
    collapsible: true,
  },
  IncomeModule: {
    id: Module.IncomeModule,
    label: "Income Earned Table",
    ModuleComponent: IncomeModule,
    collapsible: true,
  },
};

export {
  TipModule,
  DCModule,
  ConditionModule,
  IncomeModule,
  // DiceModule,
  NotesModule,
  BinderModule,
  Modules,
};
