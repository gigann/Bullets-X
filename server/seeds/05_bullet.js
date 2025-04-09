/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("bullet").del();
  await knex("bullet").insert([
    {
      user_id: 1,
      name: "Space",
      action: "Resolved anomaly on [Fictional Satellite System]",
      impact: "Restored mission-essential capabilities 12 hours early",
      result: "Prevented potential data loss impacting 5 strategic missions",
      status: "Drafting",
      award_id: 1,
    },
    {
      user_id: 2,
      name: "Life",
      action: "Executed debris maneuver for [Fictional Spacecraft]",
      impact: "Ensured zero impact probability",
      result: "Safeguarded $[Fictional Dollar Amount] in vital space assets",
      status: "Supervisor Review",
      award_id: 3,
    },
    {
      user_id: 3,
      name: "Ground",
      action: "Mitigated cyber vulnerability in [Fictional Ground System]",
      impact: "Restored mission-essential capabilities 12 hours early",
      result:
        "Prevented potential unauthorized access to sensitive intelligence",
      status: "Complete",
      award_id: 2,
    },
    {
      user_id: 4,
      name: "Ops",
      action: "Aided [Fictional New Technology] deployment",
      impact: "Achieved all performance metrics",
      result: "Accelerated fielding of enhanced space capabilities",
      status: "Complete",
      award_id: 1,
    },
    {
      user_id: 5,
      name: "Things",
      action:
        "Performed [Fictional Space Operations Duty Title] during [Fictional Exercise]",
      impact: "Demonstrated exceptional awareness",
      result: "Flawlessly executed mission objectives",
      status: "Supervisor Review",
      award_id: 2,
    },
    {
      user_id: 6,
      name: "Random",
      action: "Developed [Fictional Space Domain Task] training",
      impact: "Increased team proficiency by 20%",
      result: "Reduced mission execution timelines",
      status: "Drafting",
      award_id: 1,
    },
    {
      user_id: 7,
      name: "Tina",
      action: "Led [Fictional Team Leader Role] of [Number] Guardians",
      impact: "Fostered cohesive, high-performing unit",
      result: "Consistently achieved mission objectives under pressure",
      status: "Drafting",
      award_id: 1,
    },
    {
      user_id: 8,
      name: "Fox",
      action: "Volunteered for [Fictional Additional Duty/Project]",
      impact: "Contributed significantly",
      result:
        "Improved [Positive Outcome for the Unit/Organization] beyond primary duties",
      status: "Submitted",
      award_id: 2,
    },
  ]);
};
