// Original teaching material and fictional project demonstrations for Fieldwork Academy.
window.COURSE_LEVELS = [
  {
    "id": "foundations",
    "title": "Programming foundations",
    "summary": "Build, test and hand off a Python support-operations toolkit.",
    "badge": "Python Builder",
    "lessons": [
      {
        "week": 1,
        "id": "estimate-a-support-workload",
        "title": "Estimate a support workload",
        "summary": "Run a first Python program, change its inputs, then write and test a function that estimates a support team's work in hours.",
        "minutes": 15,
        "teaching": [
          "A support ticket is one customer request. A queue is the list waiting for a reply. Suppose six tickets take ten minutes each. On paper, six groups of ten minutes add up to 60 minutes, or one staff-hour. Staff-hours measure the total work. Two people sharing the queue might finish sooner.",
          "A program is a set of instructions a computer follows. An editor is the box where those instructions are written. All required Python work runs in this browser. Start with the worked program, change one number, then use the same idea to solve a different problem in the skill lab.",
          "Python uses * for multiplication and / for division. For example, 3 * 8 gives 24, and 30 / 60 gives 0.5. The second calculation converts 30 minutes to half an hour. A decimal such as 0.5 is a valid result, so keep that precision in an estimate."
        ],
        "example": {
          "title": "Estimate a quarter-hour by hand",
          "text": "Three requests take five minutes each. That is 5 + 5 + 5, or 15 minutes altogether. An hour contains 60 minutes, so 15 ÷ 60 gives 0.25 staff-hours. Check the answer by working backward. One quarter of 60 minutes is 15. This gives a known answer to compare against a program later."
        },
        "walkthrough": {
          "title": "Count the welcome messages",
          "intro": "Three new teams each need four welcome messages. Count the messages on paper. Then run the example unchanged and compare the number that Python prints with that prediction.",
          "code": "def welcome_messages(teams, messages_each):\n    total = teams * messages_each\n    return total\n\nprint(welcome_messages(3, 4))",
          "expected": "12",
          "lines": [
            {
              "snippet": "def welcome_messages(teams, messages_each):",
              "explanation": "def starts a function, a named calculation that can be used again. welcome_messages is its name. The two names inside the parentheses are parameters, or places for the caller's values. The comma separates them. The colon at the end begins the instructions for this function."
            },
            {
              "snippet": "    total = teams * messages_each",
              "explanation": "The four leading spaces place this instruction inside the function. Python multiplies the two values on the right of = and stores the result under the name total. For the first call, total becomes 3 × 4, which is 12."
            },
            {
              "snippet": "    return total",
              "explanation": "return sends the number back to the line that called the function. This makes the number available for another calculation or for display. A function that reaches the end without returning a value sends back None."
            },
            {
              "snippet": "print(welcome_messages(3, 4))",
              "explanation": "This line starts at the left edge, outside the function. The inner parentheses call welcome_messages with 3 for teams and 4 for messages_each. The outer print displays the returned number. Defining a function gives it a name; the call is what runs it."
            }
          ],
          "change": {
            "prompt": "Keep four messages per team. Change the 3 in the final line to 5. Predict the new total, then run the edited program. Leave the function definition as it is.",
            "code": "def welcome_messages(teams, messages_each):\n    total = teams * messages_each\n    return total\n\nprint(welcome_messages(5, 4))",
            "expected": "20",
            "explanation": "The same function received five teams. Four messages for each of five teams gives 20. It can now handle another team count without any change inside the function."
          },
          "troubleshooting": [
            {
              "symptom": "Python reports SyntaxError or IndentationError.",
              "fix": "Check the colon after the function definition and the matching parentheses. Start both lines inside the function with four spaces. Start the final print line at the left edge."
            },
            {
              "symptom": "Python reports NameError.",
              "fix": "Compare the name on the reported line with where it was introduced. Python treats total, Total, and totla as three different names. Check the spelling and capitalization, then run again."
            },
            {
              "symptom": "The output contains None, or no number appears.",
              "fix": "Keep return inside the function so the caller gets a number. Keep a print call outside the function to display it. A function definition by itself produces no printed output."
            }
          ],
          "beforeQuiz": "The exercises pass numbers such as 6 directly to the function. A text box can instead supply \"6\", a string of characters. For a ticket count, check that the text represents a nonnegative whole number and convert it before doing arithmetic. int(\"6\") gives the number 6. The text \"six\" requires a correction."
        },
        "project": {
          "prompt": "Test the workload_hours function on three queues of your own. First choose a handling time in minutes. Run two queues with that same time and different positive ticket counts so that one estimate is under an hour. Then try an empty queue with zero tickets. Predict the hours before each run. The skill lab’s Try a queue tool records the numbers for this project.",
          "deliverable": "Three queue results and a short note explaining what changed when the ticket count changed. Identify one reason an actual queue might take longer than the estimate.",
          "placeholder": "When I changed the ticket count from … to …, the returned hours …\nAn actual queue might take longer because …",
          "reference": {
            "title": "A sample test record for welcome messages",
            "steps": [
              "State the unit and the rule. The sample function returns a number of messages. Multiply the two inputs by hand to predict each answer.",
              "Run the function definition from the lesson. On separate lines below it, print the result of each call and write down what appeared.",
              "Change only the team count in the first case. Compare its new result with the original, then record an assumption the program makes."
            ],
            "artifact": "Function: welcome_messages\nInputs (teams, messages per team) | Predicted messages | Observed messages\n(2, 3) | 6 | 6\n(4, 3) | 12 | 12\n(0, 3) | 0 | 0\n\nChange: doubling the number of teams doubled the output.\nAssumption: every team needs the same number of messages.",
            "check": "The three observations agree with the hand calculations, including zero teams. Apply the same test-record format to the workload function and label its output in staff-hours."
          }
        },
        "questions": [
          {
            "prompt": "A team receives 45 requests averaging eight minutes each. How much handling time should the plan show?",
            "correct": 1,
            "options": [
              {
                "text": "5.625 hours",
                "feedback": "Dividing count by minutes per request does not produce hours."
              },
              {
                "text": "6 hours",
                "feedback": "45 × 8 gives 360 minutes. Divide by 60 to convert to hours."
              },
              {
                "text": "360 hours",
                "feedback": "360 is the intermediate result measured in minutes."
              }
            ]
          },
          {
            "prompt": "A second team wants the same calculator for different queues. Which design supports reuse?",
            "correct": 2,
            "options": [
              {
                "text": "Hard-code both inputs into a printed sentence.",
                "feedback": "The next caller would have to edit the function for every queue."
              },
              {
                "text": "Ask for keyboard input inside the formula and print the answer.",
                "feedback": "Interactive input works for a demo, but another program cannot pass its own values or consume the printed result directly."
              },
              {
                "text": "Pass the count and average time into a function that returns hours.",
                "feedback": "Explicit inputs let a caller change either value and test the numeric result."
              }
            ]
          },
          {
            "prompt": "A function stores the number of minutes under total_minutes. On the next line Python reports NameError for total_minuts. What should be checked first?",
            "correct": 0,
            "options": [
              {
                "text": "Compare the name used on the error line with the name that stored the minutes.",
                "feedback": "One letter is missing from total_minuts. Python needs the same spelling to find the stored value."
              },
              {
                "text": "Give the next call a smaller number of tickets.",
                "feedback": "Changing the input changes the calculation. The missing name on that line still needs a correction."
              },
              {
                "text": "Move print inside the calculation to display the missing name.",
                "feedback": "Python must find a value for the name before print can display it. Check where the name was introduced."
              }
            ]
          },
          {
            "prompt": "A function prints 3.0. A caller tries to multiply its result and receives a None-related error. What change fixes the interface?",
            "correct": 1,
            "options": [
              {
                "text": "Cast the current return value to float in the caller.",
                "feedback": "None cannot be converted into the previously printed number. The function needs to return that number."
              },
              {
                "text": "Return the numeric value and let the caller print it.",
                "feedback": "A function without an explicit return produces None."
              },
              {
                "text": "Assign the result of print(...) to a numeric variable.",
                "feedback": "print returns None even when it displays a number."
              }
            ]
          }
        ]
      },
      {
        "week": 2,
        "id": "track-product-usage-against-a-budget",
        "title": "Track product usage against a budget",
        "summary": "Use loops, conditions and boundary tests to explain an operating limit.",
        "minutes": 15,
        "teaching": [
          "A product team often needs to know whether pilot usage fits a cap. A list holds several observations. A loop reads each observation in turn. Initialize a running total before the loop so each observation contributes exactly once. Use matching units throughout, such as integer cents for money.",
          "Turn the decision rule into a comparison. If a pilot allows usage up to and including 100 credits, the over-limit condition is total > 100. Equality is a useful boundary test. An empty usage list should total zero. When credits or refunds are represented as negative amounts, document whether the rule counts them.",
          "A budget label should be reproducible. Publish the numerator, units, cap and period alongside the conclusion. Recalculate after changing one input so a reviewer can distinguish a working rule from a memorized example."
        ],
        "example": {
          "title": "Trace the accumulator",
          "text": "Daily counts of 20, 30 and 10 requests produce running totals of 20, 50 and 60. A cap of 60 allows that usage. A fourth day with a single request changes the status to over budget."
        },
        "project": {
          "prompt": "Build a usage checker for a fictional pilot. Loop over at least three observations, return their total and classify it against a cap. Reuse a function from Week 1 or keep the total in a second reusable function. Include one under-cap, one exact-cap and one over-cap test.",
          "deliverable": "A usage report with units and period, three boundary tests, and an explanation of the equality rule.",
          "placeholder": "Unit and period … Totals … Boundary cases … Decision rule …",
          "reference": {
            "title": "Compare daily storage credits with a cap",
            "steps": [
              "Choose a single unit. The example measures integer storage credits per day.",
              "Accumulate the observations, then apply the cap after the loop.",
              "Keep the observations fixed and vary the cap to test all three boundaries."
            ],
            "artifact": "def storage_status(credits, cap):\n    total = 0\n    for daily in credits:\n        total += daily\n    return total, \"over\" if total > cap else \"within\"\n\nassert storage_status([3, 5, 4], 13) == (12, \"within\")\nassert storage_status([3, 5, 4], 12) == (12, \"within\")\nassert storage_status([3, 5, 4], 11) == (12, \"over\")",
            "check": "The observations always total 12. Only the 11-credit cap should produce an overage."
          }
        },
        "questions": [
          {
            "prompt": "A pilot permits exactly 500 requests. Which condition flags an overage?",
            "correct": 2,
            "options": [
              {
                "text": "total >= 500",
                "feedback": "This flags the permitted boundary."
              },
              {
                "text": "total < 500",
                "feedback": "This flags unused capacity."
              },
              {
                "text": "total > 500",
                "feedback": "The first disallowed count is 501."
              }
            ]
          },
          {
            "prompt": "A loop over 11, 7 and 9 returns 9. Which defect fits the evidence?",
            "correct": 0,
            "options": [
              {
                "text": "The total is reset during each iteration.",
                "feedback": "Only the final observation survives a repeated reset."
              },
              {
                "text": "The program prints after the loop.",
                "feedback": "Printing afterward is appropriate for a final total."
              },
              {
                "text": "The running total starts at zero before the loop.",
                "feedback": "Zero is the correct starting value for addition."
              }
            ]
          },
          {
            "prompt": "A report compares 14,000 token observations with a $20 cap. What is missing?",
            "correct": 1,
            "options": [
              {
                "text": "A conversion of the monthly budget into a daily dollar allowance only.",
                "feedback": "Both sides still use different units unless token use is also priced or the budget is converted into an appropriate token allowance."
              },
              {
                "text": "A conversion from token usage to cost using the applicable rates.",
                "feedback": "The comparison needs the same units on both sides."
              },
              {
                "text": "A total of input and output tokens without their prices.",
                "feedback": "A combined token count does not tell how much two differently priced categories cost."
              }
            ]
          },
          {
            "prompt": "Which test specifically catches treating an exact cap as an overage?",
            "correct": 2,
            "options": [
              {
                "text": "A list totaling 79 against a cap of 80.",
                "feedback": "Both operators agree that 79 is below the cap."
              },
              {
                "text": "A list totaling 81 against a cap of 80.",
                "feedback": "Both operators flag this overage."
              },
              {
                "text": "A list totaling 80 against a cap of 80.",
                "feedback": "This is the one boundary where > and >= give different answers."
              }
            ]
          }
        ]
      },
      {
        "week": 3,
        "id": "validate-incoming-support-records",
        "title": "Validate incoming support records",
        "summary": "Convert untrusted form input into predictable values and give precise correction messages.",
        "minutes": 15,
        "teaching": [
          "A form or CSV row arrives as text. Start by defining the input contract. For example, a ticket needs a nonblank summary, a queue selected from an allowed set and a nonnegative whole-number count. Decide which variations to normalize, such as surrounding spaces and case in a queue name.",
          "Separate type conversion from business rules. int(\"9\") converts successfully. int(\"nine\") raises ValueError. int(\"-3\") also converts successfully, so a separate range check must reject negative counts. Validate before saving anything and return a field-specific explanation so an operator can correct the record.",
          "Test a valid record, the exact minimum, a missing value and an invalid type. An unexpected error deserves investigation. A broad exception handler that silently saves a default can turn a malformed input into a believable but wrong metric."
        ],
        "example": {
          "title": "Trace two failure paths",
          "text": "The strings \" 4 \" and \"-4\" both convert to integers after trimming. Only the first satisfies a nonnegative count. The string \"four\" fails conversion. The two failures should produce different, actionable feedback."
        },
        "project": {
          "prompt": "Write a ticket intake validator with at least three field rules. Normalize harmless formatting, reject missing or invalid values, and feed valid counts into the usage checker. Record one accepted row, two rejected rows and the feedback for each rejection.",
          "deliverable": "A validation function, a table of test inputs and outcomes, and clear field-level error messages.",
          "placeholder": "Required fields … Normalized example … Rejected rows … Recovery …",
          "reference": {
            "title": "Validate a pilot seat request",
            "steps": [
              "Define the pilot’s allowed seat count as a whole number from one to ten.",
              "Convert once, then check the range. A blank field and a value outside the range have different causes.",
              "Test both endpoints and a value just outside the allowed range."
            ],
            "artifact": "def seat_count(raw):\n    try:\n        seats = int(raw.strip())\n    except ValueError:\n        raise ValueError(\"Enter a whole number.\")\n    if not 1 <= seats <= 10:\n        raise ValueError(\"Choose 1 to 10 seats.\")\n    return seats\n\nassert seat_count(\" 1 \") == 1\nassert seat_count(\"10\") == 10\n# seat_count(\"11\") raises: Choose 1 to 10 seats.",
            "check": "A blank string reaches the conversion message. Eleven reaches the range message. Both leave the saved record untouched."
          }
        },
        "questions": [
          {
            "prompt": "A ticket field must contain a whole number at least zero. Which value passes conversion but fails the range rule?",
            "correct": 0,
            "options": [
              {
                "text": "\"-1\"",
                "feedback": "The integer −1 is valid Python input but outside the field’s range."
              },
              {
                "text": "\"three\"",
                "feedback": "This fails conversion before the range check."
              },
              {
                "text": "\" 0 \" ",
                "feedback": "Zero is within the allowed range."
              }
            ]
          },
          {
            "prompt": "The queue field allows billing and support. How should the app handle \" Billing \" under a case-insensitive contract?",
            "correct": 1,
            "options": [
              {
                "text": "Check the original value against the allowed set before trimming it.",
                "feedback": "The allowed mixed-case, padded input would be rejected too early."
              },
              {
                "text": "Trim and normalize case, then check the allowed set.",
                "feedback": "The documented normalization turns this into a known queue."
              },
              {
                "text": "Silently accept every queue string.",
                "feedback": "Unknown queues could bypass routing expectations."
              }
            ]
          },
          {
            "prompt": "A ticket fails validation on its final field. Which behavior preserves the contract?",
            "correct": 2,
            "options": [
              {
                "text": "Save the valid fields and mark the ticket ready.",
                "feedback": "Consumers may act on a record that failed validation."
              },
              {
                "text": "Replace all fields with defaults.",
                "feedback": "Defaults hide the original input problem."
              },
              {
                "text": "Report the specific field and leave the record unsaved.",
                "feedback": "The operator can retry without partial or inconsistent data."
              }
            ]
          },
          {
            "prompt": "A rule accepts counts from 1 through 5. Which set checks both boundaries and their neighbors?",
            "correct": 0,
            "options": [
              {
                "text": "0, 1, 5, 6",
                "feedback": "These cover the accepted endpoints and immediately excluded values."
              },
              {
                "text": "2, 3, 4",
                "feedback": "The interior cases do not exercise endpoint conditions."
              },
              {
                "text": "1, 3, 5",
                "feedback": "The outside neighbors are missing."
              }
            ]
          }
        ]
      },
      {
        "week": 4,
        "id": "import-csv-files-with-repeatable-tests",
        "title": "Import CSV files with repeatable tests",
        "summary": "Read a header-based data file, handle bad rows and verify the report against a small fixture.",
        "minutes": 15,
        "teaching": [
          "A CSV is a table encoded as text. A quoted field may contain a comma, so splitting every line on commas can shift columns. Python’s csv.DictReader uses the header names and CSV quoting rules. Open text files with newline=\"\" and an explicit encoding such as UTF-8.",
          "Separate parsing from analysis. The importer reads headers, converts types, records row-level failures and passes valid records to the reporting function. Treat a missing required header as a file-level error. A single malformed value in an otherwise well-formed row can be reported and quarantined.",
          "A fixture is a small, known input kept with the tests. State the expected report before running the code. If a change breaks a previously working behavior, a regression test preserves the failing example and checks the repair."
        ],
        "example": {
          "title": "Check a tiny import manually",
          "text": "A fixture contains two valid wait times of 3 and 7 minutes and one malformed value. A report showing 10 total minutes, two accepted records and one rejection reconciles all three input rows. A zero-minute substitution would incorrectly make the malformed row look valid."
        },
        "project": {
          "prompt": "Import a fictional support CSV by header name. Count accepted and rejected records, report at least one useful total, and retain row numbers or identifiers for corrections. Write tests for a clean file, a malformed row, and a valid quoted field containing a comma.",
          "deliverable": "A reproducible import, a rejected-row report and three passing tests with hand-checked expectations.",
          "placeholder": "Required headers … Fixture … Expected totals … Failure observed and fixed …",
          "reference": {
            "title": "Check a two-column call log",
            "steps": [
              "Read a miniature file from memory so the test can run without external setup.",
              "Preserve the quoted customer label containing a comma. Count a nonnumeric duration as a rejection.",
              "Prove that the label and total both survived parsing."
            ],
            "artifact": "import csv\nfrom io import StringIO\n\nsample = 'account,minutes\\n\"North, Inc.\",5\\nLake,7\\nPine,missing\\n'\nrows = list(csv.DictReader(StringIO(sample)))\nvalid = [r for r in rows if r[\"minutes\"].isdigit()]\nassert rows[0][\"account\"] == \"North, Inc.\"\nassert sum(int(r[\"minutes\"]) for r in valid) == 12\nassert len(rows) - len(valid) == 1",
            "check": "The toy duration contract allows digits only. A decimal or a signed duration requires a different documented contract."
          }
        },
        "questions": [
          {
            "prompt": "A valid account label contains a comma inside quotes. Which parser preserves the column boundary?",
            "correct": 1,
            "options": [
              {
                "text": "Strip quotation marks before splitting the line on commas.",
                "feedback": "Removing the quotes destroys the information that distinguishes a literal comma from a separator."
              },
              {
                "text": "A CSV parser that follows quoting rules.",
                "feedback": "Quoted separators are data inside a field."
              },
              {
                "text": "A plain split on every comma.",
                "feedback": "This incorrectly divides the account label."
              }
            ]
          },
          {
            "prompt": "A 20-row import reports 17 accepted and 2 rejected rows with no other category. What should be investigated?",
            "correct": 2,
            "options": [
              {
                "text": "The two rejected rows explain the full three-row gap.",
                "feedback": "Only two of the three unaccepted rows have been accounted for."
              },
              {
                "text": "The report is complete because accepted plus rejected is below the input total.",
                "feedback": "A count below the total shows unresolved coverage."
              },
              {
                "text": "One input row has no recorded outcome.",
                "feedback": "17 plus 2 accounts for only 19 rows."
              }
            ]
          },
          {
            "prompt": "A CSV lacks a required ticket_id header. What is the most useful response?",
            "correct": 0,
            "options": [
              {
                "text": "Stop the import and name the missing header.",
                "feedback": "The importer cannot identify records under its required schema."
              },
              {
                "text": "Invent sequential ticket IDs and proceed silently.",
                "feedback": "Generated IDs could corrupt identity and future joins."
              },
              {
                "text": "Skip the first data row and retry.",
                "feedback": "Dropping data will not repair a missing header."
              }
            ]
          },
          {
            "prompt": "A reported bug appears only when a queue label contains a comma. Which test is most diagnostic?",
            "correct": 1,
            "options": [
              {
                "text": "A check that the file exists.",
                "feedback": "File presence says nothing about parsed fields."
              },
              {
                "text": "A fixture with that quoted label and an explicit expected parsed row.",
                "feedback": "The test reproduces the exact input condition."
              },
              {
                "text": "A larger file containing only simple labels.",
                "feedback": "More rows do not exercise the reported case."
              }
            ]
          }
        ]
      },
      {
        "week": 5,
        "id": "organize-and-triage-support-tickets",
        "title": "Organize and triage support tickets",
        "summary": "Use stable identifiers, maps and a documented triage rule to turn a queue into an actionable list.",
        "minutes": 15,
        "teaching": [
          "Use a list when order matters and a dictionary when records must be found by key. A ticket ID should identify the same record after its summary changes. Two customers can submit identical summaries, so a summary is a poor primary key.",
          "Write a short routing rule with a tie-breaker. A confirmed service outage might precede a routine question, with equally urgent tickets ordered by arrival time. Keep customer impact, observed behavior and suspected cause in distinct fields. A well-written escalation gives engineering enough detail to reproduce an issue.",
          "Choose a policy for duplicate identifiers before loading records. A dictionary assignment silently replaces the old value. That is appropriate only for a verified update. For an initial import, flag conflicting duplicates for review and preserve the evidence."
        ],
        "example": {
          "title": "Separate symptom from hypothesis",
          "text": "Two accounts report the same message, “export stalled.” Their ticket IDs differ. Keep both records, link them to one incident if evidence supports it, and document the times, affected export format and a minimal reproduction. The messages alone do not establish the cause."
        },
        "project": {
          "prompt": "Index valid tickets by ID and prepare a triage view. Handle an intentional duplicate and write an escalation with expected behavior, observed behavior, reproduction steps and customer impact. Use fictional accounts.",
          "deliverable": "A searchable register, a duplicate policy, and an escalation another teammate could act on.",
          "placeholder": "Identifier … Queue rule … Duplicate outcome … Expected/observed … Reproduction … Impact …",
          "reference": {
            "title": "Triage a broken trial invitation",
            "steps": [
              "Keep the report ID stable even if its title changes.",
              "Reproduce the issue with a fresh fictional invitation and record the observed result.",
              "Separate the evidence from the next diagnostic question, then assign an owner."
            ],
            "artifact": "INC-24 | Trial invitation email opens an expired link\nExpected: A new invitation opens the activation form.\nObserved: A link generated at 10:02 UTC says “expired” at 10:03.\nReproduce: Create trial → request invitation → open it once.\nImpact: 2 of 3 test accounts blocked. Existing accounts still sign in.\nNext check: Compare issued and expiration timestamps.\nOwner: Support engineering. Attach a redacted request ID.",
            "check": "Another person should be able to repeat the steps without customer credentials. The report makes no claim about the cause until the timestamps are checked."
          }
        },
        "questions": [
          {
            "prompt": "Two customers submit the same summary. Which field is safest for indexing the reports?",
            "correct": 2,
            "options": [
              {
                "text": "The summary text.",
                "feedback": "An identical summary produces a collision."
              },
              {
                "text": "The current queue name.",
                "feedback": "Many tickets share a queue and routing can change."
              },
              {
                "text": "A stable, unique ticket ID.",
                "feedback": "Separate reports retain independent identity and history."
              }
            ]
          },
          {
            "prompt": "An incoming row reuses an ID with a different account during an initial import. Which action best preserves evidence?",
            "correct": 0,
            "options": [
              {
                "text": "Quarantine the conflict and retain both source rows for review.",
                "feedback": "An unverified conflict may indicate corruption or a mapping mistake."
              },
              {
                "text": "Silently overwrite the old account.",
                "feedback": "That loses the earlier evidence."
              },
              {
                "text": "Merge every account with the same summary.",
                "feedback": "A shared symptom does not establish identity."
              }
            ]
          },
          {
            "prompt": "Which statement belongs in the observed behavior section of an escalation?",
            "correct": 1,
            "options": [
              {
                "text": "Improve the login experience.",
                "feedback": "This describes a desired outcome, not the observed behavior."
              },
              {
                "text": "The fresh link returned HTTP 410 at 09:03 UTC.",
                "feedback": "This is a specific observation another person can investigate."
              },
              {
                "text": "The cache must be broken.",
                "feedback": "This is a hypothesis until tested."
              }
            ]
          },
          {
            "prompt": "Two incidents meet the same priority rule. A team wants reproducible ordering. What should it document?",
            "correct": 2,
            "options": [
              {
                "text": "The operator’s preferred sort each morning.",
                "feedback": "Personal preferences make the ordering hard to reproduce."
              },
              {
                "text": "Use the order returned by storage without specifying a sort.",
                "feedback": "Storage does not promise a stable order without an explicit ordering rule."
              },
              {
                "text": "A tie-breaker such as earliest received timestamp followed by ticket ID.",
                "feedback": "A secondary ordering rule removes ambiguity when priorities match."
              }
            ]
          }
        ]
      },
      {
        "week": 6,
        "id": "ship-a-tested-python-toolkit",
        "title": "Ship a tested Python toolkit",
        "summary": "Combine earlier modules into a reproducible command-line tool with version history and a handoff.",
        "minutes": 15,
        "teaching": [
          "Give one entry point a narrow job. A reviewer should be able to run a named command with a fixture and see the report. Keep parsing, validation and summarizing in separate functions so a failure can be located and tested.",
          "Git records snapshots. In a local practice folder, git init creates a repository. git status shows changed files, git diff shows unstaged edits, git add stages a selected file, and git commit records the staged snapshot with an explanatory message. Inspect files before staging to keep customer data and credentials out of the repository.",
          "Use a small failing test to reproduce a bug. Change the smallest relevant piece, rerun the failing case and the existing suite, and record what changed. A README should state the supported Python version, one setup command, one run command, an expected result and known limitations."
        ],
        "example": {
          "title": "A change another person can reproduce",
          "text": "A toolkit counts a repeated ticket twice. A two-row fixture with the same ID reproduces the issue. After enforcing the duplicate rule, the fixture produces one accepted record and one conflict. A fresh checkout should produce the same report with the documented command."
        },
        "project": {
          "prompt": "Ship a toolkit that imports a 50-row fictional ticket file, applies validation, totals workload and produces a triage report. Include at least three tests, a bug fix captured in Git, a sample input/output pair and concise run instructions. Explain one change independently and hand the project to a reviewer or test from a fresh folder.",
          "deliverable": "A runnable repository or local Git history, a verified sample report, tests and a handoff README.",
          "placeholder": "Run command … Expected output … Bug and fix … Commit … Fresh-folder check …",
          "reference": {
            "title": "A handoff for an onboarding-events tool",
            "steps": [
              "Choose a fixture small enough for a reviewer to count manually.",
              "Document the command and its expected output alongside the test command.",
              "Record which behavior changed and what evidence demonstrates the repair."
            ],
            "artifact": "# Onboarding events summary\nRequires Python 3.11 or later; uses the standard library.\nRun: python3 summarize.py fixtures/signup.csv\nExpected: 3 rows, 2 distinct accounts, 1 duplicate.\nTest: python3 -m unittest discover -s tests\n\nFix: A retried signup was counted twice.\nEvidence: test_replayed_signup checks the repeated event ID.\nLimit: The fixture has one time zone and no deleted accounts.",
            "check": "Follow these instructions from a clean folder containing only the repository. Any extra step belongs in the README."
          }
        },
        "questions": [
          {
            "prompt": "A colleague needs to reproduce a duplicate-count bug. What should accompany the report?",
            "correct": 0,
            "options": [
              {
                "text": "The smallest fixture that fails and the expected count.",
                "feedback": "A small reproducible failure isolates the defect."
              },
              {
                "text": "A screenshot of the total with no input or reproduction steps.",
                "feedback": "The symptom is visible, but a reviewer cannot recreate the failing case."
              },
              {
                "text": "An example with one record per ID and only the expected total.",
                "feedback": "That fixture cannot reproduce a duplicate-count bug."
              }
            ]
          },
          {
            "prompt": "A file was edited but never staged. What will a normal git commit of staged changes include?",
            "correct": 1,
            "options": [
              {
                "text": "All changed tracked files, even when the new edits were never staged.",
                "feedback": "A normal commit uses the index. Staging or an explicit alternate commit mode is needed for those edits."
              },
              {
                "text": "Only the staged snapshot, excluding the unstaged edit.",
                "feedback": "Git commits the index rather than every working-folder change."
              },
              {
                "text": "The latest working-copy content of files staged earlier.",
                "feedback": "If the file changed after staging, the index still contains the previously staged version."
              }
            ]
          },
          {
            "prompt": "The toolkit works only on the author’s machine. Which check best tests the handoff?",
            "correct": 2,
            "options": [
              {
                "text": "Run it again in the author’s already-configured shell.",
                "feedback": "That repeats the environment that hides the problem."
              },
              {
                "text": "Verify that every file listed by the author exists on the author’s laptop.",
                "feedback": "That does not show whether a reviewer receives all dependencies."
              },
              {
                "text": "Run the documented commands in a clean checkout with the named dependencies.",
                "feedback": "A clean environment exposes hidden local assumptions."
              }
            ]
          },
          {
            "prompt": "A fix makes the reported fixture pass. Why also run the earlier tests?",
            "correct": 0,
            "options": [
              {
                "text": "The change may break previously supported behavior.",
                "feedback": "Regression checks protect the existing contract."
              },
              {
                "text": "The earlier tests provide an automatic runtime performance benchmark.",
                "feedback": "Behavioral tests need explicit timing controls to serve as reliable performance benchmarks."
              },
              {
                "text": "The previous suite replaces the need for a duplicate-specific regression case.",
                "feedback": "Existing tests may never have covered that input. Both the new case and old behavior matter."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "data",
    "title": "Databases and APIs",
    "summary": "Model account data, query a support queue and reconcile a repeatable integration.",
    "badge": "Data Integrator",
    "lessons": [
      {
        "week": 7,
        "id": "answer-operational-questions-with-sql",
        "title": "Answer operational questions with SQL",
        "summary": "Write joins, filters and aggregates that can be checked against actual records.",
        "minutes": 15,
        "teaching": [
          "A relational database stores rows in named tables. SQL describes a result. SELECT names the fields, FROM identifies the source, WHERE filters rows, and ORDER BY gives an explicit order. An open ticket count needs a precise status rule and an agreed reporting period.",
          "A join matches a foreign key to a related table’s key, such as tickets.account_id = accounts.id. An inner join keeps matches. A left join retains unmatched rows on the left with NULL values on the right. Joining a ticket to multiple events can inflate counts: state the unit of each row before aggregating.",
          "Use COUNT(*) for rows and COUNT(column) for non-NULL values in that column. GROUP BY forms one result per group. Verify one account by hand from the input before reporting across the entire dataset.",
          "For the project, create a local database in DB Browser for SQLite. Import accounts.csv as accounts and tickets.csv as tickets using the first row as column names. Check that both account keys use compatible types and that minutes is numeric. The browser studio is a separate join exercise with a smaller schema. The downloadable project files include queue and minutes for the three portfolio queries."
        ],
        "example": {
          "title": "Check the denominator",
          "text": "An account owns three tickets, two open and one closed. Counting all joined tickets returns three. Filtering to status = 'open' before counting returns two. A duplicate account key would multiply matching tickets, so verify uniqueness on the account table."
        },
        "project": {
          "prompt": "Import the supplied accounts.csv and tickets.csv into a local SQLite database or another free SQL workspace. Write queries for open tickets by account, total handling minutes by queue and one useful exception report. State each query’s row unit and hand-check one group. Record any rows excluded by the join. The browser SQL studio provides a separate join exercise using its own sample tables.",
          "deliverable": "Three queries, a result table, and one checked example that explains the join and denominator.",
          "placeholder": "Question … Row unit … Query … Expected result … Excluded data …",
          "reference": {
            "title": "Count unresolved trials by account",
            "steps": [
              "Start with one row per trial and a unique account.id.",
              "Filter by trial state before grouping by account.",
              "Trace two matching rows belonging to the same account to verify the count."
            ],
            "artifact": "-- accounts: (1, 'Mesa'), (2, 'Harbor')\n-- trials: (10, 1, 'open'), (11, 1, 'open'), (12, 2, 'closed')\nSELECT a.name, COUNT(*) AS open_trials\nFROM trials AS t JOIN accounts AS a ON t.account_id = a.id\nWHERE t.status = 'open'\nGROUP BY a.id, a.name\nORDER BY open_trials DESC, a.name;",
            "check": "The result is Mesa, 2. To show accounts with zero open trials, start from accounts, left join trials with the status condition in ON, and count non-NULL trial IDs."
          }
        },
        "questions": [
          {
            "prompt": "A ticket joins to three comment rows. Which metric still counts that ticket once?",
            "correct": 1,
            "options": [
              {
                "text": "COUNT(DISTINCT comment_id)",
                "feedback": "That counts distinct comments. It will still count three for the one ticket in this example."
              },
              {
                "text": "COUNT(DISTINCT ticket_id)",
                "feedback": "The distinct ticket key preserves the ticket-level unit."
              },
              {
                "text": "COUNT(*) across the joined rows",
                "feedback": "This counts each matching comment row."
              }
            ]
          },
          {
            "prompt": "A dashboard must show every account, including those without tickets. Which starting join fits?",
            "correct": 2,
            "options": [
              {
                "text": "Tickets inner joined to accounts.",
                "feedback": "Accounts without tickets produce no matching ticket row."
              },
              {
                "text": "Tickets cross joined to accounts.",
                "feedback": "A cross join pairs every ticket with every account."
              },
              {
                "text": "Accounts left joined to tickets.",
                "feedback": "Each account remains even when its ticket fields are NULL."
              }
            ]
          },
          {
            "prompt": "A product asks for the five longest open tickets. Which operation must happen before the limit?",
            "correct": 0,
            "options": [
              {
                "text": "Filter to open tickets and sort by duration descending.",
                "feedback": "The top five should be selected from the intended population and order."
              },
              {
                "text": "Take any five rows, then filter to open.",
                "feedback": "An early arbitrary limit may discard the longest tickets."
              },
              {
                "text": "Limit the full set by duration, then remove closed tickets.",
                "feedback": "Closed tickets could occupy the limited positions and hide eligible open ones."
              }
            ]
          },
          {
            "prompt": "An account has two tickets with recorded times and one NULL time. What does COUNT(minutes) return?",
            "correct": 1,
            "options": [
              {
                "text": "0",
                "feedback": "Two non-NULL records contribute to the count."
              },
              {
                "text": "2",
                "feedback": "COUNT of a column excludes its NULL values."
              },
              {
                "text": "3",
                "feedback": "COUNT(*) would count all three ticket rows."
              }
            ]
          }
        ]
      },
      {
        "week": 8,
        "id": "design-connected-data-tables",
        "title": "Design connected data tables",
        "summary": "Choose keys, constraints and table boundaries that keep account and ticket data consistent.",
        "minutes": 15,
        "teaching": [
          "Write the grain of each table in one sentence. One account row represents a customer account. One ticket row represents a support request. One ticket-event row represents a change to that request. Repeating the account name across every event makes renames difficult to apply consistently.",
          "A primary key identifies one row. A foreign key ties a row to a real parent. Use NOT NULL for required values and UNIQUE where duplicates would violate identity. A child table lets one account have many tickets without adding ticket_1 and ticket_2 columns.",
          "Use a transaction for an operation that must completely succeed or completely fail. Enable SQLite foreign-key enforcement on each database connection with PRAGMA foreign_keys = ON. Test constraints with a fictional orphan row and document how imports handle missing parents."
        ],
        "example": {
          "title": "Model a status history",
          "text": "A current ticket status answers what is open now. An events table with ticket_id, new_status and occurred_at can also answer when a ticket changed. One overwritable status column cannot recover the sequence of older changes."
        },
        "project": {
          "prompt": "Design a small schema for accounts, tickets and ticket events. Add primary and foreign keys, at least one uniqueness rule and a supported-status constraint. Demonstrate a successful insert and a rejected orphan or duplicate. Include a small relationship diagram or plain-text map.",
          "deliverable": "A schema, a relationship map, and an observed constraint failure with a repair.",
          "placeholder": "Table grain … Keys … Insert that passes … Insert that fails … Repair …",
          "reference": {
            "title": "Model teams and trial workspaces",
            "steps": [
              "Store the team once, then let each workspace point to that team.",
              "Add the foreign key before loading workspaces and enable enforcement.",
              "Try a nonexistent team ID and record the expected database response."
            ],
            "artifact": "PRAGMA foreign_keys = ON;\nCREATE TABLE teams (id INTEGER PRIMARY KEY, name TEXT NOT NULL);\nCREATE TABLE workspaces (\n  id INTEGER PRIMARY KEY,\n  team_id INTEGER NOT NULL REFERENCES teams(id),\n  slug TEXT NOT NULL UNIQUE\n);\nINSERT INTO teams VALUES (7, 'Demo team');\nINSERT INTO workspaces VALUES (42, 7, 'demo-trial');\n-- A workspace pointing to team 999 must fail while enforcement is on.",
            "check": "Two workspaces can share team 7. Reusing the same slug must fail even when the second workspace has a different ID."
          }
        },
        "questions": [
          {
            "prompt": "An account can own many tickets. Where should account_id usually live?",
            "correct": 2,
            "options": [
              {
                "text": "In a comma-separated list on the account.",
                "feedback": "This is difficult to join and constrain reliably."
              },
              {
                "text": "In one ticket_id column on each account.",
                "feedback": "A single child key on the parent can represent only one ticket without duplication."
              },
              {
                "text": "In each ticket row as a foreign key.",
                "feedback": "The child carries the reference to its one parent account."
              }
            ]
          },
          {
            "prompt": "A team needs the full sequence of ticket status changes. Which model preserves it?",
            "correct": 0,
            "options": [
              {
                "text": "One event row per change with a ticket key and timestamp.",
                "feedback": "Separate events preserve repeated transitions and their times."
              },
              {
                "text": "Only the latest status and no history.",
                "feedback": "Overwriting the status loses earlier values."
              },
              {
                "text": "A total number of tickets per month.",
                "feedback": "An aggregate cannot recover individual transitions."
              }
            ]
          },
          {
            "prompt": "A transaction writes a ticket and an event that must both exist. The event insert fails. What should happen?",
            "correct": 1,
            "options": [
              {
                "text": "Retry the event and commit the ticket without marking the gap.",
                "feedback": "If the retry still fails, the transaction has left one side of the required pair committed."
              },
              {
                "text": "Roll back the ticket and event transaction.",
                "feedback": "Atomicity keeps a half-completed logical operation out of the data."
              },
              {
                "text": "Always commit the ticket and call the operation complete.",
                "feedback": "That violates the stated requirement that both records exist."
              }
            ]
          },
          {
            "prompt": "A source delivers the same external ticket ID twice. What constraint directly protects identity?",
            "correct": 2,
            "options": [
              {
                "text": "A UNIQUE constraint on the support summary.",
                "feedback": "Different tickets can legitimately share a summary, and an edited summary would not preserve identity."
              },
              {
                "text": "Sorting each import by date.",
                "feedback": "Sorting changes order but cannot enforce uniqueness."
              },
              {
                "text": "A UNIQUE constraint on the appropriate source and external ID combination.",
                "feedback": "A key scoped to its source prevents accidental duplicate identities."
              }
            ]
          }
        ]
      },
      {
        "week": 9,
        "id": "read-an-api-contract",
        "title": "Read an API contract",
        "summary": "Trace a request, interpret its response and retrieve every page of a result.",
        "minutes": 15,
        "teaching": [
          "An HTTP request has a method, a path, headers and sometimes a body. An API contract describes required inputs, returned fields, errors and pagination. GET usually reads a resource. A response includes a status code and a body. JSON is a text representation of objects, arrays and primitive values.",
          "Start with the supplied API response fixture. Inspect the keys of the outer object, then inspect one item. A successful status alone does not prove that an expected field exists or has the right type. Run the same validation rules used for CSV inputs.",
          "Read the response’s next cursor or link until the contract indicates the final page. Keep a set of seen cursors and stop with an error if one repeats. Distinguish a valid final empty page from a failed request. Any external API demonstration is optional."
        ],
        "example": {
          "title": "Trace a two-page conversation",
          "text": "A first response has two items and next = \"p2\". Looking up p2 returns one more item and next = null. The result contains three items. Reading the first page alone produces a plausible but incomplete report."
        },
        "project": {
          "prompt": "Inspect the supplied API pages, write down the response schema and retrieve the complete dataset. Log page count, accepted records and one invalid or missing-field case. Compare a successful read with a failed request using a fictional example.",
          "deliverable": "An annotated request/response, a pagination trace and an explicit failure case.",
          "placeholder": "Method and path … Keys and types … Page trace … Last-page signal … Error …",
          "reference": {
            "title": "Read an onboarding directory",
            "steps": [
              "Start from the documented first cursor.",
              "Accumulate items, then follow each next value until it is absent.",
              "Compare the collected identifiers with the two sample pages."
            ],
            "artifact": "pages = {\"start\": {\"items\": [\"A\", \"B\"], \"next\": \"more\"},\n         \"more\": {\"items\": [\"C\"], \"next\": None}}\ncursor, seen, result = \"start\", set(), []\nwhile cursor is not None:\n    if cursor in seen:\n        raise ValueError(\"Repeated cursor\")\n    seen.add(cursor)\n    page = pages[cursor]\n    result.extend(page[\"items\"])\n    cursor = page[\"next\"]\nassert result == [\"A\", \"B\", \"C\"]",
            "check": "Changing the second next value to \"start\" should trigger the repeated-cursor check."
          }
        },
        "questions": [
          {
            "prompt": "A response contains data and a nonempty next cursor. What should an importer do?",
            "correct": 0,
            "options": [
              {
                "text": "Read the next page using the documented cursor.",
                "feedback": "A nonempty cursor means more results may exist."
              },
              {
                "text": "Stop because the first request succeeded.",
                "feedback": "HTTP success applies to that page only."
              },
              {
                "text": "Generate new cursors by adding one to the item IDs.",
                "feedback": "A cursor can be opaque and unrelated to item numbering."
              }
            ]
          },
          {
            "prompt": "An endpoint returns HTTP 200 but items is a string instead of an array. Which check catches this?",
            "correct": 1,
            "options": [
              {
                "text": "Confirm that the body can be parsed as JSON.",
                "feedback": "A string is valid JSON. Parsing alone cannot verify the required array type."
              },
              {
                "text": "Validate the response structure before processing items.",
                "feedback": "A successful transport does not guarantee the expected application schema."
              },
              {
                "text": "Verify the Content-Type is application/json.",
                "feedback": "A media type says nothing about whether items has the contracted shape."
              }
            ]
          },
          {
            "prompt": "The service returns HTTP 404 for a documented single-record lookup. What does that most directly indicate?",
            "correct": 2,
            "options": [
              {
                "text": "The entire provider is experiencing a network outage.",
                "feedback": "A 404 is a response from a server, not evidence of a total outage."
              },
              {
                "text": "The response contains an empty successful page.",
                "feedback": "A failed lookup and a valid empty page have different meanings."
              },
              {
                "text": "The addressed resource could not be found at that path.",
                "feedback": "The status does not establish whether every other record exists."
              }
            ]
          },
          {
            "prompt": "A page repeatedly returns its own next cursor. What control prevents an endless loop?",
            "correct": 0,
            "options": [
              {
                "text": "Track visited cursors and flag a repeat.",
                "feedback": "A repeated pagination state cannot make forward progress."
              },
              {
                "text": "Discard the cursor log on each iteration.",
                "feedback": "Then a previous cursor cannot be recognized."
              },
              {
                "text": "Keep following the same cursor without a limit.",
                "feedback": "The importer would continue requesting the same page."
              }
            ]
          }
        ]
      },
      {
        "week": 10,
        "id": "build-a-repeatable-data-integration",
        "title": "Build a repeatable data integration",
        "summary": "Connect a source to storage while handling retries, rejected records and reporting gaps.",
        "minutes": 15,
        "teaching": [
          "Define the contract between a source event and a stored row. A stable event ID lets the importer recognize a replay. Idempotency means running the operation twice with the same event produces the same final business effect. A timestamp alone is a weak identity because events can share one.",
          "Validate each event, write the business change and record its processed ID together in one transaction. Advance a checkpoint only after its associated data is durable. A permanent validation error belongs in a rejection log with a repair path. Temporary failures may justify bounded retries with a delay.",
          "Publish a reconciliation that counts source arrivals, successful writes, replayed IDs and quarantined rows. If an entire source page fails, mark the report incomplete. A missing page is different from a confirmed page with zero activity."
        ],
        "example": {
          "title": "Reconcile a replay",
          "text": "A feed returns event e1, a replay of e1, and e2 with an unknown account. The importer records one new event, one duplicate and one quarantined row. Reporting two new events would double-count the replay."
        },
        "project": {
          "prompt": "Build a local import into SQLite from the sample events or an equivalent fixture. Simulate a duplicate, a malformed event and a failed page. Run the import twice. Produce a short incident handoff describing what happened, whether data was lost and how a teammate can recover.",
          "deliverable": "A replay-safe importer, reconciled row counts, a repeat-run demonstration and a recovery note.",
          "placeholder": "Event key … First and second run … Failure point … Missing coverage … Recovery command …",
          "reference": {
            "title": "Resume an activation feed",
            "steps": [
              "Use event_id as a unique key and store the activation and processed ID in the same transaction.",
              "Simulate an interruption after the commit but before the next cursor is saved. Replay the previous page.",
              "Compare the unique event count with the final business total."
            ],
            "artifact": "First read:  E7 = 2 seats; E8 = 3 seats\nCommit:      E7 and E8 stored; total = 5\nCrash:       cursor still points to first page\nReplay:      E7 and E8 already present; total stays 5\nNext page:   E9 = 1 seat; total = 6\nReport:      5 arrivals, 3 new IDs, 2 replays, 6 seats",
            "check": "The duplicate-arrival count increases on replay. The seat total changes only for a newly accepted event."
          }
        },
        "questions": [
          {
            "prompt": "An importer sees the same stable event twice after a timeout. What outcome shows idempotency?",
            "correct": 1,
            "options": [
              {
                "text": "A new randomly generated source ID each run.",
                "feedback": "New IDs prevent reliable detection of replays."
              },
              {
                "text": "One stored business effect for that event.",
                "feedback": "A retry must leave the logical result unchanged."
              },
              {
                "text": "Two charges and one log entry.",
                "feedback": "The duplicate charge is a second business effect."
              }
            ]
          },
          {
            "prompt": "A page write fails after its checkpoint was already advanced. What is the main risk?",
            "correct": 2,
            "options": [
              {
                "text": "Every remaining event will necessarily be processed twice.",
                "feedback": "A premature checkpoint primarily risks omission."
              },
              {
                "text": "The failed page becomes a valid zero-activity day.",
                "feedback": "Failure provides no evidence of zero activity."
              },
              {
                "text": "A restart can skip data that was never committed.",
                "feedback": "Advancing the cursor signals that those records are durable."
              }
            ]
          },
          {
            "prompt": "A valid account reference is absent from one source row because of a permanent input error. Which handling fits?",
            "correct": 0,
            "options": [
              {
                "text": "Quarantine the row with its source ID and an actionable reason.",
                "feedback": "The row can be fixed and replayed without endless retries."
              },
              {
                "text": "Retry the unchanged invalid row forever.",
                "feedback": "An unchanged permanent validation error will recur."
              },
              {
                "text": "Count the rejected row as successfully stored.",
                "feedback": "That hides a reconciliation gap."
              }
            ]
          },
          {
            "prompt": "A report shows zero events on a day when the source was unreachable. What should the report display?",
            "correct": 1,
            "options": [
              {
                "text": "The previous day’s count as the observed total.",
                "feedback": "A substituted count does not measure that day."
              },
              {
                "text": "Unknown or incomplete coverage for that day.",
                "feedback": "A fetch failure cannot establish zero source activity."
              },
              {
                "text": "A confirmed zero with no status note.",
                "feedback": "This invents a value for unobserved data."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "apps",
    "title": "Application development",
    "summary": "Build an accessible intake service, ship a decision-ready dashboard and support a pilot.",
    "badge": "Application Builder",
    "lessons": [
      {
        "week": 11,
        "id": "design-an-accessible-intake-form",
        "title": "Design an accessible intake form",
        "summary": "Build a form that explains its inputs, preserves a failed submission and supports keyboard use.",
        "minutes": 15,
        "teaching": [
          "An accessible form starts with a real label associated with each input. Placeholder text disappears while typing. Related fields and clear button names help a user understand what submitting will do. A keyboard user should be able to reach every control and see focus.",
          "Validate on the client for fast local feedback and at the service boundary for authoritative checks. An error message should identify the field, explain the rule and preserve the previously entered values. An error summary or focus change helps a screen reader or keyboard user find the problem.",
          "Handle repeated submissions deliberately. Mark a request as pending during submission, and use a stable submission ID when the service supports retry-safe writes. Show a clear success or failure state after the service replies."
        ],
        "example": {
          "title": "Follow a failed submission",
          "text": "A student submits a ticket without a subject. The form preserves the selected queue, moves focus to the subject error and explains the missing value. Correcting that one field should submit the original record once."
        },
        "project": {
          "prompt": "Build a support intake form or a comparable onboarding form. Include visible labels, one useful validation message and clear submitting, success and error states. Walk through the form with a keyboard, then simulate a double click or retry. Capture the result.",
          "deliverable": "A working form, keyboard walkthrough and before/after evidence of one usability correction.",
          "placeholder": "User goal … Input rules … Keyboard path … Failed submission … Fix …",
          "reference": {
            "title": "Label a trial workspace request",
            "steps": [
              "Associate the visible label and input through matching for/id attributes.",
              "Put the allowed naming rule next to the input using aria-describedby.",
              "Try the form with only Tab, typing and Enter. Test an invalid value and correct it."
            ],
            "artifact": "<form>\n  <label for=\"slug\">Workspace name</label>\n  <p id=\"rule\">Use 3 to 12 lowercase letters.</p>\n  <input id=\"slug\" name=\"slug\" required pattern=\"[a-z]{3,12}\"\n         aria-describedby=\"rule\">\n  <button type=\"submit\">Request workspace</button>\n</form>",
            "check": "The browser rejects AB and accepts maple. A production service must enforce the same name contract on receipt."
          }
        },
        "questions": [
          {
            "prompt": "A form uses a placeholder as its only field name. What improvement best supports students using assistive technology?",
            "correct": 2,
            "options": [
              {
                "text": "Make the placeholder more descriptive and keep it as the only label.",
                "feedback": "The visible name still disappears as soon as typing starts."
              },
              {
                "text": "Use a longer tooltip as the only field description.",
                "feedback": "A hover tooltip is a poor substitute for an associated persistent field name."
              },
              {
                "text": "Add a persistent associated label.",
                "feedback": "It remains available while typing and provides an accessible name."
              }
            ]
          },
          {
            "prompt": "The email field is invalid after submission. Which response helps the user recover?",
            "correct": 0,
            "options": [
              {
                "text": "Preserve the form values and identify the email correction.",
                "feedback": "The user can repair the affected field without repeating other work."
              },
              {
                "text": "Clear every field without explanation.",
                "feedback": "This obscures the cause and discards valid work."
              },
              {
                "text": "Show only a generic “invalid form” notice above the page.",
                "feedback": "A generic error does not identify the email field or what to fix."
              }
            ]
          },
          {
            "prompt": "A direct client bypasses browser validation. Which component must still enforce the input rules?",
            "correct": 1,
            "options": [
              {
                "text": "The database column type alone for every rule.",
                "feedback": "A text column can accept an empty summary or unauthorized queue unless application or database rules enforce the contract."
              },
              {
                "text": "The receiving service.",
                "feedback": "Clients can submit requests independent of the form."
              },
              {
                "text": "The client-side submit handler, even for calls sent directly to the API.",
                "feedback": "A direct request bypasses browser event handlers entirely."
              }
            ]
          },
          {
            "prompt": "Two clicks cause two writes despite a visual loading indicator. What additional design protects the service?",
            "correct": 2,
            "options": [
              {
                "text": "Debounce the browser button and assume every client honors that delay.",
                "feedback": "A retry from another client or a network replay still reaches the service."
              },
              {
                "text": "Generate a new key on every retry.",
                "feedback": "Different keys make one logical submission look like several."
              },
              {
                "text": "Reuse a submission key and deduplicate the operation at the service.",
                "feedback": "A stable key protects retries even when multiple requests arrive."
              }
            ]
          }
        ]
      },
      {
        "week": 12,
        "id": "build-a-ticket-api",
        "title": "Build a ticket API",
        "summary": "Expose a small service with explicit request shapes, response codes and testable behavior.",
        "minutes": 15,
        "teaching": [
          "Define the API before implementing it. Specify how a caller creates a ticket, looks up one by ID, and requests a filtered list. Show one valid request body, its response shape and the meaning of each status code. Keep public responses limited to fields the caller is allowed to see.",
          "In a local FastAPI project, define a Pydantic model for input and a separate response model. A POST route can create a resource and return 201. A missing lookup can return 404. Return a validation error with enough detail to fix the request. The same service rules apply to every client.",
          "Test the contract by making requests through the API rather than calling only internal functions. Check status, body and stored effects. Use a fictional tenant ID and verify that a request scoped to one account cannot read another account’s ticket."
        ],
        "example": {
          "title": "Test a create-and-read sequence",
          "text": "A valid POST creates ticket 7 and returns its ID. GET with the same account and ID returns the submitted summary. A missing ID should produce a documented error. A request from a different account must receive an appropriate access-safe response."
        },
        "project": {
          "prompt": "Implement create, read and list operations for a ticket service. Use the earlier validator, include one scope check with fictional tenants and document a failure response. Demonstrate a complete request in the project notebook. Any local test client is sufficient.",
          "deliverable": "A request/response contract, a working service and tests for success, validation, missing data and tenant scope.",
          "placeholder": "Endpoint … Body … Status and result … Scope … Error test …",
          "reference": {
            "title": "Document a workspace creation contract",
            "steps": [
              "Write the request with only the fields callers control.",
              "Return an identifier and resource location on successful creation.",
              "Check that invalid input cannot create a record and that another tenant cannot read the result."
            ],
            "artifact": "POST /workspaces\nBody: {\"slug\":\"maple\"}\n\n201 Created\nLocation: /workspaces/17\n{\"id\":17,\"slug\":\"maple\"}\n\nGET /workspaces/17  → 200 for the owning tenant\nPOST with slug \"\"   → 422, no record created\nGET as other tenant → 404 under this service’s policy",
            "check": "The count of stored workspaces increases once for the valid request and stays unchanged after the invalid request."
          }
        },
        "questions": [
          {
            "prompt": "A POST successfully creates a new ticket. Which response most clearly communicates creation?",
            "correct": 0,
            "options": [
              {
                "text": "201 with the new resource identifier.",
                "feedback": "201 denotes creation and the identifier lets the caller retrieve it."
              },
              {
                "text": "204 with no body or reference to the created ticket.",
                "feedback": "The caller still needs a reliable identifier and explicit creation signal."
              },
              {
                "text": "202 with only a pending job ID after the ticket is already created.",
                "feedback": "202 communicates accepted asynchronous work. This scenario describes completed creation."
              }
            ]
          },
          {
            "prompt": "A caller asks for an unknown ticket. Which API test checks the documented behavior?",
            "correct": 1,
            "options": [
              {
                "text": "Assert only that the response body parses as JSON.",
                "feedback": "A JSON error and a JSON success can both parse. The status and safe message still need checks."
              },
              {
                "text": "Assert the missing-resource status and a safe error body.",
                "feedback": "Both status and message are part of the client contract."
              },
              {
                "text": "Test only that an internal function was invoked.",
                "feedback": "An internal call cannot prove the external response."
              }
            ]
          },
          {
            "prompt": "A caller supplies a different account ID in a request. Where should an access decision get its trusted account scope?",
            "correct": 2,
            "options": [
              {
                "text": "From any account name written in the request body.",
                "feedback": "The client could choose an unauthorized scope."
              },
              {
                "text": "From the requested URL’s account parameter alone.",
                "feedback": "A caller can edit a URL. The server must compare the requested scope with the authorized identity."
              },
              {
                "text": "From the authenticated identity and server-side authorization.",
                "feedback": "An untrusted client field cannot grant access to another tenant."
              }
            ]
          },
          {
            "prompt": "A response model adds internal notes that contain private account details. Which design addresses the exposure?",
            "correct": 0,
            "options": [
              {
                "text": "Define an explicit public response schema with only allowed fields.",
                "feedback": "A boundary-specific schema avoids returning arbitrary internal columns."
              },
              {
                "text": "Send the notes and hide them with CSS.",
                "feedback": "The data is already exposed to the client."
              },
              {
                "text": "Rely on every consumer to delete notes after receipt.",
                "feedback": "This still sends fields outside the intended boundary."
              }
            ]
          }
        ]
      },
      {
        "week": 13,
        "id": "build-a-decision-ready-dashboard",
        "title": "Build a decision-ready dashboard",
        "summary": "Define a metric precisely, make its filters visible and explain uncertainty in the underlying data.",
        "minutes": 15,
        "teaching": [
          "Start with the decision. A support lead may need to assign staff to the queue with the largest open workload. Define the population, time window, row unit and units of measure. An average of queue averages can mislead when the queues have different sizes.",
          "Build a narrow dashboard in Streamlit or another free local framework. Read the validated data, expose a queue filter and show both the metric and the number of contributing observations. Apply the same filters to the chart, its label and any downloadable detail.",
          "Separate an empty but valid result from an unavailable source. Show the last successful refresh and a visible incomplete-data state when necessary. A small drill-down to underlying fictional rows helps a teammate check the conclusion."
        ],
        "example": {
          "title": "Weight the groups correctly",
          "text": "One queue has two waits averaging 15 minutes. Another has eight waits averaging five minutes. The combined mean is (2 × 15 + 8 × 5) ÷ 10 = 7 minutes. An unweighted mean of the two queue averages would report ten."
        },
        "project": {
          "prompt": "Build a local dashboard for a support queue or another chosen workflow. Define two metrics, add a filter and include counts and data freshness. Present one decision supported by the display and one question it cannot answer. Test a filter that matches no rows.",
          "deliverable": "A working dashboard with two metric definitions, one empty state and a verified result.",
          "placeholder": "Decision … Metric and denominator … Filter … Hand check … Limitation …",
          "reference": {
            "title": "Display activation completion rates",
            "steps": [
              "Define the unit as one eligible workspace in a named cohort.",
              "Compute a numerator and denominator with the same cohort filter.",
              "Display the counts alongside the rate and choose a clear empty state."
            ],
            "artifact": "Cohort             Eligible  Activated  Rate\nJune self-serve           12          9   75%\nJune assisted              3          3  100%\nJune combined             15         12   80%\nJuly sample                0          0   No eligible data\n\nSource refreshed: July 1, 09:00 UTC (fictional snapshot)",
            "check": "The combined result is 12/15. An unweighted average of 75% and 100% would incorrectly yield 87.5%."
          }
        },
        "questions": [
          {
            "prompt": "Two queues have the same average wait but very different sample sizes. What should accompany each average?",
            "correct": 1,
            "options": [
              {
                "text": "The total number of users across all time.",
                "feedback": "An unrelated denominator does not describe the period."
              },
              {
                "text": "The contributing count and reporting window.",
                "feedback": "These give context for the apparent equality."
              },
              {
                "text": "The unweighted average of both queues, without their counts.",
                "feedback": "A combined average does not tell how much evidence supports either queue."
              }
            ]
          },
          {
            "prompt": "A filter has no eligible users. What should an activation-rate dashboard show?",
            "correct": 2,
            "options": [
              {
                "text": "A confirmed 0% success rate.",
                "feedback": "That implies observed failures among eligible users."
              },
              {
                "text": "A confirmed 100% success rate.",
                "feedback": "No successful observations support that rate."
              },
              {
                "text": "No eligible data for that filter.",
                "feedback": "A denominator of zero makes the rate undefined."
              }
            ]
          },
          {
            "prompt": "Filtering to one customer changes the chart but leaves its caption as “all customers.” What is the defect?",
            "correct": 0,
            "options": [
              {
                "text": "The label and metric describe different populations.",
                "feedback": "A reader could make an incorrect cross-customer inference."
              },
              {
                "text": "The dashboard should keep the mixed scopes and add decimal precision.",
                "feedback": "Precision cannot repair a filter-to-caption mismatch."
              },
              {
                "text": "Only the numerical aggregation can be wrong when filters change.",
                "feedback": "The values can be correct while a misleading label gives the reader the wrong interpretation."
              }
            ]
          },
          {
            "prompt": "A report has 10 successes among 20 users in cohort A and 2 among 2 in cohort B. What is the combined rate?",
            "correct": 1,
            "options": [
              {
                "text": "12/20, or 60%.",
                "feedback": "The denominator must include both eligible users in cohort B."
              },
              {
                "text": "12/22, approximately 55%.",
                "feedback": "Combine the success counts and denominators before dividing."
              },
              {
                "text": "75%.",
                "feedback": "Averaging 50% and 100% incorrectly gives both cohorts equal weight."
              }
            ]
          }
        ]
      },
      {
        "week": 14,
        "id": "release-a-product-another-team-can-use",
        "title": "Release a product another team can use",
        "summary": "Pilot an application with a setup guide, acceptance tests, feedback and a rollback decision.",
        "minutes": 15,
        "teaching": [
          "A release is an identifiable version another person can run. Pin dependencies, document setup, include a sample dataset and specify the intended operating environment. A change log should describe an observable change for the user.",
          "An acceptance test starts from a user goal. For example, an operator filters to one account, opens a ticket and records an action. Define what counts as success, provide a clean fixture and observe a real or rehearsed run. Capture where the operator needed help.",
          "Prepare a launch playbook with an owner, a date, a success check, expected failure modes and a rollback trigger. A reproduction report should record the version, actions, expected and observed results, impact and a proposed next check. Rehearsals can demonstrate the process and must be identified as rehearsals."
        ],
        "example": {
          "title": "Convert feedback into a release check",
          "text": "During a practice onboarding, an operator mistakes an empty filtered list for a successful import. Add an empty-state explanation and a test for that filter. Record the original difficulty and repeat the same task on the new version."
        },
        "project": {
          "prompt": "Release the intake-and-dashboard application locally or on a free static host where suitable. Write a one-page onboarding runbook and observe one task walkthrough. Fix one issue, attach a clear escalation or bug report, and repeat the test. Use a rehearsal if a reviewer is unavailable.",
          "deliverable": "A tagged or named release, onboarding runbook, test evidence and an issue report with a verified fix.",
          "placeholder": "Version … Operator goal … Acceptance test … Issue … Fix … Rollback condition …",
          "reference": {
            "title": "Pilot a knowledge-base export",
            "steps": [
              "Give a teammate one task and a fictional account instead of a feature tour.",
              "State the go/no-go check and a reversible fallback.",
              "Repeat the same acceptance task after the fix and record measured time separately from the claim."
            ],
            "artifact": "Pilot v0.2 · Owner: onboarding lead\nGoal: export the trial account’s three published articles.\nAcceptance: CSV contains exactly 3 article IDs and no drafts.\nObserved: draft article 44 appeared; stop pilot and return to v0.1.\nRepair: restrict the export query to published records.\nRetest: 3 published IDs, 0 drafts. Follow-up: test an empty account.",
            "check": "A teammate can identify the version, reproduce the issue, verify the expected output and locate the fallback."
          }
        },
        "questions": [
          {
            "prompt": "A pilot tester says “the export is broken.” Which follow-up yields actionable evidence?",
            "correct": 2,
            "options": [
              {
                "text": "Collect only a star rating.",
                "feedback": "A score does not explain what failed."
              },
              {
                "text": "Estimate impact from the number of times the tester repeated the comment.",
                "feedback": "Repetition does not establish which version, conditions or customers are affected."
              },
              {
                "text": "Capture version, steps, expected versus observed output and impact.",
                "feedback": "A concrete report can be independently reproduced and prioritized."
              }
            ]
          },
          {
            "prompt": "A release works on a laptop but references a private file path. What handoff check catches it?",
            "correct": 0,
            "options": [
              {
                "text": "Run from a clean environment using the public sample and README.",
                "feedback": "This exposes undocumented local dependencies."
              },
              {
                "text": "Test only the original author’s open browser tab.",
                "feedback": "That tab may already contain local state."
              },
              {
                "text": "Rename the file on the author’s machine without updating instructions.",
                "feedback": "The dependency would remain undocumented."
              }
            ]
          },
          {
            "prompt": "A rollout exposes records to the wrong account. Which prewritten item is immediately relevant?",
            "correct": 1,
            "options": [
              {
                "text": "The next planned usability study.",
                "feedback": "A future study cannot contain an immediate access-boundary failure."
              },
              {
                "text": "The stop condition and rollback owner.",
                "feedback": "A serious isolation failure calls for a clear stop-and-recover decision."
              },
              {
                "text": "The post-release adoption goal.",
                "feedback": "A growth target does not authorize continued exposure or assign recovery responsibility."
              }
            ]
          },
          {
            "prompt": "A student rehearsed the pilot alone. How should the case study describe it?",
            "correct": 2,
            "options": [
              {
                "text": "Present it as an independent customer interview.",
                "feedback": "That misrepresents the source of evidence."
              },
              {
                "text": "Count the rehearsal as three external pilots.",
                "feedback": "Repeating a scenario does not create independent participants."
              },
              {
                "text": "Label it a rehearsal and state which user assumptions remain untested.",
                "feedback": "This preserves the value of the exercise and the limits of its evidence."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "ai",
    "title": "Applied AI and automation",
    "summary": "Compare model outputs, retrieve evidence, supervise tools and evaluate release quality.",
    "badge": "AI Evaluator",
    "lessons": [
      {
        "week": 15,
        "id": "compare-language-models-on-a-real-task",
        "title": "Compare language models on a real task",
        "summary": "Use a fixed evaluation set to compare quality, completion time and cost.",
        "minutes": 15,
        "teaching": [
          "A language model predicts tokens conditioned on an input context. A token is a unit of text used by the model; an input token is processed from the prompt, while an output token is generated. The context window limits what fits into one request. A fluent answer can still conflict with the evidence.",
          "Define success before comparing models. Choose representative inputs, expected behavior, a rubric and cases where the correct response is to ask for clarification or abstain. Hold the prompts, evidence and scoring rules constant while changing one variable. Reserve a separate set for the final check.",
          "Track quality, latency and cost together. At fictional rates per thousand tokens, cost = input_tokens/1000 × input_rate + output_tokens/1000 × output_rate. Use the supplied response sets for free. Their outputs are simulated and cannot establish the performance of a named commercial model."
        ],
        "example": {
          "title": "Choose a model under a constraint",
          "text": "On ten fixed requests, configuration A meets the rubric nine times and B eight times. If one of A’s misses reveals private data, an overall score alone is insufficient. Record the failure category and the workflow’s explicit release threshold."
        },
        "project": {
          "prompt": "Compare two model configurations or the two supplied fictional response sets on 20 support cases. Write the rubric before scoring. Report quality counts, one important failure slice and a cost calculation with labeled rates. State which cases need a human and what evidence would justify changing the choice.",
          "deliverable": "A reproducible comparison, labeled fixture or model versions, a scored table and a reasoned recommendation.",
          "placeholder": "Task … Cases … Scoring dimensions … Versions … Cost assumption … Decision …",
          "reference": {
            "title": "Compare article-tagging prompts",
            "steps": [
              "Hold three article descriptions and expected tags fixed.",
              "Change only the prompt and score exact tag matches.",
              "Use the small result to propose a larger test, including ambiguous articles."
            ],
            "artifact": "Expected tags: billing | setup | export\nPrompt A:      billing | setup | setup   → 2/3\nPrompt B:      billing | setup | export  → 3/3\nB usage: 1,000 input + 200 output tokens\nFictional rates per 1,000: $0.02 input, $0.08 output\nEstimated B cost: $0.02 + $0.016 = $0.036",
            "check": "Prompt B wins on these three inputs. A credible recommendation calls for held-out articles and a review of costly errors before rollout."
          }
        },
        "questions": [
          {
            "prompt": "Two prompts were scored on different customer requests. Which revision supports a fairer comparison?",
            "correct": 0,
            "options": [
              {
                "text": "Run both prompts on the same representative cases with one rubric.",
                "feedback": "Holding the cases and scorer fixed reduces confounding."
              },
              {
                "text": "Compare the percentages from each run without checking case mix.",
                "feedback": "Differences in case difficulty could explain the scores."
              },
              {
                "text": "Compare only the fastest response from each run.",
                "feedback": "Best-case speed does not measure quality on comparable tasks."
              }
            ]
          },
          {
            "prompt": "A model gives a polished answer with a quotation missing from the supplied policy. How should it score on grounding?",
            "correct": 1,
            "options": [
              {
                "text": "Pass if another model repeats the same quote.",
                "feedback": "Agreement between models does not establish source support."
              },
              {
                "text": "Fail the unsupported claim and record the missing evidence.",
                "feedback": "A fluent style cannot substitute for support in the source."
              },
              {
                "text": "Pass because the quotation looks plausible.",
                "feedback": "Plausibility is not evidence."
              }
            ]
          },
          {
            "prompt": "A run uses 2,000 input and 500 output tokens at invented prices of $0.01 and $0.04 per 1,000 respectively. What is the cost?",
            "correct": 2,
            "options": [
              {
                "text": "$0.10",
                "feedback": "This applies the output rate to every token."
              },
              {
                "text": "$0.025",
                "feedback": "This applies only the cheaper input rate to every token."
              },
              {
                "text": "$0.04",
                "feedback": "The input costs $0.02 and the output costs $0.02."
              }
            ]
          },
          {
            "prompt": "A team repeatedly tunes prompts against its final evaluation set. Why collect a fresh held-out set?",
            "correct": 0,
            "options": [
              {
                "text": "Repeated tuning can adapt to the known examples and inflate apparent performance.",
                "feedback": "Fresh inputs better test transfer to unseen cases."
              },
              {
                "text": "The tuned examples can be treated as independent because their labels stayed the same.",
                "feedback": "Labels can stay fixed while the system has been optimized specifically for those examples."
              },
              {
                "text": "Holding out data removes the need for a rubric.",
                "feedback": "Unseen cases still need a consistent scoring rule."
              }
            ]
          }
        ]
      },
      {
        "week": 16,
        "id": "ground-an-assistant-in-source-documents",
        "title": "Ground an assistant in source documents",
        "summary": "Trace retrieval and answer generation separately, cite support and abstain when evidence is missing.",
        "minutes": 15,
        "teaching": [
          "Retrieval-augmented generation looks up relevant passages and supplies them with the question. Break documents into passages that preserve headings, conditions and exceptions. Attach source identifiers, dates and section names. Index those passages. A small local keyword search is sufficient for the project; embeddings are numeric representations that can support similarity search.",
          "Inspect the returned passages before judging the final answer. Top-k describes how many candidates are returned. Raising k can improve coverage but also add irrelevant text and consume context. When the correct policy is absent from the retrieved set, investigate the index, chunk boundaries and ranking. When it is present but ignored, investigate the answer stage.",
          "Require an answer to cite the passage that actually supports its claim. Establish a policy for stale, conflicting or missing information. If available sources cannot resolve the question, the assistant should describe the missing fact or escalate it. Retrieval must respect the caller’s document permissions."
        ],
        "example": {
          "title": "Diagnose the two stages",
          "text": "A policy says downloads expire in seven days except for audit exports. A chunk ending before “except” is an incomplete evidence unit. If the full exception was retrieved but the answer says “always seven days,” the failure is in applying evidence during generation."
        },
        "project": {
          "prompt": "Build a small retrieval notebook or local application over at least five fictional sources. Record a question, the returned passage IDs and the answer with citations. Include an answerable question, an unsupported request and a conflicting-policy case. Compare two chunk or retrieval choices and classify one failure.",
          "deliverable": "A source index, three traced queries, cited outputs and a documented retrieval or generation repair.",
          "placeholder": "Question … Expected passage … Retrieved IDs … Cited claim … Failure category … Change …",
          "reference": {
            "title": "Resolve an archive-retention question",
            "steps": [
              "Keep each exception with its policy heading and effective date.",
              "Retrieve both relevant passages and distinguish active trial rules from paid-account rules.",
              "Answer only within the retrieved scope, then test an unsupported account type."
            ],
            "artifact": "KB-A, Trial archive, effective June 1: Trial exports remain for 3 days.\nKB-B, Paid archive, effective June 1: Paid exports remain for 14 days.\nQuestion: How long can a paid account retrieve its export?\nRetrieved: KB-B, KB-A\nAnswer: A paid account can retrieve its export for 14 days [KB-B].\nFollow-up: What about suspended accounts?\nResponse: The retrieved policies do not specify suspended accounts.",
            "check": "A citation to KB-A would fail the paid-account question. Confirm that the quoted duration and account type come from the same passage."
          }
        },
        "questions": [
          {
            "prompt": "The correct passage never reaches the model’s context. Which stage should be investigated first?",
            "correct": 1,
            "options": [
              {
                "text": "The citation formatting step after generation.",
                "feedback": "Reformatting citations does not add the missing source to the context."
              },
              {
                "text": "Retrieval, including indexing and ranking.",
                "feedback": "The model did not receive the evidence needed for a supported answer."
              },
              {
                "text": "The answer-generation temperature, with the retrieved set unchanged.",
                "feedback": "Sampling changes cannot recover evidence that retrieval never supplied."
              }
            ]
          },
          {
            "prompt": "A policy exception appears in the paragraph after a rule. What chunking choice best preserves meaning?",
            "correct": 2,
            "options": [
              {
                "text": "Always separate each sentence regardless of meaning.",
                "feedback": "Disconnected sentences can hide the exception’s scope."
              },
              {
                "text": "Delete exceptions to reduce context length.",
                "feedback": "This removes material needed for correct answers."
              },
              {
                "text": "Keep the rule, its exception and identifying heading together when feasible.",
                "feedback": "The exception changes when the rule applies."
              }
            ]
          },
          {
            "prompt": "The right source is retrieved, but the answer cites a different policy with a conflicting duration. Which check failed?",
            "correct": 0,
            "options": [
              {
                "text": "Citation support and correct use of retrieved evidence.",
                "feedback": "Retrieval succeeded in supplying the right passage, but the answer used it incorrectly."
              },
              {
                "text": "Whether any document was indexed.",
                "feedback": "The relevant source already appeared in the results."
              },
              {
                "text": "The number of citations, regardless of which claims they support.",
                "feedback": "A citation count cannot confirm that a specific policy backs the duration."
              }
            ]
          },
          {
            "prompt": "A question concerns an enterprise exception missing from the allowed source set. Which response follows the contract?",
            "correct": 1,
            "options": [
              {
                "text": "Search another customer’s restricted documents.",
                "feedback": "The caller’s access boundaries still apply during retrieval."
              },
              {
                "text": "Identify the evidence gap and route for clarification.",
                "feedback": "The assistant should avoid inventing an unsupported rule."
              },
              {
                "text": "Guess the most favorable policy and cite a general source.",
                "feedback": "A general policy cannot establish a missing exception."
              }
            ]
          }
        ]
      },
      {
        "week": 17,
        "id": "design-a-supervised-ai-workflow",
        "title": "Design a supervised AI workflow",
        "summary": "Give an assistant narrowly defined tools, validate its proposed actions and make prompts safe to retry.",
        "minutes": 15,
        "teaching": [
          "Separate a model’s proposal from the application that carries it out. A tool description names an operation and the shape of its arguments. A typed action such as create_draft(ticket_id, reply_text) is easier to validate than arbitrary instructions. The application checks types, permissions and policy before acting.",
          "Use explicit states such as received, validated, drafted, waiting_for_review and approved. Distinguish approval from execution, and keep an audit record of the source, proposed arguments and reviewer decision. When a message changes after approval, require review of the revised content.",
          "Bound the workflow. Limit retries, record a stable operation ID and route failures to a person. Treat instructions found inside an incoming ticket or document as untrusted content. Run this exercise with local functions or a state table and simulated responses."
        ],
        "example": {
          "title": "Trace an approval boundary",
          "text": "A ticket asks for a billing change. The assistant may draft an explanation and cite the billing policy. An authorized reviewer must approve any action with account impact. A second delivery of the same ticket should refer to the existing draft instead of issuing another change."
        },
        "project": {
          "prompt": "Build a workflow from incoming ticket to sourced draft, validation and human review. Define one allowed tool with a typed argument contract. Simulate a missing field, a duplicate delivery, a request outside policy and a reviewer rejection. Record the outcome of each path.",
          "deliverable": "A workflow diagram or state table, a tool schema, and a trace demonstrating approval, rejection and replay behavior.",
          "placeholder": "Input … Tool arguments … State transitions … Reviewer decision … Retry result …",
          "reference": {
            "title": "Review a new help-center article",
            "steps": [
              "Allow a model to propose a source-backed article draft. Restrict publication to a reviewer-approved revision.",
              "Validate required fields and document access before creating the draft.",
              "Use the same operation ID on retries; record the revision that was actually approved."
            ],
            "artifact": "Operation: article-12 | Revision: 2\nAllowed model tool: propose_draft(title, body, source_ids[])\nInput check: source_ids are present and readable.\nreceived → draft_ready → pending_review\nReviewer rejects revision 2: unsupported product limit.\nRevision 3 adds the verified source → pending_review → approved.\nPublish revision 3 once; a replay returns its existing publication ID.",
            "check": "Attempting to publish revision 2, a revision edited after approval, or an unapproved replay should produce no external action."
          }
        },
        "questions": [
          {
            "prompt": "A model proposes an account change with plausible arguments. Which component decides whether to execute it?",
            "correct": 2,
            "options": [
              {
                "text": "The model’s confidence sentence.",
                "feedback": "Self-reported confidence does not establish permission."
              },
              {
                "text": "A phrase in the customer’s ticket saying “approved.”",
                "feedback": "Untrusted message text cannot grant application authority."
              },
              {
                "text": "Application code that checks authorization, policy and required approval.",
                "feedback": "A proposal alone is not authority to act."
              }
            ]
          },
          {
            "prompt": "A draft is edited after the reviewer approves revision 3. What should happen before publication?",
            "correct": 0,
            "options": [
              {
                "text": "Require approval of the changed revision.",
                "feedback": "The earlier approval applies to specific content."
              },
              {
                "text": "Reuse the approval because the title stayed the same.",
                "feedback": "Substantive content can change under an identical title."
              },
              {
                "text": "Publish all revisions to preserve history.",
                "feedback": "An audit history does not authorize previous drafts."
              }
            ]
          },
          {
            "prompt": "A provider resends one incoming event. Which design avoids creating duplicate drafts?",
            "correct": 1,
            "options": [
              {
                "text": "Increase the maximum number of retries.",
                "feedback": "More retries can increase duplicate writes without deduplication."
              },
              {
                "text": "Associate a stable event ID with the existing draft.",
                "feedback": "The operation can return the previous result for a replay."
              },
              {
                "text": "Choose a different operation ID every time.",
                "feedback": "The receiver cannot identify that these deliveries are the same event."
              }
            ]
          },
          {
            "prompt": "An allowed drafting tool receives an unknown account ID. What should the validator do?",
            "correct": 2,
            "options": [
              {
                "text": "Create an account silently to make the request pass.",
                "feedback": "This converts an invalid proposal into an unintended action."
              },
              {
                "text": "Proceed because the account ID matches the schema’s string type.",
                "feedback": "Type validity does not establish that the target exists or is authorized."
              },
              {
                "text": "Reject or route the proposal for review without changing account state.",
                "feedback": "A well-formed ID still needs a valid authorized target."
              }
            ]
          }
        ]
      },
      {
        "week": 18,
        "id": "evaluate-reliability-before-release",
        "title": "Evaluate reliability before release",
        "summary": "Calibrate a rubric, measure failure slices and set an evidence-based release gate.",
        "minutes": 15,
        "teaching": [
          "Build a “golden” evaluation set from representative, labeled cases. Include ordinary requests, ambiguous questions, missing facts and requests that must be escalated. Keep a held-out portion separate from examples used to tune the prompt. Define the unit of judgment: a single claim, full answer or proposed action.",
          "Take a small overlap of cases and score them independently with two reviewers when available. Discuss disagreement and revise the rubric, then rescore. A solo student can document how two plausible interpretations lead to different labels and flag the missing second review.",
          "Classify failures by stage: retrieval missed evidence, generation misused evidence, a tool proposed the wrong action, or routing skipped review. For must-escalate cases, recall = correctly escalated / all cases that required escalation. A high overall pass rate can hide a serious miss in a small slice. Compare baseline and candidate on the same held-out cases.",
          "Treat the 20 cases reviewed in Week 15 as regression material. For the release check, freeze the candidate before opening the separate Week 18 cases. Keep expected labels covered until responses have been produced. The provided baseline and candidate responses are fictional, so reported comparisons characterize these fixtures only."
        ],
        "example": {
          "title": "Find a masked regression",
          "text": "A candidate passes 18 of 20 cases overall. Five cases required escalation, but it escalated only three of the five. Escalation recall is 60%. If the release rule requires all five, those overall results still block release."
        },
        "project": {
          "prompt": "Evaluate the supervised workflow with a written rubric. Use the Week 15 cases for regression and the separate Week 18 release set for a fresh check after freezing the candidate, or construct an independent set for an original domain. Compare two configurations, classify at least three failures across the suites and report a required-review slice. Resolve one grading disagreement or ambiguity, then document a release or hold decision and a retest plan.",
          "deliverable": "A scored evaluation sheet, failure taxonomy, rubric revision, release decision and a human-review trace.",
          "placeholder": "Baseline/candidate … Slice counts … Rater disagreement … Gate … Retest …",
          "reference": {
            "title": "Score a trial cancellation assistant",
            "steps": [
              "Set the release rule before testing: every action that changes billing requires human review.",
              "Score quality and the must-review slice separately. Classify each missed case by stage.",
              "Hold a candidate that misses the safety-critical slice, even if aggregate performance improved."
            ],
            "artifact": "Held-out cases: 12. Billing-changing cases: 4.\nBaseline: 9/12 overall; 4/4 correctly routed for review.\nCandidate: 10/12 overall; 3/4 correctly routed for review.\nMiss B-7: tool selection proposed an immediate cancellation.\nDisagreement: “archive workspace” initially labeled as billing-changing.\nResolution: use policy section 2 to check whether billing changes.\nDecision: hold candidate; fix route, then rerun both suites.",
            "check": "Candidate recall for mandatory review is 3/4 = 75%. Record the false negative explicitly and preserve its input as a regression case."
          }
        },
        "questions": [
          {
            "prompt": "A test set has eight must-escalate cases and the system escalates six correctly. What is escalation recall?",
            "correct": 0,
            "options": [
              {
                "text": "75%.",
                "feedback": "Recall measures six correctly routed cases out of eight required ones."
              },
              {
                "text": "100%.",
                "feedback": "Two required cases were missed."
              },
              {
                "text": "25%.",
                "feedback": "Two missed out of eight is the false-negative proportion here. Recall counts the six correctly routed ones."
              }
            ]
          },
          {
            "prompt": "Two reviewers disagree about whether an answer may infer a missing date. What should happen before reporting scores?",
            "correct": 1,
            "options": [
              {
                "text": "Discard every disagreement without recording it.",
                "feedback": "That can hide precisely the difficult cases the evaluation should capture."
              },
              {
                "text": "Clarify the rubric with examples and rescore the affected cases.",
                "feedback": "Comparable judgments require an explicit scoring rule."
              },
              {
                "text": "Choose the more generous label for every disagreement without revising the rule.",
                "feedback": "That changes the scores without settling when a date can be inferred."
              }
            ]
          },
          {
            "prompt": "A candidate’s overall quality improves while a required review gate fails. What decision follows a mandatory gate?",
            "correct": 2,
            "options": [
              {
                "text": "Publish because the top-line percentage rose.",
                "feedback": "That ignores the stated release condition."
              },
              {
                "text": "Remove the failed examples from the result.",
                "feedback": "Removing hard cases misrepresents the evaluated population."
              },
              {
                "text": "Hold release and investigate the failed slice.",
                "feedback": "An aggregate improvement does not waive a predeclared requirement."
              }
            ]
          },
          {
            "prompt": "An answer cites the correct policy but calls the close-account tool instead of the create-draft tool. What is the primary failure category?",
            "correct": 0,
            "options": [
              {
                "text": "Tool selection or action execution.",
                "feedback": "The evidence was available and cited, but the action was incorrect."
              },
              {
                "text": "Missing source document.",
                "feedback": "The scenario already confirms retrieval of the right policy."
              },
              {
                "text": "Incorrect retrieval ranking alone.",
                "feedback": "The prompt already contained the correct retrieved policy. The observed defect concerns the chosen action."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "product",
    "title": "Engineering and product",
    "summary": "Turn customer evidence into a product decision and a reliable release.",
    "badge": "Product Operator",
    "lessons": [
      {
        "week": 19,
        "id": "turn-customer-evidence-into-a-product-brief",
        "title": "Turn customer evidence into a product brief",
        "summary": "Translate a workflow problem into measurable requirements and a prioritized backlog.",
        "minutes": 15,
        "teaching": [
          "A product brief explains who experiences a problem, how they handle it today, what the change should accomplish and how success will be measured. Distinguish a direct observation from an assumption. An interview quote illustrates a problem; it does not by itself measure prevalence.",
          "Write acceptance criteria that a tester can observe. Include a failure path as well as the happy path. Name non-goals so the pilot stays small. Prioritize work using the expected user impact, uncertainty, effort and dependencies. State why a smaller feature might come first.",
          "Leadership shows up in decisions and tradeoffs. Design a brief a support lead and an engineer can both use. Include a workflow diagram or sequence, an owner for each major step and an unresolved question that could change the plan."
        ],
        "example": {
          "title": "Narrow an AI request",
          "text": "“Build a better support bot” leaves the user and outcome unclear. A narrower hypothesis is that a support agent can produce a source-backed draft in four minutes for routine policy questions. Define eligible tickets and record baseline handling time before claiming improvement."
        },
        "project": {
          "prompt": "Write a one-page brief for the support assistant or an original startup idea. Document the current workflow, target user, baseline, hypothesis, non-goals, acceptance tests and a four-item backlog. Identify one assumption to test before engineering work begins.",
          "deliverable": "A product brief, prioritized backlog and one evidence-linked tradeoff.",
          "placeholder": "User and job … Evidence … Baseline … Hypothesis … Acceptance … First decision …",
          "reference": {
            "title": "Scope an onboarding checklist pilot",
            "steps": [
              "Start from a specific observed friction point in a fictional scenario.",
              "Use a measure the team can collect without instrumenting an entire product.",
              "Cut unrelated features and give the first backlog item a testable acceptance condition."
            ],
            "artifact": "User: implementation lead opening a new pilot workspace.\nObserved in rehearsal: required setup steps were skipped in 2/5 runs.\nHypothesis: a checklist reduces skipped steps to 0/5 in the next test.\nAcceptance: each required item has an owner and verified completion.\nNon-goal: automatic billing or CRM synchronization.\nBacklog: record baseline → build checklist → add recovery → retest.\nOpen question: which steps differ across customer segments?",
            "check": "The 2/5 observation is rehearsal evidence. The document should not claim a reduction before the next test is run."
          }
        },
        "questions": [
          {
            "prompt": "Which requirement is easiest for a tester to verify?",
            "correct": 1,
            "options": [
              {
                "text": "Increase user satisfaction without specifying a cohort, metric or threshold.",
                "feedback": "A metric and population are needed before the tester can determine success."
              },
              {
                "text": "When a source is missing, the draft identifies the gap and enters review.",
                "feedback": "It defines a specific trigger and observable outcome."
              },
              {
                "text": "Improve draft quality, with a scoring rubric to be decided after launch.",
                "feedback": "The testing standard is not yet defined."
              }
            ]
          },
          {
            "prompt": "A demo rehearsal suggests a problem affects many customers. What can the brief honestly claim?",
            "correct": 2,
            "options": [
              {
                "text": "All target customers experience the problem.",
                "feedback": "The sample cannot support a market-wide claim."
              },
              {
                "text": "The team has confirmed product-market fit.",
                "feedback": "That conclusion requires broader evidence."
              },
              {
                "text": "The rehearsal exposed a hypothesis to validate with target customers.",
                "feedback": "A rehearsal tests the process but cannot estimate real customer prevalence."
              }
            ]
          },
          {
            "prompt": "A backlog item depends on identifying the source of a failure. Which item should usually precede a large rebuild?",
            "correct": 0,
            "options": [
              {
                "text": "A small diagnostic test that can distinguish the leading explanations.",
                "feedback": "Reducing uncertainty can avoid solving the wrong problem."
              },
              {
                "text": "A complete rewrite of every related component.",
                "feedback": "A broad rewrite can consume effort without diagnosing the cause."
              },
              {
                "text": "A detailed implementation estimate for the largest untested fix.",
                "feedback": "An estimate cannot determine whether that fix addresses the actual cause."
              }
            ]
          },
          {
            "prompt": "A founder adds billing, analytics and chat to a one-week onboarding pilot. Which brief section helps preserve focus?",
            "correct": 1,
            "options": [
              {
                "text": "A delivery date with no list of excluded features.",
                "feedback": "A date alone does not decide which features are outside the pilot."
              },
              {
                "text": "Explicit non-goals tied to the pilot hypothesis.",
                "feedback": "Non-goals explain which expansions can wait and why."
              },
              {
                "text": "A list of every possible market.",
                "feedback": "A wider list does not define the pilot boundary."
              }
            ]
          }
        ]
      },
      {
        "week": 20,
        "id": "operate-and-explain-a-reliable-release",
        "title": "Operate and explain a reliable release",
        "summary": "Use automated checks, useful telemetry and a rollback plan to support a small production pilot.",
        "minutes": 15,
        "teaching": [
          "Describe the system as components with clear inputs and outputs: interface, service, data store, retrieval, model or fixture, and human review. Mark trust boundaries and which component owns customer scope. Keep secret values outside source code and use fictional data in public demonstrations.",
          "Continuous integration runs repeatable tests on a proposed change. Start with deterministic tests for parsing, authorization and routing, then run an evaluation suite over recorded model responses. Make a failure visible to the reviewer before release. A local test script demonstrates the same checks at no cost.",
          "Use logs for event details, metrics for trends and a request or trace ID to connect steps across components. Record latency, failures, volume and quality signals with minimal sensitive content. Define a stop threshold, a rollback owner and a customer-facing update. This makes an incident diagnosable and a launch reversible."
        ],
        "example": {
          "title": "Connect a failure to a change",
          "text": "A release doubles p95 latency from 1.2 seconds to 2.4 seconds across comparable windows. p95 is the value at or below which about 95% of observations fall. A trace shows retrieval time stayed steady while model-call time rose. That is a reason to investigate the model stage, not proof of a particular provider fault."
        },
        "project": {
          "prompt": "Package the pilot with an architecture sketch, an automated test command, a sample trace, a rollback trigger and a short stakeholder briefing. Rehearse a broken integration and produce a clear customer-facing status update and an engineering escalation. Use mock events and remove sensitive information.",
          "deliverable": "A release checklist, component diagram, passing/failing evidence, redacted trace and stakeholder handoff.",
          "placeholder": "Version … Risk … Test run … Trace … Revert trigger … Operator and customer update …",
          "reference": {
            "title": "Investigate a slow onboarding workflow",
            "steps": [
              "Compare the same metric before and after a single named change.",
              "Use a synthetic request ID to separate validation, retrieval and model timings.",
              "Set the response owner and a verifiable return-to-service condition."
            ],
            "artifact": "Release v0.4 · 100 comparable pilot requests per window\np95 end-to-end: 1.0 s baseline → 2.8 s candidate\nSample trace d-17: validation 20 ms, retrieval 80 ms, model 2,500 ms\nStop rule: p95 > 2 s for two consecutive five-minute windows.\nAction: release lead reverts model configuration after the second breach.\nPublic update: replies are delayed; existing tickets remain available.\nRecovery check: p95 below 2 s and previous evaluation gate passes.",
            "check": "One slow trace guides investigation. The rollback decision uses the declared time windows and includes a post-rollback quality check."
          }
        },
        "questions": [
          {
            "prompt": "Two services log a failure during the same minute. What best links their entries to one request?",
            "correct": 2,
            "options": [
              {
                "text": "The UTC minute on both log entries.",
                "feedback": "Many unrelated requests can occur within the same minute."
              },
              {
                "text": "The HTTP status code alone.",
                "feedback": "Many requests can share the same status code."
              },
              {
                "text": "A shared request or trace ID.",
                "feedback": "A propagated identifier connects records across components."
              }
            ]
          },
          {
            "prompt": "A change to routing breaks a deterministic escalation test. What should CI communicate?",
            "correct": 0,
            "options": [
              {
                "text": "A failed check with the case and expected versus observed routing.",
                "feedback": "A reviewer can reproduce and repair the specific regression."
              },
              {
                "text": "A successful build because the code compiled.",
                "feedback": "Compilation does not establish behavioral correctness."
              },
              {
                "text": "An overall test count without the failed case or expected result.",
                "feedback": "A count alone does not tell the reviewer which behavior regressed."
              }
            ]
          },
          {
            "prompt": "A team wants to diagnose latency without logging raw customer tickets. Which data is most proportionate?",
            "correct": 1,
            "options": [
              {
                "text": "A full response body attached to every timing sample.",
                "feedback": "The timing question does not require copying entire responses into logs."
              },
              {
                "text": "A synthetic request ID, stage names, durations and error classes.",
                "feedback": "These help locate delays while limiting exposure of message content."
              },
              {
                "text": "Unredacted customer conversations in every metric label.",
                "feedback": "Full conversations are unnecessary for timing analysis and expose sensitive content."
              }
            ]
          },
          {
            "prompt": "A rollback restored the previous version. What evidence establishes recovery?",
            "correct": 2,
            "options": [
              {
                "text": "The rollback button was clicked.",
                "feedback": "A click does not establish that the service recovered."
              },
              {
                "text": "The incident channel went quiet.",
                "feedback": "Silence does not measure system behavior."
              },
              {
                "text": "The predeclared health and quality checks are healthy again.",
                "feedback": "A version change is an action; the checks show its effect."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "venture",
    "title": "Technology entrepreneurship",
    "summary": "Validate a narrow workflow, model its economics and present a portfolio-ready product.",
    "badge": "Startup Builder",
    "lessons": [
      {
        "week": 21,
        "id": "interview-potential-users",
        "title": "Interview potential users",
        "summary": "Investigate a real workflow and separate evidence about past behavior from interest in a hypothetical product.",
        "minutes": 15,
        "teaching": [
          "Choose a narrow customer segment and one decision the interviews should inform. Ask about the most recent time the problem occurred. Trace the sequence, frequency, current workaround, cost of a mistake and who approves spending. A question about a past event usually yields more specific evidence than a request for praise.",
          "Ask permission to take notes. Avoid collecting names, private tickets or sensitive details in a public portfolio. Record observations and participant claims separately from interpretations. Sample deliberately: five interviews with the same type of person are useful for discovering patterns but do not establish a market-wide rate.",
          "Look for disconfirming evidence. A manual workaround may already be cheap and reliable. Write the smallest follow-up that could distinguish real buying intent from polite interest, such as offering a scheduled pilot with a named success metric."
        ],
        "example": {
          "title": "Replace a leading question",
          "text": "“Would an AI summary save time?” suggests the desired answer. “Walk through the last escalation. What did the handoff include, and how long did it take?” reveals the actual workflow and whether creating the summary was even the slow step."
        },
        "project": {
          "prompt": "Plan five interviews with one target segment. Conduct as many as access permits. Summarize distinct patterns, a counterexample and a concrete next experiment. Label rehearsal interviews and invented examples separately; they can test the interview guide, but customer demand remains unverified.",
          "deliverable": "An interview guide, anonymized evidence notes, clearly labeled participant count and a next-step decision.",
          "placeholder": "Segment … Last event … Workaround … Observed evidence … Counterexample … Next experiment …",
          "reference": {
            "title": "Investigate onboarding handoffs",
            "steps": [
              "Interview a fictional operations lead in rehearsal to test the wording.",
              "Capture one recent event, what the participant actually did and what remains uncertain.",
              "Design a follow-up experiment that could change the product decision."
            ],
            "artifact": "Rehearsal question: Walk through the last account handoff.\nReported event: two files arrived separately; an owner reconciled versions.\nReported effort: about 15 minutes. No time log was available.\nInterpretation: version tracking may matter more than auto-summarization.\nCounterexample to seek: a team using one shared source of truth.\nNext test: observe an authorized handoff and time the reconciliation.",
            "check": "The note separates the participant’s estimate, the student’s interpretation and the future measurement. A rehearsal cannot establish external demand."
          }
        },
        "questions": [
          {
            "prompt": "Which interview question is most likely to reveal actual behavior?",
            "correct": 0,
            "options": [
              {
                "text": "Walk through the last time an onboarding handoff failed.",
                "feedback": "A specific event anchors the answer in observable details."
              },
              {
                "text": "Would a generated summary make this process easier in the future?",
                "feedback": "A hypothetical preference is less specific than evidence from a real recent event."
              },
              {
                "text": "How much time would the perfect future product save?",
                "feedback": "A forecast about an imagined tool does not establish the current workflow."
              }
            ]
          },
          {
            "prompt": "Four friendly colleagues say the idea sounds good. What does this establish?",
            "correct": 1,
            "options": [
              {
                "text": "A market-wide conversion rate.",
                "feedback": "The sample cannot support that estimate."
              },
              {
                "text": "Interest worth investigating, with demand and willingness to pay still open.",
                "feedback": "Polite reactions provide limited evidence of purchase behavior."
              },
              {
                "text": "Four paying customers.",
                "feedback": "No payment or commitment has occurred."
              }
            ]
          },
          {
            "prompt": "One participant already solves the problem cheaply. How should the evidence be handled?",
            "correct": 2,
            "options": [
              {
                "text": "Exclude the interview because it contradicts the pitch.",
                "feedback": "Discarding contrary evidence biases the discovery process."
              },
              {
                "text": "Treat that one response as proof nobody needs the product.",
                "feedback": "An individual counterexample does not establish universal demand."
              },
              {
                "text": "Record the counterexample and investigate which segment differs.",
                "feedback": "A counterexample can reveal the limits of the customer hypothesis."
              }
            ]
          },
          {
            "prompt": "A case study uses invented interview responses to rehearse a process. What label is accurate?",
            "correct": 0,
            "options": [
              {
                "text": "Fictional rehearsal; customer validation is pending.",
                "feedback": "This transparently distinguishes practice from observed demand."
              },
              {
                "text": "Verified customer research.",
                "feedback": "Invented responses do not come from customers."
              },
              {
                "text": "Revenue evidence.",
                "feedback": "A rehearsal contains no purchase data."
              }
            ]
          }
        ]
      },
      {
        "week": 22,
        "id": "test-the-smallest-useful-product",
        "title": "Test the smallest useful product",
        "summary": "Design a narrow MVP and a pilot that can disprove a product assumption.",
        "minutes": 15,
        "teaching": [
          "An MVP tests a specific assumption with the smallest useful end-to-end experience. Pick one user, one job and one measurable outcome. A manually reviewed workflow can test whether a result is valuable before a team automates expensive steps.",
          "Write the experiment as a decision: if a defined cohort achieves the threshold over the agreed window, continue to the next test. If it misses, inspect qualitative notes before deciding whether to change the interface, underlying workflow or target user. Decide in advance what would count as a failed hypothesis.",
          "Instrument the steps needed to explain the outcome: eligible user, attempted task, completed task and observable value. Account for retries and duplicates. Record how much manual labor the pilot hides so a high completion rate does not conceal an unsustainable service."
        ],
        "example": {
          "title": "Test value before automation",
          "text": "A founder can manually review five source-grounded drafts and deliver them through a basic interface. If operators still rewrite every draft, a complex orchestration layer would not solve the value problem. Log edits and time spent to identify why the drafts missed."
        },
        "project": {
          "prompt": "Build one end-to-end pilot for the support assistant or another selected domain. Write an explicit hypothesis and stop rule, scope the smallest workflow, run at least three task trials, and record completion, assistance and limitations. Identify the riskiest untested assumption.",
          "deliverable": "A demoable MVP, an experiment plan, trial observations and a decision grounded in results.",
          "placeholder": "Target user … Assumption … Workflow … Trial results … Hidden labor … Decision …",
          "reference": {
            "title": "Pilot a draft onboarding summary",
            "steps": [
              "Select one simple handoff from a fictional account. A human can review the proposed summary.",
              "Choose a success criterion before observing the runs.",
              "Compare corrected, accepted and abandoned results and measure review effort."
            ],
            "artifact": "Hypothesis: an operator can produce an accurate handoff in ≤5 minutes.\nPilot: one input form → generated or simulated draft → human review.\nThree rehearsals: 4 min accepted; 7 min corrected; 5 min accepted.\nSuccess rule: all 3 accurate and within 5 min.\nOutcome: 2/3 met the time rule. The correction took 3 extra minutes.\nNext change: surface the source owner next to the disputed field.",
            "check": "The rehearsed pilot missed its threshold. It supports an iteration decision, while willingness to adopt still requires external evidence."
          }
        },
        "questions": [
          {
            "prompt": "A founder wants to test whether reviewed summaries save time. Which MVP is most informative?",
            "correct": 1,
            "options": [
              {
                "text": "A feature-ranking survey without observing a summary task.",
                "feedback": "Stated preferences cannot establish whether reviewed summaries save handling time."
              },
              {
                "text": "A small end-to-end draft-and-review flow with measured task time.",
                "feedback": "It exercises the value hypothesis and records an outcome."
              },
              {
                "text": "A complex account-management system with no summary flow.",
                "feedback": "That tests infrastructure rather than the proposed value."
              }
            ]
          },
          {
            "prompt": "The success threshold is changed after seeing disappointing results. What is the main evaluation problem?",
            "correct": 2,
            "options": [
              {
                "text": "The comparison is stronger because the threshold fits the observed range.",
                "feedback": "Choosing criteria after seeing results weakens the claim that the hypothesis was independently tested."
              },
              {
                "text": "The original success criterion has been validated on a fresh sample.",
                "feedback": "The same outcomes were used to revise the threshold. Independent validation requires new observations."
              },
              {
                "text": "The retrospective threshold can make a miss appear successful.",
                "feedback": "Predeclared criteria reduce outcome-driven reinterpretation."
              }
            ]
          },
          {
            "prompt": "Every pilot task succeeds only after 20 minutes of hidden founder work. What should the pilot report include?",
            "correct": 0,
            "options": [
              {
                "text": "The manual work and its effect on delivery cost and scalability.",
                "feedback": "Completion alone conceals the operating burden."
              },
              {
                "text": "Only the success percentage.",
                "feedback": "That omits a material condition of success."
              },
              {
                "text": "An assumption that manual effort will disappear for free.",
                "feedback": "Automation and its costs require evidence."
              }
            ]
          },
          {
            "prompt": "Three rehearsals succeed, but no target customers have tried the MVP. What is the strongest next test of adoption?",
            "correct": 1,
            "options": [
              {
                "text": "Add unrelated features before any external trial.",
                "feedback": "Extra scope does not directly test adoption."
              },
              {
                "text": "Observe target users attempting the workflow under a defined pilot.",
                "feedback": "External use provides evidence beyond internal rehearsal."
              },
              {
                "text": "Count the same three rehearsals twice.",
                "feedback": "Duplicate observations do not expand the sample."
              }
            ]
          }
        ]
      },
      {
        "week": 23,
        "id": "measure-adoption-and-unit-economics",
        "title": "Measure adoption and unit economics",
        "summary": "Distinguish revenue, variable cost and actual use before recommending a price.",
        "minutes": 15,
        "teaching": [
          "Define a billable unit such as a workspace-month or completed task. Contribution per unit equals price minus variable cost for that unit. Variable costs may include model usage, human review, payment processing and support effort. Fixed monthly costs remain even at zero volume. Under a simple constant-cost model, break-even units = fixed costs / contribution per unit, rounded up when contribution is positive.",
          "Measure a funnel on one cohort and time window. Activation rate is activated eligible users divided by eligible users. Retention requires repeated use at a later specified time. A signup alone does not show ongoing use. Report counts with percentages so a small sample is visible.",
          "Test a price as a hypothesis. Ask about an existing budget and buying process, then seek a concrete next step. Model a conservative and an optimistic scenario and state which assumptions dominate. Hypothetical purchase intent and actual purchases should appear separately."
        ],
        "example": {
          "title": "Check the margin before scaling",
          "text": "A fictional plan charges $30 per workspace-month and costs $12 in variable services and review time. Its contribution is $18. With $180 monthly fixed costs, 10 workspace-months cover those costs under the stated assumptions. If review cost doubles, recompute before suggesting scale."
        },
        "project": {
          "prompt": "Define a pilot price and modeled variable costs for a chosen product. Calculate contribution and break-even, including a worse-cost scenario. Trace an activation and repeat-use funnel with denominators. Record the type of pricing evidence and two uncertainties that could reverse the decision.",
          "deliverable": "A pricing worksheet, dated funnel with counts, and a recommendation that distinguishes modeled assumptions from observed behavior.",
          "placeholder": "Billing unit … Price … Cost components … Break-even … Funnel … Pricing evidence …",
          "reference": {
            "title": "Price a reviewed export service",
            "steps": [
              "Choose the same billing and cost unit: one completed export.",
              "Include model processing, review time and delivery before calculating contribution.",
              "Round break-even upward and increase one cost to see how sensitive the result is."
            ],
            "artifact": "Price: $10/export; variable cost: $4/export; fixed costs: $95/month.\nContribution: $6/export. Break-even: ceil(95/6) = 16 exports.\nStress case: $6 variable cost → $4 contribution → 24 exports.\nFictional pilot: 8 eligible teams; 5 activated; 2 returned in week 2.\nActivation: 5/8. Week-2 return among activated teams: 2/5.",
            "check": "At 15 exports, contribution is $90 and fixed costs are $95. At 16 exports, contribution is $96. The return metric uses activated teams as its stated denominator."
          }
        },
        "questions": [
          {
            "prompt": "A plan costs $18 per workspace to deliver and sells for $30. What is contribution per workspace before fixed costs?",
            "correct": 2,
            "options": [
              {
                "text": "$48",
                "feedback": "Adding price and cost does not measure contribution."
              },
              {
                "text": "$30",
                "feedback": "That is revenue before delivery costs."
              },
              {
                "text": "$12",
                "feedback": "Subtract the variable delivery cost from the selling price."
              }
            ]
          },
          {
            "prompt": "A product has $101 fixed cost and contributes $10 per unit. How many whole units are needed to break even?",
            "correct": 0,
            "options": [
              {
                "text": "11",
                "feedback": "Ten units contribute $100, one dollar below fixed costs."
              },
              {
                "text": "10",
                "feedback": "Ten units leave a small loss."
              },
              {
                "text": "101",
                "feedback": "That would apply only with $1 contribution per unit."
              }
            ]
          },
          {
            "prompt": "A cohort has 20 eligible teams, 8 activated teams and 4 of those active again in Week 2. What is Week-2 return among activated teams?",
            "correct": 1,
            "options": [
              {
                "text": "8/20, or 40%.",
                "feedback": "That is initial activation."
              },
              {
                "text": "4/8, or 50%.",
                "feedback": "The question defines the denominator as activated teams."
              },
              {
                "text": "4/20, or 20%.",
                "feedback": "That is repeat use among all eligible teams."
              }
            ]
          },
          {
            "prompt": "Price is $5 per task and variable cost is $6. What does higher volume do under these assumptions?",
            "correct": 2,
            "options": [
              {
                "text": "It guarantees break-even once enough tasks are sold.",
                "feedback": "A negative contribution cannot cover fixed costs."
              },
              {
                "text": "It makes the fixed-cost share smaller, which by itself makes each extra task profitable.",
                "feedback": "Spreading fixed costs cannot turn a negative per-task contribution positive."
              },
              {
                "text": "It increases the loss before fixed costs by $1 per additional task.",
                "feedback": "Contribution is negative at the modeled price and cost."
              }
            ]
          }
        ]
      },
      {
        "week": 24,
        "id": "present-a-portfolio-case-study-and-founder-demo",
        "title": "Present a portfolio case study and founder demo",
        "summary": "Demonstrate a working product, explain a tradeoff and defend the evidence behind its results.",
        "minutes": 15,
        "teaching": [
          "A strong case study lets a reviewer verify a claim. Show the original workflow, baseline, narrow change, demonstration, evaluation and limits. Make the repository runnable with fictional inputs or provide a reproducible local demonstration. State precisely what the student built, what a library supplied and what a person reviewed.",
          "Adapt the presentation to the decision. A startup hiring team may probe technical ownership, debugging and customer communication. Prepare a walkthrough of one request, one failed case, the fix and its test. A founder discussion also needs a clear user, pricing hypothesis, delivery cost, adoption evidence and the next experiment.",
          "Practice a short demo followed by questions. Show an ordinary case and a failure or escalation case. Explain what would fail first at ten times the current volume and which measurement would justify additional engineering. Separate observed results, simulated cases and projections in every public artifact."
        ],
        "example": {
          "title": "Turn a metric into a defensible claim",
          "text": "“Saved 60% across all customers” needs population-wide evidence. “Median review time fell from ten to four minutes on eight paired fictional rehearsals; external adoption is untested” gives the baseline, method, sample and limit. Link the table so a reviewer can recompute it."
        },
        "project": {
          "prompt": "Publish or locally package a capstone case study in the selected domain. Include a runnable demo, architecture and test evidence, baseline comparison, a failure investigation, pricing and operating assumptions, and a roadmap. Deliver a hiring walkthrough and a short founder pitch. Document one question from a reviewer or a clearly labeled rehearsal and revise one artifact in response.",
          "deliverable": "A portfolio-ready project with a demonstration, evidence appendix, implementation handoff and an honest pitch.",
          "placeholder": "Role and contribution … Demo … Baseline/result … Failure and fix … Economics … Limitation … Next experiment …",
          "reference": {
            "title": "Present a trial onboarding assistant",
            "steps": [
              "Open with the operator’s workflow and a measured or clearly simulated baseline.",
              "Demonstrate one normal request and one incomplete-source escalation. Trace the data and the test that guards the escalation.",
              "End with two decisions: what the evidence establishes for a hiring reviewer, and what a founder should test next."
            ],
            "artifact": "Case study: source-backed trial handoff (fictional demonstration)\nRole: implemented API, retrieval traces and human-review gate.\nEvidence: 8 paired rehearsals; median time 10 → 6 minutes.\nFailure: a missing policy date produced an unsupported deadline.\nRepair: abstain when the source has no date; regression case R-08.\nUnit model: $15 per account-month, $6 modeled variable delivery cost.\nHiring demo: reproduce R-08 and explain the tradeoff.\nFounder next step: supervised external pilot with 3 target teams.",
            "check": "The 40% reduction applies to the rehearsal sample. The model estimates $9 contribution before fixed costs. Neither number establishes external demand."
          }
        },
        "questions": [
          {
            "prompt": "A case study reports “40% faster.” What evidence makes that claim interpretable?",
            "correct": 0,
            "options": [
              {
                "text": "The task, baseline, comparison method, sample size and limitations.",
                "feedback": "The reader can assess what changed and how the result was measured."
              },
              {
                "text": "Only a screenshot of the homepage.",
                "feedback": "A screenshot cannot establish a timing comparison."
              },
              {
                "text": "An estimate from a different product with a larger user base.",
                "feedback": "An unrelated population cannot substantiate this result."
              }
            ]
          },
          {
            "prompt": "A hiring interviewer asks what the candidate personally implemented. Which response is strongest?",
            "correct": 1,
            "options": [
              {
                "text": "Describe the team’s architecture without identifying any personally implemented component.",
                "feedback": "Architecture context helps, but the interviewer requested evidence of individual contribution."
              },
              {
                "text": "Trace one owned component, a failure, the fix and its regression test.",
                "feedback": "Specific evidence demonstrates technical and operational ownership."
              },
              {
                "text": "List every product visible in the tech stack.",
                "feedback": "A list does not explain the candidate’s contribution."
              }
            ]
          },
          {
            "prompt": "A founder demo works on one fictional account. Which next step most directly tests market fit assumptions?",
            "correct": 2,
            "options": [
              {
                "text": "Use the technical success rate from the demo as an estimate of paid customer conversion.",
                "feedback": "Technical completion and willingness to pay are different outcomes."
              },
              {
                "text": "Increase load on the same synthetic account and treat throughput as market demand.",
                "feedback": "Load testing can establish capacity, not customer adoption."
              },
              {
                "text": "Run a defined pilot with target users and measure activation, value and delivery cost.",
                "feedback": "This tests adoption and operating assumptions outside the demonstration."
              }
            ]
          },
          {
            "prompt": "A workflow slows down at ten times the pilot volume. What is the strongest explanation to present?",
            "correct": 0,
            "options": [
              {
                "text": "Show stage-level measurements and identify which bottleneck needs the next test.",
                "feedback": "Measured evidence separates a hypothesis from an established bottleneck."
              },
              {
                "text": "Claim the model provider is responsible without a trace.",
                "feedback": "The bottleneck could be in retrieval, storage, review or another stage."
              },
              {
                "text": "Promise unlimited scale because the pilot completed.",
                "feedback": "Pilot completion cannot establish performance under a larger load."
              }
            ]
          }
        ]
      }
    ]
  }
];
