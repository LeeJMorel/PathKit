import { FilterHeader, KeywordDiv } from "../headers/FilterHeader";
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
import { ActionNumber, PartialEntity } from "../../api/model";
import styles from "./Sheets.module.scss";
import React from "react";
import ActionCard, { ActionType } from "../cards/ActionCard";

interface IActionsFilterProps {
  entity: PartialEntity;
}
const ActionsFilter: React.FC<IActionsFilterProps> = ({ entity }) => {
  return (
    <FilterHeader
      title="Actions"
      toggle
      subtle
      keywords={[
        { icon: <PassiveAction />, keyword: "Passive Action" },
        { icon: <Reaction />, keyword: "Reaction" },
        { icon: <FreeAction />, keyword: "Free Action" },
        { icon: <OneAction />, keyword: "One Action" },
        { icon: <TwoAction />, keyword: "Two Action" },
        { icon: <ThreeAction />, keyword: "Three Action" },
        { icon: <MeleeAction />, keyword: "Melee Action" },
        { icon: <RangedAction />, keyword: "Ranged Action" },
        { icon: <SpellAction />, keyword: "Spell Action" },
      ]}
      noMatchFallback={
        <div>
          <p>No Actions found that match the selected filters.</p>
        </div>
      }
    >
      <KeywordDiv keywords={["Passive Action"]}>
        {entity.build.actions.passiveActions.map((item, index) => (
          <div key={index} className={styles.actionRow}>
            <ActionCard action={item} type={ActionType.Passive} />
          </div>
        ))}
      </KeywordDiv>
      <KeywordDiv keywords={["Reaction"]}>
        {entity.build.actions.reactions.map((item, index) => (
          <div key={index}>
            <ActionCard action={item} type={ActionType.Reaction} />
          </div>
        ))}
      </KeywordDiv>
      <KeywordDiv keywords={["Free Action"]}>
        {entity.build.actions.freeActions.map((item, index) => (
          <div key={index}>
            <ActionCard action={item} type={ActionType.Free} />
          </div>
        ))}
      </KeywordDiv>
      <KeywordDiv keywords={["One Action"]}>
        {entity.build.actions.actions.map(
          (item, index) =>
            item.actionNumber === 1 && (
              <div key={index}>
                <ActionCard
                  action={item}
                  type={ActionType.Action}
                  number={ActionNumber.One}
                />
              </div>
            )
        )}
      </KeywordDiv>
      <KeywordDiv keywords={["Two Action"]}>
        {entity.build.actions.actions.map(
          (item, index) =>
            item.actionNumber === 2 && (
              <div key={index}>
                <ActionCard
                  action={item}
                  type={ActionType.Action}
                  number={ActionNumber.Two}
                />
              </div>
            )
        )}
      </KeywordDiv>
      <KeywordDiv keywords={["Three Action"]}>
        {entity.build.actions.actions.map(
          (item, index) =>
            item.actionNumber === 3 && (
              <div key={index}>
                <ActionCard
                  action={item}
                  type={ActionType.Action}
                  number={ActionNumber.Three}
                />
              </div>
            )
        )}
      </KeywordDiv>
      <KeywordDiv keywords={["One Action, Melee Action"]}>
        {entity.build.actions.melee.map(
          (item, index) =>
            item.actionNumber === 1 && (
              <div key={index}>
                <ActionCard
                  action={item}
                  type={ActionType.Melee}
                  number={ActionNumber.One}
                />
              </div>
            )
        )}
      </KeywordDiv>
      <KeywordDiv keywords={["Two Action, Melee Action"]}>
        {entity.build.actions.melee.map(
          (item, index) =>
            item.actionNumber === 2 && (
              <div key={index}>
                <ActionCard
                  action={item}
                  type={ActionType.Melee}
                  number={ActionNumber.Two}
                />
              </div>
            )
        )}
      </KeywordDiv>
      <KeywordDiv keywords={["Three Action, Melee Action"]}>
        {entity.build.actions.melee.map(
          (item, index) =>
            item.actionNumber === 3 && (
              <div key={index}>
                <ActionCard
                  action={item}
                  type={ActionType.Melee}
                  number={ActionNumber.Three}
                />
              </div>
            )
        )}
      </KeywordDiv>
      <KeywordDiv keywords={["One Action, Ranged Action"]}>
        {entity.build.actions.ranged.map(
          (item, index) =>
            item.actionNumber === 1 && (
              <div key={index}>
                <ActionCard
                  action={item}
                  type={ActionType.Ranged}
                  number={ActionNumber.One}
                />
              </div>
            )
        )}
      </KeywordDiv>
      <KeywordDiv keywords={["Two Action, Ranged Action"]}>
        {entity.build.actions.ranged.map(
          (item, index) =>
            item.actionNumber === 2 && (
              <div key={index}>
                <ActionCard
                  action={item}
                  type={ActionType.Ranged}
                  number={ActionNumber.Two}
                />
              </div>
            )
        )}
      </KeywordDiv>
      <KeywordDiv keywords={["Three Action, Ranged Action"]}>
        {entity.build.actions.ranged.map(
          (item, index) =>
            item.actionNumber === 3 && (
              <div key={index}>
                <ActionCard
                  action={item}
                  type={ActionType.Ranged}
                  number={ActionNumber.Three}
                />
              </div>
            )
        )}
      </KeywordDiv>
    </FilterHeader>
  );
};
export default ActionsFilter;
