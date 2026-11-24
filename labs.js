// Option indexes are zero-based. Short answers accept the listed equivalent forms.
(() => {
  function reference(title, steps, artifact, check) {
    return { title, steps, artifact, check };
  }

  window.WEEKLY_LABS = [
    {
      title: 'Estimate a support queue’s workload',
      brief:
        'Trace the function. Enter the number of staff-hours required for the batch.',
      stimulus:
        'def workload_hours(tickets, minutes_each):\n    return tickets * minutes_each / 60\n\nworkload_hours(36, 15)',
      kind: 'short',
      answer: ['9', '9.0', '9.00', '9 hours', '9 staff-hours', '9h', '9 h'],
      hint: 'Calculate total minutes first. Sixty minutes make one staff-hour.',
      explanation:
        'Thirty-six tickets at 15 minutes each require 540 minutes. Dividing by 60 gives nine staff-hours.',
      reference: reference(
        'Estimate a batch of onboarding calls',
        [
          'Identify the inputs and their units. Twelve calls take 20 minutes each.',
          'Multiply the number of calls by minutes per call, then convert total minutes to hours.',
          'Compare the answer with a simpler case. At 20 minutes per call, three calls fit in an hour.',
        ],
        'total_minutes = 12 * 20\nhours = total_minutes / 60\n# 240 minutes → 4 hours',
        'Four hours × three calls per hour accounts for all 12 calls.',
      ),
    },
    {
      title: 'Reconcile a usage budget',
      brief:
        'Trace the loop and enter the remaining trial budget in dollars. A posted negative amount is a refund.',
      stimulus:
        'remaining = 500\ncharges = [("posted", 80), ("pending", 55),\n           ("posted", -15), ("posted", 45)]\nfor state, amount in charges:\n    if state == "posted":\n        remaining -= amount',
      kind: 'short',
      answer: ['390', '390.0', '390.00', '$390', '$390.00', '390 dollars'],
      hint: 'Write down the remaining balance after each posted row. Subtracting a negative charge increases the balance.',
      explanation:
        'The running balance is 420 after the first charge, 435 after the refund, and 390 after the final charge. The pending row does not enter the balance.',
      reference: reference(
        'Trace a prepaid messaging account',
        [
          'Start the ledger at 120 credits and mark which changes are final.',
          'Subtract 30 for the sent batch. Leave the scheduled batch out until it is sent.',
          'Subtract the posted adjustment of −5 and reconcile the net change.',
        ],
        'Opening    120\nSent 30     90\nScheduled 8 90\nSent −5     95',
        'The net posted use was 25 credits. An opening balance of 120 minus 25 gives 95.',
      ),
    },
    {
      title: 'Validate ticket intake',
      brief:
        'A form accepts a ticket only when its subject contains text after trimming and priority is one of three allowed values. Select every row it should reject.',
      stimulus:
        'Allowed priorities: low, normal, high (case-sensitive).\nFields appear as (subject, priority) before validation.',
      kind: 'select',
      options: [
        '("   ", "high")',
        '("Export failed", "normal")',
        '("Report late", "urgent")',
        '("Login", "High")',
        '(" Sync ", "low")',
      ],
      answer: [0, 2, 3],
      hint: 'Test the subject and the priority separately for each row. Spaces around a real subject are allowed.',
      explanation:
        'The first subject becomes empty after trimming. The third and fourth priorities are outside the allowed set. The subject in the final row still contains text.',
      reference: reference(
        'Apply two rules to a feedback form',
        [
          'The message must contain non-space text. The feedback category must be bug or idea.',
          'Test each field independently, then accept the row only if both checks pass.',
          'Use a near-boundary example to show that trimming preserves meaningful text.',
        ],
        '("   ", "bug") → reject: empty message\n(" Looks slow ", "idea") → accept\n("New report", "other") → reject: unknown category',
        'The second example still contains “Looks slow” after trimming.',
      ),
    },
    {
      title: 'Turn an import bug into a regression test',
      brief:
        'The importer treats a zero-minute row as missing. Arrange the test-first repair so the new test first demonstrates the original defect.',
      stimulus:
        'id,minutes\nA,0\nB,4\nExpected: keep both IDs. A measured zero is valid.',
      kind: 'order',
      options: [
        'Change the importer to distinguish an empty field from zero.',
        'Run the new test and observe that only B is returned.',
        'Rerun the suite and confirm both IDs survive.',
        'Create the two-row fixture and assert that A and B are returned.',
      ],
      answer: [3, 1, 0, 2],
      hint: 'Write down the expected behavior, capture the failure, then change the implementation and verify the repair.',
      explanation:
        'A failing test for a known zero proves that the bug can be reproduced. The unchanged test then checks the repair and guards later edits.',
      reference: reference(
        'Repair a CSV header counted as data',
        [
          'Create a tiny file with a header and one real booking. Assert that the importer returns one booking.',
          'Run the test on the original code. It returns two rows, proving the defect.',
          'Use a header-aware reader and rerun the same test.',
        ],
        'Input: booking_id / B-4\nExpected row count: 1\nBefore fix: 2 → fail\nAfter fix: 1 → pass',
        'Keep the original fixture and expected count after the repair so a future regression is visible.',
      ),
    },
    {
      title: 'Recognize a valid external ticket ID',
      brief:
        'The import contract compares the complete identifier with the pattern below. Select every value that passes exactly as written.',
      stimulus:
        'Python: re.fullmatch(r"TKT-[0-9]{3}", external_id)\nThe prefix and hyphen are literal. [0-9]{3} means exactly three digits.',
      kind: 'select',
      options: [
        'tkt-104',
        'TKT-007',
        'TKT-1000',
        'TKT-205 archived',
        'TKT-210',
      ],
      answer: [1, 4],
      hint: 'Check the case, number of digits, and whether any extra text remains.',
      explanation:
        'TKT-007 and TKT-210 each have the required prefix and exactly three digits. A full match rejects a matching substring inside a longer value.',
      reference: reference(
        'Check an evaluation-case identifier',
        [
          'Read the pattern CASE-[0-9]{2} as a fixed prefix followed by two digits.',
          'Test a leading-zero case and a trailing-text case.',
          'Decide whether an invalid identifier belongs in a reject file before linking it to a score.',
        ],
        'CASE-04 → accept\nCASE-5 → reject (one digit)\nCASE-12-copy → reject (suffix)',
        'CASE-00 satisfies the shape. Whether that ID exists is a separate record lookup.',
      ),
    },
    {
      title: 'Choose evidence for a toolkit release',
      brief:
        'The support toolkit imports a known queue fixture. Select all checks needed to demonstrate complete import, open-ticket count, and total open handling minutes.',
      stimulus:
        'Release fixture: 50 unique external IDs. Exactly 12 tickets are open; their handling minutes sum to 180. Pending tickets are counted separately.',
      kind: 'select',
      options: [
        'Check that the first ID exists.',
        'Compare the sorted imported IDs with the sorted list of all 50 expected IDs.',
        'Assert that the sum of open handling minutes is 180.',
        'Count pending tickets as open if both need attention.',
        'Assert that the open-ticket count is 12.',
      ],
      answer: [1, 2, 4],
      hint: 'Use one check for identity coverage and independent checks for both report values.',
      explanation:
        'Full-list comparison catches lost, added, and repeated records. The count and total independently check whether filtering and aggregation implement the report contract.',
      reference: reference(
        'Release a survey import',
        [
          'Set a hand-checked baseline from three survey rows, retaining their IDs.',
          'Compare the complete sorted ID list, the eligible-row count, and the eligible-score total.',
          'Include an ineligible high score so an omitted filter would break the test.',
        ],
        'Rows: U1, active, 2 | U2, paused, 9 | U3, active, 3\nExpected IDs: [U1, U2, U3]\nActive count: 2\nActive score total: 5',
        'A program returning 14 for the score total imported the rows but ignored eligibility.',
      ),
    },
    {
      title: 'Predict a SQL queue report',
      brief:
        'Trace the query on the four supplied rows. Enter the single number it returns.',
      stimulus:
        "queue    | status | minutes\nbilling  | open   | 18\naccess   | open   | 40\nbilling  | closed | 32\nbilling  | open   | 12\n\nSELECT SUM(minutes) FROM tickets\nWHERE queue = 'billing' AND status = 'open';",
      kind: 'short',
      answer: ['30', '30.0', '30.00', '30 minutes', '30 min'],
      hint: 'A row must match both predicates before its minutes contribute to SUM.',
      explanation:
        'Only the first and fourth rows satisfy both filters. Their minutes sum to 30.',
      reference: reference(
        'Aggregate completed onboarding sessions',
        [
          'Read each WHERE condition before adding values.',
          'Keep only completed sessions in the trial cohort and add their durations.',
          'Check that the result changes if a previously excluded session becomes eligible.',
        ],
        'trial, done, 7   → include\npaid, done, 9    → exclude\ntrial, booked, 6 → exclude\ntrial, done, 4   → include\nSUM(duration) = 11',
        'Changing the six-minute session from booked to done increases the sum to 17.',
      ),
    },
    {
      title: 'Protect relationships between accounts and tickets',
      brief:
        'Select all database constraints that directly enforce the ticket rules below. Ticket numbers are required and foreign-key enforcement is enabled.',
      stimulus:
        'Every ticket belongs to an existing account and an existing queue. Both references are required. Ticket numbers can repeat across accounts but must be unique within an account.',
      kind: 'select',
      options: [
        'UNIQUE(ticket_number) across the whole table',
        'Required account_id referencing accounts.id',
        'Required queue_id referencing queues.id',
        'UNIQUE(account_id, ticket_number)',
        'UNIQUE(queue_id) across all tickets',
      ],
      answer: [1, 2, 3],
      hint: 'A foreign key covers existence, a required field covers presence, and a compound unique constraint defines a scope.',
      explanation:
        'Required foreign keys stop missing or orphaned links. The compound key allows different accounts to reuse a number and rejects duplicates inside the same account.',
      reference: reference(
        'Store meeting rooms across office sites',
        [
          'Each room needs a site. Make site_id required and link it to a real site ID.',
          'Use both the site ID and the room label for the uniqueness rule.',
          'Verify one allowed repeat and one rejected repeat.',
        ],
        'PRAGMA foreign_keys = ON;\nCREATE TABLE sites (id INTEGER PRIMARY KEY);\nCREATE TABLE rooms (\n  site_id INTEGER NOT NULL REFERENCES sites(id),\n  room_label TEXT NOT NULL,\n  UNIQUE(site_id, room_label)\n);\n-- Two different sites may each have one room named Blue.',
        'A uniqueness rule on room_label alone would reject the valid West room.',
      ),
    },
    {
      title: 'Continue a paginated API read',
      brief:
        'Read the response. Enter the exact relative continuation URL for the same account; query parameter order may differ.',
      stimulus:
        'GET /tickets?account=7&page=1\nHTTP 200\n{"items":[{"id":18},{"id":21}],"next":"/tickets?account=7&page=2"}',
      kind: 'short',
      answer: ['/tickets?account=7&page=2', '/tickets?page=2&account=7'],
      hint: 'Read the continuation field and carry its existing filter into the next request.',
      explanation:
        'The service supplies page 2 for account 7. Omitting the account filter changes the result set.',
      reference: reference(
        'Follow an opaque cursor for a document list',
        [
          'Read the first response and write down its next field.',
          'Request that URL exactly. An opaque cursor can contain letters and need not resemble a page number.',
          'Stop when next becomes null, even if the last page is full.',
        ],
        'GET /docs?team=blue → {"items":[4,8],"next":"/docs?team=blue&cursor=k9"}\nGET /docs?team=blue&cursor=k9 → {"items":[11],"next":null}\nCollected IDs: [4,8,11]',
        'Each page is read once and every request stays scoped to the blue team.',
      ),
    },
    {
      title: 'Charge a usage event once',
      brief:
        'An account can receive the same usage event twice after a lost response. Order the receiver’s steps so each unique event adds minutes once.',
      stimulus:
        'Event e17 adds ten minutes. A unique event_id is enforced. A database error rolls back the entire transaction. A successful response tells the sender the update is durable.',
      kind: 'order',
      options: [
        'Commit the transaction.',
        'Begin a database transaction.',
        'Send the success response.',
        'Insert e17 into the receipts table, ignoring an existing ID.',
        'Add ten minutes only when the receipt insert created a row.',
      ],
      answer: [1, 3, 4, 0, 2],
      hint: 'Store the receipt and the account change atomically. Reply after commit.',
      explanation:
        'A replay finds the receipt and skips the usage increment. Atomic commit prevents a crash between receipt creation and the account update from leaving a partial change.',
      reference: reference(
        'Apply a retried seat-credit event',
        [
          'Process grant-4 for two seats in one transaction that records both its ID and the new balance.',
          'Simulate losing the outgoing response after commit. Let the sender replay grant-4.',
          'Read the existing receipt; return success without applying another grant.',
        ],
        'Opening seats: 3\ngrant-4 first delivery: receipt added, seats 5\ngrant-4 replay: receipt exists, seats 5',
        'One receipt and a final balance of five demonstrate retry-safe behavior.',
      ),
    },
    {
      title: 'Repair the intake form field',
      brief:
        'Select every edit required for the visible label to focus the input, for the browser to require a value, and for the submitted field to use the key subject.',
      stimulus:
        'The form uses native browser submission.\n<label for="subject">Ticket subject</label>\n<input type="text">',
      kind: 'select',
      options: [
        'Add name="subject" to the input.',
        'Add placeholder="Required" to the input.',
        'Add id="subject" to the input.',
        'Add required to the input.',
        'Rename the page title “Subject”.',
      ],
      answer: [0, 2, 3],
      hint: 'Three separate attributes cover label association, the submitted key, and empty input.',
      explanation:
        'The matching id connects the label, name supplies the form-data key, and required enables the browser’s empty-field check.',
      reference: reference(
        'Label an email field for a pilot signup',
        [
          'Choose a unique id and point the label’s for attribute at it.',
          'Choose a submission key and make the field required.',
          'Click the label, submit an empty form, then submit a valid fictional address.',
        ],
        '<label for="pilot-email">Work email</label>\n<input id="pilot-email" name="contact" type="email" required>\n\nSubmitted key: contact',
        'The label focuses the field; an empty submission is blocked; a filled form sends the contact key.',
      ),
    },
    {
      title: 'Check the ticket service contract',
      brief:
        'Select every valid exchange. Each option is an independent request against the initial state.',
      stimulus:
        'POST /tickets with JSON {"subject": <nonempty string>} → 201 plus the new ticket\nGET /tickets/{integer_id} → 200 plus one existing ticket\nTicket 14 exists. Ticket 15 has not been created.',
      kind: 'select',
      options: [
        'GET /tickets/14 → 200 with ticket 14',
        'POST /tickets with {"subject":"Export delayed"} → 201 with a new ticket',
        'GET /tickets/15 → 200 with a new blank record',
        'POST /tickets/14 with {"subject":"Export delayed"} → 201',
        'POST /tickets with {"title":"Export delayed"} → 201',
      ],
      answer: [0, 1],
      hint: 'Check the method, path, field name, and expected status against the contract.',
      explanation:
        'The first option reads an existing ticket. The second uses the documented creation shape. The remaining options invent a route, field, or record.',
      reference: reference(
        'Test a feedback endpoint by contract',
        [
          'Write a request using the documented method and required field.',
          'Capture the ID from the 201 response and read that ID through the documented detail route.',
          'Repeat with the field omitted and compare the observed validation response with the documented 422.',
        ],
        'POST /feedback {"message":"Setup was clear"} → 201 {"id":9}\nGET /feedback/9 → 200 {"id":9,"message":"Setup was clear"}\nPOST /feedback {} → 422',
        'A successful HTTP response is only a partial check; verify the returned ID and stored message too.',
      ),
    },
    {
      title: 'Reconcile a dashboard percentage',
      brief:
        'The dashboard shows closure rate for account Orbit. Enter the percentage of that account’s tickets that are closed.',
      stimulus:
        'Account | Ticket | Status\nOrbit   | 11     | closed\nNova    | 12     | open\nOrbit   | 13     | open\nOrbit   | 14     | closed\nOrbit   | 15     | closed\nNova    | 16     | closed',
      kind: 'short',
      answer: [
        '75',
        '75%',
        '75 %',
        '75.0',
        '75.0%',
        '75 percent',
        '75 per cent',
      ],
      hint: 'Apply the account filter to the numerator and to the denominator.',
      explanation:
        'Orbit has three closed tickets among four total tickets. Three divided by four gives 75%.',
      reference: reference(
        'Check activation for a single signup cohort',
        [
          'Select the five accounts from Monday’s cohort.',
          'Count the two in that cohort that reached activation.',
          'Divide by all five Monday accounts, including inactive ones.',
        ],
        'Monday activated: 2\nMonday total: 5\nTuesday activated: 4 (outside filter)\nMonday activation = 2 / 5 × 100 = 40%',
        'If the five Monday rows disappear, display an empty state; a percentage with denominator zero is undefined.',
      ),
    },
    {
      title: 'Rehearse a clean installation',
      brief:
        'Order the release smoke test for a new teammate starting from a clean environment.',
      stimulus:
        'Python and Git are already installed. The seed command imports pinned dependencies, the app needs a seeded database, and the smoke check reads one seeded record through the running app.',
      kind: 'order',
      options: [
        'Start the web application.',
        'Clone the tagged release and enter its folder.',
        'Request the sample record and compare it with the expected value.',
        'Create a fresh virtual environment and install pinned dependencies.',
        'Run the sample-data initialization command.',
      ],
      answer: [1, 3, 4, 0, 2],
      hint: 'Identify the prerequisite for each operation before moving it into place.',
      explanation:
        'The release tag fixes the source version. Dependencies, a known record, and a running process are then available in time for the end-to-end smoke check.',
      reference: reference(
        'Rehearse an analytics notebook handoff',
        [
          'Open the exact tagged notebook in a new environment and install its locked packages.',
          'Download the named example dataset and record its row count.',
          'Run the notebook from a fresh kernel and compare its output with a hand-computed summary.',
        ],
        'v0.2 notebook + locked packages\nInput: 3 rows with scores 3, 5, 7\nExpected mean: 5\nObserved after Run All: 5',
        'A reviewer can reproduce the result without variables left over from an earlier notebook session.',
      ),
    },
    {
      title: 'Design a fair model comparison',
      brief:
        'Select every method that makes a comparison on 20 fictional support requests reproducible and less sensitive to grader preference.',
      stimulus:
        'Two candidate assistants receive the same task. The target outcome is accuracy on the same 20 requests under documented conditions.',
      kind: 'select',
      options: [
        'Freeze the cases and rubric before collecting outputs.',
        'Assign harder requests only to the faster assistant.',
        'Hide model names and shuffle output order before grading.',
        'Record model versions and generation settings.',
        'Change the rubric after learning which model wins.',
      ],
      answer: [0, 2, 3],
      hint: 'Control differences unrelated to the model and record the conditions for a rerun.',
      explanation:
        'Fixed test cases, blind grading, and recorded versions support a fair comparison. Small sample results still need analysis by failure type before a rollout.',
      reference: reference(
        'Compare two summarization prompts',
        [
          'Freeze four meeting excerpts and define a pass as naming the actual owner and deadline for every action.',
          'Run both prompts on all excerpts, store versions, and let a reviewer score shuffled anonymous responses.',
          'Compare paired case results, then inspect the case on which the prompts disagree.',
        ],
        'Case       A  B\nmeeting-1  1  1\nmeeting-2  0  1\nmeeting-3  1  1\nmeeting-4  1  1\nScores: A 3/4; B 4/4',
        'The observed difference is one case. Inspect its wording and add fresh held-out excerpts before generalizing.',
      ),
    },
    {
      title: 'Ground an answer in the current policy',
      brief:
        'Select every statement supported by the excerpts alone. The question concerns standard-tier support after the policy change.',
      stimulus:
        'S1 · Archived: “Standard requests are answered within two calendar days.”\nS2 · Effective June 1: “First response for standard-tier requests is within three business days after submission. This replaces S1.”\nQuestion: A standard request was submitted after June 1. When is its first response due? No submission date or holiday calendar is supplied.',
      kind: 'select',
      options: [
        'S2 sets an interval of three business days after submission.',
        'The response is due on June 4.',
        'An exact due date requires the submission date and the applicable business calendar.',
        'The two-calendar-day rule still controls.',
        'S2 promises final resolution within three business days.',
      ],
      answer: [0, 2],
      hint: 'Check document status, the start event, and whether the text refers to first response or resolution.',
      explanation:
        'S2 supports the first-response interval. A precise date needs more information, and neither excerpt promises a resolution deadline.',
      reference: reference(
        'Distinguish a retrieval miss from an unsupported answer',
        [
          'A current manual says trial exports expire after 14 days. An archived FAQ says seven days.',
          'Inspect the retrieved chunks. If only the old FAQ appears, record a retrieval failure and retrieve the current manual.',
          'If the current chunk was present but the answer said seven days, record a generation or grounding failure.',
        ],
        'Retrieved: EXP-2, current, “Trial exports expire 14 days after creation.”\nSupported answer: “14 days after creation [EXP-2].”\nMissing input for an exact expiry: creation timestamp.',
        'Open EXP-2 and verify that its text supports both the duration and the event that starts the clock.',
      ),
    },
    {
      title: 'Route a tool-assisted support draft',
      brief:
        'Order the steps for sending a customer-facing response. A human reviewer must approve the exact recipient and text before the send tool runs.',
      stimulus:
        'A support ticket requests onboarding instructions. The draft cites an approved help article. A tool can send a response; it accepts a unique request ID and returns a receipt.',
      kind: 'order',
      options: [
        'Present the validated text and recipient to the assigned reviewer.',
        'Draft a response with the ticket ID, recipient and source citation.',
        'Store the receipt alongside the approval and request ID.',
        'Validate the recipient against the ticket and check the citation against the article.',
        'Send the approved payload using its unique request ID.',
      ],
      answer: [1, 3, 0, 4, 2],
      hint: 'The reviewer needs a checked draft. The receipt becomes available only after the send call.',
      explanation:
        'Separating drafting, validation, approval, execution, and receipt recording makes the action reviewable and gives retries a stable identity.',
      reference: reference(
        'Approve a calendar invitation prepared by an assistant',
        [
          'The model proposes structured fields for the meeting instead of sending an invitation.',
          'Look up the intended participant and time zone, then show the complete invite to the organizer.',
          'After approval, submit exactly that version once and record the calendar event ID.',
        ],
        'Draft: {guest:"tester@example.invalid", start:"14:00 UTC", length:20}\nApproval: meeting-draft-8 v2\nTool receipt: calendar-event-61',
        'Changing the guest after approval creates a new draft version that requires another review.',
      ),
    },
    {
      title: 'Measure an escalation classifier',
      brief:
        'Calculate recall for the “needs human review” flag. Enter the percentage of genuinely risky cases that were caught.',
      stimulus:
        '48 test messages\n12 genuinely need review.\n9 of those 12 were flagged.\n6 safe messages were also flagged.\nThe remaining 30 safe messages were left unflagged.',
      kind: 'short',
      answer: [
        '75',
        '75%',
        '75 %',
        '75.0',
        '75.0%',
        '75 percent',
        '75 per cent',
      ],
      hint: 'For recall, the denominator is the number of actual positives, including missed cases.',
      explanation:
        'Nine of the twelve risky messages were flagged. That is 75% recall. The six safe messages incorrectly escalated affect precision and review workload.',
      reference: reference(
        'Read a confusion table for duplicate detection',
        [
          'Start with the true duplicates: six detected plus four missed.',
          'Divide six detected duplicates by ten actual duplicates for recall.',
          'Compute precision separately using the two false alarms in its denominator.',
        ],
        'True positives 6; false negatives 4; false positives 2\nRecall = 6 / (6 + 4) = 60%\nPrecision = 6 / (6 + 2) = 75%',
        'Precision and recall answer different operational questions. Missed duplicates reduce recall; unnecessary reviews reduce precision.',
      ),
    },
    {
      title: 'Turn a product requirement into test cases',
      brief:
        'Select all cases that directly test the specified overdue-ticket filter and have a clear expected result.',
      stimulus:
        'A queue lead needs open tickets for the selected account whose due date is earlier than today. Today is June 10.',
      kind: 'select',
      options: [
        'The interface feels modern to the whole team.',
        'A June 9 open ticket from the selected account appears.',
        'A June 9 closed ticket from the selected account stays out.',
        'A June 10 open ticket from the selected account already appears overdue.',
        'A June 9 open ticket from another account stays out.',
      ],
      answer: [1, 2, 4],
      hint: 'Use account scope, open status, and the strict date comparison to derive the expected outcomes.',
      explanation:
        'The accepted checks cover eligibility, a closed item, and account isolation. A ticket due today does not meet an earlier-than-today rule.',
      reference: reference(
        'Specify the boundary for a low-credit alert',
        [
          'Translate “alert active accounts below 10 credits” into two conditions.',
          'Include an example inside the threshold, one on the threshold, and an inactive account.',
          'Give every case a single observable outcome.',
        ],
        'Active / 9 credits  → show alert\nActive / 10 credits → hide alert\nPaused / 2 credits  → hide alert',
        'Changing “below 10” to “10 or fewer” changes the second expected outcome.',
      ),
    },
    {
      title: 'Promote a verified release',
      brief:
        'Arrange the release pipeline. Source tests must pass before packaging, and the exact artifact checked in staging must be promoted.',
      stimulus:
        'Each failure stops the pipeline. The staging smoke test sends a synthetic request and checks the response before release.',
      kind: 'order',
      options: [
        'Promote the verified artifact to production.',
        'Build and identify a package from the tested commit.',
        'Check out the candidate commit and install pinned dependencies.',
        'Deploy the package to staging and run the smoke test.',
        'Run automated tests against the candidate commit.',
      ],
      answer: [2, 4, 1, 3, 0],
      hint: 'Track one commit and then one identifiable artifact from its build through promotion.',
      explanation:
        'Testing source and smoke-testing the actual package catch different faults. Promoting the same package prevents a later rebuild from changing what reaches users.',
      reference: reference(
        'Make a rollout decision from pilot telemetry',
        [
          'Record a threshold before rollout: pause if more than two of the first 20 synthetic requests fail.',
          'Send the same request type to the candidate and record status, latency, and version.',
          'Observe three failures, pause promotion, and use the tagged previous release for recovery.',
        ],
        'Candidate v0.7 | 20 requests | 3 failures | threshold 2\nDecision: pause; retain v0.6\nFollow-up: trace the three failed requests by their IDs.',
        'A new build must pass its own smoke test; a good score from the previous binary does not transfer.',
      ),
    },
    {
      title: 'Choose discovery questions that reveal demand',
      brief:
        'Select the questions that ask about observable past behavior and can test the stated support-workflow hypothesis.',
      stimulus:
        'Hypothesis: repeated escalations cost small support teams enough time that they already maintain a workaround.',
      kind: 'select',
      options: [
        'Would an AI support copilot be amazing?',
        'Walk through the most recent repeat escalation.',
        'What did that escalation delay, and who spent time handling it?',
        'Would the team rate this idea five stars?',
        'How were the last few escalations tracked, and who reviewed them?',
      ],
      answer: [1, 2, 4],
      hint: 'Seek a specific incident, an observable consequence, and the existing way of handling it.',
      explanation:
        'These prompts can reveal frequency, impact, and current behavior. Compliments about a hypothetical product provide little evidence of actual demand.',
      reference: reference(
        'Investigate a scheduling tool before writing code',
        [
          'Invite a person who scheduled an interview last week to reconstruct that event.',
          'Ask which tools were open, what took the most time, and what happened when an invitation changed.',
          'Record observation separately from the founder’s interpretation.',
        ],
        'Reported event: rescheduled one interview across three calendars.\nObserved workaround: spreadsheet and two email confirmations.\nInference to test: rescheduling is frequent enough to justify new software.',
        'Evidence from one interview can motivate another interview; it cannot establish market-wide frequency.',
      ),
    },
    {
      title: 'Scope the smallest useful AI startup pilot',
      brief:
        'Select the smallest complete feature set that tests whether a queue lead acts on aging, unanswered priority tickets.',
      stimulus:
        'A local CSV already contains ticket ID, priority, age in hours, and reply count. The lead will contact the owner manually. Eligibility is high priority, more than 24 hours old, and zero replies.',
      kind: 'select',
      options: [
        'Load the four existing CSV fields.',
        'Build a billing system for subscription upgrades.',
        'Apply the eligibility rule to those rows.',
        'Display the matching ticket IDs for the lead.',
        'Train a language model to forecast next quarter’s volume.',
      ],
      answer: [0, 2, 3],
      hint: 'Trace one usable path from the existing input through the decision rule to a human action.',
      explanation:
        'Importing, filtering, and displaying eligible IDs tests the behavior under study. A first pilot can collect evidence without building adjacent products.',
      reference: reference(
        'Reduce a knowledge-assistant MVP to one task',
        [
          'Start with one user action: a new teammate must find the current export policy.',
          'Index one approved guide, accept one search question, and display the matching excerpt with its source.',
          'Ask the teammate to answer the question and mark whether the source was correct.',
        ],
        'Input: one guide + five known questions\nOutput: a cited passage or “no matching guide”\nPilot metric: number of answers independently confirmed in the guide',
        'A successful pilot produces an observable outcome even without billing, a chat history, or a production integration.',
      ),
    },
    {
      title: 'Calculate a pilot break-even price',
      brief:
        'Enter the monthly price per active account that covers the stated costs at ten paying accounts. Use dollars.',
      stimulus:
        'Fixed monthly support and hosting: $300.\nVariable monthly service cost: $8 per active account.\nTen accounts pay the same price. No other costs or fees are assumed.',
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
      hint: 'Divide fixed cost by ten, then add the variable cost for one account.',
      explanation:
        'Each account must cover $30 of fixed cost and $8 of service cost. At $38 each, revenue and total monthly cost both equal $380. Willingness to pay needs separate evidence.',
      reference: reference(
        'Estimate contribution per knowledge search',
        [
          'A fictional plan sells 100 searches for $20. Divide revenue by included searches.',
          'Subtract the hypothetical per-search model and retrieval costs.',
          'Compare the remaining contribution with fixed costs; state the usage assumption.',
        ],
        'Revenue/search = $20 / 100 = $0.20\nVariable/search = $0.04 + $0.01 = $0.05\nContribution/search = $0.15\n$60 fixed / $0.15 = 400 searches at full utilization',
        'At 400 searches, $80 revenue minus $20 variable cost covers exactly $60 of fixed cost.',
      ),
    },
    {
      title: 'Defend a pilot result in an interview or pitch',
      brief:
        'Select every claim supported by the pilot evidence. A customer or hiring panel should be able to reconstruct the conclusion.',
      stimulus:
        'One tester processed the same 12 fictional tickets twice. Manual run first: 18 minutes and two incorrect routes. Assisted run second: 12 minutes and zero incorrect routes. No other testers or live tickets were evaluated.',
      kind: 'select',
      options: [
        'This tester finished the second run six minutes faster.',
        'Every support team will save six minutes per batch.',
        'The assisted run had zero incorrect routes on these 12 cases.',
        'Practice on the first run could explain part of the improvement.',
        'These results prove that future mistakes are impossible.',
      ],
      answer: [0, 2, 3],
      hint: 'Describe the observed sample, give its size, and account for alternative explanations.',
      explanation:
        'The time and errors describe this specific trial. Reusing the same tickets in fixed order leaves a practice effect. Fresh cases and counterbalanced order would strengthen follow-up evidence.',
      reference: reference(
        'Turn a prototype trial into a portfolio claim',
        [
          'Write down the task, dataset, baseline, and actual measurement.',
          'Explain one design decision and the failure it addresses.',
          'State a limitation and the next experiment that could change the decision.',
        ],
        'Trial: two reviewers, eight fictional FAQ cases.\nBaseline: 5/8 answers linked to a valid source. Prototype: 7/8.\nDecision: display the cited excerpt for verification.\nLimitation: tiny sample. Next: test unfamiliar cases with new reviewers.',
        'Every number in the claim can be recovered from the evaluation sheet. The founder’s forecast belongs in a separately labeled assumption.',
      ),
    },
  ];

  const file = (name, label) => ({ filename: 'assets/academy/' + name, label });
  const workload = file(
    'workload.py',
    'Python workload function and three manual checks',
  );
  const tickets = file('tickets.csv', '50 fictional support tickets');
  const accounts = file('accounts.csv', 'Two fictional customer accounts');
  const usage = file('usage.csv', 'Charges, pending usage, and a credit');
  const inputs = file(
    'input-rows.csv',
    'Four intake rows, including zero and missing minutes',
  );
  const pages = file('api-pages.json', 'Two API pages and a 404 response');
  const events = file(
    'ingest-events.json',
    'Five event deliveries with a retry and invalid input',
  );
  const handbook = file(
    'knowledge-base.txt',
    'Five fictional knowledge-base excerpts with source IDs',
  );
  const cases = file('eval-cases.csv', '20 labeled evaluation questions');
  const outputs = file(
    'model-outputs.csv',
    'Two simulated model outputs for every evaluation case',
  );
  const releaseInputs = file(
    'release-inputs.csv',
    'Release evaluation: 12 fresh requests',
  );
  const releaseKey = file(
    'release-routing-key.csv',
    'Release labels and simulated routes: open after collecting responses',
  );

  window.WEEKLY_DOWNLOADS = {
    1: [workload],
    2: [usage],
    3: [inputs],
    4: [inputs],
    5: [tickets],
    6: [tickets],
    7: [tickets, accounts],
    8: [tickets, accounts],
    9: [pages],
    10: [events, accounts],
    11: [tickets],
    12: [tickets, pages],
    13: [tickets, accounts],
    14: [tickets, accounts],
    15: [handbook, cases, outputs],
    16: [handbook, cases],
    17: [handbook, events],
    18: [releaseInputs, releaseKey, handbook, cases, outputs],
    19: [tickets],
    20: [events, pages],
    22: [handbook, cases],
    23: [usage],
    24: [cases, outputs],
  };
})();
