import {
  OneAction,
  TwoAction,
  ThreeAction,
  Reaction,
  PassiveAction,
  FreeAction,
  MeleeAction,
  RangedAction,
  SpellAction,
} from "../../assets/iconKey";
import {
  ActionNumber,
  IPassiveAction,
  IReaction,
  IFreeAction,
  IMelee,
  IRanged,
  IAction,
} from "../../api/model";
import styles from "./Card.module.scss";
import classNames from "classnames";

export enum ActionType {
  Free = "free",
  Reaction = "reaction",
  Melee = "melee",
  Ranged = "ranged",
  Passive = "passive",
  Action = "action",
}

interface IActionCardProps {
  action: IFreeAction | IReaction | IMelee | IRanged | IPassiveAction | IAction;
  number?: ActionNumber;
  type: ActionType;
}

const ActionCard = ({
  action,
  number,
  type,
}: IActionCardProps): JSX.Element => {
  const renderActionDetails = () => {
    if (type === ActionType.Free) {
      const freeAction = action as IFreeAction;
      return (
        <>
          <h4>Trigger</h4>
          <p>{freeAction.trigger}</p>
          <h4>Frequency</h4>
          <p>{freeAction.frequency}</p>
          <h4>Effect</h4>
          <p>{freeAction.effect}</p>
        </>
      );
    }

    if (type === ActionType.Reaction) {
      const reaction = action as IReaction;
      return (
        <>
          <h4>Trigger</h4>
          <p>{reaction.trigger}</p>
          <h4>Effect</h4>
          <p>{reaction.effect}</p>
        </>
      );
    }

    if (type === ActionType.Action) {
      const actions = action as IAction;
      return (
        <>
          <h4>DC</h4>
          <p>{actions.attackDc}</p>
          <h4>Effect</h4>
          <p>{actions.effect}</p>
          <p>({actions.traits.join(", ")})</p>
        </>
      );
    }

    if (type === ActionType.Melee) {
      const meleeAction = action as IMelee;
      return (
        <>
          <h4>DC</h4>
          <p>{meleeAction.attackDc}</p>
          <p>{meleeAction.damageType}</p>
          <p>{meleeAction.damageValue}</p>
          <p>{meleeAction.extra}</p>
          <p>({meleeAction.traits.join(", ")})</p>
        </>
      );
    }

    if (type === ActionType.Ranged) {
      const rangedAction = action as IRanged;
      return (
        <>
          <h4>DC</h4>
          <p>{rangedAction.attackDc}</p>
          <h4>Range</h4>
          <p>{rangedAction.range}</p>
          <h4>Damage</h4>
          <p>{rangedAction.damageType}</p>
          <p>{rangedAction.damageValue}</p>
          <p>{rangedAction.extra}</p>
          <p>({rangedAction.traits.join(", ")})</p>
        </>
      );
    }

    if (type === ActionType.Passive) {
      const passiveAction = action as IPassiveAction;
      return (
        <>
          <h4>Effect</h4>
          <p>{passiveAction.effect}</p>
        </>
      );
    }

    return null;
  };

  return (
    <div className={classNames(styles.card, styles.small)}>
      <h4>{action.name}</h4>
      {/* Render the appropriate action component based on the action type */}
      {type === ActionType.Free && <FreeAction />}
      {type === ActionType.Reaction && <Reaction />}
      {type === ActionType.Melee && <MeleeAction />}
      {type === ActionType.Ranged && <RangedAction />}
      {type === ActionType.Passive && <PassiveAction />}
      {number === ActionNumber.One && <OneAction />}
      {number === ActionNumber.Two && <TwoAction />}
      {number === ActionNumber.Three && <ThreeAction />}
      {/* Render other action details */}
      {renderActionDetails()}
    </div>
  );
};

export default ActionCard;
