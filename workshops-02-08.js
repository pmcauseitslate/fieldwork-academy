// Guided moves and fresh practice cases for the Python-to-SQL sequence.
(() => {
  const step = (title, body, code) => ({
    title,
    body,
    ...(code ? { code } : {}),
  });
  const field = (label, hint, answers, feedback) => ({
    label,
    hint,
    answers,
    feedback,
  });
  const fix = (symptom, repair) => ({ symptom, fix: repair });
  window.ACADEMY_WORKSHOPS = window.ACADEMY_WORKSHOPS || {};
  Object.assign(window.ACADEMY_WORKSHOPS, {
    2: {
      bridge:
        'Week 1 used a function to turn two inputs into one number. A pilot can have many days of usage. This week a function accepts a list, totals its entries and returns a decision.',
      goal: 'Read a ledger, handle an adjustment and test what happens just below, exactly at and just above a limit.',
      terms: [
        [
          'List',
          'Square brackets hold an ordered collection. [4, 7, 2] holds three numbers. [] is an empty list.',
        ],
        [
          'Loop',
          'for item in items: runs the indented lines once for each item, in order. The name item takes on a new value each time.',
        ],
        [
          'Condition',
          'A question with a true or false answer. > means greater than. >= also includes equality. Text such as "ready" has quotation marks.',
        ],
      ],
      steps: [
        step(
          'Turn a prompt into a rule',
          'A prompt such as “flag high usage” leaves room for interpretation. Code needs an exact decision. For a cap of 10 credits, write the expected label for totals of 9, 10 and 11 before coding. If using an LLM for a hint, ask it to explain a comparison and verify its explanation on those three inputs. No LLM is required for the workshop.',
        ),
        step(
          'Keep the running total between turns',
          'Start at zero before the loop. Add the current item to the previous total. In Python, total += value means total = total + value. Moving total = 0 inside the loop erases the earlier days. sum([4, 7, 2]) is a built-in shortcut for the same total.',
        ),
        step(
          'Read indentation as a map',
          'An if line ends in a colon. Indent its action four more spaces. Move back to the earlier indentation when that action ends. A return exits the function immediately, so put the final decision after the loop has read every observation.',
        ),
        step(
          'Return a number with its label',
          'A list can hold different kinds of values. Here [visitors, label] contains a number and text. The function assigns a default label, changes it only where the condition holds and returns both values after the decision. Predict what the calls just below, exactly at and just above four will display.',
          'def door_report(visitors):\n    label = "quiet"\n    if visitors >= 4:\n        label = "busy"\n    return [visitors, label]\n\nprint(door_report(3))\nprint(door_report(4))\nprint(door_report(5))',
        ),
        step(
          'Read a ledger with a state and an amount',
          'A pair such as ("posted", 8) keeps a label and a number together. In for state, amount in charges: Python gives those names the two values from one pair. An if state == "posted": line compares the label. remaining -= amount subtracts a charge. Subtracting a negative refund increases the balance.',
        ),
        step(
          'Decide on a unit and a boundary',
          'Use the same units for amounts and cap. If usage arrives in tokens and the cap is in dollars, first obtain the price per stated number of tokens. For a rule allowing spending up to the cap, the exact cap is within budget. It takes an amount above the cap to change the label.',
        ),
      ],
      example: {
        title: 'Decide whether an interview pilot reached its target',
        setup:
          'A team needs six interviews. It completed two on Monday, one on Tuesday and three on Wednesday. Predict the label for the full week.',
        steps: [
          'Read the three values inside the brackets. Add them in order. The running totals are 2, 3 and 6.',
          'The if line is aligned with the for line, so Python compares the finished total with the target once. Equality meets this target.',
          'Run the program. The outer print displays the text returned by the function.',
        ],
        language: 'python',
        artifact:
          'def interview_status(counts, target):\n    total = 0\n    for count in counts:\n        total += count\n    if total >= target:\n        return "ready"\n    return "collecting"\n\nprint(interview_status([2, 1, 3], 6))',
        result: 'ready',
        change:
          'Change only the final target from 6 to 7. Predict the label before running it again.',
        changedResult: 'collecting',
      },
      task: {
        title: 'Reconcile a transcription pilot',
        brief:
          'Use a new ledger to decide whether a five-day pilot stayed within its weekly credit allowance. A credit adjustment has already been approved. Each signed number contributes once.',
        source:
          'Weekly cap: 80 credits\nDaily net usage: 18, 26, −5, 14, 27 credits\nRule: reaching the cap is allowed. Only an excess is over.\nProposed extra use on Friday: 3 credits',
        fields: [
          field(
            'What is the original net usage in credits?',
            'Enter a number.',
            ['80', '80 credits'],
            'Keep a running total across all five days. The negative entry reduces usage.',
          ),
          field(
            'What label applies to the original pilot?',
            'Enter within or over.',
            ['within', 'within budget', 'within cap'],
            'Compare net usage with the weekly cap and check the rule for equality.',
          ),
          field(
            'How many credits over the cap would the proposed change put the pilot?',
            'Enter the excess, in credits.',
            ['3', '3 credits'],
            'Add the proposed use to the original total, then subtract the allowance.',
          ),
        ],
        evidence:
          'The credit worksheet above checks the arithmetic. The earlier skill-lab function budget_status(costs, budget) returned a label. In this project editor, complete pilot_report(charges, cap) for a new dollar ledger so it returns both total dollars and a label. Record one below-cap, one exact-cap and one over-cap result with the unit and period.',
        review: [
          'I can trace a running total across a refund.',
          'I ran three cases, including one exactly at the cap.',
          'My report names the unit, period and decision rule.',
        ],
      },
      pitfalls: [
        fix(
          'Only the last observation affects the result.',
          'Move the zero initialization above the loop. Compare the indentation of the final return with the for line.',
        ),
        fix(
          'An exact-budget call returns over.',
          'Trace the comparison on equal numbers. Read the budget rule separately from the interview target in the example.',
        ),
      ],
    },
    3: {
      bridge:
        'Week 2 assumed its list contained usable numbers. A support form supplies text, including blanks and typing mistakes. Check each field before passing a count into that earlier function.',
      goal: 'Convert a form submission into a usable record and give a specific correction when a field fails.',
      terms: [
        [
          'Dictionary',
          'A record with named fields. In {"count": "4"}, "count" is the key and "4" is its value. row["count"] reads that value.',
        ],
        [
          'String method',
          'An action on text. " Blue ".strip() removes surrounding spaces. .lower() converts letters to lowercase.',
        ],
        [
          'Input contract',
          'The exact fields, formats and ranges a record must satisfy. Normalizing text is allowed only where the contract permits it.',
        ],
      ],
      steps: [
        step(
          'Distinguish an empty field from a valid zero',
          'The quoted text "0" contains a digit. An empty string "" has no characters. Trim space-only input before checking for an empty field. A date, count and queue label can each need different checks.',
        ),
        step(
          'Convert once, then check the range',
          'Inside try:, run int(raw) to convert whole-number text. If that operation raises ValueError, Python skips to except ValueError:. A converted -2 is a number, so it still needs a separate range check. return exits at the first problem.',
        ),
        step(
          'Check membership and all required fields',
          'For a queue allowed to ignore case, clean the text and ask whether it belongs to a list. In the skill lab the priority contract is case-sensitive, so leave the priority letters as entered. Validate every required field before saving a ticket or sending its count to a report.',
          'queue = row["queue"].strip().lower()\nif queue not in ["billing", "support"]:\n    return "Choose billing or support"',
        ),
        step(
          'Send a checked number to a previous function',
          'After completing validate_ticket in the project, copy the Week 2 pilot_report definition above these calls in the same editor. isinstance(answer, int) tests whether validation returned an integer. Only accepted values enter this list. Here the allowance is six requests, so both inputs use requests. The printed report should be [2, "within"].',
          'counts = []\nanswer = validate_ticket({"subject":"Invite", "queue":"support", "count":"2"})\nif isinstance(answer, int):\n    counts.append(answer)\nprint(pilot_report(counts, 6))',
        ),
        step(
          'Test just inside and outside a boundary',
          'For an allowed range from 1 through 5, try 0, 1, 5 and 6. Add a word such as "four" to test conversion. Write the expected response first so a plausible result cannot hide a broken rule.',
        ),
      ],
      example: {
        title: 'Validate a workshop seat request',
        setup:
          'A workshop accepts between one and four seats per request. The form sends its value as text, even when the student typed a number.',
        steps: [
          'Read the seats field, remove outer spaces and convert the remaining text to an integer.',
          'The < and > symbols mean less than and greater than. The word or makes either out-of-range condition sufficient to reject a request.',
          'Run the request. Read the quoted text in the call against the rule before changing it.',
        ],
        language: 'python',
        artifact:
          'def seat_message(row):\n    raw = row["seats"].strip()\n    try:\n        seats = int(raw)\n    except ValueError:\n        return "Enter a whole number"\n    if seats < 1 or seats > 4:\n        return "Choose 1 to 4 seats"\n    return "Accepted"\n\nprint(seat_message({"seats": " 4 "}))',
        result: 'Accepted',
        change:
          'Replace " 4 " with "four" inside the dictionary. Predict which return line will run.',
        changedResult: 'Enter a whole number',
      },
      task: {
        title: 'Audit a pilot intake batch',
        brief:
          'Apply the specification to each row in order. A rejected row contributes no units. Checks run in the order printed below.',
        source:
          'Fields: ID | summary | route | units\nRules: trimmed summary must contain text. Trim and lowercase route, which must be pilot or help. Convert units to an integer from 0 to 8 inclusive.\nF1 | Invite stuck | " Pilot " | "0"\nF2 | Receipt copy | "Help"    | "9"\nF3 | "   "        | "pilot"   | "2"\nF4 | Export empty | " HELP "  | "6"',
        fields: [
          field(
            'What total units reach the usage checker?',
            'Sum the accepted counts.',
            ['6', '6 units'],
            'Check all three fields on a row before adding its units. Zero can pass the range rule.',
          ),
          field(
            'Which field needs correction on F2?',
            'Enter one field name from the header.',
            ['units'],
            'Follow the three rules in order. Conversion and range are separate checks.',
          ),
          field(
            'What route should be stored for F4?',
            'Enter the normalized field value.',
            ['help'],
            'Apply exactly the two formatting operations allowed for route.',
          ),
        ],
        evidence:
          'The worksheet used a pilot intake contract. In this editor, complete validate_ticket(row) for a support ticket with subject, queue and count. This contract accepts the queues billing and support. Run one accepted row and two rejected rows with different bad fields. Record their responses and feed only an accepted integer count into the Week 2 usage calculation.',
        review: [
          'I tested a blank, an invalid number and an accepted boundary value.',
          'My validator reports which field needs correction.',
          'Only accepted counts reach the usage report.',
        ],
      },
      pitfalls: [
        fix(
          'A whole-number comparison gives a type error.',
          'Convert the incoming text with int before comparing it with numeric bounds.',
        ),
        fix(
          'A required key is absent entirely.',
          'row["seats"] requires the key to exist. For optional input, row.get("seats", "") supplies an empty string when that key is missing. Validate that fallback like a blank form field.',
        ),
      ],
    },
    4: {
      bridge:
        'Week 3 checked one dictionary at a time. A CSV reader can turn every row of a file into a dictionary keyed by its header, ready for the same validation rules.',
      goal: 'Read a named column safely, account for every data row and keep a test that catches an import mistake.',
      terms: [
        [
          'CSV',
          'A text table with a header and rows of comma-separated fields. Quotes can protect a comma inside one field.',
        ],
        [
          'Fixture',
          'A small input kept with a test. Its expected result is known before running the program.',
        ],
        [
          'Assertion',
          'assert actual == expected checks equality. A passing assertion is silent. A mismatch stops the program with AssertionError.',
        ],
      ],
      steps: [
        step(
          'Trace one physical file',
          'In the sample below, the header names two fields. The first data row also has two fields. CSV quotes keep the comma inside the account name. Splitting on every comma produces three pieces and assigns the wrong duration.',
          'account,minutes\n"Cloud, North",5\nCedar,0',
        ),
        step(
          'Know what the parser hands over',
          'Reading the first data row yields a dictionary like {"account": "Cloud, North", "minutes": "5"}. The quotes around the CSV field disappear. The duration still arrives as text. A CSV parser handles the file format. The validation function decides which values count.',
        ),
        step(
          'Read a real file in local Python',
          'Download the Week 4 sample. Put input-rows.csv beside a file named import_rows.py. This standard-library example opens it as UTF-8 text. with closes the file automatically. DictReader uses the header names. Run python3 import_rows.py in that folder on macOS or Linux, or py import_rows.py on Windows. The browser project opens its supplied file the same way.',
          'import csv\n\nwith open("input-rows.csv", newline="", encoding="utf-8") as source:\n    reader = csv.DictReader(source)\n    if "minutes" not in (reader.fieldnames or []):\n        raise ValueError("Missing minutes header")\n    for row in reader:\n        print(row["id"], row["minutes"])',
        ),
        step(
          'Reconcile the file and test a repair',
          'Keep a count of accepted rows and a list of rejected IDs. Accepted plus rejected must equal the number of input data rows. If a valid zero vanishes, make a fixture containing zero, write its expected report, observe the failing assertion, repair the condition and rerun the same assertion and earlier tests.',
        ),
      ],
      example: {
        title: 'Read and test a real appointment CSV',
        setup:
          'Open Files supplied in this editor and read visits.csv. A quoted client name contains a comma. One visit took zero minutes and one duration is missing. Predict the accepted count and total minutes.',
        files: {
          'visits.csv':
            'id,client,minutes\nV1,"Elm, Inc.",0\nV2,Iris,12\nV3,Maple,\n',
        },
        steps: [
          'import csv loads Python’s built-in reader. list(csv.DictReader(source)) parses the file into named rows. Check the first client field to verify the quoted comma survived.',
          'Look up "minutes" by header. For this file, minutes must contain only nonnegative whole-number digits. .isdigit() checks that text rule and accepts "0".',
          'For an accepted row, add one to the count and its converted minutes to the total. For a rejected row, .append adds the ID to the end of the rejected list.',
          'The function returns a list in the order accepted count, minutes, rejected IDs. The assertion compares the entire result. print makes the report visible after the test passes.',
        ],
        language: 'python',
        artifact:
          'import csv\n\ndef tally(rows):\n    accepted = 0\n    total = 0\n    rejected = []\n    for row in rows:\n        raw = row["minutes"].strip()\n        if raw.isdigit():\n            accepted += 1\n            total += int(raw)\n        else:\n            rejected.append(row["id"])\n    return [accepted, total, rejected]\n\nwith open("visits.csv", newline="", encoding="utf-8") as source:\n    rows = list(csv.DictReader(source))\nassert rows[0]["client"] == "Elm, Inc."\nreport = tally(rows)\nassert report == [2, 12, ["V3"]]\nprint(report)',
        result: "[2, 12, ['V3']]",
        change:
          'Insert the line rows[1]["minutes"] = "15" immediately above report = tally(rows). That changes the second parsed row. Predict the new report. First run with the old assertion and observe the failed expectation. Then update the expected total in the assertion and run again.',
        changedResult: "[2, 15, ['V3']]",
      },
      task: {
        title: 'Reconcile a new coaching-session CSV',
        brief:
          'Read the actual CSV text below. Only rows with an ID and nonnegative whole minutes are accepted. A measured zero is valid. A missing duration is rejected.',
        source:
          'id,client,minutes\nM1,"Spruce, LLC",8\nM2,Iris,0\nM3,Cobalt,\nM4,Aster,11',
        fields: [
          field(
            'What complete client name does a CSV reader return for M1?',
            'Omit the surrounding CSV quotation marks.',
            ['Spruce, LLC'],
            'The quote pair protects the comma inside the name. The separator after the closing quote starts the next field.',
          ),
          field(
            'How many rows are accepted?',
            'Count data rows, including measured zero.',
            ['3', '3 rows'],
            'Exclude the header. Count each row whose duration passes the rule.',
          ),
          field(
            'What is the total accepted time in minutes?',
            'Enter a number.',
            ['19', '19 minutes'],
            'Add only the parsed minutes in the accepted records.',
          ),
          field(
            'Which ID goes in the rejected-row report?',
            'Enter the ID.',
            ['M3'],
            'Find the row whose duration fails the stated contract.',
          ),
        ],
        evidence:
          'Complete report(reader) in the project editor. The supplied read_report(filename) opens a file and passes its CSV reader to that function. Use input-rows.csv and the smaller fixtures to record the accepted count, rejected IDs and total minutes. Compare expected and observed results for a clean file, a quoted-comma field and a malformed row.',
        review: [
          'My import preserves a quoted comma inside one field.',
          'Every data row is either accepted or listed for correction.',
          'I ran three fixtures and compared results with recorded expectations.',
        ],
      },
      pitfalls: [
        fix(
          'A quoted name moves minutes into the wrong column.',
          'Use a CSV-aware reader and verify the parsed client name independently of the numeric total.',
        ),
        fix(
          'A valid zero disappears.',
          'Check for an empty string before conversion. A numeric 0 is a legitimate measured value even though if minutes: treats it as false.',
        ),
      ],
    },
    5: {
      bridge:
        'Week 4 identified bad rows during import. Keep that habit when loading valid rows into a searchable register. Two individually valid records can still disagree about the same ID.',
      goal: 'Index records without overwriting a conflict, choose a repeatable triage order and hand a teammate the evidence for an escalation.',
      terms: [
        [
          'Index',
          'A lookup from a stable key to a record. by_id["R-12"] retrieves the entry stored under R-12.',
        ],
        [
          'Duplicate',
          'An incoming record repeats an identifier. A repeated delivery of identical data and a conflicting reuse of an ID may require different handling.',
        ],
        [
          'Triage',
          'Choose what needs attention first. A stated impact rule and a tie-breaker let two reviewers reach the same order.',
        ],
      ],
      steps: [
        step(
          'Make one entry per stable ID',
          'Start with an empty dictionary, {}. For each row, read its ID into a name. key in by_id checks whether that key already exists. by_id[key] = row stores a record. Check for a duplicate before this assignment or an older record will be replaced.',
        ),
        step(
          'Check the shape separately from identity',
          'The lab uses a regular expression, a pattern for matching text. re.fullmatch checks the entire value. TKT- is a literal prefix. [0-9] means one digit and {3} requires exactly three. Keep leading zeros by storing the ID as text. Passing this pattern says nothing about whether the ID was already stored.',
        ),
        step(
          'Establish an order and record the reason',
          'Give confirmed service outages priority over how-to questions. For tickets with equal impact, choose earliest arrival, then ID for equal times. Store the original message, the observed error, and the suggested next check separately. A plausible explanation supplied by an LLM is still a hypothesis until a test confirms it.',
        ),
        step(
          'Prepare an escalation another person can reproduce',
          'Record the ID and time, what should happen, the exact observed result, a short sequence using fictional data, and who was affected. If the cause is unknown, give one specific next check. A changed ticket title should leave the ID and evidence attached to the same record.',
        ),
      ],
      example: {
        title: 'Preserve the first registration for a demo device',
        setup:
          'Registration D2 appears twice. The second entry has a different owner. The intake policy keeps the first owner and records the repeated ID for review.',
        steps: [
          'Start the index as an empty dictionary and the conflict log as an empty list.',
          'For every registration, test membership before writing. else: runs only when the earlier if condition was false.',
          'Square brackets also read the returned pair. index value 0 selects the first item. The second print reads the conflict list at position 1.',
        ],
        language: 'python',
        artifact:
          'def register(rows):\n    owners = {}\n    conflicts = []\n    for row in rows:\n        key = row["id"]\n        if key in owners:\n            conflicts.append(key)\n        else:\n            owners[key] = row["owner"]\n    return [owners, conflicts]\n\nrows = [{"id": "D2", "owner": "Maple"},\n        {"id": "D2", "owner": "Iris"}]\nreport = register(rows)\nprint(report[0]["D2"])\nprint(report[1])',
        result: "Maple\n['D2']",
        change:
          'Change only the second ID from D2 to D3. Predict whether the first owner changes and whether a conflict remains.',
        changedResult: 'Maple\n[]',
      },
      task: {
        title: 'Prepare a handoff for the on-call lead',
        brief:
          'Route the first accepted record for each ID. A repeated ID is set aside and cannot change the registered account or the priority. Outages go first, followed by questions. Break ties using earliest arrival.',
        source:
          'ID | account | category | UTC arrival\nP-41 | Kite | question | 08:30\nP-17 | Pine | outage   | 09:10\nP-62 | Ash  | outage   | 09:02\nP-17 | Oak  | question | 09:12\nOn-call note from Ash at 09:02 UTC: In a fictional workspace, choose Reports → Download CSV. A sample report should download. Two test accounts each received “Export unavailable” on two attempts. Viewing reports still worked. The cause is unknown.',
        fields: [
          field(
            'Which ID goes to the on-call lead first?',
            'Enter one ID.',
            ['P-62'],
            'Remove the conflicted delivery first. Compare impact before you compare times.',
          ),
          field(
            'Which account remains attached to P-17?',
            'Enter its name.',
            ['Pine'],
            'Under the initial-import policy the second appearance cannot replace the first.',
          ),
          field(
            'How many distinct tickets belong in the register?',
            'Enter the count.',
            ['3', '3 tickets'],
            'Count unique accepted IDs, regardless of how many rows arrived.',
          ),
        ],
        evidence:
          'Complete build_register(rows) in the project editor. Search one ID and verify that its first account survives a conflicting duplicate. Use the on-call note above to write the escalation for the first ticket in priority order. Record expected behavior, observed behavior, reproducible steps and the known impact.',
        review: [
          'I searched the register by a stable ID.',
          'I verified the original record survives a conflicting ID.',
          'My escalation distinguishes the observation from a proposed next check.',
        ],
      },
      pitfalls: [
        fix(
          'A second account silently replaces the first.',
          'Find where the dictionary assignment runs. Store an incoming row only after the duplicate check.',
        ),
        fix(
          'Two reviewers route equal-impact tickets differently.',
          'State a tie-breaker and apply it to both records, using the same time zone.',
        ),
      ],
    },
    6: {
      bridge:
        'Weeks 3–5 produced a validator, CSV importer and ticket index. A teammate now needs to run those pieces together, check the result and see which change fixed a bug.',
      goal: 'Run a repeatable release, verify it against a known fixture and preserve a change another person can inspect.',
      terms: [
        [
          'Entry point',
          'The file or command a reviewer runs first. Its inputs, expected output and test command belong in the README.',
        ],
        [
          'Repository',
          'A folder whose history is tracked by Git. A commit records a named snapshot of staged files.',
        ],
        [
          'Regression',
          'A change breaks previously working behavior. Keep its smallest failing example as a test after the fix.',
        ],
      ],
      steps: [
        step(
          'Build a pipeline from tested pieces',
          'Read the CSV, validate each field, reject duplicate IDs, then summarize only the rows meeting the report rule. Keep those jobs in separate functions. For each accepted status, count the open rows and add their handling minutes. Validate missing or nonnumeric durations before adding them.',
        ),
        step(
          'Choose evidence a mistaken report could fail',
          'A row count alone cannot catch one dropped ID replaced by a duplicate. sorted(ids) puts IDs in order for a complete comparison. Test identity coverage, eligible-row count and the total independently. Include closed and pending rows with positive minutes so an omitted filter changes the result.',
        ),
        step(
          'Take the first Git snapshot',
          'For a local handoff, create a folder for the toolkit and open a terminal in that folder. Save the browser code as toolkit.py, the downloaded tickets.csv beside it, and instructions as README.md. Run the commands below one at a time. status lists tracked and new files. add selects the named files. commit records the staged versions. If Git asks for an identity, set a name and email for this repository with git config user.name and git config user.email. GitHub’s browser editor also records commits, and its History view shows them.',
          'git init\ngit status\ngit add toolkit.py tickets.csv README.md\ngit diff --staged\ngit commit -m "Add reproducible ticket report"',
        ),
        step(
          'Use GitHub from a browser',
          'To keep history without a local Git setup, sign in to a free GitHub account, create a repository and give it a descriptive name. Choose Add file → Upload files for the fictional CSV and your downloaded code. Commit the files. Add a README.md with run instructions and expected output. After testing a repair in the academy editor, edit or re-upload the code and commit a second time with a message naming the fix. Open the file history to compare the two versions.',
        ),
        step(
          'Capture a fix and test the handoff',
          'Run the smallest case that fails, record what it returned, then fix the responsible line. Rerun that case and the earlier tests. Use git diff to inspect the edit. Stage and commit it with a short explanation, then find both snapshots with git log --oneline. Test from another folder using git clone with the original folder path as its source. The README should tell a reviewer where to put the CSV and what to run.',
          'python3 toolkit.py\ngit diff\ngit add toolkit.py\ngit commit -m "Keep pending tickets out of open totals"\ngit log --oneline',
        ),
      ],
      example: {
        title: 'Release a report of finished onboarding calls',
        setup:
          'The release fixture has three calls. Only two are done. The long booked call makes an incorrect filter easy to detect.',
        steps: [
          'Filter on the exact status and add time only inside that branch. In Python, == compares two values.',
          'Write an assertion for the empty fixture and another for both outputs of the three-row fixture. len(rows) can supply the total input size for a separate reconciliation check.',
          'Print the count and minutes from the tested result. These are the numbers a reviewer should see from this fixture.',
        ],
        language: 'python',
        artifact:
          'def finished(rows):\n    count = 0\n    minutes = 0\n    for row in rows:\n        if row["state"] == "done":\n            count += 1\n            minutes += row["minutes"]\n    return [count, minutes]\n\ncalls = [{"state": "done", "minutes": 5},\n         {"state": "booked", "minutes": 40},\n         {"state": "done", "minutes": 3}]\nassert finished([]) == [0, 0]\nassert finished(calls) == [2, 8]\nprint(finished(calls))',
        result: '[2, 8]',
        change:
          'Change the booked call to done. Predict the new count and minutes, run the old assertion to see it fail, then update its expected result and rerun both tests.',
        changedResult: '[3, 48]',
      },
      task: {
        title: 'Decide whether a candidate release can ship',
        brief:
          'Audit a fictional release before trusting its printed report. Every input ID must be present once. Only sent events belong in the sent count and cost.',
        source:
          'Expected fixture: E4 sent 7 credits, E7 held 50 credits, E8 sent 12 credits\nCandidate output: IDs E4, E7, E7 | sent count 2 | sent credits 19\nRelease rules: exact identity coverage, sent count, and sent credits must all match.',
        fields: [
          field(
            'Which required ID is missing?',
            'Enter the ID.',
            ['E8'],
            'Compare all three unique expected IDs against the full output list.',
          ),
          field(
            'What sent-credit total does the hand calculation support?',
            'Enter credits.',
            ['19', '19 credits'],
            'Add the credits attached to sent rows only.',
          ),
          field(
            'Should this candidate ship or hold?',
            'Enter ship or hold.',
            ['hold', 'hold release'],
            'One failing required check is enough to keep the release under review.',
          ),
        ],
        evidence:
          'Complete release_report(rows) in the project editor. Its reader opens the supplied 50-row tickets.csv. Verify every ID, the open count, total open minutes and a triage list of [queue, ticket ID] pairs for the accepted open tickets. Describe a failing case, the repair, the command to reproduce the final report, and the observed output. Keep the fictional fixture, README and Git commit history together for the portfolio handoff.',
        review: [
          'I checked every expected ID as well as the open-ticket count and minutes.',
          'I reproduced a failure, repaired it and reran earlier checks.',
          'My handoff includes run instructions, expected output and a change history.',
        ],
      },
      pitfalls: [
        fix(
          'The fix works in the editor but the saved snapshot shows old code.',
          'Inspect git status and git diff --staged. If the file changed after staging, stage its current version before committing.',
        ),
        fix(
          'The report on a clean checkout cannot find tickets.csv.',
          'Use the filename documented in the README. Confirm the fixture is tracked and run from the project folder. On Windows, use py toolkit.py when the Python launcher is installed.',
        ),
      ],
    },
    7: {
      bridge:
        'Week 6 walked through Python dictionaries to filter and total tickets. SQL asks a database for a result using table and column names. Apply the same eligibility rule and hand checks.',
      goal: 'Join related tables, filter the joined rows, summarize a group and describe exactly what a result row represents.',
      terms: [
        [
          'Table',
          'Rows with the same named columns. One row can represent a ticket, an account or an event. State that unit first.',
        ],
        [
          'Join',
          'Connect rows when their keys match. A ticket’s account_id points to an account’s id. Matching a ticket to several event rows produces several joined rows.',
        ],
        [
          'NULL',
          'A missing database value. COUNT(*) counts rows. COUNT(minutes) counts only rows with a recorded minutes value, including a recorded zero.',
        ],
      ],
      steps: [
        step(
          'Read the query in data order',
          'Start with FROM to find the source table. JOIN ... ON connects rows with matching keys. WHERE keeps matching records. SELECT chooses what to display. ORDER BY sorts the result, ascending by default. The dot in tickets.id identifies which table owns the column. SQL strings normally use single quotes.',
        ),
        step(
          'Make a total at the right grain',
          'SUM(minutes) adds recorded minutes. GROUP BY queue returns a separate result per queue. COUNT(DISTINCT ticket_id) counts unique ticket IDs even if a join to comments repeats a ticket. To find the longest five open tickets, filter first, sort by minutes DESC and only then use LIMIT 5.',
        ),
        step(
          'Account for missing matches',
          'An ordinary JOIN keeps matching rows. A LEFT JOIN keeps all rows from its left table. To count open tickets for every account, start with accounts and put the open-status test in the ON condition. COUNT(tickets.id) then returns zero for an account without an open match. A WHERE condition on the right table can remove that account.',
        ),
        step(
          'Keep a query for another report',
          'CREATE VIEW gives a SELECT a reusable name. Another query can now read it like a table. Parentheses after the view name can list its output column names, in the same order as the SELECT. Here is the pattern for a simple one-column view.',
          "CREATE VIEW draft_lessons(lesson_id) AS\nSELECT id FROM lessons WHERE state = 'draft';\nSELECT * FROM draft_lessons;",
        ),
        step(
          'Check a report independently',
          'Trace one account by hand and write its expected result before executing. For an orphan report, put tickets on the left, join accounts, then keep rows WHERE accounts.id IS NULL. For a local desktop copy, use DB Browser for SQLite to import the two CSV files into tables named accounts and tickets. The first CSV row supplies the column names.',
        ),
      ],
      example: {
        title: 'Count finished lessons by learning group',
        setup:
          'Aster has two finished lessons and a draft. Birch has one finished lesson. The database already contains these groups and lessons.',
        steps: [
          'Match each lesson’s group_id to the group’s id. Then keep only lessons in the requested state.',
          'GROUP BY makes one row per group. COUNT(*) counts lessons remaining in that group. AS names the result column.',
          'ORDER BY puts the group names in ascending order. Check Aster by counting matching fixture rows by hand.',
        ],
        language: 'sql',
        setupSql:
          "CREATE TABLE groups_list (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE lessons (id INTEGER PRIMARY KEY, group_id INTEGER, state TEXT);\nINSERT INTO groups_list VALUES (1,'Aster'),(2,'Birch');\nINSERT INTO lessons VALUES (10,1,'done'),(11,1,'draft'),(12,1,'done'),(13,2,'done');",
        artifact:
          "SELECT groups_list.name, COUNT(*) AS lesson_count\nFROM lessons\nJOIN groups_list ON lessons.group_id = groups_list.id\nWHERE lessons.state = 'done'\nGROUP BY groups_list.id, groups_list.name\nORDER BY groups_list.name;",
        result: 'name | lesson_count\nAster | 2\nBirch | 1',
        change:
          "Change only the state filter from 'done' to 'draft'. Predict which groups will still have a result row.",
        changedResult: 'name | lesson_count\nAster | 1',
      },
      task: {
        title: 'Check a partner-training report',
        brief:
          'Each session belongs to one partner. Only completed sessions count toward delivered minutes. Keep all partners in the partner roster, even one with zero completed sessions.',
        source:
          'partners: 1 Reed, 2 Pine, 3 Moss\nsessions (partner_id, state, minutes): (1, done, 9), (1, booked, 70), (1, done, 12), (2, done, 4)\nAll sessions belong to a listed partner.',
        fields: [
          field(
            'How many delivered minutes belong to Reed?',
            'Enter minutes.',
            ['21', '21 minutes'],
            'Use the partner ID and completed state together before adding durations.',
          ),
          field(
            'Which partner needs a zero-count row?',
            'Enter the partner name.',
            ['Moss'],
            'Compare every partner in the roster with the completed sessions.',
          ),
          field(
            'Which SQL join keeps that partner when partners is the left table?',
            'Enter the SQL join type.',
            ['LEFT JOIN', 'LEFT OUTER JOIN', 'left', 'left outer'],
            'Choose the operation that preserves every row on the left even when the right table has no matching record.',
          ),
        ],
        evidence:
          'The skill lab used a small join fixture. This project editor already contains the two accounts and 50 tickets from the downloadable CSV files. Complete the three named views open_by_account, minutes_by_queue and unmatched_tickets for this full reporting period. Explain the row unit of each, check one group by hand, and record whether any ticket lacks a matching account.',
        review: [
          'I explained each query’s output row unit.',
          'I checked one group against input records.',
          'I recorded how unmatched rows affect the results.',
        ],
      },
      pitfalls: [
        fix(
          'A result changes order between runs.',
          'Add ORDER BY and a second key to break ties when a repeatable report requires it.',
        ),
        fix(
          'A left join counts one ticket for an account with none.',
          'COUNT(*) counts the retained account row. Count a required ticket column instead.',
        ),
      ],
    },
    8: {
      bridge:
        'Week 7 joined tables on matching values. Now write rules into the tables so a ticket can only point to a real parent and a status change can be kept as its own event.',
      goal: 'Create a small related schema and demonstrate one allowed write and one correctly rejected write.',
      terms: [
        [
          'Primary key',
          'A value that uniquely identifies a row in its table. A foreign key in another table can reference it.',
        ],
        [
          'Constraint',
          'A database rule checked on a write. NOT NULL requires a value. UNIQUE prevents duplicate keys. CHECK limits allowed values.',
        ],
        [
          'Transaction',
          'A group of writes that belong together. BEGIN starts the group, COMMIT keeps it and ROLLBACK cancels it.',
        ],
      ],
      steps: [
        step(
          'Draw the relationship before writing SQL',
          'Write accounts.id → tickets.account_id and tickets.id → events.ticket_id. Read each arrow as one parent to many children. Store one row per status change so earlier changes remain visible after a later change.',
        ),
        step(
          'Make the rules part of the table',
          'CREATE TABLE names the columns and their rules. INTEGER stores whole numbers and TEXT stores text. REFERENCES parent(id) enforces parent existence when SQLite foreign keys are enabled on this connection. A required reference also needs NOT NULL. UNIQUE(account_id, number) allows the same number in different accounts and rejects repeats within one account.',
        ),
        step(
          'Write one allowed row before testing a failure',
          'INSERT INTO adds a row. First insert the parent, then the child using that parent ID. Try an orphan with a nonexistent parent or a repeated scoped ID. Record the error, the intended rule and the smallest correction. Never claim a rule works based only on reading its definition.',
        ),
        step(
          'Keep a ticket and its event together',
          'If a workflow must create a ticket and its first event as a pair, begin a transaction and write both. If either insert fails, the caller should issue ROLLBACK instead of committing the first write. A failed SQLite statement can leave earlier statements in the transaction pending.',
        ),
      ],
      example: {
        title: 'Give each studio its own rack of numbered shelves',
        setup:
          'Two studios can each have shelf number 1. Within one studio each number must be unique, and a shelf must belong to an existing studio.',
        steps: [
          'Enable foreign keys for this connection. The studio table defines its primary key. In shelves, the two-column uniqueness rule is scoped to one studio.',
          'The inserts create two different owners for shelf 1, which satisfies the rule. The SELECT lists each stored pair.',
          'Run once with valid data. Predict which part of the rule the requested edit will violate. Each run starts with a fresh practice database.',
        ],
        language: 'sql',
        artifact:
          'PRAGMA foreign_keys = ON;\nCREATE TABLE studios (id INTEGER PRIMARY KEY);\nCREATE TABLE shelves (\n  studio_id INTEGER NOT NULL REFERENCES studios(id),\n  shelf_no INTEGER NOT NULL,\n  UNIQUE(studio_id, shelf_no)\n);\nINSERT INTO studios VALUES (4),(5);\nINSERT INTO shelves VALUES (4,1),(5,1);\nSELECT studio_id, shelf_no FROM shelves ORDER BY studio_id;',
        result: 'studio_id | shelf_no\n4 | 1\n5 | 1',
        change:
          'Change the second shelf from (5,1) to (4,1). Predict which rule will reject the write. Restore the original pair and rerun to repair it.',
        changedResult:
          'UNIQUE constraint failed: shelves.studio_id, shelves.shelf_no',
      },
      task: {
        title: 'Audit a team-scoped case register',
        brief:
          'Check the proposed writes separately against the existing database. A case must reference a registered team. Each team may use a case number once. Allowed states are new and resolved.',
        source:
          'Existing teams: 2, 7\nExisting case: team 2, case 12, new\nA: team 7, case 12, new\nB: team 9, case 15, new\nC: team 2, case 12, resolved\nD: team 7, case 18, waiting',
        fields: [
          field(
            'Which one proposed insert succeeds?',
            'Enter the row letter.',
            ['A', 'row A'],
            'Check that the parent exists, that the team-number pair is new, and that the state is allowed.',
          ),
          field(
            'Which row specifically fails the foreign-key rule?',
            'Enter its letter.',
            ['B', 'row B'],
            'Look up each proposed team in the parent list.',
          ),
          field(
            'Which row collides with the scoped unique key?',
            'Enter its letter.',
            ['C', 'row C'],
            'Compare each team and case-number pair with the stored pair. A different state does not give an existing case a new identity.',
          ),
        ],
        evidence:
          'Complete the definitions of tickets and ticket_events in the project editor. The accounts table and one related set of inserts are supplied. Demonstrate a successful insert, deliberately try an orphan or duplicate, then repair it and rerun. Keep the relationship map and the actual rejected-write message with the successful result.',
        review: [
          'My map identifies one row in each table and its parent.',
          'My database permits a valid parent-child insert.',
          'I observed a rejected write and verified the correction.',
        ],
      },
      pitfalls: [
        fix(
          'A made-up parent ID was accepted.',
          'Check PRAGMA foreign_keys for this connection. Turn enforcement on before the transaction and confirm the child column actually declares REFERENCES.',
        ),
        fix(
          'A duplicate number is rejected across unrelated teams.',
          'Scope uniqueness to the pair of team ID and number. A single-column unique rule has a different meaning.',
        ),
      ],
    },
  });

  const tasks = window.ACADEMY_WORKSHOPS;
  const check = (label, code) => ({ label, code });
  Object.assign(tasks[2].task, {
    language: 'python',
    guide: [
      'The skill-lab function returns a label. The portfolio function below needs to report both the total and the label in a list. Work on one part at a time.',
      'Reuse the loop pattern from the interview example. Replace pass, a temporary instruction that does nothing, with an update using charge. Then replace the temporary label and implement the exact-cap rule.',
      'Keep the unit in dollars, preview the result and run all the checks. Add two more print calls beneath the function for limits one dollar above and below the same total.',
    ],
    starter:
      'def pilot_report(charges, cap):\n    total = 0\n    for charge in charges:\n        # Add this charge to the running total.\n        pass\n    label = "todo"\n    # Set label to "over" or "within" using the finished total.\n    return [total, label]\n\nprint(pilot_report([3, 4, 2], 9))',
    checks: [
      check(
        'Below the cap returns the total and within',
        'assert pilot_report([7, 3, 1], 12) == [11, "within"]',
      ),
      check(
        'An exact cap stays within, including a refund',
        'assert pilot_report([12, -4, 3], 11) == [11, "within"]',
      ),
      check(
        'One dollar above the cap returns over',
        'assert pilot_report([2, 6, 4], 11) == [12, "over"]',
      ),
      check(
        'An empty week totals zero',
        'assert pilot_report([], 8) == [0, "within"]',
      ),
    ],
    template:
      'Reporting period and units …\nBelow cap: inputs → observed total and label …\nAt cap …\nAbove cap …\nThe equality rule matters because …',
  });
  Object.assign(tasks[3].task, {
    language: 'python',
    guide: [
      'The starter has a subject, a queue and a count. The trimmed subject check and numeric conversion are supplied. Write a queue check that accepts billing and support after trimming and lowercasing.',
      'After conversion, return "count error" for negative numbers. For a valid row, return the integer so the caller can add it to the Week 2 list. A caller can use isinstance(answer, int) to tell an accepted integer from an error string.',
      'Run the supplied valid example, then add print calls for a blank subject, an unknown queue and a broken count. Save the actual messages and one accepted count. To reuse the Week 2 code, copy the whole pilot_report function from that project into this editor above the print lines. Each editor runs independently. Pass accepted counts as the list and a request-count cap, using requests as the unit on both sides.',
    ],
    starter:
      'def validate_ticket(row):\n    subject = row.get("subject", "").strip()\n    if subject == "":\n        return "subject error"\n    queue = row.get("queue", "").strip().lower()\n    # Reject unknown queues with "queue error".\n    try:\n        count = int(row.get("count", ""))\n    except ValueError:\n        return "count error"\n    # Reject negative counts with "count error".\n    return count\n\nprint(validate_ticket({"subject": "Invite lost", "queue": " Billing ", "count": " 2 "}))',
    checks: [
      check(
        'A normalized queue and valid zero return an integer',
        'assert validate_ticket({"subject":" OK ", "queue":" SUPPORT ", "count":"0"}) == 0',
      ),
      check(
        'A blank subject identifies the subject field',
        'assert validate_ticket({"subject":"   ", "queue":"billing", "count":"2"}) == "subject error"',
      ),
      check(
        'An unlisted queue identifies the queue field',
        'assert validate_ticket({"subject":"Retry", "queue":"sales", "count":"2"}) == "queue error"',
      ),
      check(
        'Invalid text and negative counts identify the count field',
        'assert all(validate_ticket({"subject":"Retry", "queue":"support", "count":s}) == "count error" for s in ("two", "-1", ""))',
      ),
    ],
    template:
      'Accepted row and returned count …\nRejected row and exact feedback …\nSecond rejection and feedback …\nCounts carried into the usage checker …',
  });
  Object.assign(tasks[4].task, {
    language: 'python',
    assetFiles: { 'input-rows.csv': 'assets/academy/input-rows.csv' },
    files: {
      'comma-test.csv': 'id,subject,minutes\nR-8,"Sync, then retry",2\n',
    },
    guide: [
      'The starter opens the supplied CSV by filename and passes a DictReader to report. Each parsed row has text fields id, subject and minutes. The supplied header check can reject an invalid file before reading its rows.',
      'Replace pass with the accepted-row updates. Use row["id"] when adding a bad ID to the rejected list. Return accepted count, valid minutes and rejected IDs in that order.',
      'Print the reports for both supplied files. Add a clean test, a bad duration and a quoted comma. To test CSV text without creating a file, csv.DictReader(StringIO(text)) reads from an in-memory text stream after from io import StringIO.',
    ],
    starter:
      'import csv\n\ndef report(reader):\n    if any(name not in (reader.fieldnames or []) for name in ["id", "subject", "minutes"]):\n        raise ValueError("Missing required header")\n    accepted = 0\n    minutes = 0\n    rejected = []\n    for row in reader:\n        raw = row["minutes"].strip()\n        if raw.isdigit():\n            # Count the accepted row and add its duration.\n            pass\n        else:\n            # Append this rejected row’s ID.\n            pass\n    return [accepted, minutes, rejected]\n\ndef read_report(filename):\n    with open(filename, newline="", encoding="utf-8") as source:\n        return report(csv.DictReader(source))\n\nprint(read_report("input-rows.csv"))\nprint(read_report("comma-test.csv"))',
    checks: [
      check(
        'CSV headers can appear in a different order',
        'from io import StringIO\nassert report(csv.DictReader(StringIO("minutes,id,subject\\n5,Q1,Hello\\n"))) == [1,5,[]]',
      ),
      check(
        'Quoted commas and zero minutes are valid',
        'from io import StringIO\nassert report(csv.DictReader(StringIO(\'id,subject,minutes\\nQ2,"One, two",0\\n\'))) == [1,0,[]]',
      ),
      check(
        'A bad duration is retained by ID',
        'from io import StringIO\nassert report(csv.DictReader(StringIO("id,subject,minutes\\nQA,Test,3\\nQB,Other,missing\\n"))) == [1,3,["QB"]]',
      ),
      check(
        'The supplied file reconciles with its rejected-row report',
        'assert read_report("input-rows.csv") == [3,19,["TKT-103"]]',
      ),
    ],
    template:
      'File tested …\nAccepted count, rejected IDs and total minutes …\nQuoted-comma input and observed result …\nA failing regression case and what fixed it …',
  });
  Object.assign(tasks[5].task, {
    language: 'python',
    guide: [
      'Complete build_register(rows) to return [index, conflicts]. Use the existing ID as a dictionary key. Preserve the first full record and append a repeated ID to the conflict log.',
      'Look up the account inside the returned index. Run a new pair with different IDs and the same subject to confirm that shared wording does not merge two tickets.',
      'Apply the category and arrival rule to the independent case, then write the expected and observed behavior, steps and impact for the incident. Label a possible cause as a hypothesis.',
    ],
    starter:
      'def build_register(rows):\n    index = {}\n    conflicts = []\n    for row in rows:\n        ticket_id = row["id"]\n        # Check whether ticket_id already exists.\n        # Preserve the first row and record the duplicate ID.\n        pass\n    return [index, conflicts]\n\nrows = [{"id":"P-5", "account":"Blue", "subject":"Export"},\n        {"id":"P-5", "account":"Grove", "subject":"Export"}]\nprint(build_register(rows))',
    checks: [
      check(
        'The index supports lookup by ID',
        'r = {"id":"F-4","account":"Finch","subject":"Hello"}\nassert build_register([r])[0]["F-4"] == r',
      ),
      check(
        'A conflict retains the original account and logs its ID',
        'a = {"id":"F-4","account":"Finch","subject":"Hello"}\nb = {"id":"F-4","account":"Elm","subject":"Other"}\nassert build_register([a,b]) == [{"F-4":a},["F-4"]]',
      ),
      check(
        'A shared subject with a fresh ID remains separate',
        'a={"id":"X-1","subject":"Same"}\nb={"id":"X-2","subject":"Same"}\nassert build_register([a,b]) == [{"X-1":a,"X-2":b},[]]',
      ),
    ],
    template:
      'Lookup and observed record …\nDuplicate policy and evidence …\nIncident ID …\nExpected …\nObserved …\nReproduction steps …\nImpact …\nNext check …',
  });
  Object.assign(tasks[6].task, {
    language: 'python',
    assetFiles: { 'tickets.csv': 'assets/academy/tickets.csv' },
    guide: [
      'The reader, field validation and duplicate handling are supplied so the release task can focus on connecting them to a report. The IDs are tracked in a set, a collection containing each value once. continue skips the current row and starts the next turn.',
      'Inside the loop, complete the open-status branch. Count eligible tickets, add their minutes and append [row["queue"], key] to triage. Sorting these pairs groups open work by queue and breaks ties by ticket ID. The fixture contains no severity, so this view makes no urgency claim. Return the four outputs in the supplied order.',
      'Keep three repeatable assertions in the downloaded file. One empty-input assertion is supplied. Directly under it, create a small list of dictionaries with id, status, minutes and queue fields. Add assert release_report(rows)[1] == 1 for a fixture with one open ticket and one pending ticket. Add an assertion for the triage list and total when that open ID is sent again. Calculate those expected values first. Running python3 toolkit.py or py toolkit.py reruns every saved assertion before printing the full-file report.',
      'Use Download code, rename week-6-project.py to toolkit.py and keep tickets.csv beside it. In that folder, run python3 toolkit.py on macOS or Linux, or py toolkit.py on Windows. Record a failing example, the fix and a short README. Follow the Git steps in the lesson to capture the change locally or use GitHub’s file editor to keep a commit history.',
    ],
    starter:
      'import csv\n\ndef release_report(rows):\n    seen = set()\n    open_count = 0\n    open_minutes = 0\n    triage = []\n    for row in rows:\n        key = row["id"].strip()\n        raw = row["minutes"].strip()\n        if not key or not raw.isdigit() or key in seen:\n            continue\n        seen.add(key)\n        if row["status"] == "open":\n            # Count this open ticket, add its minutes and append its queue/ID pair.\n            pass\n    return [sorted(seen), open_count, open_minutes, sorted(triage)]\n\nassert release_report([]) == [[], 0, 0, []]\n# Add two small fixture assertions here for the downloaded handoff.\n\nwith open("tickets.csv", newline="", encoding="utf-8") as source:\n    result = release_report(csv.DictReader(source))\nprint("Accepted IDs:", len(result[0]))\nprint("Open count and minutes:", result[1], result[2])\nprint("Open triage by queue and ID:", result[3])',
    checks: [
      check(
        'Every ID in the 50-row release fixture is preserved',
        'with open("tickets.csv", newline="", encoding="utf-8") as f:\n    fixture = list(csv.DictReader(f))\nassert len(fixture)==50 and release_report(fixture)[0] == sorted(row["id"] for row in fixture)',
      ),
      check(
        'Open count, total and sorted triage rows match the full fixture',
        'with open("tickets.csv", newline="", encoding="utf-8") as f:\n    fixture = list(csv.DictReader(f))\nresult = release_report(fixture)\nassert result[1:3] == [12,180]\nassert result[3] == sorted([[r["queue"],r["id"]] for r in fixture if r["status"]=="open"])',
      ),
      check(
        'A repeated ID, a pending ticket and a zero are handled correctly',
        'rows=[{"id":"Z","minutes":"0","status":"open","queue":"access"},{"id":"Z","minutes":"40","status":"open","queue":"billing"},{"id":"Y","minutes":"17","status":"pending","queue":"access"}]\nassert release_report(rows) == [["Y","Z"],1,0,[["access","Z"]]]',
      ),
    ],
    template:
      'Run command and required files …\nExpected and observed IDs, count, minutes and triage rows …\nBug fixture, failure and repair …\nGit commit or history reference …\nKnown limit and clean-folder check …',
  });
  Object.assign(tasks[7].task, {
    language: 'sql',
    guide: [
      'This project database is preloaded with the 50 tickets and two accounts from the project downloads. The separate graded skill lab uses its own smaller fixture. The project tables have accounts(id, name) and tickets(id, account_id, queue, status, minutes, subject).',
      'A view is a named query. Keep the three view names and the column names in parentheses so the checks can read the results. Replace each starter SELECT. The first view must show every account with an open count, including zero. The second groups all handling minutes by queue. The third lists ticket IDs with no matching account.',
      "Run the code. The SELECT statements at the bottom display one output row per account, queue or unmatched ticket. To hand-check a group, add SELECT id, minutes FROM tickets WHERE queue = 'access'; and total those values. The supplied data can legitimately produce an empty exception report. The project checks also introduce a temporary unmatched row to test that the report can detect it.",
    ],
    starter:
      'CREATE VIEW open_by_account(account_name, open_count) AS\nSELECT name, 0 FROM accounts;\n\nCREATE VIEW minutes_by_queue(queue, total_minutes) AS\nSELECT queue, 0 FROM tickets GROUP BY queue;\n\nCREATE VIEW unmatched_tickets(ticket_id) AS\nSELECT id FROM tickets WHERE 1 = 0;\n\nSELECT * FROM open_by_account ORDER BY account_name;\nSELECT * FROM minutes_by_queue ORDER BY queue;\nSELECT * FROM unmatched_tickets ORDER BY ticket_id;',
    checks: [
      check(
        'Each supplied account has the correct open count',
        "SELECT COUNT(*)=2 AND SUM(CASE WHEN account_name IN ('Orbit','Nova') AND open_count=6 THEN 1 ELSE 0 END)=2 AND COUNT(DISTINCT account_name)=2 FROM open_by_account;",
      ),
      check(
        'A new account without a ticket remains in the result',
        "BEGIN; INSERT INTO accounts VALUES (981,'Fictional QA'); SELECT COUNT(*)=1 FROM open_by_account WHERE account_name='Fictional QA' AND open_count=0; ROLLBACK;",
      ),
      check(
        'The queue totals reconcile with all 50 records',
        "SELECT COUNT(*)=3 AND COUNT(DISTINCT queue)=3 AND SUM(CASE WHEN (queue='access' AND total_minutes=228) OR (queue='billing' AND total_minutes=258) OR (queue='exports' AND total_minutes=262) THEN 1 ELSE 0 END)=3 FROM minutes_by_queue;",
      ),
      check(
        'Only the unmatched ticket appears in an exception report',
        "BEGIN; INSERT INTO tickets VALUES ('QA-UNLINKED',989,'billing','open',7,'Example'); SELECT COUNT(*)=1 AND MIN(ticket_id)='QA-UNLINKED' FROM unmatched_tickets; ROLLBACK;",
      ),
    ],
    template:
      'Query and row grain for each view …\nHand calculation from a few records …\nActual result and any excluded tickets …',
  });
  Object.assign(tasks[8].task, {
    language: 'sql',
    guide: [
      'The base tables and sample inserts are supplied. In tickets, make account_id refer to accounts(id), restrict status to open or closed, and enforce a unique (account_id, number) pair. In ticket_events, make ticket_id refer to tickets(id). Keep all required columns.',
      "For allowed text values, attach a condition such as CHECK (state IN ('draft','sent')) to a column, using the actual column name and allowed values for tickets. A table-level UNIQUE goes after the column definitions, separated by a comma.",
      'Run a valid insert first. Then change the ticket parent in the sample from 3 to 99 to try an orphan. Record the error and restore the original for the final run. The same ticket number in two different accounts should be allowed.',
    ],
    starter:
      "PRAGMA foreign_keys = ON;\nCREATE TABLE accounts (id INTEGER PRIMARY KEY);\nCREATE TABLE tickets (\n  id INTEGER PRIMARY KEY,\n  account_id INTEGER NOT NULL,\n  number INTEGER NOT NULL,\n  status TEXT NOT NULL\n  -- Add the required constraints above or after the columns.\n);\nCREATE TABLE ticket_events (\n  id INTEGER PRIMARY KEY,\n  ticket_id INTEGER NOT NULL,\n  status TEXT NOT NULL,\n  occurred_at TEXT NOT NULL\n);\nINSERT INTO accounts VALUES (3),(4);\nINSERT INTO tickets VALUES (10,3,1,'open');\nINSERT INTO ticket_events VALUES (21,10,'open','2026-01-07T09:00:00Z');\nSELECT tickets.id, ticket_events.status FROM tickets\nJOIN ticket_events ON ticket_events.ticket_id=tickets.id;",
    checks: [
      check(
        'A ticket references its account and an event references its ticket',
        "SELECT (SELECT * FROM pragma_foreign_keys)=1 AND EXISTS(SELECT 1 FROM pragma_foreign_key_list('tickets') WHERE \"table\"='accounts' AND \"from\"='account_id' AND \"to\"='id') AND EXISTS(SELECT 1 FROM pragma_foreign_key_list('ticket_events') WHERE \"table\"='tickets' AND \"from\"='ticket_id' AND \"to\"='id');",
      ),
      check(
        'An allowed parent and child produce a joined status',
        "SELECT COUNT(*)=1 FROM tickets JOIN ticket_events ON ticket_events.ticket_id=tickets.id WHERE tickets.id=10 AND ticket_events.status='open';",
      ),
      check(
        'A ticket number can repeat across accounts but only once within one',
        "BEGIN; INSERT OR IGNORE INTO tickets VALUES (90,3,1,'open'),(91,4,1,'open'); SELECT COUNT(*)=1 AND MIN(id)=91 FROM tickets WHERE id IN (90,91); ROLLBACK;",
      ),
      check(
        'A disallowed ticket status cannot be stored',
        "BEGIN; INSERT OR IGNORE INTO tickets VALUES (92,3,71,'waiting'); SELECT COUNT(*)=0 FROM tickets WHERE id=92; ROLLBACK;",
      ),
    ],
    template:
      'Relationship map and row grain …\nAllowed insert and observed row …\nRejected insert and exact database message …\nCorrection and final result …',
  });
  // Snapshot of the two CSV files supplied with the Week 7 portfolio project.
  tasks[7].task.setupSql =
    "CREATE TABLE accounts (id INTEGER PRIMARY KEY, name TEXT);\nINSERT INTO accounts VALUES\n(10,'Orbit'),\n(20,'Nova');\nCREATE TABLE tickets (id TEXT PRIMARY KEY, account_id INTEGER, queue TEXT, status TEXT, minutes INTEGER, subject TEXT);\nINSERT INTO tickets VALUES\n('TKT-001',10,'access','open',0,'Invite status 1'),\n('TKT-002',20,'exports','open',8,'Export availability 2'),\n('TKT-003',10,'billing','open',12,'Billing review 3'),\n('TKT-004',20,'access','open',16,'Invite status 4'),\n('TKT-005',10,'exports','open',20,'Export availability 5'),\n('TKT-006',20,'billing','open',24,'Billing review 6'),\n('TKT-007',10,'access','open',9,'Invite status 7'),\n('TKT-008',20,'exports','open',11,'Export availability 8'),\n('TKT-009',10,'billing','open',14,'Billing review 9'),\n('TKT-010',20,'access','open',18,'Invite status 10'),\n('TKT-011',10,'exports','open',22,'Export availability 11'),\n('TKT-012',20,'billing','open',26,'Billing review 12'),\n('TKT-013',10,'access','pending',19,'Invite status 13'),\n('TKT-014',20,'exports','pending',26,'Export availability 14'),\n('TKT-015',10,'billing','pending',8,'Billing review 15'),\n('TKT-016',20,'access','pending',15,'Invite status 16'),\n('TKT-017',10,'exports','pending',22,'Export availability 17'),\n('TKT-018',20,'billing','pending',4,'Billing review 18'),\n('TKT-019',10,'access','closed',11,'Invite status 19'),\n('TKT-020',20,'exports','closed',18,'Export availability 20'),\n('TKT-021',10,'billing','closed',25,'Billing review 21'),\n('TKT-022',20,'access','closed',7,'Invite status 22'),\n('TKT-023',10,'exports','closed',14,'Export availability 23'),\n('TKT-024',20,'billing','closed',21,'Billing review 24'),\n('TKT-025',10,'access','closed',3,'Invite status 25'),\n('TKT-026',20,'exports','closed',10,'Export availability 26'),\n('TKT-027',10,'billing','closed',17,'Billing review 27'),\n('TKT-028',20,'access','closed',24,'Invite status 28'),\n('TKT-029',10,'exports','closed',6,'Export availability 29'),\n('TKT-030',20,'billing','closed',13,'Billing review 30'),\n('TKT-031',10,'access','closed',20,'Invite status 31'),\n('TKT-032',20,'exports','closed',27,'Export availability 32'),\n('TKT-033',10,'billing','closed',9,'Billing review 33'),\n('TKT-034',20,'access','closed',16,'Invite status 34'),\n('TKT-035',10,'exports','closed',23,'Export availability 35'),\n('TKT-036',20,'billing','closed',5,'Billing review 36'),\n('TKT-037',10,'access','closed',12,'Invite status 37'),\n('TKT-038',20,'exports','closed',19,'Export availability 38'),\n('TKT-039',10,'billing','closed',26,'Billing review 39'),\n('TKT-040',20,'access','closed',8,'Invite status 40'),\n('TKT-041',10,'exports','closed',15,'Export availability 41'),\n('TKT-042',20,'billing','closed',22,'Billing review 42'),\n('TKT-043',10,'access','closed',4,'Invite status 43'),\n('TKT-044',20,'exports','closed',11,'Export availability 44'),\n('TKT-045',10,'billing','closed',18,'Billing review 45'),\n('TKT-046',20,'access','closed',25,'Invite status 46'),\n('TKT-047',10,'exports','closed',7,'Export availability 47'),\n('TKT-048',20,'billing','closed',14,'Billing review 48'),\n('TKT-049',10,'access','closed',21,'Invite status 49'),\n('TKT-050',20,'exports','closed',3,'Export availability 50');";
})();
