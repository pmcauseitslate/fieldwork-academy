// Each workshop opens a week of study and project work on the Fieldwork AI course.
(() => {
  'use strict';

  function option(text, feedback) {
    return { text, feedback };
  }

  function check(prompt, correct, options) {
    return { prompt, correct, options };
  }

  function lesson({
    week,
    id,
    title,
    summary,
    teaching,
    example,
    project,
    questions,
  }) {
    return {
      week,
      id,
      title,
      summary,
      minutes: 15,
      teaching,
      questions,
      example: { title: example[0], text: example[1] },
      project: {
        prompt: project[0],
        placeholder: project[1],
        deliverable: project[2],
      },
    };
  }

  window.COURSE_LEVELS = [
    {
      id: 'foundations',
      title: 'Programming foundations',
      summary:
        'Learn Python by turning estimating, purchasing and change-order problems into small, tested programs.',
      badge: 'Python Builder',
      lessons: [
        lesson({
          week: 1,
          id: 'labor-calculator',
          title: 'Build a labor calculator',
          summary:
            'Use variables, numeric inputs and functions to estimate straight-time labor.',
          teaching: [
            'Start with a calculation you can do on paper. Give every input a name and a unit. A simple labor estimate needs the crew size, hours per person and hourly rate. The product is an estimated labor cost. A workday length, overhead and payroll rules would need separate assumptions.',
            'In Python, input() gives you text. Convert values to numbers before doing arithmetic. Put the calculation in a function that takes arguments and returns a result. Keep the questions to the user and the printed display outside that function. This lets you run the same calculation with another crew or test it directly. To quote a markup on direct costs, multiply the combined labor and material cost by 1 + markup_percent / 100.',
          ],
          example: [
            'Estimate one shift',
            'Three people working six hours each at $24 per hour cost 3 × 6 × 24 = $432 in straight-time labor. A Python function can express that as def labor_cost(people, hours, rate): followed by an indented return people * hours * rate. Label the result in dollars and record that overtime and overhead are outside this estimate.',
          ],
          project: [
            'Build a labor-cost calculator using fictional crew data. Ask for the inputs with units, return the total from a function, and test two shifts against a hand calculation. In your notebook, record the two inputs and outputs and one cost your calculator excludes.',
            'Crew, hours and rate … Expected and observed total … Scope of estimate …',
            'A working function, two checked shifts and a stated pricing assumption.',
          ],
          questions: [
            check(
              'Four people each work five hours at $30 per hour. Which output matches the estimate?',
              1,
              [
                option(
                  '$150',
                  'That covers one person for five hours. Multiply by the crew size as well.',
                ),
                option(
                  '$600',
                  'Four times five gives 20 person-hours. At $30 each, the cost is $600.',
                ),
                option(
                  '$120',
                  'That is the four-person cost for a single hour.',
                ),
              ],
            ),
            check(
              'Your calculator must work with several crews. What should the calculation function receive?',
              2,
              [
                option(
                  'A sentence containing the completed estimate.',
                  'The function would have to recover the inputs from a display message.',
                ),
                option(
                  'The name of the person running the program.',
                  'The operator’s name does not supply the quantities the calculation needs.',
                ),
                option(
                  'Crew size, hours per person and hourly rate as numbers.',
                  'Explicit inputs let the function calculate a new total and make it easy to check with known values.',
                ),
              ],
            ),
          ],
        }),
        lesson({
          week: 2,
          id: 'budget-loop',
          title: 'Build a budget checker',
          summary:
            'Use conditions and loops to total line items and flag a budget overrun.',
          teaching: [
            'A condition chooses a branch. Write the boundary rule in words before choosing an operator. If an overrun means spending more than the budget, an actual cost exactly equal to the budget is on budget. Capture that equality case in a test.',
            'A loop applies the same operation to each item. Set your running total to zero before the loop, add each line cost once, then compare the finished total with the budget. Reuse last week’s function for labor and label materials in the same currency.',
          ],
          example: [
            'Check the boundary',
            'A $1,000 project includes $600 of labor, $240 of materials and $160 of equipment. The total is exactly $1,000. The rule actual > budget returns false. Replacing the equipment figure with $165 gives $1,005 and a $5 overrun.',
          ],
          project: [
            'Build a budget checker for a fictional job with at least three cost items. Reuse a labor calculation, loop over the items and report both the total and the budget status. Record an under-budget case, an exact match and an overrun.',
            'Line items … Total and budget … Boundary tests …',
            'A running total and correct status for below, equal to and above budget.',
          ],
          questions: [
            check(
              'An overrun starts only when actual cost exceeds the budget. Which condition fits?',
              0,
              [
                option(
                  'actual > budget',
                  'This flags a positive overrun and leaves an exact match on budget.',
                ),
                option(
                  'actual >= budget',
                  'This would incorrectly flag an exact match.',
                ),
                option(
                  'budget > actual',
                  'This flags the case where money remains.',
                ),
              ],
            ),
            check(
              'A loop over $80, $25 and $10 returns only $10. Which issue best explains that result?',
              1,
              [
                option(
                  'The final total is displayed after the loop.',
                  'Displaying after the loop is appropriate when you need the overall total.',
                ),
                option(
                  'The running total is reset to zero inside each iteration.',
                  'Resetting within the loop discards every earlier item. Initialize once before iterating.',
                ),
                option(
                  'Each line is added exactly once to a total initialized before the loop.',
                  'That behavior should produce $115.',
                ),
              ],
            ),
          ],
        }),
        lesson({
          week: 3,
          id: 'material-validation',
          title: 'Validate material orders',
          summary:
            'Handle invalid entries and use a library function to buy whole packs.',
          teaching: [
            'Separate two ways an input can fail. A word like “twelve” may raise ValueError when converted with int(). A number like −12 converts successfully but fails a positive-quantity rule. Show a specific message so the person can correct the entry. Catch the exception you expect close to the conversion.',
            'Match the calculation to the purchasing unit. If materials come in packs, divide units needed by units per pack and round upward to a whole pack with math.ceil(). Validate the pack size before division, and apply the budget check after calculating the price of all required packs.',
          ],
          example: [
            'Round a purchase upward',
            'A crew needs 23 anchors. Packs contain 10 anchors and cost $8 each. math.ceil(23 / 10) gives three packs. The order costs $24 and leaves seven anchors. A pack size of zero needs a correction before this calculation can run.',
          ],
          project: [
            'Extend the budget tool with a material-order function. Accept units needed, pack size and pack price. Handle words entered for a number and a zero pack size. Record the result for an exact pack and a partial pack, including the effect on the budget.',
            'Valid example … Invalid entry and recovery … Total sent to budget checker …',
            'A validated pack calculation with exact-pack, partial-pack and invalid-input evidence.',
          ],
          questions: [
            check(
              'A buyer needs 31 boards and each pack holds 10. Which result covers the requirement?',
              2,
              [
                option(
                  'Three packs because 3.1 rounds to 3.',
                  'Nearest-integer rounding leaves one board missing.',
                ),
                option(
                  '3.1 packs because the division is exact.',
                  'The supplier sells whole packs.',
                ),
                option(
                  'Four packs because any remainder requires another whole pack.',
                  'Four packs supply 40 boards, which covers all 31 requested.',
                ),
              ],
            ),
            check(
              'The text “0” converts successfully to an integer for units per pack. What should happen next?',
              0,
              [
                option(
                  'Reject zero with a clear message before dividing.',
                  'Conversion checks the input type. A separate business rule must enforce a positive pack size.',
                ),
                option(
                  'Let the conversion exception handler reject it.',
                  'Converting the string “0” to an integer succeeds.',
                ),
                option(
                  'Replace zero silently with one.',
                  'That would invent a supplier pack size and could change the cost.',
                ),
              ],
            ),
          ],
        }),
        lesson({
          week: 4,
          id: 'csv-and-tests',
          title: 'Read and test project files',
          summary:
            'Read CSV data by column name and check calculations with known results.',
          teaching: [
            'A CSV file stores rows of text. Use Python’s csv.DictReader to read named fields and with open(..., newline="") to close the file when the operation ends. A CSV parser handles quoted commas that would break a simple split on a comma. Convert quantity and price only after reading the fields.',
            'Test your calculation separately from the file reader. Make a tiny fixture, which is a sample with a result you know in advance. Test the ordinary case and at least one bad row. Decide whether to stop or flag the row, and make that decision visible in the output.',
          ],
          example: [
            'A comma inside a field',
            'A CSV has the headers item,quantity,unit_price. One row contains “Bracket, large” as a quoted item, with quantity 2 and price 7.50. The row total is $15. A second row with quantity 3 and price 4 brings the total to $27. The comma in the item name should stay inside that field.',
          ],
          project: [
            'Create a fictional cost CSV and read it by header. Reuse your validation and budget functions, write a test for a known total, and add a row with a missing quantity. Record the expected total and your program’s message for the bad row.',
            'Fixture rows … Known total … Test result … Bad-row handling …',
            'A CSV reader, a repeatable known-total test and a visible invalid-row policy.',
          ],
          questions: [
            check(
              'A quoted vendor name contains a comma. Which approach preserves the correct columns?',
              1,
              [
                option(
                  'Split every line wherever a comma appears.',
                  'This breaks a quoted name into two fields.',
                ),
                option(
                  'Use a CSV parser that understands quoting.',
                  'The parser can distinguish a delimiter from a comma inside a quoted field.',
                ),
                option(
                  'Remove every comma before reading the row.',
                  'That also removes the separators between actual columns.',
                ),
              ],
            ),
            check(
              'Which test catches a function that accidentally adds unit price to quantity?',
              2,
              [
                option(
                  'Assert that the program displays some text.',
                  'A wrong calculation can still display a message.',
                ),
                option(
                  'Set the expected total to whatever the function currently returns.',
                  'This copies the behavior being tested, including its mistakes.',
                ),
                option(
                  'Assert that three items at $8 produce a $24 line total.',
                  'The expected value comes from an independent calculation and differs from 3 + 8.',
                ),
              ],
            ),
          ],
        }),
        lesson({
          week: 5,
          id: 'organize-records',
          title: 'Organize RFIs and changes',
          summary:
            'Use a pattern for IDs and a simple record type for project documents.',
          teaching: [
            'A request for information, or RFI, tracks a question and its response. A change order, or CO, records a change to the work under the applicable approval process. Keep the document type and status explicit. A request for clarification alone does not establish an approved cost change.',
            'A regular expression checks the shape of a string. In Python, re.fullmatch(r"(RFI|CO)-[0-9]{3}", value) accepts exactly one of those prefixes and three digits. A matching ID still needs a duplicate check. A dataclass can keep the ID, summary, status and amount attached to a single record as you load and sort a file.',
          ],
          example: [
            'Two records with different jobs',
            'RFI-004 asks which finish to use and has status open. CO-004 proposes an extra $250 and has status pending. Both IDs follow the pattern and are distinct. Counting the pending $250 as approved would misstate the job total.',
          ],
          project: [
            'Build a small record organizer with fictional RFIs and changes. Read the records from CSV, validate full IDs, and group by document type and status. Include one malformed ID and one repeat. Record how you keep pending changes out of the approved total.',
            'Sample IDs … Duplicate or malformed result … Approved total …',
            'A record structure, full-ID validation and separate handling for pending and approved changes.',
          ],
          questions: [
            check(
              'Your rule accepts a full ID made of RFI or CO, a hyphen and exactly three digits. Which value qualifies?',
              0,
              [
                option(
                  'CO-007',
                  'The prefix, hyphen and three digits match the whole ID.',
                ),
                option('RFI-7', 'This has only one digit after the hyphen.'),
                option(
                  'old-CO-007-copy',
                  'A substring matches, but the complete value violates the rule.',
                ),
              ],
            ),
            check(
              'Two imported rows both carry CO-014 and each matches the expected pattern. What else must your importer check?',
              1,
              [
                option(
                  'Whether either row includes a lowercase letter.',
                  'Case does not address the repeated identifier in these two rows.',
                ),
                option(
                  'Whether the ID already belongs to an existing record.',
                  'Pattern validation checks the shape, while an identity check detects duplicates.',
                ),
                option(
                  'Whether the sum of both prices fits the budget.',
                  'The budget could absorb both rows while still counting the same record twice.',
                ),
              ],
            ),
          ],
        }),
        lesson({
          week: 6,
          id: 'python-toolkit',
          title: 'Ship the Python toolkit',
          summary:
            'Combine your tools, document a clean run and complete the first practical exam.',
          teaching: [
            'Give each job a small entry point. An importer turns CSV rows into validated records, a calculation function works on those records, and a report explains the totals and rejected rows. A test for one stage should help you locate the part that broke.',
            'Use Git to record a meaningful change and GitHub to keep the repository and its history. A README should tell another person how to run your fictional example and what result to expect. Before marking a release, try those instructions from a separate clean checkout or directory.',
          ],
          example: [
            'Reconcile the imported records',
            'Suppose a 50-row fixture contains 46 accepted records, two malformed IDs and two duplicate rows. In the supplied CSV, change_id identifies a change, project_id and vendor_id link to their directories, description explains the scope and amount is in US dollars. Status is approved, pending or declined. Only pending records are unresolved. A useful report accounts for all 50 rows. It totals only accepted, approved changes, lists pending amounts separately, and explains why each rejected line was excluded.',
          ],
          project: [
            'Assemble your tools into one repository. For the practical exam, process 50 fictional change-order rows, reconcile every row, count unresolved approvals and compare the approved total with an independent hand or spreadsheet check. Introduce a small bug in a practice copy, show which test detects it, fix the bug and explain the changed code. Add clean-run instructions that use only sample data.',
            'Run instructions … 50-row reconciliation … Expected vs. observed approved total …',
            'A reproducible toolkit, tested 50-row import, reconciled totals and a README.',
          ],
          questions: [
            check(
              'A 50-row input produces 43 accepted rows and four rejected rows. What does the report show?',
              2,
              [
                option(
                  'All rows balance because the rejected count is low.',
                  'The size of the rejection count does not explain the missing rows.',
                ),
                option(
                  'The import succeeded if the approved total matches last month.',
                  'A previous total cannot explain missing rows in this import.',
                ),
                option(
                  'Three input rows are unaccounted for and need investigation.',
                  '43 + 4 accounts for 47 rows. The remaining three need a recorded outcome.',
                ),
              ],
            ),
            check(
              'Which evidence best shows that someone else can run your toolkit?',
              0,
              [
                option(
                  'A fresh checkout runs the documented command on the included fixture and produces the expected result.',
                  'This checks the instructions, necessary files and behavior together.',
                ),
                option(
                  'You can run it in a terminal that already has your personal paths set.',
                  'Your existing setup may hide missing dependencies or undocumented paths.',
                ),
                option(
                  'Every source file has a recent modification date.',
                  'A timestamp does not confirm that the tool runs.',
                ),
              ],
            ),
          ],
        }),
      ],
    },
    {
      id: 'data',
      title: 'Databases and APIs',
      summary:
        'Connect the project records in SQL, read data from an API and import updates safely.',
      badge: 'Data Builder',
      lessons: [
        lesson({
          week: 7,
          id: 'query-project-data',
          title: 'Query a project database',
          summary:
            'Filter, group and join fictional records to answer a project manager’s questions.',
          teaching: [
            'Use SQLite to practice locally. A table represents one kind of thing, a row represents an individual record, and a primary key identifies it. SELECT chooses columns, WHERE filters rows and GROUP BY creates a group for each distinct value you select for grouping.',
            'Join tables on keys that represent the same relationship. Before trusting a sum, count the rows before and after the join. If one change order is repeated for each of three related notes, a sum over the joined rows could count its value three times.',
          ],
          example: [
            'Read the approved total',
            "Suppose your importer converts each dollar amount to integer cents in a table named changes. Use SELECT project_id, SUM(amount_cents) FROM changes WHERE status = 'approved' GROUP BY project_id. Two approved changes worth 12000 and 8000 cents give 20000 cents for that project. A pending 5000-cent change stays outside the total. A project with no approved rows will need separate handling if the report must show a zero.",
          ],
          project: [
            'Create a small SQLite database from your fictional project files. Write 15 useful SELECT queries covering filters, totals, grouping and joins. In your notebook, show one query and check its result against the toolkit’s approved-change total.',
            'Question and SQL … Expected result … Reconciliation with Python …',
            'Fifteen named queries and one independently reconciled result.',
          ],
          questions: [
            check(
              'Which operation should happen before summing the value of approved changes?',
              1,
              [
                option(
                  'Sort all records by their amount.',
                  'Sorting changes the order, not which amounts contribute to the total.',
                ),
                option(
                  'Filter the rows to the approved status.',
                  'A status filter keeps pending or rejected values out of the sum.',
                ),
                option(
                  'Rename the amount column approved_total.',
                  'A column label alone does not change the calculation.',
                ),
              ],
            ),
            check(
              'Joining a $300 change with its three notes produces three rows. What should you do before reporting its cost?',
              2,
              [
                option(
                  'Use $900 because a SQL join preserves money totals.',
                  'The join repeated the same amount once per note.',
                ),
                option(
                  'Divide every project’s total by three.',
                  'Other changes may have different numbers of notes.',
                ),
                option(
                  'Aggregate at the change-record level so its $300 is counted once.',
                  'Use the record identity and the desired reporting grain to avoid multiplying the cost.',
                ),
              ],
            ),
          ],
        }),
        lesson({
          week: 8,
          id: 'design-related-tables',
          title: 'Design connected tables',
          summary:
            'Model projects, vendors, RFIs and change orders with keys and constraints.',
          teaching: [
            'Give each project and vendor a stable ID. Store that ID in related records as a foreign key. When a vendor’s display name changes, update the vendor row once. Design constraints around the actual rule. For example, if each project numbers its own RFIs, the project ID and RFI number together must be unique.',
            'Test what happens on a bad write. In SQLite, enable foreign-key enforcement on the connection with PRAGMA foreign_keys = ON. Use a transaction for changes that belong together, so a failure can roll back the group. Keep currency units and status values consistent with last week’s reports.',
          ],
          example: [
            'Two jobs can share a sequence',
            'Project North and Project South can both have an RFI-001. A unique constraint across project_id and rfi_number accepts one in each project and rejects a second RFI-001 for North. Linking the vendor by ID still works if the vendor changes its display name.',
          ],
          project: [
            'Design and populate connected project, vendor, RFI and change-order tables. Draw their relationships and write a test for an unknown project ID, a repeated local RFI number and a valid number used on two different projects. Run your approved-value report again.',
            'Keys and relationships … Failed inserts … Valid same-number case …',
            'A connected schema with enforced relationships and tests for both valid and invalid writes.',
          ],
          questions: [
            check(
              'RFI numbering restarts on each job. Which uniqueness rule fits?',
              0,
              [
                option(
                  'The combination of project ID and RFI number must be unique.',
                  'This permits the same local number on different projects and prevents repeat numbers on one project.',
                ),
                option(
                  'The RFI number must be unique across all projects.',
                  'This would block a valid local number on a second job.',
                ),
                option(
                  'Every RFI title must be unique.',
                  'Titles can repeat even when the numbered business records are distinct.',
                ),
              ],
            ),
            check(
              'Two related inserts must both succeed. One fails after the other has run. What arrangement supports recovery?',
              1,
              [
                option(
                  'Commit the first write before attempting the second.',
                  'This leaves the first record committed if the second one fails.',
                ),
                option(
                  'Use a single transaction and roll it back on failure.',
                  'The related changes can be treated as one unit.',
                ),
                option(
                  'Disable constraints before attempting the writes.',
                  'That removes protection and can leave invalid relationships in the database.',
                ),
              ],
            ),
          ],
        }),
        lesson({
          week: 9,
          id: 'read-an-api',
          title: 'Read a public API',
          summary:
            'Make a read request, inspect JSON and handle missing or failed responses.',
          teaching: [
            'An API describes how programs exchange information. An HTTP GET requests data from an endpoint. Read the provider’s documentation for required inputs, authentication, limits and response shape. A status code tells you whether the server handled the request as expected. A successful status still needs a content check. For a paginated result, follow the provider’s next link until the final page, preserving the filter that identifies your project.',
            'Develop with a saved, fictional JSON response so you can keep working offline. Check the required fields and record the source and retrieval time. If you use a free provider that requires a key, keep it out of the repository and browser code. A no-key public endpoint or supplied fixture is sufficient for this exercise.',
          ],
          example: [
            'Read a project weather snapshot',
            'Your practice response is {"site":"North","rain_mm":0}. Zero is a valid observation. A missing rain_mm field means the value is unknown. A status 429 indicates rate limiting, so use a saved response or wait as directed. Label a saved observation with its time when showing it.',
          ],
          project: [
            'Use Python to read a documented public read-only endpoint or a local fixture with the same structure. Extract two fields, handle an unsuccessful status or saved error case, and store one validated observation for a fictional project. Show the difference between zero and missing.',
            'Endpoint or fixture … Sample response … Failure behavior … Stored fields …',
            'A repeatable read with field validation, source information and an error case.',
          ],
          questions: [
            check(
              'A weather response has rain_mm equal to 0. A different response omits the field. How should the dashboard interpret them?',
              2,
              [
                option(
                  'Both represent zero rainfall.',
                  'An absent observation cannot establish a measured zero.',
                ),
                option(
                  'Both should be removed because zero is false in Python.',
                  'Truthiness would discard a legitimate measurement.',
                ),
                option(
                  'Display zero for the first and an unknown or missing value for the second.',
                  'Testing field presence separately from its value preserves the meaning of both responses.',
                ),
              ],
            ),
            check(
              'A service responds with HTTP 429. Which response fits a small reporting tool?',
              0,
              [
                option(
                  'Respect the retry instructions and label any cached data with its retrieval time.',
                  'This handles rate limiting and gives users enough context about stale data.',
                ),
                option(
                  'Send immediate retries in a tight loop until one succeeds.',
                  'Rapid retries can add load and prolong rate limiting.',
                ),
                option(
                  'Treat the response body as the latest successful measurement.',
                  'An error response does not establish a new observation.',
                ),
              ],
            ),
          ],
        }),
        lesson({
          week: 10,
          id: 'reliable-integrations',
          title: 'Connect an API to SQL',
          summary:
            'Validate incoming events and handle repeated deliveries without double counting.',
          teaching: [
            'Polling checks an API periodically for changes. A webhook sends an event to a receiving service when something happens. Simulate the receiving side locally with a saved event. Record the provider’s event ID, the business record it refers to and the fields your database needs.',
            'An integration may see an event twice if a response is lost or a sender retries. Apply the business update and record the event ID in one transaction with an enforced unique event key. Validate required fields first and keep clear records of accepted, duplicate and invalid deliveries.',
          ],
          example: [
            'One delivery arrives twice',
            'The sample event E-92 says an order received eight boxes. Two identical deliveries of E-92 still represent eight boxes. A separate E-93 with three more raises the received total to eleven. Use the event ID to recognize redelivery while allowing distinct updates to the same order.',
          ],
          project: [
            'Connect a JSON event source to your SQLite project database. Replay a fictional delivery twice, replay a different event for the same order and import one invalid event. Include a failed or incomplete source, reconcile every outcome, and print a SQLite report that confirms the final quantity.',
            'Event IDs and quantities … Accepted, duplicate and invalid counts … Verified total …',
            'A repeat-safe import that reconciles valid, repeated and invalid events.',
          ],
          questions: [
            check(
              'The same delivery event arrives a second time after a lost acknowledgment. Which identity detects a repeat?',
              1,
              [
                option(
                  'The order ID alone.',
                  'One order may receive several legitimate deliveries.',
                ),
                option(
                  'The original provider event ID under a uniqueness rule.',
                  'The event ID stays the same on redelivery while distinct events can still update the order.',
                ),
                option(
                  'The local time at which each copy arrived.',
                  'The copies can have different arrival times.',
                ),
              ],
            ),
            check(
              'A program marks an event processed, commits and then crashes before updating inventory. What design addresses this?',
              2,
              [
                option(
                  'Mark every event as new after a restart.',
                  'That can reapply changes which actually succeeded.',
                ),
                option(
                  'Add a longer delay between the two actions.',
                  'A delay leaves the same failure window.',
                ),
                option(
                  'Record processing and apply the inventory update in the same transaction.',
                  'The two writes can then complete together or roll back together.',
                ),
              ],
            ),
          ],
        }),
      ],
    },
    {
      id: 'apps',
      title: 'Application development',
      summary:
        'Turn the database into a usable form, service and dashboard, then document a repeatable release.',
      badge: 'App Developer',
      lessons: [
        lesson({
          week: 11,
          id: 'accessible-entry-form',
          title: 'Build a project entry form',
          summary:
            'Combine HTML, CSS and JavaScript to collect clean project inputs.',
          teaching: [
            'Give each input a visible label connected through its for attribute and the input’s id. The name attribute supplies the key used in a standard form submission. Choose controls that fit the data, such as a select for a fixed status list. Communicate required fields in text and give errors beside the relevant input so users know what to correct.',
            'Use HTML validation and JavaScript to give quick feedback, then validate again wherever you save data. Make the form usable with a keyboard. Preserve what people have already typed when one field fails, and distinguish a preview from a confirmed save.',
          ],
          example: [
            'A quantity with clear feedback',
            'The label “Boxes received” stays visible while someone types. An order of zero boxes produces “Enter at least one box,” beside the field, with the project choice preserved. A valid entry shows the selected project, number of boxes and unit before the learner confirms.',
          ],
          project: [
            'Create an HTML/CSS/JavaScript entry form for fictional project data. Reuse your valid ID and positive-quantity rules, label every input and test the complete flow with the keyboard. Record the feedback for an invalid submission and the confirmation for a valid one.',
            'Fields and labels … Keyboard path … Invalid and valid outcomes …',
            'A keyboard-usable form with visible labels, useful error messages and a clear confirmation.',
          ],
          questions: [
            check(
              'What gives “Number of boxes” a persistent, programmatically associated label?',
              0,
              [
                option(
                  'A visible label whose for attribute matches the input ID.',
                  'This names the control for users and assistive technology and keeps the text available during entry.',
                ),
                option(
                  'A placeholder that disappears when typing starts.',
                  'A placeholder disappears and is a poor substitute for a persistent label.',
                ),
                option(
                  'A red border around the quantity field.',
                  'Color alone does not say what the field collects.',
                ),
              ],
            ),
            check(
              'A submission fails because the quantity is blank. Which behavior best supports recovery?',
              1,
              [
                option(
                  'Clear all fields and show a generic error page.',
                  'This loses valid entries and leaves the problem unclear.',
                ),
                option(
                  'Keep the other fields and identify the missing quantity beside its input.',
                  'The user knows exactly what to correct and can keep their previous work.',
                ),
                option(
                  'Insert a quantity of one and continue.',
                  'A silent default creates a record the person never supplied.',
                ),
              ],
            ),
          ],
        }),
        lesson({
          week: 12,
          id: 'rfi-endpoints',
          title: 'Build an RFI service',
          summary:
            'Create and retrieve fictional requests for information through FastAPI.',
          teaching: [
            'An endpoint combines an HTTP method, a path and an expected request or response. Define a small contract before coding. A POST can submit a new RFI, while a GET for an existing ID can return its saved details. Use clear status codes for success, invalid data, missing records and conflicts.',
            'A FastAPI request model can enforce the incoming shape, while your service and database enforce rules such as valid project relationships and unique local RFI numbers. Query SQLite with parameters. Return the persisted record’s identity so a client can fetch exactly what it created.',
          ],
          example: [
            'Create and read one record',
            'A client posts project North, number RFI-009 and the question “Which paint finish is scheduled?” A successful create can return 201 and its ID. A GET for that ID returns the saved question. A GET for a missing ID returns 404. A repeated number on North follows the duplicate rule you documented.',
          ],
          project: [
            'Build a local FastAPI service to create an RFI and retrieve it by ID. Reuse your SQLite constraints and validation. Record the outcomes for a valid create, an invalid body, a duplicate and a missing ID. Use fictional records throughout.',
            'Create request and returned ID … Read result … Error cases …',
            'Working create and retrieve endpoints with four documented outcomes.',
          ],
          questions: [
            check(
              'A client requests a well-formed RFI ID that does not exist. Which response most clearly describes the result?',
              2,
              [
                option(
                  '201 Created',
                  'A read request did not create a record.',
                ),
                option(
                  '200 with an invented placeholder RFI',
                  'This can make clients believe a nonexistent record is real.',
                ),
                option(
                  '404 Not Found with a clear response body',
                  'The route exists, but the requested record cannot be found.',
                ),
              ],
            ),
            check(
              'The browser form validates the RFI number. What should the service still do?',
              0,
              [
                option(
                  'Validate the incoming fields and enforce the project and uniqueness rules on write.',
                  'Other clients can call the service, and database rules must hold for every write.',
                ),
                option(
                  'Accept any request because the browser already checked it.',
                  'The browser is only one entry point to the service.',
                ),
                option(
                  'Remove database constraints to avoid two validation steps.',
                  'Constraints protect the stored state, including concurrent or alternate writes.',
                ),
              ],
            ),
          ],
        }),
        lesson({
          week: 13,
          id: 'dashboard',
          title: 'Build a project dashboard',
          summary:
            'Use Streamlit and SQL to show numbers a project manager can act on.',
          teaching: [
            'Start by naming a decision the dashboard supports. An open RFI count can help a coordinator prioritize follow-up. An approved-change total helps reconcile budget changes. Define each measure, the unit, and the filters that apply before choosing a chart or table.',
            'Query your database for the selected project. Put the filter’s value and the measurement period near the result. Give a useful message for an empty result, and distinguish a confirmed zero from missing or failed data. Use a drill-down list so a learner can trace each number back to its records.',
          ],
          example: [
            'Keep the metric and detail rows aligned',
            'Project North has one open RFI and two closed RFIs. South has four open RFIs. With North selected, the open count should be one and the detail table should list that single item. A card that shows five while the table shows one is applying the filter differently.',
          ],
          project: [
            'Build a local Streamlit dashboard backed by your fictional SQLite data. Add a project filter, an open RFI count, an approved-change amount and the underlying detail rows. Check two projects and a project with no matching rows.',
            'Metric definition … Filter tested … Detail reconciliation … Empty-state message …',
            'A working dashboard with consistent filters and traceable totals.',
          ],
          questions: [
            check(
              'An “Approved changes” card includes pending rows. What needs correction?',
              1,
              [
                option(
                  'Use a different chart color.',
                  'Color does not change which rows are counted.',
                ),
                option(
                  'Apply the approved-status rule to the query behind the metric.',
                  'The measure must use the same definition its title promises.',
                ),
                option(
                  'Round the total to fewer digits.',
                  'Rounding does not remove pending changes.',
                ),
              ],
            ),
            check(
              'The database query failed. What should an “Open RFIs” card display?',
              2,
              [
                option(
                  'Zero, because no rows reached the screen.',
                  'That implies a confirmed absence of open RFIs.',
                ),
                option(
                  'The largest count recorded this week.',
                  'A historical maximum may have no relation to the current state.',
                ),
                option(
                  'An unavailable status, with an appropriate retry or refresh action.',
                  'A failed query leaves the current count unknown.',
                ),
              ],
            ),
          ],
        }),
        lesson({
          week: 14,
          id: 'release-a-dashboard',
          title: 'Release a working dashboard',
          summary:
            'Prepare a repeatable installation, run a release check and explain the hosting needs.',
          teaching: [
            'Match the deployment environment to what your app executes. A static host can serve HTML, CSS and browser JavaScript. A Python service such as FastAPI or Streamlit needs a running Python process on an appropriate host or the reviewer’s computer. A static sample report can still make a useful companion to a local service.',
            'Give a new reviewer a fresh start with documented dependencies, a small fictional database or seed command, and a short check with a known result. Record the version tested. If a hosted process has temporary disk storage, confirm persistence before relying on a local database file.',
          ],
          example: [
            'Check the release from outside your usual setup',
            'The instructions say to install the listed dependencies, populate the sample database and start the dashboard. From an empty directory, a reviewer runs those steps, selects North and sees the fixture’s one open RFI. After restarting, the expected records are still available as documented.',
          ],
          project: [
            'Package your fictional dashboard with an install guide and a reproducible sample. Run it from a clean directory. Use a suitable free runtime if available, or demonstrate the local release and a static sample on GitHub Pages. Record the tested version, known sample result and restart behavior.',
            'Run location … Clean-start commands … Smoke check … Restart result …',
            'A reproducible release with a working sample, installation instructions and a recorded smoke check.',
          ],
          questions: [
            check(
              'Which part of your project can GitHub Pages serve directly?',
              0,
              [
                option(
                  'A static HTML/JavaScript dashboard that reads fictional JSON in the browser.',
                  'Static files and client-side JavaScript fit a static host.',
                ),
                option(
                  'A long-running Python process serving FastAPI requests.',
                  'Running that process requires a Python runtime on a server or local machine.',
                ),
                option(
                  'A Streamlit Python server that writes to a server-side SQLite file.',
                  'A static file host does not run that server process.',
                ),
              ],
            ),
            check(
              'Which release check would best catch an undocumented local dependency?',
              1,
              [
                option(
                  'Refresh the dashboard in a browser with the app already running.',
                  'The running process can hide a missing setup step.',
                ),
                option(
                  'Start from a clean environment and follow only the README and included files.',
                  'This tests whether a new reviewer has all required information and inputs.',
                ),
                option(
                  'Rename the release folder to “final.”',
                  'A new name cannot verify a clean installation.',
                ),
              ],
            ),
          ],
        }),
      ],
    },
    {
      id: 'ai',
      title: 'Applied AI and automation',
      summary:
        'Compare model responses, ground answers in project documents and measure a supervised workflow.',
      badge: 'AI Practitioner',
      lessons: [
        lesson({
          week: 15,
          id: 'compare-models',
          title: 'Compare model responses',
          summary:
            'Use the same questions and scoring rules to investigate how model outputs differ.',
          teaching: [
            'Machine learning fits patterns from examples. A language model generates a sequence of tokens, which may be words, parts of words or punctuation. Fluent output can still misread a number or invent a plausible detail. Treat a draft as a candidate answer you can check against evidence.',
            'Write the job, relevant context, response format and rule for missing information in a short prompt. Compare two sets of responses on the same 20 fictional questions. Define acceptable answers before reviewing the responses. Saved outputs or clearly labeled simulated responses let you practice the evaluation without a paid account.',
          ],
          example: [
            'One prompt, two responses',
            'The source says “Delivery window Thursday, 9 to 11. Dock unassigned.” Asked which dock to use, response A says “Dock 2.” Response B says “The dock has not been assigned.” A grounding rule awards the point to B. Record the source sentence so a reviewer can understand the score.',
          ],
          project: [
            'Use the 20 questions, five fictional documents and human grading key in the starter materials. For a live comparison, give each model the same documents, question and brief. Keep the answer key out of the prompt. For an offline run, use the two supplied simulated response sets. Hide model identities while scoring against the key, then group the errors and label your evidence.',
            'Prompt and response sources … Scores out of 20 … Recurring error and example …',
            'Twenty paired, consistently scored cases with a documented response source and error pattern.',
          ],
          questions: [
            check(
              'Two models receive different project notes and different prompts. What change would make a side-by-side comparison fairer?',
              2,
              [
                option(
                  'Choose whichever answer uses the most professional language.',
                  'Style alone does not measure factual performance.',
                ),
                option(
                  'Give the weaker-looking model shorter questions after seeing its answers.',
                  'Changing the task after seeing results makes the comparison difficult to interpret.',
                ),
                option(
                  'Give both the same inputs and apply a scoring rule written in advance.',
                  'This holds the task constant and reduces scoring drift.',
                ),
              ],
            ),
            check(
              'A fluent response supplies a delivery address that is absent from the provided notes. Under a source-only rule, how should it score?',
              0,
              [
                option(
                  'As an unsupported claim, even if the address sounds plausible.',
                  'The scoring rule requires support from the supplied material.',
                ),
                option(
                  'As correct when the address is formatted properly.',
                  'A valid format does not show where the address came from.',
                ),
                option(
                  'As correct if the model repeats it a second time.',
                  'Repetition does not supply evidence.',
                ),
              ],
            ),
          ],
        }),
        lesson({
          week: 16,
          id: 'grounded-assistant',
          title: 'Ground answers in documents',
          summary:
            'Retrieve a relevant passage, produce structured output and check the cited evidence.',
          teaching: [
            'A retrieval-based assistant first selects relevant passages, then uses those passages to draft an answer. Store the document ID, revision and section with every passage. Keyword search is enough for a small local example. Embeddings represent text as numbers that support similarity search, but a nearby passage can still be outdated or irrelevant.',
            'Ask for fields such as answer, source ID and supporting excerpt, with an explicit outcome when evidence is insufficient. Validate the structure, then read the cited passage to see whether it supports the actual claim. A well-formed JSON object can contain an incorrect answer.',
          ],
          example: [
            'A revision changes the answer',
            'Spec A, revision 1, says delivery is at the east gate. Revision 2 says to use the north gate. For a question about current delivery, select revision 2, answer “north gate” and cite its delivery section. If the documents say nothing about weekend access, return an insufficient-evidence result for that question.',
          ],
          project: [
            'Build a small assistant over fictional construction notes using local search and saved answers or a free tool. Include two revisions and one unanswerable question. Reuse your Week 15 scoring rules and validate each answer’s source ID, excerpt and revision.',
            'Documents and revisions … Supported answer and excerpt … Missing-evidence example …',
            'A document-grounded answer with reproducible retrieval, a checked citation and an abstention.',
          ],
          questions: [
            check(
              'An answer has valid JSON and a real source ID. What check is still essential?',
              1,
              [
                option(
                  'Count how often the source ID appears in the output.',
                  'Frequency does not establish that the cited passage supports the answer.',
                ),
                option(
                  'Read the cited passage in the applicable revision and compare it with the claim.',
                  'Correct structure and a real document do not guarantee evidential support.',
                ),
                option(
                  'Remove the citation to simplify the result.',
                  'Removing it would make the claim harder to verify.',
                ),
              ],
            ),
            check(
              'The nearest search result mentions “access” but gives no weekend hours. What should a source-grounded assistant do?',
              2,
              [
                option(
                  'Reuse the weekday hours on the assumption they apply all week.',
                  'The evidence does not extend weekday hours to weekends.',
                ),
                option(
                  'Return the passage as proof that the office is always open.',
                  'Topic similarity cannot support that particular claim.',
                ),
                option(
                  'Report insufficient evidence and identify the missing hours.',
                  'This gives a useful, accurate result that a reviewer can follow up.',
                ),
              ],
            ),
          ],
        }),
        lesson({
          week: 17,
          id: 'procurement-workflow',
          title: 'Automate a procurement draft',
          summary:
            'Design a repeatable workflow with limited tools and a named human approval step.',
          teaching: [
            'A workflow follows a planned path, such as read a request, check the catalog, calculate pack count and prepare a draft. An agent can select from tools during a task. Start with the fixed path when the steps are known. Define the input, output and permissions of every tool you expose.',
            'Keep data retrieval and draft preparation separate from consequential actions. A reviewer needs the item, quantity, units, source, estimated cost and any uncertainty before authorizing an order. For this exercise, keep every action simulated. Test duplicate events, missing data and a denied approval.',
          ],
          example: [
            'Draft a requisition',
            'A request needs 23 anchors. A fictional catalog lists ten per pack at $8. A lookup and calculator prepare a three-pack, $24 draft with the catalog row attached. A missing vendor contact leaves the draft in review. A repeated event ID should point to the existing draft.',
          ],
          project: [
            'Build a fictional procurement tracker that looks up a catalog item, calculates packs and writes a draft for review. Reuse the earlier pack calculation and repeat-safe event ID. Simulate approval and rejection locally, and record what the reviewer sees before any state change.',
            'Tool inputs and outputs … Draft and evidence … Duplicate event result … Review decision …',
            'A repeat-safe procurement draft with visible evidence and a tested approval boundary.',
          ],
          questions: [
            check(
              'An assistant has calculated a $480 order from a request. What belongs at the review step?',
              0,
              [
                option(
                  'Show the item, pack calculation, price source and total to an authorized reviewer.',
                  'The reviewer can check the inputs and make an informed decision before the draft proceeds.',
                ),
                option(
                  'Automatically mark it approved because the arithmetic passed.',
                  'A correct calculation does not authorize a purchase.',
                ),
                option(
                  'Show only a confidence score and hide the line items.',
                  'The reviewer needs the underlying evidence and quantities.',
                ),
              ],
            ),
            check(
              'A supplier listing lacks pack size. Which workflow outcome preserves the known facts?',
              1,
              [
                option(
                  'Use the pack size from a similar item and approve the order.',
                  'A different item’s packaging may be different.',
                ),
                option(
                  'Flag the missing field and hold the draft for clarification.',
                  'Pack size is essential to the calculation, so the draft cannot yet support a reliable total.',
                ),
                option(
                  'Treat the missing value as zero and continue.',
                  'Zero is unusable as a divisor and does not represent an unknown pack size.',
                ),
              ],
            ),
          ],
        }),
        lesson({
          week: 18,
          id: 'evaluate-ai',
          title: 'Evaluate an AI workflow',
          summary:
            'Measure accuracy and escalation quality, then investigate the errors that matter most.',
          teaching: [
            'Build a fixed evaluation set with ordinary cases, tricky boundaries, missing evidence and duplicate inputs. Write each expected outcome before running the workflow. Track the result of each stage so you can distinguish a retrieval miss from an arithmetic mistake or an approval bypass.',
            'A single accuracy number can hide an important failure. Count unsupported claims, missed escalations and attempts to proceed without approval separately. Report the denominator with every percentage. To measure recall for a review flag, divide the number of genuinely risky cases it caught by all genuinely risky cases in the test. Keep fresh cases aside to check whether a change generalizes beyond the examples you used to tune it.',
          ],
          example: [
            'A pass rate hides a costly mistake',
            'A tracker handles 18 of 20 sample requests as expected, for 90% overall. One remaining case drafts the wrong pack count. The other marks a request approved without review. Fix and retest the approval boundary even if the overall score exceeds the course pass mark.',
          ],
          project: [
            'Run a fictional project email through your workflow. Extract and validate its fields, save a reviewable SQLite record and draft a response for human approval. Evaluate the workflow on a fixed set with expected outcomes. Include a missing source, a repeat event and denied approval. Group the errors, make one targeted fix and rerun both the original set and at least two fresh cases. Record any remaining limits.',
            'Cases and expected outcomes … Baseline … Fix … Retest and remaining limit …',
            'A scored comparison with failure categories, fresh cases and evidence that approval is enforced.',
          ],
          questions: [
            check(
              'A workflow passes 19 of 20 cases. The remaining case proceeds without required approval. What should the team conclude?',
              2,
              [
                option(
                  'It is ready for autonomous use because it passed 95%.',
                  'The aggregate pass rate conceals a failure of a required approval rule.',
                ),
                option(
                  'Discard the failed case because it is uncommon.',
                  'A rare case can still expose an unacceptable outcome.',
                ),
                option(
                  'Report both results and repair the approval boundary before real actions.',
                  'The percentage and the consequence of the failure both matter.',
                ),
              ],
            ),
            check(
              'You used five troublesome cases to refine a prompt. Which test best examines whether the change generalizes?',
              0,
              [
                option(
                  'Evaluate additional unseen cases with expected outcomes fixed in advance.',
                  'Fresh cases reduce the chance that the prompt merely memorized your tuning examples.',
                ),
                option(
                  'Repeat only the same five cases until they all pass.',
                  'That checks familiar cases, but gives limited evidence about generalization.',
                ),
                option(
                  'Ask the system whether it considers itself more accurate.',
                  'A self-rating does not show performance on a task.',
                ),
              ],
            ),
          ],
        }),
      ],
    },
    {
      id: 'product',
      title: 'Engineering and product',
      summary:
        'Turn field needs into testable requirements and make the project easier to release and maintain.',
      badge: 'Product Builder',
      lessons: [
        lesson({
          week: 19,
          id: 'requirements-backlog',
          title: 'Write a product brief',
          summary:
            'Define the user’s problem, a measurable outcome and a small delivery backlog.',
          teaching: [
            'A product requirements document explains whose problem you are solving, how they handle it now, which outcome matters and what this release includes. Use evidence from a real conversation with permission, or clearly label an exercise based on fictional observations. An assumption is a question to test.',
            'In an iterative project, keep a prioritized backlog and choose a small piece of user value for the next cycle. A user story describes a person, their need and the reason. Acceptance criteria turn that story into observable behavior. Include failure paths and estimate what the team can complete and review together.',
          ],
          example: [
            'A backlog item small enough to finish',
            'A coordinator loses time checking whether a vendor has answered an RFI. One story asks for a project-filtered list of unanswered RFIs. A criterion says that selecting North shows its two unanswered records and excludes closed records and other projects. Put automatic reminder emails into a later decision.',
          ],
          project: [
            'Write a one-page product brief for one Fieldwork AI user. Define the problem, a success measure, scope and one assumption. Draft a prioritized backlog of five items and give the first story verifiable acceptance criteria tied to your database and UI.',
            'User and problem … Evidence or assumption … Success measure … First story and acceptance checks …',
            'A scoped brief and ordered backlog whose first story can be demonstrated and tested.',
          ],
          questions: [
            check('Which acceptance criterion is directly testable?', 1, [
              option(
                'The dashboard should feel much smarter.',
                'The phrase does not identify a repeatable observation.',
              ),
              option(
                'With North selected, show its two open RFIs and exclude its closed RFI.',
                'A known fixture can verify the count, project and status rule.',
              ),
              option(
                'Make the interface as good as competitors.',
                'A reference and measurable criteria would be needed to judge that claim.',
              ),
            ]),
            check(
              'A team can complete one backlog item this cycle. Which item best tests the coordinator’s stated problem?',
              2,
              [
                option(
                  'Offer five new theme colors.',
                  'Visual variety does little to test whether unanswered RFIs are easy to find.',
                ),
                option(
                  'Rename the repository and dashboard.',
                  'Naming does not test the core workflow.',
                ),
                option(
                  'Show unanswered RFIs for the selected project and observe a coordinator using it.',
                  'This delivers a narrow user outcome and creates a chance to evaluate it.',
                ),
              ],
            ),
          ],
        }),
        lesson({
          week: 20,
          id: 'release-engineering',
          title: 'Engineer a reliable release',
          summary:
            'Automate repeatable checks and map where project data moves.',
          teaching: [
            'Continuous integration runs repeatable checks when a change is proposed. Continuous delivery keeps a passing version ready to release. Choose checks that protect the behavior promised in the brief, and keep a way to restore the last working version. The same checks can run locally at no cost.',
            'Draw the user interface, service, database and any external provider. Label what crosses each boundary, which component can read or write and where configuration belongs. Publish only fictional fixtures. If a private credential is required for a different deployment, manage it on the server through the host’s protected configuration.',
          ],
          example: [
            'Protect an existing approval rule',
            'A proposed change adds a new procurement status. A test submits a request without reviewer approval and confirms it stays pending. Another checks that an approved sample appears exactly once. A failed check blocks that release while the last known working version remains available.',
          ],
          project: [
            'Add a repeatable test command and, where available for free, a CI workflow for the Fieldwork repository. Test a validation failure and the approval boundary. Draw the architecture and data flow. Run a deliberate failing test locally, restore it and document release recovery. Present the business problem, architecture, limits, security considerations and next milestone to a reviewer or in a recording.',
            'Test command and results … Architecture and boundaries … Recovery step …',
            'A reproducible test run, architecture sketch and demonstrated release recovery procedure.',
          ],
          questions: [
            check(
              'A change breaks a required approval test. What should happen to that release candidate?',
              0,
              [
                option(
                  'Hold the release, inspect the failure and rerun the check after the fix.',
                  'The check protects a stated requirement. Resolve the cause before promoting the version.',
                ),
                option(
                  'Mark the failing test optional to keep the schedule.',
                  'That bypasses the behavior the team chose to protect.',
                ),
                option(
                  'Deploy and wait for someone to report the same problem.',
                  'The known failure already provides actionable evidence.',
                ),
              ],
            ),
            check(
              'An interface is shipped as public browser JavaScript. Where should a private provider credential live if a future server integration needs one?',
              1,
              [
                option(
                  'In the browser bundle under an unusual variable name.',
                  'Anyone who receives the public bundle can inspect its contents.',
                ),
                option(
                  'In protected server-side configuration, accessible only to the service that needs it.',
                  'This keeps the secret outside the public client and repository.',
                ),
                option(
                  'In a screenshot attached to the public README.',
                  'A screenshot is still public disclosure.',
                ),
              ],
            ),
          ],
        }),
      ],
    },
    {
      id: 'venture',
      title: 'Technology entrepreneurship',
      summary:
        'Investigate a recurring problem, test the smallest useful product and present the evidence.',
      badge: 'Fieldwork Founder',
      lessons: [
        lesson({
          week: 21,
          id: 'customer-discovery',
          title: 'Interview potential users',
          summary:
            'Learn how five owners or operators handle a real recurring problem today.',
          teaching: [
            'Ask about the last time a problem happened. What triggered it, what did the person do, how long did it take and who else was involved? A story about past behavior gives you details that a guess about future buying rarely provides. Listen for workarounds and the cost of leaving the problem alone.',
            'Ask permission to take notes. Record patterns without identifying details and distinguish a direct observation from your interpretation. Seek examples that challenge your assumption. If you rehearse with fictional personas, label those notes as practice and keep them separate from real interviews.',
          ],
          example: [
            'A question that uncovers a workflow',
            '“Would you buy an AI tracker?” invites a polite prediction. “Walk me through the last late delivery you dealt with” can uncover the original email, a missed update and two hours spent calling suppliers. Ask what happened next and how often similar incidents occur.',
          ],
          project: [
            'Plan and conduct five voluntary conversations with relevant owners or operators. Record an anonymized recent incident, current workaround and impact for each. You can rehearse with fictional cases first. In your notebook, identify one recurring theme, one exception and whether the evidence is real or simulated.',
            'Interview context … Recent incident and workaround … Pattern, exception and evidence type …',
            'Five clearly labeled interview records and a problem statement grounded in the available evidence.',
          ],
          questions: [
            check(
              'Which opening question is most likely to produce evidence about current behavior?',
              2,
              [
                option(
                  'Would you recommend a perfect procurement app?',
                  'This invites a prediction about an imaginary product.',
                ),
                option(
                  'Do you agree our dashboard is easier than your spreadsheet?',
                  'The question suggests a preferred answer and starts with your solution.',
                ),
                option(
                  'Tell me about the last order update that took longer than you expected.',
                  'A recent, specific event makes it easier to uncover the steps and consequences.',
                ),
              ],
            ),
            check(
              'Four interviewees report a delay. One says their spreadsheet already handles it well. How should you record the fifth response?',
              0,
              [
                option(
                  'Keep it and investigate what is different about that workflow.',
                  'A counterexample can reveal segment boundaries, an effective workaround or a weaker hypothesis.',
                ),
                option(
                  'Remove it so the summary describes a clear pattern.',
                  'Removing inconvenient evidence exaggerates support for your claim.',
                ),
                option(
                  'Count it as interest because the person agreed to an interview.',
                  'Agreeing to talk does not establish a problem or intent to buy.',
                ),
              ],
            ),
          ],
        }),
        lesson({
          week: 22,
          id: 'build-the-mvp',
          title: 'Test a narrow MVP',
          summary:
            'Build one complete workflow and measure whether it helps the intended user.',
          teaching: [
            'A minimum viable product tests an important assumption with the smallest useful version. Choose one person, one recurring job and one observable outcome. A local prototype with fictional records is enough to test whether people understand the workflow. Explain any manual steps behind the prototype.',
            'Write the test before adding features. Give a participant a realistic task and let them try it without coaching. Capture completion, errors and time, together with what they expected at the sticking points. A small successful test informs the next iteration. Product-market fit requires broader evidence of sustained demand.',
          ],
          example: [
            'Find the next unanswered RFI',
            'The proposed MVP helps a coordinator identify the oldest unanswered RFI for a chosen project. Use the same fictional records for a spreadsheet baseline and a prototype trial. Verify the record selected as well as elapsed time. A fast wrong answer fails the task.',
          ],
          project: [
            'Build one complete Fieldwork AI workflow from data entry to a useful result. Set a baseline, define task success and run the same realistic scenario with a test user or clearly labeled rehearsal. Reuse your acceptance checks and evidence from discovery. Record the result and one change it suggests.',
            'Target workflow … Baseline and success rule … Observed outcome … Next change …',
            'A runnable MVP and a task-based comparison with a stated baseline and evidence type.',
          ],
          questions: [
            check(
              'Which scope gives the clearest first test of an RFI follow-up product?',
              1,
              [
                option(
                  'Build scheduling, billing, payroll and messaging before showing it.',
                  'A broad build increases effort and makes individual outcomes harder to interpret.',
                ),
                option(
                  'Help one coordinator find the oldest unanswered RFI for a selected project.',
                  'This defines the user, task and observable result.',
                ),
                option(
                  'Show a logo to ten people and ask if they like the product.',
                  'The logo does not demonstrate whether the workflow solves the problem.',
                ),
              ],
            ),
            check(
              'A tester finishes in 20 seconds but selects a closed RFI instead of the oldest open one. What should you record?',
              2,
              [
                option(
                  'A success because the tester finished quickly.',
                  'Speed does not establish that the required record was found.',
                ),
                option(
                  'An invalid session because the answer weakened the result.',
                  'The error is precisely the kind of evidence a usability test should capture.',
                ),
                option(
                  'A failed task, the observed time and where the user went wrong.',
                  'Accuracy and time together explain what needs improvement.',
                ),
              ],
            ),
          ],
        }),
        lesson({
          week: 23,
          id: 'pricing-and-testing',
          title: 'Test pricing and adoption',
          summary:
            'Form a pricing hypothesis and look for meaningful signs that people will use the product.',
          teaching: [
            'Identify who uses the tool, who would authorize it and which unit would make sense to a buyer, such as a project or a team. Estimate the value of a measured time saving using explicit assumptions. The result informs a pricing conversation. To estimate a break-even monthly price, divide your fixed monthly costs by the expected number of paying customers and add the variable cost per customer. Test willingness to pay separately.',
            'Choose one way to reach your intended users and define a meaningful next action, such as completing a fictional pilot task. Record invitations, trials and successful completions separately. Describe a proposed price inside your research exercise. Keep the course, its labs and the prototype test free.',
          ],
          example: [
            'Separate value from willingness to pay',
            'A team saves 15 minutes on each of eight monthly checks. That is two hours a month. At an assumed $30 per hour, the time is worth about $60. A hypothetical $20 monthly price still needs evidence about the buyer, budget and alternatives. Three completed trials out of ten invitations describe trial participation.',
          ],
          project: [
            'Propose a pricing unit and a transparent value estimate for the hypothetical Fieldwork product. Design a free pilot invitation and observe a user test with consent or rehearse with labeled sample data. Record invitations, starts and completions separately, plus one reason someone might decline.',
            'Buyer and pricing unit … Assumptions and estimate … Trial funnel … Objection …',
            'A testable pricing hypothesis, a documented free pilot and an honestly labeled adoption measure.',
          ],
          questions: [
            check(
              'A tool saves 15 minutes per check across eight checks a month. At an assumed $30 per hour, what is the estimated monthly value of time saved?',
              0,
              [
                option(
                  '$60',
                  'Eight times 15 minutes is 120 minutes, or two hours at $30 per hour.',
                ),
                option(
                  '$240',
                  'This counts eight full hours rather than eight quarter-hours.',
                ),
                option(
                  '$20',
                  'That could be a proposed price, but it does not follow from the time calculation.',
                ),
              ],
            ),
            check(
              'Ten people were invited to a free trial. Four started and three completed the task. Which claim is justified?',
              1,
              [
                option(
                  'Three customers agreed to pay for the tool.',
                  'No purchase or payment commitment was observed.',
                ),
                option(
                  'Three of ten invitees completed the trial task, including three of the four starters.',
                  'This reports the observed outcomes and makes both denominators clear.',
                ),
                option(
                  'Everyone who did not start rejected the proposed price.',
                  'The data does not explain why those invitees did not start.',
                ),
              ],
            ),
          ],
        }),
        lesson({
          week: 24,
          id: 'capstone-demo',
          title: 'Present the Fieldwork capstone',
          summary:
            'Demonstrate the finished workflow, report measured results and make a supportable next decision.',
          teaching: [
            'A capstone demo should follow a person doing a job. Introduce the user and their initial problem, run the working product on fictional data, and show the result from input to decision. Include one failure or ambiguous case so the audience sees how the product behaves when the happy path breaks.',
            'Connect your claims to evidence. Give the baseline, measurement method, sample size and limits. If participants repeat identical tasks in a fixed order, practice can influence the later result. Show where the data came from, how you tested the release and who reviews consequential actions. Close with the next experiment, owner and decision criterion. Include the steps a reviewer needs to run the same demonstration.',
          ],
          example: [
            'Report a result at its real scale',
            'In five fictional lookup tasks, the median completion time drops from 90 to 55 seconds and four of five tasks return the correct RFI. Report both the 35-second difference and the missed case. Show its cause and propose a retest on fresh records before making claims about field performance.',
          ],
          project: [
            'Package your Fieldwork AI MVP, source repository, install guide, short demo and one-page pitch. Demonstrate one success and one failure path. Compare measured results against the baseline and distinguish actual user evidence from rehearsals. State the pricing or willingness-to-pay evidence, estimated operating costs and what scaling would change. Document the next pilot, its owner and the criterion for proceeding.',
            'Problem and demo flow … Baseline and result with sample size … Failure case … Next pilot and decision …',
            'A reproducible capstone, working demonstration and evidence-backed pitch with clear limits.',
          ],
          questions: [
            check(
              'A timed demo improved on five fictional tasks. Which statement belongs in the pitch?',
              2,
              [
                option(
                  'All project teams will save the same percentage of time.',
                  'The exercise does not establish outcomes for every team.',
                ),
                option(
                  'The measured improvement proves the product has market fit.',
                  'A small task test does not establish broad or lasting demand.',
                ),
                option(
                  'State the measured change, task count, fixture and remaining error before proposing a field pilot.',
                  'This gives the audience the result and the scope of evidence supporting it.',
                ),
              ],
            ),
            check(
              'Which package allows a reviewer to reproduce the capstone result?',
              0,
              [
                option(
                  'A versioned release, fictional fixture, run instructions, expected outcome and evaluation method.',
                  'The reviewer has the inputs, environment guidance and basis for comparison.',
                ),
                option(
                  'A screenshot of the best result and a feature wish list.',
                  'A screenshot and ideas do not let the reviewer run the workflow.',
                ),
                option(
                  'A price estimate with the demo data removed.',
                  'A price estimate does not reproduce a working product or its measured result.',
                ),
              ],
            ),
          ],
        }),
      ],
    },
  ];
})();
