import { Dice, isDice } from "../types/Dice";
import { isDie } from "../types/Die";
 
export interface WrathDiceCounts {
  fail: number; // 1-3
  icon: number; // 4-5
  exalt: number; // 6
}
 
function collectD6Values(
  dice: Dice,
  values: Record<string, number>,
  dpool: number[]
) {
  for (const dieOrDice of dice.dice) {
    if (isDie(dieOrDice)) {
      if (dieOrDice.type === "D6") {
        const value = values[dieOrDice.id];
        if (value !== undefined) {
          dpool.push(value);
        }
      }
    } else if (isDice(dieOrDice)) {
      collectD6Values(dieOrDice, values, dpool);
    }
  }
}
 
export function getWrathDiceValue(
  dice: Dice,
  values: Record<string, number>
): WrathDiceCounts {
  const dpool: number[] = [];
  collectD6Values(dice, values, dpool);
 
  const icons: WrathDiceCounts = { fail: 0, icon: 0, exalt: 0 };
  for (const value of dpool) {
    if (value <= 3) {
      icons.fail++;
    } else if (value <= 5) {
      icons.icon++;
    } else {
      icons.exalt++;
    }
  }
  return icons;
}
