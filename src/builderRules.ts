import rules from "../data/builder-rules.json";

export type Position = "POINT_GUARD" | "SHOOTING_GUARD" | "SMALL_FORWARD" | "POWER_FORWARD" | "CENTER";
export type Body = { position: Position; height: number; weight: number; wingspan: number };

export function getHeightOptions(position: Position) {
  return rules.positions[position].heights.map((h: any) => h.height);
}

export function getBodyLimits(position: Position, height: number) {
  const row = rules.positions[position].heights.find((h: any) => h.height === height);
  if (!row) throw new Error(`Invalid height ${height} for ${position}`);
  return row;
}

export function isLegalBody(body: Body) {
  const limits = getBodyLimits(body.position, body.height);
  return body.weight >= limits.minWeight && body.weight <= limits.maxWeight &&
         body.wingspan >= limits.minWingspan && body.wingspan <= limits.maxWingspan;
}

export function getConstraints(attribute: string, height: number) {
  return rules.attributeConstraints.filter((r: any) => r.attribute === attribute && r.height === height);
}

// Applies the extracted 2K "associated attribute" minimums recursively.
// If source attr is X and maxDelta is D, target attr must be at least X-D.
export function applyAssociatedConstraints(
  startingRatings: Record<string, number>,
  height: number,
  minRating = 25
) {
  const ratings = { ...startingRatings };
  let changed = true;
  let guard = 0;
  while (changed && guard++ < 100) {
    changed = false;
    for (const rule of rules.attributeConstraints as any[]) {
      if (rule.height !== height) continue;
      const src = ratings[rule.attribute] ?? minRating;
      const required = Math.max(minRating, src - rule.maxDelta);
      const old = ratings[rule.associatedAttribute] ?? minRating;
      if (required > old) {
        ratings[rule.associatedAttribute] = required;
        changed = true;
      }
    }
  }
  return ratings;
}


export function getHeightBasedAttributeWeight(heightIndex:number, playerType:number, attribute:string){
  const row=(rules as any).heightBasedAttributeWeights.find((r:any)=>r.heightIndex===heightIndex&&r.playerType===playerType&&r.attribute===attribute);
  return row?.weight ?? null;
}

export function getPricingTuning(){ return (rules as any).pricing; }
