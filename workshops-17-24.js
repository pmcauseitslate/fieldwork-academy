// The examples and cases below are fictional. No external tool calls or paid services are needed.
window.ACADEMY_WORKSHOPS = window.ACADEMY_WORKSHOPS || {};
(() => {
  const approvalExample = `def invite_status(current_version, approved_version, receipt):
    if receipt:
        return "already sent"
    if current_version != approved_version:
        return "needs review"
    return "ready to send"

print(invite_status(3, 2, ""))
print(invite_status(3, 3, "R-8"))`;

  const releaseExample = `def release_check(package, tested_package, wrong_routes):
    if package != tested_package:
        return "hold"
    if wrong_routes > 0:
        return "hold"
    return "promote"

assert release_check("v4", "v3", 0) == "hold"
assert release_check("v4", "v4", 1) == "hold"
print(release_check("v4", "v4", 0))`;

  const pilotExample = `def print_pickup_card(waiting_minutes, owner_present):
    if waiting_minutes >= 30 and owner_present:
        return "show pickup card"
    return "skip"

print(print_pickup_card(30, True))
print(print_pickup_card(42, False))
print(print_pickup_card(12, True))`;

  const costExample = `def break_even(fixed_cents, contribution_cents):
    if contribution_cents <= 0:
        return "no positive contribution"
    units = 0
    while units * contribution_cents < fixed_cents:
        units = units + 1
    return units

review_minutes = 8
cost_cents = 200 + review_minutes * 50
contribution_cents = 1900 - cost_cents
print(contribution_cents)
print(break_even(10000, contribution_cents))`;

  Object.assign(window.ACADEMY_WORKSHOPS, {
    17: {
      bridge:
        'Week 16 produced an answer with a source ID, or an explanation of the missing evidence. This week adds a decision about what happens to that answer when a model asks to use a tool.',
      goal: 'Build an approval check that can explain why a draft was stopped, sent for review or accepted for a later action.',
      terms: [
        [
          'Tool contract',
          'The name of an allowed action, the fields it accepts and the type of value each field requires.',
        ],
        [
          'State',
          'A label for where one request currently is, such as waiting for review.',
        ],
        [
          'Revision',
          'The exact version of a draft. Editing the text or recipient creates a new revision.',
        ],
        [
          'Operation ID and receipt',
          'The operation ID names one intended action across retries. A receipt records a previously completed action with that ID.',
        ],
      ],
      steps: [
        {
          title: 'Separate a suggestion from an action',
          body: 'A model can propose a draft. The application looks up the account, checks the person’s permissions and confirms that the source supports the message. A plausible-looking account number still needs a real, authorized match. Instructions inside a customer message are content to evaluate.',
        },
        {
          title: 'Follow one draft through review',
          body: 'Write its states in order. Receive the ticket, look up an allowed source, validate the arguments, show the recipient and text to a reviewer, then execute the approved revision. After execution, store the receipt with the operation ID. A rejection ends that attempt. A change goes back to review.',
        },
        {
          title: 'Read the decision from the top down',
          body: 'In Python, != asks whether two values differ. An empty pair of quotes, "", is empty text. The example checks a receipt for this exact operation and revision first. A nonempty receipt means the action already happened. Each return ends the function immediately.',
        },
        {
          title: 'Trace failures without sending anything',
          body: 'Use a state table with one row per event. A missing field stops validation. A request outside the allowed policy goes to a person. A repeated completed operation reuses its receipt. Set a maximum number of retries and name who takes over when that limit is reached.',
        },
      ],
      example: {
        title: 'Decide whether a workshop invitation is ready',
        setup:
          'A fictional organizer approved version 2 of invitation A. Version 3 changes its room. Invitation B already has receipt R-8 for its exact current revision. Predict the two status lines.',
        steps: [
          'In the first call, the empty receipt means nothing has been sent. Compare current version 3 with approved version 2.',
          'In the second call, R-8 belongs to that invitation and revision. The first return ends the check before it reaches the version comparison.',
          'The program reports a decision only. An actual sender would also need permission checks and a stored receipt.',
        ],
        language: 'python',
        artifact: approvalExample,
        result: 'needs review\nalready sent',
        change:
          'In the first print call only, change the approved version from 2 to 3. Keep the receipt empty. Predict which line will change.',
        changedCode: approvalExample.replace('3, 2, ""', '3, 3, ""'),
        changedResult: 'ready to send\nalready sent',
      },
      task: {
        title: 'Route an onboarding handoff',
        brief:
          'Beacon’s fictional support team drafts a handoff from an approved article. Implement the rule for a valid proposal, then trace what happens when its inputs or history change.',
        source:
          'Only create_draft is allowed. Its arguments are ticket_id (whole number), article_id (text) and summary (text). For event H-31, ticket 40 exists, article K-2 is approved and the summary is present. A reviewer approves version 1. Before delivery, the summary changes to version 2. Event H-38 for ticket 51 has already completed with receipt RC-51. Two identical deliveries of H-38 arrive.',
        fields: [
          {
            label:
              'Which revision now needs review for H-31? Enter its number.',
            hint: 'Compare the approved content with the version that would actually be delivered.',
            answers: ['2', 'v2', 'version 2', 'revision 2'],
            feedback:
              'Approval belongs to the specific text and recipient the reviewer saw.',
          },
          {
            label:
              'How many additional handoffs should the two H-38 deliveries create?',
            hint: 'Find the stable event ID and see whether its action already has a receipt.',
            answers: ['0', 'zero', 'none'],
            feedback:
              'A retry of a completed operation returns the existing receipt.',
          },
        ],
        language: 'python',
        starter: `def handoff_route(source_ok, current_revision, approved_revision):
    # Return "hold" if the source is missing or outside policy.
    # Otherwise return "review" for a revision mismatch and "ready" for a match.
    return "todo"

print(handoff_route(True, 2, 1))`,
        checks: [
          {
            label: 'Unapproved source stops even an approved revision',
            code: 'assert handoff_route(False, 2, 2) == "hold"',
          },
          {
            label: 'Changed content needs fresh approval',
            code: 'assert handoff_route(True, 2, 1) == "review"',
          },
          {
            label: 'A supported and approved revision is ready',
            code: 'assert handoff_route(True, 4, 4) == "ready"',
          },
        ],
        guide: [
          'Keep the function name and the three input names. Test source_ok first. Use if not source_ok to check for a missing or disallowed source. The final print call tries a changed revision. After it prints review, change its first input to False and rerun. A missing source must hold delivery.',
          'Write the tool contract and make a trace row for the ordinary path, a missing summary, an unknown ticket, a rejection, an edit and a replay. Give each row its own operation or clearly mark it as a retry.',
          'Record who can approve, the revision they saw, and which state produced a receipt. Explain which check belongs in the application even when the model sounds certain.',
        ],
        evidence:
          'Save the routing function, its test results and a state table showing one approved action and each stop or replay. Reuse a source ID from Week 16 or use fictional K-2.',
        template:
          'Allowed tool and field types\nTrusted source and lookup\n\nEvent | Revision | Validation | Reviewer decision | Next state | Receipt\nOrdinary request\nMissing field\nUnknown ticket or outside policy\nRejection\nEdit after approval\nDuplicate event\n\nRetry limit and handoff owner',
        review: [
          'I checked a source and an authorized ticket before approving a draft.',
          'I recorded the exact revision and the replay outcome.',
          'My trace shows a rejection and a path for missing or out-of-policy inputs.',
        ],
      },
      pitfalls: [
        {
          symptom: 'A second delivery makes a second draft.',
          fix: 'Use the stable event ID to look up the first draft and its receipt. A newly generated ID for each retry cannot connect the two deliveries.',
        },
        {
          symptom: 'The edited text inherits an earlier approval.',
          fix: 'Store the approved revision with the decision. Compare it with the revision that would be delivered.',
        },
      ],
    },
    18: {
      bridge:
        'Week 17 traced one proposed action through review. Now keep several of those traces, label their expected routes, and check whether a new workflow catches every case that requires a person.',
      goal: 'Score two versions on the same cases and make a release decision a reviewer can reproduce.',
      terms: [
        [
          'Rubric',
          'A written rule that gives two readers a consistent way to mark one response as a pass or a failure.',
        ],
        [
          'Regression case',
          'A previously seen example rerun to check that a change still handles known behavior.',
        ],
        [
          'Held-out case',
          'A fresh example kept separate while revising the workflow. Opening its expected label too early weakens the fresh check.',
        ],
        [
          'Recall and precision',
          'Recall asks how many required reviews were caught. Precision asks how many flagged cases genuinely required review. Each has a different denominator.',
        ],
      ],
      steps: [
        {
          title: 'Set the gate before scoring',
          body: 'Define what one case gets judged on. For routing, compare the assigned action with the expected action. For a critical slice such as all billing changes, write a separate gate. Record what would require a hold even if the average improves.',
        },
        {
          title: 'Compare like with like',
          body: 'Run both versions on the same held-out inputs after freezing their rules. Count each case once. Keep the Week 15 practice cases as regressions. Avoid changing a prompt after seeing a held-out answer and counting that same answer as fresh evidence.',
        },
        {
          title: 'Count misses and false alarms separately',
          body: 'For recall, circle every row that needed review. Count how many circled rows actually went to review, divide by all circled rows and multiply by 100. For precision, start with every row that was flagged. An unnecessary review uses staff time, while a missed required review crosses the gate.',
        },
        {
          title: 'Explain disagreements and failures',
          body: 'Two reviewers can score a small overlap independently. If working alone, write two plausible readings of an unclear case and record that there was one reviewer. Clarify the rule and rescore affected rows. For a failure, inspect whether the source was absent, its meaning was misused, the wrong tool was proposed or the review step was skipped.',
        },
      ],
      example: {
        title: 'Judge a change to a registration desk',
        setup:
          'A rehearsal compares a baseline and a candidate on ten fictional registrations. Write a decision before looking at the aggregate improvement.',
        steps: [
          'Fix the gate at full recall for four changes that require approval. All other cases still count toward the overall score.',
          'For each version, divide correct overall by ten. Then divide correctly routed approval cases by four.',
          'Read the two measures together. A larger overall score can coexist with a missed mandatory review.',
        ],
        language: 'case',
        artifact:
          'Acceptance gate written before the run: all four approval cases reach a person.\nBaseline: 7/10 correct overall, 4/4 approval cases sent for review.\nCandidate: 9/10 correct overall, 3/4 approval cases sent for review.\nMiss E-4: the correct passage was present. The workflow picked immediate enrollment instead of the review tool.',
        result:
          'Hold the candidate. Overall accuracy rose from 70% to 90%, but required-review recall fell from 100% to 75%. E-4 is a tool-selection failure.',
        change:
          'Suppose the immediate-enrollment action on E-4 is the only wrong candidate response. A repair routes E-4 to review, and both suites are rerun with all other results unchanged. Which gate and overall score would now be observed?',
        changedResult:
          'The candidate meets the rehearsal gate at 4/4 required reviews and scores 10/10 overall. A fresh set would be needed to test beyond these rehearsed cases.',
      },
      task: {
        title: 'Decide whether Beacon can release its new handoff route',
        brief:
          'The release rule requires every access change to reach a person. Use the new case counts to make the decision, then use the academy release files to build a fuller evaluation sheet.',
        source:
          'A separate fictional run contains 20 requests, including 5 access changes. The baseline handles 15/20 correctly and routes 5/5 access changes to review. The candidate handles 18/20 correctly. It routes 4 access changes and 2 ordinary requests to review. One access-change request bypasses the reviewer.',
        fields: [
          {
            label:
              'What is the candidate’s required-review recall? Enter a percent.',
            hint: 'Use the number of access changes as the denominator.',
            answers: ['80', '80%', '80 %', '80 percent', '80.0', '80.0%'],
            feedback:
              'Count genuine access changes caught and divide by every access change in the run.',
          },
          {
            label: 'How many ordinary requests caused extra review work?',
            hint: 'Read the number of ordinary requests incorrectly flagged by the candidate.',
            answers: ['2', 'two'],
            feedback:
              'Extra review work comes from false alarms, separate from missed access changes.',
          },
          {
            label: 'Under the declared rule, enter release or hold.',
            hint: 'Apply the mandatory access-change gate before interpreting the overall score.',
            answers: ['hold', 'hold release', 'hold the release'],
            feedback:
              'Look at the one required path that bypassed its reviewer.',
          },
        ],
        guide: [
          'Write the rule and freeze the candidate. Start with the 20 labeled Week 15 cases for regression. Keep these results separate from the 12 fresh Week 18 requests.',
          'Open the release input file first. Record a route for each request, or explicitly label the comparison as a review of two supplied simulated runs. Then open the separate routing key and score expected, baseline and candidate by case ID. The interactive release comparison can check the arithmetic.',
          'For at least three misses across the two suites, enter the observed and expected action. Inspect the trace before naming a stage. If the files only show the route, record the observed routing failure and the stage that needs investigation.',
          'Write one ambiguity in the rubric, clarify it and rescore the affected cases. End with a decision, a repair owner and a fresh retest.',
        ],
        evidence:
          'Save a scored table with the two suite sizes, the counts behind each reported percentage, the critical misses and a reasoned gate decision. Label each result as simulated or observed.',
        template:
          'Frozen version and release gate\n\nCase ID | Suite | Expected | Baseline | Candidate | Failure or next investigation\n\nOverall counts and critical-slice recall\nThree failure traces\nAmbiguity, clarified rule and rescore\nDecision and next retest',
        review: [
          'I kept known regression cases and fresh cases in separate counts.',
          'I reported required-review recall with its numerator and denominator.',
          'I identified a missed case, a rubric ambiguity and the next release decision.',
        ],
      },
      pitfalls: [
        {
          symptom:
            'The two unnecessary reviews were counted as missed approvals.',
          fix: 'Make separate columns for the required and observed route. A flagged ordinary request is a false alarm. A required request left unflagged is a miss.',
        },
        {
          symptom:
            'The candidate was revised after inspecting the release labels.',
          fix: 'Keep the run as a regression result. Freeze the revised candidate and reserve a new set for its next fresh comparison.',
        },
      ],
    },
    19: {
      bridge:
        'Week 18 left a scored failure with a case ID. Use one such failure as evidence for a small product change that an engineer can build and an operator can test.',
      goal: 'Write a one-page brief that names the user, states a falsifiable outcome and turns the most uncertain requirement into a small test.',
      terms: [
        [
          'Baseline',
          'A measurement of the existing workflow, with its task, unit, group and time window.',
        ],
        ['Hypothesis', 'A prediction a future test could disprove.'],
        [
          'Acceptance criterion',
          'A condition a tester can set up and an outcome the tester can observe.',
        ],
        [
          'Backlog and non-goals',
          'A backlog orders work the team might do. Non-goals name related work intentionally left out of this pilot.',
        ],
      ],
      steps: [
        {
          title: 'Write down what actually happened',
          body: 'Start with one user doing one job. Record the observation and its source, such as two missed approvals in eight rehearsals. A quote can explain a problem. Counts from a rehearsal describe that sample. A future improvement belongs under hypothesis.',
        },
        {
          title: 'Turn an adjective into a check',
          body: 'Replace a wish such as “make the queue useful” with a setup, action and visible result. To test “before today,” choose one item from yesterday, another due today and a closed item. Check one other account to confirm that users only see permitted items.',
        },
        {
          title: 'Prioritize uncertainty',
          body: 'Write four backlog cards. Give each an owner, an observable outcome and anything it depends on. When two explanations fit the evidence, a cheap diagnostic can decide which feature to build. State what the team will postpone and what new evidence would change the order.',
        },
      ],
      example: {
        title: 'Specify a reminder for uncollected equipment',
        setup:
          'A learning center wants to prevent forgotten pickups. The product lead observed two late pickups in eight rehearsals. The desk originally proposes a large scheduling redesign.',
        steps: [
          'State the observed rate as 2/8, or 25%, in the rehearsal. Identify the desk coordinator as the person who takes action.',
          'Make a smaller rule testable. Show an open pickup assigned to the coordinator when its due date is before the review date. Specify an ordinary case, the date boundary and a case from another coordinator.',
          'Run the visibility check before redesigning the schedule. Postpone calendar integration until a trial shows that coordinators act on a reminder.',
        ],
        language: 'case',
        artifact:
          'Review date: 12 June. Signed-in coordinator: Lee.\nP1 | Lee | open   | due 11 June\nP2 | Lee | open   | due 12 June\nP3 | Lee | closed | due 10 June\nP4 | Sam | open   | due 10 June\nAcceptance: show only Lee’s open pickups due before 12 June.\nBacklog: check the existing list → implement the rule → add boundary tests → observe the next rehearsal.',
        result:
          'P1 is the only item shown. P2 sits on the date boundary, P3 is closed and P4 belongs to another coordinator. The 25% baseline supplies a comparison for a future rehearsal.',
        change:
          'The product lead changes “before the review date” to “on or before the review date.” Predict exactly which ID joins the list.',
        changedResult:
          'P2 joins P1. Its date now qualifies. The ownership and status checks stay the same.',
      },
      task: {
        title: 'Write a brief for missing-source handoffs',
        brief:
          'Beacon is considering a warning that helps a lead return unsupported drafts to their owners. Use a small rehearsal to set the baseline and choose what to test first.',
        source:
          'In 12 fictional handoff rehearsals, 3 drafts reached a lead without a source. Two explanations are plausible: the submitter never chose a source, or the transfer removed its ID. Today is 15 July. Lead A may see only team A’s open drafts missing a source and created before today. H1 = A/open/no source/14 July. H2 = A/open/no source/15 July. H3 = B/open/no source/12 July. H4 = A/open/has source/10 July.',
        fields: [
          {
            label:
              'What percentage of the 12 rehearsals reached the lead without a source?',
            hint: 'Divide the count with the observed problem by all rehearsals, then multiply by 100.',
            answers: ['25', '25%', '25 %', '25 percent', '25.0', '25.0%'],
            feedback:
              'Keep the three observed misses over the twelve rehearsals. The proposed future goal belongs in a different line.',
          },
          {
            label: 'Which single draft ID should the warning list show?',
            hint: 'Apply team, status, source presence and date to each row.',
            answers: ['h1', 'H1', 'H-1'],
            feedback:
              'Every condition has to hold for the same row. The review date itself falls outside “before today.”',
          },
        ],
        guide: [
          'Draw the current path as submitter → transfer → lead. Label where each team can first see the source ID. State the current rehearsal baseline and choose a future target and test window.',
          'Write a test for H1, one for the date boundary and one for the other team. Define what appears on screen for each.',
          'Order four backlog items. Start with an inexpensive way to see where a missing source first disappears. Name an owner, an explicit non-goal, and the result that would reorder the remaining work.',
        ],
        evidence:
          'Write a one-page decision brief. Include one observed fact, one assumption, an acceptance table, four ordered backlog items and a decision that depends on the diagnostic.',
        template:
          'User and job\nCurrent workflow and owners\nEvidence source, sample and baseline\nHypothesis, future measure and time window\n\nGiven | Action | Expected visible result\n\nFour ordered backlog items with owners\nNon-goal and reason\nAssumption that could change the plan',
        review: [
          'My baseline identifies the rehearsal and its sample size.',
          'My acceptance tests include an ordinary case, the date boundary and account scope.',
          'My backlog explains which uncertainty the first task resolves.',
        ],
      },
      pitfalls: [
        {
          symptom:
            'The brief says the warning reduced errors before any trial.',
          fix: 'Move the reduction to the hypothesis. Keep measured baseline and future target on different lines.',
        },
        {
          symptom: 'Two team members disagree about “recently overdue.”',
          fix: 'Write the reference date, the exact comparison, the status and the person allowed to see the record. Test the boundary itself.',
        },
      ],
    },
    20: {
      bridge:
        'Week 19 defined acceptance tests and Week 18 defined a quality gate. Turn those promises into a repeatable release check, then trace what to do if a pilot runs slowly.',
      goal: 'Use a reproducible check, a measured stop rule and a named rollback owner to make and explain a release decision.',
      terms: [
        [
          'Continuous integration (CI)',
          'A process that runs the same checks when a proposed code change is submitted. A local or in-browser run can rehearse the same decision.',
        ],
        [
          'Staging and artifact',
          'Staging is a rehearsal environment. An artifact is the identified build the team tests there and then promotes.',
        ],
        [
          'Trace, log and metric',
          'A trace ID links the stages of one request. A log records an event. A metric summarizes many events, such as the failure rate in five minutes.',
        ],
        [
          'Rollback',
          'Restoring a known previous release, followed by checks that verify service and quality have recovered.',
        ],
      ],
      steps: [
        {
          title: 'Identify the thing being checked',
          body: 'Start from one commit, a saved version of the source. Use the recorded dependency versions, run deterministic tests, then build and label a package. A staging smoke test sends one representative request through the package. Promote that exact package once it passes.',
        },
        {
          title: 'Make a small test repeatable',
          body: 'Python’s assert compares what happened with what should have happened. A false comparison raises an error. In the example, two asserts test expected hold decisions. If they succeed, the final print displays the decision for a third case. A CI report should include the failing case and expected and observed outcomes.',
        },
        {
          title: 'Follow one request across the system',
          body: 'Sketch interface → service → source lookup → draft → reviewer. Mark which component checks customer scope and which steps a person must approve. Record a request ID, a stage, a duration and an error class. These fields can connect slow stages without storing raw tickets, customer text or secret keys.',
        },
        {
          title: 'Make a decision from a window of evidence',
          body: 'A slow trace suggests where to investigate. A stop rule uses measurements across the specified time windows. A value called p95 describes a time at or below which roughly 95% of the measured requests finished. After rollback, run both the health check and the Week 18 quality gate.',
        },
      ],
      example: {
        title: 'Promote a checked volunteer-roster build',
        setup:
          'A roster update can ship only when its version matches the staged build and the review-routing tests have zero failures. Run the check and read its final decision.',
        steps: [
          'Compare the two package labels. Different labels mean the staged test does not establish anything about this candidate.',
          'Check the count of wrong routes. A single wrong route triggers the hold rule.',
          'The first two calls live inside assertions. Only the third call is printed. This gives a compact check the team can repeat.',
        ],
        language: 'python',
        artifact: releaseExample,
        result: 'promote',
        change:
          'In the final print call only, replace the zero wrong routes with 2. Leave the two assertions in place and predict the release decision.',
        changedCode: releaseExample.replace(
          'print(release_check("v4", "v4", 0))',
          'print(release_check("v4", "v4", 2))',
        ),
        changedResult: 'hold',
      },
      task: {
        title: 'Rehearse a rollback for Beacon’s handoff queue',
        brief:
          'The release lead needs one check that handles a noisy window without ignoring a sustained failure. Implement that check and use a trace to write two different incident updates.',
        source:
          'Version B7 is in a fictional pilot. The predeclared stop rule is more than 4 failures per 100 requests in two consecutive five-minute windows. Observed failures per 100: 10:00 → 3, 10:05 → 5, 10:10 → 7. Trace H-206 at 10:10 recorded validation 30 ms, source lookup 1,400 ms and draft rendering 90 ms. Previous package B6 passed the earlier gate. An operations lead owns rollback.',
        fields: [
          {
            label:
              'At the end of which listed window is rollback first triggered? Enter the window label.',
            hint: 'Mark the first pair of adjacent counts both above the threshold.',
            answers: ['10:10', '10.10', '1010', '10:10 window'],
            feedback:
              'One breach alone keeps the pilot under observation. The stop rule needs adjacent breaches.',
          },
          {
            label:
              'Which stage accounts for the most time in H-206? Use its stage name.',
            hint: 'Compare the three recorded durations in the same unit.',
            answers: ['source lookup', 'lookup', 'source', 'source-lookup'],
            feedback:
              'Follow the shared trace ID and compare durations. A single trace suggests the next investigation.',
          },
        ],
        language: 'python',
        starter: `def pilot_decision(previous_failures, current_failures):
    # Return "rollback" when both consecutive counts are above 4.
    # Return "observe" in all other cases.
    return "todo"

print(pilot_decision(5, 7))`,
        checks: [
          {
            label: 'Two consecutive breaches trigger rollback',
            code: 'assert pilot_decision(5, 7) == "rollback"',
          },
          {
            label: 'One breach is observed',
            code: 'assert pilot_decision(3, 5) == "observe"',
          },
          {
            label: 'Exactly four is on the allowed boundary',
            code: 'assert pilot_decision(4, 9) == "observe"\nassert pilot_decision(8, 4) == "observe"',
          },
        ],
        guide: [
          'Translate both comparisons into one if condition joined by and. The print call tries 5 and 7 failures. Change the first 5 to 4 and rerun to test the boundary. After the checks pass, add the line assert pilot_decision(4, 7) == "observe" at the left edge below print. Download code saves that repeatable check. From its folder, run python3 week-20-project.py on macOS or Linux, or py week-20-project.py on Windows. Running in the browser also executes the saved assertion.',
          'Draw the interface, service, source and reviewer. Add a shared request ID to a small trace. Choose the rollback owner and identify the package to restore.',
          'Write two short messages in the journal. For a customer, describe the observed delay, affected function and next update time. For engineering, include the release, trace, stop rule and recovery checks. Rehearse the stop locally or in the browser.',
        ],
        evidence:
          'Save the tested decision function and how to rerun it, the architecture sketch, redacted trace, rollback trigger, recovery evidence and the two audience-specific updates.',
        template:
          'Build and prior package\nArchitecture and scope check\nRepeatable check and results\nTrace ID | Stage | Duration | Error class\nStop rule, first breach, second breach\nRollback owner and recovery checks\nCustomer update\nEngineering escalation',
        review: [
          'My failing and passing checks identify the exact release and rule.',
          'My sample trace connects stages without exposing raw customer content.',
          'My recovery criteria check service performance and the earlier quality gate.',
        ],
      },
      pitfalls: [
        {
          symptom: 'A rollout is stopped on the first threshold breach.',
          fix: 'Count consecutive breached windows. A window at the allowed boundary ends the streak.',
        },
        {
          symptom: 'The incident is marked resolved as soon as B6 is restored.',
          fix: 'Record post-rollback health and quality results. If they have not been observed, label recovery pending.',
        },
      ],
    },
    21: {
      bridge:
        'Week 20 established that a handoff can be operated reliably in a rehearsal. Customer discovery asks whether the target person has a costly problem in the first place. Bring the assumption marked as unresolved in the Week 19 brief.',
      goal: 'Run or rehearse a short interview about a recent event and turn the evidence into a decision about the next experiment.',
      terms: [
        [
          'Segment',
          'A clearly defined group that performs a similar job, such as support leads who review trial handoffs every week.',
        ],
        [
          'Reported event',
          'Something a participant says happened. A timestamped record or direct observation can provide other evidence about the event.',
        ],
        [
          'Interpretation',
          'The student’s explanation of what a report might mean. Another plausible explanation can still fit.',
        ],
        [
          'Counterexample',
          'A case at odds with the working hypothesis. It can identify a segment the proposed product would serve poorly.',
        ],
      ],
      steps: [
        {
          title: 'Choose a decision before writing questions',
          body: 'Name one job and one decision. For example, decide whether to pilot a tool for people who reconcile handoffs weekly. Recruit from that segment and record how many people actually participated. Five interviews planned is different from five completed.',
        },
        {
          title: 'Start with the most recent event',
          body: 'Ask permission to take anonymous notes. Open with “Walk through the last time this happened.” Pause for an answer. Follow the participant’s sequence: who did the work, which tool was open, what changed next and what was delayed? Let the person describe a successful workaround too.',
        },
        {
          title: 'Separate what was heard from what was inferred',
          body: 'Make three short columns for the participant’s words, what could be verified and the interpretation. Mark a time estimate as reported unless it was measured. Ask who owns the budget and what happened the last time the team bought a tool. A compliment alone leaves purchase behavior unknown.',
        },
        {
          title: 'Choose one test with consequences',
          body: 'Look for a case that contradicts the hypothesis. Decide what external observation or time-bounded pilot could change the product decision. An LLM can rehearse question wording and role-play a response. Record the number of human participants separately.',
        },
      ],
      example: {
        title: 'Reconstruct a recent room change',
        setup:
          'An academy facilitator rehearses interviewing a fictional workshop coordinator. The product idea is an automatic room-change announcement.',
        steps: [
          'Open with a past event. “Walk through the last room change. Which message did you check first?”',
          'Record the answer faithfully. Ask whether the elapsed time was measured and whether a record can be shared anonymously with permission.',
          'Look for a rival explanation. A missing owner could be the delay even if drafting the message feels slow.',
        ],
        language: 'case',
        artifact:
          'Rehearsal role P1: “Yesterday I spent about ten minutes finding who could confirm the room. Writing the announcement took less than a minute.”\nShared evidence: none. The ten minutes are an estimate.\nInterpretation: finding the approver may be the larger cost.\nNext neutral question: “When was the last time the owner was already clear, and what happened then?”',
        result:
          'The rehearsal improved the interview guide and surfaced an alternative explanation. It contains zero customer interviews and no measured time saving.',
        change:
          'A real coordinator authorizes an anonymized observation. The timeline shows nine minutes locating the owner and one minute drafting. What can the evidence now support?',
        changedResult:
          'There is one observed ten-minute event with a nine-minute owner lookup. That makes an owner-finding pilot worth testing with similar coordinators. It still leaves frequency and purchase intent open.',
      },
      task: {
        title:
          'Investigate whether handoff reconciliation is a recurring problem',
        brief:
          'Use the fictional practice notes to classify the evidence, then design a five-interview plan for the segment in the Week 19 brief.',
        source:
          'Practice dataset about Beacon’s target segment. Note A describes an external interview in the fictional scenario: P1 recalls an eight-minute reconciliation last Friday. Note B describes a second external interview in the scenario: P2 checked one shared source and completed the last handoff without reconciliation. Note C is a founder rehearsal with an LLM pretending to be a lead. No participant bought or scheduled a pilot. These supplied notes are classroom material.',
        fields: [
          {
            label:
              'Within the fictional scenario, how many interviews involved an external human?',
            hint: 'Identify the person or model behind each note, then count qualifying participants within the scenario.',
            answers: ['2', 'two'],
            feedback:
              'Check who actually responded in each described session. A model rehearsal is its own category.',
          },
          {
            label:
              'Which note ID provides a counterexample to “every lead spends time reconciling”? Enter A, B or C.',
            hint: 'Find the lead whose existing workflow already avoided the proposed problem.',
            answers: ['b', 'B', 'note b'],
            feedback:
              'A counterexample describes a real alternative workflow within the scenario.',
          },
        ],
        guide: [
          'Create five intended interview slots for one narrowly described segment. Write a neutral opener, two follow-ups about the last event, a question about the current workaround and a question that could disprove the assumption.',
          'For any accessible participant, obtain permission and record anonymized notes. If no participant is available, conduct a clearly labeled role-play and report zero actual interviews. The fictional source above has its own separate count.',
          'Record at least one pattern or candidate pattern and a counterexample or a plan to seek one. Write the smallest next commitment that would test adoption, such as a scheduled pilot with an agreed task and measure.',
        ],
        evidence:
          'Save the interview guide, planned and completed counts, anonymized evidence, a counterexample and the next decision. Keep classroom records, LLM role-plays and personal external interviews visibly labeled.',
        template:
          'Segment and decision\nFive planned slots and recruitment route\nPast-event opener and neutral follow-ups\n\nID | Origin (real/rehearsal/classroom) | Reported behavior | Verification | Interpretation\n\nMy external participant count\nCounterexample or planned search\nNext commitment that would change the decision',
        review: [
          'My guide begins with a specific past event and includes a disconfirming question.',
          'I identified which notes came from humans, role-plays and supplied classroom cases.',
          'My conclusion matches the evidence I actually collected.',
        ],
      },
      pitfalls: [
        {
          symptom: 'The interview becomes a product pitch.',
          fix: 'Return to the recent event and ask which workaround was used. Save any invitation to try a pilot for the end.',
        },
        {
          symptom: 'An LLM writes five plausible positive interviews.',
          fix: 'Keep those in the rehearsal section. Count only external human participants under completed customer interviews.',
        },
      ],
    },
    22: {
      bridge:
        'Week 21 identified a user, a current workaround and an unanswered adoption question. Turn that question into one repeatable task with an input, a useful output and a measured outcome.',
      goal: 'Build a narrow pilot, run three trials and decide whether to iterate using the rule written before the trials.',
      terms: [
        [
          'Minimum viable product (MVP)',
          'The smallest usable experience that lets a particular person try the job under study.',
        ],
        [
          'Cohort',
          'The defined group eligible for the same experiment during the same time window.',
        ],
        [
          'Decision rule',
          'A threshold recorded before a trial that specifies what counts as success, a hold or another experiment.',
        ],
        [
          'Hidden labor',
          'Founder or reviewer effort required to deliver the apparently automated result. Measure it separately.',
        ],
      ],
      steps: [
        {
          title: 'Choose one entire job',
          body: 'Write the target user, the input they already have, the decision they must make and the action the output enables. A small filter and a review list can test a handoff before any paid model or automatic sending is needed.',
        },
        {
          title: 'Define an honest trial',
          body: 'Write the success measure, the allowed time, the minimum number of successes and how to count assistance before trying the pilot. Give each attempt an ID. Repeat deliveries or retries from the same person do not create another eligible user.',
        },
        {
          title: 'Run, observe, decide',
          body: 'Give the student or volunteer the input, start the clock and record the actual output, whether help was needed, and staff minutes. Include a near-boundary or failure case. When a rule is missed, preserve the result, change one thing and run another trial under a new version.',
        },
      ],
      example: {
        title: 'Try a pickup-card pilot at a learning center',
        setup:
          'A coordinator wants a small card for items waiting at least 30 minutes when an owner is available. Run the three fictional trials in Python and compare the printed decisions with the rule.',
        steps: [
          'Each call stands for one trial. True and False represent whether someone can take responsibility for pickup.',
          'Read >= as “at least.” A wait of exactly 30 minutes satisfies the time half of the rule. Both halves joined by and must hold.',
          'A coordinator could act on a shown card manually. Record the time it takes the person to use it before proposing more automation.',
        ],
        language: 'python',
        artifact: pilotExample,
        result: 'show pickup card\nskip\nskip',
        change:
          'In the first print call, change the wait from 30 to 29 minutes. Keep the owner available. Predict the three display decisions.',
        changedCode: pilotExample.replace(
          'print_pickup_card(30, True)',
          'print_pickup_card(29, True)',
        ),
        changedResult: 'skip\nskip\nskip',
      },
      task: {
        title: 'Build and measure a triage card for stale handoffs',
        brief:
          'A Beacon lead wants a review card only when a handoff is missing its source and has waited at least 12 hours. The card alerts the lead to investigate. Delivery remains on hold until a source is verified and a reviewer approves the revision. Implement the card decision and use three rehearsals to inspect the pilot.',
        source:
          'Decision written before this fictional trial: continue only if all three eligible trials finish correctly within six minutes without founder assistance. Trial T1 finished correctly in 4 minutes unaided. T2 finished correctly in 5 minutes with 3 minutes of founder help. T3 finished correctly in 6 minutes unaided. All trial times include any assistance.',
        fields: [
          {
            label: 'How many trials met all three conditions?',
            hint: 'Check correctness, elapsed time and independence for each trial.',
            answers: ['2', 'two', '2/3', '2 of 3'],
            feedback:
              'Count six minutes as within the limit. Any founder assistance misses the independence condition.',
          },
          {
            label: 'How many minutes of founder labor should the pilot report?',
            hint: 'Sum the founder help across the three trials, even if the task succeeded.',
            answers: ['3', '3 minutes', '3 min', 'three'],
            feedback:
              'Separate founder minutes from the total elapsed minutes experienced by participants.',
          },
        ],
        language: 'python',
        starter: `def handoff_card(wait_hours, has_source):
    # Return "review" for a missing source and a wait of at least 12 hours.
    # Return "skip" in all other cases.
    return "todo"

print(handoff_card(12, False))
print(handoff_card(18, True))`,
        checks: [
          {
            label: 'A missing source at the 12-hour boundary produces a card',
            code: 'assert handoff_card(12, False) == "review"',
          },
          {
            label: 'An older handoff with a source is skipped',
            code: 'assert handoff_card(30, True) == "skip"',
          },
          {
            label: 'A younger handoff with a missing source waits',
            code: 'assert handoff_card(11, False) == "skip"',
          },
        ],
        guide: [
          'Use not has_source to test for a missing source and >= to check the waiting time. Run the independent checks. The two print calls demonstrate an ordinary card and a skipped case. For a new timing trial, change the inputs in one call, predict the outcome, run the program and show the result to a peer or record a labeled solo rehearsal.',
          'Write a new decision rule before starting three personal trials. Give each trial an input and a predicted output, then time the task, record the observed output and note any assistance. The classroom times above belong only to the supplied run.',
          'Compare the three results with the original rule. Identify the part still done by hand, one reason a real lead might decline and a specific next trial.',
        ],
        evidence:
          'Save the working function, the dated rule, three personal trial rows and the next decision. Mark who tried the pilot and whether each run was a rehearsal.',
        template:
          'Pilot user, job and riskiest assumption\nVersion and rule written before trial\nInput → decision → human action\n\nTrial ID | Input | Prediction | Observed output | Time | Help minutes | Origin\n\nResult against rule\nOne change and next independent trial',
        review: [
          'I can demonstrate an input all the way to a human-usable output.',
          'I used one predeclared rule on three distinct trials and recorded assistance.',
          'I separated what the rehearsals showed from what target users still need to test.',
        ],
      },
      pitfalls: [
        {
          symptom: 'The report calls all correct outputs successful.',
          fix: 'Check every condition in the preregistered rule, including independence and the time limit.',
        },
        {
          symptom: 'A successful rehearsal is described as customer adoption.',
          fix: 'Label the run by participant type. Test adoption with actual target users completing the workflow.',
        },
      ],
    },
    23: {
      bridge:
        'Week 22 measured manual review time as well as completion. Put a unit cost on that labor and connect it to how many people actually returned to use the pilot.',
      goal: 'Calculate contribution, break-even volume and repeat use for one stated unit, then identify which pricing assumption most needs evidence.',
      terms: [
        [
          'Billable unit',
          'The thing being priced, such as one reviewed handoff or one workspace-month. Use the same unit for revenue and variable cost.',
        ],
        [
          'Contribution',
          'Revenue per unit minus the costs incurred to deliver that unit. The remainder helps cover fixed costs.',
        ],
        [
          'Break-even volume',
          'The smallest whole number of units whose contribution covers fixed cost for the stated period.',
        ],
        [
          'Activation and return',
          'Activation is a first defined value-producing action among eligible users. Return measures repeated use in a later window with an explicitly chosen denominator.',
        ],
      ],
      steps: [
        {
          title: 'Put costs on one unit',
          body: 'Choose one billing period and unit. Convert human review minutes to money by multiplying minutes by hourly pay divided by 60. Add variable model, delivery and support costs on the same unit. Monthly hosting or a base subscription can be fixed for the modeled range.',
        },
        {
          title: 'Check both sides of break-even',
          body: 'Subtract variable cost from price. When the contribution is positive, divide monthly fixed cost by contribution and round up to a whole unit. Check that one fewer unit still falls short. To find the minimum price at a specified volume, divide fixed cost by the number of units and add variable cost per unit. With zero or negative contribution and positive fixed costs, increasing volume cannot cover them.',
        },
        {
          title: 'Check the cohort before using a percentage',
          body: 'Count unique eligible teams in one starting window. Record which activated and which of those returned in the next window. Report both the counts and the fraction. Activation uses eligible teams. Return among activated teams uses those that activated. Signup, repeat activity and payment are different events.',
        },
        {
          title: 'Stress one assumption and ask for evidence',
          body: 'Raise the review minutes or lower the price while holding other inputs constant. Compare required volume with the available market or observed usage. A pricing model is an assumption. A paid pilot, an approved budget and a polite statement about a price provide different kinds of evidence.',
        },
      ],
      example: {
        title: 'Price a reviewed registration packet',
        setup:
          'A fictional packet sells for $19. Processing costs $2 per packet, reviewer time costs 50 cents per minute, and the monthly fixed cost is $100. Start with eight minutes of review per packet.',
        steps: [
          'Use whole cents. The variable cost is 200 + 8 × 50 = 600 cents. Subtract it from 1,900 cents to get the contribution per packet.',
          'The while loop adds one packet as long as total contribution is below 10,000 cents. The guard at the start handles a zero or negative contribution.',
          'Check the printed count by hand. Seven packets contribute $91 and eight contribute $104.',
        ],
        language: 'python',
        artifact: costExample,
        result: '1300\n8',
        change:
          'Change review_minutes from 8 to 22. Keep the price and all other costs fixed. Predict the contribution in cents and the monthly packet count.',
        changedCode: costExample.replace(
          'review_minutes = 8',
          'review_minutes = 22',
        ),
        changedResult: '600\n17',
      },
      task: {
        title: 'Model the price of a reviewed Beacon handoff',
        brief:
          'Use the fictional pilot ledger to model one handoff, then build a reusable function for the next pricing experiment.',
        source:
          'One completed handoff sells for $14. It uses $2 of processing and 6 human minutes at $40 per hour. Fixed costs are $65 per month. In the same starting cohort, 12 teams were eligible, 8 activated in the first week and 3 of those 8 returned in the second. The $14 price is a proposal. No invoices have been paid.',
        fields: [
          {
            label: 'What is the contribution in dollars for one handoff?',
            hint: 'Convert the six minutes to a fraction of an hour, add processing cost, and subtract the total from the price.',
            answers: ['8', '8.0', '8.00', '$8', '$8.00', '8 dollars'],
            feedback:
              'Keep revenue and both variable costs on the same per-handoff basis.',
          },
          {
            label: 'How many whole handoffs cover this month’s fixed costs?',
            hint: 'One fewer unit than the answer must still fall below $65.',
            answers: ['9', 'nine', '9 handoffs'],
            feedback:
              'Round the unit count upward when a partial handoff would be required.',
          },
          {
            label: 'What percentage of activated teams returned in week two?',
            hint: 'Use the count that activated as the denominator and convert the fraction to a percentage.',
            answers: [
              '37.5',
              '37.50',
              '37.5%',
              '37.50%',
              '37.5 %',
              '37.5 percent',
            ],
            feedback:
              'Use the three repeat users and the eight activated teams. All twelve eligible teams belong in the activation denominator.',
          },
        ],
        language: 'python',
        starter: `def contribution_cents(price_cents, processing_cents, review_minutes, hourly_cents):
    # Return the contribution for one handoff, measured in cents.
    # Hourly labor cost is in cents. Convert minutes to a fraction of an hour.
    return 0

print(contribution_cents(1400, 200, 6, 4000))`,
        checks: [
          {
            label: 'A normal handoff includes direct processing and human time',
            code: 'assert contribution_cents(1400, 200, 6, 4000) == 800',
          },
          {
            label: 'Zero review minutes remove only the labor cost',
            code: 'assert contribution_cents(1400, 200, 0, 4000) == 1200',
          },
          {
            label: 'A high-cost handoff can have negative contribution',
            code: 'assert contribution_cents(500, 100, 10, 3000) == -100',
          },
        ],
        guide: [
          'Implement the function with the supplied input names. The first test uses 4,000 cents per hour, which gives 400 cents for six minutes. Subtract processing and labor from price. Preserve precision until the final currency result.',
          'The provided print call displays the base contribution in cents. Change its 6 minutes to 12 and rerun for the stress worksheet. Record cost, contribution and whole units needed under each. Show the check one unit below break-even.',
          'State the starting cohort, period, activation and week-two return as counts and percentages. Name the budget owner to consult and one behavior that could support the price. Label quoted interest and actual payments separately.',
        ],
        evidence:
          'Save the price model, base and stress calculations, two funnel denominators, pricing evidence and two uncertainties that could reverse the recommendation.',
        template:
          'Unit and billing period\nPrice | Processing | Human minutes × hourly rate / 60 | Contribution\nBase break-even and one-unit-below check\nStress-case assumptions and result\nCohort window | Eligible | Activated | Returned\nPricing evidence actually observed\nTwo uncertainties and next pricing test',
        review: [
          'I used consistent currency, units and time periods in both scenarios.',
          'I checked the break-even boundary and named the denominator of each funnel measure.',
          'I labeled the proposed price and separated it from actual payment evidence.',
        ],
      },
      pitfalls: [
        {
          symptom: 'The model treats $40/hour as $40/minute.',
          fix: 'Write the fraction of an hour first. Six minutes is 6/60 of an hour. Multiply that fraction by the hourly rate.',
        },
        {
          symptom:
            'A negative contribution produces a negative break-even target.',
          fix: 'For positive fixed costs, report that there is no break-even volume at that price and variable cost. Examine price or cost assumptions.',
        },
      ],
    },
    24: {
      bridge:
        'Assemble the Week 17 review trace, Week 18 evaluation, Week 19 brief, Week 20 recovery plan, Week 21 evidence, Week 22 trials and Week 23 economics into one demonstration a reviewer can verify.',
      goal: 'Deliver a reproducible hiring walkthrough and a founder pitch that make distinct, defensible claims from the same small product.',
      terms: [
        [
          'Paired comparison',
          'The baseline and the candidate are measured on the same cases. This helps comparability, while repeated exposure can create a practice effect.',
        ],
        [
          'Ownership',
          'The part of the system or decision the student personally designed, checked or repaired. Identify what came from a library, model, template or reviewer.',
        ],
        [
          'Evidence appendix',
          'A short index linking each claim to a test result, input, trace, observation or explicitly labeled assumption.',
        ],
        [
          'Bottleneck',
          'The stage limiting performance at a given workload. A forecast about ten times the traffic needs supporting measurements or a proposed test.',
        ],
      ],
      steps: [
        {
          title: 'Write one claim somebody can check',
          body: 'State the job, baseline, candidate, sample size and origin of the result. For a time reduction, subtract new time from old time, then divide the difference by old time. For quality, include counts such as 6/8. Record the order of trials because familiar cases can get easier on a second attempt.',
        },
        {
          title: 'Give the reviewer a short route through the work',
          body: 'Pick one ordinary input and one failing or escalated input. Supply the expected outcome and exact replay steps. Trace the source, model or fixture, validation and human decision. Include a regression check that would fail if the repair disappeared. A runnable browser or local demo with fictional inputs is sufficient.',
        },
        {
          title: 'Use the same evidence for two different decisions',
          body: 'For a hiring walkthrough, explain one component the student owned, one bug, the repair and a tradeoff. For a founder pitch, explain the user, adoption evidence, modeled contribution, delivery burden and the next pilot. Label forecasts, classroom fixtures and observed customer behavior.',
        },
        {
          title: 'Invite one hard question and revise',
          body: 'Ask a reviewer or rehearse a question about a limitation. At ten times the traffic, time each stage and examine queue depth before claiming which stage would fail first. Record the question, change one artifact and name the measurement that would change the next decision.',
        },
      ],
      example: {
        title: 'Present a rehearsal of a registration helper',
        setup:
          'A student prepared a paired test on six fictional registration cases. A hiring reviewer wants to reproduce a failure, while a founder wants to know what the time result establishes.',
        steps: [
          'Calculate the time change using the baseline as the denominator. Put the sample and measurement method in the same sentence as the result.',
          'Trace one failing case by ID. Show its inputs, the repair and the expected route when repeated. Identify the component actually built by the student.',
          'For a founder discussion, separate the pilot cost estimate from purchases. Propose the smallest external test that could disprove the idea.',
        ],
        language: 'case',
        artifact:
          'Six fictional paired cases, same person and fixed order. Mean time per case: 8 min baseline → 6 min with prototype.\nCase R4 lacked an owner. The prototype initially offered to send.\nStudent repair: route missing owners to review. Expected R4 replay: review.\nThe draft text came from a supplied fixture. A person approved the final action.\nModeled price $12/packet, modeled variable cost $5. Paying customers: zero.',
        result:
          'In this six-case rehearsal, mean time fell by 2 minutes, or 25%. Fixed order leaves a possible practice effect. The R4 trace supports an ownership claim. The modeled $7 contribution and zero paying customers support a pricing experiment.',
        change:
          'A second reviewer repeats the six cases in the opposite order and gets 8 minutes for both versions. How should the headline and next test change?',
        changedResult:
          'Report both measured results and their test orders. The second trial found no time reduction. Use unfamiliar cases and vary the order across reviewers before claiming a repeatable advantage.',
      },
      task: {
        title:
          'Defend a handoff assistant in a hiring review and a founder meeting',
        brief:
          'Use the supplied Beacon packet to check the claims below. Then assemble a case study from the student’s own work with a clear source for every number.',
        source:
          'A fictional paired rehearsal used 10 handoffs. Mean handling time was 10 minutes in the old flow and 7 minutes in the reviewed flow. Everyone did the old flow first. H-09 tried to approve a handoff after its source was removed. Its regression case now expects delivery to stay on hold and a human to review the missing source. Five external teams were invited to a future pilot, zero have used it and zero have paid. Proposed price $16 per handoff, modeled variable cost $9.',
        fields: [
          {
            label:
              'What percentage reduction in mean time was observed in this rehearsal?',
            hint: 'Use the original mean time as the denominator.',
            answers: ['30', '30%', '30 %', '30 percent', '30.0', '30.0%'],
            feedback:
              'Subtract the prototype mean from the baseline mean, then divide by the baseline mean.',
          },
          {
            label:
              'How many external teams in the packet have demonstrated actual adoption?',
            hint: 'Look for use by the invited teams, separately from the rehearsal count.',
            answers: ['0', 'zero', 'none'],
            feedback:
              'An invitation is an outreach event. Adoption needs evidence of use.',
          },
          {
            label: 'What is the modeled contribution in dollars per handoff?',
            hint: 'Subtract the variable delivery cost from the proposed price.',
            answers: ['7', '7.0', '7.00', '$7', '$7.00', '7 dollars'],
            feedback:
              'A proposed price supports a modeled margin until somebody pays.',
          },
        ],
        guide: [
          'Choose earlier project evidence and label each item observed, rehearsal, supplied fixture or projection. Give the demo a clear starting input and expected finish for an ordinary handoff and a deliberately incomplete case. Reopen the earlier workshop to run the code or describe how to run the local project.',
          'Write a 90-second hiring walkthrough and a separate 60-second founder pitch. Rehearse both aloud. The hiring version should show a failure, the student’s change and its regression result. The founder version should include measured or pending adoption, unit economics and a decision for the next pilot.',
          'Ask a real reviewer or label a solo rehearsal question. Record the before-and-after wording or changed demo step. Include an implementation handoff and one hypothesis about ten times the load with a way to test it. A local or browser portfolio can be shared without an external account.',
        ],
        evidence:
          'Save the case study, demo replay steps, evidence index, hiring walkthrough, founder pitch and one revision after questioning. After completing the quiz, the journal’s portfolio download includes the reviewed projects.',
        template:
          'Case title, target user and starting workflow\nMy contribution | Supplied components | Human review\nNormal demo input and expected output\nFailure ID → diagnosis → fix → regression result\nBaseline, sample, method, result and limitation\nEconomics and actual external adoption\nEvidence index with week, input and result\nHiring walkthrough\nFounder pitch and next test\nReviewer question (label origin) and revision\nHandoff and next measurement at higher volume',
        review: [
          'A reviewer can reproduce a normal case and the failure case using the recorded inputs.',
          'Both presentations distinguish my contribution, simulated evidence, actual use and forecasts.',
          'I recorded one reviewer or rehearsal question and revised an artifact in response.',
        ],
      },
      pitfalls: [
        {
          symptom: 'The headline drops the rehearsal sample and trial order.',
          fix: 'Put the measured task, number of cases and order beside the result. State how a fresh counterbalanced test could check the practice effect.',
        },
        {
          symptom:
            'The pitch treats invitations or positive feedback as paid demand.',
          fix: 'Report the invited, active and paying counts separately. Name the next action that would supply missing evidence.',
        },
      ],
    },
  });
})();
