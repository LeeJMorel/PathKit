import { useParams, useNavigate } from "react-router-dom";
import { useEntities } from "../../hooks";
import styles from "./Sheets.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState, useEffect } from "react";

import { Button } from "../buttons";
import classNames from "classnames";
import { defaultEntity } from "../../consts";
import {
  getAbilityModifier,
  getPlayerMaxHp,
  getProficiencyModifier,
} from "../../utilities";
import { Proficiency } from "../../api/model/entity";
import DataCellDisplay from "../displays/DataCellDisplay";
import { StatsDisplay } from "../displays/StatsDisplay";
import NotesObject from "../objects/NoteObject";
import CollapsibleHeader from "../headers/CollapsibleHeader";
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

function EntitySheet() {
  const { entityId } = useParams();
  const navigate = useNavigate();
  const { getEntityById } = useEntities();
  const [entity, setEntity] = useState(defaultEntity);

  useEffect(() => {
    const matchEntity = getEntityById(Number(entityId));
    if (matchEntity) {
      setEntity(matchEntity);
    }
  }, [entityId]);
  const handleCancelClick = () => {
    navigate("/");
  };
  const handleEditClick = useCallback(() => {
    navigate(`/entity/${entityId}/edit`);
  }, [entity]);

  return (
    <div className={styles.sheetsContainer}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h2>{entity?.name}</h2>
          {entity?.build?.level && (
            <p>
              ({entity.build.level ? `level: ${entity.build.level}` : ""}
              {/*if both exist, put a comma between*/}
              {entity.build.size ? ", " : ""}
              {entity.build.size ? `size: ${entity.build.size}` : ""})
            </p>
          )}
        </div>
        <div className={styles.headerButtons}>
          <Button
            className={styles.headerButton}
            variant="text"
            onClick={handleEditClick}
            icon="pencil"
          >
            Edit
          </Button>
          <Button
            className={classNames(styles.headerButton, styles.closeButton)}
            variant="text"
            onClick={handleCancelClick}
            icon="close"
            title="Close entity"
          />
        </div>
      </div>
      <div className={styles.sheetContent}>
        {entity?.image && (
          <div className={styles.imageContainer}>
            <img src={entity.image} alt={entity.name} />
          </div>
        )}
        <div className={styles.sheetRowContainerLeftAlign}>
          {entity?.build?.proficiencies?.perception && (
            <DataCellDisplay
              name="build.proficiencies.perception"
              value={getProficiencyModifier(entity, Proficiency.perception)}
              label={`Perception`}
              labelPosition="inline"
              align="start"
            />
          )}
          {entity?.build?.keyability && (
            <DataCellDisplay
              name="build.keyability"
              value={getProficiencyModifier(entity, Proficiency.perception)}
              label={`Key Ability`}
              labelPosition="inline"
              align="start"
            />
          )}
          {entity?.type === "Player" && (
            <div className={styles.entityHp}>
              <DataCellDisplay
                name="damage"
                label={`HP`}
                value={getPlayerMaxHp(entity) - entity?.damage}
                labelPosition="inline"
                align="start"
                small
              />
              /
              <DataCellDisplay
                name="maxHp"
                value={getPlayerMaxHp(entity)}
                labelPosition="inline"
                align="start"
                small
              />
            </div>
          )}
          {/* {entity?.quantity === 1 && entity?.maxHp && (
            <div className={styles.entityHp}>
              <DataCellDisplay
                name="damage"
                value={entity?.maxHp - entity?.damage}
                labelPosition="inline"
                align="start"
                small
              />
              /
              <DataCellDisplay
                name="maxHp"
                value={entity?.maxHp}
                labelPosition="inline"
                align="start"
                small
              />
            </div>
          )} */}
        </div>
        <hr />
        <div className={styles.sheetRowContainerLeftAlign}>
          <DataCellDisplay
            name="build.abilities.str"
            value={entity.build.abilities.str}
            label={`STR [${getAbilityModifier(entity.build.abilities.str)}]`}
            labelPosition="above"
            align="center"
            small
          />
          <DataCellDisplay
            name="build.abilities.dex"
            value={entity.build.abilities.dex}
            label={`DEX [${getAbilityModifier(entity.build.abilities.dex)}]`}
            labelPosition="above"
            align="center"
            small
          />
          <DataCellDisplay
            name="build.abilities.con"
            value={entity.build.abilities.con}
            label={`CON [${getAbilityModifier(entity.build.abilities.con)}]`}
            labelPosition="above"
            align="center"
            small
          />
          <DataCellDisplay
            name="build.abilities.int"
            value={entity.build.abilities.int}
            label={`INT [${getAbilityModifier(entity.build.abilities.int)}]`}
            labelPosition="above"
            align="center"
            small
          />
          <DataCellDisplay
            name="build.abilities.wis"
            value={entity.build.abilities.wis}
            label={`WIS [${getAbilityModifier(entity.build.abilities.wis)}]`}
            labelPosition="above"
            align="center"
            small
          />
          <DataCellDisplay
            name="build.abilities.cha"
            value={entity.build.abilities.cha}
            label={`CHA [${getAbilityModifier(entity.build.abilities.cha)}]`}
            labelPosition="above"
            align="center"
            small
          />
        </div>
        <hr />
        <StatsDisplay entity={entity} labelPosition={"above"} />
        <hr />
        {/* {entity?.quantity > 1 && (
          <div className={styles.sheetRowContainerLeftAlign}>
            {entity?.maxHp && (
              <div className={styles.entityHp}>
                <DataCellDisplay
                  name="damage"
                  value={entity?.maxHp - entity?.damage}
                  labelPosition="inline"
                  align="start"
                  small
                />
                /
                <DataCellDisplay
                  name="maxHp"
                  value={entity?.maxHp}
                  labelPosition="inline"
                  align="start"
                  small
                />
              </div>
            )}
          </div>
        )} */}
        {/* {entity?.build?.equipment && (
          <CollapsibleHeader
            title="Equipment"
            toggle
            className={styles.sheetRowContainerLeftAlign}
          >
            {entity.build.equipment.map((item, index) => (
              <div className={styles.sheetRowContainerLeftAlign} key={index}>
                <DataCellDisplay
                  name={`Equipment ${index + 1}`}
                  value={item.name}
                  align="start"
                />
                <DataCellDisplay
                  name={`Equipment ${index + 1}`}
                  value={item.bulk}
                  align="start"
                />
                <DataCellDisplay
                  name={`Equipment ${index + 1}`}
                  value={item.value}
                  align="start"
                />
                <DataCellDisplay
                  name={`Equipment ${index + 1}`}
                  value={item.worn}
                  align="start"
                />
              </div>
            ))}
          </CollapsibleHeader>
        )} */}
        {/* {entity?.build?.feats && (
          <CollapsibleHeader
            title="Features"
            toggle
            className={styles.sheetRowContainerLeftAlign}
          >
            {entity.build.equipment.map((item, index) => (
              <div className={styles.sheetRowContainerLeftAlign} key={index}>
                <DataCellDisplay
                  name={`Equipment ${index + 1}`}
                  value={item.name}
                  align="start"
                />
                <DataCellDisplay
                  name={`Equipment ${index + 1}`}
                  value={item.desc}
                  align="start"
                />
              </div>
            ))}
          </CollapsibleHeader>
        )} */}
        <div className={styles.sheetRowContainerLeftAlign}>
          {entity?.build?.attributes?.speed && (
            <DataCellDisplay
              name="entity.build.attributes.speed"
              value={entity.build.attributes.speed}
              label={`Speed`}
              labelPosition="inline"
              align="start"
            />
          )}
          {entity?.build?.attributes?.fly && (
            <DataCellDisplay
              name="entity.build.attributes.fly"
              value={entity.build.attributes.fly}
              label={`Fly`}
              labelPosition="inline"
              align="start"
            />
          )}
          {entity?.build?.attributes?.burrow && (
            <DataCellDisplay
              name="entity.build.attributes.burrow"
              value={entity.build.attributes.burrow}
              label={`Burrow`}
              labelPosition="inline"
              align="start"
            />
          )}
          {entity?.build?.attributes?.climb && (
            <DataCellDisplay
              name="entity.build.attributes.climb"
              value={entity.build.attributes.climb}
              label={`Climb`}
              labelPosition="inline"
              align="start"
            />
          )}
          {entity?.build?.attributes?.swim && (
            <DataCellDisplay
              name="entity.build.attributes.swim"
              value={entity.build.attributes.swim}
              label={`Swim`}
              labelPosition="inline"
              align="start"
            />
          )}
        </div>
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
            {/* {entity.build.passiveAction.map((item, index) => (
              <div className={styles.sheetRowContainerLeftAlign} key={index}>
                <DataCellDisplay
                  name={`Equipment ${index + 1}`}
                  value={item.name}
                  align="start"
                />
                <DataCellDisplay
                  name={`Equipment ${index + 1}`}
                  value={item.effect}
                  align="start"
                />
              </div>
            ))} */}
          </KeywordDiv>
          <KeywordDiv keywords={["Reaction"]}>
            {/* {entity.build.reaction.map((item, index) => (
              <div className={styles.sheetRowContainerLeftAlign} key={index}>
                <DataCellDisplay
                  name={`Equipment ${index + 1}`}
                  value={item.name}
                  align="start"
                />
                                <DataCellDisplay
                  name={`Equipment ${index + 1}`}
                  value={item.trigger}
                  align="start"
                />
                <DataCellDisplay
                  name={`Equipment ${index + 1}`}
                  value={item.effect}
                  align="start"
                />
              </div>
            ))} */}
          </KeywordDiv>
          <KeywordDiv keywords={["Free Action"]}>
            {/* {entity.build.freeAction.map((item, index) => (
              <div className={styles.sheetRowContainerLeftAlign} key={index}>
                <DataCellDisplay
                  name={`Equipment ${index + 1}`}
                  value={item.name}
                  align="start"
                />
                                                <DataCellDisplay
                  name={`Equipment ${index + 1}`}
                  value={item.frequency}
                  align="start"
                />
                                <DataCellDisplay
                  name={`Equipment ${index + 1}`}
                  value={item.trigger}
                  align="start"
                />
                <DataCellDisplay
                  name={`Equipment ${index + 1}`}
                  value={item.effect}
                  align="start"
                />
              </div>
            ))} */}
          </KeywordDiv>
        </FilterHeader>
        <NotesObject />
      </div>
      {/* <pre>{JSON.stringify(entity, null, 2)}</pre> */}
    </div>
  );
}

export default EntitySheet;
