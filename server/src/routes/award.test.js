const request = require('supertest');
const { app } = require('../index');

describe('GET /activity/', () => {
  test('should return seeded activities.', (done) => {
    request(app)
      .get('/activity')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          "id": 1,
          "user_id": 1,
          "name": "Money",
          "description": "I raised $200,000 for the USSF",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 2,
          "user_id": 1,
          "name": "Time",
          "description": "I saved 3600 man-hours for the USSF by creating a new product",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 3,
          "user_id": 1,
          "name": "Mission",
          "description": "I trained 72 guardians on mission products",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 4,
          "user_id": 2,
          "name": "Acq",
          "description": "I worked on a 2M project",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 5,
          "user_id": 2,
          "name": "Mission",
          "description": "I've supervised 327 successful missions for our unit.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 6,
          "user_id": 2,
          "name": "Training",
          "description": "I took 12 trainings that will benefit the unit",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 7,
          "user_id": 3,
          "name": "Operations",
          "description": "I was a crew commander for 1 SPAFORGEN cycle",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 8,
          "user_id": 3,
          "name": "Operations",
          "description": "I was a crew commander for 1 SPAFORGEN cycle",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 9,
          "user_id": 3,
          "name": "Operations",
          "description": "I was a crew commander for 1 SPAFORGEN cycle",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 10,
          "user_id": 4,
          "name": "Things",
          "description": "I do stuff and things like 100 times a day",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 11,
          "user_id": 4,
          "name": "Things",
          "description": "I do stuff and things like 100 times a day",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 12,
          "user_id": 4,
          "name": "Things",
          "description": "I do stuff and things like 100 times a day",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 13,
          "user_id": 5,
          "name": "Stuff",
          "description": "I do stuff and things like 600 times a day",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 14,
          "user_id": 6,
          "name": "Lethal",
          "description": "I am so lethal omg",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 15,
          "user_id": 7,
          "name": "Money",
          "description": "There's a lot of money and I intend to get all of it",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 16,
          "user_id": 8,
          "name": "Rizzler",
          "description": "My rizz has been insane lately...",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 17,
          "user_id": 8,
          "name": "Supervisor",
          "description": "Did some paperwork type things",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 18,
          "user_id": 8,
          "name": "Instruction",
          "description": "Showed 46 individuals how to do something",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 19,
          "user_id": 1,
          "name": "Fundraising",
          "description": "Organized a charity event that raised $150,000 for USSF morale programs.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 20,
          "user_id": 1,
          "name": "Efficiency",
          "description": "Developed an automated reporting tool, saving an estimated 2500 man-hours annually for the unit.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 21,
          "user_id": 1,
          "name": "Training",
          "description": "Led three training sessions on advanced satellite communication systems for a total of 45 guardians.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 22,
          "user_id": 1,
          "name": "Project Management",
          "description": "Successfully managed the deployment of a $1.2M upgrade to the ground control station.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 23,
          "user_id": 1,
          "name": "Innovation",
          "description": "Proposed and prototyped a new method for space debris tracking, showing a potential 10% increase in accuracy.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 24,
          "user_id": 2,
          "name": "Acquisition",
          "description": "Contributed to the successful negotiation of a $3.5M contract for new sensor technology.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 25,
          "user_id": 2,
          "name": "Process Improvement",
          "description": "Identified and resolved a bottleneck in the data analysis pipeline, reducing processing time by 20%.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 26,
          "user_id": 2,
          "name": "Collaboration",
          "description": "Facilitated a joint working group with Space Force and Air Force personnel to standardize data sharing protocols.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 27,
          "user_id": 2,
          "name": "Mentorship",
          "description": "Provided mentorship to four junior guardians, resulting in improved performance evaluations.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 28,
          "user_id": 3,
          "name": "Cybersecurity",
          "description": "Identified and mitigated three high-risk vulnerabilities in the unit's network infrastructure.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 29,
          "user_id": 3,
          "name": "Team Leadership",
          "description": "Led a team of five guardians in the successful completion of a complex software upgrade project.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 30,
          "user_id": 3,
          "name": "Resource Management",
          "description": "Effectively managed a budget of $500,000 for the procurement of new equipment.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 31,
          "user_id": 3,
          "name": "Strategic Planning",
          "description": "Contributed to the development of the unit's five-year strategic plan, focusing on future technology integration.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 32,
          "user_id": 4,
          "name": "Data Analysis",
          "description": "Conducted in-depth analysis of satellite telemetry data, identifying a potential anomaly in the [Fictional Subsystem].",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 33,
          "user_id": 4,
          "name": "Software Development",
          "description": "Developed a new software application to automate the processing of [Fictional Data Type], improving efficiency.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 34,
          "user_id": 4,
          "name": "Problem Solving",
          "description": "Successfully troubleshot and resolved a complex hardware malfunction in the [Fictional Equipment].",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 35,
          "user_id": 5,
          "name": "Outreach",
          "description": "Represented the USSF at a STEM event, inspiring 32 students to consider careers in space.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 36,
          "user_id": 5,
          "name": "Safety",
          "description": "Identified and implemented a new safety protocol in the Ops center, reducing the risk of accidents.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 37,
          "user_id": 5,
          "name": "Logistics",
          "description": "Managed the successful deployment of critical supplies to the [Fictional Location] under a tight deadline.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 38,
          "user_id": 5,
          "name": "Community Building",
          "description": "Organized a team-building event that improved morale and cohesion within the unit.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 39,
          "user_id": 5,
          "name": "Public Relations",
          "description": "Developed content for the unit's social media platforms, increasing public awareness of their mission.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 40,
          "user_id": 6,
          "name": "Innovation",
          "description": "Developed a proof-of-concept for using AI in Launch, showing promising results.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 41,
          "user_id": 6,
          "name": "Cost Savings",
          "description": "Identified and implemented a cost-saving measure in the pipeline, saving the USSF an estimated $300K annually.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 42,
          "user_id": 6,
          "name": "Cross-functional Teamwork",
          "description": "Effectively collaborated with members from three different squadrons to achieve a common objective.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 43,
          "user_id": 6,
          "name": "Data Visualization",
          "description": "Created interactive dashboards to better visualize key performance indicators for the unit's leadership.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 44,
          "user_id": 6,
          "name": "Continuous Improvement",
          "description": "Led a Kaizen event focused on improving the efficiency of the workflows, resulting in a 120% improvement.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 45,
          "user_id": 7,
          "name": "Training Development",
          "description": "Developed a new curriculum for an advanced training program, enhancing guardian proficiency in a key area.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 46,
          "user_id": 7,
          "name": "Equipment Maintenance",
          "description": "Led a team in the preventative maintenance of critical operational equipment, ensuring readiness.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 47,
          "user_id": 7,
          "name": "Security Protocol",
          "description": "Revised and updated the security protocols for a sensitive area, improving overall safety and compliance.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 48,
          "user_id": 7,
          "name": "Knowledge Sharing",
          "description": "Conducted several knowledge-sharing sessions on a complex technical topic for junior team members.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 49,
          "user_id": 7,
          "name": "Process Optimization",
          "description": "Analyzed an administrative process and implemented changes that reduced processing time significantly.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 50,
          "user_id": 8,
          "name": "Interagency Coordination",
          "description": "Successfully coordinated with personnel from a partner agency on a joint project related to a specific operational domain.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 51,
          "user_id": 8,
          "name": "Resource Allocation",
          "description": "Managed the allocation of resources for a key project, ensuring efficient utilization of budget and personnel.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 52,
          "user_id": 8,
          "name": "Risk Management",
          "description": "Identified and assessed potential risks associated with a major operation and developed mitigation strategies.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 53,
          "user_id": 8,
          "name": "System Integration",
          "description": "Played a key role in the seamless integration of a new system into the existing infrastructure.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        },
        {
          "id": 54,
          "user_id": 8,
          "name": "Technical Support",
          "description": "Provided expert technical support to resolve a critical issue with a software application affecting multiple users.",
          "created_at": "2025-04-14T16:38:42.007Z",
          "updated_at": "2025-04-14T16:38:42.007Z"
        }
      ])
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })
})

describe('GET /activity/users/:id', () => {
  test('should return correct activity for user id.', (done) => {
    request(app)
      .get('/activity/users/1')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          "id": 1,
          "user_id": 1,
          "name": "Money",
          "description": "I raised $200,000 for the USSF",
          "created_at": "2025-04-14T16:44:40.445Z",
          "updated_at": "2025-04-14T16:44:40.445Z"
        },
        {
          "id": 2,
          "user_id": 1,
          "name": "Time",
          "description": "I saved 3600 man-hours for the USSF by creating a new product",
          "created_at": "2025-04-14T16:44:40.445Z",
          "updated_at": "2025-04-14T16:44:40.445Z"
        },
        {
          "id": 3,
          "user_id": 1,
          "name": "Mission",
          "description": "I trained 72 guardians on mission products",
          "created_at": "2025-04-14T16:44:40.445Z",
          "updated_at": "2025-04-14T16:44:40.445Z"
        },
        {
          "id": 19,
          "user_id": 1,
          "name": "Fundraising",
          "description": "Organized a charity event that raised $150,000 for USSF morale programs.",
          "created_at": "2025-04-14T16:44:40.445Z",
          "updated_at": "2025-04-14T16:44:40.445Z"
        },
        {
          "id": 20,
          "user_id": 1,
          "name": "Efficiency",
          "description": "Developed an automated reporting tool, saving an estimated 2500 man-hours annually for the unit.",
          "created_at": "2025-04-14T16:44:40.445Z",
          "updated_at": "2025-04-14T16:44:40.445Z"
        },
        {
          "id": 21,
          "user_id": 1,
          "name": "Training",
          "description": "Led three training sessions on advanced satellite communication systems for a total of 45 guardians.",
          "created_at": "2025-04-14T16:44:40.445Z",
          "updated_at": "2025-04-14T16:44:40.445Z"
        },
        {
          "id": 22,
          "user_id": 1,
          "name": "Project Management",
          "description": "Successfully managed the deployment of a $1.2M upgrade to the ground control station.",
          "created_at": "2025-04-14T16:44:40.445Z",
          "updated_at": "2025-04-14T16:44:40.445Z"
        },
        {
          "id": 23,
          "user_id": 1,
          "name": "Innovation",
          "description": "Proposed and prototyped a new method for space debris tracking, showing a potential 10% increase in accuracy.",
          "created_at": "2025-04-14T16:44:40.445Z",
          "updated_at": "2025-04-14T16:44:40.445Z"
        }
      ])
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })
})

describe('GET /activity/:id', () => {
  test('should return correct activity for id.', (done) => {
    request(app)
      .get('/activity/1')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          "id": 1,
          "user_id": 1,
          "name": "Money",
          "description": "I raised $200,000 for the USSF",
          "created_at": "2025-04-14T16:48:00.509Z",
          "updated_at": "2025-04-14T16:48:00.509Z"
        }
      ])
      .end((err, res) => {
        if (err) throw err;
        done();
      })
  })
})