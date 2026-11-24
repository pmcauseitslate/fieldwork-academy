// Answer indexes refer to each lab's displayed options. Short answers accept any listed spelling.
window.WEEKLY_LABS = [
  {
    title: 'Check the change-order price',
    brief:
      'Trace the function with the sample inputs. Enter the final quoted price in dollars.',
    stimulus:
      'def quote(hours, rate, materials, markup):\n    direct = hours * rate + materials\n    return round(direct * (1 + markup / 100), 2)\n\nquote(6, 50, 80, 15)',
    kind: 'short',
    answer: [
      '437',
      '437.0',
      '437.00',
      '$437',
      '$437.00',
      '437 dollars',
      '437.00 dollars',
    ],
    hint: 'Add labor and materials before applying the 15% markup.',
    explanation:
      'Six hours at $50 cost $300. Materials bring direct costs to $380. Markup adds $57, so the quote is $437.',
  },
  {
    title: 'Reconcile the approved budget',
    brief:
      'The starting budget is $2,000. Trace the loop and enter the ending budget.',
    stimulus:
      'budget = 2000\nchanges = [("approved", 240), ("pending", 135),\n           ("approved", -80), ("declined", 95)]\nfor status, amount in changes:\n    if status == "approved":\n        budget += amount',
    kind: 'short',
    answer: [
      '2160',
      '2160.00',
      '2160.0',
      '2,160',
      '2,160.00',
      '$2160',
      '$2,160',
      '$2160.00',
      '$2,160.00',
      '2160 dollars',
    ],
    hint: 'An approved credit reduces the budget. Ignore changes whose status fails the condition.',
    explanation:
      'The loop includes the $240 addition and the $80 credit. Adding the net $160 to the original $2,000 gives $2,160.',
  },
  {
    title: 'Find the missing input checks',
    brief:
      'A crew orders full cartons. The order form accepts a string only if Python can convert it with int() and the resulting value is at least 1. Select every input the form should reject.',
    stimulus:
      'Each option shows the contents of one text field in quotes. The fifth input has a space on either side of the number.',
    kind: 'select',
    options: ['"0"', '"12"', '"4.5"', '"six"', '" 5 "'],
    answer: [0, 2, 3],
    hint: 'Check both stages. A string can convert successfully and still fail the quantity rule.',
    explanation:
      'Zero converts to an integer but is below the minimum. The decimal and the written number fail int(). Python accepts the spaces around 5.',
  },
  {
    title: 'Turn a CSV bug into a regression test',
    brief:
      'The importer counts a pending change as approved. Reorder the steps for this test-first repair. The failing test must demonstrate the original defect before you edit the importer.',
    stimulus:
      'id,status,amount\nC-1,approved,70\nC-2,pending,90\nExpected approved total: 70',
    kind: 'order',
    options: [
      'Fix the status filter in the importer.',
      'Run the new test and observe the incorrect total of 160.',
      'Run the suite again and verify the approved total is 70.',
      'Create the two-row fixture and a test that asserts a total of 70.',
    ],
    answer: [3, 1, 0, 2],
    hint: 'A regression test is most convincing when you see it fail with the old implementation.',
    explanation:
      'First specify the expected result with a small fixture. The red test reproduces the defect. Fix the filter, then run the suite to verify the repair.',
  },
  {
    title: 'Validate an RFI identifier',
    brief:
      'The importer uses Python re.fullmatch with the pattern below. Select every identifier it accepts without changing the text.',
    stimulus:
      'Pattern: RFI-[0-9]{3}\nThe register stores one prefix, a hyphen and exactly three digits.',
    kind: 'select',
    options: ['rfi-104', 'RFI-007', 'RFI-1000', 'RFI-205 revised', 'RFI-210'],
    answer: [1, 4],
    hint: 'A full match must consume the entire input and the prefix is case-sensitive.',
    explanation:
      'RFI-007 and RFI-210 both fit exactly. The other records change the prefix, add a fourth digit or include extra text.',
  },
  {
    title: 'Choose release evidence',
    brief:
      'The toolkit must import 50 unique change orders, total approved dollars, and count unresolved approvals. Select all the checks that provide evidence for those requirements.',
    stimulus:
      'Exam fixture: 38 approved rows totaling $4,900; 9 pending rows; 3 declined rows. Each of the 50 IDs is distinct. Only pending rows count as unresolved.',
    kind: 'select',
    options: [
      'Assert that the first imported ID is present.',
      'Compare the sorted list of imported IDs with the sorted list of all 50 expected IDs.',
      'Assert approved total equals $4,900.',
      'Assert unresolved count equals 12.',
      'Assert unresolved count equals 9.',
    ],
    answer: [1, 2, 4],
    hint: 'Tracing one row cannot establish that the full fixture arrived. Declined items have already been resolved.',
    explanation:
      'Comparing the full sorted lists catches missing, extra and duplicate IDs. The independent amount and status totals check the two report outputs.',
  },
  {
    title: 'Predict the SQL report',
    brief: 'Read the records and the query. Enter the single number returned.',
    stimulus:
      "project | status   | amount\nA       | open     | 140\nB       | open     | 200\nA       | closed   | 300\nA       | open     | 60\n\nSELECT SUM(amount) FROM orders\nWHERE project = 'A' AND status = 'open';",
    kind: 'short',
    answer: ['200', '200.0', '200.00', '$200', '$200.00', '200 dollars'],
    hint: 'A row must satisfy both filters to enter the sum.',
    explanation:
      'Project A has two open orders. Their amounts are 140 and 60, which sum to 200.',
  },
  {
    title: 'Keep records linked',
    brief:
      'Projects, vendors and purchase orders already have primary keys. Select the additional database constraints that directly enforce every rule in the purchasing brief.',
    stimulus:
      'Every order belongs to an existing project and vendor. Both references must be present. The same PO number may be used on different projects, but only once within a project. PO numbers are already required.',
    kind: 'select',
    options: [
      'UNIQUE(po_number) on all orders',
      'Required project_id with a foreign key to projects',
      'Required vendor_id with a foreign key to vendors',
      'UNIQUE(project_id, po_number) on orders',
      'UNIQUE(vendor_id) on all orders',
    ],
    answer: [1, 2, 3],
    hint: 'Think about the scope of the uniqueness rule separately from the existence of related records.',
    explanation:
      'Required foreign keys keep references present and valid. The compound uniqueness constraint allows two projects to each have a PO-001 while preventing repeats on one project.',
  },
  {
    title: 'Read a paginated API response',
    brief:
      'The first page of results is below. Enter the relative URL your client should request next to continue this same result set.',
    stimulus:
      'GET /orders?project=7&page=1\nHTTP 200\n{\n  "items": [{"id": 18}, {"id": 21}],\n  "next": "/orders?project=7&page=2"\n}',
    kind: 'short',
    answer: ['/orders?project=7&page=2', '/orders?page=2&project=7'],
    hint: 'The service provides the continuation URL. Preserve the project filter.',
    explanation:
      'The next property points to page 2 for project 7. Fetching the collection without that filter could mix in another project’s orders.',
  },
  {
    title: 'Process one delivery twice',
    brief:
      'A receiver may get the same delivery event more than once. Order this transaction so the database records a delivery once, even when a retry follows a lost response.',
    stimulus:
      'Event e17 adds ten cartons. One worker handles incoming events. The events table enforces a unique event_id. Database errors roll back the full transaction.',
    kind: 'order',
    options: [
      'Commit the transaction.',
      'Begin a database transaction.',
      'Send a success response after the commit.',
      'Try to insert e17 into the events table, ignoring an existing ID.',
      'Add ten cartons only if the insert created a new event row.',
    ],
    answer: [1, 3, 4, 0, 2],
    hint: 'The receipt and the inventory change must succeed together. The sender should hear success only after that state is durable.',
    explanation:
      'The unique event ID marks the first delivery. Recording that ID and the stock update in a single transaction means a replay cannot silently add a second ten cartons.',
  },
  {
    title: 'Repair a form field',
    brief:
      'Select every edit needed to satisfy the three requirements. The form uses standard browser submission with no custom JavaScript.',
    stimulus:
      'Requirements: the visible label focuses the input; the browser requires a value; submitted data uses the key subject.\n\n<label for="subject">RFI subject</label>\n<input type="text">',
    kind: 'select',
    options: [
      'Add name="subject" to the input.',
      'Add placeholder="Required" to the input.',
      'Add id="subject" to the input.',
      'Add required to the input.',
      'Put the word “subject” in the form title.',
    ],
    answer: [0, 2, 3],
    hint: 'Label association, submission and validation each use a different HTML attribute.',
    explanation:
      'The matching id connects the label, name supplies the submission key, and required enables the native missing-value check.',
  },
  {
    title: 'Honor the endpoint contract',
    brief:
      'An API has only the two routes below. Select all exchanges in which both the request and expected success response match the contract.',
    stimulus:
      'POST /rfis with JSON {"subject": <non-empty string>} → 201 and the new record\nGET /rfis/{integer_id} → 200 and one existing record\nRFI 14 exists. The next unused ID is 15.',
    kind: 'select',
    options: [
      'GET /rfis/14 → 200 with RFI 14',
      'POST /rfis with {"subject":"Door swing"} → 201 with a new record',
      'GET /rfis/15 → 200 with a new blank RFI before any POST',
      'POST /rfis/14 with {"subject":"Door swing"} → 201',
      'POST /rfis with {"title":"Door swing"} → 201',
    ],
    answer: [0, 1],
    hint: 'Match the method, route, body field and expected result, in that order.',
    explanation:
      'The first route reads the existing record. The second sends the documented creation payload. Each remaining exchange assumes behavior outside the contract.',
  },
  {
    title: 'Reconcile the dashboard',
    brief:
      'The dashboard is filtered to the Yard project. It shows the percentage of that project’s RFIs that are closed. Enter the percentage.',
    stimulus:
      'Project | RFI | Status\nYard    | 11  | closed\nDepot   | 12  | open\nYard    | 13  | open\nYard    | 14  | closed\nYard    | 15  | closed\nDepot   | 16  | closed',
    kind: 'short',
    answer: ['75', '75%', '75 %', '75.0', '75.0%', '75 percent', '75 per cent'],
    hint: 'Apply the project filter to the numerator and the denominator.',
    explanation:
      'Three of the four Yard RFIs are closed. Three divided by four gives a 75% closure rate.',
  },
  {
    title: 'Rehearse a clean installation',
    brief:
      'Your release uses a pinned dependency file and a separate initialization command. Put the smoke test in the order a new reviewer should follow.',
    stimulus:
      'Fresh laptop with Python and Git installed. The sample-data command imports application dependencies. The web process requires an initialized database. The smoke check reads a seeded record through the running app.',
    kind: 'order',
    options: [
      'Start the web application.',
      'Clone the tagged release and enter its folder.',
      'Request the sample record and compare it with the documented result.',
      'Create a fresh virtual environment and install the pinned dependencies.',
      'Run the sample-data initialization command.',
    ],
    answer: [1, 3, 4, 0, 2],
    hint: 'Each step should produce a prerequisite for the next one.',
    explanation:
      'The tag identifies the release, the dependency file recreates its environment, and the seed command gives the app a known record. A request to the running app verifies all three together.',
  },
  {
    title: 'Design a fair model comparison',
    brief:
      'You want to compare two assistants on the same 20 fictional requests. Select all design choices that make the comparison easier to reproduce and less sensitive to grader preference.',
    stimulus:
      'Both assistants receive the same task description. The goal is to compare their accuracy on these 20 cases.',
    kind: 'select',
    options: [
      'Freeze the cases and scoring rubric before collecting outputs.',
      'Give the harder requests only to the faster assistant.',
      'Hide model names and shuffle outputs before grading.',
      'Record model identifiers and generation settings with the results.',
      'Revise the rubric after seeing which assistant wins.',
    ],
    answer: [0, 2, 3],
    hint: 'Reduce differences that have nothing to do with the model. Preserve the conditions another reviewer would need to repeat the comparison.',
    explanation:
      'Fixed cases establish a shared baseline. Blind grading reduces brand bias. Recorded versions and settings make a later comparison more interpretable.',
  },
  {
    title: 'Ground a deadline in the contract',
    brief:
      'Choose every statement an assistant can support from the supplied excerpts alone. The answer will be attached to an RFI under review.',
    stimulus:
      'S1 · Draft, May 1: “Request delivery within 5 days of approval.”\nS2 · Signed addendum, May 4: “For exterior doors, allow 8 business days after shop drawing approval. This replaces the May 1 draft for exterior doors.”\nQuestion: When are exterior doors due? No approval date is supplied.',
    kind: 'select',
    options: [
      'The signed addendum sets an eight-business-day interval for exterior doors.',
      'The delivery date is May 12.',
      'A calendar due date requires the shop drawing approval date.',
      'The five-day draft still controls exterior doors.',
      'The signed addendum covers all interior doors.',
    ],
    answer: [0, 2],
    hint: 'Check the document status, the door type and the event that starts the clock.',
    explanation:
      'S2 supplies the interval and supersedes the draft for exterior doors. The approval date is missing, so an exact date would require more information.',
  },
  {
    title: 'Route a purchase request',
    brief:
      'Order this procurement workflow. A purchase may be placed only after a person approves the exact proposed order.',
    stimulus:
      'A fictional email requests 40 pipe fittings. Its attachment supplies the SKU and quote. The vendor accepts purchase orders only for a valid active quote.',
    kind: 'order',
    options: [
      'Present the validated draft to the assigned purchaser for approval.',
      'Extract the quantity, SKU and quote ID from the request into a draft.',
      'Record the returned vendor confirmation and the approval reference.',
      'Validate the draft against the active quote and catalog.',
      'Submit the approved order with its unique request ID.',
    ],
    answer: [1, 3, 0, 4, 2],
    hint: 'A reviewer needs a validated draft. The vendor’s confirmation is available only after submission.',
    explanation:
      'Extract and validate before requesting approval. Carry the same approved details and unique request ID into submission, then record the confirmation.',
  },
  {
    title: 'Measure a review flag',
    brief:
      'Calculate recall for the “needs human review” flag. Enter the percentage of all genuinely risky cases that the flag caught.',
    stimulus:
      '48 test messages\n12 genuinely need review.\n9 of those 12 were flagged.\n6 safe messages were also flagged.\nThe other 30 safe messages were left unflagged.',
    kind: 'short',
    answer: ['75', '75%', '75 %', '75.0', '75.0%', '75 percent', '75 per cent'],
    hint: 'The denominator is the total number of genuinely risky messages.',
    explanation:
      'The flag caught 9 of 12 risky cases, giving 75% recall. The three missed risky messages are the examples to inspect next.',
  },
  {
    title: 'Write testable acceptance criteria',
    brief:
      'Select every criterion that directly tests the stated user story and gives a reviewer a clear pass or fail.',
    stimulus:
      'As a project coordinator, I want an overdue-RFI list for my project so I can follow up. An RFI is overdue only if it is open and its due date is earlier than today. Today is June 10.',
    kind: 'select',
    options: [
      'The interface feels modern to all staff.',
      'A June 9 open RFI on the selected project appears.',
      'A June 9 closed RFI stays out of the list.',
      'A June 10 open RFI already appears overdue.',
      'A June 9 open RFI from another project stays out of the list.',
    ],
    answer: [1, 2, 4],
    hint: 'Derive the examples from the project filter, open status and strict date comparison.',
    explanation:
      'The three examples test inclusion, closed-item exclusion and project isolation. An item due today has not crossed the rule’s date boundary.',
  },
  {
    title: 'Build a release pipeline',
    brief:
      'The team tests a release candidate before packaging it and verifies the exact package in staging before production. Put these pipeline actions in order.',
    stimulus:
      'Each step stops the release on failure. Production must receive the same package that passed the staging smoke check.',
    kind: 'order',
    options: [
      'Publish the verified package to production.',
      'Build a versioned package from the tested commit.',
      'Check out the candidate commit and install pinned dependencies.',
      'Deploy the package to staging and smoke-test it with fictional data.',
      'Run the automated tests against the candidate commit.',
    ],
    answer: [2, 4, 1, 3, 0],
    hint: 'Follow the identity of the commit into one package and promote that package after its staging check.',
    explanation:
      'The pipeline tests the source, packages that specific commit, checks the package in staging and promotes the verified artifact.',
  },
  {
    title: 'Choose questions that surface evidence',
    brief:
      'You have ten minutes with a small contractor. Select all questions that ask about observable past behavior and can help validate a purchasing problem.',
    stimulus:
      'Hypothesis: missed supplier confirmations delay jobs often enough that someone already tries to prevent them.',
    kind: 'select',
    options: [
      'Would you love an intelligent purchasing assistant?',
      'Walk me through the last time a supplier confirmation arrived late.',
      'What did that delay change about the schedule or cost?',
      'Would you give our idea five stars?',
      'How did you track the last few confirmations, and who checked them?',
    ],
    answer: [1, 2, 4],
    hint: 'Seek a specific incident, a consequence and evidence of how the team handles it today.',
    explanation:
      'These questions reveal a recent example, its impact and the current workaround. Answers about liking the proposed product provide weaker evidence of an actual need.',
  },
  {
    title: 'Scope one useful MVP',
    brief:
      'The first pilot must let a coordinator identify unconfirmed orders before tomorrow’s delivery. Select the smallest complete set of features for that test.',
    stimulus:
      'The coordinator already has a CSV of order numbers, expected delivery dates and confirmation status. The pilot runs locally. A human will contact suppliers.',
    kind: 'select',
    options: [
      'Import the three existing columns from the CSV.',
      'Add automatic supplier payments.',
      'Filter for tomorrow’s orders with missing confirmation.',
      'Show the matching order numbers to the coordinator.',
      'Build a demand forecasting service.',
    ],
    answer: [0, 2, 3],
    hint: 'Trace one useful path from an available input to the coordinator’s next action.',
    explanation:
      'Import, filter and display form a complete trial of the risky assumption: will a timely list help the coordinator act? Payments and forecasting add scope without testing that question.',
  },
  {
    title: 'Calculate a pilot break-even price',
    brief:
      'What monthly price per active customer would exactly cover the stated monthly costs at 10 active customers? Enter the dollar amount.',
    stimulus:
      'Monthly fixed support and hosting budget: $300.\nVariable monthly service cost: $8 per active customer.\nAssume all 10 customers pay the same price, with no other costs or fees.',
    kind: 'short',
    answer: [
      '38',
      '38.0',
      '38.00',
      '$38',
      '$38.00',
      '38 dollars',
      '38 per month',
      '$38/month',
    ],
    hint: 'Distribute the fixed cost over all 10 customers, then add the cost of serving one customer.',
    explanation:
      'Each customer must cover $30 of fixed cost and $8 of variable cost. At $38 each, ten customers cover the $380 monthly total. Whether buyers will pay it requires a separate test.',
  },
  {
    title: 'Defend the pilot result',
    brief:
      'Choose every claim that the pilot evidence supports for your final demo.',
    stimulus:
      'One coordinator processed the same 12 fictional orders twice. Manual run: 18 minutes and 2 missed confirmations. Fieldwork run: 12 minutes and 0 misses. Manual was tested first. No other participants or live orders have been tested.',
    kind: 'select',
    options: [
      'This coordinator finished the second run six minutes faster.',
      'All contractors will save six minutes per batch.',
      'The Fieldwork run had zero missed confirmations in this sample.',
      'Practice on the first run could account for some improvement.',
      'These results prove that every future miss will be prevented.',
    ],
    answer: [0, 2, 3],
    hint: 'Separate what you measured from what could explain it. Keep the size and order of the trial in view.',
    explanation:
      'The time and error counts describe this trial. Repeating the same inputs in a fixed order leaves a practice effect to investigate with fresh cases and more participants.',
  },
];

(() => {
  const starter = (asset, label) => ({ filename: 'assets/' + asset, label });
  const labor = starter(
    'labor-calculator.py',
    'Python labor calculator starter',
  );
  const costs = starter(
    'cost-lines.csv',
    'Three test rows with one missing quantity',
  );
  const changes = starter('change-orders.csv', '50 fictional change orders');
  const projects = starter('projects.csv', 'Project directory');
  const vendors = starter('vendors.csv', 'Vendor directory');
  const rfis = starter('rfi-register.csv', 'Six fictional RFIs');
  const responses = starter('api-responses.json', 'Three sample API responses');
  const deliveries = starter(
    'delivery-events.json',
    'Delivery events with a retry and a missing field',
  );
  const documents = starter(
    'fieldwork-documents.txt',
    'Five fictional project documents',
  );
  const comparisons = starter(
    'comparison-cases.csv',
    '20 comparison questions with a reference key',
  );

  const examples = starter(
    'sample-responses.csv',
    'Two fictional response sets for offline grading',
  );

  window.WEEKLY_DOWNLOADS = {
    1: [labor],
    4: [costs],
    5: [rfis, changes],
    6: [changes],
    7: [changes, projects, vendors, rfis],
    8: [projects, vendors, rfis, changes],
    9: [responses],
    10: [deliveries],
    12: [rfis],
    13: [projects, rfis, changes],
    14: [projects, rfis, changes],
    15: [documents, comparisons, examples],
    16: [documents, comparisons],
    17: [documents, deliveries],
    18: [documents, comparisons, examples],
    19: [rfis],
    20: [deliveries, responses],
  };
})();
