"""Starter for the support-workload workshop.

Run locally with: python3 workload.py
The tests will fail until workload_hours returns the estimated hours.
"""

def workload_hours(tickets, minutes_each):
    """Return staff-hours for nonnegative ticket and minute inputs."""
    # Replace this placeholder with a calculation.
    return 0


if __name__ == "__main__":
    cases = [(12, 10, 2), (24, 7.5, 3), (0, 30, 0)]
    for tickets, minutes, expected in cases:
        actual = workload_hours(tickets, minutes)
        outcome = "PASS" if abs(actual - expected) < 1e-9 else "REVISE"
        print(f"{outcome}: {tickets} tickets × {minutes} min; expected {expected} h, observed {actual} h")
