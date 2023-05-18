import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import React from "react";
import { expect } from "vitest";
import EntityCard from '../../../src/components/cards/EntityCard';
import { EntityType } from "../../../src/api/model";

describe("EntityCard tests", () => {
  // make sure the component renders
  test("render test", () => {
    // render(<EntityCard entity={{id: 0, campaignId: 0, name: "aa", type: EntityType.Monster, initiative: 0, build: {level: 0, attributes: {}}, damage: 0, tempHp: 0, conditions: []}}></EntityCard>);

    // expect(screen.getByText("0")).toBeDefined();
    // expect(screen.getByText("1")).not.toBeDefined();
    
  });
  

});
