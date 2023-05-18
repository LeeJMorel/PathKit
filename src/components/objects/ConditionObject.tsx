import React, { useEffect, useState } from "react";
import styles from "./Objects.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export enum BinderTab {
  Blinded = "Blinded",
  Broken = "Broken",
  Clumsy = "Clumsy",
  Confused = "Confused",
  Controlled = "Controlled",
  Dazzled = "Dazzled",
  Deafened = "Deafened",
  Drained = "Drained",
  Encumbered = "Encumbered",
  Enfeebled = "Enfeebled",
  Fascinated = "Fascinated",
  Fatigued = "Fatigued",
  FlatFooted = "Flat-Footed",
  Fleeing = "Fleeing",
  Frightened = "Frightened",
  Grabbed = "Grabbed",
  Immobilized = "Immobilized",
  Paralyzed = "Paralyzed",
  PersistentDamage = "Persistent Damage",
  Petrified = "Petrified",
  Prone = "Prone",
  Quickened = "Quickened",
  Restrained = "Restrained",
  Sickened = "Sickened",
  Slowed = "Slowed",
  Stunned = "Stunned",
  Stupefied = "Stupefied",
}

interface IBinderProps {
  onLoad?: (id: number) => void;
  filterEntities?: (string | number)[];
  showTabs?: BinderTab[];
  showTabMenu?: boolean;
}

const ConditionObject: React.FC<IBinderProps> = ({
  onLoad,
  showTabs = [
    BinderTab.Blinded,
    BinderTab.Broken,
    BinderTab.Clumsy,
    BinderTab.Confused,
    BinderTab.Controlled,
    BinderTab.Dazzled,
    BinderTab.Deafened,
    BinderTab.Drained,
    BinderTab.Encumbered,
    BinderTab.Enfeebled,
    BinderTab.Fascinated,
    BinderTab.Fatigued,
    BinderTab.FlatFooted,
    BinderTab.Fleeing,
    BinderTab.Frightened,
    BinderTab.Grabbed,
    BinderTab.Immobilized,
    BinderTab.Paralyzed,
    BinderTab.PersistentDamage,
    BinderTab.Petrified,
    BinderTab.Prone,
    BinderTab.Quickened,
    BinderTab.Restrained,
    BinderTab.Sickened,
    BinderTab.Slowed,
    BinderTab.Stunned,
    BinderTab.Stupefied,
  ],
  showTabMenu = true,
}: IBinderProps) => {
  const [showMenu, setShowMenu] = useState(showTabMenu);
  const [activeTab, setActiveTab] = useState(showTabs[0]);

  useEffect(() => {
    if (onLoad) {
      setActiveTab(showTabs[0]);
    }
  }, [onLoad]);

  const handleTabClick = (tabName: BinderTab) => {
    setActiveTab(tabName);
  };

  const handleToggleClick = () => {
    setShowMenu(!showMenu);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Blinded":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>You can't see. All normal terrain is difficult terrain. You can't detect anything using vision. Automatically critically fail Perception checks that require you to see; if vision is your only precise sense, you take a –4 status penalty to Perception checks. You are immune to visual effects. Blinded overrides dazzled.</td>
              </tr>
            </div>
          </div>
          );

      case "Broken":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>A broken object can't be used, nor does it grant bonuses. Broken armor grants its item bonus to AC, but gives a status penalty to AC (–1 light, –2 medium,–3 heavy). An effect that makes an item broken reduces the item's HP to its Broken Threshold.</td>
              </tr>
            </div>
          </div>
        );

      case "Clumsy":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>Take a status penalty equal to your clumsy value on Dexterity-based checks and DCs, including AC, Reflex saves, ranged attacks, and skill checks using Acrobatics, Stealth, and Thievery.</td>
              </tr>
            </div>
          </div>
        );

      case "Confused":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>You are flat-footed, don't treat anyone as your ally, and can't Delay, Ready, or use reactions. Use all your actions to Strike or cast offensive cantrips. The GM determines targets randomly. If you have no other option, target yourself, automatically hitting. If it's impossible for you to attack or cast spells, you babble incoherently, wasting your actions. Each time you take damage from an attack or spell, attempt a DC 11 flat check to end the condition.</td>
              </tr>
            </div>
          </div>
        );

      case "Controlled":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>Your controller dictates how you act.</td>
              </tr>
            </div>
          </div>
        );

      case "Dazzled":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>All creatures and objects are concealed from you.</td>
              </tr>
            </div>
          </div>
        );

      case "Deafened":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>Automatically critically fail Perception checks that require hearing. Take a –2 status penalty to Perception checks for initiative and checks that involve sound but also rely on other senses. If you perform an action that has the auditory trait, you must succeed at a DC 5 flat check or the action is lost. You are immune to auditory effects.</td>
              </tr>
            </div>
          </div>
        );

      case "Drained":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>Take a status penalty equal to your drained value on Constitution-based checks, such as Fortitude saves. Lose Hit Points equal to your level times the drained value, and your maximum Hit Points are reduced by the same amount. When you regain Hit Points by resting for 8 hours, your drained value is reduced by 1, but you don't immediately recover the lost Hit Points. </td>
              </tr>
            </div>
          </div>
        );

      case "Encumbered":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>You're clumsy 1 and take a –10-foot penalty to all your Speeds.</td>
              </tr>
            </div>
          </div>
        );

      case "Enfeebled":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>Take a status penalty equal to your enfeebled value to Strength-based rolls and DCs, including Strength-based melee attack rolls, Strength-based damage rolls, and Athletics checks.</td>
              </tr>
            </div>
          </div>
        );

      case "Fascinated":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>Take a –2 status penalty to Perception and skill checks, and you can't use actions with the concentrate trait unless they are related to the subject of your fascination. This condition ends if a creature takes hostile actions toward you or any of your allies.</td>
              </tr>
            </div>
          </div>
        );

      case "Fatigued":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>Take a –1 status penalty to AC and saving throws. During exploration, you can't choose an exploration activity. Recover from fatigue after a full night's rest.</td>
              </tr>
            </div>
          </div>
        );

      case "Flat-Footed":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>Take a –2 circumstance penalty to AC.</td>
              </tr>
            </div>
          </div>
        );

      case "Fleeing":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>On your turn, spend each action trying to escape the source of the condition as expediently as possible. You can't Delay or Ready.</td>
              </tr>
            </div>
          </div>
        );

      case "Frightened":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>Take a status penalty equal to the value to all checks and DCs. At the end of each of your turns, the value decreases by 1.</td>
              </tr>
            </div>
          </div>
        );

      case "Grabbed":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>You're immobilized and flat-footed. If you attempt a manipulate action, you must succeed at a DC 5 flat check or it is lost.</td>
              </tr>
            </div>
          </div>
        );

      case "Immobilized":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>You can't take any action with the move trait. If you're immobilized by something holding you in place and an external force would move you, the force must succeed at a check against the DC of the effect holding you in place you or the relevant defense (usually Fortitude DC) of the creature holding you in place.</td>
              </tr>
            </div>
          </div>
        );

      case "Paralyzed":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>You're flat-footed and can't take actions except Recall Knowledge and others that require only your mind. You can't Seek.</td>
              </tr>
            </div>
          </div>
        );

      case "Persistent Damage":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>Instead of taking persistent damage immediately, take it at the end of each of your turns, rolling any damage dice each time. After you take persistent damage, roll a DC 15 flat check to see if you recover. If you succeed, the condition ends. You or an ally can help you recover, allowing an additional flat check. This usually takes 2 actions, and must be something that would reasonably help against the source of the damage. The GM can reduce the DC to 10, have the damage end automatically, or change the number of actions.</td>
              </tr>
            </div>
          </div>
        );

      case "Petrified":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>You can't act, nor can you sense anything. You're an object with double your normal Bulk (typically 12 if Medium or 6 if Small), AC 9, Hardness 8, and the same current HP you had when alive.</td>
              </tr>
            </div>
          </div>
        );

      case "Prone":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>You're flat-footed with a –2 circumstance penalty to attack rolls. The only move actions you can take are Crawl and Stand. Standing ends the prone condition. You can Take Cover while prone, gaining greater cover against ranged attacks (but remain flat-footed).</td>
              </tr>
            </div>
          </div>
        );

      case "Quickened":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>You gain 1 additional action at the start of your turn each round. Many effects that make you quickened specify the types of additional actions you can use. Because quickened has its effect at the start of your turn, you don't gain actions immediately if you become quickened during your turn.</td>
              </tr>
            </div>
          </div>
        );

      case "Restrained":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>You're tied up and can barely move, or a creature has you pinned. You are immobilized and flat-footed, and you can't use any actions with the attack or manipulate traits except to attempt to Escape or Force Open your bonds. Restrained overrides grabbed.</td>
              </tr>
            </div>
          </div>
        );

      case "Sickened":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>Take a status penalty equal to the value on all checks and DCs. You can't willingly ingest anything. You can spend an action retching to attempt a Fortitude save against the DC of the sickening effect. On a success, reduce the value by 1 (2 on a critical success).</td>
              </tr>
            </div>
          </div>
        );

      case "Slowed":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>When you regain your actions at the start of your turn, reduce the number of actions by your slowed value. You don't lose actions immediately if slowed during your turn.</td>
              </tr>
            </div>
          </div>
        );

      case "Stunned":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>You can't act. A stunned value indicates how many total actions you lose. Each time you regain actions, reduce the number by your stunned value, then reduce your stunned value by the number of actions lost. If stunned has a duration, lose all your actions for the listed duration. Stunned overrides slowed. Actions lost to stunned count toward those lost to slowed.</td>
              </tr>
            </div>
          </div>
        );

      case "Stupefied":
        return (
          <div className={styles.moduleContainer}>
            <div className={styles.moduleContent}>
              <tr>
                <td>Take a status penalty equal to the value to checks and DCs based on Intelligence, Wisdom, or Charisma, including Will saves, spell attack rolls and DCs, and appropriate skill checks. If you Cast a Spell, it's disrupted unless you succeed at a flat check (DC = 5 + value).</td>
              </tr>
            </div>
          </div>
        );

      default:
        break;
    }
  };

  const renderTab = (tab: BinderTab): JSX.Element | undefined =>
    showTabs.includes(tab) ? (
      <div
        key={tab}
        className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
        title={tab}
        onClick={() => handleTabClick(tab)}
      >
        {tab}
      </div>
    ) : undefined;

  return (
    <div className={styles.binderObject}>
      {showMenu && (
        <div className={styles.tabContainer}>
          {showTabs.map((tab) => renderTab(tab))}
        </div>
      )}
      <div
        className={styles.menuToggle}
        title={"Toggle Binder Menu Visible"}
        onClick={handleToggleClick}
      >
        <FontAwesomeIcon
          icon={showMenu ? "angle-double-left" : "angle-double-right"}
        />
      </div>
      <div className={styles.content}>
        <table className={styles.pathsTable}>
          <tbody>{renderTabContent()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ConditionObject;
