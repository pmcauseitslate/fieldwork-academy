// Weeks 9–16 build on the student's existing Python, SQL and data skills.
(() => {
  'use strict';

  const pages = `pages = {
    "first": {"items": ["D4", "D7"], "next": "blue"},
    "blue": {"items": ["D9"], "next": None}
}
cursor = "first"
seen = []
ids = []
while cursor is not None:
    if cursor in seen:
        print("Repeated cursor", cursor)
        break
    seen.append(cursor)
    page = pages[cursor]
    ids.extend(page["items"])
    cursor = page["next"]
print("Pages read:", len(seen))
print("Document IDs:", ", ".join(ids))`;

  const ledger = `CREATE TABLE receipts (
  event_id TEXT PRIMARY KEY,
  seats INTEGER NOT NULL CHECK (seats > 0)
);
BEGIN;
INSERT INTO receipts VALUES ('A1', 2), ('A2', 4), ('A1', 2)
ON CONFLICT(event_id) DO NOTHING;
COMMIT;
SELECT COUNT(*) AS accepted_events, SUM(seats) AS total_seats
FROM receipts;`;

  const signup = `<form id="signup">
  <label for="team">Pilot team name</label>
  <input id="team" name="team_name" required minlength="3"
         aria-describedby="team-help">
  <p id="team-help">Use at least three characters.</p>
  <button id="send" type="submit">Join pilot</button>
  <p id="status" role="status">Ready.</p>
</form>
<script>
  const form = document.querySelector('#signup');
  const button = document.querySelector('#send');
  const statusLine = document.querySelector('#status');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (button.disabled) return;
    button.disabled = true;
    statusLine.textContent = 'Saving…';
    setTimeout(function () {
      statusLine.textContent = 'Saved for ' + form.elements.team_name.value + '.';
      button.disabled = false;
    }, 700);
  });
</script>`;

  const dashboard = `<label for="cohort">Onboarding cohort</label>
<select id="cohort">
  <option>All</option><option>Spring</option><option>Summer</option><option>Fall</option>
</select>
<p id="metric" role="status"></p>
<p>Snapshot from 1 July, 09:00 UTC (fictional).</p>
<script>
  const rows = [
    {cohort: 'Spring', active: true},
    {cohort: 'Spring', active: false},
    {cohort: 'Summer', active: true}
  ];
  const menu = document.querySelector('#cohort');
  function update() {
    const chosen = menu.value;
    const group = rows.filter(row => chosen === 'All' || row.cohort === chosen);
    const active = group.filter(row => row.active).length;
    const label = chosen + ' · ' + active + ' active of ' + group.length + ' eligible';
    document.querySelector('#metric').textContent = group.length
      ? label + ' · ' + Math.round(100 * active / group.length) + '%'
      : chosen + ' · No eligible workspaces.';
  }
  menu.addEventListener('change', update);
  update();
</script>`;

  const service = `bookings = {}
def request(method, path, team, body):
    if method == "POST" and path == "/bookings":
        name = body.get("name", "")
        if not isinstance(name, str) or not name.strip():
            return 422, "Name required"
        key = str(len(bookings) + 1)
        bookings[key] = {"name": name, "team": team}
        return 201, key
    if method == "GET" and path == "/bookings":
        ids = []
        for key in bookings:
            if bookings[key]["team"] == team:
                ids.append(key)
        return 200, sorted(ids)
    if method == "GET" and path.startswith("/bookings/"):
        key = path.split("/")[-1]
        if key in bookings and bookings[key]["team"] == team:
            return 200, bookings[key]["name"]
    return 404, "Not found"

print(request("POST", "/bookings", "Oak", {"name": "Welcome call"}))
print(request("GET", "/bookings/1", "Oak", {}))
print(request("GET", "/bookings/1", "Lime", {}))`;

  const compare = `expected = ["send", "hold", "send", "hold"]
candidate_a = ["send", "send", "send", "hold"]
candidate_b = ["send", "hold", "send", "hold"]
def passes(labels):
    count = 0
    for i in range(len(expected)):
        if labels[i] == expected[i]:
            count = count + 1
    return count

print("A matches:", passes(candidate_a))
print("B matches:", passes(candidate_b))
input_tokens, output_tokens = 1000, 250
cost = input_tokens / 1000 * 0.02 + output_tokens / 1000 * 0.04
print("B cost in dollars:", round(cost, 3))`;

  const search = `passages = [
    ("P1", "trial export", "Trial exports last 5 days."),
    ("P2", "paid export", "Paid exports last 18 days."),
    ("P3", "invite link", "Invitations expire in 24 hours.")
]
def search(question):
    words = question.lower().split()
    best_score = 0
    best = None
    for source_id, tags, passage in passages:
        score = 0
        for word in words:
            if word in tags.split():
                score += 1
        if score > best_score:
            best_score = score
            best = (source_id, passage)
    return best

hit = search("paid export")
if hit:
    print(hit[0], hit[1])
else:
    print("No matching source")`;

  const field = (label, hint, answers, feedback, match) => ({
    ...(match ? { match } : {}),
    label,
    hint,
    answers,
    feedback,
  });
  const step = (title, body) => ({ title, body });
  const snag = (symptom, fix) => ({ symptom, fix });
  window.ACADEMY_WORKSHOPS = window.ACADEMY_WORKSHOPS || {};
  Object.assign(window.ACADEMY_WORKSHOPS, {
    9: {
      bridge:
        'Week 8 used an account ID to connect database rows. This week that same ID travels in a request and in each returned ticket. The missing-field checks from Week 3 still apply.',
      goal: 'Read a two-page response, identify the end of the list, and distinguish an empty result from a failed lookup.',
      terms: [
        [
          'API contract',
          'The agreement giving the request format and the shape and meaning of each response.',
        ],
        [
          'Request and response',
          'The client asks for a resource using a method and a path. The service replies with a status number and a body containing data or an error.',
        ],
        [
          'JSON',
          'A text format. Braces contain named fields, brackets contain an ordered list, and null means no value. A decoded Python object uses None for null.',
        ],
        [
          'Cursor',
          'A continuation value supplied by the service. It can be a word, a token, or a complete next-page URL.',
        ],
      ],
      steps: [
        step(
          'Read one request aloud',
          'GET /tickets?account=10 means “read tickets for account 10.” GET is the method, /tickets is the path, and the part after ? supplies filter values. Headers can carry metadata such as a content type.',
        ),
        step(
          'Check the envelope before the rows',
          'First check the status. A 200 means the service handled the read. Next check that items is a list and that each item has the contract’s required fields. A 200 response with items set to a sentence still fails this check. A 404 means the requested resource was not found.',
        ),
        step(
          'Keep a finger on the next page',
          'Begin with the documented first request. Append that page’s valid rows, then use its exact next value, including the account filter. Stop at null. Keep a list of visited values. If one repeats, flag the feed as incomplete and stop before reading the same page again.',
        ),
      ],
      example: {
        title: 'Trace a paginated document shelf',
        setup:
          'A local dictionary stands in for two successful API replies, so the exercise works without network access. Predict the sequence of IDs before running the code.',
        steps: [
          'pages["first"] selects the first bundle. Square brackets with a field name, as in page["items"], select one field inside it.',
          'while repeats the indented block. seen.append records a cursor. ids.extend adds the members of the current list individually. len counts the pages visited.',
          'The second next is None, so the loop ends. join prints the text IDs on one line. A repeated cursor takes the break path before more items are added.',
        ],
        artifact: pages,
        language: 'python',
        result: 'Pages read: 2\nDocument IDs: D4, D7, D9',
        change:
          'In the blue page only, replace None with "first". Predict the extra message and decide whether any ID will be counted twice.',
        changedResult:
          'Repeated cursor first\nPages read: 2\nDocument IDs: D4, D7, D9',
      },
      task: {
        title: 'Trace an independent activity feed',
        brief:
          'A team needs a list of completed activity IDs. Inspect the supplied fictional responses in request order. Use the contract to separate bad rows from valid activity.',
        source:
          'Contract: a valid activity has a nonempty id.\nGET /activity?team=fern → 200, items=[{id:"M1"},{name:"missing id"}], next="/activity?team=fern&cursor=R8"\nGET /activity?team=fern&cursor=R8 → 200, items=[{id:"M4"},{id:"M8"}], next=null\nGET /activity/M99 → 404, error="not found"',
        fields: [
          field(
            'Exact continuation URL',
            'Copy the service’s relative URL, including the team filter.',
            ['/activity?team=fern&cursor=R8'],
            'Read next from the first successful envelope. Preserve its query values.',
            'url',
          ),
          field(
            'Total valid activity IDs',
            'Enter a whole number after checking both pages.',
            ['3'],
            'Check each object for its own id and count valid records once.',
          ),
          field(
            'Rejected rows on the listing pages',
            'The separate single-record lookup is a different request.',
            ['1'],
            'Distinguish a bad list member from the failed lookup.',
          ),
        ],
        guide: [
          'The short check used Fern activities. For the separate portfolio project, open api-pages.json as text and work with its ticket records. Locate responses, start with the first ticket URL and write down its method, account filter and status.',
          'The project editor opens the supplied file using json.load. In collect, replace the final url = None with the next value read from the current page. Run the checks, inspect the printed IDs and copy them into a two-row page log. The starter already checks that id is text and account_id is a whole number.',
          'On a copy of one row, remove id. Record the rejection separately from the original fixture. Compare that failure with the separate TKT-999 lookup.',
        ],
        language: 'python',
        assetFiles: { 'api-pages.json': 'assets/academy/api-pages.json' },
        starter: `import json
with open("api-pages.json") as file:
    responses = json.load(file)["responses"]

def collect(responses, url):
    ids, seen = [], []
    rejected = 0
    while url is not None:
        if url in seen:
            return ids, rejected, "repeated URL"
        seen.append(url)
        reply = responses[url]
        if reply["status"] != 200:
            return ids, rejected, "failed request"
        page = reply["body"]
        if not isinstance(page.get("items"), list):
            return ids, rejected, "bad page"
        for item in page["items"]:
            if isinstance(item.get("id"), str) and isinstance(item.get("account_id"), int):
                ids.append(item["id"])
            else:
                rejected += 1
        url = None  # TODO: read the continuation field instead
    return ids, rejected, "finished"

print(collect(responses, "/tickets?account=10&page=1"))
print(collect(responses, "/tickets/TKT-999"))`,
        checks: [
          {
            label: 'Collects every ID from the ticket fixture in order',
            code: 'assert collect(responses, "/tickets?account=10&page=1") == (["TKT-001","TKT-003","TKT-005"], 0, "finished")',
          },
          {
            label:
              'Counts a missing-field row and stops a repeated continuation',
            code: 'assert collect({"fern":{"status":200,"body":{"items":[{"id":"F2","account_id":7},{"id":"F3"}],"next":"fern"}}}, "fern") == (["F2"], 1, "repeated URL")',
          },
          {
            label: 'Failed lookup is distinct from a successful empty page',
            code: 'assert collect(responses, "/tickets/TKT-999")[2] == "failed request" and collect({"a":{"status":200,"body":{"items":[],"next":None}}}, "a") == ([],0,"finished")',
          },
        ],
        template:
          'Method and first URL …\nRequired keys and value types …\nPage 1: status … accepted IDs … continue to …\nPage 2: status … accepted IDs … stop because …\nOriginal rows … Artificially damaged row … Separate failed lookup …',
        evidence:
          'Save the annotated request and the page log for the downloadable ticket fixture. Label the deliberately damaged row so a teammate can distinguish it from the original.',
        review: [
          'I followed the supplied continuation through the final page.',
          'I checked the fields and counted the accepted rows.',
          'I recorded a missing-field test and explained how it differs from a failed lookup.',
        ],
      },
      pitfalls: [
        snag(
          'The first page looks full, so the trace ends early.',
          'Check next even when the page already contains several rows.',
        ),
        snag(
          'Python reports an unknown name null.',
          'Use None inside Python code. In the downloaded JSON file the same idea is written null.',
        ),
      ],
    },
    10: {
      bridge:
        'Week 9 followed a feed until its last page. Week 8 made record IDs unique. Put those together so a repeated page can be processed without doubling its business effect.',
      goal: 'Apply unique events once, reconcile a second run, and leave a recoverable record of missing coverage.',
      terms: [
        [
          'Event',
          'One reported change with a stable ID, such as adding six minutes.',
        ],
        [
          'Replay and idempotency',
          'A replay delivers an event again. An idempotent operation leaves the same business result after the replay.',
        ],
        [
          'Transaction and checkpoint',
          'A transaction commits a group of writes together. A checkpoint records where a later run should resume.',
        ],
        [
          'Quarantine',
          'A separate list of rejected rows, their IDs when available, and reasons for repair.',
        ],
      ],
      steps: [
        step(
          'Choose an identity before adding totals',
          'Use the source event ID as the ledger key. Two events can have identical timestamps or amounts. A repeated ID with a different amount indicates a conflict that needs review.',
        ),
        step(
          'Write once, then acknowledge',
          'In a database, BEGIN starts a transaction and COMMIT makes it durable. If the business balance and receipt live in different tables, change both in one transaction. A ledger can instead store each event and amount in the same row and calculate the balance from accepted rows.',
        ),
        step(
          'Reconcile every observed arrival',
          'Split arrivals into new writes, replays and rejects. Their counts should add to the arrivals seen. Advance the checkpoint only after commit. If a page fails, report the unknown coverage and keep the previous safe checkpoint. A permanent missing field goes into quarantine. A temporary outage can be retried a limited number of times after a delay.',
        ),
      ],
      example: {
        title: 'Reconcile seat grants in a ledger',
        setup:
          'A trial account receives two seat grants and one repeated delivery. The browser uses a fresh local database for each run. Repeats inside a run exercise its uniqueness rule.',
        steps: [
          'The two columns hold the source ID and number of seats. PRIMARY KEY enforces one row per ID. CHECK rejects nonpositive grants.',
          'VALUES provides three arrivals. ON CONFLICT(event_id) DO NOTHING skips an ID already stored. Other validation failures still need handling.',
          'COUNT(*) counts accepted event rows. SUM(seats) adds the business effect. Compare those columns with the three source arrivals.',
        ],
        artifact: ledger,
        language: 'sql',
        result: 'accepted_events | total_seats\n2 | 6',
        change:
          "Change the third ID from 'A1' to 'A3', leaving its amount at 2. Predict both columns before running again.",
        changedResult: 'accepted_events | total_seats\n3 | 8',
      },
      task: {
        title: 'Reconcile an import after a timeout',
        brief:
          'Compute the receipts and business minutes from a separate page. Count a malformed row in the incident note. The service never returned page B.',
        source:
          'Page A arrivals (event_id, minutes): (J1, 7), (J2, 5), (J1, 7), (J3, missing), (J4, 3).\nPage B returned a temporary error. The checkpoint still points at A.\nOn recovery the exact same page A is received again.',
        fields: [
          field(
            'Minutes credited after the replay',
            'Enter the final business total across unique valid IDs.',
            ['15'],
            'Count each distinct valid event once across both deliveries.',
          ),
          field(
            'New valid event rows on the second read of A',
            'Enter the new row count, excluding prior receipts.',
            ['0', 'zero'],
            'Compare the second set of IDs with those already committed.',
          ),
          field(
            'Last confirmed page with data',
            'Enter A or B.',
            ['A', 'page A'],
            'A failed page gives no verified row count.',
          ),
        ],
        guide: [
          'The J events were the short check. For the portfolio project, switch to the e events in ingest-events.json and account IDs in accounts.csv. Read account_id against the accounts list, then check event_id and minutes. Use a ledger with event_id as its primary key, account_id and minutes as columns.',
          'Insert the valid event tuples into the independent SQL starter. Leave the bad input out of the insert and record its ID and reason. Copy BEGIN through COMMIT beneath the replay comment. Both attempts must run in the same program. Two SELECT statements display the totals after each commit. Compare the output rows labeled First read and After replay.',
          'Reconcile arrivals with accepted, replayed and rejected counts. Simulate an unavailable next page in the incident report. Specify the safe checkpoint and the first action on recovery.',
        ],
        language: 'sql',
        starter: `CREATE TABLE usage (
  event_id TEXT PRIMARY KEY,
  account_id INTEGER NOT NULL,
  minutes INTEGER NOT NULL CHECK (minutes >= 0)
);
BEGIN;
-- Replace the demonstration row with valid tuples from ingest-events.json.
INSERT INTO usage VALUES ('replace-me', 10, 0)
ON CONFLICT(event_id) DO NOTHING;
COMMIT;
SELECT 'First read' AS stage, COUNT(*) AS unique_events, SUM(minutes) AS billed_minutes FROM usage;
-- Repeat the same transaction here to replay the page.
SELECT 'After replay' AS stage, COUNT(*) AS unique_events, SUM(minutes) AS billed_minutes FROM usage;`,
        checks: [
          {
            label:
              'Unique IDs and correct per-account minutes match the source events',
            code: "SELECT COUNT(*)=3 FROM usage WHERE (event_id='e101' AND account_id=10 AND minutes=6) OR (event_id='e102' AND account_id=20 AND minutes=7) OR (event_id='e104' AND account_id=10 AND minutes=4)",
          },
          {
            label:
              'Quarantined event stays out and event_id is the primary key',
            code: "SELECT (SELECT COUNT(*) FROM usage)=3 AND EXISTS(SELECT 1 FROM pragma_table_info('usage') WHERE name='event_id' AND pk=1)",
          },
        ],
        template:
          'Stable key …\nFirst run: arrivals … accepted … replays … rejects … minutes …\nSecond run: added rows … final minutes …\nRejected ID and repair …\nFailed page … coverage … last durable checkpoint … next action …',
        evidence:
          'Save the ledger SQL and both run counts. Include a short recovery note naming the affected page, rejected input and safe restart point.',
        review: [
          'I keyed the ledger by a stable source event ID.',
          'I verified the second run added no duplicate business effect.',
          'My incident note distinguishes rejected rows, replays and unobserved data.',
        ],
      },
      pitfalls: [
        snag(
          'The same event increases the balance on every attempt.',
          'Check whether the balance is updated only for a newly accepted event.',
        ),
        snag(
          'A second click on Run starts from an empty table.',
          'Put both import attempts in one SQL program before the final SELECT. Each editor run starts from a fresh database.',
        ),
      ],
    },
    11: {
      bridge:
        'Week 10 protected an importer from repeated events. A form can create the same problem when a person clicks Submit twice. Start at the other end of the data flow and help the person submit one valid record.',
      goal: 'Build and operate a labeled form by keyboard, recover from a failed submission and verify the content remains intact.',
      terms: [
        [
          'HTML element',
          'A named part of a page. A label describes a field, an input accepts text, and a button triggers an action.',
        ],
        [
          'Attribute',
          'A setting inside an opening tag. id identifies an element on the page. name gives the field a key when submitted.',
        ],
        [
          'Focus',
          'The control that receives keystrokes. Tab moves focus forward and Shift+Tab moves it backward.',
        ],
        [
          'Submission state',
          'The visible stage of a request, such as ready, saving, succeeded or failed.',
        ],
      ],
      steps: [
        step(
          'Give the control a lasting name',
          'Write a visible label. Its for value must exactly match the input’s id. A tip can use its own id and the input’s aria-describedby can point to that tip. The text remains available while the person types.',
        ),
        step(
          'Try the contract with a keyboard',
          'Tab into the input, type a short value, and press Enter. required rejects blank input and minlength sets a minimum for typed text. Read the error, correct the same value and submit again. The service must enforce equivalent rules for every caller.',
        ),
        step(
          'Follow the waiting state',
          'A submit event fires when a valid form is submitted. JavaScript can prevent the normal page navigation, disable the button while work runs and update a status region. A real service also uses a stable submission ID and a unique receipt, as in Week 10, to handle a repeated delivery.',
        ),
      ],
      example: {
        title: 'Join a fictional team pilot',
        setup:
          'This form simulates a save entirely in the preview. No address or real account is needed. Type "Oak" in the form, then press Enter.',
        steps: [
          'Read the label’s for and the input’s id. Click the label to check focus. The name team_name is how the small script reads the value.',
          'Type "Ox" and try to submit. The browser checks the minimum length and keeps the value available to correct. Type "Oak" and submit.',
          'Read the script as a sequence: querySelector finds a control, addEventListener waits for Submit, disabled blocks extra clicks during the simulated delay, and textContent changes the visible status.',
        ],
        artifact: signup,
        language: 'html',
        result:
          'With Oak, the preview shows Saving… and then Saved for Oak. Ox is too short and stays in the field.',
        change:
          'In the source, change minlength="3" to minlength="4" and change the visible tip to four characters. Preview again and compare Oak with Fern.',
        changedResult:
          'Oak is now too short. Fern reaches the saving state and then Saved for Fern.',
      },
      task: {
        title: 'Repair an onboarding request form',
        brief:
          'A new form must identify its project-code field, send it under the agreed data key and explain a failed save without losing the typed value. Use the contract to plan the repairs before editing.',
        source:
          'Design contract\nInput id: project-code\nSubmitted data key: project_code\nShortest allowed value: 4 characters\nError rehearsal: enable “Simulate unavailable service” and submit MAPL. Correcting the service condition should allow the same value to be retried.',
        fields: [
          field(
            'Value for the visible label’s for attribute',
            'Enter the page identifier.',
            ['project-code'],
            'The label connects to the exact id, including punctuation.',
            'literal',
          ),
          field(
            'Input name sent to the service',
            'Enter the contract’s data key.',
            ['project_code'],
            'Read the submitted data key, distinct from the on-page identifier.',
            'literal',
          ),
          field(
            'Shortest valid length',
            'Enter the minimum number of characters.',
            ['4', 'four'],
            'Read the field rule and test a value one character shorter.',
          ),
        ],
        guide: [
          'Repair the independent starter’s label connection, name and minimum length. Replace the one-word tip with the requirement. Preview the form and Tab to each control.',
          'Try an empty field and a three-letter code, then MAPL. Turn on the unavailable-service checkbox, submit and observe the error. Keep the value, clear the checkbox and retry.',
          'Submit twice quickly. Record whether the button prevents a second pending action. Describe how a real service would use a stable ID to handle repeats after a lost reply. Save the working HTML and one usability correction.',
        ],
        language: 'html',
        starter: `<form id="intake">
  <label for="repair-this">Project code</label>
  <input id="project-code" name="repair_this" required minlength="1" aria-describedby="tip">
  <p id="tip">Required.</p>
  <label><input type="checkbox" id="offline"> Simulate unavailable service</label>
  <button type="submit">Request onboarding</button>
  <p id="message" role="status">Ready.</p>
</form>
<script>
  const form = document.querySelector('#intake');
  const button = form.querySelector('button');
  const message = document.querySelector('#message');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (button.disabled) return;
    button.disabled = true;
    message.textContent = 'Saving…';
    const offline = document.querySelector('#offline').checked;
    const data = new FormData(form);
    setTimeout(function () {
      message.textContent = offline
        ? 'Request could not be saved. Keep the code and try again.'
        : 'Saved project code: ' + data.get('project_code');
      button.disabled = false;
    }, 700);
  });
</script>`,
        checks: [
          {
            label:
              'Visible label is associated with the required project-code control',
            code: `(() => { const i = document.querySelector('#project-code'); return !!i && [...i.labels].some(l => l.textContent.toLowerCase().includes('project code')) && i.required && i.name === 'project_code'; })()`,
          },
          {
            label:
              'The form communicates and enforces the four-character minimum',
            code: `(() => { const i = document.querySelector('#project-code'); const tip = document.getElementById(i.getAttribute('aria-describedby')); return i.minLength === 4 && tip && /4|four/i.test(tip.textContent) && i.tabIndex >= 0; })()`,
          },
          {
            label:
              'A valid submission keeps the value and enters the pending state',
            code: `(() => { const f = document.querySelector('#intake'); const i = f.querySelector('#project-code'); i.value='MAPL'; f.requestSubmit(); return i.value==='MAPL' && f.querySelector('button').disabled && /saving/i.test(document.querySelector('#message').textContent); })()`,
          },
        ],
        template:
          'Task and submitted key …\nKeyboard path …\nShort input and message …\nSimulated failure, retained value, retry …\nTwo quick submissions …\nOne correction and retest …',
        evidence:
          'Save the corrected form and observations from the browser. Identify which protection the browser supplies and which protection belongs at the service.',
        review: [
          'I completed the form by keyboard and checked its label.',
          'I reproduced a failure, retained the typed value and tested recovery.',
          'I recorded one correction and checked a repeated submission.',
        ],
      },
      pitfalls: [
        snag(
          'Clicking the label never places the cursor in the box.',
          'Compare for with id character by character. The input name serves a different purpose.',
        ),
        snag(
          'The success message ends in null.',
          'Check the input name against the key read by FormData.get.',
        ),
      ],
    },
    12: {
      bridge:
        'Week 11 collected a named form value. Week 9 read a request contract. Now write the receiving end, including what happens if another client submits an empty value.',
      goal: 'Implement and test create, read and list behavior at a request boundary with separate team scopes.',
      terms: [
        [
          'Route',
          'A combination of method and path handled by the service. POST /tickets creates a record in this exercise.',
        ],
        [
          'Request body',
          'The data a caller sends. The contract defines its field names, types and allowed values.',
        ],
        [
          'Tenant',
          'A customer organization. A trusted session identifies it so the service can restrict the rows each caller can see.',
        ],
        [
          'Response model',
          'A list of fields the service deliberately returns. Keeping it separate from internal storage helps prevent accidental disclosure.',
        ],
      ],
      steps: [
        step(
          'Write a three-row contract',
          'For create, specify the required field and a 201 response with an ID. For a single lookup, specify a 200 response for a visible record and a 404 for a missing record. For a list, specify which rows match the trusted team. This practice contract uses 422 for invalid input.',
        ),
        step(
          'Build the service decision in Python',
          'Use a dictionary to store records. body.get("name", "") reads the field or returns an empty string. strip removes surrounding spaces. A return such as 201, key gives the caller a pair containing a status and result. The runner passes method, path, trusted team and body directly, in place of a network transport.',
        ),
        step(
          'Test from the caller’s side',
          'Send a full request through the same entry point a client uses. Check the status, returned data and stored count. Never derive the trusted team from a body field chosen by the caller. Return only explicitly allowed fields. In a network service, authentication establishes the team before the handler receives it. A framework such as FastAPI can connect the same rules to HTTP.',
        ),
      ],
      example: {
        title: 'A local booking service',
        setup:
          'Oak and Lime use the same booking service. Each team sees only its own rows. Predict what Lime will receive when it asks for Oak’s booking.',
        steps: [
          'Trace POST first. A valid name creates one dictionary entry and returns a text ID with 201. Invalid input returns early, before any write.',
          'Trace the GET ending in /1. split("/") separates the path into pieces and [-1] selects the last one, the booking ID. The service checks both ID and team.',
          'The GET list returns only keys belonging to the trusted team. sorted puts them in a reproducible order. Only the public name leaves the single-record read.',
        ],
        artifact: service,
        language: 'python',
        result: "(201, '1')\n(200, 'Welcome call')\n(404, 'Not found')",
        change:
          'Change only the team in the final GET from "Lime" to "Oak". Predict the last status and body.',
        changedResult:
          "The last line becomes (200, 'Welcome call'). The program still creates one booking.",
      },
      task: {
        title: 'Enforce a support-ticket contract',
        brief:
          'A separate local ticket client supplies the body and a trusted session team. Determine the correct outcomes, then complete and test the independent service.',
        source:
          'The trial starts empty. POST /tickets with a nonblank subject creates one ticket; an invalid subject returns 422. Hidden or missing IDs return 404.\n1. Nova creates ticket 1 with subject "Invoice copy".\n2. Nova attempts to create a ticket with subject " ".\n3. Orbit requests ticket 1.\n4. Nova lists its tickets.',
        fields: [
          field(
            'Status of request 2',
            'Enter the three-digit status from this contract.',
            ['422'],
            'Trim the subject before checking whether it contains text.',
          ),
          field(
            'Status of request 3',
            'Use the documented response for a ticket outside the caller’s team.',
            ['404'],
            'The trusted team is Orbit while ticket 1 belongs to Nova.',
          ),
          field(
            'Tickets in Nova’s list after all four requests',
            'Enter the record count.',
            ['1', 'one'],
            'Only a successful create adds a list member.',
          ),
        ],
        guide: [
          'Use the runnable starter for an in-browser service rehearsal. Its routes receive a trusted team as a separate argument. Implement the three TODO conditions using the worked booking service.',
          'Run all sample requests. Add a valid creation for a second team, a missing-ID read, and a GET list for each team. Record the status, public response and expected stored count.',
          'Save the service code and request log. Label the transport as an in-process client. A network version can wrap these rules with FastAPI routes and separate input and response models.',
        ],
        language: 'python',
        starter: `tickets = {}
def request(method, path, team, body):
    if method == "POST" and path == "/tickets":
        subject = body.get("subject", "")
        if False:  # TODO: reject non-text and blank subjects
            return 422, "Subject required"
        key = str(len(tickets) + 1)
        tickets[key] = {"subject": subject, "team": team}
        return 201, key
    if method == "GET" and path == "/tickets":
        ids = []
        for key in tickets:
            if False:  # TODO: keep only this team's rows
                ids.append(key)
        return 200, ids
    if method == "GET" and path.startswith("/tickets/"):
        key = path.split("/")[-1]
        if False:  # TODO: check key exists and stored team matches
            return 200, tickets[key]["subject"]
    return 404, "Not found"

print(request("POST", "/tickets", "Nova", {"subject": "Invoice copy"}))
print(request("POST", "/tickets", "Nova", {"subject": " "}))
print(request("GET", "/tickets/1", "Orbit", {}))
print(request("GET", "/tickets", "Nova", {}))
print("Stored count:", len(tickets))`,
        checks: [
          {
            label: 'Create returns an ID and read returns its public subject',
            code: `tickets.clear()
status, test_id = request("POST", "/tickets", "Aspen", {"subject": "Export help"})
assert status == 201 and request("GET", "/tickets/"+str(test_id), "Aspen", {}) == (200, "Export help")`,
          },
          {
            label: 'Blank and non-text subjects cannot create a row',
            code: `count_before = len(tickets)
assert request("POST","/tickets","Aspen",{"subject":" "})[0] == 422
assert request("POST","/tickets","Aspen",{"subject":17})[0] == 422 and len(tickets) == count_before`,
          },
          {
            label: 'List and lookup enforce trusted team scope',
            code: `tickets.clear()
_, first_id = request("POST","/tickets","Oak",{"subject":"Invoice","team":"Lime"})
_, second_id = request("POST","/tickets","Lime",{"subject":"Invitation"})
assert request("GET", "/tickets/"+str(first_id), "Lime", {})[0] == 404
assert request("GET", "/tickets/missing", "Oak", {})[0] == 404
assert request("GET", "/tickets", "Oak", {}) == (200, [first_id])`,
          },
        ],
        template:
          'Transport and routes …\nValid create and same-team read …\nBlank subject and stored count …\nMissing ID and other-team lookup …\nTeam-scoped lists …\nFields exposed in a response …',
        evidence:
          'Save the service and a short contract table. Pair each test request with its observed status and body, including one cross-team and one missing-ID lookup.',
        review: [
          'I tested create, read and list through the request entry point.',
          'I verified the failed write left storage unchanged.',
          'I checked team scope and named the public response fields.',
        ],
      },
      pitfalls: [
        snag(
          'The valid record appears in both teams’ lists.',
          'Add the same trusted-team check to the list that protects an individual read.',
        ),
        snag(
          'A field full of spaces creates a ticket.',
          'Check the type first, then strip surrounding spaces and test whether any text remains.',
        ),
      ],
    },
    13: {
      bridge:
        'Week 12 returns a team-scoped list. Reuse that idea to choose the rows behind a dashboard. Week 7’s filtered counts provide a way to check what the screen claims.',
      goal: 'Create a filterable display with two defined measurements, counts, data freshness and an honest empty state.',
      terms: [
        [
          'Metric',
          'A named measurement with a unit and a rule for which rows contribute.',
        ],
        [
          'Numerator and denominator',
          'The numerator counts rows meeting the outcome; the denominator counts all eligible rows under the same filter.',
        ],
        [
          'Cohort',
          'A group defined by a shared condition such as account, start month or queue.',
        ],
        [
          'Snapshot',
          'A copy taken at a known time. An old snapshot may miss newer work.',
        ],
      ],
      steps: [
        step(
          'Name a decision and a unit',
          'Write one sentence about the decision, for example whether a lead should offer onboarding help to a cohort. Specify what one row means, the filter, the time window and the measure.',
        ),
        step(
          'Build one filtered group',
          'An HTML select creates a menu. In rows.filter(row => row.cohort === chosen), row names one record, the arrow introduces its keep rule and === asks whether the two values match. Use the same filtered group for the count, rate and label. If A is 1/2 and B is 1/1, combine the counts for 2/3.',
        ),
        step(
          'Handle uncertainty before displaying a percent',
          'Check the denominator before dividing. Zero eligible rows means a rate cannot be computed. An unavailable source means coverage is unknown even if the last view was empty. Show a refresh time, counts and the visible filter so another person can check the decision.',
        ),
      ],
      example: {
        title: 'Filter a three-workspace activation dashboard',
        setup:
          'One row represents one eligible workspace in a fictional snapshot. The two measurements are active-workspace count and activation rate. Switch between All, Spring, Summer and Fall.',
        steps: [
          'Each row holds a cohort and a true/false active field. The change event redraws the panel when the menu changes.',
          'The active count is the group members whose active value is true. length counts them. Math.round makes the displayed percent a whole number.',
          'Read the count beside the percent. Select Fall to inspect the no-data message. The snapshot time remains visible in every state.',
        ],
        artifact: dashboard,
        language: 'html',
        result:
          'All · 2 active of 3 eligible · 67%\nSpring · 1 active of 2 eligible · 50%\nFall · No eligible workspaces.',
        change:
          'Set the Spring row whose active value is false to true. Preview again and select Spring. Predict both its count and rate.',
        changedResult:
          'Spring · 2 active of 2 eligible · 100%. All now shows 3 active of 3 eligible.',
      },
      task: {
        title: 'Build a queue-coverage dashboard',
        brief:
          'A lead needs the number of open tickets and the closure rate for each support queue. The same filter must control the label and both measurements.',
        source:
          'Fictional November 2 snapshot at 09:00 UTC.\nAccess: T20 open, T21 closed, T22 closed, T23 open.\nBilling: T24 closed, T25 open.\nExport: no ticket rows.\nEach ticket appears once. Closure rate = closed tickets / all tickets in the selected group.',
        fields: [
          field(
            'Open Access tickets',
            'Count only open records in the Access queue.',
            ['2', 'two'],
            'Tally the statuses of the four Access rows.',
          ),
          field(
            'Closure rate across both populated queues (%)',
            'Enter a percentage, combining the records first.',
            ['50', '50%', '50.0', '50.0%'],
            'Use every closed ticket in the numerator and all six tickets in the denominator.',
          ),
          field(
            'Denominator for Export',
            'Enter the eligible-row count.',
            ['0', 'zero'],
            'Only the rows matching Export contribute to its denominator.',
          ),
        ],
        guide: [
          'Enter the six case rows as objects separated by commas in the independent HTML starter. An object such as {id: "X9", queue: "Trial", status: "pending"} holds one row; separate neighboring objects with commas. Add menu items following <option>Trial</option>. A property can be read as row.status. For example, group.filter(row => row.status === "pending").length counts matching pending rows. Use group.filter with a condition on each row’s status, then .length to count the matches. Do this separately for open and closed. Keep the snapshot time visible.',
          'Choose Access and verify the open count, closed count, denominator and rate by hand. Try Export, then choose All. Write one staffing decision the snapshot supports and one unanswered question.',
          'For a larger portfolio sample, replace the six rows with a named subset of tickets.csv. Record its queue, row count and freshness. Keep the subset distinct from the entire downloaded fixture.',
        ],
        language: 'html',
        starter: `<label for="queue">Ticket queue</label>
<select id="queue"><option>All</option><option>Access</option>
<!-- Add Billing and Export options here. -->
</select>
<p id="view" role="status"></p>
<p>Snapshot: November 2, 09:00 UTC (fictional).</p>
<script>
const tickets = [
  {id: 'T20', queue: 'Access', status: 'open'}
  // Add the other five records, separated by commas.
];
const menu = document.querySelector('#queue');
function redraw() {
  const group = tickets.filter(t => menu.value === 'All' || t.queue === menu.value);
  const open = 0;   // Replace with a count of open records in group.
  const closed = 0; // Replace with a count of closed records in group.
  const label = menu.value + ' · ';
  document.querySelector('#view').textContent = group.length
    ? label + open + ' open · ' + closed + '/' + group.length + ' closed · ' + Math.round(100 * closed / group.length) + '%'
    : label + 'No eligible tickets.';
}
menu.addEventListener('change', redraw);
redraw();
</script>`,
        checks: [
          {
            label: 'Access shows its open count and closed fraction',
            code: `(() => { const q=document.querySelector('#queue'); q.value='Access'; q.dispatchEvent(new Event('change')); const text=document.querySelector('#view').textContent; return /access/i.test(text) && /2\\s+open/i.test(text) && /2\\s*\\/\\s*4/.test(text) && /50%/.test(text); })()`,
          },
          {
            label: 'Billing filter changes the displayed population',
            code: `(() => { const q=document.querySelector('#queue'); q.value='Billing'; q.dispatchEvent(new Event('change')); const text=document.querySelector('#view').textContent; return /billing/i.test(text) && /1\\s+open/i.test(text) && /1\\s*\\/\\s*2/.test(text) && /50%/.test(text); })()`,
          },
          {
            label: 'Export has an explicit empty result',
            code: `(() => { const q=document.querySelector('#queue'); q.value='Export'; q.dispatchEvent(new Event('change')); const text=document.querySelector('#view').textContent; return /export/i.test(text) && /no eligible tickets/i.test(text) && !/%/.test(text); })()`,
          },
        ],
        template:
          'Decision …\nSnapshot and unit of each row …\nMetric definitions and exact filters …\nHand check and displayed result …\nEmpty group …\nUnknown or limitation …',
        evidence:
          'Save the runnable dashboard and a reconciliation for one queue. Include the no-match result, the snapshot time and one limitation.',
        review: [
          'Both metrics and their caption use the selected queue.',
          'I reconciled counts and rate with the underlying rows.',
          'I tested the empty state and identified what the snapshot cannot answer.',
        ],
      },
      pitfalls: [
        snag(
          'Two queues each say 50%, but the total seems wrong.',
          'Recalculate from total closed and total eligible rows. Averages of group percentages weight unequal groups incorrectly.',
        ),
        snag(
          'A missing queue shows 0% or NaN.',
          'Check whether the filtered array is empty before performing division.',
        ),
      ],
    },
    14: {
      bridge:
        'Week 13 produced a working dashboard and a hand-checked queue. Turn that evidence into a release another operator can reproduce using only the named artifact and instructions.',
      goal: 'Run a release rehearsal, reproduce a defect from a clean start, fix it and compare the retest against an explicit release decision.',
      terms: [
        [
          'Release',
          'A specific, identifiable version that someone else can run. A named file or Git tag identifies it.',
        ],
        [
          'Acceptance test',
          'One user goal plus concrete conditions that decide whether the product meets that goal.',
        ],
        [
          'Smoke test',
          'A short check that the main path runs in a fresh environment.',
        ],
        [
          'Rollback trigger',
          'An observable condition that tells the owner when to halt or return to a known working version.',
        ],
      ],
      steps: [
        step(
          'Package a repeatable starting point',
          'Give the release its own version name. Record the file to open, any dependencies, a fictional sample, and the expected first screen. A single self-contained HTML dashboard needs a browser and its HTML file. A Python project also needs the correct interpreter and dependency versions.',
        ),
        step(
          'Watch one task from the beginning',
          'Open a fresh preview or private browser session. Give the operator one goal and an acceptance criterion, such as “choose Access and verify two eligible tickets.” Record the actions, exact output and where help was needed. A solo run is a rehearsal and should be labeled that way.',
        ),
        step(
          'Decide with a predefined rule',
          'Write down the owner, pilot version, previous version, stop condition and recovery steps before the test. When a failure appears, record the version, steps, expected versus observed result and impact. Make the smallest repair, give it a new version and repeat the same test.',
        ),
      ],
      example: {
        title: 'Rehearse a signup-export release',
        setup:
          'An onboarding lead must export only accepted registrations. Trace the rows against the written acceptance rule before reading the observed result.',
        steps: [
          'Read the rule first and circle the two eligible IDs.',
          'Compare the actual IDs with the expected list. The extra pending registration is direct evidence that filtering failed.',
          'Use the named fallback. After repair, run the identical test on the same fixture. Record a separate follow-up for untested cases.',
        ],
        artifact:
          'Release v0.4 | owner: onboarding lead | fallback: v0.3\nAcceptance: exported ID set equals accepted registrations.\nFixture: R2 accepted, R6 pending, R8 accepted.\nSteps: open v0.4 in clean window → choose Accepted → export.\nObserved IDs: R2, R6, R8.\nStop condition: any pending ID in export.\nFix in v0.4.1: filter on status before creating the export.\nRetest observed IDs: R2, R8.',
        language: 'case',
        result:
          'Hold v0.4. R6 is pending. v0.4.1 passes the original rehearsal with exactly two IDs. An empty export is still untested.',
        change:
          'Suppose the retest of v0.4.1 returns only R2. Predict the release decision using the acceptance rule, even though no pending row appears.',
        changedResult:
          'Keep the release on hold. R8 is missing, so the ID set still fails acceptance. Restore v0.3 and record the new failure.',
      },
      task: {
        title: 'Make a go-or-hold decision for a pilot',
        brief:
          'A support team plans to release a queue dashboard. Review its evidence, then rehearse and repair the dashboard built in Week 13.',
        source:
          'Stable version: v1.1. Candidate: v1.2.\nAcceptance: selecting Birch shows exactly B3 and B8 and only Birch rows.\nObserved on clean start: B3, B8, M5. M5 belongs to Maple.\nRule: hold the candidate and restore the stable version if another account appears.\nFix candidate v1.2.1 returns B3 and B8 on the same fixture.',
        fields: [
          field(
            'Decision on v1.2 (go or hold)',
            'Use the release rule and the observed IDs.',
            ['hold'],
            'Compare the account on every returned ID with the selected account.',
          ),
          field(
            'Version to restore',
            'Enter the named reproducible fallback.',
            ['v1.1', '1.1'],
            'Look for the last stable version in the release record.',
          ),
          field(
            'Number of matching IDs in the successful retest',
            'Count only the expected Birch rows.',
            ['2', 'two'],
            'Reconcile the repaired output with the expected ID set.',
          ),
        ],
        guide: [
          'Apply the filter pattern from Week 13 to the included v1.2 release, which opens in the project editor. The fictional stable fallback is v1.1. Open the defective preview first, select Birch and Maple and record the unexpected ticket IDs. Identify the operator, start state and stop condition. Label a solo run as a rehearsal.',
          'Create the new named release by changing the version text to v1.2.1. In draw(), replace the assignment that takes every row with a filter comparing the row’s account to the selected account. The Week 13 dashboard demonstrates the same filter pattern. Keep #account, #ids and #version in the markup so the release tests can operate it.',
          'Open the repaired preview and repeat the original test for both accounts. Download the repaired HTML and save a handoff with the file to open, expected IDs, one reproducible report and the named fallback. Apply the same clean-start smoke test to the personal Week 13 dashboard and log one observation.',
        ],
        language: 'html',
        starter: `<h2>Queue release rehearsal</h2>
<p>Version <span id="version">v1.2</span></p>
<label for="account">Account</label>
<select id="account"><option>Birch</option><option>Maple</option></select>
<p>Ticket IDs for the selected account</p>
<ul id="ids"></ul>
<script>
const rows = [
  {id:'B3', account:'Birch'}, {id:'B8', account:'Birch'}, {id:'M5', account:'Maple'}
];
const account = document.querySelector('#account');
function draw() {
  const group = rows; // Release defect: every account's rows appear.
  const list = document.querySelector('#ids');
  list.replaceChildren();
  for (const row of group) {
    const item = document.createElement('li');
    item.textContent = row.id;
    list.append(item);
  }
}
account.addEventListener('change', draw);
draw();
</script>`,
        checks: [
          {
            label: 'The repaired release has a new version',
            code: `document.querySelector('#version').textContent.trim() === 'v1.2.1'`,
          },
          {
            label: 'Birch shows exactly its two expected IDs',
            code: `(() => { const s=document.querySelector('#account'); s.value='Birch'; s.dispatchEvent(new Event('change')); return [...document.querySelectorAll('#ids li')].map(e=>e.textContent.trim()).sort().join(',')==='B3,B8'; })()`,
          },
          {
            label: 'Maple sees only its own ticket',
            code: `(() => { const s=document.querySelector('#account'); s.value='Maple'; s.dispatchEvent(new Event('change')); return [...document.querySelectorAll('#ids li')].map(e=>e.textContent.trim()).join(',')==='M5'; })()`,
          },
        ],
        template:
          'Release … fallback … owner …\nSetup from a clean start …\nUser goal and acceptance rule …\nReviewer or solo rehearsal …\nActions, expected and observed …\nImpact, change and retest …\nStop trigger and recovery steps …',
        evidence:
          'Save a handoff a new operator can follow. Cite the two version names and provide the original and repaired observations from the same task.',
        review: [
          'My named release can be opened with the supplied setup instructions.',
          'I recorded a real walkthrough or labeled the solo rehearsal.',
          'I applied a stop rule and verified the repair with the same acceptance test.',
        ],
      },
      pitfalls: [
        snag(
          'The candidate works only in an already-open tab.',
          'Open the versioned artifact from a fresh session with only the listed sample files.',
        ),
        snag(
          'A runbook says “if it breaks, roll back.”',
          'Specify the exact failed observation, who pauses the pilot and which prior version to open.',
        ),
      ],
    },
    15: {
      bridge:
        'Week 14 fixed an acceptance rule before running a release. Apply the same discipline to an LLM comparison. Familiarity with prompting helps design the experiment; reproducible cases and evidence make the result useful to a hiring team.',
      goal: 'Compare two simulated candidates fairly on a fixed set, inspect high-impact misses and estimate token cost without purchasing model access.',
      terms: [
        [
          'Token and context window',
          'A token is a model-sized piece of text. The context window bounds how much the model can handle in one request. Input and generated output may have different prices.',
        ],
        [
          'Rubric',
          'A written rule specifying what earns a pass before seeing candidate results.',
        ],
        [
          'Held-out set',
          'Fresh cases kept separate from prompt tuning for a later check.',
        ],
        [
          'Grounding and latency',
          'Grounding asks whether the supplied source supports a claim. Latency measures elapsed response time. Fluency alone measures neither.',
        ],
      ],
      steps: [
        step(
          'Keep each comparison paired',
          'Give each candidate the same cases, supporting text, instruction and scoring rules. Change only the variable being tested. Record the candidate versions and prompt version. Hide candidate identities during manual review when possible.',
        ),
        step(
          'Score the action and its evidence separately',
          'A useful support rubric checks the chosen action, meaning of the claim and whether the cited passage supports it. An answer can pick the right action while inventing a fact. A correct abstention can be the safest outcome when a policy is silent.',
        ),
        step(
          'Count cases and price the tokens',
          'For each configuration count passes out of all assigned cases. Inspect a difficult slice, such as escalation requests. Divide input and output tokens by 1,000 and multiply each by its own fictional price, then add the two amounts. Compare latency only when measured. Keep fresh cases for the final decision.',
        ),
      ],
      example: {
        title: 'Compare two action-label prompts',
        setup:
          'A low-cost onboarding assistant must choose send or hold. This small worked exercise measures exact action-label agreement. It does not evaluate prose quality.',
        steps: [
          'The four expected labels and their order stay fixed. A and B each supply one label for every case.',
          'range(len(expected)) visits the four positions. On an equal label, count increases by one. Compare both candidates on the same positions.',
          'The final two lines use invented prices per thousand tokens. Keep full precision until after adding input and output costs.',
        ],
        artifact: compare,
        language: 'python',
        result: 'A matches: 3\nB matches: 4\nB cost in dollars: 0.03',
        change:
          'Increase output_tokens from 250 to 500, leaving every label and price unchanged. Predict the new B cost and both match counts.',
        changedResult:
          'B costs $0.04. A still matches 3/4 and B matches 4/4 because the labels did not change.',
      },
      task: {
        title: 'Audit a model comparison for a support team',
        brief:
          'Use the independent mini-run to check the arithmetic, then grade the full 20-case support fixture. Separate automatic action matching from a human judgment about claims and citations.',
        source:
          'The expected next actions for four fictional requests are answer, escalate, abstain, answer.\nCandidate C: answer, answer, abstain, answer.\nCandidate D: answer, escalate, answer, answer.\nD used 2,000 input tokens at $0.02 per 1,000 plus 500 output tokens at $0.06 per 1,000.',
        fields: [
          field(
            'Correct action labels for C',
            'Count exact position-by-position matches.',
            ['3', 'three'],
            'Compare the four labels with the expected actions in order.',
          ),
          field(
            'Request number where D makes an unsupported answer',
            'Number the requests from 1.',
            ['3', 'third', '3rd'],
            'Find the case whose expected response is to abstain.',
          ),
          field(
            'D cost in dollars',
            'Include both input and output charges.',
            ['0.07', '0.070', '$0.07', '.07'],
            'Price input thousands and output thousands separately before adding.',
          ),
        ],
        guide: [
          'Write a rubric before inspecting the simulated responses. Freeze the 20 case IDs, same handbook passages and a common rule for actions, citation support and unsupported promises. Version the rubric and identify these outputs as fictional.',
          'The starter loads both CSVs. csv.DictReader uses their header names as dictionary keys and handles commas inside quoted text. Complete the action-match comparison in the loop. Find a disagreement and inspect the actual words against the handbook. Score each candidate’s answer and citation on all 20 cases in the journal or a saved table.',
          'Report action-match counts separately from your full rubric. Name a failure slice, one case needing a human and an invented token-rate calculation. State what a fresh held-out check should measure before a pilot. Latency is unmeasured in the supplied files.',
        ],
        language: 'python',
        assetFiles: {
          'eval-cases.csv': 'assets/academy/eval-cases.csv',
          'model-outputs.csv': 'assets/academy/model-outputs.csv',
          'knowledge-base.txt': 'assets/academy/knowledge-base.txt',
        },
        starter: `import csv
with open("eval-cases.csv") as file:
    cases = {}
    for row in csv.DictReader(file):
        cases[row["case_id"]] = row
with open("model-outputs.csv") as file:
    outputs = list(csv.DictReader(file))

def action_matches(proposed, expected):
    return False  # TODO: compare these two labels

scores = {"A": 0, "B": 0}
for row in outputs:
    case = cases[row["case_id"]]
    candidate = row["candidate"]
    if action_matches(row["proposed_action"], case["expected_action"]):
        scores[candidate] += 1
    print(row["case_id"], candidate, row["response"], "cites", row["cited_source"])
print("Action matches:", scores)
print("Cases per candidate:", len(cases))`,
        checks: [
          {
            label: 'Equal actions pass and different actions fail',
            code: 'assert action_matches("answer", "answer") and action_matches("abstain", "abstain") and not action_matches("answer", "escalate")',
          },
          {
            label: 'Both action totals reconcile to the frozen 20 cases',
            code: 'assert len(cases) == 20 and len(outputs) == 40 and scores == {"A":18,"B":19}',
          },
        ],
        template:
          'Fixture and rubric version …\nPass rule for action, claim and evidence …\nCase table (repeat for C01–C20): ID | A action/claim/citation | B action/claim/citation | reason …\nAction totals vs full rubric totals …\nCritical miss and source …\nToken counts, assumed prices, total cost …\nHuman review rule … Held-out check …',
        evidence:
          'Save the scoring program and paired case table. Separate observed fixture results, invented prices and the proposed next experiment in the recommendation.',
        review: [
          'I used the same frozen cases and rules for both candidates.',
          'I inspected factual claims and citations as well as action counts.',
          'I reported costs with units, an important failure and the limits of simulated evidence.',
        ],
      },
      pitfalls: [
        snag(
          'A correct route hides an incorrect citation.',
          'Score claim and citation independently. Open the cited source and compare the exact policy, version and exception.',
        ),
        snag(
          'The computed cost is hundreds of times too high.',
          'Check the pricing unit on both rates. Divide tokens by 1,000 before multiplying by a per-thousand price.',
        ),
      ],
    },
    16: {
      bridge:
        'Week 15 exposed a difference between a plausible answer and a supported one. Keep the same fictional handbook and trace precisely which passages reach the answer stage.',
      goal: 'Retrieve allowed passages by keyword, distinguish a retrieval failure from an answer failure, and abstain when sources cannot resolve a question.',
      terms: [
        [
          'Retrieval-augmented generation (RAG)',
          'A system first finds relevant source passages, then gives the evidence and question to an answer stage.',
        ],
        [
          'Chunk and index',
          'A chunk is a short passage with its heading, conditions and source ID. An index organizes passages so they can be found again.',
        ],
        [
          'Top-k',
          'The maximum number of candidate passages to return. A higher limit can improve coverage while adding noise and consuming context.',
        ],
        [
          'Abstain',
          'State the missing fact or request human review when the permitted evidence cannot support a reliable answer.',
        ],
      ],
      steps: [
        step(
          'Construct a source sheet',
          'Give each passage an ID and keep its rule with relevant dates and exceptions. An embedding is a numerical representation useful for similarity search. A small keyword index is enough to demonstrate the pipeline. Restrict the searchable set to documents the caller may view before ranking.',
        ),
        step(
          'Inspect evidence before drafting',
          'For each allowed passage, count matching terms and rank candidates. Keep their IDs. An expected passage missing from the retrieved set points to retrieval, possibly a bad chunk, stale metadata, the wrong query or an overly narrow k.',
        ),
        step(
          'Check the answer against the retrieved passage',
          'A matching keyword is only a lead. Confirm the entity, account type, status, date and claim in the text. If the right passage is present but the answer contradicts it, investigate generation or grounding. Resolve an archived/current pair by documented precedence. Escalate an unresolved conflict or unsupported question.',
        ),
      ],
      example: {
        title: 'Follow a keyword to a cited passage',
        setup:
          'Three short fictional passages have compact search tags. Predict which one will be displayed for paid export and compare the actual source text with the question.',
        steps: [
          'Each tuple contains a source ID, search tags and an excerpt. lower().split() converts a short query into lowercase words.',
          'The loop adds one point per matching query word. A higher score replaces the current best. With equal scores this tiny example keeps the first matching passage.',
          'hit[0] identifies the selected source and hit[1] holds the exact passage. This demonstration displays evidence directly; a person must still verify whether it answers the question.',
        ],
        artifact: search,
        language: 'python',
        result: 'P2 Paid exports last 18 days.',
        change:
          'Replace the query "paid export" with "overnight shipping". Predict what happens when no tag matches.',
        changedResult: 'No matching source',
      },
      task: {
        title: 'Trace evidence for a new handbook question',
        brief:
          'Audit the separate access-policy case, then build a searchable source sheet for the five passages in the academy handbook.',
        source:
          'A1, archived: trial access lasts 8 days.\nA2, current: trial access lasts 12 days after activation.\nA3, current: paid access lasts 40 days after activation.\nRequest: Trial access duration after activation.\nRun I retrieved only A3. Run II retrieved A2 and A3 but replied “40 days for trials [A3].”\nNo passage covers suspended accounts.',
        fields: [
          field(
            'Source ID that supports the current trial answer',
            'Enter the ID of the passage with the correct status and account type.',
            ['A2'],
            'Check both the account type and the revision status.',
          ),
          field(
            'Failing stage in Run I (retrieval or generation)',
            'Inspect whether the correct passage reached the answer stage.',
            ['retrieval'],
            'Check the retrieved IDs before judging what the answer said.',
          ),
          field(
            'Action for a suspended-account question (answer or abstain)',
            'Use only the listed evidence.',
            ['abstain'],
            'Find a source explicitly covering suspended accounts before making a promise.',
          ),
        ],
        guide: [
          'The starter loads the real fictional handbook and separates the five bracketed IDs into chunks. Read the first printed chunk and identify the title, revision status and exception. Complete the overlap calculation in retrieve. words(query) and words(text) each return a set. The & operator keeps the shared words and len counts them. For example, len({"paid", "export"} & {"trial", "export"}) is 1.',
          'Run “invitation expires” with k=1 and k=3. Log the actual returned IDs and cite only a passage that directly supports the claim. Also test an unsupported premium-support target and the archived/current standard-response conflict. A retrieved keyword match may still require abstention.',
          'Change the approved filter or k and compare the candidate IDs. Record whether the change fixed retrieval or only changed which sources needed review. Write one answer, one abstention and one version-resolution note with the relevant IDs.',
        ],
        language: 'python',
        assetFiles: {
          'knowledge-base.txt': 'assets/academy/knowledge-base.txt',
        },
        starter: `import re
with open("knowledge-base.txt") as file:
    chunks = file.read().split("\\n\\n")
docs = {}
for chunk in chunks:
    if chunk.startswith("["):
        source_id = chunk.split("]")[0][1:]
        docs[source_id] = chunk

def words(text):
    return set(re.findall(r"[a-z0-9]+", text.lower()))

def retrieve(query, k=2, approved_only=True):
    matches = []
    for source_id, text in docs.items():
        if approved_only and "Status: approved" not in text:
            continue
        score = 0  # TODO: count words shared by query and text
        if score > 0:
            matches.append((-score, source_id))
    matches.sort()
    return [source_id for score, source_id in matches[:k]]

print("Indexed IDs:", sorted(docs))
print(docs["S2"])
for query in ["invitation expires", "premium support target", "standard first response"]:
    ids = retrieve(query, k=2)
    print(query, ids)
    for source_id in ids:
        print(docs[source_id])`,
        checks: [
          {
            label:
              'Five sources indexed and invitation question retrieves the onboarding passage',
            code: 'assert len(docs) == 5 and retrieve("invitation", 1) == ["S5"]',
          },
          {
            label:
              'Unknown terms return an empty list and archived sources stay outside approved-only search',
            code: 'assert retrieve("watermelon submarine") == [] and "S1" not in retrieve("standard", 5) and "S1" in retrieve("standard", 5, False)',
          },
        ],
        template:
          'Index: ID, title, status and access rule …\nFor each of three questions: query … expected source … retrieved IDs and k … answer or abstention … exact evidence …\nArchived/current conflict and precedence …\nChanged setting and result …\nFailure stage and repair …',
        evidence:
          'Save the retrieval code and three query traces. For each claim record the supporting excerpt and ID, then explain one failure and the tested repair.',
        review: [
          'I indexed five permitted source passages and kept their metadata.',
          'I traced answerable, unsupported and conflicting-policy questions.',
          'I compared retrieval settings and checked each supported claim against its cited source.',
        ],
      },
      pitfalls: [
        snag(
          'A nearby keyword leads to an unsupported answer.',
          'Inspect the retrieved passage for the relevant tier, action and condition before drafting.',
        ),
        snag(
          'A current and archived passage give different durations.',
          'Read their revision and effective-date metadata. If priority cannot be established, report the conflict and seek a policy owner.',
        ),
      ],
    },
  });
})();
