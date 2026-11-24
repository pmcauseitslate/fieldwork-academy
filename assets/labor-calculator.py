"""Fieldwork Academy | Week 1 Python starter

Open a terminal in the folder where you saved this file and run:
    python3 labor-calculator.py

Implement labor_cost(), then run the two checks again. Change one shift and
calculate its expected cost on paper before adding a third check. All crew
members in these sample shifts earn the same hourly rate.
"""


def labor_cost(crew_size, hours_per_person, hourly_rate):
    """Return the crew's straight-time labor cost in dollars."""
    # Replace the next line with your calculation.
    raise NotImplementedError("Add the labor calculation inside labor_cost.")


if __name__ == "__main__":
    shifts = [
        # Crew size, hours per person, dollars per hour, expected labor cost.
        (3, 6, 24, 432),
        (2, 4.5, 30, 270),
    ]
    try:
        for crew_size, hours, rate, expected in shifts:
            observed = labor_cost(crew_size, hours, rate)
            print(f"{crew_size} people, {hours} hours, ${rate}/hour: "
                  f"expected ${expected}, observed {observed}")
            assert observed == expected, "Recheck the inputs and units."
    except NotImplementedError as missing:
        print(missing)
