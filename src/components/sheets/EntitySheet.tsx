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
import ActionsFilter from "./EntitySheet.ActionsFilter";

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
          <h2 className={styles.heading}>{entity?.name}</h2>
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
        <table className={styles.sheetTable}>
          <tbody>
            <tr>
              {entity?.build?.traits &&
                entity.build.traits.map((trait, index) => (
                  <td key={index}>
                    <DataCellDisplay
                      name={`Trait ${index + 1}`}
                      value={trait}
                      labelPosition="inline"
                      align="start"
                    />
                  </td>
                ))}
            </tr>
          </tbody>
        </table>
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
                value={getPlayerMaxHp(entity) - entity?.damage[0]}
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
          {entity?.quantity === 1 && entity?.maxHp && (
            <div className={styles.entityHp}>
              <DataCellDisplay
                name="damage"
                value={entity?.maxHp - entity?.damage[0]}
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
        <div className={styles.sheetRowContainerLeftAlign}>
          {entity?.build?.languages && (
            <DataCellDisplay
              name="entity.build.languages"
              value={entity?.build?.languages.join(", ")}
              label={`Languages`}
              labelPosition="inline"
              align="start"
            />
          )}
          {entity?.conditions && entity.conditions.length > 0 ? (
            <DataCellDisplay
              name="conditions"
              value={entity.conditions}
              label="Conditions Applied"
              labelPosition="inline"
              align="start"
            />
          ) : (
            <DataCellDisplay
              name="conditions"
              value="N/A"
              label="Conditions Applied"
              labelPosition="inline"
              align="start"
            />
          )}
        </div>
        {entity?.build?.desc && (
          <CollapsibleHeader
            title="Description"
            toggle
            as="h4"
            nested
            defaultCollapsed
          >
            <p>{entity.build.desc}</p>
          </CollapsibleHeader>
        )}
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
        {entity?.quantity > 1 && entity?.maxHp && (
          <div className={styles.sheetRowContainerLeftAlign}>
            {entity.damage.map((damage, index) => (
              <div key={index} className={styles.entityHp}>
                {entity.maxHp && (
                  <>
                    <DataCellDisplay
                      name="damage"
                      value={entity.maxHp - damage}
                      labelPosition="inline"
                      align="start"
                      small
                    />
                    /
                  </>
                )}
                <DataCellDisplay
                  name="maxHp"
                  value={entity?.maxHp ?? ""}
                  labelPosition="inline"
                  align="start"
                  small
                />
              </div>
            ))}
          </div>
        )}
        {entity?.build?.equipment && (
          <CollapsibleHeader
            title="Equipment"
            toggle
            as="h4"
            nested
            defaultCollapsed
          >
            <table className={styles.sheetTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Bulk</th>
                  <th>Value</th>
                  <th>Worn</th>
                </tr>
              </thead>
              <tbody>
                {entity.build.equipment.map((item, index) => (
                  <tr key={index}>
                    <td>{item[0]}</td>
                    <td>{item[1]}</td>
                    <td>{item[2]}</td>
                    <td>{item[3]}</td>
                    <td>{item[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CollapsibleHeader>
        )}
        {entity?.build?.feats && (
          <CollapsibleHeader
            title="Features"
            toggle
            as="h4"
            nested
            defaultCollapsed
          >
            <table className={styles.sheetTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Secondary</th>
                  <th>Feat Type</th>
                  <th>Level</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {entity.build.feats.map((feat, index) => {
                  const [name, secondary, featType, level, desc] = feat;

                  return (
                    <tr key={index}>
                      <td>{name}</td>
                      <td>{secondary}</td>
                      <td>{featType}</td>
                      <td>{level}</td>
                      <td>{desc}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CollapsibleHeader>
        )}
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
        <div className={styles.sheetRowContainerLeftAlign}>
          {entity?.build?.resistances &&
            entity.build.resistances.length > 0 && (
              <DataCellDisplay
                name="entity.build.resistances"
                value={entity.build.resistances.join(", ")}
                label="Resistances"
                labelPosition="inline"
                align="start"
              />
            )}

          {entity?.build?.immunities && entity.build.immunities.length > 0 && (
            <DataCellDisplay
              name="entity.build.immunities"
              value={entity.build.immunities.join(", ")}
              label="Immunities"
              labelPosition="inline"
              align="start"
            />
          )}
        </div>
        <ActionsFilter entity={entity} />
        <NotesObject />
      </div>
      {/* <pre>{JSON.stringify(entity, null, 2)}</pre> */}
    </div>
  );
}

export default EntitySheet;
